import CustomerSummaryCard from "../cards/Summary card/CustomerSummaryCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerLoanApplicationSummary } from "@/redux/slices/loanApplicationSlice";
import { useParams } from "next/navigation";
import { getSingleInvestment } from "@/redux/slices/investmentSlice";

const InvestorSummary = () => {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector(
    (state) => state.investment
  );
  const { id } = useParams();

  const fetchSummary = () => {
    if (id) {
      dispatch(getSingleInvestment(id));
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <main>
      <p className="font-semibold text-xl mb-4 text-black mt-3">
        Portfolio Health
      </p>
      <CustomerSummaryCard data={data?.data} />

      {/* <CustomerSummaryCard data={data?.data} financialCards={data?.data} /> */}
    </main>
  );
};

export default InvestorSummary;
