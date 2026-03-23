"use client";

import { useState } from "react";
import { LuUser } from "react-icons/lu";

/** Valid profile image URL (excludes missing / literal "null" strings) */
export const getProfilePictureSrc = (customer) => {
  const p = customer?.profilePicture;
  if (p == null || p === "") return null;
  if (String(p).trim().toLowerCase() === "null") return null;
  return p;
};

export const getCustomerInitials = (customer) => {
  const f = (customer?.firstName || "").trim();
  const l = (customer?.lastName || "").trim();
  const a = f.charAt(0);
  const b = l.charAt(0);
  if (a && b) return `${a}${b}`.toUpperCase();
  if (f.length >= 2) return f.slice(0, 2).toUpperCase();
  if (f.length === 1) return f.toUpperCase();
  return "";
};

/** Photo when valid; otherwise initials on brand gradient, or user icon.
 *  Parent should pass `key` when customer/photo identity changes so load errors reset. */
export default function BorrowerAvatar({
  customer,
  className = "h-11 w-11",
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const src = getProfilePictureSrc(customer);
  const initials = getCustomerInitials(customer);
  const showPhoto = Boolean(src) && !imgFailed;

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full border border-gray-200 ${className}`}
    >
      {showPhoto ? (
        <img
          src={src}
          alt=""
          className="h-full w-full object-cover"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center bg-gradient-to-br from-swBlue to-swDarkBlue text-[11px] font-bold text-white sm:text-xs"
          aria-hidden
        >
          {initials ? (
            <span>{initials}</span>
          ) : (
            <LuUser className="h-5 w-5 text-white/95" strokeWidth={2.25} />
          )}
        </div>
      )}
    </div>
  );
}
