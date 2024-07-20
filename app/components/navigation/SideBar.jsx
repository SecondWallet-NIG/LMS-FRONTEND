"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
//icons
import { RiBox3Line } from "react-icons/ri";
import { TbAntennaBars5, TbReportMoney } from "react-icons/tb";
import { AiFillMoneyCollect, AiOutlineSetting } from "react-icons/ai";
import { BiMapAlt, BiSolidBuilding } from "react-icons/bi";
import { GoSignOut } from "react-icons/go";
import companyLogo from "../../../public/images/Logo.png";
import companyLogoIcon from "../../../public/images/Logo_icon.png";
import SidebarLink from "../shared/sideBarLink/SidebarLink";
import {
  FiArrowDownLeft,
  FiArrowUpRight,
  FiFile,
  FiSend,
  FiUser,
  FiFileText,
} from "react-icons/fi";
import { IoMdAdd, IoMdCard, IoMdClose } from "react-icons/io";
import { FaInbox, FaRegStar } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getApprovalAssignee } from "@/redux/slices/approvalAssigneeSlice";
import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";
import { PiCurrencyNgn } from "react-icons/pi";
import { IoBuild } from "react-icons/io5";

const Sidebar = ({ sideBarState, sideBarOpen: sideBarChange }) => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [activeLink, setActiveLink] = useState("");
  const x = useSelector((state) => state.approvalAssignee);
  const userRoleTag = JSON.parse(localStorage.getItem("user"))?.data?.user?.role
    ?.tag;

  const handleSidebarOpen = (state) => {
    setSideBarOpen(state);
  };

  useEffect(() => {
    // setSideBarOpen(true);
    setTimeout(() => {
      setSideBarOpen(false);
    }, 1000);
  }, []);

  let user;
  if (typeof window !== "undefined") {
    user = JSON.parse(localStorage.getItem("user"));
  }

  useEffect(() => {
    dispatch(getApprovalAssignee(user?.data?.user?._id));
  }, []);

  useEffect(() => {
    sideBarState ? handleSidebarOpen(true) : handleSidebarOpen(false);
  }, [sideBarState]);

  return (
    <main>
      <div
        className={`hidden fixed h-full border-r bg-white border-r-gray-300 md:flex flex-col font-medium z-[102] transition-all ease-in-out duration-1000 ${
          sideBarOpen ? "w-4/5 sm:w-1/5 z-[200]" : "w-[10%] md:w-[5%]"
        }`}
        onMouseEnter={() => handleSidebarOpen(true)}
        onMouseLeave={() => handleSidebarOpen(false)}
      >
        <div className="flex justify-center items-center p-5 h-[4.55rem] border-b border-b-gray-300">
          {sideBarOpen ? (
            <Image src={companyLogo} alt="company logo" priority={true} />
          ) : (
            <div className="relative min-h-[2.5rem] min-w-[2.5rem]">
              <Image
                src={companyLogoIcon}
                alt="company logo"
                priority={true}
                fill
                sizes="100%"
              />
            </div>
          )}
        </div>

        <div className="py-5 border-b border-b-gray-300 text-lg xl:text-xl">
          <div className={`${sideBarOpen ? "px-2 lg:px-3 xl:px-8" : ""}`}>
            <div>
              <SidebarLink
                allowedRoleTags={[
                  "LO",
                  "CFO",
                  "CEO",
                  "CAO",
                  "ICO",
                  "COF",
                  "LR0",
                  "CT0",
                  "Dir",
                  "System Admin",
                ]}
                userRoleTag={userRoleTag}
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
              allowedRoleTags={[
                "LO",
                "CFO",
                "CEO",
                "CAO",
                "ICO",
                "COF",
                "LR0",
                "CT0",
                "Dir",
                "System Admin",
              ]}
              userRoleTag={userRoleTag}
              icon={
                <RiBox3Line
                  className={`${activeLink === "my-tasks" && "text-swBlue"}`}
                  size={20}
                />
              }
              pathname={pathname}
              text={
                <div className="flex">
                  <div> My tasks</div>

                  <div
                    className={`ml-8 bg-blue-400 text-white inline-block py-1 px-2 text-xs rounded-full whitespace-nowrap`}
                  >
                    {`${x?.data?.pendingCount}` || 0}
                  </div>
                </div>
              }
              link="/my-tasks"
              isActive={"my-tasks"}
              sideBarOpen={sideBarOpen}
              onClick={() => {
                setActiveLink("my-tasks");
              }}
            />
            <SidebarLink
              allowedRoleTags={[
                "LO",
                "CFO",
                "CEO",
                "CAO",
                "ICO",
                "COF",
                "LR0",
                "CT0",
                "Dir",
                "System Admin",
              ]}
              userRoleTag={userRoleTag}
              icon={
                <FiUser
                  className={`${activeLink === "customers" && "text-swBlue"}`}
                  size={20}
                />
              }
              pathname={pathname}
              text="Borrowers"
              link="/borrowers"
              // hasDropdown={true}
              sideBarOpen={sideBarOpen}
              onClick={() => {
                setActiveLink("borrowers");
              }}
              hasDropdown={true}
              dropdownContent={
                <Link
                  href={`/blacklisted-borrowers`}
                  className="ml-5 text-sm hover:text-swBlue"
                >
                  Blacklisted borrowers
                </Link>
              }
            />
            <SidebarLink
              allowedRoleTags={["LO"]}
              userRoleTag={userRoleTag}
              icon={
                <IoMdAdd
                  className={`${
                    (activeLink === "create-loan" || "saved-loans") &&
                    "text-swBlue"
                  }`}
                  size={20}
                />
              }
              pathname={pathname}
              text="Create Loan"
              link={`${
                user?.data?.user?.role?.tag === "LO"
                  ? "/create-loan"
                  : "/unauthorised"
              }`}
              isActive={"create-loan"}
              sideBarOpen={sideBarOpen}
              onClick={() => {
                setActiveLink("create-loan");
              }}
              hasDropdown={true}
              dropdownContent={
                <Link
                  href={`${
                    user?.data?.user?.role?.tag === "LO"
                      ? "/saved-loans"
                      : "/unauthorised"
                  }`}
                  className="ml-5 text-sm hover:text-swBlue"
                >
                  Saved Loans
                </Link>
              }
            />
            <SidebarLink
              allowedRoleTags={[
                "LO",
                "CFO",
                "CEO",
                "CAO",
                "ICO",
                "COF",
                "LR0",
                "CT0",
                "Dir",
                "System Admin",
              ]}
              userRoleTag={userRoleTag}
              icon={
                <FiFile
                  className={`${
                    activeLink === "loan-applications" && "text-swBlue"
                  } `}
                  size={20}
                />
              }
              pathname={pathname}
              text="Loan applications"
              link="/loan-applications"
              sideBarOpen={sideBarOpen}
              onClick={() => {
                setActiveLink("loan-applications");
              }}
            />
            <SidebarLink
              allowedRoleTags={[
                "LO",
                "CFO",
                "CEO",
                "CAO",
                "ICO",
                "COF",
                "LR0",
                "CT0",
                "Dir",
                "System Admin",
              ]}
              userRoleTag={userRoleTag}
              icon={
                <FiFileText
                  className={`${
                    activeLink === "loan-drafts" && "text-swBlue"
                  } `}
                  size={20}
                />
              }
              pathname={pathname}
              text="Loan drafts"
              link="/loan-drafts"
              sideBarOpen={sideBarOpen}
              onClick={() => {
                setActiveLink("loan-applications");
              }}
            />
            <SidebarLink
              allowedRoleTags={[
                "LO",
                "CFO",
                "CEO",
                "CAO",
                "ICO",
                "COF",
                "LR0",
                "CT0",
                "Dir",
                "System Admin",
              ]}
              userRoleTag={userRoleTag}
              icon={
                <FiSend
                  className={`${
                    activeLink === "disbursement" && "text-swBlue"
                  }`}
                  size={20}
                />
              }
              pathname={pathname}
              text="Disbursement"
              link="/disbursement"
              isActive={"disbursement"}
              sideBarOpen={sideBarOpen}
              onClick={() => {
                setActiveLink("disbursement");
              }}
            />

            <SidebarLink
              allowedRoleTags={[
                "LO",
                "CFO",
                "CEO",
                "CAO",
                "ICO",
                "COF",
                "CT0",
                "LR0",
                "Dir",
                "System Admin",
              ]}
              userRoleTag={userRoleTag}
              icon={
                <FiArrowDownLeft
                  className={`${activeLink === "repayment" && "text-swBlue"}`}
                  size={20}
                />
              }
              
              pathname={pathname}
              text="Repayment"
              link="/repayment"
              isActive={"repayment"}
              sideBarOpen={sideBarOpen}
              onClick={() => {
                setActiveLink("repayment");
              }}
            />

            <SidebarLink
              allowedRoleTags={[
                "LO",
                "CFO",
                "CEO",
                "CAO",
                "ICO",
                "COF",
                "CT0",
                "LR0",
                "Dir",
                "System Admin",
              ]}
              userRoleTag={userRoleTag}
              icon={
                <AiFillMoneyCollect
                  className={`${
                    activeLink === "payment-history" && "text-swBlue"
                  }`}
                  size={20}
                />
              }
              pathname={pathname}
              text="Payment History"
              link="/payment-history"
              isActive={"payment-history"}
              sideBarOpen={sideBarOpen}
              onClick={() => {
                setActiveLink("payment-history");
              }}
            />
          </div>
        </div>

        <div className="py-5 border-b border-b-gray-300 text-lg xl:text-xl">
          <div className={`${sideBarOpen ? "px-3 lg:px-8" : ""} `}>
            <SidebarLink
              allowedRoleTags={[
                "LO",
                "CFO",
                "CEO",
                "CAO",
                "CT0",
                "Dir",
                "System Admin",
              ]}
              userRoleTag={userRoleTag}
              icon={<TbReportMoney size={20} />}
              text="Report"
              link="/report"
              sideBarOpen={sideBarOpen}
            />

            <SidebarLink
              allowedRoleTags={[
                "LO",
                "CFO",
                "CEO",
                "CAO",
                "CT0",
                "Dir",
                "System Admin",
              ]}
              userRoleTag={userRoleTag}
              icon={<BiMapAlt size={20} />}
              text="Loan packages"
              link="/plans"
              sideBarOpen={sideBarOpen}
            />
            {userRoleTag === "System Admin" ||
            userRoleTag === "CFO" ||
            userRoleTag === "CTO" ||
            userRoleTag === "CEO" ||
            userRoleTag === "Dir" ? (
              <>
                <SidebarLink
                  allowedRoleTags={["CFO", "CEO", "CT0", "Dir", "System Admin"]}
                  userRoleTag={userRoleTag}
                  icon={<FaPeopleGroup size={20} />}
                  text="Team management"
                  link="/team-management"
                  sideBarOpen={sideBarOpen}
                />
                <SidebarLink
                  icon={<FiArrowUpRight size={20} />}
                  text="Expenses"
                  link="/expenses"
                  sideBarOpen={sideBarOpen}
                />
                <SidebarLink
                  icon={<IoMdCard size={20} />}
                  text="Payroll"
                  link="/payroll"
                  sideBarOpen={sideBarOpen}
                />
              </>
            ) : null}
            <SidebarLink
              allowedRoleTags={[
                // "LO",
                "CFO",
                "CEO",
                "CAO",
                "CT0",
                "OFA",
                "Dir",
                "System Admin",
              ]}
              userRoleTag={userRoleTag}
              icon={<BiSolidBuilding size={20} />}
              text="Asset management"
              link="/asset-management"
              sideBarOpen={sideBarOpen}
            />
            <SidebarLink
              allowedRoleTags={[
                // "LO",
                "CFO",
                "CEO",
                "CAO",
                "CT0",
                "Dir",
                "OFA",
                "System Admin",
              ]}
              userRoleTag={userRoleTag}
              icon={<PiCurrencyNgn size={20} />}
              text="Expenses"
              link="/expenses"
              sideBarOpen={sideBarOpen}
            />
            {/* <SidebarLink
              allowedRoleTags={[
                // "LO",
                "CFO",
                "CEO",
                "CAO",
                "CT0",
                "Dir",
                "System Admin",
              ]}
              userRoleTag={userRoleTag}
              icon={<FaRegStar size={20} />}
              text="Investors"
              link="/investors"
              sideBarOpen={sideBarOpen}
            /> */}
            <SidebarLink
              allowedRoleTags={[
                "LO",
                "CFO",
                "CEO",
                "CAO",
                "ICO",
                "COF",
                "LR0",
                "CT0",
                "Dir",
                "System Admin",
              ]}
              userRoleTag={userRoleTag}
              icon={
                <FiUser
                  className={`${activeLink === "investors" && "text-swBlue"}`}
                  size={20}
                />
              }
              pathname={pathname}
              text="Investment"
              link="/investors"
              // hasDropdown={true}
              sideBarOpen={sideBarOpen}
              onClick={() => {
                setActiveLink("");
              }}
            />
            <SidebarLink
              allowedRoleTags={[
                "LO",
                "CFO",
                "CEO",
                "CAO",
                "ICO",
                "COF",
                "CT0",
                "LR0",
                "Dir",
                "OFA",
                "System Admin",
              ]}
              userRoleTag={userRoleTag}
              icon={<AiOutlineSetting size={20} />}
              text="Settings"
              link="/settings"
              sideBarOpen={sideBarOpen}
              onClick={() => {
                handleSidebarOpen(false);
              }}
            />
          </div>
        </div>

        <div className="py-1 border-t border-t-swGray text-lg xl:text-xl mt-auto">
          <div className={`${sideBarOpen ? "px-3 lg:px-8" : ""}`}>
            <SidebarLink
              allowedRoleTags={[
                "LO",
                "CFO",
                "CEO",
                "CAO",
                "ICO",
                "COF",
                "LR0",
                "CT0",
                "Dir",
                "OFA",
                "System Admin",
              ]}
              userRoleTag={userRoleTag}
              icon={<GoSignOut size={20} />}
              text="Sign Out"
              link="/"
              sideBarOpen={sideBarOpen}
              onClick={() => {
                handleSidebarOpen(false);
                localStorage.removeItem("user");
                localStorage.removeItem("email");
                //localStorage.clear();
              }}
            />
          </div>
        </div>
      </div>

      {/* Small screens */}
      <div
        className={`fixed h-full border-r bg-white border-r-gray-300 flex md:flex flex-col font-medium z-[200] transition-all ease-in-out duration-1000 w-[200px] ${
          sideBarOpen ? "ml-0 z-[1000] sm:-ml-[280px]" : "-ml-[280px]"
        }`}
      >
        <div className="flex justify-between items-center p-5 h-[4.55rem] border-b border-b-gray-300">
          <Image src={companyLogo} alt="company logo" priority={true} />

          <p className="" onClick={() => sideBarChange(false)}>
            <IoMdClose size={20} />
          </p>
        </div>

        <div className="py-5 border-b border-b-gray-300 text-lg xl:text-xl">
          <div className={`${sideBarOpen ? "px-2 lg:px-3 xl:px-8" : ""}`}>
            <div>
              <SidebarLink
                allowedRoleTags={[
                  "LO",
                  "CFO",
                  "CEO",
                  "CAO",
                  "ICO",
                  "COF",
                  "LR0",
                  "CT0",
                  "Dir",
                  "System Admin",
                ]}
                userRoleTag={userRoleTag}
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
              allowedRoleTags={[
                "LO",
                "CFO",
                "CEO",
                "CAO",
                "ICO",
                "COF",
                "LR0",
                "CT0",
                "Dir",
                "System Admin",
              ]}
              userRoleTag={userRoleTag}
              icon={
                <RiBox3Line
                  className={`${activeLink === "my-tasks" && "text-swBlue"}`}
                  size={20}
                />
              }
              pathname={pathname}
              text={
                <div className="flex">
                  <div> My tasks</div>

                  <div
                    className={`ml-8 bg-blue-400 text-white inline-block py-1 px-2 text-xs rounded-full whitespace-nowrap`}
                  >
                    {`${x?.data?.pendingCount}` || 0}
                  </div>
                </div>
              }
              link="/my-tasks"
              isActive={"my-tasks"}
              sideBarOpen={sideBarOpen}
              onClick={() => {
                setActiveLink("my-tasks");
              }}
            />
            <SidebarLink
              allowedRoleTags={[
                "LO",
                "CFO",
                "CEO",
                "CAO",
                "ICO",
                "COF",
                "LR0",
                "CT0",
                "Dir",
                "System Admin",
              ]}
              userRoleTag={userRoleTag}
              icon={
                <FiUser
                  className={`${activeLink === "customers" && "text-swBlue"}`}
                  size={20}
                />
              }
              pathname={pathname}
              text="Borrowers"
              link="/borrowers"
              // hasDropdown={true}
              sideBarOpen={sideBarOpen}
              onClick={() => {
                setActiveLink("borrowers");
              }}
              hasDropdown={true}
              dropdownContent={
                <Link
                  href={`/blacklisted-borrowers`}
                  className="ml-5 text-sm hover:text-swBlue"
                >
                  Blacklisted borrowers
                </Link>
              }
            />
            <SidebarLink
              allowedRoleTags={["LO"]}
              userRoleTag={userRoleTag}
              icon={
                <IoMdAdd
                  className={`${activeLink === "create-loan" && "text-swBlue"}`}
                  size={20}
                />
              }
              pathname={pathname}
              text="Create Loan"
              link={`${
                user?.data?.user?.role?.tag === "LO"
                  ? "/create-loan"
                  : "/unauthorised"
              }`}
              isActive={"create-loan"}
              sideBarOpen={sideBarOpen}
              onClick={() => {
                setActiveLink("create-loan");
              }}
              hasDropdown={true}
              dropdownContent={
                <Link
                  href={`${
                    user?.data?.user?.role?.tag === "LO"
                      ? "/saved-loans"
                      : "/unauthorised"
                  }`}
                  className="ml-5 text-sm hover:text-swBlue"
                >
                  Saved Loans
                </Link>
              }
            />
            <SidebarLink
              allowedRoleTags={[
                "LO",
                "CFO",
                "CEO",
                "CAO",
                "ICO",
                "COF",
                "LR0",
                "CT0",
                "Dir",
                "System Admin",
              ]}
              userRoleTag={userRoleTag}
              icon={
                <FiFile
                  className={`${
                    activeLink === "loan-applications" && "text-swBlue"
                  } `}
                  size={20}
                />
              }
              pathname={pathname}
              text="Loan applications"
              link="/loan-applications"
              sideBarOpen={sideBarOpen}
              onClick={() => {
                setActiveLink("loan-applications");
              }}
            />
            <SidebarLink
              allowedRoleTags={[
                "LO",
                "CFO",
                "CEO",
                "CAO",
                "ICO",
                "COF",
                "LR0",
                "CT0",
                "Dir",
                "System Admin",
              ]}
              userRoleTag={userRoleTag}
              icon={
                <FiFile
                  className={`${
                    activeLink === "loan-applications" && "text-swBlue"
                  } `}
                  size={20}
                />
              }
              pathname={pathname}
              text="Loan Drafts"
              link="/loan-applications"
              sideBarOpen={sideBarOpen}
              onClick={() => {
                setActiveLink("loan-applications");
              }}
            />
            <SidebarLink
              allowedRoleTags={[
                "LO",
                "CFO",
                "CEO",
                "CAO",
                "ICO",
                "COF",
                "LR0",
                "CT0",
                "Dir",
                "System Admin",
              ]}
              userRoleTag={userRoleTag}
              icon={
                <FiSend
                  className={`${
                    activeLink === "disbursement" && "text-swBlue"
                  }`}
                  size={20}
                />
              }
              pathname={pathname}
              text="Disbursement"
              link="/disbursement"
              isActive={"disbursement"}
              sideBarOpen={sideBarOpen}
              onClick={() => {
                setActiveLink("disbursement");
              }}
            />

            <SidebarLink
              allowedRoleTags={[
                "LO",
                "CFO",
                "CEO",
                "CAO",
                "ICO",
                "COF",
                "CT0",
                "LR0",
                "Dir",
                "System Admin",
              ]}
              userRoleTag={userRoleTag}
              icon={
                <FiArrowDownLeft
                  className={`${activeLink === "repayment" && "text-swBlue"}`}
                  size={20}
                />
              }
              pathname={pathname}
              text="Repayment"
              link="/repayment"
              isActive={"repayment"}
              sideBarOpen={sideBarOpen}
              onClick={() => {
                setActiveLink("repayment");
              }}
            />

            <SidebarLink
              allowedRoleTags={[
                "LO",
                "CFO",
                "CEO",
                "CAO",
                "ICO",
                "COF",
                "CT0",
                "LR0",
                "Dir",
                "System Admin",
              ]}
              userRoleTag={userRoleTag}
              icon={
                <AiFillMoneyCollect
                  className={`${
                    activeLink === "payment-history" && "text-swBlue"
                  }`}
                  size={20}
                />
              }
              pathname={pathname}
              text="Payment History"
              link="/payment-history"
              isActive={"payment-history"}
              sideBarOpen={sideBarOpen}
              onClick={() => {
                setActiveLink("payment-history");
              }}
            />
          </div>
        </div>

        <div className="py-5 border-b border-b-gray-300 text-lg xl:text-xl">
          <div className={`${sideBarOpen ? "px-3 lg:px-8" : ""} `}>
            <SidebarLink
              allowedRoleTags={[
                "LO",
                "CFO",
                "CEO",
                "CAO",
                "CT0",
                "Dir",
                "System Admin",
              ]}
              userRoleTag={userRoleTag}
              icon={<TbReportMoney size={20} />}
              text="Report"
              link="/report"
              sideBarOpen={sideBarOpen}
            />
            <SidebarLink
              allowedRoleTags={[
                "LO",
                "CFO",
                "CEO",
                "CAO",
                "CT0",
                "Dir",
                "System Admin",
              ]}
              userRoleTag={userRoleTag}
              icon={<BiMapAlt size={20} />}
              text="Loan packages"
              link="/plans"
              sideBarOpen={sideBarOpen}
            />
            {userRoleTag === "System Admin" ||
            userRoleTag === "CFO" ||
            userRoleTag === "CTO" ||
            userRoleTag === "CEO" ||
            userRoleTag === "Dir" ? (
              <>
                <SidebarLink
                  allowedRoleTags={["CFO", "CEO", "CT0", "Dir", "System Admin"]}
                  userRoleTag={userRoleTag}
                  icon={<FaPeopleGroup size={20} />}
                  text="Team management"
                  link="/team-management"
                  sideBarOpen={sideBarOpen}
                />
                <SidebarLink
                  icon={<FiArrowUpRight size={20} />}
                  text="Expenses"
                  link="/expenses"
                  sideBarOpen={sideBarOpen}
                />
                <SidebarLink
                  icon={<IoMdCard size={20} />}
                  text="Payroll"
                  link="/payroll"
                  sideBarOpen={sideBarOpen}
                />
              </>
            ) : null}
            <SidebarLink
              allowedRoleTags={[
                // "LO",
                "CFO",
                "CEO",
                "CAO",
                "CT0",
                "Dir",
                "System Admin",
              ]}
              userRoleTag={userRoleTag}
              icon={<FaInbox size={20} />}
              text="Asset management"
              link="/asset-management"
              sideBarOpen={sideBarOpen}
            />
            <SidebarLink
              allowedRoleTags={[
                // "LO",
                "CFO",
                "CEO",
                "CAO",
                "CT0",
                "Dir",
                "System Admin",
              ]}
              userRoleTag={userRoleTag}
              icon={<LuArrowUpRight size={20} />}
              text="Expenses"
              link="/expenses"
              sideBarOpen={sideBarOpen}
            />
            {/* <SidebarLink
              allowedRoleTags={[
                // "LO",
                "CFO",
                "CEO",
                "CAO",
                "CT0",
                "Dir",
                "System Admin",
              ]}
              userRoleTag={userRoleTag}
              icon={<FaRegStar size={20} />}
              text="Investors"
              link="/investors"
              sideBarOpen={sideBarOpen}
            /> */}
            <SidebarLink
              allowedRoleTags={[
                "LO",
                "CFO",
                "CEO",
                "CAO",
                "ICO",
                "COF",
                "CT0",
                "LR0",
                "Dir",
                "System Admin",
              ]}
              userRoleTag={userRoleTag}
              icon={<AiOutlineSetting size={20} />}
              text="Settings"
              link="/settings"
              sideBarOpen={sideBarOpen}
              onClick={() => {
                handleSidebarOpen(false);
              }}
            />
          </div>
        </div>

        <div className="py-1 border-t border-t-swGray text-lg xl:text-xl mt-auto">
          <div className={`${sideBarOpen ? "px-3 lg:px-8" : ""}`}>
            {/* <Button variant="secondary" onClick={() => {
         localStorage.removeItem("user");
         router.push("/")
      }}>
        Sign Out
      </Button> */}
            <SidebarLink
              allowedRoleTags={[
                "LO",
                "CFO",
                "CEO",
                "CAO",
                "ICO",
                "COF",
                "LR0",
                "CT0",
                "Dir",
                "System Admin",
              ]}
              userRoleTag={userRoleTag}
              icon={<GoSignOut size={20} />}
              text="Sign Out"
              link="/"
              sideBarOpen={sideBarOpen}
              onClick={() => {
                handleSidebarOpen(false);
                localStorage.removeItem("user");
                localStorage.removeItem("email");
                // localStorage.clear();
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Sidebar;
