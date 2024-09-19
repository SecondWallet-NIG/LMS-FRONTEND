"use client";

import { useRouter } from "next/navigation";
import Button from "../shared/buttonComponent/Button";
import { AiOutlinePlus } from "react-icons/ai";
import { format } from "date-fns";

export default function ClockInDetails({ data, isDashboard }) {
  // const router = useRouter();
  // console.log({ data });
  const returnCardDetails = (name, value) => {
    return (
      <div>
        <p className="text-xs font-medium text-swGrey400">{name}</p>
        <p className="text-sm font-medium text-swBlack">{value}</p>
      </div>
    );
  };

  return (
    <div className="p-2 border-2 rounded-lg h-full">
      <div className="flex items-center justify-between">
        <p className="text-swBlue font-medium text-md">Clock-in Information</p>
        {isDashboard && (
          <Button
            className="border border-swBlue text-swBlue hover:bg-swDarkBlue text-xs md:p-[0.37rem] rounded-md ml-2 whitespace-nowrap flex gap-1"
            onClick={() => null}
          >
            <p className="">Clock-in</p>
          </Button>
        )}
      </div>
      <div className="grid grid-cols-2 gap-5 mt-2">
        {returnCardDetails("Date", format(new Date(), "dd-MM-yyyy"))}
        {returnCardDetails("Time", format(new Date(), "hh:mm a"))}
        {returnCardDetails("Clock-in Time", "Not yet clocked in")}
        {returnCardDetails("Clock-out Time", "Not yet clocked in")}
        {returnCardDetails("Clock-in Status", "Yet to clock in for today")}
      </div>
    </div>
  );
}
