"use client";

import { useState } from "react";
import CenterModal from "../modals/CenterModal";
import UploadLoanDocs from "../modals/loans/UploadLoanDocs";
import PreviewLoanDocs from "../customers/PreviewLoanDocs";
import { handleFileExtention } from "../helpers/utils";
import dynamic from "next/dynamic";
import { IoMdClose } from "react-icons/io";
import UploadInvestorProfileDocs from "./UploadInvestorProfileDocs";

const Viewer = dynamic(() => import("react-viewer"), { ssr: false });

const InvestorProfileDocs = (data) => {
  console.log({ data });

  const [url, setUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [fieldType, setFieldType] = useState("");
  const [openFileModal, setOpenFileModal] = useState(false);

  const handleSetUrl = (content) => {
    setUrl(content);
    setIsOpen(true);
  };
  console.log("data2", data?.data?.data?.ninDoc);
  return (
    <main>
      <div className="flex justify-between pl-4">
        <div className="pt-4 font-semibold text-xs text-swGray">
          NIN Document
        </div>
        {/* {data?.data?.identityVerification?.applicationForm} */}
        <div>
          {data?.data?.data?.ninDoc != null ? (
            <div>
              <button
                onClick={() => {
                  handleSetUrl(data?.data?.data?.ninDoc);
                  setOpenFileModal(true);
                }}
                className="text-sm text-swGray underline mt-4"
              >
                View Docs
              </button>
              {handleFileExtention(url) === "pdf" ? (
                <div
                  className={`h-full w-full fixed top-0 left-0 bg-black bg-opacity-25 ${
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
                  {typeof window !== "undefined" ? (
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
                  ) : null}
                </>
              )}
            </div>
          ) : (
            <button
              onClick={() => {
                setFieldType("ninDoc");
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
          TAX Document
        </div>
        {/* {data?.data?.identityVerification?.applicationForm} */}
        <div>
          {data?.data?.data?.taxDoc != null ? (
            <div>
              <button
                onClick={() => {
                  handleSetUrl(data?.data?.data?.taxDoc);
                  setOpenFileModal(true);
                }}
                className="text-sm text-swGray underline mt-4"
              >
                View Docs
              </button>
              {handleFileExtention(url) === "pdf" ? (
                <div
                  className={`h-full w-full fixed top-0 left-0 bg-black bg-opacity-25 ${
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
                  {typeof window !== "undefined" ? (
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
                  ) : null}
                </>
              )}
            </div>
          ) : (
            <button
              onClick={() => {
                setFieldType("taxDoc");
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
          BVN Document
        </div>
        <div>
          {data?.data?.data?.bvnDoc != null ? (
            <div>
              <button
                onClick={() => {
                  handleSetUrl(data?.data?.data?.bvnDoc);
                  setOpenFileModal(true);
                }}
                className="text-sm text-swGray underline mt-4"
              >
                View Docs
              </button>
              {handleFileExtention(url) === "pdf" ? (
                <div
                  className={`h-full w-full fixed top-0 left-0 bg-black bg-opacity-25 ${
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
                  {typeof window !== "undefined" ? (
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
                  ) : null}
                </>
              )}
            </div>
          ) : (
            <button
              onClick={() => {
                setFieldType("bvnDoc");
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
        width={"35%"}
        isOpen={uploadModalOpen}
        onClose={() => {
          setUploadModalOpen(!uploadModalOpen);
        }}
      >
        <UploadInvestorProfileDocs
          isOpen={uploadModalOpen}
          onClose={() => {
            setUploadModalOpen(!uploadModalOpen);
          }}
          fieldType={fieldType}
          customerId={data?.data?.identityVerification?._id}
        />
      </CenterModal>
    </main>
  );
};

export default InvestorProfileDocs;
