"use client";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { bankArr } from "@/constant";
import Link from "next/link";
import { FiSmile, FiHash, FiPhone, FiMail } from "react-icons/fi";
import { LuCalendar } from "react-icons/lu";

export default function InvestorBioData({
  handleInfoHoverIn,
  data,
  labelClass,
  editButton,
  valueClass,
  dataClass,
  detailsHeader,
}) {
  const pageDetailsData = [
    {
      label: (
        <>
          <LuCalendar size={16} />
          DOB
        </>
      ),
      value: (
        <>
          {data?.data?.dateOfBirth &&
            format(new Date(data?.data?.dateOfBirth), "PPP")}
        </>
      ),
    },
    {
      label: (
        <>
          <FiSmile size={16} /> Gender
        </>
      ),
      value: data?.data?.gender,
    },
    {
      label: (
        <>
          <FiHash size={16} /> NIN
        </>
      ),
      value: data?.data?.nin,
    },
    {
      label: (
        <>
          <FiPhone size={16} /> Phone
        </>
      ),
      value: data?.data?.phoneNumber,
    },
    {
      label: (
        <>
          <FiMail size={16} /> Email
        </>
      ),
      value: data?.data?.email,
    },
  ];
  const pageAddressData = [
    { label: "Country", value: "Nigeria" },
    { label: "State", value: data?.data?.state },
    { label: "LGA", value: data?.data?.lga },
    { label: "House NO", value: data?.data?.address?.houseNumber },
    { label: "Address", value: data?.data?.address?.houseLocation },
  ];
  const pageBankData = [
    {
      label: "Name",
      value:
        bankArr.find(
          (option) => option.value === data?.data?.bankAccount?.bankName
        )?.label || data?.data?.bankAccount?.bankName,
    },
    { label: "Acc Number", value: data?.data?.bankAccount?.accountNumber },
    { label: "Beneficiary", value: data?.data?.bankAccount?.accountName },
    { label: "BVN", value: data?.data?.bvn },
  ];

  console.log("account", data?.data);

  // {
  //     bankArr.find(
  //       (option) =>
  //         option.value ===
  //       data?.data?.bankAccount?.bankName
  //     )?.label
  //   }

  const renderPageData = (label, value) => {
    return (
      <div className={`${dataClass}`}>
        <p className={`${labelClass}`}>{label}</p>
        <p className={`${valueClass}`}>{value}</p>
      </div>
    );
  };
  return (
    <div>
      {/* Details */}
      <div className="p-2">
        <div
          className="flex justify-between my-2"
          onMouseEnter={() => handleInfoHoverIn("bio-data")}
          onMouseLeave={() => handleInfoHoverIn("close")}
        >
          <p className={`${detailsHeader}`}>Details</p>
          {editButton}
        </div>
        <div className="">
          {pageDetailsData.map((d, index) => (
            <div key={index}>{renderPageData(d.label, d.value)}</div>
          ))}
        </div>
      </div>

      {/* Address */}
      <div className="p-2 border-t-2 border-gray-300">
        <div
          className="text-sm font-semibold flex justify-between"
          onMouseEnter={() => handleInfoHoverIn("address")}
          onMouseLeave={() => handleInfoHoverIn("close")}
        >
          <p className={`${detailsHeader}`}>Address</p>
        </div>
        <div className="mt-2">
          {pageAddressData.map((d, index) => (
            <div key={index}>{renderPageData(d.label, d.value)}</div>
          ))}
        </div>
      </div>

      {/* Bank Details */}
      <div className="p-2 border-t-2 border-gray-300 lg:mb-20">
        <div
          className="text-sm font-semibold flex justify-between"
          onMouseEnter={() => handleInfoHoverIn("bank")}
          onMouseLeave={() => handleInfoHoverIn("close")}
        >
          <p className={`${detailsHeader}`}>Bank Details</p>
        </div>
        <div className="">
          {pageBankData.map((d, index) => (
            <div key={index}>{renderPageData(d.label, d.value)}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
