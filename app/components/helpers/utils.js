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
