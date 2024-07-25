"use client";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import SharedInvestmentModal from "@/app/components/modals/Investments/SharedInvestmentModal";
import Button from "@/app/components/shared/buttonComponent/Button";
import InputField from "@/app/components/shared/input/InputField";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FiCalendar, FiCopy, FiPlus } from "react-icons/fi";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  closeInvestment,
  getSingleInvestment,
  getTransactionHistory,
  topUpInvestment,
  createWithdrawalRequest,
} from "@/redux/slices/investmentSlice";
import { format } from "date-fns";
import ReusableDataTable from "@/app/components/shared/tables/ReusableDataTable";
import { toast, ToastContainer } from "react-toastify";
import { AiOutlineDelete, AiOutlinePaperClip } from "react-icons/ai";
import { getDefaultReferenceDate } from "@mui/x-date-pickers/internals";
import SelectField from "@/app/components/shared/input/SelectField";
import { useImmer } from "use-immer";
import SuccessModal from "@/app/components/modals/SuccessModal";
import CancelModal from "@/app/components/modals/CancelModal";

const header = [
  { id: "dueDate", label: "Due Date" },
  { id: "datePaid", label: "Date Paid" },
  { id: "amountDue", label: "Amount Due" },
  { id: "roi", label: "ROI" },
  { id: "tranactionType", label: "TransactionType" },
];

const customDataTransformer = (apiData) => {
  return apiData?.map((item) => ({
    id: item?._id,
    dueDate: (
      <div className="text-[15px] font-light text-gray-700">
        {item?.createdAt && format(new Date(item?.createdAt), "PPP")}
      </div>
    ),
    datePaid: (
      <div className="text-[15px] font-light text-gray-700">
        {item?.investorId}
        Date Paid
      </div>
    ),
    amountDue: (
      <div className="text-[15px] font-light text-gray-700">Amount Due</div>
    ),
    roi: <div className="text-[15px] font-light text-gray-700">hello</div>,
    tranactionType: (
      <div className="text-[15px] font-light text-gray-700">
        {item?.transactionType}
      </div>
    ),
  }));
};

