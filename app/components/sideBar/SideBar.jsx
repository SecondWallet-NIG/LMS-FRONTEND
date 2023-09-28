"use client";
import React, { useState } from "react";
import Image from "next/image";
import SidebarLink from "../shared/SidebarLink";

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

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState("");
  return (
    <main className=" h-full border-r border-r-swGray flex flex-col font-medium">
      <div className="flex justify-center items-center p-5 border-b border-b-swGray -ml-5">
        <Image src={companyLogo} alt="company logo" />
      </div>

      <div className="py-5 border-b border-b-swGray text-sm xl:text-base">
        <div className="px-3 lg:px-8">
          <div>
            <SidebarLink
              icon={
                <TbAntennaBars5
                  className={`${activeLink === "dashboard" && "text-swBlue"}`}
                  size={20}
                />
              }
              text="Dashboard"
              link="/dashboard"
              isActive={activeLink === "dashboard"}
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
            text="My tasks"
            link="/my-tasks"
            isActive={activeLink === "my-tasks"}
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
            text="Create loan"
            link="/create-loan"
            isActive={activeLink === "create-loan"}
            onClick={() => {
              setActiveLink("create-loan");
            }}
          />
          <SidebarLink
            icon={
              <TbFileDollar
                className={`${activeLink === "loan-applications" && "text-swBlue"
                  }`}
                size={20}
              />
            }
            text="Loan applications"
            link="/loan-applications"
            isActive={activeLink === "loan-applications"}
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
            text="Customers"
            link="/customers"
            hasDropdown={true}
            dropdownContent={
              <div>
                <p>All</p>
                <p>Approved customers</p>
                <p>Pending customers</p>
              </div>
            } // Customize the dropdown content
            isActive={activeLink === "customers"}
            onClick={() => {
              setActiveLink("customers");
            }}
          />
          <SidebarLink
            icon={
              <BsCalculator
                className={`${activeLink === "intrest-calculator" && "text-swBlue"
                  }`}
                size={20}
              />
            }
            text="Interest calculator"
            link="/interest-calculator"
            isActive={activeLink === "intrest-calculator"}
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

      <div className="pb-2 border-t border-t-swGray text-sm xl:text-base mt-auto">
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
