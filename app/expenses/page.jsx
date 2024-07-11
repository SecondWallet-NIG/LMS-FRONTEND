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
import {
  getAllExpenseCategories,
  getAllExpenses,
} from "@/redux/slices/expenseManagementSlice";

const header = [
  { id: "date", label: "Date" },
  { id: "description", label: "Description" },
  { id: "category", label: "Expense Category" },
  { id: "amount", label: "Amount" },
  { id: "status", label: "Status" },
];

const customDataTransformer = (apiData) => {
  console.log({ apiData });
  return apiData?.expenses?.map((item, i) => ({
    id: item?._id,
    date: (
      <div className="text-md font-[500] text-gray-700">
        {format(new Date(item?.date), "PPP")}
      </div>
    ),
    description: (
      <div className="text-md font-[500] text-gray-700">
        {item?.description}
      </div>
    ),
    category: (
      <div className="text-md font-[500] text-gray-700">
        {item?.category?.name}
      </div>
    ),
    amount: (
      <div className="text-md font-[500] text-gray-700">{item?.amount}</div>
    ),
    status: (
      <div className="text-xs font-[500] text-gray-700">
        <div className="py-1 px-2 border rounded-md flex w-fit text-xs items-center gap-1">
          <div
            className={`h-1 w-1 rounded-full ${
              item?.status === "New" ? "bg-green-500" : "bg-red-500"
            }`}
          />
          {item?.status}
        </div>
      </div>
    ),
  }));
};

const Expenses = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [pageState, setPageState] = useState("expenses");
  const [expenses, setExpenses] = useState([]);
  const [openCreateAssetModal, setOpenCreateModal] = useState(false);
  const [openDeleteAssetModal, setOpenDeleteModal] = useState(false);
  const [expenseTypeOptions, setExpenseTypeOptions] = useState([]);
  const { data } = useSelector((state) => state.expense);

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
      expenses?.length > 0
        ? expenses.map(
            (data) =>
              data?.date &&
              // format(new Date(data?.acquisitionDate), "PPP")
              format(new Date(data?.date), "d MMM yy")
          )
        : [],
    datasets: [
      {
        label: "Cost",
        data: expenses?.map((data) => data?.amount) ?? [],
        backgroundColor: "#fff",
        borderColor: "#fff",
      },
    ],
  };

  // revenue.map((data) => console.log(data.label));
  useEffect(() => {
    dispatch(getAllExpenses());
    dispatch(getAllExpenseCategories())
      .unwrap()
      .then((res) => {
        // console.log("categories", res?.data);
        setExpenseTypeOptions(res?.data);
      })
      .catch((err) => console.log({ err }));
    setLoading(false);
  }, []);
  useEffect(() => {
    setExpenses(data?.data?.expenses);
  }, [data]);

  console.log("categories", expenseTypeOptions);
  return (
    <>
      {/* {loading ? (
        <div>Loading...</div>
      ) : (*/}
      <DashboardLayout isBackNav={true} paths={["Expenses"]}>
        <div className="pt-5 pl-5 flex items-centers">
          <p
            className={`hover:text-swBlue py-1 px-4 border-b-2 border-transparent cursor-pointer font-medium ${
              pageState === "expenses" &&
              "border-b-swBlue text-swBlue font-semibold"
            }`}
            onClick={() => setPageState("expenses")}
          >
            Expenses
          </p>
          <p
            className={`hover:text-swBlue py-1 px-4 border-b-2 border-transparent cursor-pointer font-medium ${
              pageState === "expenses category" &&
              "border-b-swBlue text-swBlue font-semibold"
            }`}
            onClick={() => setPageState("expenses category")}
          >
            Expenses Category
          </p>
        </div>
        {pageState === "expenses" && (
          <>
            <div className="p-5">
              <div className="w-full bg-swBlue text-white rounded-3xl">
                <BarChart options={options} data={chartData} />
              </div>
              <div className="flex items-center justify-end gap-5 mt-5">
                <Link
                  href={"/create-new-expense"}
                  className="flex gap-1 items-center py-2 px-3 cursor-pointer border text-white hover:text-swBlue bg-swBlue hover:bg-white border-swBlue rounded-md focus:outline-none whitespace-nowrap"
                >
                  <IoMdAdd size={20} />
                  <p>New expenses</p>
                </Link>
                {/* <div
              // onClick={savedLoans}
              className="flex gap-1 items-center py-2 px-3 cursor-pointer border  text-swBlue hover:text-white hover:bg-swBlue border-swBlue rounded-md focus:outline-none whitespace-nowrap"
            >
              <IoMdAdd size={20} />
              <p>Asset category</p>
            </div> */}
              </div>
            </div>

            <ReusableDataTable
              dataTransformer={customDataTransformer}
              onClickRow="/expenses/view-expense"
              headers={header}
              initialData={[]}
              apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/expense`}
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
        {pageState === "expenses category" && (
          <div className="p-10 text-black">
            <div className="flex justify-end items-center gap-5">
              <button
                onClick={() => setOpenCreateModal(!openCreateAssetModal)}
                className="flex gap-1 items-center py-2 px-3 cursor-pointer border text-white hover:text-swBlue bg-swBlue hover:bg-white border-swBlue rounded-md focus:outline-none whitespace-nowrap"
              >
                <IoMdAdd size={20} />
                <p>Add expense category</p>
              </button>
              {/* <button
                onClick={() => setOpenDeleteModal(!openDeleteAssetModal)}
                className="flex gap-1 items-center py-2 px-3 cursor-pointer border  text-swBlue hover:text-white hover:bg-swBlue border-swBlue rounded-md focus:outline-none whitespace-nowrap"
              >
                <p>Delete expense category</p>
              </button> */}
            </div>
            <p className="text-xl font-semibold">
              Available expense categories
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-5">
              {expenseTypeOptions.length > 0 &&
                expenseTypeOptions?.map((item, index) => (
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
              setExpenseTypeOptions={setExpenseTypeOptions}
              type="expense"
            />
            <DeleteAssetCategoryModal
              open={openDeleteAssetModal}
              onClose={() => setOpenDeleteModal(false)}
              type="expense"
            />
          </div>
        )}
        <Loader isOpen={loading} />
      </DashboardLayout>
      {/* )} */}
    </>
  );
};

export default Expenses;
