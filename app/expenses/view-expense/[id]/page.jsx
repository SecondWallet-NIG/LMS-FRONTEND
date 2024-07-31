"use client";
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import Loader from "@/app/components/shared/Loader";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FiEdit2, FiTrash } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { format } from "date-fns";
import DeleteAssetModal from "@/app/components/modals/DeleteAssetModal";
import { getSingleExpense } from "@/redux/slices/expenseManagementSlice";
import { handleFileExtention } from "@/app/components/helpers/utils";
import Viewer from "react-viewer";
import { IoMdClose } from "react-icons/io";

const ViewExpense = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(true);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openFileModal, setOpenFileModal] = useState(false);
  const [updateBtns, setUpdateBtns] = useState(false);

  const handleSetUrl = (content) => {
    setUrl(content);
    // setIsOpen(true);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("user", user?.data?.user?.role?.tag);
      if (user?.data?.user?.role?.tag === "CFO") {
        setUpdateBtns(true);
      }
    }

    dispatch(getSingleExpense(id))
      .unwrap()
      .then((res) => setData(res?.data))
      .catch((error) => console.log(error.message));
    setLoading(false);
  }, []);

  // console.log("expense", data);

  return (
    <DashboardLayout isBackNav={true} paths={["Expenses", "View expense"]}>
      <main className="mx-auto max-w-4xl py-10 px-5">
        {updateBtns && (
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
        )}

        <div className="flex justify-between mt-5 p-5 border-b">
          <p className="font-semibold text-xl">Expense Details</p>
          <div className="py-1 px-2 border rounded-md flex w-fit text-xs items-center gap-1">
            <div
              className={`h-1 w-1 rounded-full ${
                data?.status === "New" ? "bg-green-500" : "bg-red-500"
              }`}
            />
            {data?.status}
          </div>
        </div>

        <div className="p-5 flex flex-col gap-5 font-500">
          <div className="flex flex-col sm:flex-row">
            <p className="min-w-[15rem]">Date</p>
            <p className="text-swBlue">
              {data?.expenseDate && format(new Date(data?.expenseDate), "PPP")}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row">
            <p className="min-w-[15rem]">Expense category</p>
            <p className="text-swBlue">{data?.category?.name}</p>
          </div>
          <div className="flex flex-col sm:flex-row">
            <p className="min-w-[15rem]">Amount</p>
            <p className="text-swBlue">{data?.amount?.toLocaleString()}</p>
          </div>
          {/* <div className="flex flex-col sm:flex-row">
            <p className="min-w-[15rem]">Status</p>
            <div className="py-1 px-2 border rounded-md flex w-fit text-xs items-center gap-1">
              <div
                className={`h-1 w-1 rounded-full ${
                  data?.status === "New" ? "bg-green-500" : "bg-red-500"
                }`}
              />
              {data?.status}
            </div>
          </div> */}
          <div className="flex flex-col sm:flex-row">
            <p className="min-w-[15rem]">Document</p>
            {/* {data?.data?.loanApplication?.applicationForm} */}
            <div>
              {data?.file != null ? (
                <div>
                  <button
                    onClick={() => {
                      handleSetUrl(data?.file);
                      setOpenFileModal(true);
                    }}
                    className="underline text-swBlue"
                  >
                    View Document
                  </button>
                  {handleFileExtention(url) === "pdf" ? (
                    // <p>It's a pdf</p>
                    <div
                      className={`h-full w-full fixed top-0 left-0 bg-black bg-opacity-25 ${
                        openFileModal ? "flex" : "hidden"
                      } justify-center items-center text-white z-[110]`}
                    >
                      <div className="max-w-3xl w-full h-[70%] m-5 p-5 bg-white">
                        <div className="flex justify-end">
                          <IoMdClose
                            size={20}
                            className="cursor-pointer text-swBlack"
                            onClick={() => setOpenFileModal(false)}
                          />
                        </div>
                        <iframe src={url} className="h-full w-full"></iframe>
                      </div>
                    </div>
                  ) : (
                    <>
                      {typeof window !== "undefined" ? (
                        <>
                          <Viewer
                            visible={openFileModal}
                            onClose={() => {
                              setOpenFileModal(false);
                            }}
                            images={[url].map((item) => ({
                              src: item,
                              key: item,
                            }))}
                          />
                        </>
                      ) : null}
                    </>
                  )}
                </div>
              ) : (
                <p className="text-swBlue">No Document</p>
              )}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row">
            <p className="min-w-[15rem]">Description</p>
            <p className="text-swBlue">{data?.description}</p>
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
