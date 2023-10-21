import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { FiFilter, FiSearch } from "react-icons/fi";
import { MdOutlineSort } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import RolesModal from "../modals/teamManagement/RolesModal";
import ReusableDataTable from "../shared/tables/ReusableDataTable";

const Roles = () => {
  const [isModal, setIsModal] = useState(false);
  const headers = [
    { id: "name", label: "Role Name" },
    { id: "permissions", label: "Permissions" },
    { id: "createdAt", label: "Date Added" },
  ];

  const handleOpenModal = () => {
    setIsModal(true);
  };

  const handleCloseModal = () => {
    setIsModal(false);
  };

  const customDataTransformer = (apiData) => {
    return apiData?.map((item) => ({
      name: (
        <div>
          <div className="text-md font-semibold text-gray-700">{item.name}</div>
        </div>
      ),
      permissions: (
        <div className="text-md font-semibold text-gray-700">
          {item.permissions.map((x) => (
            <div className="capitalize" key={x}>
              {x}
            </div>
          ))}
        </div>
      ),
      createdAt: (
        <div className="text-md font-semibold text-gray-700">
          {item.createdAt?.slice(0, 10)}
        </div>
      ),
    }));
  };

  return (
    <main>
      <div className="px-6 py-2 mt-10">
        <p className="text-lg font-semibold">Role list</p>
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
                <p>New Role </p>
              </div>
            </div>
          </div>
        </div>
        <ReusableDataTable
          dataTransformer={customDataTransformer}
          apiEndpoint="https://secondwallet-stag.onrender.com/api/role/all"
          initialData={[]}
          headers={headers}
        />
        <RolesModal isOpen={isModal} onClose={handleCloseModal} />
      </div>
    </main>
  );
};

export default Roles;
