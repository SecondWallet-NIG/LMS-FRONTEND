import { usePathname } from "next/navigation";

const PagePath = ({ paths }) => {
  const pathname = usePathname();

  return (
    <main className="text-sm md:font-medium ">
      {pathname === "/dashboard" ? (
        <p className="text-swBlue text-xs sm:text-sm sm:pb-1.5">Dashboard</p>
      ) : pathname === "/my-tasks" ? (
        <p className="text-swBlue text-xs sm:text-sm sm:pb-1.5">My tasks</p>
      ) : pathname === "/loan-applications" ? (
        <p className="text-swBlue text-xs sm:text-sm sm:pb-1.5">
          Loan applications
        </p>
      ) : pathname === "/create-loan" ? (
        <p className="text-swBlue text-xs sm:text-sm sm:pb-1.5">Create loan</p>
      ) : pathname === "/report" ? (
        <p className="text-swBlue text-xs sm:text-sm sm:pb-1.5">Report</p>
      ) : pathname === "/team-management" ? (
        <p className="text-swBlue text-xs sm:text-sm sm:pb-1.5">Team management</p>
      ) : pathname === "/settings" ? (
        <p className="text-swBlue text-xs sm:text-sm sm:pb-1.5">Settings</p>
      ) : pathname === "/borrowers" ? (
        <p className="text-swBlue text-xs sm:text-sm sm:pb-1.5">Borrowers</p>
      ) : pathname === "/repayment" ? (
        <p className="text-swBlue text-xs sm:text-sm sm:pb-1.5">Repayment</p>
      ) : pathname === "/disbursement" ? (
        <p className="text-swBlue text-xs sm:text-sm sm:pb-1.5">Disbursements</p>
      ) : pathname === "/expenses" ? (
        <p className="text-swBlue text-xs sm:text-sm sm:pb-1.5">Expenses</p>
      ) : pathname === "/payroll" ? (
        <p className="text-swBlue text-xs sm:text-sm sm:pb-1.5">Payroll</p>
      ) : pathname === "/investors" ? (
        <p className="text-swBlue text-xs sm:text-sm sm:pb-1.5">Investors</p>
      ) : pathname === "/intrest-calculator" ? (
        <p className="text-swBlue text-xs sm:text-sm sm:pb-1.5">
          Interest calculator
        </p>
      ) : pathname === "/plans" ? (
        <p className="text-swBlue text-xs sm:text-sm sm:pb-1.5">
          Loan Plans and Packages
        </p>
      ) : pathname === "/payment-history" ? (
        <p className="text-swBlue text-xs sm:text-sm sm:pb-1.5">Payment History</p>
      ) : pathname === "/disbursed-loans" ? (
        <p className="text-swBlue text-xs sm:text-sm sm:pb-1.5">Disbursed Loans</p>
      ) : pathname === "/pending-loans" ? (
        <p className="text-swBlue text-xs sm:text-sm sm:pb-1.5">Pending Loans</p>
      ) : pathname === "/active-loans" ? (
        <p className="text-swBlue text-xs sm:text-sm sm:pb-1.5">Active Loans</p>
      ) : (
        <div className="flex gap-1 items-end text-swGray">
          {paths?.map((item, index) => (
            <div className="flex gap-1 items-end" key={index}>
              <p
                className={
                  index === paths?.length - 1
                    ? "text-swBlue flex text-xs md:text-sm"
                    : "hidden sm:flex"
                }
              >
                {item}
              </p>

              {index !== paths?.length - 1 && (
                <div className="sm:flex hidden"> / </div>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default PagePath;
