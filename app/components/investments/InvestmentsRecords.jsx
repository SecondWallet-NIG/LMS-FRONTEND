"use client"
import React, { useState, useEffect } from "react"
import InvestmentsCards from "./InvestmentsCards"

export default function InvestmentsRecords () {
    const cards = [
        { title: 'Number of investors', value: '22' },
        { title: 'Amount invested', value: '123,368,937.03' },
        { title: 'Returns earned', value: '25,256,259.68' }
    ]

    return (
        <div>
            <InvestmentsCards cards={cards} />
            <h1>Investments Records</h1>
        </div>
    )
}