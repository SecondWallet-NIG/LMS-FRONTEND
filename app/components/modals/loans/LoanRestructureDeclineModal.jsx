"use client";

import {
  declineRestructureRequest,
  getSingleLoan,
} from "@/redux/slices/loanApplicationSlice";
import { getLoanApprovals } from "@/redux/slices/loanApprovalSlice";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../shared/buttonComponent/Button";

const LoanRestructureDeclineModal = ({
  isOpen,
  onClose,
  closeModal,
  requestId,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const [user, setUser] = useState();

  useEffect(() => {
    const _user = JSON.parse(localStorage.getItem("user"));
    if (_user) {
      setUser(_user?.data?.user);
    }
  }, []);

  const [formData, setFormData] = useState({
    reason: "",
  });

  const handleInputChange = async (e) => {
    let { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const submitLoan = (e) => {
    setLoading(true);
    console.log(formData);
    e.preventDefault();
    dispatch(
      declineRestructureRequest({
        requestId,
        payload: { reason: formData.reason, approver: user?._id },
      })
    )
      .unwrap()
      .then(() => {
        toast("Loan Restructure Request declined");
        dispatch(getSingleLoan(id));
        dispatch(getLoanApprovals(id));
        setLoading(false);
        onClose();
        router.refresh();
      })
      .catch((error) => {
        toast.error(`${error?.message}`);
        setLoading(false);
      });
  };

  return (
    <main>
      <ToastContainer />
      <form
        // style={modalStyles}
        className="w-full"
        id="add-user-form"
      >
        <div className="border bg-white border-swLightGray rounded-lg">
          <div className="flex justify-between items-center p-3 text-white">
            <div>
              <p className="text-base font-semibold text-swGray">
                Decline Loan Restructure Request
              </p>
              <p className="text-xs  text-swGray">Provide a reason</p>
            </div>
          </div>
          <div className="p-4">
            <textarea
              name="reason"
              required
              id="reason"
              className="w-full border border-1"
              rows="5"
              onChange={(e) => {
                handleInputChange(e);
              }}
            ></textarea>
            <div className="flex justify-between gap-3">
              <Button
                variant="secondary"
                onClick={onClose}
                className="mt-4 block w-full rounded-lg"
              >
                Cancel
              </Button>
              <Button
                disabled={loading || !!requestId ? true : false}
                onClick={submitLoan}
                className="mt-4 block w-full rounded-lg"
              >
                Decline
              </Button>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
};

export default LoanRestructureDeclineModal;
