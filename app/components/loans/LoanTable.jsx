"use client";

import ReusableDataTable from "../shared/tables/ReusableDataTable";
const LoanTable = () => {
  const headers = [
    { id: "createdAt", label: "Date Created" },
    { id: "name", label: "Borrower's Name & ID" },
    { id: "loanPackageId", label: "Loan ID & package" },
    { id: "loanAmount", label: "Loan Amount" },
    { id: "status", label: "Loan Status" },
  ];

  const customDataTransformer = (apiData) => {
    return apiData?.map((item) => ({
      id: item._id,
      createdAt: (
        <div className="text-md font-[500] text-gray-700">
          {item.createdAt?.slice(0, 10)}
        </div>
      ),
      name: (
        <div>
          <div className="text-md font-[500] text-gray-700">{`${item?.customer?.firstName} ${item?.customer?.lastName}`}</div>
          <div className="text-xs text-gray-500">Borrower&apos;s ID</div>
        </div>
      ),
      loanPackageId: (
        <div>
          <div className="text-md font-[500] text-gray-700">{`${item?.loanPackage?.name}`}</div>
          <div className="text-xs text-gray-500">SWL-{`${item?.loanId}`}</div>
        </div>
      ),
      loanAmount: (
        <div>
          <div className="text-md font-[500] text-gray-700">
            ₦ {`${item?.loanAmount}`}
          </div>
        </div>
      ),
      status: (
        <button
          className={`${
            item.status === "Pending"
              ? "bg-[#E7F1FE] text-swBlue text-xs font-normal px-2 py-1 rounded-full"
              : "bg-[#F8A9A3] "
          } px-2 py-1 rounded`}
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
        apiEndpoint="https://secondwallet-stag.onrender.com/api/loan-application/all"
        btnText={
          <div className="flex gap-1 items-center p-1">
            <p className="hidden lg:block">create customer</p>
          </div>
        }
        btnTextClick={() => {
          router.push("/create-customer");
        }}
        filters={true}
        pagination={true}
      />
 
  );
};

export default LoanTable;
