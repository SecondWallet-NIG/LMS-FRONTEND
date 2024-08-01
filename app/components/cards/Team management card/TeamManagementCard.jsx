import Link from "next/link";
import { FaPeopleGroup } from "react-icons/fa6";
import { FiUser } from "react-icons/fi";
import { RiBox3Line } from "react-icons/ri";
import { TbReportMoney } from "react-icons/tb";

const TeamManagementCard = () => {
  const data = [
    {
      label: "Department",
      icon: <FaPeopleGroup className="font-light" size={22} />,
      viewLink: "/team-management/department"
    },
    {
      label: "Staff",
      icon: <FiUser className="font-light" size={22} />,
      viewLink: "/team-management/staff"
    },
    {
      label: "Role",
      icon: <RiBox3Line className="font-light" size={22} />,
      viewLink: "/team-management/role"
    },
    {
      label: "Financial Year",
      icon: <TbReportMoney className="font-light" size={22} />,
      viewLink: "/team-management/financial-year"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mx-5 mt-10 mb-12">
      {data.map((d, index) => {
        return (
          <Link key={index} href={d.viewLink}>
            <div className="flex flex-col border hover:border-sky-500 bg-swGrey10 px-5 py-6 gap-7 rounded-xl">
              <div className="flex justify-between cursor-pointer">
                <div className="flex gap-2">
                  {d.icon}
                  <p className="text-md font-semibold text-swGray">{d.label}</p>
                </div>
                <Link href={d.viewLink}>
                  <span className="hover:bg-swLightGray hover:text-swGray text-[0.5rem] xs:text-[0.6rem] lg:text-xs font-semibold  border py-2 px-4 rounded-lg whitespace-nowrap">
                    view
                  </span>
                </Link>
              </div>
              <div className="flex-col text-sm gap-10 mx-auto">
                <p>Total</p>
                <p className="flex justify-center font-medium">20</p>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  );
};

export default TeamManagementCard;
