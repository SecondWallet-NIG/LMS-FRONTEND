"use client";

import { useRouter } from "next/navigation";
import Button from "../shared/buttonComponent/Button";
import { AiOutlinePlus } from "react-icons/ai";
import { format } from "date-fns";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";

export default function ClockInDetails({ data, isDashboard }) {
  // const router = useRouter();
  // console.log({ data });
  const returnCardDetails = (name, value) => {
    return (
      <div>
        <div className="font-medium text-swGrey400">{name}</div>
        <div className="text-lg font-semibold text-swBlack">{value}</div>
      </div>
    );
  };

  return (
    <div className="rounded-xl overflow-hidden h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start p-5 bg-swGrey25 border-b flex-wrap gap-5">
        <div>
          <div>
            <div className="flex items-center gap-5">
              <div className="flex gap-1 items-center">
                <Image
                  src="/images/clockIcon.png"
                  alt="money"
                  height={30}
                  width={30}
                />
                <p className="text-lg font-semibold text-swBlue">
                  Clock-In Info
                </p>
              </div>
              <div
                className={`text-white text-xs py-1 px-3 rounded-full ${
                  data?.user?.status === "Early" ? "bg-swGreen" : "bg-red-500"
                }`}
              >
                {data?.user?.status}
              </div>
            </div>
            <p className="text-sm text-swGray400">
              Attendance roster which contributes to your performance review.
            </p>
          </div>
        </div>
        {isDashboard && (
          <Button
            variant="outlined"
            className="font-semibold border-swBlue text-swBlue p-3 rounded-lg flex items-center gap-2 custom-hover-outline"
            onClick={() => null}
          >
            <div className="bg-swGreen h-3 w-3 rounded-full" />
            <p className="">Clock In</p>
            <IoIosArrowForward size={20} />
          </Button>
        )}
      </div>
      <div className="p-5 bg-swGrey25">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 rounded-xl bg-white p-5">
          {returnCardDetails("Date", format(new Date(), "dd/MM/yyyy"))}
          {returnCardDetails("Time", format(new Date(), "hh:mm a"))}
          {returnCardDetails("Clock-In Time", "Yet to clock In")}
          {returnCardDetails("Clock-Out Time", "Yet to clock On")}
          {returnCardDetails("Clock-In Status", "Yet to clock In")}
        </div>
      </div>
    </div>
  );
}
