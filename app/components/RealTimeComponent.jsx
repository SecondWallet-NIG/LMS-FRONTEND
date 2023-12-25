import React, { useEffect } from "react";
import Pusher from "pusher-js";

const pusher = new Pusher("19b78da79fdeeb108f04", {
  cluster: "mt1",
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
       alert(data.message)
    });

    return () => {
      channel.unbind_all();
      pusher.unsubscribe(`bulkCreation.${user?.data?.user?._id}`);
    };
  }, []);

  return <div></div>;
};

export default RealTimeComponent;
