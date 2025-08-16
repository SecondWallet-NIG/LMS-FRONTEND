"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getApprovalAssignee } from "@/redux/slices/approvalAssigneeSlice";
import Link from "next/link";
import { AiFillDashboard, AiFillMoneyCollect } from "react-icons/ai";
import { BiMapAlt, BiSolidBuilding } from "react-icons/bi";
import { FaPeopleGroup } from "react-icons/fa6";
import {
  FiArrowDownLeft,
  FiArrowUpRight,
  FiFile,
  FiFileText,
  FiSend,
  FiUser,
} from "react-icons/fi";
import { IoMdAdd, IoMdCard, IoMdClose } from "react-icons/io";
import { PiCurrencyNgn } from "react-icons/pi";
import { RiBox3Line } from "react-icons/ri";
import { TbAntennaBars5, TbReportMoney } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";

const companyLogo = "/images/Logo.png";
const companyLogoIcon = "/images/Logo_icon.png";
import {
  assetManagementAuthRoles,
  borrowersAuthRoles,
  createLoanAuthRoles,
  dashboardAuthRoles,
  disbursementAuthRoles,
  employeeDashboardAuthRoles,
  expensesAuthRoles,
  investorsAuthRoles,
  loanApplicationAuthRoles,
  loanDraftsAuthRoles,
  myTaskAuthRoles,
  paymentHistoryAuthRoles,
  plansAuthRoles,
  repaymentAuthRoles,
  reportAuthRoles,
  teamManagementAuthRoles,
} from "../helpers/pageAuthRoles";
import SidebarLink from "../shared/sideBarLink/SidebarLink";

