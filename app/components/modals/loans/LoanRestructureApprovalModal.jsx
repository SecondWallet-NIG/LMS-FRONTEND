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
  const [disburseDate, setDisburseDate] = useState("");

  useEffect(() => {
    const _user = JSON.parse(localStorage.getItem("user"));
    if (_user) {
      setUser(_user?.data?.user);
    }
  }, []);

  const submitLoan = (e) => {
    e.preventDefault();

    if (!disburseDate) {
      toast.error("Please select a disbursement date.");
      return;
    }

    setLoading(true);

    dispatch(
      approveRestructureRequest({
        requestId,
        payload: {
          approver: user?._id,
          disburseDate,
        },
      })
    )
      .unwrap()
      .then(() => {
        toast("Loan restructure approved.");
        dispatch(getSingleLoan(id));
        dispatch(getLoanApprovals(id));
        setLoading(false);
        onClose();
        router.refresh();
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
      <form className="w-full" id="add-user-form" onSubmit={submitLoan}>
        <div className="border bg-white border-swLightGray rounded-lg">
          <div className="flex justify-between items-center p-3 text-white">
            <p className="text-base font-semibold text-swGray">
              Approve Loan Restructure Request
            </p>
          </div>

          <div className="p-4 space-y-4">
            {/* 🗓️ Disbursement Date Picker */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="disburseDate"
                className="text-sm font-medium text-swGray"
              >
                Disbursement Date
              </label>
              <input
                type="date"
                id="disburseDate"
                value={disburseDate}
                onChange={(e) => setDisburseDate(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                required
              />
            </div>

            <div className="flex justify-between gap-3">
              <Button
                variant="secondary"
                onClick={onClose}
                className="mt-4 block w-full rounded-lg"
                type="button"
              >
                Cancel
              </Button>
              <Button
                disabled={loading}
                type="submit"
                className="mt-4 block w-full rounded-lg"
              >
                {loading ? "Approving..." : "Approve Loan"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
};

export default LoanRestructureApprovalModal;
