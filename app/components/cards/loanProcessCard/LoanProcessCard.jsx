"use client";

import Image from "next/image";
import { FiMessageSquare } from "react-icons/fi";
import CenterModal from "../../modals/CenterModal";
import { AiFillCloseCircle } from "react-icons/ai";
import { useState } from "react";

const LoanProcessCard = ({ data }) => {
  const _data = data?.data?.data;
  console.log({ _data });
  const [commentOpen, setCommentOpen] = useState(false);
  const [approvalMsg, setApprovalMsg] = useState({});

  return (
    <main className="flex flex-col">
      {Array.isArray(_data) &&
        _data?.map((item, index) => (
          <div key={index} className="border-b border-gray-100 p-2">
            <div className="flex justify-between items-center">
              <p className="font-semibold capitalize text-xs text-black">
                {item?.approvalTitle}
              </p>

              <button
                className={`cursor-none ${
                  item.status === "Approved"
                    ? "bg-[#E8F7F0] text-[#107E4B]  text-xs font-normal px-2 py-1 rounded-full"
                    : item.status === "Pending"
                    ? "bg-swLightGray text-swGray text-xs font-normal px-2 py-1 rounded-full"
                    : item.status === "Approval Requested"
                    ? "bg-red-400 text-white text-xs font-normal px-2 py-1 rounded-full"
                    : item.status === "Declined"
                    ? "bg-red-500 text-white text-xs font-normal px-2 py-1 rounded-full"
                    : "bg-gray-300 text-gray-800 text-xs font-normal px-2 py-1 rounded-full"
                } px-2 py-1 rounded`}
              >
                {item.status}
              </button>
            </div>
            <div className="flex items-end gap-2">
              {/* <p className="font-medium text-xs ">{item?.createdAt}</p> */}
              <p className="text-xs text-swBlue">
                {item?.updatedAt ? item?.updatedAt.slice(0, 10) : null}
              </p>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Image
                src={"https://cdn-icons-png.flaticon.com/512/4128/4128349.png"}
                alt="profile pic"
                className="rounded-full"
                height={50}
                width={50}
              />
              <div>
                <button
                  className={`flex text-sm font-semibold border-2 border-white rounded-lg overflow-hidden cursor-pointer `}
                >
                  {item?.assignee?.firstName ? (
                    <p className="font-medium text-xs text-black">
                      {item?.assignee?.firstName} {item?.assignee?.lastName}
                    </p>
                  ) : (
                    <p className="text-xs">Yet to be assigned</p>
                  )}
                </button>
                <div
                  onClick={() => {
                    console.log(">>>>>", item.approvalNote.length);
                    setCommentOpen(!commentOpen);
                    setApprovalMsg(item);
                  }}
                >
                  <FiMessageSquare />
                </div>
              </div>
            </div>
          </div>
        ))}
      <CenterModal isOpen={commentOpen}>
        <div className="flex justify-between mb-4">
          <div className="text-black">Approval Message Trail</div>
          <AiFillCloseCircle
            color="red"
            onClick={() => {
              setCommentOpen(!commentOpen);
            }}
          />
        </div>
        <div className="flex justify-between mb-4 text-sm">
          <div className="text-swBlue font-semibold">Request messages : </div>
          <div>
            {approvalMsg?.requestNote?.length == 0 ? (
              <div className="text-xs">No Message Attached Yet</div>
            ) : (
              <div>
                {approvalMsg?.requestNote?.map((item, index) => (
                  <div key={index}>
                    <div className="mt-2 text-xs text-end">{item?.note}</div>
                    <div className="mt-2 text-xs text-end">
                      {item?.dateLogged?.slice(0, 15)}
                    </div>
                    <div className="mt-2 text-xs text-end">
                      Logged By : {item?.createdBy}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <hr></hr>
        <div className="flex justify-between mb-4 text-sm pt-2">
          <div className="text-swDarkRed font-semibold">Decline messages : </div>
          <div>
            {approvalMsg?.declineNote?.length == 0 ? (
              <div className="text-xs">No Message Attached Yet</div>
            ) : (
              <div>
                {approvalMsg?.declineNote?.map((item, index) => (
                  <div key={index}>
                    <div className="mt-2 text-xs text-end">{item?.note}</div>
                    <div className="mt-2 text-xs text-end">
                      {item?.dateLogged?.slice(0, 15)}
                    </div>
                    <div className="mt-2 text-xs text-end">
                     {/* Logged By : {item?.createdBy} */}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <hr></hr>
        <div className="flex justify-between mb-4 text-sm pt-2">
          <div className="text-swGreen font-semibold">Approval messages : </div>
          <div>
            {approvalMsg?.approvalNote?.length == 0 ? (
              <div className="text-xs">No Message Attached Yet</div>
            ) : (
              <div>
                {approvalMsg?.approvalNote?.map((item, index) => (
                  <div key={index}>
                    <div className="mt-2 text-xs text-end">{item?.note}</div>
                    <div className="mt-2text-xs text-end">
                      {item?.dateLogged?.slice(0, 15)}
                    </div>
                    <div className="mt-2 text-xs text-end">
                      {/* Logged By : {item?.createdBy} */}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CenterModal>
    </main>
  );
};

export default LoanProcessCard;
