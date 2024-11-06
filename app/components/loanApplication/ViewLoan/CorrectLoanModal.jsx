import { useEffect, useState } from "react";
import {
  checkDecimal,
  handleInputChangeWithComma,
  preventMinus,
} from "../../helpers/utils";
import InputField from "../../shared/input/InputField";
import Button from "../../shared/buttonComponent/Button";
import { useDispatch } from "react-redux";
import { correctLoanAction } from "@/redux/slices/loanApplicationSlice";
import SuccessModal from "../../modals/SuccessModal";
import CancelModal from "../../modals/CancelModal";

const CorrectLoanModal = ({ isOpen, onClose, id }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    outstandingPrincipal: "",
    currentInterest: "",
    outstandingBalance: "",
  });
  const [successModal, setSuccessModal] = useState({
    state: false,
    description: "",
  });
  const [failedModal, setFailedModal] = useState({
    state: false,
    description: "",
  });

  const resetForm = () => {
    setFormData({
      outstandingPrincipal: "",
      currentInterest: "",
      outstandingBalance: "",
    });
  };

  const handleClose = () => {
    resetForm();
    onClose && onClose(false);
  };

  const handleCorrectLoan = () => {
    if (Object.values(formData).some((value) => value === "")) {
      setFailedModal({
        state: true,
        description: "Please fill all fields and try again",
      });
    } else {
      setLoading(true);

      const payload = {
        ...Object.keys(formData).reduce((acc, key) => {
          acc[key] = Number(formData[key]);
          return acc;
        }, {}),
        loanId:id,
      };

      dispatch(correctLoanAction(payload))
        .unwrap()
        .then((res) => {
          setSuccessModal({
            state: true,
            description: res?.message || "Loan has been corrected successfully",
          });
          setLoading(false);
        })
        .catch((err) => {
          setFailedModal({
            state: true,
            description:
              err?.message || "Loan correction has failed, please try again",
          });
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (formData.outstandingPrincipal && formData.currentInterest) {
      const outstandingBalance =
        Number(formData.outstandingPrincipal) +
        Number(formData.currentInterest);

      setFormData((prev) => ({
        ...prev,
        outstandingBalance: String(outstandingBalance),
      }));
    }
  }, [formData.outstandingPrincipal, formData.currentInterest]);

  if (!isOpen) return null;
  return (
    <div
      // onClick={handleClose}
      className="bg-black bg-opacity-25 fixed top-0 left-0 h-full w-full flex justify-center items-center z-[200]"
    >
      <div
        // onClick={(e) => e.stopPropagation()}
        className="bg-white p-5 pt-9 max-w-lg w-full flex flex-col gap-3 "
      >
        <p className="text-xl font-semibold text-black text-center mb-2">
          Correct Loan
          {/* : {data?.loanApplication?.loanId} */}
        </p>
        <InputField
          name="outstandingPrincipal"
          label="Outstanding Principal"
          required={true}
          // disabled={true}
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
              : checkDecimal(formData.outstandingPrincipal)
              ? Number(formData.outstandingPrincipal).toLocaleString("en-US")
              : formData.outstandingPrincipal
          }
          onKeyPress={preventMinus}
          onChange={(e) => {
            handleInputChangeWithComma(e, setFormData);
          }}
        />
        <InputField
          name="currentInterest"
          label="Current Interest"
          required={true}
          // disabled={true}
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
          onKeyPress={preventMinus}
          onChange={(e) => {
            handleInputChangeWithComma(e, setFormData);
          }}
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
          <Button disabled={loading} variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            disabled={loading}
            variant="secondary"
            onClick={handleCorrectLoan}
          >
            Correct
          </Button>
        </div>
      </div>

      <SuccessModal
        isOpen={successModal.state}
        title="Loan Correction Successful"
        description={successModal.description}
        noButtons={true}
        onClose={() => {
          setSuccessModal({
            state: false,
            description: "",
          });
          handleClose();
        }}
      />
      <CancelModal
        isOpen={failedModal.state}
        title="Loan Correction Failed"
        description={failedModal.description}
        noButtons={true}
        onClose={() =>
          setFailedModal({
            state: false,
            description: "",
          })
        }
      />
    </div>
  );
};

export default CorrectLoanModal;
