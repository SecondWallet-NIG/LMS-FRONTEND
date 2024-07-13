"use client";

import { useState } from "react";
import CenterModal from "../modals/CenterModal";
import UploadLoanDocs from "../modals/loans/UploadLoanDocs";
import PreviewLoanDocs from "../customers/PreviewLoanDocs";
import { handleFileExtention } from "../helpers/utils";
import dynamic from "next/dynamic";
import { IoMdClose } from "react-icons/io";
import UploadInvestorProfileDocs from "./UploadInvestorProfileDocs";
import Button from "../shared/buttonComponent/Button";

const Viewer = dynamic(() => import("react-viewer"), { ssr: false });

const InvestorProfileDocs = ({
  data, openModal, labelClass,
  handleInfoHoverIn, detailsHeader, editButton
}) => {
  const [url, setUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [fieldType, setFieldType] = useState("");
  const [openFileModal, setOpenFileModal] = useState(false);
  const docButton = `py-1 px-2 text-swTextColor mt-2 mb-4 rounded-md outline outline-1 
  outline-gray-100 flex gap-2 border w-fit cursor-pointer text-sm`

  const handleSetUrl = (content) => {
    setUrl(content);
    setIsOpen(true);
  };
  return (
    <main className="py-5">
      <div
        className="flex justify-between pb-3"
        onMouseEnter={() => handleInfoHoverIn("bio-data")}
        onMouseLeave={() => handleInfoHoverIn("close")}
      >
        <p className={`${detailsHeader}`}>Investor file upload</p>
        {editButton}
      </div>

      {/* Tax Identification Number (TIN) */}
      <div className="">
        <div className={`${labelClass}`}>
          Tax Identification Number (TIN)
        </div>
        {/* {data?.data?.identityVerification?.applicationForm} */}
        <div>
          {data?.data?.taxDoc != null ? (
            <div>
              <button
                onClick={() => {
                  handleSetUrl(data?.data?.taxDoc);
                  setOpenFileModal(true);
                }}
                className={`${docButton}`}
              >
                View Docs
              </button>
              {handleFileExtention(url) === "pdf" ? (
                <div
                  className={`h-full w-full fixed top-0 left-0 bg-black bg-opacity-25 ${openFileModal ? "flex" : "hidden"
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
              className={`${docButton}`}
            >
              Upload File
            </button>
          )}
        </div>
      </div>

      {/* Bank Verification Number (BVN) */}
      <div className="">
        <div className={`${labelClass}`}>
          Bank Verification Number (BVN)
        </div>
        <div>
          {data?.data?.bvnDoc != null ? (
            <div>
              <button
                onClick={() => {
                  handleSetUrl(data?.data?.bvnDoc);
                  setOpenFileModal(true);
                }}
                className={`${docButton}`}
              >
                View Docs
              </button>
              {handleFileExtention(url) === "pdf" ? (
                <div
                  className={`h-full w-full fixed top-0 left-0 bg-black bg-opacity-25 ${openFileModal ? "flex" : "hidden"
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
              className={`${docButton}`}
            >
              Upload File
            </button>
          )}
        </div>
      </div>

      {/* National Identity Number (NIN) */}
      <div className="">
        <div className={`${labelClass}`}>
          National Identity Number (NIN)
        </div>
        {/* {data?.data?.identityVerification?.applicationForm} */}
        <div>
          {data?.data?.ninDoc != null ? (
            <div>
              <button
                onClick={() => {
                  handleSetUrl(data?.data?.ninDoc);
                  setOpenFileModal(true);
                }}
                className={`${docButton}`}
              >
                View Docs
              </button>
              {handleFileExtention(url) === "pdf" ? (
                <div
                  className={`h-full w-full fixed top-0 left-0 bg-black bg-opacity-25 ${openFileModal ? "flex" : "hidden"
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
              className={`${docButton}`}
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
