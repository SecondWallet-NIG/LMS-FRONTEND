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
import { MdEdit } from "react-icons/md";
import CenterModal from "@/app/components/modals/CenterModal";
import Button from "@/app/components/shared/buttonComponent/Button";
import { useRouter } from "next/navigation";
import ApprovalModal from "@/app/components/modals/loans/ApprovalModal";
import DeclineModal from "@/app/components/modals/loans/DeclineModal";
import EditableButton from "@/app/components/shared/editableButtonComponent/EditableButton";
const ViewLoan = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector(
    (state) => state.loanApplication
  );

  const loanApprovals = useSelector((state) => state.loanApprovals);
  const user = useSelector((state) => state.user?.data?.data?.results);
  console.log({ user });
  const [activityButton, setActivityButton] = useState("activity-logs");
  const [logSearch, setLogSearch] = useState(false);
  const [isRequestApprovalOpen, setIsRequestApprovalOpen] = useState(false);
  const [isApprovalOpen, setApprovalOpen] = useState(false);
  const [isDeclineOpen, setDeclineOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [loanAmount, setLoanAmount] = useState(0);
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

    if (data) {
      setLoanAmount(data?.data?.loanApplication?.loanAmount);
    }
  }, []);

  return (
    <DashboardLayout>
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
                  <p className="text-xl font-semibold text-swBlue mb-1">
                    {console.log({ data })}
                    {data?.data?.customerDetails?.firstName}{" "}
                    {data?.data?.customerDetails?.lastName}
                  </p>
                  <p className="text-xs">SW-456789</p>

                  <div className="flex gap-2 items-center h-fit w-fit mt-4">
                    <div className="p-[0.1rem] bg-transparent hover:bg-gray-200 w-fit h-fit m-auto rounded-md flex">
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
                    </div>
                    <button
                      onClick={() => {
                        router.push(
                          `/customers/profile/${data?.data?.customerDetails?._id}`
                        );
                      }}
                      className={
                        "text-white text-sm bg-swBlue px-5 py-2 ml-3 rounded-lg font-medium"
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
                      ₦ {data?.data?.loanApplication?.loanAmount}
                    </p>
                    <div
                      className="p-2 rounded-md hover:bg-white hover:border-2 hover:border-gray-200 mt-2"
                      onClick={() => {
                        setLoanAmount(data?.data?.loanApplication?.loanAmount);
                        setOpenUpdate(true);
                      }}
                    >
                      <MdEdit size={20} />
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
                    <th className="px-3 py-3 bg-swLightGray text-swGray text-xs border-0 text-start">
                      Loan Type
                    </th>

                    <th className="px-3 py-3 bg-swLightGray text-swGray text-xs border-0 text-start">
                      <h1>Maturity Amount</h1>
                    </th>
                    <th className="px-3 py-3 bg-swLightGray text-swGray text-xs border-0 text-start">
                      <h1>Loan Period</h1>
                    </th>
                    <th className="px-3 py-3 bg-swLightGray text-swGray text-xs border-0 text-start">
                      <h1>Maturity Date</h1>
                    </th>
                    <th className="px-3 py-3 bg-swLightGray text-swGray text-xs border-0 text-start">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-start text-xs">
                    <td className="px-3 py-3">
                      <div>
                        <p>{data?.data?.loanPackageDetails?.name} </p>
                      </div>
                    </td>

                    <td className="px-3 py-3">
                      <div>
                        <p>
                          ₦ {data?.data?.interestCalculation?.totalPayments}
                        </p>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div>
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
                    <td className="px-3 py-3">
                      <div>
                        <p>null</p>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <button
                        className={`${"font-semibold text-swBlue bg-blue-50"} p-1 text-xs rounded-full border cursor-pointer`}
                      >
                        {data?.data?.loanApplication?.status}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
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
                  <tr className="text-xs">
                    <td className="p-2">
                      {data?.data?.approvalNeeded?.approvalLevel}
                    </td>
                    <td className="p-2">
                      {" "}
                      {data?.data?.approvalNeeded?.approvalTitle}{" "}
                    </td>
                    {/* <td>
                      <div className="border py-1 px-2 w-fit rounded-xl">
                        {data?.data?.approvalNeeded?.approvalTitle}
                      </div>
                    </td> */}
                    <td className="p-2">
                      <button
                        onClick={() => {
                          setIsRequestApprovalOpen(true);
                        }}
                        disabled={
                          data?.data?.approvalNeeded?.status === "Pending"
                            ? false
                            : true
                        }
                        className={`py-1 px-2 border rounded-lg`}
                      >
                        {data?.data?.approvalNeeded?.status === "Pending"
                          ? "Request for Approval"
                          : data?.data?.approvalNeeded?.status}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {userToApprove?.data?.user?._id ==
          data?.data?.approvalNeeded?.assignee?._id ? (
            <div className="ml-5 mr-5 mt-5">
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
                    <tr className="text-xs">
                      <td className="p-2">
                        {data?.data?.approvalNeeded?.approvalTitle ===
                        "Credit Admin Officer"
                          ? "Approve Loan Credit"
                          : data?.data?.approvalNeeded?.approvalTitle}
                      </td>
                      <td className="p-2">
                        <p className="">
                          {" "}
                          {data?.data?.approvalNeeded?.assignee?.firstName}{" "}
                          {data?.data?.approvalNeeded?.assignee?.lastName}
                        </p>
                        <p className="text-swGray">
                          {" "}
                          {data?.data?.approvalNeeded?.assignee?.role?.name}
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
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}

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
                    } bg-white w-fit p-2 transition-all ease-in-out rounded-md border-2 border-transparent hover:border-gray-200 cursor-pointer`}
                  >
                    <FiSearch
                      size={20}
                      onClick={() => {
                        handleLogSearch("open");
                      }}
                    />
                  </div>
                  <div className="bg-white w-fit p-2 rounded-md border-2 border-transparent hover:border-gray-200 cursor-pointer">
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
      <RequestApproval
        approvalLevel={data?.data?.approvalNeeded?.approvalTitle}
        approvalId={data?.data?.approvalNeeded?.approvalLevel}
        data={user}
        isOpen={isRequestApprovalOpen}
        onClose={() => {
          setIsRequestApprovalOpen(false);
        }}
      />
      <ApprovalModal
        approvalLevel={data?.data?.approvalNeeded?.approvalTitle}
        approvalId={data?.data?.approvalNeeded?.approvalLevel}
        isOpen={isApprovalOpen}
        onClose={() => {
          setApprovalOpen(false);
        }}
      />
      <DeclineModal
        approvalLevel={data?.data?.approvalNeeded?.approvalTitle}
        approvalId={data?.data?.approvalNeeded?.approvalLevel}
        isOpen={isDeclineOpen}
        onClose={() => {
          setDeclineOpen(false);
        }}
      />
      <ApprovalModal
        approvalLevel={data?.data?.approvalNeeded?.approvalTitle}
        approvalId={data?.data?.approvalNeeded?.approvalLevel}
        isOpen={isApprovalOpen}
        onClose={() => {
          setApprovalOpen(false);
        }}
      />
      <DeclineModal
        approvalLevel={data?.data?.approvalNeeded?.approvalTitle}
        approvalId={data?.data?.approvalNeeded?.approvalLevel}
        isOpen={isDeclineOpen}
        onClose={() => {
          setDeclineOpen(false);
        }}
      />

      <CenterModal isOpen={openUpdate} width={"25%"}>
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
