"use client";

import {
  approveRestructureRequest,
  getSingleLoan,
} from "@/redux/slices/loanApplicationSlice";
import { getLoanApprovals } from "@/redux/slices/loanApprovalSlice";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../shared/buttonComponent/Button";

const LoanRestructureApprovalModal = ({
  isOpen,
  onClose,
  closeModal,
  requestId,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState();

  useEffect(() => {
    const _user = JSON.parse(localStorage.getItem("user"));
    if (_user) {
      setUser(_user?.data?.user);
    }
  }, []);

  const submitLoan = (e) => {
    setLoading(true);
    e.preventDefault();
    dispatch(
      approveRestructureRequest({ requestId, payload: { approver: user?._id } })
    )
      .unwrap()
      .then(() => {
        toast("Loan restructure approved.");
        dispatch(getSingleLoan(id));
        dispatch(getLoanApprovals(id));
        setLoading(false);
        onClose();
      })
      .catch((error) => {
        toast.error(`${error?.message}`);
        dispatch(getSingleLoan(id));
        dispatch(getLoanApprovals(id));
        setLoading(false);
      });
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
          <div className="flex justify-between items-center p-3 text-white">
            <div>
              <p className="text-base font-semibold text-swGray">
                Approve Loan Restructure Request
              </p>
            </div>
          </div>
          <div className="p-4">
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
                Approve Loan
              </Button>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
};

export default LoanRestructureApprovalModal;
