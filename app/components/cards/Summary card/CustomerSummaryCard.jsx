import { BsFillStarFill, BsPentagonFill, BsTriangleFill } from "react-icons/bs";
import { FaCircle, FaSquareFull } from "react-icons/fa";
import { PiDiamondFill } from "react-icons/pi";

const Card = ({ value, title }) => {
  return (
    <div>
      <div className="p-3 bg-gray-100 text-base rounded-xl">
        <div className="flex gap-2 text-red items-center">
          <div className="text-sm text-swGray font-semibold">
            {title}
          </div>
        </div>
        <div className="flex items-center justify-between font-semibold mt-5">
          <p className="text-xl text-swBlue"><span>{title === "Total Loan Amount"  || title === "Total Commitment Fee"  ? '₦ ' : null}</span>{value}</p>
          {/* <p className="text-sm text-swGray font-light">500 NGN</p> */}
        </div>
      </div>
    </div>
  );
};
// {
//   "totalLoanAmount": 0,
//   "totalCommitmentTotal": 0,
//   "count": 0,
//   "pendingLoanCount": 0,
//   "ApprovedLoanCount": 0,
//   "DeclinedLoanCount": 0,
//   "repaymentTypes": [],
//   "interestRates": [],
//   "loanDurationMetrics": [],
//   "noOfInstallmentRepayment": 0,
//   "noOfBulletRepayment": 0,
//   "noOfInterestServicingRepayment": 0
// }
const CustomerSummaryCard = ({ data }) => {
  return (
    <main className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card title="Total Loan Amount" value={data?.totalLoanAmount?.toLocaleString()} />
      <Card title="Total Loan Count" value={data?.count} />
      <Card title="Total Commitment Fee" value={data?.totalCommitmentTotal?.toLocaleString()} />
      <Card title="Total Approved Loans" value={data?.ApprovedLoanCount} />
      <Card title="Total Declined Loans" value={data?.DeclinedLoanCount} />
      <Card title="Total Pending Loans" value={data?.pendingLoanCount} />
      <Card
        title="No of Installment Repayments"
        value={data?.noOfInstallmentRepayment}
      />
      <Card title="No of Bullet Repayments" value={data?.noOfBulletRepayment} />
      <Card
        title="No of Interest Servicing Repayments"
        value={data?.noOfInterestServicingRepayment}
      />
    </main>
  );
};

export default CustomerSummaryCard;
