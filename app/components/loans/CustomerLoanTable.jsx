"use client";
import { formatDate } from "@/helpers";
import ReusableDataTable from "../shared/tables/ReusableDataTable";
const CustomerLoanTable = ({ id }) => {
  const headers = [
    { id: "createdAt", label: "Date Created" },
    // { id: "name", label: "Name & ID" },
    { id: "loanPackageId", label: "Loan package & ID" },
    { id: "loanAmount", label: "Loan Amount" },
    { id: "status", label: "Loan Status" },
  ];

  const customDataTransformer = (apiData) => {
    return apiData?.map((item) => ({
      id: item._id,
      createdAt: (
        <div className="text-md font-[500] text-gray-700">
          {formatDate(item.createdAt?.slice(0, 10))}
        </div>
      ),
      // name: (
      //   <div>
      //     <div className="text-md font-[500] text-gray-700">{`${item?.customerId?.firstName} ${item?.customerId?.lastName}`}</div>
      //     <div className="text-xs text-gray-500">Borrower&apos;s ID</div>
      //   </div>
      // ),
      loanPackageId: (
        <div>
          <div className="text-md font-[500] text-gray-700">{`${item?.loanPackage?.name}`}</div>
          <div className="text-xs text-gray-500">SWL-{`${item?.loanId}`}</div>
        </div>
      ),
      loanAmount: (
        <div>
          <div className="text-md font-[500] text-gray-700">
            ₦ {item?.loanAmount.toLocaleString()}
          </div>
        </div>
      ),
      status: (
        <button
          className={`${
            item.status === "Pending"
              ? "bg-swIndicatorLightRed"
              : item.status === "In Progress"
              ? "bg-swIndicatorYellow"
              : item.status === "Ready for Disbursal"
              ? "bg-swIndicatorPurple"
              : item.status === "Disbursed"
              ? "bg-swBlue"
              : item.status === "Fully Paid"
              ? "bg-swGreen"
              : "bg-swIndicatorDarkRed"
          } px-2 py-1 rounded-full text-xs font-normal text-white`}
        >
          {item.status}
        </button>
      ),
    }));
  };
  return (
    <ReusableDataTable
      dataTransformer={customDataTransformer}
      onClickRow="/loan-applications/view-loan"
      headers={headers}
      initialData={[]}
      apiEndpoint={`https://secondwallet-stag.onrender.com/api/loan-application/customer/${id}`}
      // btnText={
      //   <div className="flex gap-1 items-center p-1">
      //     <p className="hidden lg:block">create customer</p>
      //   </div>
      // }
      // btnTextClick={() => {
      //   router.push("/create-borrower");
      // }}
      filters={true}
      pagination={false}
    />
  );
};

export default CustomerLoanTable;
