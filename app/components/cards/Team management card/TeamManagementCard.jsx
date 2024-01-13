const TeamManagementCard = ({ data }) => {
  data = [
    {
      staff_type: "Total staffs",
      staff_no: 16,
    },
    {
      staff_type: "Active staffs",
      staff_no: 4,
    },
    {
      staff_type: "Archived staffs",
      staff_no: 2,
    },
  ];
  return (
    <main className="grid grid-cols-1 sm:grid-cols-3 gap-2  px-6 py-8">
      {data.map((item, index) => (
        <div
          key={index}
          className={`w-full rounded-lg p-3 border border-swGray }`}
        >
          <p className="text-swBlue font-semibold">{item.staff_type}</p>
          <p className="font-semibold text-swGray text-3xl mt-4">
            {item.staff_no}
          </p>
        </div>
      ))}
    </main>
  );
};

export default TeamManagementCard;
