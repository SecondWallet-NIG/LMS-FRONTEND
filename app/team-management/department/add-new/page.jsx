"use client"
import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout"
import React, { useState, useEffect } from "react"

export default function AddDepartmentPage() {
    return (
        <DashboardLayout isBackNav={true} paths={["Team Management", "New Department"]}>
            Add new department
        </DashboardLayout >
    )
}