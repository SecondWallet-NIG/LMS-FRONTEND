"use client";
import React, { useEffect, useState } from "react";
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
import companyLogoIcon from "../../../public/images/Logo_icon.png";
import SidebarLink from "../shared/sideBarLink/SidebarLink";

const Sidebar = () => {
  const pathname = usePathname();
  const [sideBarOpen, setSideBarOpen] = useState(true);

  const [activeLink, setActiveLink] = useState("");

  const handleSidebarOpen = () => {
    setSideBarOpen(!sideBarOpen);
  };

  useEffect(() => {
    setTimeout(() => {
      setSideBarOpen(false);
    }, 2000);
  }, []);
  return (
    <main
      className={`fixed h-full border-r bg-white border-r-gray-300 flex flex-col font-medium z-[102] transition-all ease-in-out duration-1000 ${
        sideBarOpen ? "w-1/5" : "w-[5%]"
      }`}
      onMouseEnter={handleSidebarOpen}
      onMouseLeave={handleSidebarOpen}
    >
      <div className="flex justify-center items-center p-5 h-[4.55rem] border-b border-b-gray-300">
        {sideBarOpen ? (
          <Image src={companyLogo} alt="company logo" priority={true} />
        ) : (
          <Image
            src={companyLogoIcon}
            alt="company logo"
            priority={true}
            height={45}
            width={45}
          />
        )}
      </div>

      <div className="py-5 border-b border-b-gray-300 text-sm xl:text-base">
        <div className={`${sideBarOpen ? "px-2 lg:px-3 xl:px-8" : ""}`}>
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
              sideBarOpen={sideBarOpen}
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
            sideBarOpen={sideBarOpen}
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
            sideBarOpen={sideBarOpen}
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
            sideBarOpen={sideBarOpen}
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
            sideBarOpen={sideBarOpen}
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
            sideBarOpen={sideBarOpen}
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
            sideBarOpen={sideBarOpen}
            onClick={() => {
              setActiveLink("disbursement");
            }}
          />
        </div>
      </div>

      <div className="py-5 border-b border-b-gray-300 text-sm xl:text-base">
        <div className={`${sideBarOpen ? "px-3 lg:px-8" : ""} `}>
          <SidebarLink
            icon={<BiMapAlt size={20} />}
            text="Plans"
            link="/dashboard"
            sideBarOpen={sideBarOpen}
          />
          <SidebarLink
            icon={<TbReportMoney size={20} />}
            text="Report"
            link="/dashboard"
            sideBarOpen={sideBarOpen}
          />
          <SidebarLink
            icon={<AiFillCustomerService size={20} />}
            text="Team management"
            link="/team-management"
            sideBarOpen={sideBarOpen}
          />
          <SidebarLink
            icon={<AiOutlineSetting size={20} />}
            text="Settings"
            link="/dashboard"
            sideBarOpen={sideBarOpen}
          />
        </div>
      </div>

      <div className="py-1 border-t border-t-swGray text-sm xl:text-base mt-auto">
        <div className={`${sideBarOpen ? "px-3 lg:px-8" : ""}`}>
          <SidebarLink
            icon={<GoSignOut size={20} />}
            text="Sign Out"
            link="/sign-out"
            sideBarOpen={sideBarOpen}
          />
        </div>
      </div>
    </main>
  );
};

export default Sidebar;
