"use client";

import Button from "../../shared/buttonComponent/Button";
import { useDispatch, useSelector } from "react-redux";
import { generateGeneralStatementOfAccount } from "@/redux/slices/reportSlice";

const GeneralStatementOfAccount = () => {
  const dispatch = useDispatch();


  const handleSubmit = () => {
    dispatch(generateGeneralStatementOfAccount())
      .unwrap()
      .then((res) => {
  
  
        // Check if the response contains binary data
        if (res && res) {
          // Create a Blob from the ArrayBuffer data and download it
          const fileBlob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          const fileURL = URL.createObjectURL(fileBlob);
  
          // Create a temporary anchor element to trigger the download
          const link = document.createElement("a");
          link.href = fileURL;
          link.download = "financial-statement.xlsx"; // You can dynamically set the file name
          document.body.appendChild(link);
          link.click();
  
          // Clean up the object URL after the download starts
          URL.revokeObjectURL(fileURL);
        } else {
          alert("Report pulled successfully, but no file data available.");
        }
      })
      .catch((error) => {
        alert(error?.message || "An error occurred while pulling the report");
      });
  };
  
  


  return (
    <main className="w-full">
      <div className="rounded-lg bg-swLightGray p-5 shadow-xl">
        <div className="pt-4 font-medium text-swBlue">
          General Statement Of Account
        </div>
        <p className="pt-4">
          This module handles the generating of the general statement of account
          as accured daily
        </p>
        <div className="pt-6">
          <Button
            variant="primary"
            onClick={handleSubmit}
          >
            Pull Report
          </Button>
        </div>
      </div>
    </main>
  );
};

export default GeneralStatementOfAccount;
