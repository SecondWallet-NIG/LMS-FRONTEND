"use client";

import { useEffect } from "react";

const RealTimeComponent = () => {
  useEffect(() => {
    let pusher;
    let channel;
    let cancelled = false;

    const setupPusher = async () => {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      const userId = user?.data?.user?._id;

      if (!userId) {
        return;
      }

      const { default: Pusher } = await import("pusher-js");

      if (cancelled) {
        return;
      }

      pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "mt1",
      });

      channel = pusher.subscribe(`bulkCreation.${userId}`);
      channel.bind("bulkCreateCustomerProfile", (data) => {
        alert(data.message);
      });
    };

    setupPusher();

    return () => {
      cancelled = true;

      if (channel) {
        channel.unbind_all();
      }

      if (pusher) {
        pusher.disconnect();
      }
    };
  }, []);

  return null;
};

export default RealTimeComponent;
