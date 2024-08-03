import Link from "next/link";
import { FaPeopleGroup } from "react-icons/fa6";
import { FiUser } from "react-icons/fi";
import { RiBox3Line } from "react-icons/ri";
import { TbReportMoney } from "react-icons/tb";

const TeamManagementCard = () => {
  const data = [
    {
      label: "Department",
      icon: <FaPeopleGroup className="font-light text-swDarkBlue" size={22}   />,
      viewLink: "/team-management/department"
    },
    {
      label: "Staff",
      icon: <FiUser className="font-light text-swDarkBlue" size={22}/>,
      viewLink: "/team-management/staff"
    },
    {
      label: "Role",
      icon: <RiBox3Line className="font-light text-swDarkBlue" size={22}/>,
      viewLink: "/team-management/role"
    },
    {
      label: "Financial Year",
      icon: <TbReportMoney className="font-light text-swDarkBlue" size={22}  />,
      viewLink: "/team-management/financial-year"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mx-5 mt-10 mb-12">
      {data.map((d, index) => {
        return (
          <Link key={index} href={d.viewLink}>
          <div className="flex flex-col border border-gray-200 hover:border-sky-500 bg-swLightGray px-6 py-4 gap-6 rounded-xl shadow-sm transition-transform transform hover:scale-105">
            <div className="flex justify-between items-center cursor-pointer">
              <div className="flex items-center gap-3">
                {d.icon}
                <p className="text-lg font-semibold text-swDarkBlue">{d.label}</p>
              </div>
              <Link href={d.viewLink}>
                <span className="bg-gray-200 text-gray-700 hover:bg-gray-300 text-xs lg:text-sm font-medium border border-gray-300 py-1.5 px-3 rounded-lg whitespace-nowrap transition-colors">
                  View
                </span>
              </Link>
            </div>
            <div className="flex flex-col items-end text-sm mt-4">
              {/* <p className="text-gray-500">Total</p> */}
              <p className="text-lg font-semibold text-swDarkBlue">20</p>
            </div>
          </div>
        </Link>
        
        )
      })}
    </div>
  );
};

export default TeamManagementCard;
