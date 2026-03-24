"use client";
import LoanProcessCard from "@/app/components/cards/loanProcessCard/LoanProcessCard";
import CustomerActivityLogs from "@/app/components/customers/CustomerActivityLogs";
import CustomerPaymentHistory from "@/app/components/customers/CustomerHistoryPayment";
import CustomerLoanDoc from "@/app/components/customers/CustomerLoanDoc";
import CustomerLoanTransactions from "@/app/components/customers/CustomerLoanTransactions";
import CustomerRepayment from "@/app/components/customers/CustomerRepayment";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import { loanApplicationAuthRoles } from "@/app/components/helpers/pageAuthRoles";
import CorrectLoanModal from "@/app/components/loanApplication/ViewLoan/CorrectLoanModal";
import LoanRestructureTab from "@/app/components/loans/LoanRestructureTab";
import CenterModal from "@/app/components/modals/CenterModal";
import ApprovalModal from "@/app/components/modals/loans/ApprovalModal";
import DeclineModal from "@/app/components/modals/loans/DeclineModal";
import RequestApproval from "@/app/components/modals/loans/RequestApproval";
import RestructureLoanModal from "@/app/components/modals/loans/RestructureModal";
import Button from "@/app/components/shared/buttonComponent/Button";
import EditableButton from "@/app/components/shared/editableButtonComponent/EditableButton";
import InputField from "@/app/components/shared/input/InputField";
import SelectField from "@/app/components/shared/input/SelectField";
import Loader from "@/app/components/shared/Loader";
import { bankArr, API_URL } from "@/constant";
import { formatDate } from "@/helpers";
import axios from "axios";
import { getInterestType } from "@/redux/slices/interestTypeSlice";
import {
  disburseLoan,
  getSingleLoan,
  loanStatementOfAccount,
  updateLoanApplication,
} from "@/redux/slices/loanApplicationSlice";
import { getLoanApprovals } from "@/redux/slices/loanApprovalSlice";
import { getLoanPackage } from "@/redux/slices/loanPackageSlice";
import { getAllUsers } from "@/redux/slices/userSlice";
import { format } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import { AiOutlineDelete, AiOutlinePaperClip } from "react-icons/ai";
import { FaRegCalendar } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { MdClose, MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewLoan = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { error, data } = useSelector((state) => state?.loanApplication);
  const loanPackage = useSelector((state) => state?.loanPackage);
  //const interestType = useSelector((state) => state.interestType);
  const user = useSelector((state) => state?.user?.data?.data?.results);
  const loanApprovals = useSelector((state) => state?.loanApprovals);
  const [activityButton, setActivityButton] = useState("activity-logs");
  const [isRequestApprovalOpen, setIsRequestApprovalOpen] = useState(false);
  const [isApprovalOpen, setApprovalOpen] = useState(false);
  const [isDeclineOpen, setDeclineOpen] = useState(false);
  const [openLoanAmount, setOpenLoanAmount] = useState(false);
  const [loanAmount, setLoanAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [currentApprovalLevel, setCurrentApprovalLevel] = useState(null);
  const [currentApprovalId, setCurrentApprovalId] = useState(null);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [useriD, setUser] = useState(null);
  const [openLoanPackage, setOpenLoanPackage] = useState(false);
  const [openInterestType, setOpenInterestType] = useState(false);
  const [openRepaymentType, setOpenRepaymentType] = useState(false);
  const [openLoanPeriod, setOpenLoanPeriod] = useState(false);
  const [openLoanFrequency, setOpenLoanFrequency] = useState(false);
  const [loanReassignment, setLoanReassignment] = useState(false);
  const [isRestructureOpen, setIsRestructureOpen] = useState(false);
  const [usersToApprove, setUsersToApprove] = useState([]);
  const [fileError, setFileError] = useState("");
  const router = useRouter();
  const [logRepayment, setLogRepayment] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statementLoad, setStatementLoad] = useState(false);
  const [openCorrectLoanModal, setOpenCorrectLoanModal] = useState(false);
  const [openDibursementDatePicker, setOpenDisbursementDatePicker] =
    useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    paymentMethod: "",
    disbursementDate: new Date(),
    docs: null,
  });

  const { statementData, statementPending } = useSelector(
    (state) => state?.loanApplication
  );
  const [testTriggerLoading, setTestTriggerLoading] = useState(false);
  const [daysToAdvance, setDaysToAdvance] = useState(1);

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

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: file,
    }));
  };

  const deleteFile = (name) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: null,
    }));
  };

  const setDisbursementInputState = async (e) => {
    let { name, value } = e.target;
    const ariaLabel = e.target.getAttribute("aria-label");

    if (ariaLabel === "Number input") {
      const num = Number(value.replace(/\D/g, ""));
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: num,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleDisbursementSelectChange = async (selectedOption, name) => {
    setFormData({
      ...formData,
      [name]: selectedOption.value,
    });
  };

  const frequencyTypeData = [
    { value: "Monthly", label: "Monthly" },
    { value: "Quarterly", label: "Quarterly" },
  ];

  const handleDownload = async () => {
    const downloadUrl = data?.data?.loanApplication?.offerLetter;
    try {
      const response = await fetch(downloadUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${data?.data?.customerDetails?.firstName} ${data?.data?.customerDetails?.lastName} - Offer Letter`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      toast.success("Download complete!");
    } catch (error) {
      toast.error(error);
      console.error("Error downloading file:", error);
    }
  };

  const paymentMethodTypes = [
    { value: "cash", label: "Cash" },
    { value: "bankTransfer", label: "Bank Transfer" },
  ];

  const handleActivityToggle = (buttonId) => {
    setActivityButton(buttonId);
  };

  const preventMinus = (e) => {
    if (/[^0-9,]/g.test(e.key)) {
      e.preventDefault();
    }
  };

  const updateLoan = (update) => {
    setLoading(true);
    if (update === "loanAmount") {
      let updatedData = new FormData();
      updatedData.append("loanAmount", loanAmount);

      dispatch(updateLoanApplication({ loanId: id, payload: updatedData }))
        .unwrap()
        .then(() => {
          dispatch(getSingleLoan(id));
          setOpenLoanAmount(false);
          setFormData({});
          setLoading(false);
        })
        .catch((error) => {
          setOpenLoanAmount(false);
          setFormData({});
          toast.error(error?.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setLoading(false);
        });
    } else if (update === "interestRate") {
      let updatedData = new FormData();
      // Backend expects interest rate as a percentage value (e.g. 10 for 10% per month)
      updatedData.append("interestRate", interestRate);

      dispatch(updateLoanApplication({ loanId: id, payload: updatedData }))
        .unwrap()
        .then(() => {
          dispatch(getSingleLoan(id));
          setOpenInterestType(false);
          setFormData({});
          setLoading(false);
        })
        .catch((error) => {
          setOpenLoanAmount(false);
          setFormData({});
          toast.error(error?.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setLoading(false);
        });
    } else if (update === "loanFrequencyType") {
      const updateLoanFreqencyType = () => {
        let updatedData = new FormData();
        updatedData.append("loanFrequencyType", formData.loanFrequencyType);
        if (
          formData.loanFrequencyType === "Monthly" &&
          data?.data?.loanApplication?.loanDurationMetrics === "Monthly"
        ) {
          updatedData.append(
            "numberOfRepayment",
            data?.data?.loanApplication?.loanDuration
          );
        }
        if (
          formData.loanFrequencyType === "Monthly" &&
          data?.data?.loanApplication?.loanDurationMetrics === "Yearly"
        ) {
          updatedData.append(
            "numberOfRepayment",
            data?.data?.loanApplication?.loanDuration * 12
          );
        }
        if (
          formData.loanFrequencyType === "Quarterly" &&
          data?.data?.loanApplication?.loanDurationMetrics === "Monthly"
        ) {
          updatedData.append(
            "numberOfRepayment",
            data?.data?.loanApplication?.loanDuration / 3
          );
        }
        if (
          formData.loanFrequencyType === "Quarterly" &&
          data?.data?.loanApplication?.loanDurationMetrics === "Yearly"
        ) {
          updatedData.append(
            "numberOfRepayment",
            (data?.data?.loanApplication?.loanDuration * 12) / 3
          );
        }
        dispatch(updateLoanApplication({ loanId: id, payload: updatedData }))
          .unwrap()
          .then(() => {
            dispatch(getSingleLoan(id));
            setOpenLoanFrequency(false);
            setFormData({});
            setLoading(false);
          })
          .catch((error) => {
            setOpenLoanFrequency(false);
            toast.error(error?.message, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setFormData({});
            setLoading(false);
          });
      };
      updateLoanFreqencyType();
    } else if (update === "loanDuration") {
      const updateLoanDurationMetrics = () => {
        let updatedData = new FormData();
        updatedData.append("loanDurationMetrics", formData.loanDurationMetrics);
        if (
          data?.data?.loanApplication?.loanFrequencyType === "Monthly" &&
          formData?.loanDurationMetrics === "Monthly"
        ) {
          updatedData.append("numberOfRepayment", formData.loanDuration);
          updatedData.append("loanDuration", formData.loanDuration);
        } else if (
          data?.data?.loanApplication?.loanFrequencyType === "Quarterly" &&
          formData.loanDurationMetrics === "Monthly"
        ) {
          updatedData.append("numberOfRepayment", formData.loanDuration / 3);
          updatedData.append("loanDuration", formData.loanDuration);
        } else if (
          data?.data?.loanApplication?.loanFrequencyType === "Monthly" &&
          formData.loanDurationMetrics === "Yearly"
        ) {
          updatedData.append("numberOfRepayment", formData.loanDuration * 12);
          updatedData.append("loanDuration", formData.loanDuration);
        } else if (
          data?.data?.loanApplication?.loanFrequencyType === "Quarterly" &&
          formData.loanDurationMetrics === "Yearly"
        ) {
          updatedData.append(
            "numberOfRepayment",
            (formData.loanDuration * 12) / 3
          );
          updatedData.append("loanDuration", formData.loanDuration);
        }
        dispatch(updateLoanApplication({ loanId: id, payload: updatedData }))
          .unwrap()
          .then(() => {
            dispatch(getSingleLoan(id));
            setOpenLoanPeriod(false);
            setFormData({});
            setLoading(false);
          })
          .catch((error) => {
            setOpenLoanPeriod(false);
            toast.error(error?.message, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setFormData({});
            setLoading(false);
          });
      };
      updateLoanDurationMetrics();
    } else if (update === "loanPackage") {
      let updatedData = new FormData();
      updatedData.append("loanPackage", formData.loanPackage);

      dispatch(updateLoanApplication({ loanId: id, payload: updatedData }))
        .unwrap()
        .then(() => {
          dispatch(getSingleLoan(id));
          setOpenLoanPackage(false);
          setFormData({});
          setLoading(false);
        })
        .catch((error) => {
          setOpenLoanPackage(false);
          setFormData({});
          toast.error(error?.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setLoading(false);
        });
    } else if (update === "repaymentType") {
      let updatedData = new FormData();
      updatedData.append("repaymentType", formData.repaymentType);

      dispatch(updateLoanApplication({ loanId: id, payload: updatedData }))
        .unwrap()
        .then(() => {
          dispatch(getSingleLoan(id));
          setOpenRepaymentType(false);
          setFormData({});
          setLoading(false);
        })
        .catch((error) => {
          setOpenRepaymentType(false);
          setFormData({});
          toast.error(error?.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setLoading(false);
        });
    } else if (update === "loan-reassignment") {
      let updatedData = new FormData();
      updatedData.append("createdBy", formData.createdBy);
      dispatch(updateLoanApplication({ loanId: id, payload: updatedData }))
        .unwrap()
        .then(() => {
          dispatch(getSingleLoan(id));
          setLoanReassignment(false);
          setFormData({});
          setLoading(false);
        })
        .catch((error) => {
          setLoanReassignment(false);
          setFormData({});
          toast.error(error?.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setLoading(false);
        });
    }
  };

  const modifyLoanPackageData = (arr) => {
    return arr?.map((item) => ({
      label: item.name,
      value: item._id,
      interestRate: item?.interestRate?.rate,
    }));
  };

  const setInputState = async (e) => {
    let { name, value } = e.target;
    const ariaLabel = e.target.getAttribute("aria-label");

    if (ariaLabel === "Number input") {
      const num = Number(value.replace(/\D/g, ""));
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: num,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const repaymentTypeData = [
    { value: "bulletRepayment", label: "Bullet Repayment" },
    { value: "interestServicing", label: "Interest Servicing" },
    { value: "installmentPayment", label: "Installment Payment" },
  ];

  const reducingBalrepaymentTypeData = [
    { value: "installmentPayment", label: "Installment Payment" },
  ];

  const loanDurationMetricsData = [
    { value: "Monthly", label: "Monthly" },
    { value: "Yearly", label: "Yearly" },
  ];

  const handleSelectChange = async (selectedOption, name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: selectedOption.value,
    }));
  };

  const submitLoanUpdate = (e) => {
    let payload = new FormData();
    payload.append("paymentMethod", formData.paymentMethod);
    payload.append("disbursementReceipt", formData.docs);
    payload.append(
      "disbursementDate",
      format(formData.disbursementDate, "yyyy-MM-dd")
    );

    setLoading(true);
    e.preventDefault();
    dispatch(disburseLoan({ loanId: id, payload: payload }))
      .unwrap()
      .then(() => {
        toast("Loan status Updated to disbursed");
        setLoading(false);
        setLogRepayment(!logRepayment);
        dispatch(getSingleLoan(id));
      })
      .catch((error) => {
        toast.error(`${error?.message}`);
        setLoading(false);
        setLogRepayment(!logRepayment);
      });
  };

  const modifyUsersToApprove = () => {
    if (Array.isArray(user)) {
      const users = user.filter((item) => item?.role?.tag === "LO");

      setUsersToApprove(
        users.map((item) => ({
          label: item.firstName + " " + item.lastName,
          value: item._id,
        }))
      );
    }
  };

  useEffect(() => {
    const _user = JSON.parse(localStorage.getItem("user"));
    if (_user) {
      setUser(_user?.data?.user);
    }
    if (data) {
      setLoanAmount(data?.data?.loanApplication?.loanAmount);
    }
    dispatch(getLoanApprovals(id));
    dispatch(getAllUsers());
    dispatch(getSingleLoan(id));
    dispatch(getLoanPackage());
    dispatch(getInterestType());
    // dispatch(loanStatementOfAccount());
  }, []);

  const principalDue =
    Number(data?.data?.principalDueScheduled ?? NaN) ||
    (Array.isArray(data?.data?.dueRepayments)
      ? data?.data?.dueRepayments.reduce(
          (sum, r) => sum + Number(r?.principalDueRemaining || 0),
          0
        )
      : 0);

  useEffect(() => {
    modifyUsersToApprove();
  }, []);

  let hasDecline;

  const hasDeclineStatus = () => {
    const approvals = loanApprovals?.data?.data;

    if (!Array.isArray(approvals)) {
      // Handle the case where approvals is not an array
      return false;
    }

    for (const approval of approvals) {
      if (approval.status === "Declined") {
        return true;
      }
    }

    return false;
  };

  // const hasDeclineStatus = () => {
  //   for (const approval of loanApprovals?.data?.data || []) {
  //     if (approval.status === "Declined") {
  //       return true;
  //     }
  //   }

  //   return false;
  // };

  const getLoanStatement = async () => {
    setStatementLoad(true);
    try {
      const url = await dispatch(loanStatementOfAccount(id)).unwrap();
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error viewing document:", error);
    } finally {
      setStatementLoad(false);
    }
  };

  // Test loan trigger functions
  const triggerDailyAccrual = async () => {
    setTestTriggerLoading(true);
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      const response = await axios.post(
        `${API_URL}/loan-application/test-loans/trigger-accrual`,
        {
          loanApplicationId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${userData?.data?.token}`,
          },
        }
      );

      if (response.data.status === "success") {
        dispatch(getSingleLoan(id));
        toast.success("Daily interest accrued successfully!");
      }
    } catch (error) {
      console.error("Error triggering accrual:", error);
      toast.error(error.response?.data?.error || "Failed to trigger accrual");
    } finally {
      setTestTriggerLoading(false);
    }
  };

  const advanceDays = async () => {
    if (!daysToAdvance || daysToAdvance < 1) {
      toast.error("Please enter a valid number of days (1-365)");
      return;
    }

    setTestTriggerLoading(true);
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      const response = await axios.post(
        `${API_URL}/loan-application/test-loans/advance-days`,
        {
          loanApplicationId: id,
          days: parseInt(daysToAdvance),
        },
        {
          headers: {
            Authorization: `Bearer ${userData?.data?.token}`,
          },
        }
      );

      if (response.data.status === "success") {
        dispatch(getSingleLoan(id));
        toast.success(`Advanced ${daysToAdvance} day(s) successfully!`);
      }
    } catch (error) {
      console.error("Error advancing days:", error);
      toast.error(error.response?.data?.error || "Failed to advance days");
    } finally {
      setTestTriggerLoading(false);
    }
  };

  const triggerOverdueAccrual = async () => {
    setTestTriggerLoading(true);
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      const response = await axios.post(
        `${API_URL}/loan-application/test-loans/trigger-overdue`,
        {
          loanApplicationId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${userData?.data?.token}`,
          },
        }
      );

      if (response.data.status === "success") {
        dispatch(getSingleLoan(id));
        toast.success("Overdue accrual triggered successfully!");
      }
    } catch (error) {
      console.error("Error triggering overdue accrual:", error);
      toast.error(error.response?.data?.error || "Failed to trigger overdue accrual");
    } finally {
      setTestTriggerLoading(false);
    }
  };

  if (loanApprovals?.data?.data) {
    hasDecline = hasDeclineStatus();
  }
  // Show loading state if data is not available
  if (!data?.data) {
    return (
      <DashboardLayout
        isBackNav={true}
        paths={["Loan Applications", "View loan"]}
        roles={loanApplicationAuthRoles}
      >
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      isBackNav={true}
      paths={["Loan Applications", "View loan"]}
      roles={loanApplicationAuthRoles}
    >
      <ToastContainer />
      <main className="flex min-h-full bg-gradient-to-b from-[#f0f6fc] via-gray-50 to-gray-50">
        <section className="w-full md:w-[70%] border-r border-gray-200 pb-20">
          <section
            id="customer_details"
            className="m-5 flex flex-col xl:flex-row gap-6 items-start xl:items-center rounded-2xl border border-gray-100/90 bg-white px-5 py-5 shadow-sm"
          >
            <div className="w-full xl:w-[40%] border-b xl:border-b-0 xl:border-r border-gray-100 pb-4 xl:pb-0 xl:pr-4 shrink-0">
              <div className="flex items-start sm:items-center">
                <div className="shrink-0 mt-1 sm:mt-0">
                  <img
                    src={
                      data?.data?.loanApplication?.customerId?.customerId?.profilePicture || 
                      data?.data?.customerDetails?.profilePicture ||
                      "https://cdn-icons-png.flaticon.com/512/4128/4128349.png"
                    }
                    alt="user image"
                    width={64}
                    height={64}
                    className="rounded-full border-2 border-gray-50 shadow-sm"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                </div>
                <div className="ml-4 h-fit flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <p className="text-lg font-semibold text-swBlue truncate max-w-full">
                      {data?.data?.customerDetails?.firstName}{" "}
                      {data?.data?.customerDetails?.lastName}
                    </p>
                    <span
                      className={`${
                        data?.data?.loanApplication?.status === "Pending"
                          ? "bg-swIndicatorLightRed"
                          : data?.data?.loanApplication?.status === "In Progress"
                          ? "bg-swIndicatorYellow"
                          : data?.data?.loanApplication?.status === "Ready for Disbursal"
                          ? "bg-swIndicatorPurple"
                          : data?.data?.loanApplication?.status === "Disbursed"
                          ? "bg-swBlue"
                          : data?.data?.loanApplication?.status === "Fully Paid"
                          ? "bg-swGreen"
                          : "bg-swIndicatorDarkRed"
                      } px-2.5 py-0.5 rounded-full text-[10px] font-medium text-white uppercase tracking-wider shrink-0`}
                    >
                      {data?.data?.loanApplication?.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 font-medium truncate">
                    {data?.data?.loanApplication?.customerId?.customerId}
                  </p>

                  <div className="flex flex-wrap gap-2 items-center h-fit mt-3">
                    {useriD?.role?.tag === "CFO" || useriD?.role?.tag === "FO" ? (
                      <button
                        className="text-white text-xs bg-swBlue hover:bg-swBlueActiveStateBg px-3 py-1.5 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={data?.data?.loanApplication?.status !== "Ready for Disbursal"}
                        onClick={() => setLogRepayment(!logRepayment)}
                      >
                        Disburse
                      </button>
                    ) : null}

                    <button
                      onClick={() => router.push(`/borrowers/profile/${data?.data?.customerDetails?._id}`)}
                      className="text-swBlue text-xs border border-swBlue/20 hover:bg-swBlue/5 px-3 py-1.5 rounded-md font-medium transition-colors"
                    >
                      Profile
                    </button>

                    {data?.data?.loanApplication?.offerLetter != null ? (
                      <a
                        download
                        className="text-swBlue text-xs border border-swBlue/20 hover:bg-swBlue/5 p-1.5 rounded-md font-medium transition-colors cursor-pointer"
                        onClick={handleDownload}
                        title="Download Offer Letter"
                      >
                        <FaDownload size={14} />
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full xl:w-[60%] flex flex-col gap-4 pl-0 xl:pl-2">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-3">
                  <p className="text-[11px] font-medium text-swGrey200 uppercase tracking-wider">Loan ID</p>
                  <div className="mt-1">
                    <p className="text-sm font-semibold text-swBlue">
                      {data?.data?.loanApplication?.loanId}
                    </p>
                  </div>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-3">
                  <p className="text-[11px] font-medium text-swGrey200 uppercase tracking-wider">Loan Amount</p>
                  <div className="mt-1 flex justify-between items-center">
                    <p className="text-sm font-semibold text-swBlue">
                      ₦{" "}
                      {data?.data?.loanApplication?.loanAmount.toLocaleString()}
                    </p>
                    {hasDecline && hasDecline === true ? (
                      <div
                        className="p-1.5 rounded-md hover:bg-white cursor-pointer text-swGrey400 hover:text-swBlue transition-colors"
                        onClick={() => {
                          setLoanAmount(
                            data?.data?.loanApplication?.loanAmount
                          );
                          setOpenLoanAmount(true);
                        }}
                      >
                        <MdEdit size={15} />
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="rounded-xl border border-red-100 bg-red-50/50 p-3">
                  <p className="text-[11px] font-medium text-red-400 uppercase tracking-wider">Outstanding Balance</p>
                  <div className="mt-1">
                    <p className="text-sm font-semibold text-swIndicatorLightRed">
                      ₦{" "}
                      {data?.data?.loanApplication?.outstandingBalance?.toLocaleString() ||
                        0}
                    </p>
                  </div>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-3">
                  <p className="text-[11px] font-medium text-swGrey200 uppercase tracking-wider">Loan Creator</p>
                  <div className="mt-1">
                    <button
                      onClick={() => {
                        router.push(
                          `/borrowers/profile/${data?.data?.customerDetails?._id}`
                        );
                      }}
                      className="text-sm font-medium text-swBlue hover:underline text-left"
                    >
                      {data?.data?.loanApplication?.createdBy?.firstName}{" "}
                      {data?.data?.loanApplication?.createdBy?.lastName}
                    </button>
                  </div>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-3">
                  <p className="text-[11px] font-medium text-swGrey200 uppercase tracking-wider">Date Disbursed</p>
                  <div className="mt-1">
                    <p className="text-sm font-semibold text-swBlue">
                      {data?.data?.loanApplication?.disbursedAt &&
                        formatDate(
                          data?.data?.loanApplication?.disbursedAt?.slice(0, 10)
                        )}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-start md:justify-end items-center gap-3 flex-wrap">
                {data?.data?.loanApplication?.status === "In Progress" ||
                  data?.data?.loanApplication?.status === "Pending" ||
                  data?.data?.loanApplication?.status === "Declined" || (
                    <button
                      className="text-xs text-swBlue rounded-md border border-swBlue/20 hover:bg-swBlue/5 bg-white px-3 py-1.5 font-medium transition-colors disabled:opacity-50"
                      onClick={() => getLoanStatement()}
                      disabled={statementLoad}
                    >
                      Generate Statement
                    </button>
                  )}
                {(data?.data?.loanApplication?.status === "Disbursed" ||
                  data?.data?.loanApplication?.status === "Overdue") && (
                  <button
                    className="text-xs text-swBlue rounded-md border border-swBlue/20 hover:bg-swBlue/5 bg-white px-3 py-1.5 font-medium transition-colors"
                    onClick={() => setIsRestructureOpen(true)}
                  >
                    Restructure Loan
                  </button>
                )}
              </div>
            </div>
          </section>
          <div className="m-5 rounded-2xl border border-gray-100/90 bg-white shadow-sm overflow-hidden">
            <div className="flex justify-between items-center border-b border-gray-100 px-5 py-4 bg-gray-50/50">
              <h6 className="font-semibold text-swBlue">
                Loan Details
              </h6>
              {(useriD?.role?.tag === "ICO" || useriD?.role?.tag === "FO" || useriD?.role?.tag === "CTO" || useriD?.role?.tag === "System Admin") && (
                <button
                  className="text-xs text-swBlue rounded-md border border-swBlue/20 hover:bg-swBlue/5 bg-white px-3 py-1.5 font-medium transition-colors"
                  onClick={() => setOpenCorrectLoanModal(!openCorrectLoanModal)}
                >
                  Correct loan
                </button>
              )}
            </div>
            <h6 className="font-semibold text-swBlue p-2">Loan Details</h6>
            <div className="border rounded-lg overflow-auto">
              <table className=" w-full ">
                <thead className="bg-swLightGray ">
                  <tr>
                    <th className="w-1/4 px-3 py-3 bg-swLightGray text-black text-[14px] font-medium border-0 text-start">
                      Loan Package
                    </th>

                    <th className="w-1/4 px-3 py-3 bg-swLightGray text-black text-[14px] font-medium border-0 text-start">
                      <h1>Maturity Amount</h1>
                    </th>
                    <th className="w-1/4  px-3 py-3 bg-swLightGray text-black text-[14px] font-medium border-0 text-start">
                      <h1>Loan Period</h1>
                    </th>
                    <th className="w-1/4 px-3 py-3 bg-swLightGray text-black text-[14px] font-medium border-0 text-start">
                      <h1>Maturity Date</h1>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-start text-[14px]">
                    <td className="w-1/4 px-3 py-3">
                      <div className="flex gap-2 items-center">
                        <p>{data?.data?.loanPackageDetails?.name} </p>
                        {hasDecline && hasDecline === true ? (
                          <div
                            className="p-2 rounded-md hover:bg-white cursor-pointer"
                            onClick={() => {
                              setLoanAmount(
                                data?.data?.loanApplication?.loanAmount
                              );
                              setOpenLoanPackage(true);
                            }}
                          >
                            <MdEdit size={15} />
                          </div>
                        ) : null}
                      </div>
                    </td>

                    <td className="w-1/4 px-3 py-3">
                      <div>
                        <p>
                          ₦{" "}
                          {data?.data?.loanApplication?.loanMaturityAmount?.toLocaleString() ||
                            0}
                        </p>
                      </div>
                    </td>
                    <td className="w-1/4 px-3 py-3">
                      <div className="flex gap-2 items-center">
                        <p>
                          {data?.data?.loanApplication?.loanDurationMetrics ===
                          "Yearly"
                            ? `${data?.data?.loanApplication?.loanDuration}` *
                              12
                            : `${data?.data?.loanApplication?.loanDuration}`}{" "}
                          month(s)
                        </p>
                        {hasDecline && hasDecline === true ? (
                          <div
                            className="p-2 rounded-md hover:bg-white cursor-pointer"
                            onClick={() => {
                              setLoanAmount(
                                data?.data?.loanApplication?.loanAmount
                              );
                              setOpenLoanPeriod(true);
                            }}
                          >
                            <MdEdit size={15} />
                          </div>
                        ) : null}
                      </div>
                    </td>
                    <td className="w-1/4 px-3 py-3">
                      <div>
                        {data?.data?.loanApplication?.loanMaturityDate ===
                          null ||
                        data?.data?.loanApplication?.loanMaturityDate ===
                          undefined ? (
                          "null"
                        ) : (
                          <p>
                            {formatDate(
                              data?.data?.loanApplication?.loanMaturityDate?.slice(
                                0,
                                10
                              )
                            )}
                          </p>
                        )}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table className=" w-full ">
                <thead className="bg-swLightGray ">
                  <tr>
                    <th className="w-1/4 px-3 py-3 bg-swLightGray text-black text-[14px] font-medium border-0 text-start">
                      Monthly Interest Rate
                    </th>
                    <th className="w-1/4 px-3 py-3 bg-swLightGray text-black text-[14px] font-medium border-0 text-start">
                      <h1>Repayment Type</h1>
                    </th>
                    <th className="w-1/4 px-3 py-3 bg-swLightGray text-black text-[14px] font-medium border-0 text-start">
                      <h1>Outstanding Principal (from repayments)</h1>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-start text-[14px]">
                    <td className="w-1/4 px-3 py-3">
                      <div className="flex gap-2 items-center">
                        <p>
                          {data?.data?.loanApplication?.interestRate} % (
                          {
                            data?.data?.loanApplication?.interestType
                              ?.interestTypeCode
                          }
                          )
                        </p>
                        {hasDecline && hasDecline === true ? (
                          <div
                            className="p-2 rounded-md hover:bg-white cursor-pointer"
                            onClick={() => {
                              setLoanAmount(
                                data?.data?.loanApplication?.loanAmount
                              );
                              setOpenInterestType(true);
                            }}
                          >
                            <MdEdit size={15} />
                          </div>
                        ) : null}
                      </div>
                    </td>

                    <td className="w-1/4 px-3 py-3">
                      <div className="flex gap-2 items-center">
                        {/* <p>{data?.data?.loanApplication?.repaymentType} </p> */}
                        <p>
                          {
                            repaymentTypeData?.find(
                              (option) =>
                                option?.value ===
                                data?.data?.loanApplication?.repaymentType
                            )?.label
                          }
                        </p>


                        {hasDecline && hasDecline === true ? (
                          <div
                            className="p-2    rounded-md hover:bg-white cursor-pointer"
                            onClick={() => {
                              setLoanAmount(
                                data?.data?.loanApplication?.loanAmount
                              );
                              setOpenRepaymentType(true);
                            }}
                          >
                            <MdEdit size={15} />
                          </div>
                        ) : null}
                      </div>
                    </td>
                    <td className="w-1/4 px-3 py-3">
                      <div className="flex gap-2 items-center">
                        <p className="text-swIndicatorLightRed">
                          ₦ {data?.data?.loanApplication?.outstandingPrincipal}{" "}
                        </p>
                        {/* {hasDecline && hasDecline === true ? (
                          <div
                            className="p-2 rounded-md hover:bg-white cursor-pointer"
                            onClick={() => {
                              setLoanAmount(
                                data?.data?.loanApplication?.loanAmount
                              );
                              setOpenLoanFrequency(true);
                            }}
                          >
                            <MdEdit size={15} />
                          </div>
                        ) : null} */}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table className=" w-full ">
                <thead className="bg-swLightGray ">
                  <tr>
                    <th className="w-1/4 px-3 py-3 bg-swLightGray text-black text-[14px] font-medium border-0 text-start">
                      Penalty Due
                    </th>
                    <th className="w-1/4 px-3 py-3 bg-swLightGray text-black text-[14px] font-medium border-0 text-start">
                      <h1>Interest Due</h1>
                    </th>
                    <th className="w-1/4 px-3 py-3 bg-swLightGray text-black text-[14px] font-medium border-0 text-start">
                      <h1>Principal Due (from repayments)</h1>
                    </th>
                    <th className="w-1/4 px-3 py-3 bg-swLightGray text-black text-[14px] font-medium border-0 text-start">
                      <h1>Amount Due To Pay</h1>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-start text-[14px]">
                    <td className="w-1/4 px-3 py-3">
                      <p className="text-swIndicatorLightRed">
                        ₦{" "}
                        {Number(
                          data?.data?.penaltyDue ??
                            data?.data?.loanApplication?.amountAccruedForcurrentOverdue ??
                            0
                        ).toLocaleString()}
                      </p>
                    </td>
                    <td className="w-1/4 px-3 py-3">
                      <p className="text-swIndicatorLightRed">
                        ₦{" "}
                        {Number(
                          data?.data?.interestDue ??
                            data?.data?.loanApplication?.currentInterest ??
                            0
                        ).toLocaleString()}
                      </p>
                    </td>
                    <td className="w-1/4 px-3 py-3">
                      <p className="text-swIndicatorLightRed">
                        ₦{" "}
                        {Number(principalDue || 0).toLocaleString()}
                      </p>
                    </td>
                    <td className="w-1/4 px-3 py-3">
                      <p className="text-swIndicatorLightRed font-semibold">
                        ₦{" "}
                        {Number(
                          data?.data?.amountDueToPay ??
                            (Number(
                              data?.data?.penaltyDue ??
                                data?.data?.loanApplication
                                  ?.amountAccruedForcurrentOverdue ??
                                0
                            ) +
                              Number(
                                data?.data?.interestDue ??
                                  data?.data?.loanApplication?.currentInterest ??
                                  0
                              ) +
                              Number(principalDue || 0))
                        ).toLocaleString()}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

              <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <p className="text-[11px] font-medium text-swGrey200 uppercase tracking-wider mb-2">Loan Period</p>
                <div className="flex justify-between items-center">
                  <p className="text-sm font-semibold text-swBlue">
                    {data?.data?.loanApplication?.loanDurationMetrics === "Yearly"
                      ? `${data?.data?.loanApplication?.loanDuration}` * 12
                      : `${data?.data?.loanApplication?.loanDuration}`}{" "}
                    month(s)
                  </p>
                  {hasDecline && hasDecline === true ? (
                    <div
                      className="p-1.5 rounded-md hover:bg-gray-50 cursor-pointer text-swGrey400 hover:text-swBlue transition-colors"
                      onClick={() => {
                        setLoanAmount(data?.data?.loanApplication?.loanAmount);
                        setOpenLoanPeriod(true);
                      }}
                    >
                      <MdEdit size={15} />
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <p className="text-[11px] font-medium text-swGrey200 uppercase tracking-wider mb-2">Maturity Date</p>
                <p className="text-sm font-semibold text-swBlue">
                  {data?.data?.loanApplication?.loanMaturityDate === null ||
                  data?.data?.loanApplication?.loanMaturityDate === undefined
                    ? "null"
                    : formatDate(data?.data?.loanApplication?.loanMaturityDate?.slice(0, 10))}
                </p>
              </div>

              {/* Row 2 */}
              <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <p className="text-[11px] font-medium text-swGrey200 uppercase tracking-wider mb-2">Monthly Interest Rate</p>
                <div className="flex justify-between items-center">
                  <p className="text-sm font-semibold text-swBlue">
                    {data?.data?.loanApplication?.interestRate} % ({data?.data?.loanApplication?.interestType.interestTypeCode})
                  </p>
                  {hasDecline && hasDecline === true ? (
                    <div
                      className="p-1.5 rounded-md hover:bg-gray-50 cursor-pointer text-swGrey400 hover:text-swBlue transition-colors"
                      onClick={() => {
                        setLoanAmount(data?.data?.loanApplication?.loanAmount);
                        setOpenInterestType(true);
                      }}
                    >
                      <MdEdit size={15} />
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <p className="text-[11px] font-medium text-swGrey200 uppercase tracking-wider mb-2">Repayment Type</p>
                <div className="flex justify-between items-center">
                  <p className="text-sm font-semibold text-swBlue">
                    {repaymentTypeData?.find(
                      (option) => option?.value === data?.data?.loanApplication?.repaymentType
                    )?.label}
                  </p>
                  {hasDecline && hasDecline === true ? (
                    <div
                      className="p-1.5 rounded-md hover:bg-gray-50 cursor-pointer text-swGrey400 hover:text-swBlue transition-colors"
                      onClick={() => {
                        setLoanAmount(data?.data?.loanApplication?.loanAmount);
                        setOpenRepaymentType(true);
                      }}
                    >
                      <MdEdit size={15} />
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <p className="text-[11px] font-medium text-swGrey200 uppercase tracking-wider mb-2">Outstanding Principal</p>
                <p className="text-sm font-semibold text-swIndicatorLightRed">
                  ₦ {data?.data?.loanApplication?.outstandingPrincipal}
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <p className="text-[11px] font-medium text-swGrey200 uppercase tracking-wider mb-2">Current Accrued Interest</p>
                <p className="text-sm font-semibold text-swIndicatorLightRed">
                  ₦ {data?.data?.loanApplication?.currentInterest}
                </p>
              </div>

              {/* Row 3 - Due Amounts */}
              <div className="rounded-xl border border-red-100 bg-red-50/30 p-4 shadow-sm">
                <p className="text-[11px] font-medium text-red-500 uppercase tracking-wider mb-2">Penalty Due</p>
                <p className="text-sm font-semibold text-swIndicatorLightRed">
                  ₦ {Number(
                    data?.data?.penaltyDue ??
                    data?.data?.loanApplication?.amountAccruedForcurrentOverdue ??
                    0
                  ).toLocaleString()}
                </p>
              </div>

              <div className="rounded-xl border border-red-100 bg-red-50/30 p-4 shadow-sm">
                <p className="text-[11px] font-medium text-red-500 uppercase tracking-wider mb-2">Interest Due</p>
                <p className="text-sm font-semibold text-swIndicatorLightRed">
                  ₦ {Number(
                    data?.data?.interestDue ??
                    data?.data?.loanApplication?.currentInterest ??
                    0
                  ).toLocaleString()}
                </p>
              </div>

              <div className="rounded-xl border border-red-100 bg-red-50/30 p-4 shadow-sm">
                <p className="text-[11px] font-medium text-red-500 uppercase tracking-wider mb-2">Principal Due (Scheduled)</p>
                <p className="text-sm font-semibold text-swIndicatorLightRed">
                  ₦ {Number(principalDue || 0).toLocaleString()}
                </p>
              </div>

              <div className="rounded-xl border border-red-200 bg-red-50 p-4 shadow-sm">
                <p className="text-[11px] font-bold text-red-600 uppercase tracking-wider mb-2">Amount Due To Pay</p>
                <p className="text-sm font-bold text-swIndicatorDarkRed">
                  ₦ {Number(
                    data?.data?.amountDueToPay ??
                    (Number(
                      data?.data?.penaltyDue ??
                      data?.data?.loanApplication?.amountAccruedForcurrentOverdue ??
                      0
                    ) +
                    Number(
                      data?.data?.interestDue ??
                      data?.data?.loanApplication?.currentInterest ??
                      0
                    ) +
                    Number(principalDue || 0))
                  ).toLocaleString()}
                </p>
              </div>
            </div>
          </div>



          <div className="ml-5 mr-5 mt-5 rounded-2xl border border-red-100 bg-white shadow-sm overflow-hidden">
            <h6 className="border-b border-red-100 px-5 py-4 font-semibold text-swDarkRed bg-red-50/30">
              Loan Accruals
            </h6>
            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-red-100 bg-red-50/30 p-4 shadow-sm">
                <p className="text-[11px] font-medium text-red-500 uppercase tracking-wider mb-2">Number of Overdue days</p>
                <p className="text-sm font-semibold text-swDarkRed">
                  {data?.data?.loanApplication?.currentOverdueDaysCount || 0} day(s)
                </p>
              </div>
              <div className="rounded-xl border border-red-100 bg-red-50/30 p-4 shadow-sm">
                <p className="text-[11px] font-medium text-red-500 uppercase tracking-wider mb-2">Overdue Period Amount</p>
                <p className="text-sm font-semibold text-swDarkRed">
                  ₦ {data?.data?.loanApplication?.amountAccruedForcurrentOverdue?.toLocaleString() || 0}
                </p>
              </div>
            </div>
          </div>

          {/* Test Loan Triggers Section */}
          {data?.data?.loanApplication?.repaymentType === "installmentPayment" && (
            <div className="mx-5 mt-5">
              <div className="bg-yellow-50/50 border border-yellow-200/60 rounded-2xl p-5 shadow-sm">
                <h6 className="font-semibold text-yellow-800 mb-4 flex items-center gap-2">
                  <span>🧪</span> Test Loan Triggers <span className="text-xs font-normal text-yellow-600 bg-yellow-100 px-2 py-0.5 rounded-full">Development Only</span>
                </h6>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={triggerDailyAccrual}
                      disabled={testTriggerLoading}
                      className="flex-1 text-sm bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-md transition-colors disabled:opacity-50"
                    >
                      {testTriggerLoading ? "Processing..." : "Trigger Daily Interest Accrual"}
                    </button>
                    <button
                      onClick={triggerOverdueAccrual}
                      disabled={testTriggerLoading}
                      className="flex-1 text-sm border border-yellow-600 text-yellow-700 hover:bg-yellow-100 py-2 px-4 rounded-md transition-colors disabled:opacity-50"
                    >
                      {testTriggerLoading ? "Processing..." : "Trigger Overdue Accrual"}
                    </button>
                  </div>
                  <div className="flex gap-3 items-end bg-white/50 p-3 rounded-xl border border-yellow-100">
                    <div className="flex-1">
                      <InputField
                        label="Advance Days"
                        type="number"
                        min="1"
                        max="365"
                        value={daysToAdvance}
                        onChange={(e) => setDaysToAdvance(e.target.value)}
                        placeholder="Enter days (1-365)"
                      />
                    </div>
                    <button
                      onClick={advanceDays}
                      disabled={testTriggerLoading}
                      className="mb-0 bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-md transition-colors disabled:opacity-50 h-[42px]"
                    >
                      {testTriggerLoading ? "Processing..." : "Advance Days"}
                    </button>
                  </div>
                  <p className="text-[11px] text-yellow-700/80 mt-2 font-medium">
                    ⚠️ These buttons are for testing purposes only. Use them to simulate daily accruals and advance time for testing installment payment scenarios.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="px-5 pb-5">
            <section id="loan-details">{/* <ReusableDataTables/> */}</section>
            <section></section>
            <section
              id="activities"
              className="rounded-2xl border border-gray-100/90 bg-white pb-5 shadow-sm mt-5"
            >
              <div className="flex items-center justify-between overflow-x-hidden border-b border-gray-100 py-2 px-4 flex-wrap bg-gray-50/50 rounded-t-2xl">
                <div className="flex gap-2 text-xs lg:text-sm overflow-auto">
                  <button
                    onClick={() => handleActivityToggle("activity-logs")}
                    className={`${
                      activityButton === "activity-logs"
                        ? "font-semibold text-swBlue bg-white shadow-sm border border-gray-200"
                        : "text-gray-600 hover:bg-gray-100"
                    } px-4 py-2 rounded-lg transition-all`}
                  >
                    Activity logs
                  </button>
                  <button
                    onClick={() => handleActivityToggle("loans")}
                    className={`${
                      activityButton === "loans"
                        ? "font-semibold text-swBlue bg-white shadow-sm border border-gray-200"
                        : "text-gray-600 hover:bg-gray-100"
                    } px-4 py-2 rounded-lg transition-all`}
                  >
                    Loan Documents
                  </button>
                  <button
                    onClick={() => handleActivityToggle("repayment")}
                    className={`${
                      activityButton === "repayment"
                        ? "font-semibold text-swBlue bg-white shadow-sm border border-gray-200"
                        : "text-gray-600 hover:bg-gray-100"
                    } px-4 py-2 rounded-lg transition-all`}
                  >
                    Repayments
                  </button>
                  <button
                    onClick={() => handleActivityToggle("paymentHistory")}
                    className={`${
                      activityButton === "paymentHistory"
                        ? "font-semibold text-swBlue bg-white shadow-sm border border-gray-200"
                        : "text-gray-600 hover:bg-gray-100"
                    } px-4 py-2 rounded-lg transition-all`}
                  >
                    Payment History
                  </button>
                  <button
                    onClick={() => handleActivityToggle("loanTransactions")}
                    className={`${
                      activityButton === "loanTransactions"
                        ? "font-semibold text-swBlue bg-white shadow-sm border border-gray-200"
                        : "text-gray-600 hover:bg-gray-100"
                    } px-4 py-2 rounded-lg transition-all`}
                  >
                    Loan Transactions
                  </button>
                  <button
                    onClick={() =>
                      handleActivityToggle("loanRestructureRequest")
                    }
                    className={`${
                      activityButton === "loanRestructureRequest"
                        ? "font-semibold text-swBlue bg-white shadow-sm border border-gray-200"
                        : "text-gray-600 hover:bg-gray-100"
                    } px-4 py-2 rounded-lg transition-all`}
                  >
                    Loan Restructure Requests
                  </button>
                </div>
              </div>
              <div className="p-4">
                {activityButton === "activity-logs" && <CustomerActivityLogs />}
                {/* {activityButton === "summary" && <Summary />} */}
                {activityButton === "loans" && (
                  <CustomerLoanDoc data={data?.data} />
                )}
                {activityButton === "repayment" && (
                  <CustomerRepayment
                    data={data?.data}
                    loanId={id}
                    status={data?.data?.loanApplication?.status}
                  />
                )}

                {activityButton === "paymentHistory" && (
                  <CustomerPaymentHistory data={data?.data} loanId={id} />
                )}
                {activityButton === "loanTransactions" && (
                  <CustomerLoanTransactions loanId={id} />
                )}
                {activityButton === "loanRestructureRequest" && (
                  <LoanRestructureTab loanId={id} user={useriD} />
                )}
              </div>
            </section>
          </div>
        </section>
        <section id="loan_process" className="hidden md:block w-[30%] h-full bg-white border-l border-gray-200">
          <div className="sticky top-0 h-screen overflow-y-auto pb-32">
            <p className="border-b border-gray-100 p-5 text-swBlue font-semibold bg-gray-50/50">
              Loan Processes
            </p>
            <div className="p-4">
              <LoanProcessCard 
                data={loanApprovals} 
                useriD={useriD?._id}
                loanCreatorId={data?.data?.loanApplication?.createdBy?._id}
                onRequestApproval={(item) => {
                  setCurrentApprovalId(item?.approvalLevel);
                  setCurrentApprovalLevel(item?.approvalTitle);
                  setIsRequestApprovalOpen(true);
                }}
                onApprove={(item) => {
                  setCurrentTaskId(item?.currentTaskId);
                  setCurrentApprovalId(item?.approvalLevel);
                  setCurrentApprovalLevel(item?.approvalTitle);
                  setApprovalOpen(true);
                }}
                onDecline={(item) => {
                  setCurrentTaskId(item?.currentTaskId);
                  setCurrentApprovalId(item?.approvalLevel);
                  setCurrentApprovalLevel(item?.approvalTitle);
                  setDeclineOpen(true);
                }}
              />
            </div>
            <div className="p-4 border-t border-gray-100">
              {useriD?.role?.tag === "CFO" ||
              useriD?.role?.tag === "CEO" ||
              useriD?.role?.tag === "Dir" ? (
                <button
                  onClick={() => {
                    setLoanReassignment(true);
                    modifyUsersToApprove();
                  }}
                  className="w-full block rounded-lg text-sm py-2.5 font-medium border border-gray-200 hover:bg-gray-50 text-gray-700 transition-colors"
                >
                  Reassign Loan
                </button>
              ) : null}
            </div>
          </div>
        </section>
      </main>

      <CenterModal
        width={"30%"}
        isOpen={isRequestApprovalOpen}
        onClose={() => {
          setIsRequestApprovalOpen(!isRequestApprovalOpen);
        }}
      >
        <RequestApproval
          approvalLevel={currentApprovalLevel}
          approvalId={currentApprovalId}
          data={user}
          approvals={loanApprovals?.data?.data}
          onClose={() => {
            setIsRequestApprovalOpen(false);
          }}
        />
      </CenterModal>
      <CenterModal isOpen={isApprovalOpen}>
        <ApprovalModal
          width={"100%"}
          approvalLevel={currentApprovalLevel}
          approvalId={currentApprovalId}
          currentTaskId={currentTaskId}
          isOpen={isApprovalOpen}
          closeModal={setApprovalOpen}
          data={data?.data}
          onClose={() => setApprovalOpen(false)}
        />{" "}
      </CenterModal>
      <CenterModal isOpen={isDeclineOpen}>
        <DeclineModal
          approvalLevel={currentApprovalLevel}
          approvalId={currentApprovalId}
          isOpen={isDeclineOpen}
          closeModal={setDeclineOpen}
          onClose={() => setDeclineOpen(false)}
        />
      </CenterModal>

      {/* Loan amount update modal */}
      <CenterModal isOpen={openLoanAmount} width={"35%"}>
        <div className="p-4 overflow-x-auto">
          <div className="flex justify-end cursor-pointer">
            <MdClose
              size={20}
              onClick={() => {
                setOpenLoanAmount(!openLoanAmount);
              }}
            />
          </div>
          <div className="w-full mb-3">
            <InputField
              label={"Enter new loan amount"}
              value={loanAmount}
              onChange={(e) => setLoanAmount(e?.target?.value)}
            />
          </div>
          <EditableButton
            blueBtn={true}
            disabled={loading ? true : false}
            onClick={() => updateLoan("loanAmount")}
            className="w-full"
            label={"Update Amount"}
          />
        </div>
      </CenterModal>

      {/* Loan package update modal */}
      <CenterModal isOpen={openLoanPackage} width={"35%"}>
        <div className="p-4 overflow-x-auto">
          <div className="flex justify-end cursor-pointer">
            <MdClose
              size={20}
              onClick={() => {
                setOpenLoanPackage(!openLoanPackage);
              }}
            />
          </div>
          <div className="w-full mb-3">
            <SelectField
              value={modifyLoanPackageData(loanPackage?.data?.data)?.find(
                (option) => option?.value === formData?.loanPackage
              )}
              // disabled={selectedCustomer === null ? true : false}
              name="loanPackage"
              optionValue={modifyLoanPackageData(loanPackage?.data?.data)}
              label={"Loan Package "}
              required={true}
              placeholder={"Select loan package"}
              isSearchable={false}
              onChange={(selectedOption) => {
                handleSelectChange(selectedOption, "loanPackage");
              }}
            />
          </div>
          <EditableButton
            blueBtn={true}
            onClick={() => updateLoan("loanPackage")}
            className="w-full"
            label={"Update Loan Package"}
            disabled={loading ? true : false}
          />
        </div>
      </CenterModal>

      {/* interest rate type update modal */}
      <CenterModal isOpen={openInterestType} width={"35%"}>
        <div className="p-4 overflow-x-auto">
          <div className="flex justify-end cursor-pointer">
            <MdClose
              size={20}
              onClick={() => {
                setOpenInterestType(!openInterestType);
              }}
            />
          </div>
          <div className="w-full mb-3">
            <InputField
              label={"Enter new interest rate"}
              value={interestRate}
              onKeyPress={preventMinus}
              onWheel={() => document.activeElement.blur()}
              onChange={(e) => setInterestRate(e?.target?.value)}
            />
          </div>
          <EditableButton
            blueBtn={true}
            onClick={() => updateLoan("interestRate")}
            className="w-full"
            label={"Update interest rate"}
            disabled={loading ? true : false}
          />
        </div>
      </CenterModal>

      {/* repayment type update modal */}
      <CenterModal isOpen={openRepaymentType} width={"35%"}>
        <div className="p-4 overflow-x-auto">
          <div className="flex justify-end cursor-pointer">
            <MdClose
              size={20}
              onClick={() => {
                setOpenRepaymentType(!openRepaymentType);
              }}
            />
          </div>
          <div className="w-full mb-3">
            <SelectField
              value={repaymentTypeData?.find(
                (option) => option?.value === formData?.repaymentType
              )}
              name="repaymentType"
              // disabled={formData.numberOfRepayment === 0 ? true : false}
              optionValue={
                data?.data?.loanPackageDetails?.interestRate?.rateType ===
                "Reducing Balance"
                  ? reducingBalrepaymentTypeData
                  : repaymentTypeData
              }
              label={"Repayment Type"}
              required={true}
              placeholder={"Select repayment type"}
              isSearchable={false}
              onChange={(selectedOption) => {
                handleSelectChange(selectedOption, "repaymentType");
              }}
            />
          </div>
          <EditableButton
            blueBtn={true}
            onClick={() => updateLoan("repaymentType")}
            className="w-full"
            label={"update repayment type"}
            disabled={loading ? true : false}
          />
        </div>
      </CenterModal>

      {/* repayment type update modal */}
      <CenterModal isOpen={openLoanPeriod} width={"35%"}>
        <div className="p-4 overflow-x-auto">
          <div className="flex justify-end cursor-pointer">
            <MdClose
              size={20}
              onClick={() => {
                setOpenLoanPeriod(!openLoanPeriod);
              }}
            />
          </div>

          <div className="flex gap-2 items-end mb-3">
            <div className="w-1/3">
              <SelectField
                value={loanDurationMetricsData?.find(
                  (option) => option?.value === formData?.loanDurationMetrics
                )}
                name="loanDurationMetrics"
                optionValue={loanDurationMetricsData}
                label={"Duration"}
                required={true}
                placeholder={"metics"}
                isSearchable={false}
                onChange={(selectedOption) => {
                  handleSelectChange(selectedOption, "loanDurationMetrics");
                }}
              />
            </div>
            <div className="w-2/3">
              <InputField
                value={formData?.loanDuration}
                required={false}
                name="loanDuration"
                onKeyPress={preventMinus}
                onWheel={() => document?.activeElement?.blur()}
                activeBorderColor="border-swBlue"
                placeholder="Enter number"
                onChange={(e) => {
                  setInputState(e);
                }}
              />
            </div>
          </div>

          <EditableButton
            blueBtn={true}
            onClick={() => updateLoan("loanDuration")}
            className="w-full"
            label={"Update loan period"}
            disabled={loading ? true : false}
          />
        </div>
      </CenterModal>

      {/* Loan frequency modal */}
      <CenterModal isOpen={openLoanFrequency} width={"35%"}>
        <div className="p-4 overflow-x-auto">
          <div className="flex justify-end cursor-pointer">
            <MdClose
              size={20}
              onClick={() => {
                setOpenLoanFrequency(!openLoanFrequency);
              }}
            />
          </div>

          <div className="flex gap-2 items-end">
            <div className="w-full mb-3">
              <SelectField
                value={frequencyTypeData?.find(
                  (option) => option?.value === formData?.loanFrequencyType
                )}
                name="loanFrequencyType"
                optionValue={frequencyTypeData}
                label={"Loan Frequency Type"}
                required={true}
                placeholder={"Select frequency type"}
                isSearchable={false}
                onChange={(selectedOption) => {
                  handleSelectChange(selectedOption, "loanFrequencyType");
                }}
              />
            </div>
          </div>

          <EditableButton
            blueBtn={true}
            onClick={() => updateLoan("loanFrequencyType")}
            disabled={loading ? true : false}
            label="Update loan period"
            className={"w-full"}
          />
        </div>
      </CenterModal>

      <CenterModal isOpen={logRepayment}>
        <div className="p-4">
          <div className="flex justify-between items-center text-white">
            <div>
              <p className="text-base font-semibold text-black">
                Register disbursement
              </p>
            </div>
            <button
              className="text-black"
              onClick={() => {
                setLogRepayment(!logRepayment);
              }}
            >
              x
            </button>
          </div>
          <div className="text-sm text-swGray pt-4">
            Provide payment information
          </div>
          <div className="pt-4">
            <div className="pt-4 ">
              <div className="text-swBlack block text-sm mb-2">
                Bank Details
              </div>

              <div className="text-xs text-swGray">
                <div className="flex gap-2 ">
                  <p className="pt-3">Bank Name: </p>
                  <p className="pt-3 font-semibold">
                    {
                      bankArr?.find(
                        (option) =>
                          option?.value ===
                          data?.data?.customerDetails?.bankAccount?.bankName
                      )?.label
                    }
                  </p>
                </div>
                <div className="flex gap-2 ">
                  <p className="pt-3">Account Number: </p>
                  <p className="pt-3 font-semibold">
                    {data?.data?.customerDetails?.bankAccount?.accountNumber}
                  </p>
                </div>
                <div className="flex gap-2 ">
                  <p className="pt-3">Account Name: </p>
                  <p className="pt-3 font-semibold">
                    {data?.data?.customerDetails?.bankAccount?.accountName}
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-4">
              <InputField
                name={formData?.amount}
                label="Amount paid"
                required={true}
                ariaLabel={"Number input"}
                placeholder="Enter amount"
                onChange={(e) => {
                  setDisbursementInputState(e);
                }}
                value={data?.data?.loanApplication?.loanAmount?.toLocaleString()}
              />
            </div>
            <div className="pt-4">
              <SelectField
                optionValue={paymentMethodTypes}
                name="paymentMethod"
                label="Payment Method"
                required={true}
                placeholder="Select payment method"
                onChange={(selectedOption) => {
                  handleDisbursementSelectChange(
                    selectedOption,
                    "paymentMethod"
                  );
                }}
              />
            </div>
            <div className="relative pt-4 flex justify-between items-center">
              <p>
                Disbursement Date:{" "}
                {formData?.disbursementDate &&
                  format(formData?.disbursementDate, "PPP")}
              </p>
              <div
                className="w-fit p-2 rounded-full border border-jsPrimary100 text-jsPrimary100 cursor-pointer"
                onClick={() =>
                  setOpenDisbursementDatePicker(!openDibursementDatePicker)
                }
              >
                <FaRegCalendar size={20} />
              </div>
              {openDibursementDatePicker && (
                <div className="absolute w-fit -right-5 bottom-full bg-white border rounded-md z-10">
                  <DayPicker
                    styles={{
                      caption: { color: "#2769b3" },
                    }}
                    modifiers={{
                      selected: formData?.disbursementDate,
                    }}
                    modifiersClassNames={{
                      selected: "my-selected",
                    }}
                    onDayClick={(value) => {
                      setFormData((prev) => ({
                        ...prev,
                        disbursementDate:
                          value > new Date() ? new Date() : value,
                      }));
                    }}
                    className="w-full"
                  />
                  <p
                    className="w-fit ml-auto mr-2 mb-2 -mt-2 p-2 text-[#2769b3] hover:text-white hover:bg-[#2769b3] cursor-pointer"
                    onClick={() => setOpenDisbursementDatePicker(false)}
                  >
                    OK
                  </p>
                </div>
              )}
            </div>
            <div className="pt-4">
              <p className="font-semibold pt-2 text-sm">
                Upload payment receipt
              </p>
              <p className="text-xs pt-2">
                Document types uploaded should be JPEGS, PNG or PDF and should
                not exceed 4mb
              </p>
              {fileError && <p className="text-red-500 text-sm">{fileError}</p>}
              <div className="relative">
                <input
                  name="docs"
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
                  <span className="py-2 px-6 rounded-md flex gap-2 border w-fit">
                    <AiOutlinePaperClip color="black" size={20} />
                    <p className="font-semibold text-black">
                      {formData?.docs ? "Change file" : "Select file"}
                    </p>
                  </span>
                </label>
                {formData?.docs ? (
                  <div
                    id="fileLabel"
                    className="bg-swLightGray p-2 flex justify-between"
                  >
                    <div className="text-xs">{formData?.docs?.name}</div>
                    <div
                      onClick={() => {
                        deleteFile("docs");
                      }}
                    >
                      <AiOutlineDelete color="red" size={20} />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="flex pt-4 mb-4 items-end gap-2 justify-end">
              <EditableButton
                redBtn={true}
                onClick={() => setLogRepayment(!logRepayment)}
                disabled={loading ? true : false}
                label="Cancel"
              />
              <EditableButton
                blueBtn={true}
                onClick={(e) => submitLoanUpdate(e)}
                disabled={loading ? true : false}
                label="Confirm"
              />
            </div>
          </div>
        </div>
      </CenterModal>

      <CenterModal isOpen={loanReassignment} width={"40%"}>
        <div className="p-4 overflow-x-auto">
          <div className="flex justify-between cursor-pointer mb-4 h-500">
            <p className="text-md font-semibold">Loan Reassignment</p>
            <MdClose
              size={20}
              color="red"
              onClick={() => {
                setLoanReassignment(!loanReassignment);
              }}
            />
          </div>

          <div className="flex gap-2 items-end">
            <div className="w-full mb-3 ">
              <SelectField
                isSearchable={true}
                name="createdBy"
                optionValue={usersToApprove}
                label={"Loan Officer"}
                required={true}
                placeholder={"Select new loan officer"}
                onChange={(selectedOption) => {
                  handleSelectChange(selectedOption, "createdBy");
                }}
              />
            </div>
          </div>

          <EditableButton
            blueBtn={true}
            onClick={() => updateLoan("loan-reassignment")}
            disabled={loading ? true : false}
            label="Reassign Loan"
            className={"w-full"}
          />
        </div>
      </CenterModal>

      <CenterModal
        isOpen={isRestructureOpen && data?.data?.loanApplication?._id}
      >
        <RestructureLoanModal
          loanId={data?.data?.loanApplication?._id}
          defaultLoanAmount={data?.data?.loanApplication?.loanAmount}
          defaultInterestRate={data?.data?.loanApplication?.interestRate}
          defaultLoanDuration={data?.data?.loanApplication?.loanDuration}
          defaultRepaymentType={data?.data?.loanApplication?.repaymentType}
          user={useriD}
          defaultLoanFrequencyType={
            data?.data?.loanApplication?.loanFrequencyType
          }
          defaultLoanPackageId={
            data?.data?.loanApplication?.loanPackageDetails?._id
          }
          minInterestRateProp={
            data?.data?.loanApplication?.loanPackage?.interestRate?.min
          }
          maxInterestRateProp={
            data?.data?.loanApplication?.loanPackage?.interestRate?.max
          }
          minLoanAmountProp={
            data?.data?.loanApplication?.loanPackage?.loanAmountRange?.min
          }
          maxLoanAmountProp={
            data?.data?.loanApplication?.loanPackage?.loanAmountRange?.max
          }
          closeModal={() => setIsRestructureOpen(false)}
        />
      </CenterModal>
      <Loader isOpen={statementLoad} />
      <CorrectLoanModal
        isOpen={openCorrectLoanModal}
        onClose={setOpenCorrectLoanModal}
        data={data?.data}
      />
    </DashboardLayout>
  );
};

export default ViewLoan;
