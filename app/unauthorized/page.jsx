"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Unauthorized = () => {
  const router = useRouter();
  const [counter, setCounter] = useState(5);
  const [roleTag, setRoleTag] = useState("");

  // if (counter > 0) {
  //   setInterval(() => {
  //     setCounter(counter - 1);
  //   }, 1000);
  // }

  // useEffect(() => {
  //   if (counter === 0) {
  //     if (typeof window !== "undefined") {
  //       const storedUser = JSON.parse(localStorage.getItem("user"));
  //       if (storedUser?.data?.user?.role.tag == "OFA") {
  //         router.push("/expenses");
  //       } else {
  //         router.back();
  //       }
  //     }
  //   }
  // }, [counter]);

  useEffect(() => {
    let interval;
    if (counter) {
      interval = setInterval(() => {
        setCounter(counter - 1);
      }, 1000);
    } else {
      router.push("/");
    }

    return () => {
      clearInterval(interval);
    };
  }, [counter]);

  return (
    <main className="flex  h-[100vh] w-full justify-center items-center">
      <div>
        <p className="text-7xl font-medium text-swBlue">401 - Unauthorized</p>
        <p className="text-4xl font-medium my-5">
          You are not authorized to access this page.
        </p>
        <p className="2xl font-medium">
          Returning you to the home page in{" "}
          <span className="text-swBlue">{counter}</span>
        </p>
      </div>
    </main>
  );
};

export default Unauthorized;
