"use client";
import { useEffect } from "react";
import LoanProcessCard from "@/app/components/cards/loanProcessCard/LoanProcessCard";
import CustomerActivityLogs from "@/app/components/customers/CustomerActivityLogs";
import ActivityLogs from "@/app/components/customers/CustomerActivityLogs";
import Summary from "@/app/components/customers/CustomerSummary";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import EditableButton from "@/app/components/shared/editableButtonComponent/EditableButton";
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
import { getLoanApprovals } from "@/redux/slices/loanApprovalSlice";
import {
  MdEdit,
  MdEditDocument,
  MdOutlineEditAttributes,
  MdUpdate,
} from "react-icons/md";
import CenterModal from "@/app/components/modals/CenterModal";
import Button from "@/app/components/shared/buttonComponent/Button";

const ViewLoan = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector(
    (state) => state.loanApplication
  );
  const _loanApprovals = useSelector(
    (state) => state.loanApprovals
  );
  const [activityButton, setActivityButton] = useState("activity-logs");
  const [logSearch, setLogSearch] = useState(false);
  const [isRequestApprovalOpen, setIsRequestApprovalOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [loanAmount, setLoanAmount] = useState(0);

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
    setOpenUpdate(false)
  }

  const loanApprovals = [
    {
      id: 1,
      approval_type: "Loan Officer",
      approval_status: "Approved",
      action: "initiate Approval",
    },
    {
      id: 2,
      approval_type: "Credit Admin Officer",
      approval_status: "Declined",
      action: "Initiate Approval",
    },
    {
      id: 3,
      approval_type: "Internal Control",
      approval_status: "Pending",
      action: "Initiate Approval",
    },
    {
      id: 4,
      approval_type: "CFO",
      approval_status: "Pending",
      action: "Initiate Approval",
    },
    {
      id: 5,
      approval_type: "CEO",
      approval_status: "Pending",
      action: "Initiate Approval",
    },
    {
      id: 6,
      approval_type: "CFO",
      approval_status: "Pending",
      action: "Initiate Approval",
    },
  ];

  useEffect(() => {
    dispatch(getSingleLoan(id));
    dispatch(getLoanApprovals(id));
    console.log({_loanApprovals});
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
                    <EditableButton
                      className={
                        "text-white text-sm bg-swBlue px-5 py-2 ml-3 rounded-lg font-medium"
                      }
                    >
                      View profile
                    </EditableButton>
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
                        <p>₦ {data?.data?.interestCalculation?.totalPayments}</p>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div>
                        <p>
                          {data?.data?.loanApplication?.loanDurationMetrics ===
                          "Yearly"
                            ? `${data?.data?.loanApplication?.loanDuration}` * 12
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
                      <EditableButton
                        className={`${"font-semibold text-swBlue bg-blue-50"} p-1 text-xs rounded-full border cursor-pointer`}
                      >
                        {data?.data?.loanApplication?.status}
                      </EditableButton>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="ml-5 mr-5 mt-5">
            <h6 className="text-center font-semibold p-2">Loan Approvals</h6>
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
                      <h1>Approval Status</h1>
                    </th>
                    <th className="px-3 py-3 bg-swLightGray text-swGray text-xs border-0 text-start">
                      <h1>Action</h1>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {console.log(loanApprovals)}
                  {loanApprovals.map((item, index) => (
                    <tr key={index} className="text-xs">
                      <td className="p-2">{item.id}</td>
                      <td className="p-2">{item.approval_type}</td>
                      <td>
                        <div
                          className={`${
                            item.approval_status === "Approved"
                              ? "bg-green-100"
                              : item.approval_status === "Pending"
                              ? "bg-yellow-100"
                              : "bg-red-100"
                          } border py-1 px-2 w-fit rounded-xl`}
                        >
                          {item.approval_status}
                        </div>
                      </td>
                      <td className="p-2">
                        <EditableButton
                          onClick={() => {
                            setIsRequestApprovalOpen(true);
                          }}
                          disabled={false}
                          className={`py-1 px-2 border rounded-lg`}
                        >
                          {item.action}
                        </EditableButton>
                      </td>
                    </tr>
                  ))}
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
              {/* <div className="p-3 flex justify-between items-center"></div> */}
              <div className="flex items-center justify-between overflow-x-hidden border-b border-gray-300 py-2 px-4 flex-wrap">
                <div className="flex gap-2 text-xs lg:text-sm">
                  <EditableButton
                    onClick={() => handleActivityToggle("activity-logs")}
                    className={`${
                      activityButton === "activity-logs" &&
                      "font-semibold text-swBlue bg-blue-50"
                    } p-2 rounded-md whitespace-nowrap`}
                  >
                    Activity logs
                  </EditableButton>
                  <EditableButton
                    onClick={() => handleActivityToggle("summary")}
                    className={`${
                      activityButton === "summary" &&
                      "font-semibold text-swBlue bg-blue-50"
                    } p-2 rounded-md cursor-pointer`}
                  >
                    Summary
                  </EditableButton>
                  <EditableButton
                    onClick={() => handleActivityToggle("loans")}
                    className={`${
                      activityButton === "loans" &&
                      "font-semibold text-swBlue bg-blue-50"
                    } p-2 rounded-md cursor-pointer`}
                  >
                    Loan Docs
                  </EditableButton>
                  <EditableButton
                    onClick={() => handleActivityToggle("disbursement")}
                    className={`${
                      activityButton === "disbursement" &&
                      "font-semibold text-swBlue bg-blue-50"
                    } p-2 rounded-md cursor-pointer`}
                  >
                    Disbursment
                  </EditableButton>
                  <EditableButton
                    onClick={() => handleActivityToggle("repayment")}
                    className={`${
                      activityButton === "repayment" &&
                      "font-semibold text-swBlue bg-blue-50"
                    } p-2 rounded-md cursor-pointer`}
                  >
                    Repayments
                  </EditableButton>
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
            <LoanProcessCard />
          </div>
        </section>
      </main>
      <RequestApproval
        isOpen={isRequestApprovalOpen}
        onClose={() => {
          setIsRequestApprovalOpen(false);
        }}
      />

      <CenterModal  isOpen={openUpdate} width={'25%'}>
        <InputField
          label={"Enter new loan amount"}
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
        />
        <Button disabled={loanAmount == data?.data?.loanApplication?.loanAmount ? true : false} onClick={updateLoan} className="h-10 w-full mt-6 bg-swBlue text-white rounded-md">
          Update Amount
        </Button>
      </CenterModal>
    </DashboardLayout>
  );
};

export default ViewLoan;
