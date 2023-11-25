import { usePathname } from "next/navigation";

const PagePath = ({ paths }) => {
  const pathname = usePathname();

  return (
    <main className="font-semibold text-swGray">
      {pathname === "/dashboard" ? (
        <p className="text-swBlue text-xl">Dashboard</p>
      ) : pathname === "/my-tasks" ? (
        <p className="text-swBlue text-xl">My tasks</p>
      ) : pathname === "/loan-applications" ? (
        <p className="text-swBlue text-xl">Loan applications</p>
      ) : pathname === "/create-loan" ? (
        <p className="text-swBlue text-xl">Create loan</p>
      ) : pathname === "/report" ? (
        <p className="text-swBlue text-xl">Report</p>
      ) : pathname === "/team-management" ? (
        <p className="text-swBlue text-xl">Team management</p>
      ) : pathname === "/settings" ? (
        <p className="text-swBlue text-xl">Settings</p>
      ) : pathname === "/borrowers" ? (
        <p className="text-swBlue text-xl">Borrowers</p>
      ) : pathname === "/disbursement/all" ? (
        <p className="text-swBlue text-xl">Disbursements</p>
      ) : pathname === "/intrest-calculator" ? (
        <p className="text-swBlue text-xl">Interest calculator</p>
      ) : pathname === "/plans" ? (
        <p className="text-swBlue text-xl">Loan Plans and Packages</p>
      ) : (
        <div className="flex gap-1 items-end">
          {paths?.map((item, index) => (
            <div className="flex gap-1 items-end" key={index}>
              <p
                className={
                  index === paths?.length - 1
                    ? "text-swBlue flex text-xl"
                    : "text-lg"
                }
              >
                {item}
              </p>

              {index !== paths?.length - 1 && (
                <div className="flex text-lg">/</div>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default PagePath;