export default function InvestmentDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const router = useRouter()
  const [isModalOpen, setModal] = useState(false);
  const [reqWithdrawal, setReqWithdrawal] = useState(false);
  const [openTopUp, setOpenTopUp] = useState(false);
  const { data } = useSelector((state) => state.investment);
  const headClass = "text-lg font-semibold leading-7 text-swBlack mb-5";
  const tableDataClass = " py-3 text-sm leading-6 text-swBlack -ml-1";
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ closeInvestmentReason: "" });
  const [fileError, setFileError] = useState("");
  const [topUpData, setTopUpData] = useState({
    amount: "",
    paymentReceipt: null,
  });
  const [state, setState] = useImmer({
    withdrawAmount: "",
    paymentMethod: "",
  });
  const [successModal, setSuccessModal] = useState(false);
  const [failedModal, setFailedModal] = useState(false);
  const [successModalData, setSuccessModalData] = useState({});
  const [errorModalData, setErrorModalData] = useState({});

  // console.log("withDetasil", data?.data)

  const paymentMethod = [
    { value: "Cash", label: "Cash" },
    { value: "Bank Transfer", label: "Bank Transfer" },
  ];
  const tableOneHeader = [
    { label: "Start Date" },
    { label: "Investment Product ID & Package" },
    { label: "Interest Rate" },
    { label: "Investment Status" },
  ];

  const tableTwoHeader = [
    { label: "Interest on Investment" },
    { label: "Duration" },
    { label: "Maturity Amount" },
    { label: "Maturity Date" },
  ];

  const handleWithdrawalReq = async () => {
    setLoading(true);
    dispatch(
      createWithdrawalRequest({
        id,
        payload: {
          withdrawalAmount: Number(removeCommasFromNumber(state.withdrawAmount)),
          paymentMethod: state.paymentMethod,
        },
      })
    )
      .unwrap()
      .then((res) => {
        setReqWithdrawal(false);
        setSuccessModalData({
          title: "Withdrawal Request successful",
          description: res?.message,
          btnLeft: "View investments",
          btnRight: "Close",
          btnRightFunc: () => {
            setSuccessModalData({});
            setSuccessModal(false);
          },
        });
        setSuccessModal(true);
        setState((draft) => {
          draft.withdrawAmount = "";
          draft.paymentMethod = "";
        });
        setLoading(false);
      })
      .catch((err) => {
        setReqWithdrawal(false);
        setErrorModalData({
          description: err?.message,
        });
        setFailedModal(true);
        setLoading(false);
      });
  };

  const handleCloseInvestment = () => {
    setLoading(true);
    dispatch(closeInvestment({ id, payload: formData }))
      .unwrap()
      .then((res) => {
        
        setSuccessModalData({
          title: "Investment Closed Successfully",
          description: res?.message,
          btnLeft: "View investments",
          btnRight: "Close",
          btnRightFunc: () => {
            setSuccessModalData({});
            setSuccessModal(false);
          },
        });
        setSuccessModal(true);
        setFormData({ closeInvestmentReason: "" });
        dispatch(getSingleInvestment(id));
        setModal(false);
        setLoading(false);
      })
      .catch((err) => {
        setModal(false);
        setErrorModalData({
          description: err?.message,
        });
        setFailedModal(true);
        setLoading(false);
      });
  };

  // Close investment modal
  const modalChildren = (
    <>
      <div>
        <div className="mx-auto w-fit p-6">
          <Image src={"/images/warning_sign.svg"} width={42} height={42} />
        </div>
        <p className="text-sm leading-5 text-center text-swBlack gap-2 p-6">
          You are trying to close this investment for this customer. Kindly
          input the reason.
        </p>
        <div className="gap-2 px-6">
          <InputField
            placeholder={"Enter reason for closing investment"}
            value={formData.closeInvestmentReason}
            onChange={(e) =>
              setFormData({ closeInvestmentReason: e.target.value })
            }
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-10 px-6">
          <span
            onClick={() => {
              setFormData({ closeInvestmentReason: "" });
              setModal(false);
            }}
            className={`py-2 px-12 justify-center text-swTextColor font-semibold rounded-md outline outline-1 
                     outline-gray-200 flex gap-2 border w-full cursor-pointer hover:shadow-lg
                    `}
          >
            Cancel
          </span>

          {/* <div  className="w-fit"> */}
          <Button
            onClick={handleCloseInvestment}
            disabled={loading}
            className="rounded-md font-semibold w-full"
          >
            Close Investment
          </Button>
          {/* </div> */}
        </div>
      </div>
    </>
  );

  const preventMinus = (e) => {
    if (/[^0-9,]/g.test(e.key)) {
      e.preventDefault();
    }
  };

  const removeCommasFromNumber = (numberString) => {
    if (typeof numberString !== "string") {
      // Convert to string or handle the case appropriately
      numberString = String(numberString);
    }
    return numberString.replace(/,/g, "");
  };

  const handleTopUp = () => {
    setLoading(true);
    const payload = new FormData();

    payload.append("amount", Number(removeCommasFromNumber(topUpData.amount)));
    payload.append("paymentReceipt", topUpData.paymentReceipt);

    dispatch(topUpInvestment({ id, payload }))
      .unwrap()
      .then((res) => {
        const newAmount = topUpData.amount;

        setSuccessModalData({
          title: "Topup Successful",
          description: `Topup of ₦${newAmount} was successful`,
          btnLeft: "View investments",
          btnRight: "Top up",
          btnRightFunc: () => {
            setSuccessModalData({});
            setSuccessModal(false);
            setOpenTopUp(true);
          },
        });
        setSuccessModal(true);
        dispatch(getSingleInvestment(id));
        setTopUpData({ amount: "", paymentReceipt: null });
        setOpenTopUp(false);
        setLoading(false);
      })
      .catch((err) => {
        setOpenTopUp(false);
        setErrorModalData({
          description: err?.message,
        });
        setFailedModal(true);
        setLoading(false);
      });
  };

  const handleFileChange = (e) => {
    setFileError("");
    let { name, files } = e.target;
    const file = files[0];
    const fileExtension = file.name.split(".").pop().toLowerCase();

    const allowedExtensions = ["jpg", "jpeg", "png", "pdf"];
    if (!allowedExtensions.includes(fileExtension)) {
      setFileError(
        "Invalid file type. Please select an image (.jpg, .jpeg, .png) or PDF (.pdf)."
      );
      return;
    }
    setTopUpData((prevFormData) => ({
      ...prevFormData,
      [name]: file,
    }));
  };

  const deleteFile = (name) => {
    setTopUpData((prevFormData) => ({
      ...prevFormData,
      [name]: null,
    }));
  };

  const resetTopUpField = () => {
    setTopUpData({ amount: "", paymentReceipt: null });
  };

  // request withdrawal modal
  const reqWithChildren = (
    <>
      <div className="px-6">
        <div className="pt-5 pb-10">
          <InputField
            placeholder={"Enter amount"}
            label={"Amount"}
            required={true}
            onKeyPress={preventMinus}
            value={state.withdrawAmount}
            onChange={(e) => {
              setState((draft) => {
                draft.withdrawAmount = Number(
                  e.target.value.replace(/[^0-9.]/g, "")
                ).toLocaleString();
              });
            }}
          />
        </div>
        <div className="mb-10">
          <SelectField
            name={"paymentMethod"}
            label={"Payment method"}
            required={true}
            placeholder={"Select Payment Method"}
            optionValue={paymentMethod}
            onChange={(e) => {
              setState((draft) => {
                draft.paymentMethod = e.value;
              });
            }}
          />
        </div>
        <div className="flex justify-end gap-3 pb-5">
          <span
            onClick={() => setReqWithdrawal(false)}
            className={`py-2 px-5 justify-center text-swTextColor font-semibold rounded-md outline outline-1 
              outline-gray-200 flex gap-2 border cursor-pointer hover:shadow-lg
            `}
          >
            Cancel
          </span>
          <Button
            onClick={handleWithdrawalReq}
            disabled={
              state.withdrawAmount === "" ||
              state.paymentMethod === "" ||
              loading
                ? true
                : false
            }
            className="rounded-md font-semibold"
          >
            Confirm
          </Button>
        </div>
      </div>
    </>
  );

  // top up modal
  const topUpChildren = (
    <>
      <div>
        <div className="gap-2 px-6">
          <InputField
            // placeholder={"Enter reason for closing investment"}
            label={"Amount"}
            required={true}
            value={topUpData.amount}
            onKeyPress={preventMinus}
            onChange={(e) =>
              setTopUpData((prev) => ({
                ...prev,
                amount: Number(
                  e.target.value.replace(/[^0-9.]/g, "")
                ).toLocaleString(),
              }))
            }
          />

          <div className="pt-4">
            <p className="font-medium pt-2 text-sm">Upload Payment Receipt</p>
            <p className="text-xs pt-2">
              Document types uploaded should be JPEGS, PNG or PDF and should not
              exceed 4mb
            </p>
            {fileError && <p className="text-red-500 text-sm">{fileError}</p>}
            <div className="relative w-full">
              <input
                name="paymentReceipt"
                type="file"
                id="fileInput"
                className="absolute w-0 h-0 opacity-0"
                onChange={handleFileChange}
                onClick={(e) => (e.target.value = null)}
              />
              <label
                htmlFor="fileInput"
                className="px-4 py-2 text-white rounded-md cursor-pointer"
              >
                <span className="py-2 px-6 rounded-md flex gap-2 border w-full justify-center">
                  <AiOutlinePaperClip color="black" size={20} />
                  <p className="font-semibold text-black">
                    {topUpData?.paymentReceipt ? "Change file" : "Select file"}
                  </p>
                </span>
              </label>
              {topUpData?.paymentReceipt != null ? (
                <div
                  id="fileLabel"
                  className="bg-swLightGray p-2 flex justify-between"
                >
                  <div className="text-xs">
                    {topUpData?.paymentReceipt?.name}
                  </div>
                  <div
                    onClick={() => {
                      deleteFile("paymentReceipt");
                    }}
                  >
                    <AiOutlineDelete color="red" size={20} />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-10 px-6">
          <span
            onClick={() => {
              resetTopUpField();
              setOpenTopUp(false);
            }}
            className={`py-2 px-12 justify-center text-swTextColor font-semibold rounded-md outline outline-1 
                     outline-gray-200 flex gap-2 border w-full cursor-pointer hover:shadow-lg
                    `}
          >
            Cancel
          </span>
          <Button
            onClick={handleTopUp}
            disabled={loading}
            className="rounded-md font-semibold w-full"
          >
            Confirm
          </Button>
          {/* </div> */}
        </div>
      </div>
    </>
  );

  const header = [
    { id: "dueDate", label: "Date Transaction" },
    { id: "amountDue", label: "Amount" },
    { id: "previousBalance", label: "Previous Principal" },
    { id: "currentBalance", label: "New Principal" },
    { id: "transactionType", label: "Transaction Type" },
    { id: "initiatedBy", label: "Initiated By" },
  ];

  const customDataTransformer = (apiData) => {
    return apiData?.map((item) => ({
      id: item?._id,
      dueDate: (
        <div className="text-[15px] font-light text-gray-700">
          {" "}
          {item?.createdAt && format(new Date(item?.createdAt), "PPP")}
        </div>
      ),
      datePaid: (
        <div className="text-[15px] font-light text-gray-700">
          {item.transactionType}
        </div>
      ),
      amountDue: (
        <div className="text-[15px] font-light text-gray-700">
          ₦ {item.amount.toLocaleString()}
        </div>
      ),
      previousBalance: (
        <div className="text-[15px] font-light text-red-700">
          ₦ {item.previousBalance.toLocaleString()}
        </div>
      ),
      currentBalance: (
        <div className="text-[15px] font-light text-green-700">
          ₦ {item.currentBalance.toLocaleString()}
        </div>
      ),
      transactionType: (
        <button
          className={`${
            item.transactionStatment === ""
              ? "bg-[#E7F1FE] text-swBlue text-xs font-normal px-2 py-1 rounded-full"
              : item.transactionStatment === "Top Up"
              ? "bg-green-50 text-swGreen"
              : "text-red-400 bg-red-100"
          } px-2 py-1 rounded-full`}
        >
          {item?.transactionStatment}
        </button>
      ),
      initiatedBy: (
        <div className="text-[13px] font-medium text-gray-700">
          {item?.createdBy?.email}
        </div>
      ),
    }));
  };

  const renderTable = ({ tableHeader, tableContent }) => (
    <div className="border rounded-2xl overflow-x-auto">
      <div className="grid grid-cols-4 border-b py-2 bg-swLightGray rounded-t-2xl">
        {tableHeader.map((header, index) => {
          return (
            <h6
              key={index}
              className={`${index !== 0 ? "flex justify-between" : "pl-5"}
                            leading-6 font-medium text-sm text-swBlack
                        `}
            >
              {header.label}
            </h6>
          );
        })}
      </div>

      <div className="grid grid-cols-4 gap-4">{tableContent}</div>
    </div>
  );

  useEffect(() => {
    dispatch(getSingleInvestment(id));
  }, []);

  return (
    <DashboardLayout
      isBackNav={true}
      paths={["Investors", "Investment details"]}
    >
      <div>
        {/* Header */}
        <div className="border-b-2 pb-5 mb-5">
          <div className="block lg:flex justify-between mt-10 px-5">
            <div className="block lg:flex lg:w-2/5 gap-4 relative">
              <div className="rounded-full border-2 border-swYellow600 overflow-hidden h-[3.5rem] w-[3.5rem]">
                <img
                  src={"/images/inv-pfp.png"}
                  alt="profile"
                  className="cursor-pointer"
                />
              </div>
              <div className="">
                <p className="font-semibold text-xl text-swGold leading-7">
                  {data?.data?.investorProfile?.firstName}{" "}
                  {data?.data?.investorProfile?.lastName}
                </p>
                <p className="text-sm leading-5 text-swGray">
                  {data?.data?.investorProfile?.investorId}
                </p>

                <div className="flex justify-between gap-4 mt-5 text-sm mb-10 lg:mb-1">
                  <div onClick={() => setReqWithdrawal(true)}>
                    <Button className="rounded-md flex gap-2">
                      Request Withdrawal
                    </Button>
                  </div>
                  <button
                    onClick={() => setModal(true)}
                    disabled={data?.data?.status === "Closed"}
                    className={`${
                      data?.data?.status === "Closed"
                        ? "cursor-not-allowed"
                        : ""
                    } rounded-md py-2 px-3 font-medium text-swBlue border border-sky-500 hover:shadow-lg cursor-pointer`}
                  >
                    Close investment
                  </button>
                </div>
              </div>
              {/* <span
                className={`${
                  data?.data?.status === "Closed"
                    ? "bg-red-500"
                    : "bg-swLightBlue"
                } text-xs text-white leading-4 h-5 rounded-full 
                        py-0.5 px-3 absolute left-24 lg:left-64 top-7`}
              >
                {data?.data?.status}
              </span> */}
            </div>

            <div className="lg:flex justify-between w-full lg:w-3/5 gap-6 text-swTextColor lg:pl-10">
              <div className="bg-swLightGray rounded-lg p-4 lg:w-2/5 h-30 mb-5 lg:mb-1 ">
                <p className="mb-3 text-base font-medium leading-6 text-swBlue">
                  Investment ID
                </p>
                <h2 className="font-medium leading-8 text-2xl">
                  {data?.data?.investmentId}
                </h2>
              </div>
              <div className="bg-swLightGray lg:w-3/5 p-4 rounded-lg h-30 mb-5 lg:mb-1 ">
                <p className="mb-3 text-base font-medium leading-6 text-swBlue">
                  Investment Amount
                </p>
                <div className="flex justify-between">
                  <h2 className="font-medium leading-8 text-2xl">
                    ₦ {data?.data?.currentInvestmentPrincipal?.toLocaleString()}
                  </h2>
                  <span
                    className="flex gap-2 border text-sm px-3 py-2 font-semibold rounded-md cursor-pointer bg-white"
                    onClick={() => setOpenTopUp(true)}
                  >
                    <FiCopy className="" size={16} />
                    <p className="-mt-0.5 ">Top up</p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="gap-8">
          <div className="px-5 gap-4 py-3">
            <h1 className={`${headClass}`}>Investment Details</h1>
            {renderTable({
              tableHeader: tableOneHeader,
              tableContent: (
                <>
                  <p className={`pl-5 py-3 text-swBlack text-sm `}>
                    {data?.data?.createdAt &&
                      format(new Date(data?.data?.createdAt), "PPP")}
                  </p>
                  <p>
                    <p className={`${tableDataClass}`}>
                      {data?.data?.investmentProduct?.investmentProductId}
                    </p>
                    <p className="text-swGray text-sm leading-5 -mt-3 -ml-1 mb-2">
                      {data?.data?.investmentProduct?.name}
                    </p>
                  </p>
                  <p>
                    <p className="text-swGray text-sm leading-5 mt-4 -ml-1 mb-2 capitalize">
                      {data?.data?.interestRate?.value}% (
                      {data?.data?.interestRate?.metric})
                    </p>
                  </p>
                  <p
                    className={`-ml-1 mt-2 py-3 px-6 border border-swGreen bg-green-100 text-sm text-swGreen leading-4 h-6 rounded-full flex justify-center items-center w-fit`}
                  >
                    {data?.data.status}
                  </p>
                </>
              ),
            })}
          </div>

          {/* Table 2 */}
          <div className="px-5 py-5">
            {renderTable({
              tableHeader: tableTwoHeader,
              tableContent: (
                <>
                  <p className={`pl-5 py-3 text-swBlack text-sm `}>
                    {data?.data?.expectedInterest?.toLocaleString()}
                  </p>
                  <p className={`${tableDataClass}`}>
                    {data?.data?.duration?.value}{" "}
                    {data?.data?.duration?.metric === "Month"
                      ? "Months"
                      : data?.data?.duration?.metric === "Quarter"
                      ? "Quarters"
                      : "Years"}
                  </p>
                  <p className={`${tableDataClass}`}>
                    ₦ {data?.data?.maturityAmount?.toLocaleString()}
                  </p>
                  <p className={`${tableDataClass}`}>
                    {data?.data?.maturityDate &&
                      format(new Date(data?.data?.maturityDate), "PPP")}
                  </p>
                </>
              ),
            })}
          </div>

          <div className="px-5 py-5">
            <h1 className={`${headClass}`}>Transaction History</h1>
            <div className="border rounded-2xl overflow-x-auto">
              <ReusableDataTable
                dataTransformer={customDataTransformer}
                headers={header}
                initialData={[]}
                apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/investment/transactions/${id}`}
                pagination={true}
              />
            </div>
          </div>
        </div>
      </div>

      <SharedInvestmentModal
        css={"max-w-lg"}
        header={"Close Investment"}
        isOpen={isModalOpen}
        onClose={setModal}
        children={modalChildren}
      />
      <SharedInvestmentModal
        css={"max-w-lg"}
        header={"Topup"}
        isOpen={openTopUp}
        onClose={setOpenTopUp}
        children={topUpChildren}
      />
      <SharedInvestmentModal
        css={"max-w-lg"}
        header={"Request Withdrawal"}
        isOpen={reqWithdrawal}
        onClose={setReqWithdrawal}
        children={reqWithChildren}
      />
      <SuccessModal
        isOpen={successModal}
        title={successModalData.title}
        description={successModalData.description}
        btnLeft={successModalData.btnLeft}
        btnLeftFunc={() => router.push("/investors")}
        btnRight={successModalData.btnRight}
        btnRightFunc={successModalData.btnRightFunc}
        onClose={() => {
          setSuccessModalData({});
          setSuccessModal(false);
        }}
      />
      <CancelModal
        isOpen={failedModal}
        title={"An error has occured"}
        description={errorModalData?.description}
        noButtons={true}
        onClose={() => {
          setErrorModalData({});
          setFailedModal(false);
        }}
      />
    </DashboardLayout>
  );
}
