"use client"
import React, { useState, useEffect } from "react"
import { IoClose } from "react-icons/io5";
import InputField from "../shared/input/InputField";

export default function PreviewRoiModal({
    isOpen, onClose
}) {

    if (!isOpen) return null;
    return (
        <main className="fixed h-full w-full top-0 left-0 bg-black bg-opacity-25 p-5 flex justify-center items-center z-[110]">
            <div className="max-w-sm w-full bg-white rounded-3xl">
                <div className="flex justify-between items-center gap-5 p-6">
                    <p className="text-xl font-semibold text-swBlack">Preview ROI</p>
                    <IoClose
                        size={20}
                        className="ml-auto cursor-pointer"
                        onClick={() => {
                            onClose(false);
                        }}
                    />
                </div>

                <div className="px-5 pb-10">
                    <InputField
                        required={true}
                        disabled={true}
                        label={'ROI'}
                        placeholder={'System returns the roi'}
                    />
                </div>
            </div>
        </main>
    )
}