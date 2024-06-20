"use client";
import { useEffect, useState } from "react";
import BarChart from "../components/chart/BarChart";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import ReusableDataTable from "../components/shared/tables/ReusableDataTable";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { getAllAssets } from "@/redux/slices/assetManagementSlice";
import { IoMdAdd } from "react-icons/io";
import Link from "next/link";

const header = [
  { id: "asset", label: "Asset" },
  { id: "category", label: "Category" },
  { id: "description", label: "Description" },
  { id: "acquisitionDate", label: "Acquisition Date" },
  { id: "value", label: "Value" },
];

const customDataTransformer = (apiData) => {
  console.log({ apiData });
  return apiData?.results?.map((item, i) => ({
    id: item?._id,
    asset: <div className="text-md font-[500] text-gray-700">{item?.name}</div>,
    category: (
      <div className="text-md font-[500] text-gray-700">{item?.category}</div>
    ),
    description: (
      <div className="text-md font-[500] text-gray-700">
        {item?.description}
      </div>
    ),
    acquisitionDate: (
      <div>
        <div className="text-md font-[500] text-gray-700">
          {item?.acquisitionDate &&
            format(new Date(item?.acquisitionDate), "PPP")}
        </div>
      </div>
    ),
    value: (
      <div className="text-md font-[500] text-gray-700">
        {item?.value?.toLocaleString()}
      </div>
    ),
  }));
};

const Expenses = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [assets, setAssets] = useState([]);
  const { data } = useSelector((state) => state.asset);

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Set to false to allow custom height
    elements: {
      line: {
        tension: 0.5,
      },
    },
    color: "#fff",
    scales: {
      x: {
        ticks: {
          color: "#fff",
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: "#fff",
        },
        grid: {
          display: false,
        },
      },
    },
  };

  const chartData = {
    labels:
      assets?.length > 0
        ? assets.map(
            (data) =>
              data?.acquisitionDate &&
              // format(new Date(data?.acquisitionDate), "PPP")
              format(new Date(data?.acquisitionDate), "d MMM yy")
          )
        : [],
    datasets: [
      {
        label: "Cost",
        data: assets?.map((data) => data?.value) ?? [],
        backgroundColor: "#fff",
        borderColor: "#fff",
      },
    ],
  };

  // revenue.map((data) => console.log(data.label));
  useEffect(() => {
    setLoading(false);
    dispatch(getAllAssets());
  }, []);
  useEffect(() => {
    setAssets(data?.data?.results);
  }, [data]);


  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <DashboardLayout paths={["Asset management"]}>
          <div className="p-5">
            <div className="w-full bg-swBlue text-white rounded-3xl">
              <BarChart options={options} data={chartData} />
            </div>
            <div className="flex items-center justify-end gap-5 mt-5">
              <Link
                href={"/create-new-asset"}
                className="flex gap-1 items-center py-2 px-3 cursor-pointer border text-white hover:text-swBlue bg-swBlue hover:bg-white border-swBlue rounded-md focus:outline-none whitespace-nowrap"
              >
                <IoMdAdd size={20} />
                <p>New asset</p>
              </Link>
              <div
                // onClick={savedLoans}
                className="flex gap-1 items-center py-2 px-3 cursor-pointer border  text-swBlue hover:text-white hover:bg-swBlue border-swBlue rounded-md focus:outline-none whitespace-nowrap"
              >
                <IoMdAdd size={20} />
                <p>Asset category</p>
              </div>
            </div>
          </div>

          <ReusableDataTable
            dataTransformer={customDataTransformer}
            // onClickRow="/borrowers/profile"
            headers={header}
            initialData={[]}
            apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/asset/all`}
            // btnText={
            //   <div className="flex gap-1 items-center p-1">
            //     <AiOutlinePlus size={15} />
            //     <p className="">create borrower</p>
            //   </div>
            // }
            // btnTextClick={() => {
            //   router.push("/create-borrower");
            // }}
            filters={true}
            pagination={true}
          />
        </DashboardLayout>
      )}
    </>
  );
};

export default Expenses;
