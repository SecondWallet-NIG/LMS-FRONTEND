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

  return (
    <main className=" h-full border-r border-r-gray-300 flex flex-col font-medium">
      <div className="flex justify-center items-center p-5 h-[4.55rem] border-b border-b-gray-300">
        <Image src={companyLogo} alt="company logo" priority={true} />
      </div>

      <div className="py-5 border-b border-b-gray-300 text-sm xl:text-base">
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
                <SidebarLink
                  pathname={pathname}
                  text="All Loans"
                  link="/loan-applications/all"
                  isActive={"All Loans"}
                  onClick={() => {
                    setActiveLink("All Loans");
                  }}
                />
                 <SidebarLink
                  pathname={pathname}
                  text="New loans"
                  link="/loan-applications/all"
                  isActive={"New loans"}
                  onClick={() => {
                    setActiveLink("New loans");
                  }}
                />
                 <SidebarLink
                  pathname={pathname}
                  text="Pending loans"
                  link="/loan-applications/all"
                  isActive={"Pending loans"}
                  onClick={() => {
                    setActiveLink("Pending loans");
                  }}
                />
                 <SidebarLink
                  pathname={pathname}
                  text="Approved loans"
                  link="/loan-applications/all"
                  isActive={"Approved loans"}
                  onClick={() => {
                    setActiveLink("Approved loans");
                  }}
                />
              </div>
            }
          />
          <SidebarLink
            icon={
              <BsPeopleFill
                className={`${activeLink === "customers" && "text-swBlue"}`}
                size={20}
              />
            }
            pathname={pathname}
            text="Customers"
            link="/customers"
            hasDropdown={true}
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
          <SidebarLink
            icon={
              <BsCalculator
                className={`${activeLink === "disbursement" && "text-swBlue"}`}
                size={20}
              />
            }
            pathname={pathname}
            text="disbursement"
            link="/disbursement/all"
            isActive={"disbursement"}
            onClick={() => {
              setActiveLink("disbursement");
            }}
          />
        </div>
      </div>

      <div className="py-5 border-b border-b-gray-300 text-sm xl:text-base">
        <div className="px-3 lg:px-8">
          <SidebarLink
            icon={<BiMapAlt size={20} />}
            text="Plans"
            link="/dashboard"
          />
          <SidebarLink
            icon={<TbReportMoney size={20} />}
            text="Report"
            link="/dashboard"
          />
          <SidebarLink
            icon={<AiFillCustomerService size={20} />}
            text="Team management"
            link="/team-management"
          />
          <SidebarLink
            icon={<AiOutlineSetting size={20} />}
            text="Settings"
            link="/dashboard"
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
