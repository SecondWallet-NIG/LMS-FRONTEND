"use client";
import { useState } from "react";
import CenterModal from "../modals/CenterModal";
import LoanDocsUpload from "../modals/loans/LoanDocsUpload";
import PreviewLoanDocs from "./PreviewLoanDocs";
import { handleFileExtention } from "../helpers/utils";
import { IoMdClose } from "react-icons/io";
import dynamic from "next/dynamic";
// import ImageViewer from 'react-simple-image-viewer';

// import Viewer from "react-viewer";
const Viewer = dynamic(
  () => import("react-viewer"),
  { ssr: false } // This line is important
);

const CustomerLoanDoc = (data) => {
  const [url, setUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [openFileModal, setOpenFileModal] = useState(false);
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
            <div>
              <button
                onClick={() => {
                  handleSetUrl(data?.data?.loanApplication?.applicationForm);
                  setOpenFileModal(true);
                }}
                className="text-sm text-swGray underline"
              >
                View Docs
              </button>
              {handleFileExtention(url) === "pdf" ? (
                // <p>It's a pdf</p>
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
            <div>
              <button
                onClick={() => {
                  handleSetUrl(data?.data?.loanApplication?.loanAffidavit);
                  setOpenFileModal(true);
                }}
                className="text-sm text-swGray underline"
              >
                View Docs
              </button>
              {handleFileExtention(url) === "pdf" ? (
                // <p>It's a pdf</p>
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
            <div>
              <button
                onClick={() => {
                  handleSetUrl(data?.data?.loanApplication?.guarantorForm);
                  setOpenFileModal(true);
                }}
                className="text-sm text-swGray underline"
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
          {data?.data?.loanApplication?.collaterals?.length != null ? (
            <div>
              <button
                onClick={() => {
                  handleSetUrl(data?.data?.loanApplication?.collaterals);
                  setOpenFileModal(true);
                }}
                className="text-sm text-swGray underline"
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
      <div className="flex justify-between pl-4">
        <div className="pt-4 font-semibold text-xs text-swGray">
          Power of attorney
        </div>
        <div>
          {data?.data?.loanApplication?.powerOfAttorney != null ? (
            <div>
              <button
                onClick={() => {
                  handleSetUrl(data?.data?.loanApplication?.powerOfAttorney);
                  setOpenFileModal(true);
                }}
                className="text-sm text-swGray underline"
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
                setFieldType("powerOfAttorney");
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
          Proof of ownership
        </div>
        <div>
          {data?.data?.loanApplication?.proofOfOwnership != null ? (
            <div>
              <button
                onClick={() => {
                  handleSetUrl(data?.data?.loanApplication?.proofOfOwnership);
                  setOpenFileModal(true);
                }}
                className="text-sm text-swGray underline"
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
                setFieldType("proofOfOwnership");
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
          Statement of account
        </div>
        <div>
          {data?.data?.loanApplication?.statementOfAccounts != null ? (
            <div>
              <button
                onClick={() => {
                  handleSetUrl(
                    data?.data?.loanApplication?.statementOfAccounts
                  );
                  setOpenFileModal(true);
                }}
                className="text-sm text-swGray underline"
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
                setFieldType("statementOfAccounts");
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
        width={"35%"}
        isOpen={uploadModalOpen}
        onClose={() => {
          setUploadModalOpen(!uploadModalOpen);
        }}
      >
        <LoanDocsUpload
          isOpen={uploadModalOpen}
          onClose={() => {
            setUploadModalOpen(!uploadModalOpen);
          }}
          fieldType={fieldType}
          customerId={data?.data?.loanApplication?.applicationForm?._id}
        />
      </CenterModal>
    </main>
  );
};

export default CustomerLoanDoc;
