"use client"
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import { Poppins } from "next/font/google";
import InvestmentProducts from "../components/investments/InvestmentsProducts";
import { useImmer } from "use-immer";
import InvestorsRecords from "../components/investments/InvestorsRecords";
import InvestmentsRecords from "../components/investments/InvestmentsRecords";

const poppins = Poppins({ weight: '500', subsets: ["latin"] });


const Investors = () => {
  const navClass = 'gap-2 py-2 px-6 hover:text-swBlue'
  const selected = 'font-semibold text-swBlue gap-2 border-solid border-b-2 border-sky-700'
  const [state, setState] = useImmer({
    selectedNav: 'inPro'
  })
  const { selectedNav } = state
  const navs = [
    { name: 'Investment products', selOption: 'inPro' },
    { name: 'Investors records', selOption: 'intRec' },
    { name: 'Investment records', selOption: 'inRec' }
  ]

  function handleNav(selOption) {
    if (selOption !== selectedNav) {
      setState(draft => {
        draft.selectedNav = selOption
      })
    }
  }

  return (
    <DashboardLayout>
      <div className="">
        <div className="flex justify-between mt-5 mb-10 px-5">
          <div className={`${poppins.className} text-base leading-6 cursor-pointer`}>
            {
              navs.map(nav => {
                return (
                  <span onClick={() => handleNav(nav.selOption)} key={nav.name} className={
                    `${navClass} ${selectedNav === nav.selOption ? selected : ''}`
                  }>
                    {nav.name}
                  </span>
                )
              })
            }
          </div>
        </div>

        <div>
          {selectedNav === 'inPro' && <InvestmentProducts />}
          {selectedNav === 'intRec' && <InvestorsRecords />}
          {selectedNav === 'inRec' && <InvestmentsRecords />}
        </div>
      </div>

    </DashboardLayout>
  );
};

export default Investors;
