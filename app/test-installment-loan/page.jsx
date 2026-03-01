"use client";

import { API_URL } from "@/constant";
import { getCustomers } from "@/redux/slices/customerSlice";
import { getLoanApplication } from "@/redux/slices/loanApplicationSlice";
import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import { FaRegCalendar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import CenterModal from "../components/modals/CenterModal";
import Button from "../components/shared/buttonComponent/Button";
import InputField from "../components/shared/input/InputField";
import SelectField from "../components/shared/input/SelectField";

const repaymentMethodOptions = [
  { value: "Cash", label: "Cash" },
  { value: "Bank transfer", label: "Bank transfer" },
];

const TestInstallmentLoan = () => {
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.customer);
  const [loading, setLoading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loanApplicationId, setLoanApplicationId] = useState("");
  const [daysToAdvance, setDaysToAdvance] = useState(1);
  const [disbursementDaysAgo, setDisbursementDaysAgo] = useState(18);
  const [repayments, setRepayments] = useState([
    {
      repaymentAmount: 0,
      dateCollected: new Date().toISOString().split("T")[0],
      repaymentNumber: "",
      repaymentMethod: "",
    },
  ]);
  const [openDatePickerIdx, setOpenDatePickerIdx] = useState(null);
  const [loanInfo, setLoanInfo] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const normalizedDisbursementDaysAgo = Math.max(
    0,
    parseInt(disbursementDaysAgo, 10) || 0,
  );
  const projectedDisbursementDate = format(
    new Date(Date.now() - normalizedDisbursementDaysAgo * 24 * 60 * 60 * 1000),
    "PPP",
  );

  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);

  useEffect(() => {
    if (customer?.data) {
      setFilteredData(customer.data);
    }
  }, [customer?.data]);

  const handleCustomerSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
    if (customer?.data) {
      const filtered = customer.data.filter(
        (item) =>
          item.firstName?.toLowerCase().includes(searchValue) ||
          item.lastName?.toLowerCase().includes(searchValue) ||
          item.email?.toLowerCase().includes(searchValue) ||
          item.phoneNumber?.includes(searchValue),
      );
      setFilteredData(filtered);
    }
  };

  const createTestLoan = async () => {
    if (!selectedCustomer) {
      toast.error("Please select a customer");
      return;
    }

    const validRepayments = Array.isArray(repayments)
      ? repayments.filter(
          (r) =>
            r?.dateCollected &&
            r?.repaymentAmount &&
            Number(r.repaymentAmount) > 0,
        )
      : [];

    setLoading(true);
    toast.info("Creation is in progress...", { autoClose: 3000 });
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      const payload = {
        customerEmail: selectedCustomer.email,
        loanAmount: 100000,
        loanDuration: 5,
        interestRate: 10,
        disbursementDaysAgo: normalizedDisbursementDaysAgo,
      };
      if (validRepayments.length > 0) {
        payload.repayments = validRepayments.map((r) => ({
          repaymentAmount: parseFloat(r.repaymentAmount),
          dateCollected: r.dateCollected,
          repaymentMethod: r.repaymentMethod || "Cash",
          ...(r.repaymentNumber
            ? { repaymentNumber: parseInt(r.repaymentNumber, 10) }
            : {}),
        }));
      }

      const response = await axios.post(
        `${API_URL}/loan-application/test-loans/create-installment`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${userData?.data?.token}`,
          },
        },
      );

      if (response.data.status === "success") {
        setLoanApplicationId(response.data.data.loanApplicationId);
        setLoanInfo(response.data.data);
        const msg =
          validRepayments.length > 0
            ? "Test loan created and repayments applied successfully! Check Loan Applications for the new loan."
            : "Test loan created, approved, and disbursed successfully! Check Loan Applications for the new loan.";
        toast.success(msg, { autoClose: 5000 });
        await dispatch(getLoanApplication());
      }
    } catch (error) {
      console.error("Error creating test loan:", error);
      toast.error(error.response?.data?.error || "Failed to create test loan");
    } finally {
      setLoading(false);
    }
  };

  const triggerDailyAccrual = async () => {
    if (!loanApplicationId) {
      toast.error("Please create a test loan first");
      return;
    }
    setLoading(true);
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      const response = await axios.post(
        `${API_URL}/loan-application/test-loans/trigger-accrual`,
        { loanApplicationId },
        { headers: { Authorization: `Bearer ${userData?.data?.token}` } },
      );
      if (response.data.status === "success") {
        setLoanInfo(response.data.data);
        toast.success("Daily interest accrued successfully!");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to trigger accrual");
    } finally {
      setLoading(false);
    }
  };

  const advanceDays = async () => {
    if (!loanApplicationId) {
      toast.error("Please create a test loan first");
      return;
    }
    if (!daysToAdvance || daysToAdvance < 1) {
      toast.error("Please enter a valid number of days (1-365)");
      return;
    }
    setLoading(true);
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      const response = await axios.post(
        `${API_URL}/loan-application/test-loans/advance-days`,
        { loanApplicationId, days: parseInt(daysToAdvance, 10) },
        { headers: { Authorization: `Bearer ${userData?.data?.token}` } },
      );
      if (response.data.status === "success") {
        setLoanInfo(response.data.data.finalState);
        toast.success(`Advanced ${daysToAdvance} day(s) successfully!`);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to advance days");
    } finally {
      setLoading(false);
    }
  };

  const triggerOverdueAccrual = async () => {
    if (!loanApplicationId) {
      toast.error("Please create a test loan first");
      return;
    }
    setLoading(true);
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      const response = await axios.post(
        `${API_URL}/loan-application/test-loans/trigger-overdue`,
        { loanApplicationId },
        { headers: { Authorization: `Bearer ${userData?.data?.token}` } },
      );
      if (response.data.status === "success") {
        setLoanInfo(response.data.data);
        toast.success("Overdue accrual triggered successfully!");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Failed to trigger overdue accrual",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <main className="p-5">
        <ToastContainer />
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-swBlue">
            Test Installment Loan
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Create test loans and trigger accruals for testing installment
            payment scenarios
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-swBlue">
              Create Test Loan
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Customer
                </label>
                <button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  className="w-full px-4 py-2 text-left border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {selectedCustomer
                    ? `${selectedCustomer.firstName} ${selectedCustomer.lastName} (${selectedCustomer.email})`
                    : "Click to select a customer"}
                </button>
                {selectedCustomer && (
                  <p className="text-xs text-gray-500 mt-1">
                    Selected: {selectedCustomer.email}
                  </p>
                )}
              </div>
              <div className="text-sm text-gray-600">
                <p><strong>Default Values:</strong></p>
                <ul className="list-disc list-inside mt-2">
                  <li>Loan Amount: ₦100,000</li>
                  <li>Duration: 5 months</li>
                  <li>Interest Rate: 10%</li>
                  <li>Repayment Type: Installment Payment</li>
                  <li>Status: Auto-approved & Disbursed</li>
                  <li>
                    Projected Disbursement Date: {projectedDisbursementDate} (
                    {normalizedDisbursementDaysAgo} days ago)
                  </li>
                </ul>
              </div>
              <InputField
                label="Disbursement Days Ago"
                type="number"
                min="0"
                max="365"
                value={disbursementDaysAgo}
                onChange={(e) => setDisbursementDaysAgo(e.target.value)}
                placeholder="e.g. 18"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4">
              <div className="border-t pt-4">
                <h3 className="text-sm font-semibold text-swBlue mb-2">
                  Repayments (Optional)
                </h3>
                <div className="space-y-3">
                  {repayments.map((r, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-1 md:grid-cols-2 gap-3"
                    >
                      <InputField
                        label={`Repayment Amount #${idx + 1}`}
                        type="number"
                        min="1"
                        value={r.repaymentAmount}
                        onChange={(e) => {
                          const next = [...repayments];
                          next[idx] = {
                            ...next[idx],
                            repaymentAmount: e.target.value,
                          };
                          setRepayments(next);
                        }}
                        placeholder="e.g. 10000"
                      />
                      <div className="flex gap-2 items-end">
                        <div className="flex-1 relative">
                          <p className="text-sm font-medium text-gray-700 mb-1">
                            Repayment Date #{idx + 1}
                          </p>
                          <div
                            className="flex items-center gap-2 py-2.5 px-3 rounded border border-gray-300 bg-white cursor-pointer hover:border-swBlue min-h-[42px]"
                            onClick={() =>
                              setOpenDatePickerIdx(
                                openDatePickerIdx === idx ? null : idx,
                              )
                            }
                          >
                            <FaRegCalendar size={18} className="text-gray-500 shrink-0" />
                            <span className="text-sm text-gray-800">
                              {r.dateCollected
                                ? format(
                                    new Date(r.dateCollected + "T12:00:00"),
                                    "PPP",
                                  )
                                : "Pick date"}
                            </span>
                          </div>
                          {openDatePickerIdx === idx && (
                            <div className="absolute left-0 top-full mt-1 bg-white border rounded-md shadow-lg z-50">
                              <DayPicker
                                styles={{ caption: { color: "#2769b3" } }}
                                modifiers={{
                                  selected: r.dateCollected
                                    ? new Date(r.dateCollected + "T12:00:00")
                                    : undefined,
                                }}
                                modifiersClassNames={{ selected: "my-selected" }}
                                onDayClick={(value) => {
                                  const next = [...repayments];
                                  next[idx] = {
                                    ...next[idx],
                                    dateCollected: format(value, "yyyy-MM-dd"),
                                  };
                                  setRepayments(next);
                                  setOpenDatePickerIdx(null);
                                }}
                                className="rounded-md"
                              />
                              <button
                                type="button"
                                className="w-full py-2 text-sm text-swBlue hover:bg-gray-100 rounded-b-md"
                                onClick={() => setOpenDatePickerIdx(null)}
                              >
                                OK
                              </button>
                            </div>
                          )}
                        </div>
                        <Button
                          variant="secondary"
                          disabled={loading || repayments.length <= 1}
                          onClick={() =>
                            setRepayments(repayments.filter((_, i) => i !== idx))
                          }
                          className="h-10"
                        >
                          Remove
                        </Button>
                      </div>
                      <SelectField
                        label="Repayment Method (optional)"
                        value={repaymentMethodOptions.find(
                          (o) => o.value === r.repaymentMethod,
                        )}
                        optionValue={repaymentMethodOptions}
                        placeholder="Select repayment method"
                        isSearchable={false}
                        onChange={(selectedOption) => {
                          const next = [...repayments];
                          next[idx] = {
                            ...next[idx],
                            repaymentMethod: selectedOption?.value || "",
                          };
                          setRepayments(next);
                        }}
                      />
                    </div>
                  ))}
                  <Button
                    variant="secondary"
                    disabled={loading}
                    onClick={() =>
                      setRepayments([
                        ...repayments,
                        {
                          repaymentAmount: 10000,
                          dateCollected: new Date().toISOString().split("T")[0],
                          repaymentNumber: "",
                          repaymentMethod: "Cash",
                        },
                      ])
                    }
                    className="w-full"
                  >
                    Add another repayment
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-swBlue">
              Loan Status & Actions
            </h2>
            {loanInfo ? (
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="font-medium">Loan ID:</span>
                  <span>{loanInfo.loanId || loanApplicationId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Disbursement date:</span>
                  <span>
                    {loanInfo.disbursedAt
                      ? new Date(loanInfo.disbursedAt).toLocaleDateString(
                          "en-NG",
                          { year: "numeric", month: "short", day: "numeric" },
                        )
                      : "N/A"}
                    {loanInfo.disbursementDaysAgo != null &&
                      ` (${loanInfo.disbursementDaysAgo} days ago)`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Outstanding Principal (from repayments):</span>
                  <span>
                    ₦{loanInfo.outstandingPrincipal?.toLocaleString() ?? "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Accrued Interest:</span>
                  <span>
                    ₦{loanInfo.currentInterest?.toLocaleString() ?? "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Outstanding Balance:</span>
                  <span>
                    ₦{loanInfo.outstandingBalance?.toLocaleString() ?? "N/A"}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500 mb-4">
                No active loan. Create a test loan to see details and perform
                actions.
              </p>
            )}
            <div className="mt-6 border-t pt-4">
              <h3 className="text-sm font-semibold text-swBlue mb-3">
                Loan Actions
              </h3>
              <div className="space-y-4">
                <div className="flex gap-2 items-end">
                  <div className="flex-1">
                    <InputField
                      label="Days to Advance"
                      type="number"
                      min="1"
                      value={daysToAdvance}
                      onChange={(e) => setDaysToAdvance(e.target.value)}
                      placeholder="e.g. 1"
                      disabled={!loanApplicationId}
                    />
                  </div>
                  <Button
                    variant="secondary"
                    onClick={advanceDays}
                    disabled={loading || !loanApplicationId}
                    className="h-[42px] mb-[2px]"
                  >
                    Advance Days
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button
                    variant="secondary"
                    onClick={triggerDailyAccrual}
                    disabled={loading || !loanApplicationId}
                    className="w-full text-sm"
                  >
                    Trigger Daily Interest
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={triggerOverdueAccrual}
                    disabled={loading || !loanApplicationId}
                    className="w-full text-sm"
                  >
                    Trigger Overdue Accrual
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-swBlue">
              How to Use
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
              <li>Select a customer from the dropdown</li>
              <li>Add optional repayment(s) if you want to simulate payments</li>
              <li>
                Click &quot;Create Test Loan & Simulate Repayments&quot; - loan
                will be auto-approved, disbursed, and repayments applied
              </li>
              <li>Use &quot;Trigger Daily Interest&quot; to accrue interest for today</li>
              <li>Use &quot;Advance Days&quot; to simulate multiple days passing</li>
              <li>
                Use &quot;Trigger Overdue Accrual&quot; to calculate penalties for
                overdue loans
              </li>
              <li>Navigate to the loan details page to verify schedule</li>
            </ol>
            {loanApplicationId && (
              <div className="mt-4 p-3 bg-white rounded">
                <p className="text-sm font-medium">Loan Application ID:</p>
                <p className="text-xs font-mono break-all">{loanApplicationId}</p>
                <div className="flex flex-wrap gap-3 mt-2">
                  <a
                    href="/loan-applications"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Check Loan Applications →
                  </a>
                  <a
                    href={`/loan-applications/view-loan/${loanApplicationId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View Loan Details →
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6">
          <Button
            variant="primary"
            onClick={createTestLoan}
            disabled={loading || !selectedCustomer}
            className="w-full py-3 text-lg"
          >
            {loading
              ? "Processing..."
              : "Create Test Loan & Simulate Repayments"}
          </Button>
        </div>

        <CenterModal
          isOpen={isOpen}
          width="40%"
          onClose={() => {
            setIsOpen(false);
            setSearchTerm("");
            setFilteredData(customer?.data || []);
          }}
        >
          <div className="h-[500px] overflow-y-scroll p-4">
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-black">
                Select Customer
              </h3>
              <button
                className="text-black text-xl"
                onClick={() => {
                  setIsOpen(false);
                  setSearchTerm("");
                  setFilteredData(customer?.data || []);
                }}
              >
                ×
              </button>
            </div>
            <div className="mb-4">
              <input
                type="search"
                placeholder="Search Customer by name, email, or phone"
                value={searchTerm}
                onChange={handleCustomerSearch}
                className="bg-swLightGray px-4 py-2 rounded outline-none border w-full border-swLightGray h-10"
              />
            </div>
            <div>
              {customer?.loading === "pending" ? (
                <p className="text-center text-gray-500 py-8">
                  Loading customers...
                </p>
              ) : filteredData?.length > 0 ? (
                filteredData.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => {
                      setSelectedCustomer(item);
                      setIsOpen(false);
                      setSearchTerm("");
                      setFilteredData(customer?.data || []);
                    }}
                    className="mb-4 p-4 border rounded-lg shadow-md transition duration-300 hover:bg-gray-100 cursor-pointer"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <div className="text-sm text-gray-800 font-medium">
                          {item.firstName} {item.lastName}
                        </div>
                        <div className="text-xs text-gray-600">
                          {item.email}
                        </div>
                      </div>
                      <div className="text-xs text-gray-800">
                        {item.phoneNumber}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-8">
                  No customers found. Please create a customer first.
                </p>
              )}
            </div>
          </div>
        </CenterModal>
      </main>
    </DashboardLayout>
  );
};

export default TestInstallmentLoan;
