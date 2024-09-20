import Link from "next/link";
import { FaPeopleGroup } from "react-icons/fa6";
import { FiUser } from "react-icons/fi";
import { RiBox3Line } from "react-icons/ri";
import { TbReportMoney } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTeamManagementSummary } from "@/redux/slices/reportSlice";

const TeamManagementCard = () => {
  const dispatch = useDispatch();
  const  data  = useSelector((state) => state.report);

  useEffect(() => {
    dispatch(getTeamManagementSummary());
  }, []);
  const _data = [
    {
      label: <p className="text-lg font-semibold text-swDarkBlue">Department</p>,
      icon: <FaPeopleGroup className="font-light text-swDarkBlue" size={34} color=""  />,
      viewLink: "/team-management/department",
      count: data?.data?.data?.departmentCount
    },
    {
      label: <p className="text-lg font-semibold text-swDarkBlue">Staff</p>,
      icon: <FiUser className="font-light text-swDarkBlue" size={22}/>,
      viewLink: "/team-management/staff",
      count: data?.data?.data?.userCount
    },
    {
      label: <p className="text-lg font-semibold text-swDarkBlue">Role</p>,
      icon: <RiBox3Line className="font-light text-swDarkBlue" size={22}/>,
      viewLink: "/team-management/role",
      count: data?.data?.data?.roleCount
    },
    {
      label: <p className="text-lg font-semibold text-swDarkBlue">Operations</p>,
      icon: <TbReportMoney className="font-light text-swDarkBlue"  />,
      viewLink: "/team-management/operations",


    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mx-5 mt-10 mb-12 ">
      {_data.map((d, index) => {
        return (
          <Link key={index} href={d.viewLink}>
          <div className="flex flex-col border border-gray-200 bg-swLightGray px-5 py-4 gap-6 rounded-xl shadow-sm transition-transform transform hover:scale-105 h-40">
            <div className="flex justify-between items-center cursor-pointer">
              <div className="flex items-center gap-2">
                {d.icon}
            {d.label}
              </div>
              <Link href={d.viewLink}>
                <span className="bg-gray-200 text-gray-700 hover:bg-gray-300 text-xs lg:text-sm font-medium border border-gray-300 py-1.5 px-3 rounded-lg whitespace-nowrap transition-colors">
                  View
                </span>
              </Link>
            </div>
            <div className="flex flex-col items-end text-sm mt-4">
              <p className="text-lg font-semibold text-swDarkBlue">{d?.count} </p>
            </div>
          </div>
        </Link>
        )
      })}
    </div>
  );
};

export default TeamManagementCard;
