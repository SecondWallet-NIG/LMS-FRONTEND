"use client";

import React, { useState } from "react";
import ReusableDataTable from "../shared/tables/ReusableDataTable";
import { ToastContainer } from "react-toastify";
import { format } from "date-fns";
import "react-toastify/dist/ReactToastify.css";
import { handleFileExtention } from "../helpers/utils";
import CenterModal from "../modals/CenterModal";
import LoanDocsUpload from "../modals/loans/LoanDocsUpload";
import { IoMdClose } from "react-icons/io";
import dynamic from "next/dynamic";
// import ImageViewer from 'react-simple-image-viewer';

// import Viewer from "react-viewer";
const Viewer = dynamic(
  () => import("react-viewer"),
  { ssr: false } // This line is important
);

const CustomerLoanTransactions = ({ loanId }) => {
  const [url, setUrl] = useState("");
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [openFileModal, setOpenFileModal] = useState(false);
  const [fieldType, setFieldType] = useState("");

  const handleSetUrl = (content) => {
    setUrl(content);
    console.log(content);
  };
  console.log({ openFileModal });

  const headers = [
    { id: "transactionDate", label: "Transaction Date" },
    { id: "amount", label: "Amount" },
    { id: "prevBalance", label: "Previous Balance" },
    { id: "currBalance", label: "Current Balance" },
    { id: "transactionStatement", label: "Transaction Statement" },
    { id: "transactionReceipt", label: "Transaction Receipt" },
  ];

  const customDataTransformer = (apiData) => {
    console.log("trans", apiData);
    return apiData?.loanApplicationTransactions?.map((item) => ({
      id: item._id,
      transactionDate: (
        <div>
          <div className="text-md font-light text-gray-700">
            {item?.createdAt && format(new Date(item?.createdAt), "PPP")}
          </div>
        </div>
      ),
      amount: (
        <div>
          <div className="text-md font-light text-gray-700">
            ₦ {item?.amount?.toLocaleString()}
          </div>
        </div>
      ),
      prevBalance: (
        <div>
          <div className="text-md font-light text-gray-700">
            ₦ {item?.previousBalance?.toLocaleString()}
          </div>
        </div>
      ),

      currBalance: (
        <div>
          <div className="text-md font-light text-gray-700">
            ₦ {item?.currentBalance?.toLocaleString()}
          </div>
        </div>
      ),
      transactionStatement: (
        <div>
          <div className="text-md font-light text-gray-700">
            {item?.transactionStatment}
          </div>
        </div>
      ),
      transactionReceipt: (
        <div className="z-30">
          {item?.transactionReceipt !== null ? (
            <div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSetUrl(item?.transactionReceipt);
                  setOpenFileModal(true);
                }}
                className="text-md font-light text-gray-700 hover:text-swBlue"
              >
                View Receipt
              </button>
            </div>
          ) : (
            <div className="text-md font-light text-gray-700">No Receipt</div>
          )}
        </div>
      ),
    }));
  };

  return (
    <div className="w-full">
      <ToastContainer />
      <ReusableDataTable
        // onClickRow={"/payment-history/payment/"}
        dataTransformer={customDataTransformer}
        headers={headers}
        initialData={[]}
        apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/loan-application/${loanId}/transactions`}
        filters={true}
        pagination={true}
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
    </div>
  );
};

export default CustomerLoanTransactions;