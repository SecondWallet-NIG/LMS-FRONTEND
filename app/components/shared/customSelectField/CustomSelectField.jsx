import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

const CustomSelectField = () => {
  return (
    <main className="absolute top-0 bg-black bg-opacity-30 h-full w-full flex justify-center items-center">
      <div className="w-4/6 h-4/6 rounded-lg">
        <div className="flex gap-5 px-5 pt-5 pb-3 border">
          <div className="w-full bg-swLightGray rounded-md flex gap-1">
            <FiSearch size={20} />
            <input
              type="text"
              placeholder="Search Customer"
              className="w-full focus:outline-none"
            />
          </div>
          <div className="p-2">
            <IoClose size={20} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default CustomSelectField;
