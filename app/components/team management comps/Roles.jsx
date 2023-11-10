import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { FiFilter, FiSearch } from "react-icons/fi";
import { MdOutlineSort } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import RolesModal from "../modals/teamManagement/RolesModal";
import ReusableDataTable from "../shared/tables/ReusableDataTable";
import { AiOutlinePlus } from "react-icons/ai";

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
      <div className=" py-2 mt-10">
        <p className="px-6 text-lg font-semibold">Role list</p>

        <ReusableDataTable
          dataTransformer={customDataTransformer}
          apiEndpoint="https://sw-staging.onrender.com/api/role/all"
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
              <p className="hidden lg:block">New role</p>
            </div>
          }
        />
        <RolesModal isOpen={isModal} onClose={handleCloseModal} />
      </div>
    </main>
  );
};

export default Roles;
