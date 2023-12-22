import Image from "next/image";

const LoanProcessCard = ({ data }) => {
  const _data = data?.data?.data;
  console.log({_data});
  return (
    <main className="flex flex-col">
      {Array.isArray(_data) &&
        _data?.map((item, index) => (
          <div key={index} className="border-b border-gray-100 p-2">
            <div className="flex justify-between items-center">
              <p className="font-semibold capitalize text-xs text-black">
                {item?.approvalTitle}
              </p>

              <button
               className={`cursor-none ${
                item.status === "Approved"
                  ? "bg-[#E8F7F0] text-[#107E4B]  text-xs font-normal px-2 py-1 rounded-full"
                  : item.status === "Pending"
                  ? "bg-swLightGray text-swGray text-xs font-normal px-2 py-1 rounded-full"
                  : item.status === "Approval Requested"
                  ? "bg-red-400 text-white text-xs font-normal px-2 py-1 rounded-full"
                  : item.status === "Declined"
                  ? "bg-red-500 text-white text-xs font-normal px-2 py-1 rounded-full"
                  : "bg-gray-300 text-gray-800 text-xs font-normal px-2 py-1 rounded-full"
              } px-2 py-1 rounded`}
              >
                {item.status}
              </button>
            </div>
            <div className="flex items-end gap-2">
              {/* <p className="font-medium text-xs ">{item?.createdAt}</p> */}
              <p className="text-xs text-swBlue">
                {item?.updatedAt ? item?.updatedAt.slice(0, 10) : null}
              </p>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Image
                src={"https://cdn-icons-png.flaticon.com/512/4128/4128349.png"}
                alt="profile pic"
                className="rounded-full"
                height={50}
                width={50}
              />
              <div>
                <button
                  className={`flex text-sm font-semibold border-2 border-white rounded-lg overflow-hidden cursor-pointer `}
                >
                  {item?.assignee?.firstName ? (
                    <p className="font-medium text-xs text-black">
                      {item?.assignee?.firstName} {item?.assignee?.lastName}
                    </p>
                  ) : (
                    <p className="text-xs">Yet to be assigned</p>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
    </main>
  );
};

export default LoanProcessCard;
