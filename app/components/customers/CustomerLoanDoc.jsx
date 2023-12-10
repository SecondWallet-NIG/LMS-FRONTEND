"use client";
import { useState } from "react";
import CenterModal from "../modals/CenterModal";
import UploadLoanDocs from "../modals/loans/UploadLoanDocs";
import PreviewLoanDocs from "./PreviewLoanDocs";

const CustomerLoanDoc = (data) => {
  const [url, setUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [fieldType, setFieldType] = useState("");

  const handleSetUrl = (content) => {
    setUrl(content);
    setIsOpen(true);
  };
  return (
    <main>
      <div className="pt-4 font-semibold text-md text-swBlue pl-4">
        Loan Documents
      </div>
      <div className="flex justify-between pl-4">
        <div className="pt-4 font-semibold text-xs text-swGray">
          Loan Application form
        </div>
        {/* {data?.data?.loanApplication?.applicationForm} */}
        <div>
          {data?.data?.loanApplication?.applicationForm != null ? (
            <button
              onClick={() => {
                handleSetUrl(data?.data?.loanApplication?.applicationForm);
              }}
              className="text-sm text-swGray underline"
            >
              View Docs
            </button>
          ) : (
            <button
              onClick={() => {
                setFieldType("applicationForm");
                setUploadModalOpen(!uploadModalOpen);
              }}
              className="text-sm text-swBlue underline"
            >
              Upload File
            </button>
          )}
        </div>
      </div>
      <div className="flex justify-between pl-4">
        <div className="pt-4 font-semibold text-xs text-swGray">
          Loan Affidavit
        </div>
        {/* {data?.data?.loanApplication?.applicationForm} */}
        <div>
          {data?.data?.loanApplication?.loanAffidavit != null ? (
            <button
              onClick={() => {
                handleSetUrl(data?.data?.loanApplication?.loanAffidavit);
              }}
              className="text-sm text-swGray underline"
            >
              View Docs
            </button>
          ) : (
            <button
              onClick={() => {
                setFieldType("loanAffidavit");
                setUploadModalOpen(!uploadModalOpen);
              }}
              className="text-sm text-swBlue underline"
            >
              Upload File
            </button>
          )}
        </div>
      </div>
      <div className="flex justify-between pl-4">
        <div className="pt-4 font-semibold text-xs text-swGray">
          Guarantor&apos;s Form
        </div>
        <div>
          {data?.data?.loanApplication?.guarantorForm != null ? (
            <button
              onClick={() => {
                handleSetUrl(data?.data?.loanApplication?.guarantorForm);
              }}
              className="text-sm text-swGray underline"
            >
              View Docs
            </button>
          ) : (
            <button
              onClick={() => {
                setFieldType("guarantorForm");
                setUploadModalOpen(!uploadModalOpen);
              }}
              className="text-sm text-swBlue underline"
            >
              Upload File
            </button>
          )}
        </div>
      </div>
      <div className="flex justify-between pl-4">
        <div className="pt-4 font-semibold text-xs text-swGray">
          Collateral Form
        </div>
        <div>
          {data?.data?.loanApplication?.collaterals.length != 0 ? (
            <button
              onClick={() => {
                handleSetUrl(data?.data?.loanApplication?.collaterals);
              }}
              className="text-sm text-swGray underline"
            >
              View Docs
            </button>
          ) : (
            <button
              onClick={() => {
                setFieldType("collaterals");
                setUploadModalOpen(!uploadModalOpen);
              }}
              className="text-sm text-swBlue underline"
            >
              Upload File
            </button>
          )}
        </div>
      </div>
      <CenterModal
        width={"70%"}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(!isOpen);
        }}
      >
        <div className="overflow-y-scroll">
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            X
          </button>
          <div>
            {url ? (
              <iframe
                src={url}
                height="600"
                width="600"
                title="Iframe Example"
              ></iframe>
            ) : null}
          </div>
        </div>
      </CenterModal>
      <CenterModal
        width={"35%"}
        isOpen={uploadModalOpen}
        onClose={() => {
          setUploadModalOpen(!uploadModalOpen);
        }}
      >
        <UploadLoanDocs
          isOpen={uploadModalOpen}
          onClose={() => {
            setUploadModalOpen(!uploadModalOpen);
          }}
          fieldType={fieldType}
        />
      </CenterModal>
    </main>
  );
};

export default CustomerLoanDoc;
