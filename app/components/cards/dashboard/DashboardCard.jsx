import Link from "next/link";
const DashboardCard = ({
  cardIcon,
  iconBg,
  iconColor,
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
      className={`group relative overflow-hidden rounded-2xl border border-gray-100/90 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:border-swBlue/15 ${
        blueBg ? "bg-swBlue text-white border-transparent shadow-md" : ""
      } w-full min-h-[10.5rem]`}
    >
      {!blueBg && (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-swBlue/80 via-swBlue/40 to-swBlue/10 opacity-90"
          aria-hidden
        />
      )}
      <div className="flex justify-between items-start gap-2">
        <div className="flex min-w-0 flex-1 gap-3 items-center">
          {cardIcon && (
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl shadow-[0_2px_8px_-2px_rgba(39,105,179,0.12)] ring-1 ring-black/[0.05] ${iconBg} ${iconColor}`}
              aria-hidden
            >
              {cardIcon}
            </div>
          )}
          <p
            className={`font-semibold leading-snug text-[0.65rem] xs:text-sm lg:text-[0.95rem] ${
              blueBg ? "text-white" : "text-swGrey500"
            }`}
          >
            {cardName}
          </p>
        </div>
        {cardLinkLabel && (
          <Link
            href={`${cardLink || "#"}`}
            className={`shrink-0 rounded-lg border border-swBlue/20 bg-swBlueActiveStateBg px-3 py-1.5 text-[0.55rem] xs:text-xs font-semibold text-swBlue transition-colors hover:bg-swBlue hover:text-white whitespace-nowrap ${
              blueBg
                ? "border-white/30 bg-white/10 text-white hover:bg-white hover:text-swBlue"
                : ""
            }`}
          >
            {cardLinkLabel}
          </Link>
        )}
      </div>
      <div className="mt-6 flex justify-center text-center text-base">
        {firstStat && (
          <div className="flex flex-col pr-3 xs:pr-5">
            <p
              className={`text-[0.55rem] xs:text-xs lg:text-sm font-medium uppercase tracking-wide text-swGrey200 ${
                blueBg ? "text-white/80" : ""
              }`}
            >
              {firstStat[0]}
            </p>
            <p
              className={`mt-2 text-[0.65rem] xs:text-sm lg:text-base font-semibold tabular-nums ${
                blueBg ? "text-white" : "text-swGrey500"
              }`}
            >
              {firstStat[1]}
            </p>
          </div>
        )}
        {secondStat && (
          <div
            className={`flex flex-col border-l border-gray-100 pl-3 xs:pl-5 ${
              thirdStat && "pr-3 xs:pr-5 "
            }`}
          >
            <p
              className={`text-[0.55rem] xs:text-xs lg:text-sm font-medium uppercase tracking-wide text-swGrey200 ${
                blueBg ? "text-white/80" : ""
              }`}
            >
              {secondStat[0]}
            </p>
            <p
              className={`mt-2 text-[0.65rem] xs:text-sm lg:text-base font-semibold tabular-nums ${
                blueBg ? "text-white" : "text-swGrey500"
              }`}
            >
              {secondStat[1]}
            </p>
            {secondStat[2] && (
              <p
                className={` mt-1 text-[0.5rem] xs:text-[0.6rem] lg:text-sm ${"bg-[#E8F7F0]"} p-1 px-2 rounded-full text-swGreen w-fit mx-auto`}
              >
                {secondStat[2]}%
              </p>
            )}
          </div>
        )}
        {thirdStat && thirdStat.length > 1 ? (
          <div className="flex flex-col border-l border-gray-100 pl-3 xs:pl-5">
            <p className="text-[0.55rem] xs:text-xs lg:text-sm font-medium uppercase tracking-wide text-swGrey200">
              {thirdStat[0]}
            </p>
            <p className="mt-1 text-[0.65rem] xs:text-sm lg:text-base font-semibold tabular-nums text-swGrey500">
              {thirdStat[1]}
            </p>
            <p
              className={`mt-1 text-[0.5rem] xs:text-[0.6rem] lg:text-xs ${"bg-[#E8F7F0]"} py-1 px-2 rounded-full text-swGreen w-fit mx-auto`}
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
