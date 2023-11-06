import { CiSearch } from "react-icons/ci";
import { FaBell } from "react-icons/fa";
import { HiMiniUserCircle } from "react-icons/hi2";
import PagePath from "./PagePath";

const NavBar = () => {
  return (
    <nav className="fixed bg-white flex justify-between items-center p-[0.68rem] border-b right-0 border-b-gray-300 w-[95%] px-5 z-[100]">
      <PagePath />
      <div className=" flex gap-5 items-center">
        <div className="relative">
          <FaBell size={20} />
          <div className="bg-swGreen h-2 w-2 rounded-full top-0 right-0 absolute" />
        </div>
        <div className="relative">
          <HiMiniUserCircle size={50} />
          <div className="bg-swYellow h-3 w-3 rounded-full bottom-1 right-1 absolute" />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
