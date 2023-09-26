"use client"
import React, { useState } from "react";
import SidebarLink from "./shared/SidebarLink";

//icons
import { FiDollarSign } from "react-icons/lu";
import { RiBox3Line } from "react-icons/ri";
import { BsBarChart , BsPeopleFill, BsCalculator} from "react-icons/bs";
import { TbAntennaBars5 , TbNewSection, TbFileDollar, TbReportMoney} from "react-icons/tb";

import { SlCup } from "react-icons/sl";
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
import Image from "next/image";

const Sidebar = () => {
  const [isActive, setIsActive] = useState("dashboard");
  return (
    <main className=" h-full border-r border-r-swGray flex flex-col font-medium">
      <div className="flex justify-center items-center p-5 border-b border-b-swGray -ml-5">
       <Image src={companyLogo} />
      </div>

      <div className="py-5 border-b border-b-swGray text-sm xl:text-base">
        <div className="px-3 lg:px-8">
          <SidebarLink
            icon={
              <TbAntennaBars5
                className={`${
                  isActive === "loan-applications" && "text-swBlue"
                }`}
                size={20}
              />
            }
            text="Dashboard"
            link="/dashboard"
            isActive={true}
          />
          <SidebarLink
            icon={
              <RiBox3Line
                className={`${
                  isActive === "loan-applications" && "text-swBlue"
                }`}
                size={20}
              />
            }
            text="My tasks"
            link="/my-tasks"
          />
          <SidebarLink
            icon={
              <TbNewSection
                className={`${
                  isActive === "loan-applications" && "text-swBlue"
                }`}
                size={20}
              />
            }
            text="Create loan"
            link="/create-loan"
          />
          <SidebarLink
            icon={
              <TbFileDollar
                className={`${
                  isActive === "loan-applications" && "text-swBlue"
                }`}
                size={20}
              />
            }
            text="Loan applications"
            link="/loan-applications"
          />
          <SidebarLink
            icon={
              <BsPeopleFill
                className={`${
                  isActive === "loan-applications" && "text-swBlue"
                }`}
                size={20}
              />
            }
            text="Customers"
            link="/customers"
            hasDropdown={true}
            dropdownContent={<div>Customers Dropdown Content</div>} // Customize the dropdown content
          />
          <SidebarLink
            icon={
              <BsCalculator
                className={`${
                  isActive === "loan-applications" && "text-swBlue"
                }`}
                size={20}
              />
            }
            text="Interest calculator"
            link="/interest-calculator"
          />
        </div>
      </div>

      <div className="py-5 border-b border-b-swGray text-sm xl:text-base">
        <div className="px-3 lg:px-8">
          <SidebarLink
            icon={
              <RiBox3Line
                className={`${
                  isActive === "loan-applications" && "text-swBlue"
                }`}
                size={20}
              />
            }
            text="Plans"
            link="/plans"
          />
          <SidebarLink
            icon={
              <RiBox3Line
                className={`${
                  isActive === "loan-applications" && "text-swBlue"
                }`}
                size={20}
              />
            }
            text="Report"
            link="/report"
          />
          <SidebarLink
            icon={
              <RiBox3Line
                className={`${
                  isActive === "loan-applications" && "text-swBlue"
                }`}
                size={20}
              />
            }
            text="Team management"
            link="/team-management"
          />
          <SidebarLink
            icon={
              <RiBox3Line
                className={`${
                  isActive === "loan-applications" && "text-swBlue"
                }`}
                size={20}
              />
            }
            text="Settings"
            link="/settings"
          />
        </div>
      </div>

      <div className="py-5 border-t border-t-swGray text-sm xl:text-base">
        <div className="px-3 lg:px-8">
          <SidebarLink
            icon={
              <RiBox3Line
                className={`${
                  isActive === "loan-applications" && "text-swBlue"
                }`}
                size={20}
              />
            }
            text="Sign Out"
            link="/sign-out"
          />
        </div>
      </div>
    </main>
  );
};

export default Sidebar;
