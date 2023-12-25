"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Button from "../shared/buttonComponent/Button";
//icons
import { RiBox3Line } from "react-icons/ri";
import { BsPeopleFill, BsCalculator } from "react-icons/bs";
import {
  TbAntennaBars5,
  TbNewSection,
  TbFileDollar,
  TbReportMoney,
} from "react-icons/tb";
import { AiOutlineSetting } from "react-icons/ai";
import { BiMapAlt } from "react-icons/bi";
import { GoSignOut } from "react-icons/go";
import companyLogo from "../../../public/images/Logo.png";
import companyLogoIcon from "../../../public/images/Logo_icon.png";
import SidebarLink from "../shared/sideBarLink/SidebarLink";
import { useRouter } from "next/navigation";
import { FiArrowDownLeft, FiArrowUpRight, FiSend } from "react-icons/fi";
import { IoMdCard } from "react-icons/io";
import { FaRegStar } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getApprovalAssignee } from "@/redux/slices/loanApprovalSlice";

const Sidebar = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const x = useSelector((state) => state.loanApprovals);
  // console.log("x?.data?.data", x?.data?.data);

  const [activeLink, setActiveLink] = useState("");

  const handleSidebarOpen = (state) => {
    setSideBarOpen(state);
  };

  // console.log({ x });

  useEffect(() => {
    setSideBarOpen(true);
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
    // console.log({ x });
  }, []);

  return (
    <main
      className={`fixed h-full border-r bg-white border-r-gray-300 flex flex-col font-medium z-[102] transition-all ease-in-out duration-1000 ${
        sideBarOpen ? "w-1/5" : "w-[10%] md:w-[5%]"
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
            icon={
              <BsPeopleFill
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
                } -ml-1`}
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
            icon={
              <FiSend
                className={`${activeLink === "disbursement" && "text-swBlue"}`}
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
        </div>
      </div>

      <div className="py-5 border-b border-b-gray-300 text-lg xl:text-xl">
        <div className={`${sideBarOpen ? "px-3 lg:px-8" : ""} `}>
          <SidebarLink
            icon={<BiMapAlt size={20} />}
            text="Plans"
            link="/plans"
            sideBarOpen={sideBarOpen}
          />
          {JSON.parse(localStorage.getItem("user"))?.data?.user?.role?.tag !=
          "LO" ? (
            <>
              <SidebarLink
                icon={<TbReportMoney size={20} />}
                text="Report"
                link="/report"
                sideBarOpen={sideBarOpen}
              />

              <SidebarLink
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
              <SidebarLink
                icon={<FaRegStar size={20} />}
                text="Investors"
                link="/investors"
                sideBarOpen={sideBarOpen}
              />
            </>
          ) : null}
          <SidebarLink
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
            icon={<GoSignOut size={20} />}
            text="Sign Out"
            link="/"
            sideBarOpen={sideBarOpen}
            onClick={() => {
              handleSidebarOpen(false);
              localStorage.removeItem("user");
              localStorage.removeItem("email");
              localStorage.clear();
            }}
          />
        </div>
      </div>
    </main>
  );
};

export default Sidebar;
