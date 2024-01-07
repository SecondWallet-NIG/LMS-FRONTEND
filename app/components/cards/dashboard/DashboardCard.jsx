import Link from "next/link";

const DashboardCard = ({
  cardIcon,
  blueBg,
  cardName,
  cardLink,
  cardLinkLabel,
  firstStat,
  secondStat,
  thirdStat,
}) => {
  console.log("thirdStat", thirdStat?.length);
  return (
    <div
      className={`rounded-2xl p-5  ${
        blueBg ? "bg-swBlue text-white" : "bg-white border"
      } w-full`}
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          {cardIcon && (
            <div className="flex justify-center w-fit items-center p-2 rounded-full bg-white bg-opacity-30 text-white">
              {cardIcon}
            </div>
          )}
          <p className="font-semibold text-sm">{cardName}</p>
        </div>
        {cardLinkLabel && (
          <Link
            href={`${cardLink}`}
            className={` text-sm font-semibold  border py-2 px-4 rounded-lg whitespace-nowrap
            }`}
          >
            {cardLinkLabel}
          </Link>
        )}
      </div>
      <div className="mt-4 flex justify-center text-center text-base">
        {firstStat && (
          <div className="flex flex-col pr-5 lg:pr-10">
            <p className="text-sm">{firstStat[0]}</p>
            <p className="mt-1 text-sm">{firstStat[1]}</p>
          </div>
        )}
        {secondStat && (
          <div
            className={`flex flex-col border-l pl-5 lg:pl-10 ${
              thirdStat && "pr-5 lg:pr-10"
            }`}
          >
            <p className="text-sm">{secondStat[0]}</p>
            <p className=" mt-1 text-sm">{secondStat[1]}</p>
            {secondStat[2] && (
              <p
                className={` mt-1 text-sm ${"bg-[#E8F7F0]"} p-1 px-2 rounded-full text-swGreen w-fit mx-auto`}
              >
                {secondStat[2]} %
              </p>
            )}
          </div>
        )}
        {thirdStat && thirdStat.length > 1 ? (
          <div className="flex flex-col border-l pl-5 lg:pl-5">
            <p className="text-sm">{thirdStat[0]}</p>
            <p className="font-semibold mt-1 text-sm">{thirdStat[1]}</p>
            <p
              className={`font-semibold mt-1 text-ss ${"bg-[#E8F7F0]"} py-1 px-2 rounded-full text-swGreen w-fit mx-auto`}
            >
              {thirdStat[2]} %
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default DashboardCard;
