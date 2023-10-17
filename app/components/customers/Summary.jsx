import SummaryCard from "../cards/Summary card/SummaryCard";

const Summary = () => {
  const data = [
    { loan_type: "total_loan_applications", number: 16, amount: 17983203.02 },
    { loan_type: "approved", number: 16, amount: 17983203.02 },
    { loan_type: "disbursed", number: 16, amount: 17983203.02 },
    { loan_type: "complete_repayments", number: 16, amount: 17983203.02 },
    { loan_type: "debts", number: 16, amount: 17983203.02 },
    { loan_type: "rejected/cancelled", number: 16, amount: 17983203.02 },
  ];

  const FinancialsData = [
    { loan_type: "amount_borrowed", number: 16, amount: 17983203.02 },
    { loan_type: "proposed_interest", number: "10%", amount: 17983203.02 },
    { loan_type: "interest_paid", number: 16, amount: 17983203.02 },
  ];
  return (
    <main>
      <p className="font-semibold text-lg mb-3">Loan Stats</p>
      <SummaryCard data={data} />
      <p className="font-semibold text-lg my-3">Financials</p>
      <SummaryCard data={FinancialsData} />
    </main>
  );
};

export default Summary;
