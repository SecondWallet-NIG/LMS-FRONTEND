import { FiFilter, FiSearch } from "react-icons/fi";
import TeamManagementCard from "../cards/Team management card/TeamManagementCard";
import { MdOutlineSort } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import { BiPlus } from "react-icons/bi";
import StaffsModal from "../modals/teamManagement/StaffsModal";
import { useState } from "react";

const Staffs = () => {
  const [isModal, setIsModal] = useState(false);

  const handleOpenModal = () => {
    setIsModal(true);
  };

  const handleCloseModal = () => {
    setIsModal(false);
  };

  return (
    <main>
      <TeamManagementCard />
      <div className="px-6 py-2">
        <p className="text-lg font-semibold">Staff list</p>
        <div className="flex justify-between items-center">
          <div className="flex gap-3 mt-3 items-center">
            <div className="p-[0.11rem] hover:bg-swGray rounded-md cursor-pointer">
              <div className=" flex gap-2 items-center border border-swGray bg-white py-2 px-4 rounded-md">
                <FiFilter size={20} />
                <p>Filter</p>
              </div>
            </div>
            <div className="p-[0.11rem] hover:bg-swGray rounded-md cursor-pointer">
              <div className=" flex gap-2 items-center border border-swGray bg-white py-2 px-4 rounded-md">
                <MdOutlineSort size={20} />
                <p>Sort</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-3 items-center">
            <div className="p-[0.11rem] hover:bg-swGray rounded-md cursor-pointer">
              <div className="flex justify-center items-center border border-swGray bg-white p-2 rounded-md">
                <FiSearch size={20} />
              </div>
            </div>
            <div className="p-[0.11rem] hover:bg-swGray rounded-md cursor-pointer">
              <div className=" flex gap-2 items-center border border-swGray bg-white p-2 rounded-md">
                <SlOptionsVertical size={20} />
              </div>
            </div>
            <div className="p-[0.11rem] hover:bg-swGray rounded-md cursor-pointer">
              <div
                className=" flex gap-2 items-center bg-swBlue pl-4 pr-5 py-2 rounded-md font-semibold text-white"
                onClick={handleOpenModal}
              >
                <BiPlus size={20} />
                <p>New Staff</p>
              </div>
            </div>
            <StaffsModal isOpen={isModal} onClose={handleCloseModal} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Staffs;
