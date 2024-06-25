"use client";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import Loader from "@/app/components/shared/Loader";
import { getSingleAsset } from "@/redux/slices/assetManagementSlice";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FiEdit2, FiTrash } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import DeleteAssetModal from "@/app/components/modals/DeleteAssetModal";

const ViewAsset = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { data } = useSelector((state) => state.asset);
  console.log("aseet data", data);

  useEffect(() => {
    dispatch(getSingleAsset(id));
    setLoading(false);
  }, []);
  return (
    <DashboardLayout isBackNav={true} paths={["Assetmanagement", "View asset"]}>
      <main className="mx-auto max-w-4xl py-10 px-5">
        <div className="ml-auto flex gap-2 justify-end font-semibold">
          <Link
            href={`/asset-management/${id}/edit-asset`}
            className="border py-2 px-3 flex gap-2 items-center rounded-lg"
          >
            Edit
            <FiEdit2 size={20} />
          </Link>
          <p
            className="border py-2 px-3 flex gap-2 items-center rounded-lg cursor-pointer"
            onClick={() => setOpenDeleteModal(true)}
          >
            Delete
            <FiTrash size={20} />
          </p>
        </div>

        <div className="flex justify-between mt-5 p-5 border-b">
          <p className="font-semibold text-xl">Asset Details</p>
        </div>

        <div className="p-5 flex flex-col gap-5 font-500">
          <p className="text-lg font-semibold">Investment product interest</p>
          <div className="flex">
            <p className="min-w-[15rem]">Asset</p>
            <p>{data?.data?.name}</p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Asset category</p>
            <p>{data?.data?.category?.name}</p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Acquisition date</p>
            <p>
              {data?.data?.acquisitionDate &&
                format(new Date(data?.data?.acquisitionDate), "PPP")}
            </p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Description</p>
            <p>{data?.data?.description}</p>
          </div>
          <div className="flex">
            <p className="min-w-[15rem]">Value</p>
            <p>{data?.data?.value?.toLocaleString()}</p>
          </div>
        </div>
      </main>
      <Loader isOpen={loading} />
      <DeleteAssetModal open={openDeleteModal} onClose={setOpenDeleteModal} />
    </DashboardLayout>
  );
};

export default ViewAsset;
