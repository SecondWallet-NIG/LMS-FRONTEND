import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

//icons
import { LuBarChart2 } from "react-icons/lu";
import { RiBox3Line } from "react-icons/ri";
import { SlCup } from "react-icons/sl";
import { FiDollarSign } from "react-icons/fi";
import { MdPeopleOutline } from "react-icons/md";
import {
  AiOutlineCalculator,
  AiFillCustomerService,
  AiOutlineSetting,
} from "react-icons/ai";
import { BiMapAlt } from "react-icons/bi";
import { CgFileDocument } from "react-icons/cg";
import { GoSignOut } from "react-icons/go";
import companyLogo from "../../public/images/Logo.png";

const SideBar = () => {
  const [isActive, setIsActive] = useState("dashboard");

  return (
    <main className="fixed md:w-3/12 xl:w-1/6 h-full left-0 border-r border-r-swGray flex flex-col font-medium">
      <div className="flex justify-center items-center p-5 border-b border-b-swGray -ml-5">
        <Image src={companyLogo} alt="company logo" />
      </div>

      <div className="py-5 border-b border-b-swGray text-sm xl:text-base">
        <div className="px-3 lg:px-8">
          <Link
            href={"#"}
            className="py-2 flex items-center gap-2 rounded-lg hover:bg-swLightGray"
            onClick={() => {
              setIsActive("dashboard");
            }}
          >
            <div
              className={`${
                isActive === "dashboard" && "bg-swBlue"
              } h-5 w-1  rounded-[23px]`}
            />
            <LuBarChart2
              className={`${isActive === "dashboard" && "text-swBlue"}`}
              size={20}
            />
            <p className={`${isActive === "dashboard" && "text-swBlue"}`}>
              Dashboard
            </p>
          </Link>
          <Link
            href={"#"}
            className="py-2 flex items-center gap-2 rounded-lg hover:bg-swLightGray"
            onClick={() => {
              setIsActive("my-tasks");
            }}
          >
            <div
              className={`${
                isActive === "my-tasks" && "bg-swBlue"
              } h-5 w-1  rounded-[23px]`}
            />
            <RiBox3Line
              className={`${isActive === "my-tasks" && "text-swBlue"}`}
              size={20}
            />
            <p className={`${isActive === "my-tasks" && "text-swBlue"}`}>
              My tasks
            </p>
          </Link>
          <Link
            href={"#"}
            className="py-2 flex items-center gap-2 rounded-lg hover:bg-swLightGray"
            onClick={() => {
              setIsActive("create-loan");
            }}
          >
            <div
              className={`${
                isActive === "create-loan" && "bg-swBlue"
              } h-5 w-1  rounded-[23px]`}
            />
            <SlCup
              className={`${isActive === "create-loan" && "text-swBlue"}`}
              size={20}
            />
            <p className={`${isActive === "create-loan" && "text-swBlue"}`}>
              Create loan
            </p>
          </Link>
          <Link
            href={"#"}
            className="py-2 flex items-center gap-2 rounded-lg hover:bg-swLightGray"
            onClick={() => {
              setIsActive("loan-applications");
            }}
          >
            <div
              className={`${
                isActive === "loan-applications" && "bg-swBlue"
              } h-5 w-1  rounded-[23px]`}
            />
            <FiDollarSign
              className={`${isActive === "loan-applications" && "text-swBlue"}`}
              size={20}
            />
            <p
              className={`${isActive === "loan-applications" && "text-swBlue"}`}
            >
              Loan applications
            </p>
          </Link>
          <Link
            href={"#"}
            className="py-2 flex items-center gap-2 rounded-lg hover:bg-swLightGray"
            onClick={() => {
              setIsActive("customers");
            }}
          >
            <div
              className={`${
                isActive === "customers" && "bg-swBlue"
              } h-5 w-1  rounded-[23px]`}
            />
            <MdPeopleOutline
              className={`${isActive === "customers" && "text-swBlue"}`}
              size={20}
            />
            <p className={`${isActive === "customers" && "text-swBlue"}`}>
              Customers
            </p>
          </Link>
          <Link
            href={"#"}
            className="py-2 flex items-center gap-2 rounded-lg hover:bg-swLightGray"
            onClick={() => {
              setIsActive("intrest-calculator");
            }}
          >
            <div
              className={`${
                isActive === "intrest-calculator" && "bg-swBlue"
              } h-5 w-1 rounded-[23px]`}
            />
            <AiOutlineCalculator
              className={`${
                isActive === "intrest-calculator" && "text-swBlue"
              }`}
              size={23}
            />
            <p
              className={`${
                isActive === "intrest-calculator" && "text-swBlue"
              }`}
            >
              Intrest calculator
            </p>
          </Link>
        </div>
      </div>

      <div className="py-5 border-b border-b-swGray text-sm xl:text-base">
        <div className="px-3 lg:px-8">
          <Link
            href={"#"}
            className="py-2 flex items-center gap-2 rounded-lg hover:bg-swLightGray"
          >
            <BiMapAlt size={20} />
            <p>Plans</p>
          </Link>
          <Link
            href={"#"}
            className="py-2 flex items-center gap-2 rounded-lg hover:bg-swLightGray"
          >
            <CgFileDocument size={20} />
            <p>Report</p>
          </Link>
          <Link
            href={"#"}
            className="py-2 flex items-center gap-2 rounded-lg hover:bg-swLightGray"
          >
            <AiFillCustomerService size={20} />
            <p>Team managemant</p>
          </Link>
          <Link
            href={"#"}
            className="py-2 flex items-center gap-2 rounded-lg hover:bg-swLightGray"
          >
            <AiOutlineSetting size={20} />
            <p>Settings</p>
          </Link>
        </div>
      </div>

      <div className="py-5 border-t border-t-swGray mt-auto text-sm xl:text-base">
        <div className="px-3 lg:px-8">
          <Link href={"#"} className="py-2 flex items-center gap-2 rounded-lg">
            <GoSignOut size={20} />
            <p>Sign Out</p>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SideBar;
