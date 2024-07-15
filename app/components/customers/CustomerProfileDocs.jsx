"use client";

import { useState } from "react";
import CenterModal from "../modals/CenterModal";
import UploadLoanDocs from "../modals/loans/UploadLoanDocs";
import PreviewLoanDocs from "./PreviewLoanDocs";
import { handleFileExtention } from "../helpers/utils";
import dynamic from "next/dynamic";
import { IoMdClose } from "react-icons/io";

const Viewer = dynamic(
  () => import("react-viewer"),
  { ssr: false } 
);

const CustomerProfileDocs = (data) => {

  const [url, setUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [fieldType, setFieldType] = useState("");
  const [openFileModal, setOpenFileModal] = useState(false);

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
            <div>
              <button
                onClick={() => {
                  handleSetUrl(data?.data?.identityVerification?.utilityBill);
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
            <div>
              <button
                onClick={() => {
                  handleSetUrl(
                    data?.data?.identityVerification?.statementOfAccount
                  );
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
        <div className="pt-4 font-semibold text-xs text-swGray">ID card</div>
        <div>
          {data?.data?.identityVerification?.idCard != null ? (
            <div>
              <button
                onClick={() => {
                  handleSetUrl(data?.data?.identityVerification?.idCard);
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
        <div className="pt-4 font-semibold text-xs text-swGray">KYC</div>
        <div>
          {data?.data?.identityVerification?.kyc != null ? (
            <div>
              <button
                onClick={() => {
                  handleSetUrl(data?.data?.identityVerification?.kyc);
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
            <div>
              <button
                onClick={() => {
                  handleSetUrl(
                    data?.data?.identityVerification?.powerOfAttorney
                  );
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
                setFieldType("powerOfAttorney");
                ("powerOfAttorney");
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
            <div>
              <button
                onClick={() => {
                  handleSetUrl(
                    data?.data?.identityVerification?.transferOfOwnership
                  );
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
      {/* <CenterModal
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
      </CenterModal> */}
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
          customerId={data?.data?.identityVerification?._id}
        />
      </CenterModal>
    </main>
  );
};

export default CustomerProfileDocs;
