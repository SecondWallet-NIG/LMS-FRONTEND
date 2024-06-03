"use client";
import { useEffect } from "react";
import LoanProcessCard from "@/app/components/cards/loanProcessCard/LoanProcessCard";
import CustomerActivityLogs from "@/app/components/customers/CustomerActivityLogs";
import ActivityLogs from "@/app/components/customers/CustomerActivityLogs";
import Summary from "@/app/components/customers/CustomerSummary";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import InputField from "@/app/components/shared/input/InputField";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { getInterestType } from "@/redux/slices/interestTypeSlice";
import {
  disburseLoan,
  getSingleLoan,
} from "@/redux/slices/loanApplicationSlice";
import RequestApproval from "@/app/components/modals/loans/RequestApproval";
import CustomerLoanDoc from "@/app/components/customers/CustomerLoanDoc";
import { updateLoanApplication } from "@/redux/slices/loanApplicationSlice";
import { getAllUsers } from "@/redux/slices/userSlice";
import { getLoanApprovals } from "@/redux/slices/loanApprovalSlice";
import { MdClose, MdEdit } from "react-icons/md";
import CenterModal from "@/app/components/modals/CenterModal";
import Button from "@/app/components/shared/buttonComponent/Button";
import { useRouter } from "next/navigation";
import ApprovalModal from "@/app/components/modals/loans/ApprovalModal";
import DeclineModal from "@/app/components/modals/loans/DeclineModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getLoanPackage } from "@/redux/slices/loanPackageSlice";
import SelectField from "@/app/components/shared/input/SelectField";
import CustomerRepayment from "@/app/components/customers/CustomerRepayment";
import { AiOutlinePaperClip } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { FaDownload } from "react-icons/fa6";
import CustomerPaymentHistory from "@/app/components/customers/CustomerHistoryPayment";
import EditableButton from "@/app/components/shared/editableButtonComponent/EditableButton";
import { bankArr } from "@/constant";
import { format } from "date-fns";
import { FaRegCalendar } from "react-icons/fa";
import { DayPicker } from "react-day-picker";

