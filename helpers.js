//import * as html2pdf from 'html2pdf.js';

/** Legacy ledger stamps at …T23:00:00.000Z represent the next WAT calendar day. */
const isLegacyT2300Stamp = (date) => {
  const x = new Date(date);
  return (
    !Number.isNaN(x.getTime()) &&
    x.getUTCHours() === 23 &&
    x.getUTCMinutes() === 0 &&
    x.getUTCSeconds() === 0
  );
};

/** yyyy-MM-dd for the intended WAT schedule day of a stored timestamp. */
export const scheduleCalendarIso = (input) => {
  const x = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(x.getTime())) {
    return "";
  }
  let y = x.getUTCFullYear();
  let m = x.getUTCMonth();
  let day = x.getUTCDate();
  if (isLegacyT2300Stamp(x)) {
    const next = new Date(Date.UTC(y, m, day + 1));
    y = next.getUTCFullYear();
    m = next.getUTCMonth();
    day = next.getUTCDate();
  }
  const mm = String(m + 1).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${y}-${mm}-${dd}`;
};

/** Format a ledger timestamp or yyyy-MM-dd as a readable schedule calendar date. */
export const formatScheduleDateIso = (input) => {
  if (input == null || input === "") {
    return "";
  }
  let iso;
  if (typeof input === "string") {
    const trimmed = input.trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
      iso = trimmed;
    } else {
      iso = scheduleCalendarIso(trimmed);
    }
  } else {
    iso = scheduleCalendarIso(input);
  }
  return formatDate(iso);
};

export const formatDate = (inputDate) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dateParts = inputDate?.split("-");
  const year = dateParts?.[0];
  const monthIndex = parseInt(dateParts?.[1], 10) - 1; // Month is zero-based
  const day = dateParts?.[2];

  const formattedDate = `${months[monthIndex]}, ${day} ${year}`;

  return formattedDate;
};

export const formatTimeToAMPM = (timestamp) => {
  const date = new Date(timestamp);

  const options = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
    timeZone: "UTC", // Assuming the input timestamp is in UTC
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
};

export const exportToPDF = (id) => {
  const element = document.getElementById(id);

  // Check if the element exists
  if (!element) {
    console.error('Element with ID "exportDiv" not found.');
    return;
  }

  // Options for html2pdf
  const options = {
    margin: 10,
    filename: "exported_document.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
  };

  // Use html2pdf to export the div content as a PDF
  html2pdf(element, options).then((pdf) => {
    // Save the PDF
    saveAs(pdf, "exported_document.pdf");
    console.log("PDF export success");
  });
};


export const getToken = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const user = JSON.parse(localStorage.getItem("user"));
  return user?.data?.token;
};
