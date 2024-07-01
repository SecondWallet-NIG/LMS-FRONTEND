"use client"
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout"
import Button from "@/app/components/shared/buttonComponent/Button"
import React, { useState, useEffect } from "react"


export default function ViewInvestmentProducts() {
    const btnClass = 'rounded-md bg-swGrey50 text-black border hover:shadow-md hover:bg-swGrey50'
    const productDetails = [
        { name: 'Product Name', value: 'Package 1' },
        { name: 'Minimum Interest rate', value: '10% per annum' },
        { name: 'Maximum Interest rate', value: '30% per annum' },
        { name: 'Interest method', value: 'Pro-Rate basis' },
        { name: 'Minimum investment amount', value: '50,000' },
        { name: 'Maximum investment amount', value: '1,500,000' }
    ]

    return (
        <DashboardLayout
            isBackNav={true}
            paths={["Investors", "View investment products"]}
        >
            <div className="mx-auto px-44 mt-10 mb-28">
                <div className="flex gap-4 justify-end mb-10">
                    <Button className={`${btnClass}`}>New investment</Button>
                    <Button className={`${btnClass}`}>Delete investment product</Button>
                    <Button className={`${btnClass}`}>Edit</Button>
                </div>

                <div className="flex justify-between border-b pb-5 mb-5">
                    <h1 className="font-semibold text-2xl leading-8 text-black">
                        Investment Product Details
                    </h1>

                    <div className="gap-4">
                        <Button className="bg-swGreen200 text-swGreen700 rounded-full text-xs leading-4 hover:bg-swGreen200">
                            Active
                        </Button>
                    </div>
                </div>

                {productDetails.map((product, index) => {
                    return (
                        <div key={index} className="flex gap-6 mb-6 text-sm text-swGrey500 leading-5">
                            <p className="w-1/3">{product.name}</p>
                            <p>{product.value}</p>
                        </div>
                    )
                })}

            </div>
        </DashboardLayout>
    )
}