const ViewLoan = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { error, data } = useSelector((state) => state.loanApplication);
  const loanPackage = useSelector((state) => state.loanPackage);
  //const interestType = useSelector((state) => state.interestType);
  const user = useSelector((state) => state.user?.data?.data?.results);
  const loanApprovals = useSelector((state) => state.loanApprovals);
  const [activityButton, setActivityButton] = useState("activity-logs");
  const [logSearch, setLogSearch] = useState(false);
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
  const [usersToApprove, setUsersToApprove] = useState([]);
  const [fileError, setFileError] = useState("");
  const router = useRouter();
  const [logRepayment, setLogRepayment] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openDibursementDatePicker, setOpenDisbursementDatePicker] =
    useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    paymentMethod: "",
    disbursementDate: new Date(),
    docs: null,
  });

  console.log({ file: formData.docs });

  const handleFileChange = (e) => {
    setFileError("");
    let { name, files } = e.target;
    const file = files[0];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    console.log(fileExtension);

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
      a.download = `${data?.data?.customerDetails.firstName} ${data?.data?.customerDetails.lastName} - Offer Letter`;
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

  const handleLogSearch = (state) => {
    state === "open" ? setLogSearch(true) : setLogSearch(false);
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
      updatedData.append("interestRate", interestRate / 100);

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
          formData.loanDurationMetrics === "Monthly"
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

    console.log([...payload]);

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
    console.log({ user });
    console.log("hello");
    if (Array.isArray(user)) {
      const users = user.filter((item) => item?.role?.tag === "LO");
      console.log({ users });
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
  }, []);

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

  if (loanApprovals?.data?.data) {
    console.log(">>>>>>>", loanApprovals?.data?.data);
    hasDecline = hasDeclineStatus();
  }

  return (
    <DashboardLayout
      isBackNav={true}
      paths={["Loan Applications", "View loan"]}
    >
      <ToastContainer />
      <main className="flex h-full">
        <section className="w-full border-r border-gray-300">
          <section
            id="customer_details"
            className="flex flex-col md:flex-row gap-2 border-b border-gray-300 items-center py-4 px-5"
          >
            <div className="w-full md:w-[30%] whitespace-nowrap">
              <div className="flex ">
                <div>
                  <Image
                    src={
                      data?.data?.loanApplication?.customerId?.customerId
                        ?.profilePicture
                        ? data?.data?.loanApplication?.customerId?.customerId
                            ?.profilePicture
                        : "https://cdn-icons-png.flaticon.com/512/4128/4128349.png"
                    }
                    alt="user image"
                    width={60}
                    height={60}
                  />
                </div>
                <div className="ml-4 h-fit">
                  <p className="text-md font-semibold text-swBlue mb-1">
                    {data?.data?.customerDetails?.firstName}{" "}
                    {data?.data?.customerDetails?.lastName}
                    <button
                      className={`${
                        data?.data?.loanApplication?.status === "Pending"
                          ? "bg-swIndicatorLightRed"
                          : data?.data?.loanApplication?.status ===
                            "In Progress"
                          ? "bg-swIndicatorYellow"
                          : data?.data?.loanApplication?.status ===
                            "Ready for Disbursal"
                          ? "bg-swIndicatorPurple"
                          : data?.data?.loanApplication?.status === "Disbursed"
                          ? "bg-swBlue"
                          : data?.data?.loanApplication?.status === "Fully Paid"
                          ? "bg-swGreen"
                          : "bg-swIndicatorDarkRed"
                      } px-2 py-1 rounded-full ml-4 text-xs font-normal text-white`}
                    >
                      {data?.data?.loanApplication?.status}
                    </button>
                  </p>
                  <p className="text-xs">
                    {" "}
                    {data?.data?.loanApplication?.customerId?.customerId}
                  </p>

                  <div className="flex gap-2 items-center h-fit w-fit mt-4">
                    {useriD?.role?.tag === "CFO" ? (
                      <Button
                        className={
                          "text-white text-xs bg-[#2769b3d9] px-3 py-2 rounded-lg font-medium"
                        }
                        disabled={
                          data?.data?.loanApplication?.status ===
                          "Ready for Disbursal"
                            ? false
                            : true
                        }
                        onClick={() => {
                          setLogRepayment(!logRepayment);
                        }}
                      >
                        <p>Disburse Loan</p>
                      </Button>
                    ) : null}

                    <button
                      onClick={() => {
                        router.push(
                          `/borrowers/profile/${data?.data?.customerDetails?._id}`
                        );
                      }}
                      className={
                        "text-swBlue text-sm bg-white py-2 rounded-lg font-medium"
                      }
                    >
                      View Profile
                    </button>

                    {data?.data?.loanApplication?.offerLetter != null ? (
                      <a
                        download
                        className={
                          "text-swBlue text-sm bg-white py-2 rounded-lg font-medium "
                        }
                        onClick={handleDownload}
                      >
                        <FaDownload />
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-[70%]">
              <div className="flex md:justify-end">
                <div>
                  <div className="text-xs  font-semibold">
                    {" "}
                    Loan created by :
                  </div>
                  <button
                    onClick={() => {
                      router.push(
                        `/borrowers/profile/${data?.data?.customerDetails?._id}`
                      );
                    }}
                    className={
                      "text-swBlue text-sm bg-white py-2 rounded-lg font-medium underline"
                    }
                  >
                    {data?.data?.loanApplication?.createdBy?.email}
                  </button>
                </div>
              </div>
              <div className="flex justify-start md:justify-end items-center gap-5 flex-wrap">
                <div className="w-full  sm:w-[10rem] bg-gray-100 rounded-xl p-2">
                  <p className="text-sm font-medium">Loan ID:</p>
                  <div className="flex justify-between items-center">
                    <p className="text-md text-swBlue font-semibold mt-4">
                      {data?.data?.loanApplication?.loanId}
                    </p>
                  </div>
                </div>
                <div className="w-full  sm:w-[10rem] bg-gray-100 rounded-xl p-2">
                  <p className="text-sm font-medium">Loan Amount:</p>

                  <div className="flex justify-between items-center">
                    <p className="text-md text-swBlue font-semibold mt-4">
                      ₦{" "}
                      {data?.data?.loanApplication?.loanAmount.toLocaleString()}
                    </p>
                    {hasDecline && hasDecline === true ? (
                      <div
                        className="p-2 rounded-md hover:bg-white cursor-pointer mt-2"
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
                <div className="w-full  sm:w-[10rem] bg-gray-100 rounded-xl p-2">
                  <p className="text-sm font-medium">Outstanding Balance</p>
                  <div className="flex justify-between items-center">
                    <p className="text-md text-red-500 font-semibold mt-4">
                      ₦{" "}
                      {data?.data?.loanApplication?.outstandingBalance?.toLocaleString() ||
                        0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="ml-5 mr-5 mt-5">
            <h6 className="font-semibold text-swBlue p-2">Loan Details</h6>
            <div className="border rounded-lg overflow-auto">
              <table className=" w-full ">
                <thead className="bg-swLightGray ">
                  <tr>
                    <th className="w-1/4 px-3 py-3 bg-swLightGray text-swGray text-xs border-0 text-start">
                      Loan Package
                    </th>

                    <th className="w-1/4  px-3 py-3 bg-swLightGray text-swGray text-xs border-0 text-start">
                      <h1>Maturity Amount</h1>
                    </th>
                    <th className="w-1/4  px-3 py-3 bg-swLightGray text-swGray text-xs border-0 text-start">
                      <h1>Loan Period</h1>
                    </th>
                    <th className="w-1/4 px-3 py-3 bg-swLightGray text-swGray text-xs border-0 text-start">
                      <h1>Maturity Date</h1>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-start text-xs">
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
                          {data?.data?.interestCalculation?.totalPayments.toLocaleString()}
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
                        <p>null</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table className=" w-full ">
                <thead className="bg-swLightGray ">
                  <tr>
                    <th className="w-1/4 px-3 py-3 bg-swLightGray text-swGray text-xs border-0 text-start">
                      Monthly Interest Rate
                    </th>
                    <th className="w-1/4 px-3 py-3 bg-swLightGray text-swGray text-xs border-0 text-start">
                      <h1>Repayment Type</h1>
                    </th>
                    <th className="w-1/4 px-3 py-3 bg-swLightGray text-swGray text-xs border-0 text-start">
                      <h1>Loan Frequency</h1>
                    </th>
                    <th className="w-1/4 px-3 py-3 bg-swLightGray text-swGray text-xs border-0 text-start">
                      <h1>Number of Repayments</h1>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-start text-xs">
                    <td className="w-1/4 px-3 py-3">
                      <div className="flex gap-2 items-center">
                        <p>
                          {data?.data?.loanApplication?.interestRate * 100} %
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
                            repaymentTypeData.find(
                              (option) =>
                                option.value ===
                                data?.data?.loanApplication?.repaymentType
                            )?.label
                          }
                        </p>
                        {hasDecline && hasDecline === true ? (
                          <div
                            className="p-2 rounded-md hover:bg-white cursor-pointer"
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
                        <p>{data?.data?.loanApplication?.loanFrequencyType} </p>
                        {hasDecline && hasDecline === true ? (
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
                        ) : null}
                      </div>
                    </td>
                    <td className="w-1/4 px-3 py-3">
                      <div>
                        <p>{data?.data?.loanApplication?.numberOfRepayment} </p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {data?.data?.loanApplication?.createdBy?._id === useriD?._id ? (
            <div className="ml-5 mr-5 mt-5">
              <h6 className="text-swBlue font-semibold p-2 ">
                Loan Approval Needed
              </h6>
              <div className="border rounded-lg overflow-auto">
                <table className=" w-full ">
                  <thead className="bg-swLightGray ">
                    <tr>
                      <th className="px-3 py-3 bg-swLightGray text-swGray text-xs border-0 text-start">
                        ID
                      </th>
                      <th className="px-3 py-3 bg-swLightGray text-swGray text-xs border-0 text-start">
                        Action
                      </th>

                      <th className="px-3 py-3 bg-swLightGray text-swGray text-xs border-0 text-start">
                        <h1>Approval Status</h1>
                      </th>

                      <th className="px-3 py-3 bg-swLightGray text-swGray text-xs border-0 text-start">
                        <h1>Action</h1>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(loanApprovals?.data?.data) &&
                      loanApprovals?.data?.data?.map((item, index) => (
                        <tr className="text-xs" key={index}>
                          <td className="p-2  text-black">
                            {item?.approvalLevel}
                          </td>
                          <td className="p-2 text-black">
                            {item?.approvalLevel == 1
                              ? "Approve borrowers Credit"
                              : item?.approvalLevel == 2
                              ? "Vett Loan"
                              : item?.approvalLevel == 3
                              ? "Request payout authorization"
                              : item?.approvalLevel == 4
                              ? "MD/CEO Approval"
                              : item?.approvalLevel == 5
                              ? "Payout Approval"
                              : null}
                          </td>
                          <td className="p-2">
                            <button
                              className={`cursor-none ${
                                item.status === "Approved"
                                  ? "bg-[#E8F7F0] text-[#107E4B]  text-xs font-normal px-2 py-1 rounded-full"
                                  : item.status === "Pending"
                                  ? "bg-swLightGray text-swGray text-xs font-normal px-2 py-1 rounded-full"
                                  : item.status === "Approval Requested"
                                  ? "bg-red-400 text-white text-xs font-normal px-2 py-1 rounded-full"
                                  : item.status === "Declined"
                                  ? "bg-red-500 text-white text-xs font-normal px-2 py-1 rounded-full"
                                  : "bg-gray-300 text-gray-800 text-xs font-normal px-2 py-1 rounded-full"
                              } px-2 py-1 rounded`}
                            >
                              {item.status}
                            </button>
                          </td>

                          <td className="p-2">
                            <Button
                              onClick={() => {
                                setCurrentApprovalId(item?.approvalLevel);
                                setCurrentApprovalLevel(item?.approvalTitle);
                                setIsRequestApprovalOpen(true);
                              }}
                              disabled={
                                item?.status === "Approval Requested" ||
                                item?.status === "Approved"
                              }
                              variant="secondary"
                              className="text-xs rounded-lg"
                            >
                              {item?.status === "Pending" || "Declined"
                                ? "Request for Approval"
                                : item?.status}
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
          {data?.data?.loanApplication?.createdBy?._id ===
          useriD?._id ? null : (
            <div className="ml-5 mr-5 mt-5">
              {loanApprovals &&
              Array.isArray(loanApprovals?.data?.data) &&
              loanApprovals?.data?.data.filter(
                (item) =>
                  item?.assignee?._id === useriD?._id &&
                  item?.status === "Approval Requested"
              ).length > 0 ? (
                <div>
                  <h6 className="text-center font-semibold p-2">Loan Action</h6>
                  <div className="border rounded-lg">
                    <table className=" w-full ">
                      <thead className="bg-swLightGray ">
                        <tr>
                          <th className="px-3 py-3 bg-swLightGray text-swGray text-xs border-0 text-start">
                            <h1>Action Task</h1>
                          </th>

                          <th className="px-3 py-3 bg-swLightGray text-swGray text-xs border-0 text-start">
                            <h1>Assigned To</h1>
                          </th>

                          <th className="px-3 py-3 bg-swLightGray text-swGray text-xs border-0 text-start">
                            <h1>Status</h1>
                          </th>

                          <th className="px-3 py-3 bg-swLightGray text-swGray text-xs border-0 text-start">
                            <h1>Approve/Decline</h1>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {loanApprovals &&
                          Array.isArray(loanApprovals?.data?.data) &&
                          loanApprovals?.data?.data
                            .filter(
                              (item) =>
                                item?.assignee?._id === useriD?._id &&
                                item?.status === "Approval Requested"
                            )
                            .map((item, index) => (
                              <tr className="text-xs" key={index}>
                                <td className="p-2">{item?.approvalTitle}</td>
                                <td className="p-2">
                                  <p className="">
                                    {" "}
                                    {item?.assignee?.firstName}{" "}
                                    {item?.assignee?.lastName}
                                  </p>
                                  <p className="text-swGray">
                                    {" "}
                                    {item?.assignee?.role?.name}
                                  </p>
                                </td>

                                <td className="p-2 border font-400 text-xs text-swGray border-none">
                                  {" "}
                                  <button className="py-2 px-2 text-[#107E4B] text-xs bg-[#E8F7F0] rounded-full">
                                    Pending
                                  </button>
                                </td>
                                <td className="p-2 border font-400 text-xs text-swGray border-none">
                                  <div className="flex gap-2">
                                    <button
                                      className="py-2 px-2 text-[#ffffff] text-xs bg-swBlue rounded-md"
                                      onClick={() => {
                                        setCurrentTaskId(item?.currentTaskId);
                                        setCurrentApprovalId(
                                          item?.approvalLevel
                                        );
                                        setCurrentApprovalLevel(
                                          item?.approvalTitle
                                        );
                                        setApprovalOpen(true);
                                      }}
                                    >
                                      Approve
                                    </button>
                                    <button
                                      className="py-2 px-2 text-red-500  border-red-500 text-xs bg-red-50 rounded-md"
                                      onClick={() => {
                                        setCurrentTaskId(item?.currentTaskId);
                                        setCurrentApprovalId(
                                          item?.approvalLevel
                                        );
                                        setCurrentApprovalLevel(
                                          item?.approvalTitle
                                        );
                                        setDeclineOpen(true);
                                      }}
                                    >
                                      Decline
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : null}
            </div>
          )}

          <div className="ml-5 mr-5 mt-5">
            <h6 className="font-semibold text-swDarkRed p-2">Loan Accurals</h6>
            <div className="border rounded-lg overflow-auto">
              <table className=" w-full ">
                <thead className="bg-swLightGray ">
                  <tr>
                    <th className="w-1/4 px-3 py-3 bg-swLightGray text-swDarkRed text-xs border-0 text-start">
                      Number of Overdue days
                    </th>

                    <th className="w-1/4  px-3 py-3 bg-swLightGray text-swDarkRed text-xs border-0 text-start">
                      <h1>Overdue Period Amount</h1>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-start text-xs">
                    <td className="w-1/4 px-3 py-3">
                      <div className="flex gap-2 items-center text-swDarkRed font-semibold">
                        <p>
                          {data?.data?.loanApplication
                            ?.totalLoanOverdueDaysCount || 0}{" "}
                          day(s){" "}
                        </p>
                      </div>
                    </td>

                    <td className="w-1/4 px-3 py-3">
                      <div>
                        <p className="text-swDarkRed font-semibold">
                          ₦{" "}
                          {data?.data?.loanApplication?.totalAmountAccruedForOverdue?.toLocaleString() ||
                            0}
                        </p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-5">
            <section id="loan-details">{/* <ReusableDataTables/> */}</section>
            <section></section>
            <section
              id="activities"
              className="border border-gray-300 rounded-2xl"
            >
              {/* <div className="p-4 flex justify-between items-center"></div> */}
              <div className="flex items-center justify-between overflow-x-hidden border-b border-gray-300 py-2 px-4 flex-wrap">
                <div className="flex gap-2 text-xs lg:text-sm overflow-auto">
                  <button
                    onClick={() => handleActivityToggle("activity-logs")}
                    className={`${
                      activityButton === "activity-logs" &&
                      "font-semibold text-swBlue bg-blue-50"
                    } p-2 rounded-md text-xs md:text-sm`}
                  >
                    Activity logs
                  </button>
                  <button
                    onClick={() => handleActivityToggle("loans")}
                    className={`${
                      activityButton === "loans" &&
                      "font-semibold text-swBlue bg-blue-50"
                    } p-2 rounded-md cursor-pointer text-xs md:text-sm`}
                  >
                    Loan Documents
                  </button>
                  <button
                    onClick={() => handleActivityToggle("repayment")}
                    className={`${
                      activityButton === "repayment" &&
                      "font-semibold text-swBlue bg-blue-50"
                    } p-2 rounded-md cursor-pointer text-xs md:text-sm`}
                  >
                    Repayments
                  </button>
                  <button
                    onClick={() => handleActivityToggle("paymentHistory")}
                    className={`${
                      activityButton === "paymentHistory" &&
                      "font-semibold text-swBlue bg-blue-50"
                    } p-2 rounded-md cursor-pointer text-xs md:text-sm`}
                  >
                    Payment History
                  </button>
                </div>
              </div>
              <div className="p-2">
                {activityButton === "activity-logs" && <CustomerActivityLogs />}
                {/* {activityButton === "summary" && <Summary />} */}
                {activityButton === "loans" && (
                  <CustomerLoanDoc data={data?.data} />
                )}
                {activityButton === "repayment" && (
                  <CustomerRepayment data={data?.data} loanId={id} />
                )}

                {activityButton === "paymentHistory" && (
                  <CustomerPaymentHistory data={data?.data} loanId={id} />
                )}
              </div>
            </section>
          </div>
        </section>
        <section id="loan_process" className="hidden md:block w-[30%] h-full">
          <p className="border-b border-gray-300 p-4 text-swGray font-semibold">
            Loan Processes
          </p>
          <div className="p-2">
            <LoanProcessCard data={loanApprovals} />
          </div>
          <div className="flex justify-end">
            {useriD?.role?.tag === "CFO" ||
            useriD?.role?.tag === "CEO" ||
            useriD?.role?.tag === "Dir" ? (
              <Button
                onClick={() => {
                  setLoanReassignment(true);
                  modifyUsersToApprove();
                }}
                className="m-2 w-full block rounded-lg text-sm"
                variant="secondary"
              >
                Reassign Loan
              </Button>
            ) : null}
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
              onChange={(e) => setLoanAmount(e.target.value)}
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
                (option) => option.value === formData.loanPackage
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
              onChange={(e) => setInterestRate(e.target.value)}
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
              value={repaymentTypeData.find(
                (option) => option.value === formData.repaymentType
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
                value={loanDurationMetricsData.find(
                  (option) => option.value === formData.loanDurationMetrics
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
                value={formData.loanDuration}
                required={false}
                name="loanDuration"
                onKeyPress={preventMinus}
                onWheel={() => document.activeElement.blur()}
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
                value={frequencyTypeData.find(
                  (option) => option.value === formData.loanFrequencyType
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
                      bankArr.find(
                        (option) =>
                          option.value ===
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
                Disbursement Date: {format(formData.disbursementDate, "PPP")}
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
                      selected: formData.disbursementDate,
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
    </DashboardLayout>
  );
};

export default ViewLoan;
