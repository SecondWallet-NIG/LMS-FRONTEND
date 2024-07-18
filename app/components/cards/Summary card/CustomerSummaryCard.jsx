

const Card = ({ value, title, extraVal }) => {
  return (
    <div>
      <div className="p-5 bg-gray-100 text-base rounded-xl">
        <div className="flex gap-2 text-red items-center">
          <div className="text-base leading-6 text-swTextColor font-medium">
            {title}
          </div>
        </div>
        <div className="flex items-center justify-between font-semibold mt-5">
          <p className="text-4xl leading-10 text-swBlue700">
            {value}
          </p>
          {extraVal && <p className={`text-base text-swBlack font-medium leading-6 ${!value ? "mx-auto" : ""}`}>{extraVal} NGN</p>}
        </div>
      </div>
    </div>
  );
};

const CustomerSummaryCard = ({ data, financialCards }) => {
  return (
    <>
      {!financialCards && (
        <main className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card title="Total Investments" value={3} extraVal={35837828.93} />
          <Card title="Average ROI" value={`${32}%`} />
          <Card title="Maturity Amount" value={3} extraVal={35837828.93} />
          <Card title="Withdrawals" value={5} extraVal={35837828.93} />
        </main>
      )}
  
      {financialCards && (
        <main className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card title="Annual Income" extraVal={35837828.93} />
          <Card title="Networth" extraVal={35837828.93} />
          <Card title="Source of Income" extraVal={35837828.93} />
        </main>
      )}
    </>
  );
};

export default CustomerSummaryCard;
