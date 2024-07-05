"use client"
import React from "react"
import ReusableDataTable from "../../shared/tables/ReusableDataTable"

export default function ExpenseReportTable() {
    const headers = [
        { id: "expenseCategory", label: "Expense category" },
        { id: "description", label: "Description" },
        { id: "expensesValue", label: "Expenses Value" },
    ];

    return (
        <>
            <ReusableDataTable
                headers={headers}
                initialData={[]}
                apiEndpoint={``}
                filters={true}
                pagination={true}
                userId={''}
                role={''}
            />
        </>
    )
}