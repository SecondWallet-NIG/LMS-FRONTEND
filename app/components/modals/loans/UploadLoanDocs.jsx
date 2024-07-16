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
import {
  getCustomerById,
  updateEmployment,
  updateIdentityVerification,
} from "@/redux/slices/customerSlice";
import { useRouter } from "next/navigation";

const UploadLoanDocs = ({ onClose, fieldType, customerId }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [fileError, setFileError] = useState("");

  const [formData, setFormData] = useState({
    utilityBill: null || "null",
    powerOfAttorney: "",
    kyc: null,
    idCard: null,
    //  customerId: customerId,
  });
  const handleFileChange = (e) => {
    setFileError("");
    let { name, files } = e.target;
    const file = files[0];
    const fileExtension = file.name.split(".").pop().toLowerCase();

    const allowedExtensions = ["jpg", "jpeg", "png", "pdf"];
    if (!allowedExtensions.includes(fileExtension)) {
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

    fieldType === "utilityBill" &&
      payload.append("utilityBill", formData.utilityBill);
    fieldType == "idCard" && payload.append("idCard", formData.idCard);
    fieldType == "kyc" && payload.append("kyc", formData.kyc);
    fieldType == "powerOfAttorney" &&
      payload.append("powerOfAttorney", formData.powerOfAttorney);
    fieldType == "transferOfOwnership" &&
      payload.append("transferOfOwnership", formData.transferOfOwnership);
    fieldType == "statementOfAccount" &&
      payload.append("statementOfAccount", formData.statementOfAccount);

    dispatch(updateIdentityVerification({ id: customerId, payload }))
      .unwrap()
      .then(() => {
        toast.success("Document uploaded");
        dispatch(getCustomerById(id));
        window.location.reload();
        setLoading(false);
        onClose(false);
      })
      .catch((error) => {
        toast.error(`${error?.message}`);
        dispatch(getCustomerById(id));
        window.location.reload();
        setLoading(false);
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
            {fieldType == "utilityBill" ? (
              <div className="flex flex-col gap-2 mt-5">
                <p className="font-semibold">Upload Utility Bill</p>
                {fileError && (
                  <p className="text-red-500 text-sm">{fileError}</p>
                )}

                <div className="relative">
                  <input
                    name="utilityBill"
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
                        {formData?.utilityBill?.name
                          ? "Change file"
                          : "Select file"}
                      </p>
                    </span>
                  </label>
                  {formData?.utilityBill?.name ? (
                    <div
                      id="fileLabel1"
                      className="bg-swLightGray p-2 flex justify-between"
                    >
                      <div className="text-xs">
                        {formData?.utilityBill?.name}
                      </div>
                      <div
                        onClick={() => {
                          deleteFile("utilityBill");
                        }}
                      >
                        <AiOutlineDelete color="red" size={20} />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
            {fieldType == "idCard" ? (
              <div className="flex flex-col gap-2 mt-5">
                <p className="font-semibold">Upload ID Card</p>
                {fileError && (
                  <p className="text-red-500 text-sm">{fileError}</p>
                )}
                <div className="relative">
                  <input
                    name="idCard"
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
                        {formData?.idCard?.name ? "Change file" : "Select file"}
                      </p>
                    </span>
                  </label>
                  {formData?.idCard?.name ? (
                    <div
                      id="fileLabel1"
                      className="bg-swLightGray p-2 flex justify-between"
                    >
                      <div className="text-xs">{formData?.idCard?.name}</div>
                      <div
                        onClick={() => {
                          deleteFile("idCard");
                        }}
                      >
                        <AiOutlineDelete color="red" size={20} />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
            {fieldType == "kyc" ? (
              <div className="flex flex-col gap-2 mt-5">
                <p className="font-semibold">Upload KYC</p>
                {fileError && (
                  <p className="text-red-500 text-sm">{fileError}</p>
                )}
                <div className="relative">
                  <input
                    name="kyc"
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
                        {formData?.kyc?.name ? "Change file" : "Select file"}
                      </p>
                    </span>
                  </label>
                  {formData?.kyc?.name ? (
                    <div
                      id="fileLabel1"
                      className="bg-swLightGray p-2 flex justify-between"
                    >
                      <div className="text-xs">{formData?.kyc?.name}</div>
                      <div
                        onClick={() => {
                          deleteFile("kyc");
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
            {fieldType == "transferOfOwnership" ? (
              <div className="flex flex-col gap-2 mt-5">
                <p className="font-semibold">Upload Transfer of Ownership</p>
                {fileError && (
                  <p className="text-red-500 text-sm">{fileError}</p>
                )}
                <div className="relative">
                  <input
                    name="transferOfOwnership"
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
                        {formData?.transferOfOwnership?.name
                          ? "Change file"
                          : "Select file"}
                      </p>
                    </span>
                  </label>
                  {formData?.transferOfOwnership?.name ? (
                    <div
                      id="fileLabel1"
                      className="bg-swLightGray p-2 flex justify-between"
                    >
                      <div className="text-xs">
                        {formData?.transferOfOwnership?.name}
                      </div>
                      <div
                        onClick={() => {
                          deleteFile("transferOfOwnership");
                        }}
                      >
                        <AiOutlineDelete color="red" size={20} />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
            {fieldType == "statementOfAccount" ? (
              <div className="flex flex-col gap-2 mt-5">
                <p className="font-semibold">Statement of Account</p>
                {fileError && (
                  <p className="text-red-500 text-sm">{fileError}</p>
                )}
                <div className="relative">
                  <input
                    name="statementOfAccount"
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
                        {formData?.statementOfAccount?.name
                          ? "Change file"
                          : "Select file"}
                      </p>
                    </span>
                  </label>
                  {formData?.statementOfAccount?.name ? (
                    <div
                      id="fileLabel1"
                      className="bg-swLightGray p-2 flex justify-between"
                    >
                      <div className="text-xs">
                        {formData?.statementOfAccount?.name}
                      </div>
                      <div
                        onClick={() => {
                          deleteFile("statementOfAccount");
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

export default UploadLoanDocs;
