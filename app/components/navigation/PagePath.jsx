import { usePathname } from "next/navigation";

const PagePath = () => {
  const pathname = usePathname();
  return (
    <main className="font-semibold text-sm text-swBlue">
      {pathname === "/dashboard" && <p>Dashboard</p>}
      {pathname === "/my-tasks" && <p>My tasks</p>}
      {pathname === "/create-loan" && <p>Create loan</p>}
      {pathname === "/customers" && <p>Customers</p>}
      {pathname === "/disbursement/all" && <p>Disbursements</p>}
      {pathname === "/intrest-calculator" && <p>Interest calculator</p>}
    </main>
  );
};

export default PagePath;
