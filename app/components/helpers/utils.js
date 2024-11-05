import { getToken } from "@/helpers";
import axios from "axios";
import html2canvas from "html2canvas";
import { format } from "date-fns";
// import { zonedTimeToUtc, utcToZonedTime } from "date-fns-tz";

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

export const checkDecimal = (str) => {
  if (str?.includes(".")) {
    const parts = str?.split(".");
    return parts?.length > 1 && parts[1]?.length > 0;
  }
  return false;
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
  { id: "personalLeave", label: "Casual Leave" },
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

export const publicHolidays = [
  new Date("2024-01-01"), // New Year's Day
  new Date("2024-03-29"), // Good Friday
  new Date("2024-04-01"), // Easter Monday
  new Date("2024-05-01"), // Workers' Day
  new Date("2024-06-12"), // Democracy Day
  new Date("2024-06-16"), // Eid al-Fitr (Sallah) *
  new Date("2024-06-17"), // Eid al-Fitr (Sallah) Holiday *
  new Date("2024-07-20"), // Eid al-Adha (Sallah) *
  new Date("2024-07-21"), // Eid al-Adha (Sallah) Holiday *
  new Date("2024-10-01"), // Independence Day
  new Date("2024-12-25"), // Christmas Day
  new Date("2024-12-26"), // Boxing Day
  // Additional religious holidays may vary
];

export const getPublicHolidays = (year) => {
  // Function to calculate Easter Sunday using the "Anonymous Gregorian algorithm"
  const getEasterSunday = (year) => {
    const f = Math.floor;
    const G = year % 19;
    const C = f(year / 100);
    const H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30;
    const I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11));
    const J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7;
    const L = I - J;
    const month = 3 + f((L + 40) / 44); // March is 3, April is 4
    const day = L + 28 - 31 * f(month / 4);
    return new Date(year, month - 1, day); // Easter Sunday
  };

  // Fixed holidays
  const publicHolidays = [
    new Date(`${year}-01-01`), // New Year's Day
    new Date(`${year}-05-01`), // Workers' Day
    new Date(`${year}-06-12`), // Democracy Day
    new Date(`${year}-10-01`), // Independence Day
    new Date(`${year}-12-25`), // Christmas Day
    new Date(`${year}-12-26`), // Boxing Day
  ];

  // Easter holidays
  const easterSunday = getEasterSunday(year);
  const goodFriday = new Date(easterSunday);
  goodFriday.setDate(easterSunday.getDate() - 2); // Good Friday (2 days before Easter)
  const easterMonday = new Date(easterSunday);
  easterMonday.setDate(easterSunday.getDate() + 1); // Easter Monday (1 day after Easter)

  publicHolidays.push(goodFriday, easterMonday);

  // Eid holidays (for now, placeholders for dynamic calculation or moon sighting adjustments)
  // These dates vary based on lunar calculations, so placeholder dates can be adjusted yearly.
  // publicHolidays.push(new Date(`${year}-06-16`)); // Eid al-Fitr (estimated date)
  // publicHolidays.push(new Date(`${year}-06-17`)); // Eid al-Fitr Holiday (estimated date)
  // publicHolidays.push(new Date(`${year}-07-20`)); // Eid al-Adha (estimated date)
  // publicHolidays.push(new Date(`${year}-07-21`)); // Eid al-Adha Holiday (estimated date)

  return publicHolidays;
};

// Function to convert date string to ISO 8601 format
export const convertDateToISO = (dateString) => {
  console.log({dateString});
  // Parse the date string into a Date object
  const parsedDate = new Date(dateString);

  // Format the Date object to ISO 8601 format with UTC time
  const iso8601Date = parsedDate.toISOString();

  return iso8601Date;
};

export const convertDateToISOWithAddedHour = (dateString) => {
  const parsedDate = new Date(dateString);
  parsedDate.setHours(parsedDate.getHours() + 1);
  return parsedDate.toISOString();
};

export const handleInputChangeWithComma = (e,setFormData) => {
  const value = e.target.value.replace(/,/g, "");

  setFormData((prevData) => ({
    ...prevData,
    [e.target.name]: value,
  }));
};

export const preventMinus = (e) => {
  const allowedKeys = [
    "Backspace",
    "Delete",
    "ArrowLeft",
    "ArrowRight",
    "Tab",
    ".",
  ];

  if (allowedKeys.includes(e.key)) {
    return;
  }

  // Prevent if it's not a digit and prevent multiple decimals
  if (
    !/^[0-9.]$/.test(e.key) ||
    (e.key === "." && e.target.value.includes("."))
  ) {
    e.preventDefault();
  }
};