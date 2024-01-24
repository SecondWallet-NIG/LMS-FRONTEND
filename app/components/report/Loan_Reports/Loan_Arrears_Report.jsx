import { PiCalendarBlankLight } from "react-icons/pi";
import ReusableDataTable from "../../shared/tables/ReusableDataTable";
import { useEffect, useState } from "react";
import { handleCaptureClick } from "../../helpers/utils";
import EditableButton from "../../shared/editableButtonComponent/EditableButton";
import { useRouter } from "next/navigation";
import { formatDate } from "@/helpers";
import { formatTimeToAMPM } from "@/helpers";
import Link from "next/link";

const LoanArrearsAgingReport = () => {
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");
  const [roleTag, setRoleTag] = useState("");
  const router = useRouter();

  const handleCapture = () => {
    handleCaptureClick(setLoading, "captureDiv", `Loan arrears aging report`);
  };

  const headers = [
    { id: "createdAt", label: "Date Created" },
    { id: "name", label: "Borrower's Name & ID" },
    { id: "loanPackageId", label: "Loan ID & package" },
    { id: "loanAmount", label: "Loan Amount" },
    { id: "status", label: "Status" },
    { id: "createdBy", label: "Initiated By" },
  ];

  const customDataTransformer = (apiData) => {
    const timestamp = "2023-12-19T21:16:33.883Z";
    const date = new Date(timestamp);

    return apiData?.map((item) => ({
      id: item._id,
      createdAt: (
        <div>
          <div className="text-md font-[500] text-gray-700">
            {formatDate(item.createdAt?.slice(0, 10))}
          </div>
          <div className="text-xs font-light text-gray-500 pt-2">
            {formatTimeToAMPM(item.createdAt)}
          </div>
        </div>
      ),
      name: (
        <div>
          <div className="text-md font-[500] text-gray-700">{`${item?.customer?.firstName} ${item?.customer?.lastName}`}</div>
          <div className="text-xs text-gray-500 font-light pt-2">
            {item?.customer?.customerId}
          </div>
        </div>
      ),
      loanPackageId: (
        <div>
          <div className="text-md font-[500] text-gray-700">{`${item?.loanPackage?.name}`}</div>
          <div className="text-xs text-gray-500 pt-2">
            SWL-{`${item?.loanId}`}
          </div>
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
      createdBy: (
        <div>
          <div className="text-md font-[500] text-swDarkGreen">
            {item?.createdBy?.firstName} {item?.createdBy?.lastName}
          </div>
          <div className="text-md font-[500] text-gray-700">
            <Link
              className="underline"
              href={`/team-management/staff/${item?.createdBy?._id}`}
            >
              {item?.createdBy?.email}
            </Link>
          </div>
        </div>
      ),
    }));
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (typeof window !== "undefined") {
          const storedUser = JSON.parse(localStorage.getItem("user"));
          setUserId(storedUser?.data?.user?._id || "");
          setRole(storedUser?.data?.user?.role?.name || "");
          setRoleTag(storedUser?.data?.user?.role?.tag || "");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [router.pathname]);

  return (
    <main className="w-full rounded-lg bg-swLightGray p-5 shadow-xl">
      <div id="captureDiv" className="p-2">
        <div className="flex justify-between">
          <p className="text-lg font-semibold text-black">
            Loan Arears Ageing Report
          </p>
          {/* <button
          className={
            "py-2 px-4 text-white text-sm bg-swBlue font-semibold rounded-md"
          }
        >
          Export report
        </button> */}
          <EditableButton
            blueBtn={true}
            label={loading ? "Exporting" : "Export"}
            disabled={loading ? true : false}
            className={"text-swGray"}
            onClick={handleCapture}
          />
        </div>

        <div className="flex justify-between items-center mt-5">
          <p className="font-semibold text-black">Filter report</p>
          <div className="flex gap-3">
            <button
              className={
                "py-2 px-4 font-semibold text-sm border border-gray-200 rounded-md flex gap-2 items-center"
              }
            >
              <PiCalendarBlankLight size={20} />
              Select date range
            </button>
            <button
              className={
                "py-2 px-4 font-semibold text-sm border border-gray-200 rounded-md"
              }
            >
              Loan status
            </button>
            <button
              className={
                "py-2 px-4 font-semibold text-sm border border-gray-200 rounded-md"
              }
            >
              Outstanding Range
            </button>
          </div>
        </div>

        <div className="flex gap-5 mt-5">
          <div className="bg-white border rounded-xl p-3 w-full">
            <p className="font-semibold">Overdue payments</p>

            <p className="text-2xl font-bold mt-3">700</p>
          </div>
          <div className="bg-white border rounded-xl p-3 w-full">
            <p className="font-semibold">Amount of overdue payments</p>
            <p className="text-2xl font-bold mt-3">23,028,258.36</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl overflow-hidden border mt-5 bg-white">
        {userId && (
          <ReusableDataTable
            filterParams={[
              { name: "Pending" },
              { name: "Ready for Disbursal" },
              { name: "In Progress" },
              { name: "Declined" },
              { name: "Disbursed" },
              { name: "Fully Paid" },
              { name: "Cancelled Disbursement" },
            ]}
            dataTransformer={customDataTransformer}
            onClickRow="/loan-applications/view-loan"
            headers={headers}
            initialData={[]}
            apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/loan-application/all`}
            btnText={
              <div className="flex gap-1 items-center p-1">
                <p className="hidden lg:block">create loan</p>
              </div>
            }
            btnTextClick={() => {
              roleTag === "LO"
                ? router.push("/create-loan")
                : router.push("/unauthorized");
            }}
            filters={true}
            pagination={true}
            userId={userId}
            role={"Overdue"}
          />
        )}
      </div>
    </main>
  );
};

export default LoanArrearsAgingReport;
