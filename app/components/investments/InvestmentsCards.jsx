"use client"
import React, { useState, useEffect } from "react"

export default function InvestmentsCards({ cards }) {
    const cardClass = 'rounded-lg bg-swGrey50 w-full gap-6 p-4 border-solid border-1'

    return (
        <div className="flex justify-between mb-10 mt-16 px-10 gap-6">
            {cards.map((card, index) => {
                return (
                    <div className={`${cardClass}`} key={index}>
                        <h5 className="text-swBlue text-base leading-6 font-medium mb-5">{card.title}</h5>
                        <p className="leading-relaxed text-swDarkBlue font-bold text-4xl">{card.value}</p>
                    </div>
                )
            })}
        </div>
    )
}