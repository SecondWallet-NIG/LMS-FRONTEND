import {
  customerBlackList,
  customerWhiteList,
  getCustomerById,
} from "@/redux/slices/customerSlice";
import Image from "next/image";
import { redirect, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const BorrowerOptions = ({ open, onClose, whiteList, borrowerId }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const router = useRouter();
  const [otherReason, setOtherReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerProfileId: "",
    reason: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const RenderOptions = (id, value) => {
    return (
      <div className="flex items-center gap-3">
        <label htmlFor={id} className="flex gap-3">
          <input
            type="radio"
            name="reason"
            id={id}
            checked={formData.reason === value}
            value={value}
            onChange={handleChange}
          />
          <p>{value}</p>
        </label>
        {value === "Others" && formData.reason === "Others" && (
          <input
            type="text"
            onChange={(e) => setOtherReason(e.target.value)}
            placeholder="Please specify"
            className="p-2 border border-gray-300 hover:border-swBlue focus:outline-none"
          />
        )}
      </div>
    );
  };

  const handleBlacklist = (e) => {
    e.preventDefault();
    formData.reason === "Others" ? (formData.reason = otherReason) : null;
    if (!formData.reason || formData.reason === "Others") {
      toast.error("Please specify a reason for blacklisting the customer");
    } else {
      setLoading(true);
      dispatch(
        whiteList
          ? customerWhiteList({
              customerProfileId: borrowerId,
              reason: formData.reason,
            })
          : customerBlackList({
              customerProfileId: id,
              reason: formData.reason,
            })
      )
        .unwrap()
        .then((res) => {
          toast.success(res.message);
          setTimeout(() => {
            setFormData({ customerProfileId: "", reason: "" });
            whiteList
              ? window.location.reload()
              : dispatch(getCustomerById(id));
            onClose(false);
            setLoading(false);
          }, 2000);
        })
        .catch((err) => {
          toast.error(err.message);
          setLoading(false);
        });
    }
    // customerBlackList(formData);
  };

  if (!open) return null;
  return (
    <main className="fixed top-0 left-0 w-screen h-screen border bg-black bg-opacity-25 flex justify-center items-center z-[200] p-5">
      <ToastContainer />
      <div className="max-w-md w-full rounded-3xl bg-white p-5 text-black">
        <div className="flex items-center justify-between">
          <p className="font-medium">
            {whiteList ? "Whitelist Customer" : "Blacklist Customer"}
          </p>
          <div
            onClick={() => onClose(false)}
            className="p-2 rounded-lg hover:bg-gray-200 cursor-pointer"
          >
            <IoMdClose size={20} />
          </div>
        </div>
        <div className="flex items-center justify-center mt-5">
          <Image
            src="/images/warning.gif"
            alt="warning"
            width={30}
            height={30}
          />
        </div>
        <p className="mt-5 text-sm">
          {whiteList
            ? "You are trying to whitelist this customer. Kindly select a reason or specify"
            : "You are trying to blacklist this customer. Kindly select a reason or specify"}
        </p>

        <div className="mt-5 flex flex-col gap-3">
          {whiteList
            ? RenderOptions("noFraudulentActivity", "No fraudulent activity")
            : RenderOptions("fraudulentActivity", "Fraudulent activity")}
          {whiteList
            ? RenderOptions("goodCreditHistory", "Good credit history")
            : RenderOptions("poorCreditHistory", "Poor credit history")}
          {whiteList
            ? RenderOptions(
                "lowDebitToIncomeRatio",
                "Low debit to income ratio"
              )
            : RenderOptions(
                "highDebitToIncomeRatio",
                "High debit to income ratio"
              )}
          {whiteList
            ? RenderOptions("noLoanDefault", "No loan default")
            : RenderOptions("previousLoanDefault", "Previous loan default")}
          {whiteList
            ? RenderOptions(
                "stableEmploymentHistory",
                "Stable employment history"
              )
            : RenderOptions(
                "unuseableEmploymetHistory",
                "Unuseable employmet history"
              )}

          {whiteList
            ? RenderOptions(
                "noLoanPolicyViolations",
                "No loan policy violations"
              )
            : RenderOptions("loanPolicyViolations", "Loan policy violations")}
          {RenderOptions("others", "Others")}
        </div>

        <div className="flex items-center gap-5 mt-5">
          <button
            className="bg-white border border-blue-300 p-2 px-4 rounded-md text-swBlue w-full"
            onClick={() => onClose(false)}
          >
            {/* <div className=""> */}
            Cancel
            {/* </div> */}
          </button>
          <button
            className="relative text-center rounded-md py-2 px-4 w-full bg-swBlue text-white border-2 border-swBlue hover:border-blue-100 overflow-hidden"
            onClick={handleBlacklist}
          >
            {whiteList ? "Whitelist" : "Blacklist"}
            {(!formData.reason || loading) && (
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 cursor-not-allowed" />
            )}
          </button>
        </div>
      </div>
    </main>
  );
};

export default BorrowerOptions;
