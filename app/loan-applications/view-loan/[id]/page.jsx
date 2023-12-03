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

const ViewLoan = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector(
    (state) => state.loanApplication
  );

  const loanApprovals = useSelector((state) => state.loanApprovals);
  const user = useSelector((state) => state.user?.data?.data?.results);
  const [activityButton, setActivityButton] = useState("activity-logs");
  const [logSearch, setLogSearch] = useState(false);
  const [isRequestApprovalOpen, setIsRequestApprovalOpen] = useState(false);
  const [isApprovalOpen, setApprovalOpen] = useState(false);
  const [isDeclineOpen, setDeclineOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [loanAmount, setLoanAmount] = useState(0);
  const [currentApprovalLevel, setCurrentApprovalLevel] = useState(null);
  const [currentApprovalId, setCurrentApprovalId] = useState(null);
  const [useriD, setUser] = useState(null);
  const userToApprove = JSON.parse(localStorage.getItem("user"));
  const router = useRouter();
  const handleActivityToggle = (buttonId) => {
    setActivityButton(buttonId);
  };

  const handleLogSearch = (state) => {
    state === "open" ? setLogSearch(true) : setLogSearch(false);
  };

  const updateLoan = () => {
    let updatedData = new FormData();
    updatedData.append("loanAmount", loanAmount);
    dispatch(updateLoanApplication({ loanId: id, payload: updatedData }));
    dispatch(getSingleLoan(id));
    setOpenUpdate(false);
  };

  useEffect(() => {
    dispatch(getSingleLoan(id));
    dispatch(getLoanApprovals(id));

    dispatch(getAllUsers());

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
                    {console.log({ data })}
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
                      className="p-2 rounded-md hover:bg-white   mt-2"
                      onClick={() => {
                        setLoanAmount(data?.data?.loanApplication?.loanAmount);
                        setOpenUpdate(true);
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
                      <div>
                        <div
                          className="p-2 rounded-md hover:bg-white   mt-2"
                          onClick={() => {
                            setLoanAmount(
                              data?.data?.loanApplication?.loanAmount
                            );
                            setOpenUpdate(true);
                          }}
                        >
                          <MdEdit size={15} />
                        </div>
                        <p>{data?.data?.loanPackageDetails?.name} </p>
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
                      <div>
                        <div
                          className="p-2 rounded-md hover:bg-white   mt-2"
                          onClick={() => {
                            setLoanAmount(
                              data?.data?.loanApplication?.loanAmount
                            );
                            setOpenUpdate(true);
                          }}
                        >
                          <MdEdit size={15} />
                        </div>
                        <p>
                          {data?.data?.loanApplication?.loanDurationMetrics ===
                          "Yearly"
                            ? `${data?.data?.loanApplication?.loanDuration}` *
                              12
                            : `${data?.data?.loanApplication?.loanDuration}`}{" "}
                          month(s)
                        </p>
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
                      Interest Rate Type
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
                      <div>
                        <div
                          className="p-2 rounded-md hover:bg-white   mt-2"
                          onClick={() => {
                            setLoanAmount(
                              data?.data?.loanApplication?.loanAmount
                            );
                            setOpenUpdate(true);
                          }}
                        >
                          <MdEdit size={15} />
                        </div>
                        <p>
                          {
                            data?.data?.loanPackageDetails?.interestRate
                              ?.rateType
                          }{" "}
                        </p>
                      </div>
                    </td>

                    <td className="w-1/4 px-3 py-3">
                      <div>
                        <div
                          className="p-2 rounded-md hover:bg-white   mt-2"
                          onClick={() => {
                            setLoanAmount(
                              data?.data?.loanApplication?.loanAmount
                            );
                            setOpenUpdate(true);
                          }}
                        >
                          <MdEdit size={15} />
                        </div>
                        <p>{data?.data?.loanApplication?.repaymentType} </p>
                      </div>
                    </td>
                    <td className="w-1/4 px-3 py-3">
                      <div>
                        <div
                          className="p-2 rounded-md hover:bg-white   mt-2"
                          onClick={() => {
                            setLoanAmount(
                              data?.data?.loanApplication?.loanAmount
                            );
                            setOpenUpdate(true);
                          }}
                        >
                          <MdEdit size={15} />
                        </div>
                        <p>{data?.data?.loanApplication?.loanFrequencyType} </p>
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
                                  ? "bg-swGreen text-white text-xs font-normal px-2 py-1 rounded-full"
                                  : item.status === "Pending"
                                  ? "bg-swLightGray text-swGray text-xs font-normal px-2 py-1 rounded-full"
                                  : item.status === "Approval request initiated"
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
                              disabled={item?.status === "Approval request initiated" || item?.status === "Approved"}

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
                  item?.assignee?._id === useriD && item?.status === "Approval request initiated"
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
                              (item?.status === "Approval request initiated")
                          ).map((item, index) => (
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
              {/* <div className="p-3 flex justify-between items-center"></div> */}
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

      <CenterModal isOpen={openUpdate} width={"25%"}>
        <div className="flex justify-end">
          <MdClose
            size={20}
            onClick={() => {
              setOpenUpdate(!openUpdate);
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
            loanAmount == data?.data?.loanApplication?.loanAmount ? true : false
          }
          onClick={updateLoan}
          className="h-10 w-full mt-6 bg-swBlue text-white rounded-md"
        >
          Update Amount
        </Button>
      </CenterModal>
    </DashboardLayout>
  );
};

export default ViewLoan;
