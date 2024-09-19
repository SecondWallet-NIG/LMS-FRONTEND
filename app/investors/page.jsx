"use client";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import { Poppins } from "next/font/google";
import InvestmentProducts from "../components/investments/InvestmentsProducts";
import { useImmer } from "use-immer";
import InvestorsRecords from "../components/investments/InvestorsRecords";
import InvestmentsRecords from "../components/investments/InvestmentsRecords";
import WithdrawalSchedule from "../components/investments/WithdrawalSchedule";

const poppins = Poppins({ weight: "500", subsets: ["latin"] });

const Investors = () => {
  const navClass = "gap-2 py-2 px-6 hover:text-swBlue";
  const selected =
    "font-semibold text-swBlue gap-2 border-solid border-b-2 border-sky-700";
  const [state, setState] = useImmer({
    selectedNav: "inPro",
  });
  const { selectedNav } = state;
  const navs = [
    { name: "Investment Products", selOption: "inPro" },
    { name: "Investors Records", selOption: "intRec" },
    { name: "Investment Records", selOption: "inRec" },
    { name: "Withdrawal Schedule", selOption: "withSch" },
  ];
  const roles = [
    "LO",
    "CFO",
    "CEO",
    "CAO",
    "ICO",
    "COF",
    "HRM",
    "LR0",
    "CT0",
    "Dir",
    "System Admin",
  ];

  function handleNav(selOption) {
    if (selOption !== selectedNav) {
      setState((draft) => {
        draft.selectedNav = selOption;
      });
    }
  }

  return (
    <DashboardLayout roles={roles}>
      <div className="">
        <div className="flex justify-between mt-5 mb-10 px-5">
          <div
            className={`${poppins.className} text-base leading-6 cursor-pointer`}
          >
            {navs.map((nav) => {
              return (
                <span
                  onClick={() => handleNav(nav.selOption)}
                  key={nav.name}
                  className={`${navClass} ${
                    selectedNav === nav.selOption ? selected : ""
                  }`}
                >
                  {nav.name}
                </span>
              );
            })}
          </div>
        </div>

        <div>
          {selectedNav === "inPro" && <InvestmentProducts />}
          {selectedNav === "intRec" && <InvestorsRecords />}
          {selectedNav === "inRec" && <InvestmentsRecords />}
          {selectedNav === "withSch" && <WithdrawalSchedule />}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Investors;
