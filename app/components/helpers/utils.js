import html2canvas from "html2canvas";
import { useState } from "react";
import { Document, Page } from "react-pdf";

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
  const fileExtension = file.split(".").pop().toLowerCase();
  console.log(fileExtension);
  return fileExtension;
};

export const PdfViewer = (file) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  const goToPrevPage = () =>
    setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

  const goToNextPage = () =>
    setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1);
  return (
    <div>
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
};
