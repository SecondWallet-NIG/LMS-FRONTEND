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
import { getSingleExpense } from "@/redux/slices/expenseManagementSlice";

const ViewExpense = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(true);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    dispatch(getSingleExpense(id))
      .unwrap()
      .then((res) => setData(res?.data))
      .catch((error) => console.log(error.message));
    setLoading(false);
  }, []);

  return (
    <DashboardLayout isBackNav={true} paths={["Expenses", "View expense"]}>
      <main className="mx-auto max-w-4xl py-10 px-5">
        <div className="ml-auto flex gap-2 justify-end font-semibold">
          <Link
            href={`/expenses/edit-expense/${id}`}
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
          <p className="font-semibold text-xl">Expense Details</p>
        </div>

        <div className="p-5 flex flex-col gap-5 font-500">
          <div className="flex flex-col sm:flex-row">
            <p className="min-w-[15rem]">Date</p>
            <p>
              {data?.expenseDate && format(new Date(data?.expenseDate), "PPP")}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row">
            <p className="min-w-[15rem]">Expense category</p>
            <p>{data?.category?.name}</p>
          </div>
          <div className="flex flex-col sm:flex-row">
            <p className="min-w-[15rem]">Amount</p>
            <p>{data?.amount?.toLocaleString()}</p>
          </div>
          <div className="flex flex-col sm:flex-row">
            <p className="min-w-[15rem]">Status</p>
            <div className="py-1 px-2 border rounded-md flex w-fit text-xs items-center gap-1">
              <div
                className={`h-1 w-1 rounded-full ${
                  data?.status === "New" ? "bg-green-500" : "bg-red-500"
                }`}
              />
              {data?.status}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row">
            <p className="min-w-[15rem]">Description</p>
            <p>{data?.description}</p>
          </div>
        </div>
      </main>
      <Loader isOpen={loading} />
      <DeleteAssetModal
        open={openDeleteModal}
        onClose={setOpenDeleteModal}
        type="expense"
      />
    </DashboardLayout>
  );
};

export default ViewExpense;
