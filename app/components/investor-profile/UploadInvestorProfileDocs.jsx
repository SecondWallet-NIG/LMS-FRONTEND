"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "next/navigation";
import { AiOutlineDelete, AiOutlinePaperClip } from "react-icons/ai";
import Button from "../shared/buttonComponent/Button";
import {
  getSingleInvestor,
  updateInvestor,
} from "@/redux/slices/investmentSlice";

const UploadInvestorProfileDocs = ({ onClose, fieldType }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [fileError, setFileError] = useState("");

  const [formData, setFormData] = useState({
    ninDoc: null || "null",
    taxDoc: null || "null",
    bvnDoc: null || "null",
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

    fieldType === "ninDoc" && payload.append("ninDoc", formData.ninDoc);
    fieldType == "bvnDoc" && payload.append("taxDoc", formData.taxDoc);
    fieldType == "ninDoc" && payload.append("ninDoc", formData.ninDoc);

    dispatch(updateInvestor({ id, payload }))
      .unwrap()
      .then(() => {
        toast.success("Document uploaded");
        dispatch(getSingleInvestor(id));
        window.location.reload();
        setLoading(false);
        onClose(false);
      })
      .catch((error) => {
        toast.error(`${error?.message}`);
        dispatch(getSingleInvestor(id));
        // window.location.reload();
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
            {fieldType == "taxDoc" ? (
              <div className="flex flex-col gap-2 mt-5">
                <p className="font-semibold">Upload TAX Document</p>
                {fileError && (
                  <p className="text-red-500 text-sm">{fileError}</p>
                )}

                <div className="relative">
                  <input
                    name="taxDoc"
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
                        {formData?.taxDoc?.name ? "Change file" : "Select file"}
                      </p>
                    </span>
                  </label>
                  {formData?.taxDoc?.name ? (
                    <div
                      id="fileLabel1"
                      className="bg-swLightGray p-2 flex justify-between"
                    >
                      <div className="text-xs">{formData?.taxDoc?.name}</div>
                      <div
                        onClick={() => {
                          deleteFile("taxDoc");
                        }}
                      >
                        <AiOutlineDelete color="red" size={20} />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
            {fieldType == "bvnDoc" ? (
              <div className="flex flex-col gap-2 mt-5">
                <p className="font-semibold">Upload BVN Document</p>
                {fileError && (
                  <p className="text-red-500 text-sm">{fileError}</p>
                )}
                <div className="relative">
                  <input
                    name="bvnDoc"
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
                        {formData?.bvnDoc?.name ? "Change file" : "Select file"}
                      </p>
                    </span>
                  </label>
                  {formData?.bvnDoc?.name ? (
                    <div
                      id="fileLabel1"
                      className="bg-swLightGray p-2 flex justify-between"
                    >
                      <div className="text-xs">{formData?.bvnDoc?.name}</div>
                      <div
                        onClick={() => {
                          deleteFile("bvnDoc");
                        }}
                      >
                        <AiOutlineDelete color="red" size={20} />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
            {fieldType == "ninDoc" ? (
              <div className="flex flex-col gap-2 mt-5">
                <p className="font-semibold">Upload NIN Doc</p>
                {fileError && (
                  <p className="text-red-500 text-sm">{fileError}</p>
                )}
                <div className="relative">
                  <input
                    name="ninDoc"
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
                        {formData?.ninDoc?.name ? "Change file" : "Select file"}
                      </p>
                    </span>
                  </label>
                  {formData?.ninDoc?.name ? (
                    <div
                      id="fileLabel1"
                      className="bg-swLightGray p-2 flex justify-between"
                    >
                      <div className="text-xs">{formData?.ninDoc?.name}</div>
                      <div
                        onClick={() => {
                          deleteFile("ninDoc");
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

export default UploadInvestorProfileDocs;
