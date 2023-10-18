"use client";
import { useState, useEffect } from "react";
import { FiFilter, FiSearch } from "react-icons/fi";
import TeamManagementCard from "../cards/Team management card/TeamManagementCard";
import { MdOutlineSort } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import { BiPlus } from "react-icons/bi";
import StaffsModal from "../modals/teamManagement/StaffsModal";
import { useDispatch, useSelector } from "react-redux";
import { getRoles } from "@/redux/slices/roleSlice";
import SuccessModal from "../modals/SuccessModal";
import ReusableDataTable from "../shared/tables/ReusableDataTable";
import Button from "../shared/buttonComponent/Button";
const Staffs = () => {
  const [isModal, setIsModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector((state) => state.role);
  const headers = [
    { id: "name", label: "Name and Staff ID" },
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
      name: (
        <div>
          <div className="text-md font-semibold text-gray-700">{`${item.firstName} ${item.lastName}`}</div>
          <div className="text-xs text-gray-500">{`SWS-${item.staffId}`}</div>
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
      createdAt: item.createdAt?.slice(0, 10),
    }));
  };

  useEffect(() => {
    dispatch(getRoles());
  }, []);

  return (
    <main>
      <TeamManagementCard />
      <div className="px-6 py-2">
        <div className="flex  justify-between">
          <p className="text-lg font-semibold">Staff list</p>
          <Button
            onClick={handleOpenModal}
            className="bg-swBlue text-white py-2 px-4 rounded-md hover:bg-bswBlue"
          >
            Add Staff
          </Button>
        </div>
        <div className="flex justify-between items-center">
          <ReusableDataTable
            dataTransformer={customDataTransformer}
            apiEndpoint="https://secondwallet-stag.onrender.com/api/user"
            initialData={[]}
            headers={headers}
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
    </main>
  );
};

export default Staffs;
