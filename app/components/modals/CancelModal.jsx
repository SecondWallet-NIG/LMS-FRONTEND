import { BsXLg } from "react-icons/bs";
import { ImWarning } from "react-icons/im";
import Button from "../shared/buttonComponent/Button";

const CancelModal = ({
  isOpen,
  onClose,
  children,
  width,
  description,
  noButtons,
  btnLeft,
  btnRight,
  btnLeftFunc,
  btnRightFunc,
  title,
}) => {
  if (!isOpen) return null;
  const modalStyles = {
    width: width || "90%", // Use full width on mobile
    maxWidth: "500px", // Set a maximum width for larger screens
  };
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-50 z-[150]">
      <div className="bg-white p-4 rounded-md shadow-md" style={modalStyles}>
        <div className="flex justify-between">
          <p className="text-lg font-semibold capitalize">{title}</p>

          <button className="text-swGray pl-2 pr-2" onClick={onClose}>
            <BsXLg fontWeight="500" />
          </button>
        </div>

        <main className="max-w-3xl mx-auto p-2 mt-10 text-sm">
          <div className="flex justify-center">
            <div className="p-4 bg-orange-400 rounded-full text-white">
              <ImWarning size={40} />
            </div>
          </div>
          <div className="flex  text-center flex-col gap-5 mt-5">
            {description}
          </div>

          {!noButtons && (
            <div className="flex justify-between">
              <Button
                onClick={btnLeftFunc}
                disabled={false}
                variant={"secondary"}
                className="py-2 px-5 text-center rounded-md gap-2 border w-[180px] mt-10"
              >
                {btnLeft}
              </Button>
              <Button
                onClick={btnRightFunc}
                disabled={false}
                variant={"primary"}
                className="py-2 px-5 text-center rounded-md  gap-2 border w-[180px] mt-10"
              >
                {btnRight}
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CancelModal;
