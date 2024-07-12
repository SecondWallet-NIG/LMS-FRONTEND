"use client";
import { useEffect, useState } from "react";
import BarChart from "../components/chart/BarChart";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import ReusableDataTable from "../components/shared/tables/ReusableDataTable";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAssetCategories,
  getAllAssets,
} from "@/redux/slices/assetManagementSlice";
import { IoMdAdd } from "react-icons/io";
import Link from "next/link";
import CreateAssetModal from "../components/modals/CreateAssetModal";
import Loader from "../components/shared/Loader";
import DeleteAssetCategoryModal from "../components/modals/DeleteAssetCategoryModal";

const header = [
  { id: "asset", label: "Asset" },
  { id: "category", label: "Category" },
  { id: "acquisitionDate", label: "Acquisition Date" },
  { id: "value", label: "Value" },
];

const headerAssetCategory = [
  { id: "name", label: "Asset Category Name" },
  { id: "createdAt", label: "Date Created" },
];

const customDataTransformer = (apiData) => {
  return apiData?.results?.map((item, i) => ({
    id: item?._id,
    asset: (
      <div className="text-lg font-[500] text-gray-700 font-light">
        {item?.name}
      </div>
    ),
    category: (
      <div className="text-lg font-[500] text-gray-700 font-light">
        {item?.category?.name}
      </div>
    ),
    acquisitionDate: (
      <div>
        <div className="text-lg font-[500] text-gray-700 font-light">
          {item?.acquisitionDate &&
            format(new Date(item?.acquisitionDate), "PPP")}
        </div>
      </div>
    ),
    value: (
      <div className="text-lg font-[500] text-gray-700 font-light">
        {item?.value?.toLocaleString()}
      </div>
    )
  }));
};
const customDataTransformerAssetCategory = (apiData) => {
  return apiData?.map((item, i) => ({
    asset: (
      <div className="text-lg font-[500] text-gray-700 font-light">
        {item?.name}
      </div>
    ),
    name: (
      <div className="text-lg font-[500] text-gray-700 font-light">
        {item?.name}
      </div>
    ),
    createdAt: (
      <div>
        <div className="text-lg font-[500] text-gray-700 font-light">
          {item?.createdAt && format(new Date(item?.createdAt), "PPP")}
        </div>
      </div>
    ),
  }));
};

const AssetManagement = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [pageState, setPageState] = useState("asset");
  const [assets, setAssets] = useState([]);
  const [openCreateAssetModal, setOpenCreateModal] = useState(false);
  const [openDeleteAssetModal, setOpenDeleteModal] = useState(false);
  const [assetTypeOptions, setAssetTypeOptions] = useState([]);
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
    dispatch(getAllAssets());
    dispatch(getAllAssetCategories())
      .unwrap()
      .then((res) => setAssetTypeOptions(res?.data))
      .catch((err) => console.log({ err }));
    setLoading(false);
  }, []);
  useEffect(() => {
    setAssets(data?.data?.results);
  }, [data]);

  console.log({ assetTypeOptions });
  return (
    <>
      <DashboardLayout isBackNav={true} paths={["Asset Management"]}>
        <div className="pt-5 pl-5 flex items-centers">
          <p
            className={`hover:text-swBlue py-1 px-4 border-b-2 border-transparent cursor-pointer font-medium ${
              pageState === "asset" &&
              "border-b-swBlue text-swBlue font-semibold"
            }`}
            onClick={() => setPageState("asset")}
          >
            Asset
          </p>
          <p
            className={`hover:text-swBlue py-1 px-4 border-b-2 border-transparent cursor-pointer font-medium ${
              pageState === "asset category" &&
              "border-b-swBlue text-swBlue font-semibold"
            }`}
            onClick={() => setPageState("asset category")}
          >
            Asset Category
          </p>
        </div>
        {pageState === "asset" && (
          <>
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
  
              </div>
            </div>

            <ReusableDataTable
              dataTransformer={customDataTransformer}
              onClickRow={`/asset-management/view-asset`}
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
          </>
        )}
        {pageState === "asset category" && (
          <div className="p-10 text-black">
            <div className="flex justify-end items-center gap-5 mb-4">
              <div
                onClick={() => setOpenCreateModal(!openCreateAssetModal)}
                className="flex gap-1 items-center py-2 px-3 cursor-pointer border text-white hover:text-swBlue bg-swBlue hover:bg-white border-swBlue rounded-md focus:outline-none whitespace-nowrap"
              >
                <IoMdAdd size={20} />
                <p>Add Asset Category</p>
              </div>
            </div>

            <ReusableDataTable
              dataTransformer={customDataTransformerAssetCategory}
              headers={headerAssetCategory}
              initialData={[]}
              apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/asset-category`}
              filters={false}
              pagination={false}
              btnText={
                <div className="flex gap-1 items-center p-1">
                  <p className="">Add Asset Category</p>
                </div>
              }
              btnTextClick={() => {
                setOpenCreateModal(!openCreateAssetModal)
              }}
            />
            <CreateAssetModal
              open={openCreateAssetModal}
              onClose={setOpenCreateModal}
              setAssetTypeOptions={setAssetTypeOptions}
              type="asset"
            />
            <DeleteAssetCategoryModal
              open={openDeleteAssetModal}
              onClose={() => setOpenDeleteModal(false)}
              type="asset"
            />
          </div>
        )}
        <Loader isOpen={loading} />
      </DashboardLayout>
      {/* )} */}
    </>
  );
};

export default AssetManagement;
