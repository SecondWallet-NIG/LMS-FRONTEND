import React, { useEffect } from "react";
import Pusher from "pusher-js";

const pusher = new Pusher("19b78da79fdeeb108f04", {
  cluster: "mt1",
  encrypted: true,
});

const RealTimeComponent = () => {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    const channel = pusher.subscribe(`bulkCreation.${user?.data?.user?._id}`);

    channel.bind("bulkCreateCustomerProfile", (data) => {
      console.log("Received a message:", data.message);
       alert(data.message)
    });

    return () => {
      // Unsubscribe when the component is unmounted
      channel.unbind_all();
      pusher.unsubscribe(`bulkCreation.${user?.data?.user?._id}`);
    };
  }, []);

  return <div></div>;
};

export default RealTimeComponent;
