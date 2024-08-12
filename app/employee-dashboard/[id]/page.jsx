"use client"
import React, { useState, useEffect } from "react"
import StaffData from "../../components/staffProfile/StaffProfile"

export default function EmployeeDashboard() {
    return (
        <StaffData
            path={["Home", "My Dashboard"]}
            isDashboard={true}
        />
    )
}