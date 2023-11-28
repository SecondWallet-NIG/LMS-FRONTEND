import { usePathname } from "next/navigation";

const PagePath = ({ paths }) => {
  const pathname = usePathname();

  return (
    <main className="font-medium text-swGray">
      {pathname === "/dashboard" ? (
        <p className="text-swBlue text-lg">Dashboard</p>
      ) : pathname === "/my-tasks" ? (
        <p className="text-swBlue text-lg">My tasks</p>
      ) : pathname === "/loan-applications" ? (
        <p className="text-swBlue text-lg">Loan applications</p>
      ) : pathname === "/create-loan" ? (
        <p className="text-swBlue text-lg">Create loan</p>
      ) : pathname === "/report" ? (
        <p className="text-swBlue text-lg">Report</p>
      ) : pathname === "/team-management" ? (
        <p className="text-swBlue text-lg">Team management</p>
      ) : pathname === "/settings" ? (
        <p className="text-swBlue text-lg">Settings</p>
      ) : pathname === "/borrowers" ? (
        <p className="text-swBlue text-lg">Borrowers</p>
      ) : pathname === "/repayment" ? (
        <p className="text-swBlue text-lg">Repayment</p>
      ) : pathname === "/disbursement/all" ? (
        <p className="text-swBlue text-lg">Disbursements</p>
      ) : pathname === "/expenses" ? (
        <p className="text-swBlue text-lg">Expenses</p>
      ) : pathname === "/payroll" ? (
        <p className="text-swBlue text-lg">Payroll</p>
      ) : pathname === "/investors" ? (
        <p className="text-swBlue text-lg">Investors</p>
      ) : pathname === "/intrest-calculator" ? (
        <p className="text-swBlue text-lg">Interest calculator</p>
      ) : pathname === "/plans" ? (
        <p className="text-swBlue text-lg">Loan Plans and Packages</p>
      ) : (
        <div className="flex gap-1 items-end">
          {paths?.map((item, index) => (
            <div className="flex gap-1 items-end" key={index}>
              <p
                className={
                  index === paths?.length - 1
                    ? "text-swBlue flex text-lg -mb-1"
                    : ""
                }
              >
                {item}
              </p>

              {index !== paths?.length - 1 && (
                <div className="flex">/</div>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default PagePath;
