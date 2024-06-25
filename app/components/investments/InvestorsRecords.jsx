"use client"
import React, { useState, useEffect } from "react"
import InvestmentsCards from "./InvestmentsCards"

export default function InvestorsRecords () {
    const cards = [
        { title: 'Number of investors', value: '12,820,382.36' },
        { title: 'Current pending payments', value: '20' },
        { title: 'Returns earned', value: '25,256,259.68' }
    ]

    return (
        <div>
            <InvestmentsCards cards={cards} />
            <h1>Investors Records</h1>
        </div>
    )
}