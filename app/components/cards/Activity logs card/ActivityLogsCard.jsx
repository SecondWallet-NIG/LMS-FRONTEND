import Image from "next/image";

const ActivityLogsCard = ({ data }) => {
  data = [
    {
      loan_state: "disbursed",
      by: {
        id: "JDL-287301",
        name: "Benjamin franklin",
        profile_pic: "https://cdn-icons-png.flaticon.com/512/4128/4128349.png",
      },
      amount: 25000000,
      duration: "6 months",
    },
    {
      loan_state: "created",
      by: {
        id: "JDL-287301",
        name: "Benjamin franklin",
        profile_pic: "https://cdn-icons-png.flaticon.com/512/4128/4128349.png",
      },
      amount: 25000000,
      duration: "6 months",
    },
    {
      loan_state: "approved",
      by: {
        id: "JDL-287301",
        name: "Benjamin franklin",
        profile_pic: "https://cdn-icons-png.flaticon.com/512/4128/4128349.png",
      },
      amount: 25000000,
      duration: "6 months",
    },
    {
      loan_state: "disbursed",
      by: {
        id: "JDL-287301",
        name: "Benjamin franklin",
        profile_pic: "https://cdn-icons-png.flaticon.com/512/4128/4128349.png",
      },
      amount: 25000000,
      duration: "6 months",
    },
  ];
  return (
    <main>
      {data.map((item, index) => (
        <div className="flex" key={index}>
          <div className="flex gap-2 py-4 w-full">
            <div className="flex flex-col items-center">
              <div className={`p-1 rounded-full bg-purple-600`} />
              <div className="h-8 w-[0.6rem] border-2 border-gray-300 mt-1 ml-[0.35rem] border-r-0 border-t-0 rounded-bl-md" />
            </div>
            <div className="w-full">
              <div className="flex gap-3 -mt-2">
                <p className="p-0 m-0">
                  {item.loan_state === "disbursed"
                    ? "Loan disbursed by"
                    : item.loan_state === "created"
                    ? "Loan created by"
                    : "Credit approved by"}
                </p>
                <div className="flex gap-1 px-1 border border-gray-300 items-center rounded-md">
                  <div className={`p-[0.15rem] rounded-full bg-purple-600`} />
                  <Image
                    src={item.by.profile_pic}
                    alt="user image"
                    width={20}
                    height={20}
                  />
                  <p className="text-xs">{item.by.name}</p>
                </div>
              </div>
              <div className="p-2 w-full border border-gray-300 bg-gray-100 mt-2 rounded-lg font-medium">
                <div className="flex justify-between mb-2 text-lg">
                  <p  className="text-sm">{item.amount}</p>
                  <p className="text-sm">{item.disbursed_by?.id}</p>
                </div>
                <p className="text-sm">
                  Basic loan
                  <span className="font-light"> for a duration of</span>
                  {item.duration}
                </p>
              </div>
            </div>
          </div>
          <div className="ml-3 text-gray-300 whitespace-nowrap pt-3">
            10:59 pm
          </div>
        </div>
      ))}
    </main>
  );
};

export default ActivityLogsCard;
