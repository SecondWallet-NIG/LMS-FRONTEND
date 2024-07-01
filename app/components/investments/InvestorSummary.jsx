import CustomerSummaryCard from "../cards/Summary card/CustomerSummaryCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoanApplicationSummary,
  getCustomerLoanApplicationSummary,
} from "@/redux/slices/loanApplicationSlice";
import { useParams } from "next/navigation";

const InvestorSummary = () => {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector(
    (state) => state.loanApplication
  );
  const { id } = useParams();

  const fetchSummary = () => {
    if (id) {
      const payload = {
        customerId: id,
      };
      dispatch(getCustomerLoanApplicationSummary(payload));
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <main>
      <p className="font-semibold text-md mb-4">Porfolio health</p>
      <CustomerSummaryCard data={data?.data} />
      {/* <p className="font-semibold  text-md my-4">Financials</p>
      <CustomerSummaryCard data={FinancialsData} /> */}
    </main>
  );
};

export default InvestorSummary;
