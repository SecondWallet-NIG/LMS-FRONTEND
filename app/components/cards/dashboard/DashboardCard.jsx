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
  return (
    <div
      style={{height: "170px", border: "1px solid #2769b359"}}
      className={`rounded-2xl p-5  ${
        blueBg ? "bg-swBlue text-white" : "bg-white"
      } w-full`}
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          {cardIcon && (
            <div className="flex justify-center w-fit items-center p-2 rounded-full bg-white bg-opacity-30 text-white">
              {cardIcon}
            </div>
          )}
          <p className={`font-semibold  text-[0.5rem] xs:text-[0.8rem] sm:text-xs ${blueBg ? "text-white" : "text-swBlue"}`}>{cardName}</p>
        </div>
        {cardLinkLabel && (
          <Link
            href={`${cardLink}`}
            className={`hover:bg-swLightGray hover:text-swBlue text-[0.5rem] xs:text-[0.6rem] sm:text-xs font-semibold  border py-2 px-4 rounded-lg whitespace-nowrap
            }`}
          >
            {cardLinkLabel}
          </Link>
        )}
      </div>
      <div className="mt-8 flex justify-center text-center text-base">
        {firstStat && (
          <div className="flex flex-col pr-3 xs:pr-5">
            <p className="text-[0.5rem] xs:text-[0.8rem] sm:text-xs font-bold">{firstStat[0]}</p>
            <p className="mt-1 text-[0.5rem] xs:text-[0.6rem] sm:text-xs">{firstStat[1]}</p>
          </div>
        )}
        {secondStat && (
          <div
            className={`flex flex-col border-l pl-3 xs:pl-5  ${
              thirdStat && "pr-3 xs:pr-5 "
            }`}
          >
            <p className="text-[0.5rem] xs:text-[0.8rem] sm:text-xs font-bold">{secondStat[0]}</p>
            <p className=" mt-1 text-[0.5rem] xs:text-[0.6rem] sm:text-xs">{secondStat[1]}</p>
            {secondStat[2] && (
              <p
                className={` mt-1 text-[0.5rem] xs:text-[0.6rem] sm:text-xs ${"bg-[#E8F7F0]"} p-1 px-2 rounded-full text-swGreen w-fit mx-auto`}
              >
                {secondStat[2]}%
              </p>
            )}
          </div>
        )}
        {thirdStat && thirdStat.length > 1 ? (
          <div className="flex flex-col border-l pl-3 xs:pl-5 ">
            <p className="text-[0.5rem] xs:text-[0.8rem] sm:text-xs font-bold">{thirdStat[0]}</p>
            <p className="font-semibold mt-1 text-[0.5rem] xs:text-[0.6rem] sm:text-xs">{thirdStat[1]}</p>
            <p
              className={`mt-1 text-[0.5rem] xs:text-[0.6rem] sm:text-xs ${"bg-[#E8F7F0]"} py-1 px-2 rounded-full text-swGreen w-fit mx-auto`}
            >
              {thirdStat[2]}%
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default DashboardCard;
