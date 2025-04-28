"use client";

import { format } from "date-fns";
import dynamic from "next/dynamic";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleFileExtention } from "../helpers/utils";
import CenterModal from "../modals/CenterModal";
import LoanRestructureApprovalModal from "../modals/loans/LoanRestructureApprovalModal";
import LoanRestructureDeclineModal from "../modals/loans/LoanRestructureDeclineModal";
import Button from "../shared/buttonComponent/Button";
import ReusableDataTable from "../shared/tables/ReusableDataTable";
// import ImageViewer from 'react-simple-image-viewer';

// import Viewer from "react-viewer";
const Viewer = dynamic(
  () => import("react-viewer"),
  { ssr: false } // This line is important
);

const LoanRestructureTab = ({ loanId }) => {
  const [url, setUrl] = useState("");
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [openFileModal, setOpenFileModal] = useState(false);
  const [fieldType, setFieldType] = useState("");
  const [approveOpen, setApproveOpen] = useState(false);
  const [declineOpen, setDeclineOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  const handleApproveClick = (requestId) => {
    setSelectedRequestId(requestId);
    console.log(selectedRequestId);
    setApproveOpen(true);
  };

  const handleCloseApprovalModal = () => {
    setApproveOpen(false);
    setSelectedRequestId(null);
  };

  const handleDeclineClick = (requestId) => {
    setSelectedRequestId(requestId);
    console.log(selectedRequestId);
    setDeclineOpen(true);
  };

  const handleCloseDeclineModal = () => {
    setDeclineOpen(false);
    setSelectedRequestId(null);
  };

  const handleSetUrl = (content) => {
    setUrl(content);
  };

  const repaymentTypeData = {
    bulletRepayment: "Bullet Repayment",
    interestServicing: "Interest Servicing",
    installmentPayment: "Installment Payment",
  };

  const headers = [
    { id: "dateRequested", label: "Date Requested" },
    { id: "loanDuration", label: "Loan Duration" },
    { id: "interestRate", label: "Interest Rate" },
    { id: "repaymentType", label: "Repayment Type" },
    { id: "loanFrequencyType", label: "Loan Frequency Type" },
    { id: "loanAmount", label: "Loan Amount" },
    { id: "status", label: "Status" },
    { id: "action", label: "Action" },
  ];

  const customDataTransformer = (apiData) => {
    return apiData?.map((item) => ({
      id: item._id,
      dateRequested: (
        <div>
          <div className="text-md font-light text-gray-700 ">
            {item?.createdAt && format(new Date(item?.createdAt), "PPP")}
          </div>
        </div>
      ),
      loanDuration: (
        <div>
          <div className="text-md font-medium text-gray-700 flex">
            {item?.oldTerms?.loanDuration} month(s)
            {" > "}
            {item?.newTerms?.loanDuration} month(s)
          </div>
        </div>
      ),
      interestRate: (
        <div>
          <div className="text-md font-medium text-gray-700 flex">
            {item?.oldTerms?.interestRate}%{" > "}
            {item?.newTerms?.interestRate}%
          </div>
        </div>
      ),

      repaymentType: (
        <div>
          <div className="text-md font-medium text-gray-700 gap">
            {repaymentTypeData[item?.oldTerms?.repaymentType]}
            {" > "}
            {repaymentTypeData[item?.newTerms?.repaymentType]}
          </div>
        </div>
      ),
      loanFrequencyType: (
        <div>
          <div className="text-md font-medium text-gray-700 flex">
            {item?.oldTerms?.loanFrequencyType}
            {" > "}
            {item?.newTerms?.loanFrequencyType}
          </div>
        </div>
      ),
      loanAmount: (
        <div>
          <div className="text-md font-medium text-gray-700 flex">
            ₦{item?.oldTerms?.loanAmount}
            {" > "}₦{item?.newTerms?.loanAmount}
          </div>
        </div>
      ),
      status: (
        <button
          className={`cursor-none ${
            item?.status === "Approved"
              ? "bg-[#E8F7F0] text-[#107E4B]  text-xs font-normal px-2 py-1 rounded-full"
              : item?.status === "Pending"
              ? "bg-swLightGray text-swGray text-xs font-normal px-2 py-1 rounded-full"
              : item?.status === "Approval Requested"
              ? "bg-red-400 text-white text-xs font-normal px-2 py-1 rounded-full"
              : item?.status === "Declined"
              ? "bg-red-500 text-white text-xs font-normal px-2 py-1 rounded-full"
              : "bg-gray-300 text-gray-800 text-xs font-normal px-2 py-1 rounded-full"
          } px-2 py-1 rounded`}
        >
          {item?.status}
        </button>
      ),
      action: (
        <div>
          {item?.status === "Pending" && (
            <div className="flex gap-2 items-center">
              <Button
                variant="success"
                onClick={() => handleApproveClick(item?._id)}
                className="bg-[#E8F7F0] text-[#107E4B]  text-xs font-normal px-2 py-1 rounded-full"
              >
                Approve
              </Button>
              <Button
                variant="danger"
                onClick={() => handleDeclineClick(item?._id)}
                className="bg-red-500 text-white text-xs font-normal px-2 py-1 rounded-full"
              >
                Decline
              </Button>
            </div>
          )}
        </div>
      ),
    }));
  };

  return (
    <div className="w-full">
      <ToastContainer />

      <ReusableDataTable
        dataTransformer={customDataTransformer}
        headers={headers}
        initialData={[]}
        apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/loan-restructure/${loanId}/requests`}
        // filters={true}
        // pagination={true}
      />

      <div>
        {handleFileExtention(url) === "pdf" ? (
          <div
            className={`h-full w-full fixed top-0 left-0 bg-black bg-opacity-25 z-[500] ${
              openFileModal ? "flex" : "hidden"
            } justify-center items-center text-white z-[110]`}
          >
            <div className="max-w-3xl w-full h-[70%] m-5 p-5 bg-white">
              <div className="flex justify-end">
                <IoMdClose
                  size={20}
                  className="cursor-pointer text-swBlack"
                  onClick={() => setOpenFileModal(false)}
                />
              </div>
              <iframe src={url} className="h-full w-full"></iframe>
            </div>
          </div>
        ) : (
          <>
            {openFileModal && (
              <>
                <Viewer
                  visible={openFileModal}
                  onClose={() => {
                    setOpenFileModal(false);
                  }}
                  images={[url].map((item) => ({
                    src: item,
                    key: item,
                  }))}
                />
              </>
            )}
          </>
        )}
      </div>
      <CenterModal isOpen={approveOpen && !!selectedRequestId}>
        <LoanRestructureApprovalModal
          width={"100%"}
          isOpen={approveOpen && !!selectedRequestId}
          closeModal={handleCloseApprovalModal}
          onClose={handleCloseApprovalModal}
          requestId={selectedRequestId}
        />{" "}
      </CenterModal>
      <CenterModal isOpen={declineOpen && !!selectedRequestId}>
        <LoanRestructureDeclineModal
          width={"100%"}
          isOpen={declineOpen && !!selectedRequestId}
          closeModal={handleCloseDeclineModal}
          onClose={handleCloseDeclineModal}
          requestId={selectedRequestId}
        />{" "}
      </CenterModal>
    </div>
  );
};

export default LoanRestructureTab;
