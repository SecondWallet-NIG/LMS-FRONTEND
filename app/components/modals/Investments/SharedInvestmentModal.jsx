"use client"
import React, { useState, useEffect } from "react"
import { IoClose } from "react-icons/io5";

export default function SharedInvestmentModal({
    isOpen, onClose,
    children, header, css
}) {

    if (!isOpen) return null;
    return (
        <main className="fixed h-full w-full top-0 left-0 bg-black bg-opacity-25 p-5 flex justify-center items-center z-[110]">
            <div className={`${css} w-full bg-white rounded-3xl`}>
                <div className="flex justify-between items-center gap-5 p-6">
                    <p className="text-xl font-semibold text-swBlack">{header}</p>
                    <IoClose
                        size={20}
                        className="ml-auto cursor-pointer"
                        onClick={() => {
                            onClose(false);
                        }}
                    />
                </div>
                {children}
            </div>
        </main>
    )
}