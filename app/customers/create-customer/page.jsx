"use client";
import Button from "@/app/components/shared/buttonComponent/Button";
import Dashboard from "@/app/dashboard/page";
import { useState } from "react";
import { AiOutlineCheckCircle, AiOutlinePaperClip } from "react-icons/ai";
import { RiArrowDownSLine } from "react-icons/ri";
import { PiTrashSimple } from "react-icons/pi";
import { BiTrashAlt } from "react-icons/bi";

const CreateCustomer = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles(files);
  };

  const handleFileInputChange = (e) => {
    e.preventDefault();
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleRemoveFile = (arrayIndex) => {
    selectedFiles.splice(arrayIndex, 1);
    setSelectedFiles([...selectedFiles]);
  };

  return (
    <Dashboard>
      {/* right bar */}
      <div className="h-full fixed right-0 w-[18%] border-l border-swGray text-sm">
        <p className="p-3 border-b font-semibold">Stages</p>
        <div className="p-2">
          <p className="flex items-center justify-between">
            Personal information
            <AiOutlineCheckCircle size={20} className="text-green-500" />
          </p>
          <div className="h-3 w-1 bg-swLightGray" />
          <p className="flex items-center justify-between">
            Employment and Income Information
          </p>
          <div className="h-3 w-1 bg-swLightGray" />
          <p className="flex items-center justify-between">
            Identity Verification/Document
          </p>
        </div>
      </div>
      <main className="py-8 px-16 text-sm w-[78%] z-50">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-base ">Create customer profile</p>
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between rounded-md w-56 border p-2 cursor-pointer">
              <p>Bulk customers</p>
              <RiArrowDownSLine size={20} />
            </div>
          </div>
        </div>
        <p className="mt-6 mb-4 font-semibold">Upload a file</p>
        <div
          onDrop={handleFileDrop}
          onDragOver={(e) => e.preventDefault()}
          className="pt-10 pb-6 rounded-xl border-2 border-dashed border-swGray flex flex-col justify-center items-center mb-5"
        >
          <p className="font-semibold">Drag and drop a file to upload</p>
          <p className="text-xs">File types: .xlsx, .csv</p>
          <p className="text-xs">Max file size: 3mb</p>
          <button
            className="bg-swBlue text-white font-sembold p-2 pr-3 w-fit flex gap-1 rounded-md mt-5 hover:bg-red-500"
            onClick={() => document.getElementById("fileInput").click()}
          >
            <AiOutlinePaperClip size={20} />
            Upload a file
            <input
              type="file"
              id="fileInput"
              className="hidden"
              multiple
              onChange={handleFileInputChange}
            />
          </button>
        </div>
        {selectedFiles.map((file, index) => (
          <div
            key={index}
            className="w-full flex items-center justify-between mb-1"
          >
            <p className="p-[0.1rem] border pl-2 border-r-none border-r-transparent w-full rounded-tl-md rounded-bl-md flex justify-between">
              <span>{file.name}</span>
              <span>
                {file.size < 1024
                  ? file.size + " B"
                  : file.size < Math.pow(1024, 2)
                  ? (file.size / 1024).toFixed(2) + " KB"
                  : (file.size / Math.pow(1024, 2)).toFixed(2) + " MB"}
              </span>
            </p>
            <div
              className="border p-1 h-full flex justify-center items-center rounded-tr-md rounded-br-md cursor-pointer"
              onClick={() => {
                handleRemoveFile(index);
              }}
            >
              <BiTrashAlt size={15} className="text-red-500" />
            </div>
          </div>
        ))}
        <button
          className={`${
            selectedFiles.length > 0
              ? "bg-swBlue text-white cursor-pointer"
              : "bg-swLightGray text-swGray cursor-not-allowed"
          } font-sembold p-2 pr-3 w-fit flex gap-1 rounded-md mt-5 mx-auto`}
          disabled={selectedFiles.length > 0 ? false : true}
          onClick={() => {
            alert("hello");
          }}
        >
          Create customers profile
        </button>
      </main>
    </Dashboard>
  );
};

export default CreateCustomer;
