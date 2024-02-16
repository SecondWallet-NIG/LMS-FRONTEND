"use client";
import { useRouter } from "next/navigation";
import ReusableDataTable from "../../shared/tables/ReusableDataTable";
import { useEffect, useState } from "react";
import axios from "axios";

const customDataTransformer = (apiData) => {
  return apiData?.map((item) => ({
    id: item._id,
    month: (
      <div>
        <div className="text-md font-[500] text-gray-700">{item?.month}</div>
      </div>
    ),
    year: <div className="text-sm font-[400] text-swBlue">{item?.year}</div>,
    totalDisbursed: (
      <div className="text-md font-[500] text-gray-700">
        ₦{item?.totalDisbursed?.toLocaleString()}
      </div>
    ),
  }));
};

const SummaryTable = () => {
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();
  const [token, setToken] = useState("");

  const headers = [
    { id: "totalDisbursed", label: "Total Disbursed" },
    { id: "year", label: "Year" },
    { id: "month", label: "Month" },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (typeof window !== "undefined") {
          const storedUser = JSON.parse(localStorage.getItem("user"));
          console.log("Stored User:", storedUser);
          setUserId(storedUser?.data?.user?._id || "");
          setRole(storedUser?.data?.user?.role?.name || "");
          console.log("user data", storedUser?.data?.token);
          setToken(storedUser?.data?.token || "");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();

    // const tableData = async () => {
    //   // try {
    //   //   const response = await axios.get(
    //   //     `${process.env.NEXT_PUBLIC_API_URL}/report/summary/table-data`,
    //   //     {
    //   //       headers: {
    //   //         Authorization: `Bearer ${token}`,
    //   //       },
    //   //     }
    //   //   );

    //   //   console.log({ response });
    //   // } catch (error) {
    //   //   console.log({ error });
    //   // }

    //   try {
    //     const response = await axios.get(
    //       `${process.env.NEXT_PUBLIC_API_URL}/api/report/summary/table-data`,
    //       {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       }
    //     );
    //     console.log({ response });
    //   } catch (error) {
    //     console.log({ error });
    //     // if (error.response.data.error) {
    //     //   throw new Error(error.response.data.error);
    //     // }
    //   }
    // };
    // tableData();
  }, [router.pathname]);

  console;

  // useEffect(() => {

  // }, []);
  return (
    <>
      <ReusableDataTable
        // filterParams={[
        //   { name: "Pending" },
        //   { name: "Ready for Disbursal" },
        //   { name: "In Progress" },
        //   { name: "Declined" },
        //   { name: "Disbursed" },
        //   { name: "Cancelled Disbursement" },
        // ]}
        dataTransformer={customDataTransformer}
        // onClickRow="/loan-applications/view-loan"
        headers={headers}
        initialData={[]}
        apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/report/summary/table-data`}
        // btnText={
        //   <div className="flex gap-1 items-center p-1">
        //     <p className="hidden lg:block">create loan</p>
        //   </div>
        // }
        // btnTextClick={() => {
        //   router.push("/create-loan");
        // }}
        filters={true}
        pagination={true}
        userId={userId}
        role={role}
      />
    </>
  );
};

export default SummaryTable;
