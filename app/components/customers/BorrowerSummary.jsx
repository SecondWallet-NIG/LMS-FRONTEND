import CustomerSummaryCard from "../cards/Summary card/CustomerSummaryCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerLoanApplicationSummary } from "@/redux/slices/loanApplicationSlice";
import { useParams } from "next/navigation";
import BorrowerSummaryCard from "../cards/Summary card/BorrowerSummaryCard";

const BorrowerSummary = () => {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector(
    (state) => state.loanApplication
  );
  const { id } = useParams();
  // const data = [
  //   { loan_type: "total_loan_applications", number: 16, amount: 17983203.02 },
  //   { loan_type: "approved", number: 16, amount: 17983203.02 },
  //   { loan_type: "disbursed", number: 16, amount: 17983203.02 },
  //   { loan_type: "complete_repayments", number: 16, amount: 17983203.02 },
  //   { loan_type: "debts", number: 16, amount: 17983203.02 },
  //   { loan_type: "rejected/cancelled", number: 16, amount: 17983203.02 },
  // ];

  // const FinancialsData = [
  //   { loan_type: "amount_borrowed", number: 16, amount: 17983203.02 },
  //   { loan_type: "proposed_interest", number: "10%", amount: 17983203.02 },
  //   { loan_type: "interest_paid", number: 16, amount: 17983203.02 },
  // ];

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
      <p className="font-semibold text-md mb-4">Loan Stats</p>
      <BorrowerSummaryCard data={data?.data} />
      {/* <p className="font-semibold  text-md my-4">Financials</p>
      <CustomerSummaryCard data={FinancialsData} /> */}
    </main>
  );
};

export default BorrowerSummary;
