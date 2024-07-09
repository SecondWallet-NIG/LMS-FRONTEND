"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "next/navigation";
import Button from "../../shared/buttonComponent/Button";
import { AiOutlineDelete, AiOutlinePaperClip } from "react-icons/ai";
import { approveLoanRequest } from "@/redux/slices/loanApprovalSlice";
import {
  getSingleLoan,
  updateLoanApplication,
} from "@/redux/slices/loanApplicationSlice";

const LoanDocsUpload = ({ onClose, fieldType, customerId }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [fileError, setFileError] = useState("");

  const [formData, setFormData] = useState({
    applicationForm: null || "null",
    collaterals: "",
    guarantorForm: null,
    loanAffidavit: null,
    powerOfAttorney: null,
    proofOfOwnership: null,
    statementOfAccounts: null,
    customerId: customerId,
  });
  const handleFileChange = (e) => {
    setFileError("");
    let { name, files } = e.target;
    const file = files[0];
    const fileExtension = file.name.split(".").pop().toLowerCase();

    const allowedExtensions = ["jpg", "jpeg", "png", "pdf"];
    if (!allowedExtensions.includes(fileExtension)) {
      // alert(
      //   "Invalid file type. Please select an image (.jpg, .jpeg, .png) or PDF (.pdf)."
      // );
      setFileError(
        "Invalid file type. Please select an image (.jpg, .jpeg, .png) or PDF (.pdf)."
      );
      return;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files[0],
    }));
  };

  const uploadLoanDoc = (e) => {
    let userId;

    setLoading(true);
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      userId = storedUser?.data?.user?._id;
    }
    e.preventDefault();

    const payload = new FormData();
    fieldType === "applicationForm" &&
      payload.append("applicationForm", formData.applicationForm);
    fieldType == "loanAffidavit" &&
      payload.append("loanAffidavit", formData.loanAffidavit);
    fieldType == "guarantorForm" &&
      payload.append("guarantorForm", formData.guarantorForm);
    fieldType == "collaterals" &&
      payload.append("collaterals", formData.collaterals);
    fieldType == "powerOfAttorney" &&
      payload.append("powerOfAttorney", formData.collaterals);
    fieldType == "proofOfOwnership" &&
      payload.append("proofOfOwnership", formData.collaterals);
    fieldType == "statementOfAccounts" &&
      payload.append("statementOfAccounts", formData.collaterals);

    dispatch(updateLoanApplication({ loanId: id, payload }))
      .unwrap()
      .then(() => {
        toast("Document uploaded");
        setLoading(false);
        dispatch(getSingleLoan(id));
        onClose(false);
      })
      .catch((error) => {
        toast.error(`${error?.message}`);
        setLoading(false);
        dispatch(getSingleLoan(id));
        onClose(false);
      });
  };

  const deleteFile = (name) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: null,
    }));
  };
  return (
    <main>
      <ToastContainer />
      <form
        //  style={modalStyles}
        className="w-full"
        id="add-user-form"
      >
        <div className="border bg-white border-swLightGray rounded-lg">
          <div className="p-4">
            {fieldType == "applicationForm" ? (
              <div className="flex flex-col gap-2 mt-5">
                <p className="font-semibold">Upload Loan Application form</p>
                {fileError && (
                  <p className="text-red-500 text-sm">{fileError}</p>
                )}

                <div className="relative">
                  <input
                    name="applicationForm"
                    type="file"
                    id="fileInput1"
                    className="absolute w-0 h-0 opacity-0"
                    onChange={handleFileChange}
                    onClick={(e) => (e.target.value = null)}
                  />
                  <label
                    htmlFor="fileInput1"
                    className="px-4 py-2 text-white rounded-md cursor-pointer"
                  >
                    <span className="py-2 px-6 rounded-md flex gap-2 border w-full justify-center">
                      <AiOutlinePaperClip color="black" size={20} />
                      <p className="font-semibold text-black">
                        {" "}
                        {formData?.applicationForm?.name
                          ? "Change file"
                          : "Select file"}
                      </p>
                    </span>
                  </label>
                  {formData?.applicationForm?.name ? (
                    <div
                      id="fileLabel1"
                      className="bg-swLightGray p-2 flex justify-between"
                    >
                      <div className="text-xs">
                        {formData?.applicationForm?.name}
                      </div>
                      <div
                        onClick={() => {
                          deleteFile("applicationForm");
                        }}
                      >
                        <AiOutlineDelete color="red" size={20} />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
            {fieldType == "loanAffidavit" ? (
              <div className="flex flex-col gap-2 mt-5">
                <p className="font-semibold">Upload Loan Affidavit</p>
                {fileError && (
                  <p className="text-red-500 text-sm">{fileError}</p>
                )}
                <div className="relative">
                  <input
                    name="loanAffidavit"
                    type="file"
                    id="fileInput1"
                    className="absolute w-0 h-0 opacity-0"
                    onChange={handleFileChange}
                    onClick={(e) => (e.target.value = null)}
                  />
                  <label
                    htmlFor="fileInput1"
                    className="px-4 py-2 text-white rounded-md cursor-pointer"
                  >
                    <span className="py-2 px-6 rounded-md flex gap-2 border w-full justify-center">
                      <AiOutlinePaperClip color="black" size={20} />
                      <p className="font-semibold text-black">
                        {" "}
                        {formData?.loanAffidavit?.name
                          ? "Change file"
                          : "Select file"}
                      </p>
                    </span>
                  </label>
                  {formData?.loanAffidavit?.name ? (
                    <div
                      id="fileLabel1"
                      className="bg-swLightGray p-2 flex justify-between"
                    >
                      <div className="text-xs">
                        {formData?.loanAffidavit?.name}
                      </div>
                      <div
                        onClick={() => {
                          deleteFile("loanAffidavit");
                        }}
                      >
                        <AiOutlineDelete color="red" size={20} />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
            {fieldType == "guarantorForm" ? (
              <div className="flex flex-col gap-2 mt-5">
                <p className="font-semibold">Upload Guarantor&apos;s Form</p>
                {fileError && (
                  <p className="text-red-500 text-sm">{fileError}</p>
                )}
                <div className="relative">
                  <input
                    name="guarantorForm"
                    type="file"
                    id="fileInput1"
                    className="absolute w-0 h-0 opacity-0"
                    onChange={handleFileChange}
                    onClick={(e) => (e.target.value = null)}
                  />
                  <label
                    htmlFor="fileInput1"
                    className="px-4 py-2 text-white rounded-md cursor-pointer"
                  >
                    <span className="py-2 px-6 rounded-md flex gap-2 border w-full justify-center">
                      <AiOutlinePaperClip color="black" size={20} />
                      <p className="font-semibold text-black">
                        {" "}
                        {formData?.guarantorForm?.name
                          ? "Change file"
                          : "Select file"}
                      </p>
                    </span>
                  </label>
                  {formData?.guarantorForm?.name ? (
                    <div
                      id="fileLabel1"
                      className="bg-swLightGray p-2 flex justify-between"
                    >
                      <div className="text-xs">
                        {formData?.guarantorForm?.name}
                      </div>
                      <div
                        onClick={() => {
                          deleteFile("guarantorForm");
                        }}
                      >
                        <AiOutlineDelete color="red" size={20} />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
            {fieldType == "collaterals" ? (
              <div className="flex flex-col gap-2 mt-5">
                <p className="font-semibold">Upload Collateral Form</p>
                {fileError && (
                  <p className="text-red-500 text-sm">{fileError}</p>
                )}
                <div className="relative">
                  <input
                    name="collaterals"
                    type="file"
                    id="fileInput1"
                    className="absolute w-0 h-0 opacity-0"
                    onChange={handleFileChange}
                    onClick={(e) => (e.target.value = null)}
                  />
                  <label
                    htmlFor="fileInput1"
                    className="px-4 py-2 text-white rounded-md cursor-pointer"
                  >
                    <span className="py-2 px-6 rounded-md flex gap-2 border w-full justify-center">
                      <AiOutlinePaperClip color="black" size={20} />
                      <p className="font-semibold text-black">
                        {" "}
                        {formData?.collaterals?.name
                          ? "Change file"
                          : "Select file"}
                      </p>
                    </span>
                  </label>
                  {formData?.collaterals?.name ? (
                    <div
                      id="fileLabel1"
                      className="bg-swLightGray p-2 flex justify-between"
                    >
                      <div className="text-xs">
                        {formData?.collaterals?.name}
                      </div>
                      <div
                        onClick={() => {
                          deleteFile("collaterals");
                        }}
                      >
                        <AiOutlineDelete color="red" size={20} />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
            {fieldType == "powerOfAttorney" ? (
              <div className="flex flex-col gap-2 mt-5">
                <p className="font-semibold">Upload Power of Attorney</p>
                {fileError && (
                  <p className="text-red-500 text-sm">{fileError}</p>
                )}
                <div className="relative">
                  <input
                    name="powerOfAttorney"
                    type="file"
                    id="fileInput1"
                    className="absolute w-0 h-0 opacity-0"
                    onChange={handleFileChange}
                    onClick={(e) => (e.target.value = null)}
                  />
                  <label
                    htmlFor="fileInput1"
                    className="px-4 py-2 text-white rounded-md cursor-pointer"
                  >
                    <span className="py-2 px-6 rounded-md flex gap-2 border w-full justify-center">
                      <AiOutlinePaperClip color="black" size={20} />
                      <p className="font-semibold text-black">
                        {" "}
                        {formData?.powerOfAttorney?.name
                          ? "Change file"
                          : "Select file"}
                      </p>
                    </span>
                  </label>
                  {formData?.powerOfAttorney?.name ? (
                    <div
                      id="fileLabel1"
                      className="bg-swLightGray p-2 flex justify-between"
                    >
                      <div className="text-xs">
                        {formData?.powerOfAttorney?.name}
                      </div>
                      <div
                        onClick={() => {
                          deleteFile("powerOfAttorney");
                        }}
                      >
                        <AiOutlineDelete color="red" size={20} />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
            {fieldType == "proofOfOwnership" ? (
              <div className="flex flex-col gap-2 mt-5">
                <p className="font-semibold">Upload Proof of Ownership</p>
                {fileError && (
                  <p className="text-red-500 text-sm">{fileError}</p>
                )}
                <div className="relative">
                  <input
                    name="proofOfOwnership"
                    type="file"
                    id="fileInput1"
                    className="absolute w-0 h-0 opacity-0"
                    onChange={handleFileChange}
                    onClick={(e) => (e.target.value = null)}
                  />
                  <label
                    htmlFor="fileInput1"
                    className="px-4 py-2 text-white rounded-md cursor-pointer"
                  >
                    <span className="py-2 px-6 rounded-md flex gap-2 border w-full justify-center">
                      <AiOutlinePaperClip color="black" size={20} />
                      <p className="font-semibold text-black">
                        {" "}
                        {formData?.proofOfOwnership?.name
                          ? "Change file"
                          : "Select file"}
                      </p>
                    </span>
                  </label>
                  {formData?.proofOfOwnership?.name ? (
                    <div
                      id="fileLabel1"
                      className="bg-swLightGray p-2 flex justify-between"
                    >
                      <div className="text-xs">
                        {formData?.proofOfOwnership?.name}
                      </div>
                      <div
                        onClick={() => {
                          deleteFile("proofOfOwnership");
                        }}
                      >
                        <AiOutlineDelete color="red" size={20} />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
            {fieldType == "statementOfAccounts" ? (
              <div className="flex flex-col gap-2 mt-5">
                <p className="font-semibold">Upload Statement of Account</p>
                {fileError && (
                  <p className="text-red-500 text-sm">{fileError}</p>
                )}
                <div className="relative">
                  <input
                    name="statementOfAccounts"
                    type="file"
                    id="fileInput1"
                    className="absolute w-0 h-0 opacity-0"
                    onChange={handleFileChange}
                    onClick={(e) => (e.target.value = null)}
                  />
                  <label
                    htmlFor="fileInput1"
                    className="px-4 py-2 text-white rounded-md cursor-pointer"
                  >
                    <span className="py-2 px-6 rounded-md flex gap-2 border w-full justify-center">
                      <AiOutlinePaperClip color="black" size={20} />
                      <p className="font-semibold text-black">
                        {" "}
                        {formData?.statementOfAccounts?.name
                          ? "Change file"
                          : "Select file"}
                      </p>
                    </span>
                  </label>
                  {formData?.statementOfAccounts?.name ? (
                    <div
                      id="fileLabel1"
                      className="bg-swLightGray p-2 flex justify-between"
                    >
                      <div className="text-xs">
                        {formData?.statementOfAccounts?.name}
                      </div>
                      <div
                        onClick={() => {
                          deleteFile("statementOfAccounts");
                        }}
                      >
                        <AiOutlineDelete color="red" size={20} />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
            <div className="flex justify-between gap-3">
              <Button
                variant="secondary"
                onClick={onClose}
                className="mt-4 block w-full rounded-lg"
              >
                Cancel
              </Button>
              <Button
                disabled={loading ? true : false}
                onClick={uploadLoanDoc}
                className="mt-4 block w-full rounded-lg"
              >
                Upload
              </Button>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
};

export default LoanDocsUpload;
