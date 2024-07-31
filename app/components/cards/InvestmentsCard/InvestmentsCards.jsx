"use client";
import React, { useState, useEffect } from "react";
import { FiPrinter } from "react-icons/fi";

export default function InvestmentsCards({ cards, hasIcon }) {
  const cardClass =
    "flex flex-col rounded-lg bg-swGrey10 w-full gap-3 p-4 border-solid border";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-10 px-10 gap-5">
      {cards.map((card, index) => {
        return (
          <div className={`${cardClass}`} key={index}>
            <div className="flex justify-between">
              <h5 className="text-swBlue text-base leading-6 font-medium mb-2 capitalize">
                {card.title}
              </h5>
              {hasIcon && (
                <div className="bg-swBlue rounded-md p-2 text-white h-fit">
                  <FiPrinter size={20} />
                </div>
              )}
            </div>
            <div className="flex justify-between items-center">
              <p className="leading-relaxed text-swDarkBlue font-bold text-3xl mt-auto">
               {Number(card.value).toLocaleString()}
              </p>
              {card?.extraVal && (
                <p className="font-medium text-sm text-swBlack leading-6">
                  ₦{Number(card?.extraVal).toLocaleString()}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
