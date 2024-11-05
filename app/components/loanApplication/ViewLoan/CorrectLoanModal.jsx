import { useEffect, useState } from "react";
import { checkDecimal } from "../../helpers/utils";
import InputField from "../../shared/input/InputField";
import Button from "../../shared/buttonComponent/Button";

const CorrectLoanModal = ({ isOpen, onClose, id, data }) => {
  const [formData, setFormData] = useState({
    outstandingPrincipal: "",
    currentInterest: "",
    outstandingBalance: "",
  });
  const [loading, setLoading] = useState(false)

  // console.log("app4", data);
  // console.log("app5", formData);

  useEffect(() => {
    if (data?.loanApplication) {
      setFormData({
        outstandingPrincipal: String(
          data?.loanApplication?.outstandingPrincipal
        ),
        currentInterest: String(
          data?.loanApplication?.currentInterest
        ),
        outstandingBalance: String(
          data?.loanApplication?.outstandingPrincipal +
            data?.loanApplication?.currentInterest
        ),
      });
    }
  }, [data?.loanApplication]);

  if (!isOpen) return null;
  return (
    <div className="bg-black bg-opacity-25 fixed top-0 left-0 h-full w-full flex justify-center items-center z-[200]">
      <div className="bg-white p-5 pt-9 max-w-lg w-full flex flex-col gap-3 ">
        <InputField
          name="outstandingPrincipal"
          label="Outstanding Principal"
          required={true}
          disabled={true}
          placeholder="Enter amount"
          onWheel={() => {
            const activeElement = document.activeElement;
            if (activeElement) {
              activeElement.blur();
            }
          }}
          value={
            !formData.outstandingPrincipal.includes(".")
              ? Number(formData.outstandingPrincipal).toLocaleString("en-US")
              : checkDecimal(formData.repaymentAmount)
              ? Number(formData.outstandingPrincipal).toLocaleString("en-US")
              : formData.outstandingPrincipal
          }
        />
        <InputField
          name="currentInterest"
          label="Current Interest"
          required={true}
          disabled={true}
          placeholder="Enter amount"
          onWheel={() => {
            const activeElement = document.activeElement;
            if (activeElement) {
              activeElement.blur();
            }
          }}
          value={
            !formData.currentInterest.includes(".")
              ? Number(formData.currentInterest).toLocaleString("en-US")
              : checkDecimal(formData.currentInterest)
              ? Number(formData.currentInterest).toLocaleString("en-US")
              : formData.currentInterest
          }
        />
        <InputField
          name="outstandingBalance"
          label="Outstanding Balance"
          required={true}
          disabled={true}
          placeholder="Enter amount"
          onWheel={() => {
            const activeElement = document.activeElement;
            if (activeElement) {
              activeElement.blur();
            }
          }}
          value={
            !formData.outstandingBalance.includes(".")
              ? Number(formData.outstandingBalance).toLocaleString("en-US")
              : checkDecimal(formData.outstandingBalance)
              ? Number(formData.outstandingBalance).toLocaleString("en-US")
              : formData.outstandingBalance
          }
        />
        <div className="flex pt-4 mb-4 items-end gap-2 justify-end">
              <Button
                variant="secondary"
                onClick={() => onClose && onClose(false)}
              >
                Cancel
              </Button>
              <Button
                // disabled={loading ? true : false}
                variant="secondary"
                // onClick={logRepaymentFunction}
              >
                Correct Loan
              </Button>
            </div>
      </div>
    </div>
  );
};

export default CorrectLoanModal;
