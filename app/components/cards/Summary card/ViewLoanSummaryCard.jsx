import { BsFillStarFill, BsPentagonFill, BsTriangleFill } from "react-icons/bs";
import { FaCircle, FaSquareFull } from "react-icons/fa";
import { PiDiamondFill } from "react-icons/pi";

const ViewLoanSummaryCard = ({ data }) => {
  return (
    <main className="grid grid-cols-3 gap-4">
      {data.map((item, index) => (
        <div key={index} className="p-3 bg-gray-100 text-base rounded-xl">
          <div className="flex gap-2 text-red items-center">
            <p className="capitalize font-medium text-sm  text-swGray">
              {item.loan_detail.replace(/_/g, " ")}
            </p>
          </div>
          <div className="flex items-center justify-between font-semibold mt-5">
            <p className="text-xl text-[#0088B5]">{item.amount}</p>
            <p className="text-sm text-swGray font-light">
              {item.period_or_interest}
            </p>
          </div>
        </div>
      ))}
    </main>
  );
};

export default ViewLoanSummaryCard;