const Sidebar = ({ sideBarState, sideBarOpen: sideBarChange }) => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [activeLink, setActiveLink] = useState("");
  const [isNavigating, setIsNavigating] = useState(false);
  const userTasks = useSelector((state) => state.UserTasks);
  const userRoleTag = JSON.parse(localStorage.getItem("user"))?.data?.user?.role
    ?.tag || "";



  let user;
  if (typeof window !== "undefined") {
    user = JSON.parse(localStorage.getItem("user"));
  }
  const userId = user?.data?.user?._id;

  useEffect(() => {
    dispatch(getApprovalAssignee(userId));
  }, []);

  // Ensure sidebar starts closed on initial mount
  useEffect(() => {
    sideBarChange(false);
  }, []);

  // Set active link based on current pathname
  useEffect(() => {
    const path = pathname.split('/')[1];
    setActiveLink(path || 'dashboard');
  }, [pathname]);

  // Close sidebar when navigating to a new page
  useEffect(() => {
    // Set navigating state to prevent hover interference
    setIsNavigating(true);
    // Close sidebar when pathname changes (both mobile and desktop)
    sideBarChange(false);
    
    // Reset navigating state after a short delay
    setTimeout(() => {
      setIsNavigating(false);
    }, 300);
  }, [pathname]);

  return (
    <>
      {/* Mobile Overlay - Only show when sidebar is open on mobile */}
      {sideBarState && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[150] md:hidden"
          onClick={() => sideBarChange(false)}
        />
      )}
      
      <main>
        <div
        className={`hidden fixed h-full border-r-4 border-r-blue-500 bg-white md:flex flex-col font-medium z-[102] transition-all ease-in-out duration-300 ${
          sideBarState ? "w-4/5 sm:w-1/5 z-[200]" : "w-[10%] md:w-[5%]"
        }`}
        onMouseEnter={() => {
          if (window.innerWidth >= 768 && !isNavigating) {
            // Add a small delay to prevent immediate reopening after navigation
            setTimeout(() => {
              sideBarChange(true);
            }, 100);
          }
        }}
        onMouseLeave={() => {
          if (window.innerWidth >= 768 && !isNavigating) {
            setTimeout(() => {
              sideBarChange(false);
            }, 200);
          }
        }}
      >
        <div className="flex justify-center items-center p-5">
          {sideBarState ? (
            <img src={companyLogo} alt="company logo" className="h-8" />
          ) : (
            <div className="relative min-h-[2.5rem] min-w-[2.5rem]">
              <img
                src={companyLogoIcon}
                alt="company logo"
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </div>

        <div className="border-b border-b-gray-300 text-lg xl:text-xl">
          <div className={`${sideBarState ? "px-2 lg:px-3 xl:px-8" : ""}`}>
            <div>
              <SidebarLink
                allowedRoleTags={dashboardAuthRoles}
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
                sideBarOpen={sideBarState}
                onClick={() => {
                  setActiveLink("dashboard");
                  // Close sidebar on mobile after navigation
                  if (window.innerWidth < 768) {
                    sideBarChange(false);
                  }
                }}
              />
            </div>
            <SidebarLink
              allowedRoleTags={myTaskAuthRoles}
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
                    {`${userTasks?.data?.pendingCount || 0}`}
                  </div>
                </div>
              }
              link="/my-tasks"
              isActive={"my-tasks"}
              sideBarOpen={sideBarState}
              onClick={() => {
                setActiveLink("my-tasks");
                  // Close sidebar on mobile after navigation
                  if (window.innerWidth < 768) {
                    sideBarChange(false);
                  }
              }}
            />
            <SidebarLink
              allowedRoleTags={borrowersAuthRoles}
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
              sideBarOpen={sideBarState}
              onClick={() => {
                setActiveLink("borrowers");
                  // Close sidebar on mobile after navigation
                  if (window.innerWidth < 768) {
                    sideBarChange(false);
                  }
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
              allowedRoleTags={createLoanAuthRoles}
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
              sideBarOpen={sideBarState}
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
              allowedRoleTags={loanApplicationAuthRoles}
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
              sideBarOpen={sideBarState}
              onClick={() => {
                setActiveLink("loan-applications");
              }}
              hasDropdown={true}
              dropdownContent={
                <div className="flex flex-col gap-4">
                  <Link
                    href={`/loan-applications`}
                    className="ml-5 text-sm hover:text-swBlue"
                  >
                    Loan Applications
                  </Link>

                  <Link
                    href={`/loan-restructure-requests`}
                    className="ml-5 text-sm hover:text-swBlue"
                  >
                    Loan Restructure Requests
                  </Link>
                </div>
              }
            />
            <SidebarLink
              allowedRoleTags={loanDraftsAuthRoles}
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
              sideBarOpen={sideBarState}
              onClick={() => {
                setActiveLink("loan-applications");
              }}
            />
            <SidebarLink
              allowedRoleTags={disbursementAuthRoles}
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
              sideBarOpen={sideBarState}
              onClick={() => {
                setActiveLink("disbursement");
              }}
            />

            <SidebarLink
              allowedRoleTags={repaymentAuthRoles}
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
              sideBarOpen={sideBarState}
              onClick={() => {
                setActiveLink("repayment");
              }}
            />

            <SidebarLink
              allowedRoleTags={paymentHistoryAuthRoles}
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
              sideBarOpen={sideBarState}
              onClick={() => {
                setActiveLink("payment-history");
              }}
            />
          </div>
        </div>

        <div className="py-5 border-b border-b-gray-300 text-lg xl:text-xl">
          <div className={`${sideBarState ? "px-3 lg:px-8" : ""} `}>
            <SidebarLink
              allowedRoleTags={reportAuthRoles}
              userRoleTag={userRoleTag}
              icon={<TbReportMoney size={20} />}
              text="Report"
              link="/report"
              sideBarOpen={sideBarState}
            />

            <SidebarLink
              allowedRoleTags={plansAuthRoles}
              userRoleTag={userRoleTag}
              icon={<BiMapAlt size={20} />}
              text="Loan packages"
              link="/plans"
              sideBarOpen={sideBarState}
            />
            {teamManagementAuthRoles.includes(userRoleTag) ? (
              <>
                <SidebarLink
                  allowedRoleTags={teamManagementAuthRoles}
                  userRoleTag={userRoleTag}
                  icon={<FaPeopleGroup size={20} />}
                  text="Team management"
                  link="/team-management"
                  sideBarOpen={sideBarState}
                />
                <SidebarLink
                  icon={<FiArrowUpRight size={20} />}
                  text="Expenses"
                  link="/expenses"
                  sideBarOpen={sideBarState}
                />
                <SidebarLink
                  icon={<IoMdCard size={20} />}
                  text="Payroll"
                  link="/payroll"
                  sideBarOpen={sideBarState}
                />
              </>
            ) : null}
            <SidebarLink
              allowedRoleTags={assetManagementAuthRoles}
              userRoleTag={userRoleTag}
              icon={<BiSolidBuilding size={20} />}
              text="Asset management"
              link="/asset-management"
              sideBarOpen={sideBarState}
            />
            <SidebarLink
              allowedRoleTags={expensesAuthRoles}
              userRoleTag={userRoleTag}
              icon={<PiCurrencyNgn size={20} />}
              text="Expenses"
              link="/expenses"
              sideBarOpen={sideBarState}
            />

            <SidebarLink
              allowedRoleTags={investorsAuthRoles}
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
              sideBarOpen={sideBarState}
              onClick={() => {
                setActiveLink("");
              }}
            />
            <SidebarLink
              allowedRoleTags={employeeDashboardAuthRoles}
              userRoleTag={userRoleTag}
              icon={<AiFillDashboard size={20} />}
              text="Employee Dashboard"
              link={`/employee-dashboard/${userId}`}
              sideBarOpen={sideBarState}
              onClick={() => {
                // Handle click;
              }}
            />
          </div>
        </div>
      </div>

             {/* Small screens */}
       <div
         className={`fixed h-full border-r bg-white border-r-gray-300 flex md:hidden flex-col font-medium z-[200] transition-all ease-in-out duration-1000 w-[200px] ${
           sideBarState ? "left-0 z-[1000]" : "-left-[200px]"
         }`}
       >
        <div className="flex justify-between items-center p-5 h-[4.55rem] border-b border-b-gray-300">
          <img src={companyLogo} alt="company logo" className="h-8" />
          <p className="cursor-pointer" onClick={() => sideBarChange(false)}>
            <IoMdClose size={20} />
          </p>
        </div>

        <div className="border-b border-b-gray-300 text-lg xl:text-xl">
          <div className={`${sideBarState ? "px-2 lg:px-3 xl:px-8" : ""}`}>
            <div>
              <SidebarLink
                allowedRoleTags={dashboardAuthRoles}
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
                sideBarOpen={sideBarState}
                onClick={() => {
                  setActiveLink("dashboard");
                  // Close sidebar on mobile after navigation
                  if (window.innerWidth < 768) {
                    sideBarChange(false);
                  }
                }}
              />
            </div>
            <SidebarLink
              allowedRoleTags={myTaskAuthRoles}
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
                    {`${userTasks?.data?.pendingCount || 0}`}
                  </div>
                </div>
              }
              link="/my-tasks"
              isActive={"my-tasks"}
              sideBarOpen={sideBarState}
              onClick={() => {
                setActiveLink("my-tasks");
                  // Close sidebar on mobile after navigation
                  if (window.innerWidth < 768) {
                    sideBarChange(false);
                  }
              }}
            />
            <SidebarLink
              allowedRoleTags={borrowersAuthRoles}
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
              sideBarOpen={sideBarState}
              onClick={() => {
                setActiveLink("borrowers");
                  // Close sidebar on mobile after navigation
                  if (window.innerWidth < 768) {
                    sideBarChange(false);
                  }
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
              allowedRoleTags={createLoanAuthRoles}
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
              sideBarOpen={sideBarState}
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
              allowedRoleTags={loanApplicationAuthRoles}
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
              sideBarOpen={sideBarState}
              onClick={() => {
                setActiveLink("loan-applications");
              }}
            />
            <SidebarLink
              allowedRoleTags={loanDraftsAuthRoles}
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
              sideBarOpen={sideBarState}
              onClick={() => {
                setActiveLink("loan-applications");
              }}
            />
            <SidebarLink
              allowedRoleTags={disbursementAuthRoles}
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
              sideBarOpen={sideBarState}
              onClick={() => {
                setActiveLink("disbursement");
              }}
            />

            <SidebarLink
              allowedRoleTags={repaymentAuthRoles}
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
              sideBarOpen={sideBarState}
              onClick={() => {
                setActiveLink("repayment");
              }}
            />

            <SidebarLink
              allowedRoleTags={paymentHistoryAuthRoles}
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
              sideBarOpen={sideBarState}
              onClick={() => {
                setActiveLink("payment-history");
              }}
            />
          </div>
        </div>

        <div className="py-5 border-b border-b-gray-300 text-lg xl:text-xl">
          <div className={`${sideBarState ? "px-3 lg:px-8" : ""} `}>
            <SidebarLink
              allowedRoleTags={reportAuthRoles}
              userRoleTag={userRoleTag}
              icon={<TbReportMoney size={20} />}
              text="Report"
              link="/report"
              sideBarOpen={sideBarState}
            />

            <SidebarLink
              allowedRoleTags={plansAuthRoles}
              userRoleTag={userRoleTag}
              icon={<BiMapAlt size={20} />}
              text="Loan packages"
              link="/plans"
              sideBarOpen={sideBarState}
            />
            {teamManagementAuthRoles.includes(userRoleTag) ? (
              <>
                <SidebarLink
                  allowedRoleTags={teamManagementAuthRoles}
                  userRoleTag={userRoleTag}
                  icon={<FaPeopleGroup size={20} />}
                  text="Team management"
                  link="/team-management"
                  sideBarOpen={sideBarState}
                />
                <SidebarLink
                  icon={<FiArrowUpRight size={20} />}
                  text="Expenses"
                  link="/expenses"
                  sideBarOpen={sideBarState}
                />
                <SidebarLink
                  icon={<IoMdCard size={20} />}
                  text="Payroll"
                  link="/payroll"
                  sideBarOpen={sideBarState}
                />
              </>
            ) : null}
            <SidebarLink
              allowedRoleTags={assetManagementAuthRoles}
              userRoleTag={userRoleTag}
              icon={<BiSolidBuilding size={20} />}
              text="Asset management"
              link="/asset-management"
              sideBarOpen={sideBarState}
            />
            <SidebarLink
              allowedRoleTags={expensesAuthRoles}
              userRoleTag={userRoleTag}
              icon={<PiCurrencyNgn size={20} />}
              text="Expenses"
              link="/expenses"
              sideBarOpen={sideBarState}
            />

            <SidebarLink
              allowedRoleTags={investorsAuthRoles}
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
              sideBarOpen={sideBarState}
              onClick={() => {
                setActiveLink("");
              }}
            />
            <SidebarLink
              allowedRoleTags={employeeDashboardAuthRoles}
              userRoleTag={userRoleTag}
              icon={<AiFillDashboard size={20} />}
              text="Employee Dashboard"
              link={`/employee-dashboard/${userId}`}
              sideBarOpen={sideBarState}
              onClick={() => {
                // Handle click;
              }}
            />
          </div>
        </div>
      </div>
      </main>
    </>
  );
};

export default Sidebar;
