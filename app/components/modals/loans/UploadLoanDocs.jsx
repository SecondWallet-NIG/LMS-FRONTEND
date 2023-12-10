"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "next/navigation";
import Button from "../../shared/buttonComponent/Button";
import { AiOutlineDelete, AiOutlinePaperClip } from "react-icons/ai";
import { approveLoanRequest } from "@/redux/slices/loanApprovalSlice";

const UploadLoanDocs = ({
  isOpen,
  onClose,
  width,
  data,
  fieldType,
  selected,
  approvalId,
  approvalLevel,
}) => {
  const dispatch = useDispatch();
  const [usersToApprove, setUsersToApprove] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const [formData, setFormData] = useState({
    applicationForm: null || "null",
    collaterals: "",
    guarantorForm: null,
    loanAffidavit: null,
  });
  console.log({ fieldType });

  const modifyUsersToApprove = (user) => {
    if (Array.isArray(user)) {
      const users = user.filter((item) => item?.role?.name === approvalLevel);
      setUsersToApprove(
        users.map((item) => ({
          label: item.firstName + " " + item.lastName,
          value: item._id,
        }))
      );
    }
  };

  const handleFileChange = (e) => {
    let { name, files } = e.target;
    const file = files[0];

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files[0],
    }));
  };

  const submitLoan = (e) => {
    setLoading(true);
    let _formData = {
      approvalLevel: approvalId,
      approvalNote: formData?.approvalNote,
      taskId: localStorage.getItem("taskId"),
    };
    const payload = { id, _formData };

    e.preventDefault();
    dispatch(approveLoanRequest(payload))
      .unwrap()
      .then(() => {
        toast("Loan approved for this level");
        setLoading(false);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        console.log({ error });
        toast.error(`${error?.message}`);
        setLoading(false);
        // setTimeout(() => {
        //   window.location.reload();
        // }, 2000);
      });
  };

  const deleteFile = (name) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: null,
    }));
  };
  //let taskId;
  useEffect(() => {
    modifyUsersToApprove(data);
  }, [data]);

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
                onClick={submitLoan}
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
