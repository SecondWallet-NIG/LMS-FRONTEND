import { CiSearch } from "react-icons/ci";
import { FaBell } from "react-icons/fa";
import { HiMiniUserCircle } from "react-icons/hi2";
import PagePath from "./PagePath";

const NavBar = () => {
  return (
    <main className="fixed bg-white flex justify-between items-center p-[0.68rem] ml-auto border-b border-b-swGray w-3/4 lg:w-[78%] xl:w-4/5 px-10 z-50">
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
    </main>
  );
};

export default NavBar;
