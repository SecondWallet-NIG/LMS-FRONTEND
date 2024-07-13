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
      <p className="font-semibold text-xl mb-4 text-black mt-3">Porfolio health</p>
      <CustomerSummaryCard data={data?.data} />
      <p className="font-semibold text-xl text-black my-4">Financials</p>
      <CustomerSummaryCard data={data?.data} financialCards={true} />
    </main>
  );
};

export default InvestorSummary;
