"use client"
import React from "react"
import { FiPrinter } from "react-icons/fi"


export default function ExpenseReportCards({ cards }) {
    const cardClass = 'flex flex-col rounded-2xl bg-white w-full gap-3 p-4 border'

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 my-5 px-2 gap-4">
            {cards.map((card, index) => {
                return (
                    <div className={`${cardClass}`} key={index}>
                        <div className="flex justify-between">
                            <h5 className="text-swTextColor text-base leading-6 font-medium">{card.title}</h5>
                            <div className="bg-swBlue rounded-md p-3 text-white h-fit">
                                <FiPrinter size={20} />
                            </div>
                        </div>
                        <p className="leading-8 text-swTextColor font-bold text-2xl mt-auto">{card.value}</p>
                    </div>
                )
            })}
        </div>
    )
}