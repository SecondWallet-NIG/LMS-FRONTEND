"use client";

import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const pusherKey =
  process.env.NEXT_PUBLIC_PUSHER_KEY || "2ebc289da196402b7438";
const pusherCluster =
  process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "mt1";

const RealTimeComponent = () => {
  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    let pusher;
    let bulkChannel;
    let loanChannel;
    let cancelled = false;

    const setup = async () => {
      const PusherModule = await import("pusher-js");
      const Pusher = PusherModule.default ?? PusherModule;

      if (cancelled) {
        return;
      }

      pusher = new Pusher(pusherKey, {
        cluster: pusherCluster,
        encrypted: true,
      });

      let user;
      try {
        user = JSON.parse(localStorage.getItem("user") || "null");
      } catch {
        user = null;
      }

      const userId = user?.data?.user?._id;
      if (userId) {
        bulkChannel = pusher.subscribe(`bulkCreation.${userId}`);
        bulkChannel.bind("bulkCreateCustomerProfile", (data) => {
          toast.info(data.message);
        });
      }

      loanChannel = pusher.subscribe("loan-notifications");

      const handleLoanInfoNotification = (data) => {
        toast.info(data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      };

      const handleTestLoanCalculationComplete = (data) => {
        const loanId = data?.loanId || "";
        toast.success(
          data.message ||
            `Calculations for test loan (${loanId}) are complete.`,
          {
            position: "top-right",
            autoClose: 6000,
            toastId: loanId ? `test-loan-done-${loanId}` : undefined,
          }
        );
      };

      loanChannel.bind("loan.created", handleLoanInfoNotification);
      loanChannel.bind("testLoan.created", handleLoanInfoNotification);
      loanChannel.bind(
        "testLoan.calculationComplete",
        handleTestLoanCalculationComplete
      );
    };

    setup();

    return () => {
      cancelled = true;
      if (bulkChannel) {
        bulkChannel.unbind_all();
      }
      if (loanChannel) {
        loanChannel.unbind_all();
      }
      if (pusher) {
        pusher.disconnect();
      }
    };
  }, []);

  return null;
};

export default RealTimeComponent;
