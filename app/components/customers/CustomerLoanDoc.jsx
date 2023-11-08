"use client";
import { useState } from "react";
import CenterModal from "../modals/CenterModal";
import Button from "../shared/buttonComponent/Button";
import EditableButton from "../shared/editableButtonComponent/EditableButton";
import PreviewLoanDocs from "./PreviewLoanDocs";

const CustomerLoanDoc = (data) => {
  const [url, setUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);

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
          <EditableButton
            onClick={() =>{handleSetUrl(data?.data?.loanApplication?.applicationForm)}}
            className="text-sm text-swGray underline"
            children={"View Docs"}
          />
        </div>
      </div>
      <div className="flex justify-between pl-4">
        <div className="pt-4 font-semibold text-xs text-swGray">
          Loan Affidavit
        </div>
        {/* {data?.data?.loanApplication?.applicationForm} */}
        <div>
          <EditableButton
          onClick={() =>{handleSetUrl(data?.data?.loanApplication?.loanAffidavit)}}
            className="text-sm text-swGray underline"
            children={"View Docs"}
          />
        </div>
      </div>
      <div className="flex justify-between pl-4">
        <div className="pt-4 font-semibold text-xs text-swGray">
          Guarantor's Form
        </div>
        {/* {data?.data?.loanApplication?.applicationForm} */}
        <div>
          <EditableButton
           onClick={() =>{handleSetUrl(data?.data?.loanApplication?.guarantorForm)}}
            className="text-sm text-swGray underline"
            children={"View Docs"}
          />
        </div>
      </div>
      <div className="flex justify-between pl-4">
        <div className="pt-4 font-semibold text-xs text-swGray">
          Collateral Form
        </div>
        {/* {data?.data?.loanApplication?.applicationForm} */}
        <div>
          <EditableButton
            onClick={() =>{handleSetUrl(data?.data?.loanApplication?.collaterals)}}
            className="text-sm text-swGray underline"
            children={"View Docs"}
          />
        </div>
      </div>
      <CenterModal width={"70%"} isOpen={isOpen} onClose={() => {
        setIsOpen(!isOpen)
      }}>
      <div className="overflow-y-scroll">
      <button  onClick={() => {
        setIsOpen(!isOpen)
      }}>X</button>
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
    </main>
  );
};

export default CustomerLoanDoc;
