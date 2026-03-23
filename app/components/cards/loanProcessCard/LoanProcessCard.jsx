"use client";


import { FiMessageSquare } from "react-icons/fi";
import CenterModal from "../../modals/CenterModal";
import { AiFillCloseCircle } from "react-icons/ai";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const LoanProcessCard = ({ 
  data, 
  useriD, 
  loanCreatorId,
  onRequestApproval, 
  onApprove, 
  onDecline 
}) => {
  const _data = data?.data?.data;
  const [commentOpen, setCommentOpen] = useState(false);
  const [approvalMsg, setApprovalMsg] = useState({});

  return (
    <main className="flex flex-col gap-4">
      {Array.isArray(_data) &&
        _data?.map((item, index) => (
          <div key={index} className="p-4 rounded-xl border border-gray-100 bg-white shadow-sm flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-sm text-gray-800">{item?.approvalTitle}</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {item?.updatedAt ? new Date(item?.updatedAt).toLocaleDateString() : ''}
                </p>
              </div>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider ${
                  item?.status === "Approved"
                    ? "bg-[#E8F7F0] text-[#107E4B]"
                    : item?.status === "Pending"
                    ? "bg-gray-100 text-gray-600"
                    : item?.status === "Approval Requested"
                    ? "bg-red-100 text-red-600"
                    : item?.status === "Declined"
                    ? "bg-red-100 text-red-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {item?.status}
              </span>
            </div>
            
            <div className="flex items-center gap-3 bg-gray-50/50 p-2 rounded-lg">
              {item?.assignee?.profilePicture ? (
                <div className="h-8 w-8 rounded-full relative border border-gray-200 overflow-hidden shrink-0">
                  <img
                    src={item?.assignee?.profilePicture}
                    alt="profile pic"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <FaUserCircle size={32} className="text-gray-400" style={{display: 'none'}} />
                </div>
              ) : (
                <div className="h-8 w-8 rounded-full bg-swBlue/10 flex items-center justify-center text-swBlue font-semibold text-xs shrink-0">
                  {item?.assignee?.firstName?.charAt(0)}{item?.assignee?.lastName?.charAt(0)}
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-800 truncate">
                  {item?.assignee?.firstName ? `${item?.assignee?.firstName} ${item?.assignee?.lastName}` : "Unassigned"}
                </p>
                {item?.assignee?.role?.name && (
                  <p className="text-[10px] text-gray-500 truncate">{item?.assignee?.role?.name}</p>
                )}
              </div>
              
              <button 
                onClick={() => {
                  setCommentOpen(!commentOpen);
                  setApprovalMsg(item);
                }}
                className="p-1.5 text-gray-400 hover:text-swBlue hover:bg-white rounded-md transition-colors shrink-0"
                title="View Messages"
              >
                <FiMessageSquare size={14} />
              </button>
            </div>

            {/* Action Buttons */}
            {loanCreatorId === useriD && onRequestApproval && (
              <button
                onClick={() => onRequestApproval(item)}
                disabled={item?.status === "Approval Requested" || item?.status === "Approved"}
                className="w-full py-2 text-xs font-medium rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {item?.status === "Pending" || item?.status === "Declined" ? "Request Approval" : item?.status}
              </button>
            )}

            {item?.assignee?._id === useriD && item?.status === "Approval Requested" && onApprove && onDecline && (
              <div className="flex gap-2 pt-1 border-t border-gray-100">
                <button
                  onClick={() => onApprove(item)}
                  className="flex-1 py-2 bg-swBlue text-white text-xs font-medium rounded-lg hover:bg-swBlueActiveStateBg transition-colors"
                >
                  Approve
                </button>
                <button
                  onClick={() => onDecline(item)}
                  className="flex-1 py-2 bg-red-50 text-red-600 border border-red-100 text-xs font-medium rounded-lg hover:bg-red-100 transition-colors"
                >
                  Decline
                </button>
              </div>
            )}
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
          <div className="text-swDarkRed font-semibold">
            Decline messages :{" "}
          </div>
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
