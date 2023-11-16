import Image from "next/image";
import { LuMessageSquare } from "react-icons/lu";

const LoanProcessCard = ({ data }) => {
const _data = data?.data?.data;
console.log({_data});
  data = [
    {
      loan_status: "loan created",
      by: {
        name: "John Doe",
        profile_pic: "https://cdn-icons-png.flaticon.com/512/4128/4128349.png",
        position: "loan officer",
        date: "11/02/2023",
        time: "11:52 pm",
      },
    },
    {
      loan_status: "credit approved",
      by: {
        name: "mariam Joel",
        profile_pic: "https://cdn-icons-png.flaticon.com/512/4128/4128349.png",
        position: "loan officer",
        date: "11/02/2023",
        time: "11:52 pm",
      },
    },
    {
      loan_status: "loan vetted",
      by: {
        name: "Paul Austin",
        profile_pic: "https://cdn-icons-png.flaticon.com/512/4128/4128349.png",
        position: "loan officer",
        date: "11/02/2023",
        time: "11:52 pm",
      },
    },
  ];
  return (
    <main className="flex flex-col">
      {_data && _data.map((item, index) => (
        <div key={index} className="border-b border-gray-100 p-2">
          <div className="flex justify-between items-center">
            <p className="font-semibold capitalize text-xs">{item?.status}</p>
            <div className="p-2 border border-gray-300 rounded-lg">
              <LuMessageSquare size={20} />
            </div>
          </div>
          <div className="flex items-end gap-2">
            {/* <p className="font-medium text-xs ">{item?.createdAt}</p> */}
            <p className="text-xs text-gray-200">{item?.updatedAt}</p>
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
              <p className="font-medium text-xs text-swGray">{item?.assignee?.firstName} {item?.assignee?.lastName}</p>
              <p className="font-medium  text-xs text-swBlue">{item?.assignee?.role?.name}</p>
            </div>
          </div>
        </div>
      ))}
    </main>
  );
};

export default LoanProcessCard;
