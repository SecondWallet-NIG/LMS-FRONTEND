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
  { id: "description", label: "Description" },
  { id: "acquisitionDate", label: "Acquisition Date" },
  { id: "value", label: "Value" },
  // { id: "action", label: "Action" },
];

const customDataTransformer = (apiData) => {
  console.log({ apiData });
  return apiData?.results?.map((item, i) => ({
    id: item?._id,
    asset: <div className="text-md font-[500] text-gray-700">{item?.name}</div>,
    category: (
      <div className="text-md font-[500] text-gray-700">
        {item?.category?.name}
      </div>
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
    // action: (
    //   <div className="text-md font-[500] text-gray-700">
    //     <Link
    //       href={`/asset-management/${item?._id}/view-asset`}
    //       className="border rounded p-2"
    //     >
    //       View details
    //     </Link>
    //   </div>
    // ),
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
      {/* {loading ? (
        <div>Loading...</div>
      ) : ( */}
      <DashboardLayout isBackNav={true} paths={["Asset Management"]}>
        <div className="pt-5 pl-5 flex items-centers">
          <p
            className={`hover:text-swBlue py-1 px-4 border-b-2 border-transparent cursor-pointer font-medium ${
              pageState === "asset" && "border-b-swBlue text-swBlue font-semibold"
            }`}
            onClick={() => setPageState("asset")}
          >
            Asset
          </p>
          <p
            className={`hover:text-swBlue py-1 px-4 border-b-2 border-transparent cursor-pointer font-medium ${
              pageState === "asset category" && "border-b-swBlue text-swBlue font-semibold"
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
                {/* <div
                  onClick={() => setOpenCreateModal(!openCreateAssetModal)}
                  className="flex gap-1 items-center py-2 px-3 cursor-pointer border  text-swBlue hover:text-white hover:bg-swBlue border-swBlue rounded-md focus:outline-none whitespace-nowrap"
                >
                  <IoMdAdd size={20} />
                  <p>Asset category</p>
                </div> */}
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
            <div className="flex justify-end items-center gap-5">
              <div
                onClick={() => setOpenCreateModal(!openCreateAssetModal)}
                className="flex gap-1 items-center py-2 px-3 cursor-pointer border text-white hover:text-swBlue bg-swBlue hover:bg-white border-swBlue rounded-md focus:outline-none whitespace-nowrap"
              >
                <IoMdAdd size={20} />
                <p>Add asset category</p>
              </div>
              {/* <div
                aria-disabled="true"
                onClick={() => setOpenDeleteModal(!openDeleteAssetModal)}
                className="flex gap-1 items-center py-2 px-3 cursor-pointer border  text-swBlue hover:text-white hover:bg-swBlue border-swBlue rounded-md focus:outline-none whitespace-nowrap"
              >
                <IoMdAdd size={20} />
                <p>Delete asset category</p>
              </div> */}
            </div>
            <p className="text-xl font-semibold">Available asset categories</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-5">
              {assetTypeOptions.length > 0 &&
                assetTypeOptions?.map((item, index) => (
                  <div
                    key={index}
                    className="border rounded-xl p-4 flex flex-col gap-1"
                  >
                    <div className="">
                      <p className="font-semibold  text-sm">{item?.name}</p>
                      <p className="font-medium text-swGray text-xs mt-2">
                        {item?.description}
                        {/* HEllo there */}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
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
