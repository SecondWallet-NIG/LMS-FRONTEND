"use client";
import { useState, useEffect } from "react";
import TeamManagementCard from "../cards/Team management card/TeamManagementCard";
import StaffsModal from "../modals/teamManagement/StaffsModal";
import { useDispatch, useSelector } from "react-redux";
import { getRoles } from "@/redux/slices/roleSlice";
import SuccessModal from "../modals/SuccessModal";
import ReusableDataTable from "../shared/tables/ReusableDataTable";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlinePlus } from "react-icons/ai";

const Staffs = () => {
  const [isModal, setIsModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error, data } = useSelector((state) => state?.role);

  const headers = [
    { id: "name", label: "Name and Staff ID" },
    {id: "email", label: "Email"},
    { id: "role", label: "Staff Role" },
    { id: "status", label: "Status" },
    { id: "createdAt", label: "Date Added" },
  ];
  const handleOpenModal = () => {
    setIsModal(true);
  };

  const handleCloseModal = () => {
    setIsModal(false);
  };

  const customDataTransformer = (apiData) => {
    return apiData?.results.map((item) => ({
      id: item._id,
      name: (
        <div>
          <div className="text-md font-semibold text-gray-700">{`${item.firstName} ${item.lastName}`}</div>
          <div className="text-xs text-gray-500">{`SWS-${item.staffId}`}</div>
        </div>
      ),
      email: (
        <div>
          <div className="text-md underline text-swBlue">{item.email}</div>
       
        </div>
      ),
      status: (
        <button
          className={`${
            item.status === "Active"
              ? "bg-[#E7F1FE] text-swBlue text-xs font-normal px-2 py-1 rounded-full"
              : "bg-[#F8A9A3] "
          } px-2 py-1 rounded`}
        >
          {item.status}
        </button>
      ),
      role: (
        <div className="text-md font-semibold text-gray-700">
          {item?.role?.name}
        </div>
      ),
      createdAt: (
        <div className="text-md font-semibold text-gray-700">
          {item.createdAt?.slice(0, 10)}
        </div>
      ),
    }));
  };

  useEffect(() => {
    dispatch(getRoles());
  }, []);

  return (
    <div>
      <ToastContainer />
      {/* <TeamManagementCard /> */}
      <div className="py-2">
        <div className="flex justify-between items-center">
          <ReusableDataTable
            dataTransformer={customDataTransformer}
            apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/api/user`}
            onClickRow={"/team-management/staff/"}
            initialData={[]}
            headers={headers}
            filters={true}
            pagination={true}
            btnText={
              <div
                className="flex gap-1 items-center p-1"
                onClick={handleOpenModal}
              >
                <AiOutlinePlus size={15} />
                <p className="hidden lg:block">New staff</p>
              </div>
            }
          />
          <div className="flex gap-3 mt-3 items-center">
            <StaffsModal
              data={data}
              isOpen={isModal}
              onClose={handleCloseModal}
              selected={setIsSuccess}
            />
            <SuccessModal
              isOpen={isSuccess}
              onClose={() => setIsSuccess(false)}
              btnLeft="Cancel"
              btnRight="Add Staff"
              description="Staff has been created and an email notification has been sent to the recipent email"
              title="Successfully created"
              btnLeftFunc={() => setIsSuccess(false)}
              btnRightFunc={() => setIsSuccess(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Staffs;