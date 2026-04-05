import React, { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pusher from "pusher-js";

const pusherKey =
  process.env.NEXT_PUBLIC_PUSHER_KEY || "2ebc289da196402b7438";
const pusherCluster =
  process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "mt1";

const pusher = new Pusher(pusherKey, {
  cluster: pusherCluster,
  encrypted: true,
});

const RealTimeComponent = () => {
  useEffect(() => {
    let user;
    if (typeof window !== 'undefined') {
       user = JSON.parse(localStorage.getItem("user"));
    }


    const channel = pusher.subscribe(`bulkCreation.${user?.data?.user?._id}`);

    channel.bind("bulkCreateCustomerProfile", (data) => {
       toast.info(data.message);
    });

    // Subscribe to loan notifications
    const loanChannel = pusher.subscribe('loan-notifications');
    
    const handleLoanNotification = (data) => {
      toast.info(data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    };

    loanChannel.bind('loan.created', handleLoanNotification);
    loanChannel.bind('testLoan.created', handleLoanNotification);
    loanChannel.bind('testLoan.calculationComplete', handleLoanNotification);

    return () => {
      channel.unbind_all();
      pusher.unsubscribe(`bulkCreation.${user?.data?.user?._id}`);
      
      loanChannel.unbind_all();
      pusher.unsubscribe('loan-notifications');
    };
  }, []);

  return <div></div>;
};

export default RealTimeComponent;
