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
import { AiOutlineMail } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiDatabase, FiPhone, FiSearch } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import { getInterestType } from "@/redux/slices/interestTypeSlice";
import { IoCopyOutline } from "react-icons/io5";
import { LuCalendar } from "react-icons/lu";
import { getSingleLoan } from "@/redux/slices/loanApplicationSlice";
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
import EditableButton from "@/app/components/shared/editableButtonComponent/EditableButton";
import { setUseProxies } from "immer";
import { getLoanPackage } from "@/redux/slices/loanPackageSlice";
import SelectField from "@/app/components/shared/input/SelectField";
import CustomerRepayment from "@/app/components/customers/CustomerRepayment";

const ViewLoan = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector(
    (state) => state.loanApplication
  );
  const loanPackage = useSelector((state) => state.loanPackage);
  const interestType = useSelector((state) => state.interestType);

  const loanApprovals = useSelector((state) => state.loanApprovals);
  const user = useSelector((state) => state.user?.data?.data?.results);
  const [activityButton, setActivityButton] = useState("activity-logs");
  const [logSearch, setLogSearch] = useState(false);
  const [isRequestApprovalOpen, setIsRequestApprovalOpen] = useState(false);
  const [isApprovalOpen, setApprovalOpen] = useState(false);
  const [isDeclineOpen, setDeclineOpen] = useState(false);
  const [openLoanAmount, setOpenLoanAmount] = useState(false);
  const [loanAmount, setLoanAmount] = useState(0);
  const [currentApprovalLevel, setCurrentApprovalLevel] = useState(null);
  const [currentApprovalId, setCurrentApprovalId] = useState(null);
  const [useriD, setUser] = useState(null);
  const [openLoanPackage, setOpenLoanPackage] = useState(false);
  const [openInterestType, setOpenInterestType] = useState(false);
  const [openRepaymentType, setOpenRepaymentType] = useState(false);
  const [openLoanPeriod, setOpenLoanPeriod] = useState(false);
  const [loanDurationVal, setLoanDurationVal] = useState(0);
  const [formData, setFormData] = useState({});
  const userToApprove = JSON.parse(localStorage.getItem("user"));
  const router = useRouter();
  const handleActivityToggle = (buttonId) => {
    setActivityButton(buttonId);
  };

  const handleLogSearch = (state) => {
    state === "open" ? setLogSearch(true) : setLogSearch(false);
  };
  const preventMinus = (e) => {
    if (e.code === "Minus") {
      e.preventDefault();
    }
  };

  const updateLoan = (update) => {
    if (update === "loanAmount") {
      let updatedData = new FormData();
      updatedData.append("loanAmount", loanAmount);
      dispatch(updateLoanApplication({ loanId: id, payload: updatedData }));
      dispatch(getSingleLoan(id));
      setOpenLoanAmount(false);
      setFormData({});
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      let updatedData = new FormData();
      updatedData.append(update, formData[update]);
      dispatch(updateLoanApplication({ loanId: id, payload: updatedData }));
      dispatch(getSingleLoan(id));
      setOpenLoanPackage(false);
      setOpenInterestType(false);
      setOpenRepaymentType(false);
      setOpenLoanPeriod(false);
      // console.log([...updatedData]);
      setFormData({});
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
    // if (update === "interestType") {
    //   let updatedData = new FormData();
    //   updatedData.append("interestType", formData.interestType);
    //   dispatch(updateLoanApplication({ loanId: id, payload: updatedData }));
    //   dispatch(getSingleLoan(id));
    //   setOpenInterestType(false);
    //   // console.log([...updatedData][0]);
    //   setFormData({});
    // }
    // if (update === "repaymentType") {
    //   let updatedData = new FormData();
    //   updatedData.append("repaymentType", formData.repaymentType);
    //   // dispatch(updateLoanApplication({ loanId: id, payload: updatedData }));
    //   // dispatch(getSingleLoan(id));
    //   // setOpenRepaymentType(false);
    //   console.log([...updatedData]);
    //   // setFormData({});
    // }
  };

  const modifyLoanPackageData = (arr) => {
    return arr?.map((item) => ({
      label: item.name,
      value: item._id,
      interestRate: item?.interestRate?.rate,
    }));
  };

  const modifyInterestTypeData = (arr) => {
    if (Array.isArray(arr)) {
      return arr.map((item) => ({
        label: item.name,
        value: item._id,
      }));
    } else {
      return [];
    }
  };

  const setInputState = async (e) => {
    let { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    console.log(value);
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

  useEffect(() => {
    dispatch(getSingleLoan(id));
    dispatch(getLoanApprovals(id));
    dispatch(getLoanPackage());
    dispatch(getAllUsers());
    dispatch(getInterestType());

    const _user = JSON.parse(localStorage.getItem("user"));

    if (_user) {
      setUser(_user?.data?.user?._id);
    }

    if (data) {
      setLoanAmount(data?.data?.loanApplication?.loanAmount);
    }
  }, []);

  return (
    <DashboardLayout
      isBackNav={true}
      paths={["Loan Applications", "View loan"]}
    >
      <main className="flex h-full">
        <section className="w-full">
          <section
            id="customer_details"
            className="flex gap-2 border-b border-gray-300 items-end py-4 px-8"
          >
            <div className="w-1/2">
              <div className="flex ">
                <div>
                  <Image
                    src={
                      "https://cdn-icons-png.flaticon.com/512/4128/4128349.png"
                    }
                    alt="user image"
                    width={60}
                    height={60}
                  />
                </div>
                <div className="ml-4 h-fit">
                  <p className="text-md font-semibold text-swBlue mb-1">
                    {/* {console.log({ data })} */}
                    {data?.data?.customerDetails?.firstName}{" "}
                    {data?.data?.customerDetails?.lastName}
                  </p>
                  <p className="text-xs">SW-456789</p>

                  <div className="flex gap-2 items-center h-fit w-fit mt-4">
                    {/* <div className="p-[0.1rem] bg-transparent hover:bg-gray-200 w-fit h-fit m-auto rounded-md flex">
                      <Link
                        href="mailto: helloyt@gmail.com"
                        className="bg-white border border-gray-300 w-fit p-2 rounded-md"
                      >
                        <AiOutlineMail size={15} />
                      </Link>
                    </div>
                    <div className="p-[0.1rem] bg-transparent hover:bg-gray-200 w-fit h-fit m-auto rounded-md flex">
                      <Link
                        href="mailto: helloyt@gmail.com"
                        className="bg-white border border-gray-300 w-fit p-2 rounded-md"
                      >
                        <FiPhone size={15} />
                      </Link>
                    </div>
                    <div className="p-[0.1rem] bg-transparent hover:bg-gray-200 w-fit h-fit m-auto rounded-md flex">
                      <Link
                        href="mailto: helloyt@gmail.com"
                        className="bg-white border border-gray-300 w-fit p-2 rounded-md"
                      >
                        <LuCalendar size={15} />
                      </Link>
                    </div>
                    <div className="p-[0.1rem] bg-transparent hover:bg-gray-200 w-fit h-fit m-auto rounded-md flex">
                      <Link
                        href="mailto: helloyt@gmail.com"
                        className="bg-white border border-gray-300 w-fit p-2 rounded-md"
                      >
                        <FiDatabase size={15} />
                      </Link>
                    </div> */}
                    <button
                      className={
                        "text-white text-xs bg-[#2769b3d9] px-3 py-2 rounded-lg font-medium"
                      }
                    >
                      <p>{data?.data?.loanApplication?.status} </p>
                    </button>
                    <button
                      onClick={() => {
                        router.push(
                          `/borrowers/profile/${data?.data?.customerDetails?._id}`
                        );
                      }}
                      className={
                        "text-swBlue text-sm bg-white px-5 py-2 ml-3 rounded-lg font-medium"
                      }
                    >
                      View profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/2">
              <div className="flex justify-between items-center gap-5">
                <div className="w-full bg-gray-100 rounded-xl p-2">
                  <p className="text-base font-medium">Loan ID:</p>
                  <div className="flex justify-between items-center">
                    <p className="text-md text-swGray font-semibold mt-4">
                      SWL-{data?.data?.loanApplication?.loanId}
                    </p>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-xl p-2">
                  <p className="text-base font-medium">Loan Amount:</p>

                  <div className="flex justify-between items-center">
                    <p className="text-md text-swGray font-semibold mt-4">
                      ₦{" "}
                      {data?.data?.loanApplication?.loanAmount.toLocaleString()}
                    </p>
                    <div
                      className="p-2 rounded-md hover:bg-white cursor-pointer mt-2"
                      onClick={() => {
                        setLoanAmount(data?.data?.loanApplication?.loanAmount);
                        setOpenLoanAmount(true);
                      }}
                    >
                      <MdEdit size={15} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="ml-5 mr-5 mt-5">
            <h6 className="text-center font-semibold p-2">Loan Details</h6>
            <div className="border rounded-lg">
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
                      </div>
                    </td>
                    <td className="w-1/4 px-3 py-3">
                      <div>
                        <p>null</p>
                      </div>
                    </td>
                    {/* <td className="px-3 py-3">
                      <button
                        className={`${"font-semibold text-swBlue bg-blue-50"} p-1 text-xs rounded-full border cursor-pointer`}
                      >
                        {data?.data?.loanApplication?.status}
                      </button>
                    </td> */}
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
                      </div>
                    </td>

                    <td className="w-1/4 px-3 py-3">
                      <div className="flex gap-2 items-center">
                        <p>{data?.data?.loanApplication?.repaymentType} </p>
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
                      </div>
                    </td>
                    <td className="w-1/4 px-3 py-3">
                      <div className="flex gap-2 items-center">
                        <p>{data?.data?.loanApplication?.loanFrequencyType} </p>
                        <div
                          className="p-2 rounded-md hover:bg-white cursor-pointer"
                          onClick={() => {
                            setLoanAmount(
                              data?.data?.loanApplication?.loanAmount
                            );
                            setOpenLoanAmount(true);
                          }}
                        >
                          <MdEdit size={15} />
                        </div>
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
          {data?.data?.loanApplication?.createdBy === useriD ? (
            <div className="ml-5 mr-5 mt-5">
              <h6 className="text-center font-semibold p-2">
                Loan Approval Needed
              </h6>
              <div className="border rounded-lg">
                <table className=" w-full ">
                  <thead className="bg-swLightGray ">
                    <tr>
                      <th className="px-3 py-3 bg-swLightGray text-swGray text-xs border-0 text-start">
                        Approval ID
                      </th>

                      <th className="px-3 py-3 bg-swLightGray text-swGray text-xs border-0 text-start">
                        <h1>Approval Type</h1>
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
                          <td className="p-2">{item?.approvalTitle}</td>
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
          {data?.data?.loanApplication?.createdBy === useriD ? null : (
            <div className="ml-5 mr-5 mt-5">
              {loanApprovals &&
              Array.isArray(loanApprovals?.data?.data) &&
              loanApprovals?.data?.data.filter(
                (item) =>
                  item?.assignee?._id === useriD &&
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
                                item?.assignee?._id === useriD &&
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
                                        setDeclineOpen(true);
                                      }}
                                    >
                                      Decline
                                    </button>
                                    {/* <EditableButton
                    onClick={() => {
                      setApprovalOpen(true);
                    }}
                    className="py-2 px-2 text-[#ffffff] text-xs bg-swBlue rounded-md"
                  >
                    Approve
                  </EditableButton>
                  <EditableButton
                    onClick={() => {
                      setDeclineOpen(true);
                    }}
                    className="py-2 px-2 text-red-500  border-red-500 text-xs bg-red-50 rounded-md"
                  >
                    Decline
                  </EditableButton> */}
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

          <div className="p-5">
            <section id="loan-details">{/* <ReusableDataTables/> */}</section>
            <section></section>
            <section
              id="activities"
              className="border border-gray-300 rounded-2xl"
            >
              {/* <div className="p-4 flex justify-between items-center"></div> */}
              <div className="flex items-center justify-between overflow-x-hidden border-b border-gray-300 py-2 px-4 flex-wrap">
                <div className="flex gap-2 text-xs lg:text-sm">
                  <button
                    onClick={() => handleActivityToggle("activity-logs")}
                    className={`${
                      activityButton === "activity-logs" &&
                      "font-semibold text-swBlue bg-blue-50"
                    } p-2 rounded-md whitespace-nowrap`}
                  >
                    Activity logs
                  </button>
                  <button
                    onClick={() => handleActivityToggle("summary")}
                    className={`${
                      activityButton === "summary" &&
                      "font-semibold text-swBlue bg-blue-50"
                    } p-2 rounded-md cursor-pointer`}
                  >
                    Summary
                  </button>
                  <button
                    onClick={() => handleActivityToggle("loans")}
                    className={`${
                      activityButton === "loans" &&
                      "font-semibold text-swBlue bg-blue-50"
                    } p-2 rounded-md cursor-pointer`}
                  >
                    Loan Docs
                  </button>
                  <button
                    onClick={() => handleActivityToggle("disbursement")}
                    className={`${
                      activityButton === "disbursement" &&
                      "font-semibold text-swBlue bg-blue-50"
                    } p-2 rounded-md cursor-pointer`}
                  >
                    Disbursment
                  </button>
                  <button
                    onClick={() => handleActivityToggle("repayment")}
                    className={`${
                      activityButton === "repayment" &&
                      "font-semibold text-swBlue bg-blue-50"
                    } p-2 rounded-md cursor-pointer`}
                  >
                    Repayments
                  </button>
                </div>

                <div className="flex justify-center items-center gap-2 ml-auto">
                  <InputField
                    startIcon={<FiSearch size={20} />}
                    endIcon={
                      <IoIosClose
                        size={20}
                        className="cursor-pointer"
                        onClick={() => {
                          handleLogSearch("close");
                        }}
                      />
                    }
                    placeholder={"Search..."}
                    css={`
                      ${logSearch
                        ? "translate-x-[3rem] opacity-1 z-10"
                        : "translate-x-[17rem] -z-10 opacity-0"} transition-all ease-in-out
                    `}
                    borderColor="bg-gray-200 "
                  />

                  <div
                    className={`${
                      logSearch ? "opacity-0" : "opacity-1"
                    } bg-white w-fit p-2 transition-all ease-in-out rounded-md border-2 border-transparent  cursor-pointer`}
                  >
                    <FiSearch
                      size={20}
                      onClick={() => {
                        handleLogSearch("open");
                      }}
                    />
                  </div>
                  <div className="bg-white w-fit p-2 rounded-md border-2 border-transparent  cursor-pointer">
                    <BsThreeDotsVertical size={20} />
                  </div>
                </div>
              </div>
              <div className="p-2">
                {activityButton === "activity-logs" && <CustomerActivityLogs />}
                {activityButton === "summary" && <Summary />}
                {activityButton === "loans" && (
                  <CustomerLoanDoc data={data?.data} />
                )}
                 {activityButton === "repayment" && (
                  <CustomerRepayment data={data?.data} loanId={id} />
                )}
              </div>
            </section>
          </div>
        </section>
        <section
          id="loan_process"
          className="w-[30%] border-l border-gray-300 h-full"
        >
          <p className="border-b border-gray-300 p-4 text-swGray font-semibold">
            Loan Processes
          </p>
          <div className="p-2">
            <LoanProcessCard data={loanApprovals} />
          </div>
        </section>
      </main>

      {/* <ApprovalModal
        approvalLevel={data?.data?.approvalNeeded?.approvalTitle}
        approvalId={data?.data?.approvalNeeded?.approvalLevel}
        isOpen={isApprovalOpen}
        onClose={() => {
          setApprovalOpen(false);
        }}
      /> */}
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
          isOpen={isApprovalOpen}
          data={data?.data}
          onClose={() => setApprovalOpen(false)}
        />{" "}
      </CenterModal>
      <CenterModal isOpen={isDeclineOpen}>
        <DeclineModal
          approvalLevel={data?.data?.approvalNeeded?.approvalTitle}
          approvalId={data?.data?.approvalNeeded?.approvalLevel}
          isOpen={isDeclineOpen}
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

          <InputField
            label={"Enter new loan amount"}
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
          />
          <Button
            disabled={
              loanAmount == data?.data?.loanApplication?.loanAmount
                ? true
                : false
            }
            onClick={() => updateLoan("loanAmount")}
            className="h-10 w-full mt-6 bg-swBlue text-white rounded-md"
          >
            Update Amount
          </Button>
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
          <Button
            onClick={() => updateLoan("loanPackage")}
            className="h-10 w-full mt-6 bg-swBlue text-white rounded-md"
          >
            Update Loan Package
          </Button>
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
          <SelectField
            value={modifyInterestTypeData(interestType?.data?.data)?.find(
              (option) => option.value === formData.interestType
            )}
            name="interestType"
            // disabled={formData.numberOfRepayment === 0 ? true : false}
            optionValue={modifyInterestTypeData(interestType?.data?.data)}
            label={"Interest Type"}
            required={true}
            placeholder={"Select interest type"}
            isSearchable={false}
            onChange={(selectedOption) => {
              handleSelectChange(selectedOption, "interestType");
            }}
          />
          <Button
            onClick={() => updateLoan("interestType")}
            className="h-10 w-full mt-6 bg-swBlue text-white rounded-md"
          >
            Update intrest rate type
          </Button>
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
          <Button
            onClick={() => updateLoan("repaymentType")}
            className="h-10 w-full mt-6 bg-swBlue text-white rounded-md"
          >
            Update repayment type
          </Button>
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

          <div className="flex gap-2 items-end">
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
                inputType="number"
                min="0"
                onKeyPress={preventMinus}
                activeBorderColor="border-swBlue"
                placeholder="Enter number"
                onChange={(e) => {
                  setInputState(e);
                }}
              />
            </div>
          </div>

          <Button
            onClick={() => updateLoan("loanDuration")}
            className="h-10 w-full mt-6 bg-swBlue text-white rounded-md"
          >
            Update loan period
          </Button>
        </div>
      </CenterModal>
    </DashboardLayout>
  );
};

export default ViewLoan;
