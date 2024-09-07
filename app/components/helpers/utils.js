import { getToken } from "@/helpers";
import axios from "axios";
import html2canvas from "html2canvas";

export const cls = (input) =>
  input
    .replace(/\s+/gm, " ")
    .split(" ")
    .filter((cond) => typeof cond === "string")
    .join(" ")
    .trim();

export const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

export const countryOptions = [{ value: "nigeria", label: "Nigeria" }];

export const createBorrowerType = [
  { value: "Single borrower", label: "Single borrower" },
  { value: "Bulk borrowers", label: "Bulk borrowers" },
];

export const handleCaptureClick = (loading, divID, fileName) => {
  // setLoading(true);
  loading(true);
  // const captureDiv = document.getElementById("captureDiv");
  const captureDiv = document.getElementById(divID);

  if (captureDiv) {
    html2canvas(captureDiv).then((canvas) => {
      const dataUrl = canvas.toDataURL("image/png");
      downloadScreenshot(dataUrl, loading, fileName);
    });
  }
};

const downloadScreenshot = (dataUrl, loading, fileName) => {
  // Create an anchor element with a download attribute to download the screenshot
  const a = document.createElement("a");
  a.href = dataUrl;
  // a.download = `${selectedCustomer?.firstName} ${selectedCustomer?.lastName} loan.png`;
  a.download = `${fileName}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  // setLoading(false);
  loading(false);
};

export const handleFileExtention = (file) => {
  const fileExtension = file?.split(".").pop().toLowerCase();
  // console.log(fileExtension);
  return fileExtension;
};

export const leaveTypes = [
  { id: "annualLeave", label: "Annual Leave" },
  { id: "maternityLeave", label: "Maternity Leave" },
  { id: "paternityLeave", label: "Paternity Leave" },
  { id: "personalLeave", label: "Personal Leave" },
  { id: "sickLeave", label: "Sick Leave" },
  { id: "unpaidLeave", label: "Unpaid Leave" },
];

// export function base64ToBlob(base64, contentType) {
//   // Decode the Base64 string to binary data
//   const byteCharacters = atob(base64);
//   const byteNumbers = new Array(byteCharacters.length);

//   // Create an array of bytes
//   for (let i = 0; i < byteCharacters.length; i++) {
//     byteNumbers[i] = byteCharacters.charCodeAt(i);
//   }

//   // Convert the byte array into a Blob
//   const byteArray = new Uint8Array(byteNumbers);
//   return new Blob([byteArray], { type: contentType });
// }

export const fetchPdf = async (pdfUrl) => {
  let token = getToken();
  const response = await axios.get(pdfUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/pdf",
    },
    responseType: "blob",
  });
  const url = URL.createObjectURL(response.data);
  return url;
};
