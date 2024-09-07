"use client";
import StaffData from "@/app/components/staffProfile/StaffProfile";

const StaffPage = () => {
  return (
    <StaffData
      path={["Team management", "Staff profile"]}
      isDashboard={false}
    />
  )
};

export default StaffPage;
