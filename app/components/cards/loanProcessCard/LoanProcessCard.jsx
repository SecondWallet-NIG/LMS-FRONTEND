import Image from "next/image";
import { LuMessageSquare } from "react-icons/lu";

const LoanProcessCard = ({ data }) => {
const _data = data?.data?.data;
console.log({data});
  return (
    <main className="flex flex-col">
      {Array.isArray(_data) && _data?.map((item, index) => (
        <div key={index} className="border-b border-gray-100 p-2">
          <div className="flex justify-between items-center">
            <p className="font-semibold capitalize text-xs">{item?.approvalTitle}</p>
            <div className="p-1 text-xs border border-gray-300 rounded-lg">
            {item?.status}
            </div>
          </div>
          <div className="flex items-end gap-2">
            {/* <p className="font-medium text-xs ">{item?.createdAt}</p> */}
            <p className="text-xs text-gray-700">{item?.updatedAt ? item?.updatedAt.slice(0, 10) : null}</p>
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
              {
                item?.assignee?.firstName ? <p className="font-medium text-xs text-swGray">{item?.assignee?.firstName} {item?.assignee?.lastName}</p> : <p className="text-xs">Yet to be assigned</p>
              }
            </div>
          </div>
        </div>
      ))}
    </main>
  );
};

export default LoanProcessCard;
