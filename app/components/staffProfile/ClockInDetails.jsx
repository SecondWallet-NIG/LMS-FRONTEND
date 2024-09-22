"use client";

import Button from "../shared/buttonComponent/Button";
import { format } from "date-fns";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  clockIn,
  clockOut,
  getCurrentDayAttendance,
} from "@/redux/slices/attendanceSlice";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SuccessModal from "../modals/SuccessModal";
import CancelModal from "../modals/CancelModal";

export default function ClockInDetails({ data, isDashboard }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [successModal, setSuccessModal] = useState({
    state: false,
    title: "",
    description: "",
  });
  const [failedModal, setFailedModal] = useState({
    state: false,
    title: "",
    description: "",
  });

  const { data: todayAttendance } = useSelector((state) => state.attendance);

  const returnCardDetails = (name, value) => {
    return (
      <div>
        <div className="font-medium text-swGrey400 text-sm">{name}</div>
        <div className="text-sm font-light text-swBlack">{value}</div>
      </div>
    );
  };

  const handleClockIn = () => {
    setLoading(true);
    dispatch(clockIn())
      .unwrap()
      .then((res) => {
        setSuccessModal({
          state: true,
          title: "Clock-in Successful",
          description: res?.message,
        });
        dispatch(getCurrentDayAttendance());
        setLoading(false);
      })
      .catch((err) => {
        setFailedModal({
          state: true,
          title: "Clock-in Failed",
          description: "Clock-in has failed, please try again",
        });
        console.log("err", err?.error);
        setLoading(false);
      });
  };

  const handleClockOut = () => {
    setLoading(true);
    dispatch(clockOut())
      .unwrap()
      .then((res) => {
        setSuccessModal({
          state: true,
          title: "Clock-out Successful",
          description: res?.message,
        });
        dispatch(getCurrentDayAttendance());
        setLoading(false);
      })
      .catch((err) => {
        setFailedModal({
          state: true,
          title: "Clock-in Failed",
          description: "Clock-out has failed, please try again",
        });
        setLoading(false);
      });
  };

  useEffect(() => {
    dispatch(getCurrentDayAttendance());
  }, []);

  return (
    <div className="rounded-xl overflow-hidden h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start p-5 bg-[#f7f7f7] border-b flex-wrap gap-5">
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
                  todayAttendance?.data?.status === "Early"
                    ? "bg-swGreen"
                    : "bg-red-500"
                }`}
              >
                {todayAttendance?.data?.status || "Yet to clock in"}
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
            onClick={() =>
              todayAttendance?.data?.clockout
                ? null
                : !todayAttendance?.data?.status
                ? handleClockIn()
                : handleClockOut()
            }
            disabled={loading || todayAttendance?.data?.clockOut}
          >
            <div
              className={`${
                todayAttendance?.data?.clockout || todayAttendance?.data?.status
                  ? "bg-swGreen"
                  : "bg-swIndicatorLightRed"
              }  h-3 w-3 rounded-full`}
            />
            <p className="">
              {todayAttendance?.data?.clockOut
                ? "Clocked in"
                : !todayAttendance?.data?.status
                ? "Clock In"
                : "Clock Out"}
            </p>
            <IoIosArrowForward size={20} />
          </Button>
        )}
      </div>
      <div className="p-5 bg-[#f7f7f7]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 rounded-xl bg-white p-5">
          {returnCardDetails("Date", format(new Date(), "dd/MM/yyyy"))}
          {returnCardDetails("Time", format(new Date(), "hh:mm a"))}
          {returnCardDetails(
            "Clock-In Time",
            (todayAttendance?.data?.clockIn &&
              format(new Date(todayAttendance?.data?.clockIn), "hh:mm a")) ||
              "Yet to clock in"
          )}
          {returnCardDetails(
            "Clock-Out Time",
            (todayAttendance?.data?.clockOut &&
              format(new Date(todayAttendance?.data?.clockOut), "hh:mm a")) ||
              "Yet to clock out"
          )}
          {returnCardDetails(
            "Clock-In Status",
            todayAttendance?.data?.status || "Yet to clock in"
          )}
        </div>
      </div>
      <SuccessModal
        isOpen={successModal.state}
        title={successModal.title}
        description={successModal.description}
        noButtons={true}
        onClose={() =>
          setSuccessModal({
            state: false,
            title: "",
            description: "",
          })
        }
      />
      <CancelModal
        isOpen={failedModal.state}
        title={failedModal.title}
        description={failedModal.description}
        noButtons={true}
        onClose={() =>
          setFailedModal({
            state: false,
            title: "",
            description: "",
          })
        }
      />
    </div>
  );
}
