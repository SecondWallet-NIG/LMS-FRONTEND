"use client";
import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

//icons
import { RiBox3Line } from "react-icons/ri";
import { BsPeopleFill, BsCalculator } from "react-icons/bs";
import {
  TbAntennaBars5,
  TbNewSection,
  TbFileDollar,
  TbReportMoney,
} from "react-icons/tb";
import { AiFillCustomerService, AiOutlineSetting } from "react-icons/ai";
import { BiMapAlt } from "react-icons/bi";
import { GoSignOut } from "react-icons/go";
import companyLogo from "../../../public/images/Logo.png";
import SidebarLink from "../shared/sideBarLink/SidebarLink";

const Sidebar = () => {
  const pathname = usePathname();

  const [activeLink, setActiveLink] = useState("");

  // console.log(pathname);

  return (
    <main className=" h-full border-r border-r-swGray flex flex-col font-medium">
      <div className="flex justify-center items-center p-5 h-[4.55rem] border-b border-b-swGray">
        <Image src={companyLogo} alt="company logo" priority={true} />
      </div>

      <div className="py-5 border-b border-b-swGray text-sm xl:text-base">
        <div className="px-2 lg:px-3 xl:px-8">
          <div>
            <SidebarLink
              icon={
                <TbAntennaBars5
                  className={`${activeLink === "dashboard" && "text-swBlue"}`}
                  size={20}
                />
              }
              pathname={pathname}
              text="Dashboard"
              link="/dashboard"
              isActive={"dashboard"}
              onClick={() => {
                setActiveLink("dashboard");
              }}
            />
          </div>
          <SidebarLink
            icon={
              <RiBox3Line
                className={`${activeLink === "my-tasks" && "text-swBlue"}`}
                size={20}
              />
            }
            pathname={pathname}
            text="My tasks"
            link="/my-tasks"
            isActive={"my-tasks"}
            onClick={() => {
              setActiveLink("my-tasks");
            }}
          />
          <SidebarLink
            icon={
              <TbNewSection
                className={`${activeLink === "create-loan" && "text-swBlue"}`}
                size={20}
              />
            }
            pathname={pathname}
            text="Create loan"
            link="/create-loan"
            isActive={"create-loan"}
            onClick={() => {
              setActiveLink("create-loan");
            }}
          />
          <SidebarLink
            icon={
              <TbFileDollar
                className={`${
                  activeLink === "loan-applications" && "text-swBlue"
                }`}
                size={20}
              />
            }
            pathname={pathname}
            text="Loan applications"
            link=""
            onClick={() => {
              setActiveLink("loan-applications");
            }}
            hasDropdown={true}
            dropdownContent={
              <div className="py-2 bg-white ">
                <p className="block px-4 py-2 text-[13px] rounded-lg hover:bg-swLightGray  font-medium">
                  All
                </p>
                <p className="block px-4 py-2 text-[13px] rounded-lg hover:bg-swLightGray  font-medium">
                  New loans
                </p>
                <p className="block px-4 py-2 text-[13px] rounded-lg hover:bg-swLightGray  font-medium">
                  Pending loans
                </p>
                <p className="block px-4 py-2 text-[13px] rounded-lg hover:bg-swLightGray  font-medium">
                  Approved loans
                </p>
                <p className="block px-4 py-2 text-[13px] rounded-lg hover:bg-swLightGray  font-medium">
                  Rejected loans
                </p>
              </div>
            }
          />
          <SidebarLink
            icon={
              <BsPeopleFill
                className={`${activeLink === "custmers" && "text-swBlue"}`}
                size={20}
              />
            }
            pathname={pathname}
            text="Customers"
            link=""
            hasDropdown={true}
            dropdownContent={
              <div>
                <p className="block px-4 py-2 text-[13px] rounded-lg hover:bg-swLightGray  font-medium">
                  All
                </p>
                <p className="block px-4 py-2 text-[13px] rounded-lg hover:bg-swLightGray  font-medium">
                  Approved customers
                </p>
                <p className="block px-4 py-2 text-[13px] rounded-lg hover:bg-swLightGray  font-medium">
                  Pending customers
                </p>
              </div>
            } // Customize the dropdown content
            onClick={() => {
              setActiveLink("customers");
            }}
          />
          <SidebarLink
            icon={
              <BsCalculator
                className={`${
                  activeLink === "intrest-calculator" && "text-swBlue"
                }`}
                size={20}
              />
            }
            pathname={pathname}
            text="Interest calculator"
            link="/interest-calculator"
            isActive={"interest-calculator"}
            onClick={() => {
              setActiveLink("intrest-calculator");
            }}
          />
        </div>
      </div>

      <div className="py-5 border-b border-b-swGray text-sm xl:text-base">
        <div className="px-3 lg:px-8">
          <SidebarLink
            icon={<BiMapAlt size={20} />}
            text="Plans"
            link="/plans"
          />
          <SidebarLink
            icon={<TbReportMoney size={20} />}
            text="Report"
            link="/report"
          />
          <SidebarLink
            icon={<AiFillCustomerService size={20} />}
            text="Team management"
            link="/team-management"
          />
          <SidebarLink
            icon={<AiOutlineSetting size={20} />}
            text="Settings"
            link="/settings"
          />
        </div>
      </div>

      <div className="py-1 border-t border-t-swGray text-sm xl:text-base mt-auto">
        <div className="px-3 lg:px-8">
          <SidebarLink
            icon={<GoSignOut size={20} />}
            text="Sign Out"
            link="/sign-out"
          />
        </div>
      </div>
    </main>
  );
};

export default Sidebar;
