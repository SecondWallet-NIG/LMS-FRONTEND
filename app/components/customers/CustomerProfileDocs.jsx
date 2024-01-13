"use client";
import { useState } from "react";
import CenterModal from "../modals/CenterModal";
import UploadLoanDocs from "../modals/loans/UploadLoanDocs";
import PreviewLoanDocs from "./PreviewLoanDocs";

const CustomerProfileDocs = (data) => {

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
     
      <div className="flex justify-between pl-4">
        <div className="pt-4 font-semibold text-xs text-swGray">
        Utility bill
        </div>
        {/* {data?.data?.identityVerification?.applicationForm} */}
        <div>
          {data?.data?.identityVerification?.utilityBill != null ? (
            <button
              onClick={() => {
                handleSetUrl(data?.data?.identityVerification?.utilityBill);
              }}
              className="text-sm text-swGray underline mt-4"
            >
              View Docs
            </button>
          ) : (
            <button
              onClick={() => {
                setFieldType("utilityBill");
                setUploadModalOpen(!uploadModalOpen);
              }}
              className="text-sm text-swBlue underline mt-4"
            >
              Upload File
            </button>
          )}
        </div>
      </div>
      <div className="flex justify-between pl-4">
        <div className="pt-4 font-semibold text-xs text-swGray">
        Statement of Account
        </div>
        {/* {data?.data?.identityVerification?.applicationForm} */}
        <div>
          {data?.data?.identityVerification?.statementOfAccount != null ? (
            <button
              onClick={() => {
                handleSetUrl(data?.data?.identityVerification?.statementOfAccount);
              }}
              className="text-sm text-swGray underline mt-4"
            >
              View Docs
            </button>
          ) : (
            <button
              onClick={() => {
                setFieldType("statementOfAccount");
                setUploadModalOpen(!uploadModalOpen);
              }}
              className="text-sm text-swBlue underline mt-4"
            >
              Upload File
            </button>
          )}
        </div>
      </div>
      <div className="flex justify-between pl-4">
        <div className="pt-4 font-semibold text-xs text-swGray">
        ID card
        </div>
        <div>
          {data?.data?.identityVerification?.idCard != null ? (
            <button
              onClick={() => {
                handleSetUrl(data?.data?.identityVerification?.idCard);
              }}
              className="text-sm text-swGray underline mt-4"
            >
              View Docs
            </button>
          ) : (
            <button
              onClick={() => {
                setFieldType("idCard");
                setUploadModalOpen(!uploadModalOpen);
              }}
              className="text-sm text-swBlue underline mt-4"
            >
              Upload File
            </button>
          )}
        </div>
      </div>
      <div className="flex justify-between pl-4">
        <div className="pt-4 font-semibold text-xs text-swGray">
        KYC
        </div>
        <div>
          {data?.data?.identityVerification?.kyc != null ? (
            <button
              onClick={() => {
                handleSetUrl(data?.data?.identityVerification?.kyc);
              }}
              className="text-sm text-swGray underline mt-4"
            >
              View Docs
            </button>
          ) : (
            <button
              onClick={() => {
                setFieldType("kyc");
                setUploadModalOpen(!uploadModalOpen);
              }}
              className="text-sm text-swBlue underline mt-4"
            >
              Upload File
            </button>
          )}
        </div>
      </div>
      <div className="flex justify-between pl-4">
        <div className="pt-4 font-semibold text-xs text-swGray">
        Power of Attorney
        </div>
        <div>
          {data?.data?.identityVerification?.powerOfAttorney != null ? (
            <button
              onClick={() => {
                handleSetUrl(data?.data?.identityVerification?.powerOfAttorney);
              }}
              className="text-sm text-swGray underline mt-4"
            >
              View Docs
            </button>
          ) : (
            <button
              onClick={() => {
                setFieldType("powerOfAttorney");
                setUploadModalOpen(!uploadModalOpen);
              }}
              className="text-sm text-swBlue underline mt-4"
            >
              Upload File
            </button>
          )}
        </div>
      </div>
      <div className="flex justify-between pl-4">
        <div className="pt-4 font-semibold text-xs text-swGray">
        Transfer of Ownership
        </div>
        <div>
          {data?.data?.identityVerification?.transferOfOwnership != null ? (
            <button
              onClick={() => {
                handleSetUrl(data?.data?.identityVerification?.transferOfOwnership);
              }}
              className="text-sm text-swGray underline mt-4"
            >
              View Docs
            </button>
          ) : (
            <button
              onClick={() => {
                setFieldType("transferOfOwnership");
                setUploadModalOpen(!uploadModalOpen);
              }}
              className="text-sm text-swBlue underline mt-4"
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

export default CustomerProfileDocs;
