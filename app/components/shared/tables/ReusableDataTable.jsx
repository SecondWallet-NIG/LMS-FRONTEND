"use client";
import React, { useState, useEffect } from "react";
import { FiFilter, FiSearch } from "react-icons/fi";
import { MdOutlineSort } from "react-icons/md";
import Select from "react-select";
import Button from "../buttonComponent/Button";
import Image from "next/image";
import sketch from "../../../../public/images/sketch.jpg";
import { useRouter } from "next/navigation";
import InputField from "../input/InputField";
import { IoIosClose } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";
import CenterModal from "../../modals/CenterModal";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Loader";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

function ReusableDataTable({
  apiEndpoint,
  initialData,
  headers,
  sortedBy,
  btnText,
  btnTextClick,
  dataTransformer,
  onClickRow,
  filters,
  pagination,
}) {
  const [data, setData] = useState(initialData || []);
  const [downloadData, setDownloadData] = useState();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [perPage, setPerPage] = useState(5);
  const [sortField, setSortField] = useState(sortedBy?.field || "");
  const [isLoading, setIsLoading] = useState(false);
  const [sortDirection, setSortDirection] = useState(
    sortedBy?.direction || "asc"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [paginationLinks, setPaginationLinks] = useState(null);
  const [logSearch, setLogSearch] = useState(false);
  const [dateFilterOpen, setDateFilterOpen] = useState(false);

  const [dateRange, setDateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);
  const toggleDateFilter = () => {
    setDateFilterOpen(!dateFilterOpen);
  };

  const handleDownload = () => {
    setLoading(true);
    axios
      .get(`${apiEndpoint}?page=${1}&per_page=${downloadData}`, {
        headers: {
          Authorization: `Bearer ${user?.data?.token}`,
        },
      })
      .then((data) => {
        const allData = data?.data.results || data?.data?.data;

        // Sample nested JSON data
        const nestedJsonData = allData;
        comsole.log("hello", nestedJsonData);

        function flattenData(data, parentKey = "") {
          let flattened = {};
          for (const key in data) {
            const newKey = parentKey ? `${parentKey}.${key}` : key;
            if (typeof data[key] === "object") {
              const nestedFlattened = flattenData(data[key], newKey);
              flattened = { ...flattened, ...nestedFlattened };
            } else {
              flattened[newKey] = data[key];
            }
          }
          return flattened;
        }

        // Flatten the nested JSON data
        const flattenedData = nestedJsonData.map((item) => flattenData(item));

        // Create a new worksheet and add the flattened data
        const ws = XLSX.utils.json_to_sheet(flattenedData);

        // Create a new workbook and add the worksheet
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

        // Generate an Excel blob
        const excelBlob = XLSX.write(wb, {
          bookType: "xlsx",
          type: "array",
          mimeType:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        // Create a Blob object
        const blob = new Blob([excelBlob], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        // Trigger the download
        saveAs(blob, "exported_data.xlsx");
        setLoading(false);
      })
      .catch(() => {
        toast.error("An error occurred while fetching data for download.");
        setLoading(false);
      });
  };

  const router = useRouter();
  const options = [
    { value: 5, label: "5" },
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 50, label: "50" },
    { value: 100, label: "100" },
  ];

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "30px",

      width: "100px",
      fontSize: "14px",
      borderColor: "#ffffff",
      boxShadow: state.isFocused ? "none" : provided.boxShadow,
      "&:hover": {
        borderColor: "#ffffff",
      },
    }),

    option: (provided, state) => ({
      ...provided,
      fontSize: "14px",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#f5f5f5",
      },
      backgroundColor: state.isSelected ? "#2769B3" : null,
    }),
  };

  let user;
  if (typeof window !== "undefined") {
    user = JSON.parse(localStorage.getItem("user"));
  }

  const fetchData = (page, perPage, field, direction) => {
    let apiUrl = `${apiEndpoint}?page=${page}&per_page=${perPage}&sortedBy=-createdAt`;
    if (searchTerm) {
      apiUrl += `&search=${searchTerm}`;
      axios
        .get(apiUrl, {
          headers: {
            Authorization: `Bearer ${user?.data?.token}`,
          },
        })
        .then((data) => {
          if (typeof dataTransformer === "function") {
            const transformedData = dataTransformer(
              data?.data.results || data?.data?.data
            );
            setData(transformedData);
            setPaginationLinks(data?.data.links);
            setDownloadData(data?.data.links.totalDocuments);
          } else {
            setData(data?.data?.results || data?.data?.data);
            setDownloadData(data?.data.links.totalDocuments);
            setPaginationLinks(data?.data?.links);
          }
          // setTimeout(() => {
          //   setIsLoading(false);
          // }, 2000);
        })
        .catch(() => {
          // setTimeout(() => {
          //   toast.error("An error occured, Couldn't load table");
          //   setIsLoading(false);
          // }, 2000);
        });
    } else {
      if (dateRange && dateRange.length > 0) {
        if (
          dateRange[0].startDate instanceof Date &&
          dateRange[0].endDate instanceof Date
        ) {
          const startDate = dateRange[0].startDate.toISOString();
          const endDate = dateRange[0].endDate.toISOString();
          apiUrl += `&startDate=${startDate}&endDate=${endDate}`;
        }
      }
      setIsLoading(true);
      axios
        .get(apiUrl, {
          headers: {
            Authorization: `Bearer ${user?.data?.token}`,
          },
        })
        .then((data) => {
          if (typeof dataTransformer === "function") {
            const transformedData = dataTransformer(
              data?.data.results || data?.data?.data
            );
            setData(transformedData);
            setPaginationLinks(data?.data.links);
          } else {
            setData(data?.data?.results || data?.data?.data);
            setPaginationLinks(data?.data?.links);
          }
          setTimeout(() => {
            setIsLoading(false);
          }, 2000);
        })
        .catch(() => {
          setTimeout(() => {
            toast.error("An error occured, Couldn't load table");
            setIsLoading(false);
          }, 2000);
        });
    }
  };

  const handlePageChange = (page, perPage) => {
    setCurrentPage(page);
    fetchData(page, perPage, sortField, sortDirection);
  };

  const handleSelectChange = (selectedOption) => {
    setPerPage(selectedOption.value);
    handlePageChange(1, selectedOption.value);
  };

  const handleSort = (field) => {
    const newSortDirection =
      field === sortField && sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(newSortDirection);
    fetchData(currentPage, perPage, field, newSortDirection);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    fetchData(currentPage, perPage, sortField, sortDirection);
  }, [apiEndpoint, currentPage, perPage, sortField, sortDirection, searchTerm]);

  const getPageNumbers = () => {
    if (!paginationLinks || !paginationLinks.last) return [];

    const lastLink = paginationLinks.last;
    const pageMatch = lastLink.match(/[?&]page=([^&]+)/);

    if (!pageMatch) return [];

    const totalPages = parseInt(pageMatch[1], 10);
    const pageNumbers = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pageNumbers.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pageNumbers.push(i);
        }
      }
    }

    return pageNumbers;
  };

  const handleLogSearch = (state) => {
    state === "open" ? setLogSearch(true) : setLogSearch(false);
  };

  return (
    <div className="w-full mx-auto text-xs md:text-sm overflow-x-hidden">
      <ToastContainer />
      <div className="">
        {filters && (
          <div className="px-4 pt-4 flex flex-col md:flex-row justify-between md:items-center">
            <div className="flex gap-2 items-center justify-between w-full md:w-fit">
              <div className="flex border border-1 items-center mb-4 pl-2">
                <p className="mr-2 text-swGray">Items:</p>
                <Select
                  styles={customStyles}
                  options={options}
                  value={{ value: perPage, label: perPage }}
                  onChange={handleSelectChange}
                  isSearchable={false}
                />
              </div>
              <div className="flex gap-3 items-center">
                <button
                  onClick={toggleDateFilter}
                  className=" flex gap-2 items-center border border-swLightGray bg-white py-1.5 px-3 mb-4"
                >
                  <FiFilter size={20} />
                  <p>Filter By Date</p>
                </button>
              </div>
            </div>

            <div className="mb-4 flex items-center justify-between w-full md:w-fit">
              <div className="flex justify-center items-center gap-2 ml-auto">
                <InputField
                  startIcon={<FiSearch size={20} />}
                  endIcon={
                    <IoIosClose
                      size={20}
                      className="cursor-pointer"
                      onClick={() => {
                        handleLogSearch("close");
                      }}
                    />
                  }
                  placeholder={"Search..."}
                  css={`
                    ${logSearch
                      ? "translate-x-[3rem] opacity-1 z-10"
                      : "translate-x-[17rem] -z-10 opacity-0"} transition-all ease-in-out
                  `}
                  borderColor="bg-gray-200 "
                  value={searchTerm}
                  onChange={handleSearchChange}
                />

                <div
                  className={`${
                    logSearch ? "opacity-0" : "opacity-1"
                  } bg-white w-fit p-2 rounded-md cursor-pointer border-2 border-transparent hover:border-gray-200 transition-all ease-in-out`}
                >
                  <FiSearch
                    size={20}
                    onClick={() => {
                      handleLogSearch("open");
                    }}
                  />
                </div>

                <div className="bg-white w-fit p-2 rounded-md border-2 border-transparent hover:border-gray-200 cursor-pointer">
                  <BsThreeDotsVertical size={20} />
                </div>
              </div>
              {btnText ? (
                <div>
                  <Button
                    className="bg-swBlue text-white md:p-[0.37rem] rounded-md ml-2 whitespace-nowrap"
                    onClick={btnTextClick}
                  >
                    {btnText}
                  </Button>
                </div>
              ) : null}
              <Button
                disabled={loading ? true : false}
                className="bg-swBlue text-white md:p-[0.37rem] rounded-md ml-2 whitespace-nowrap"
                onClick={handleDownload}
              >
                <div className="flex gap-1 items-center p-1">
                  <p className="hidden lg:block">
                    {" "}
                    {loading ? "Exporting" : "Export"}
                  </p>
                </div>
              </Button>
            </div>
          </div>
        )}
        {data.length > 0 ? (
          <table className="table-auto w-full border-collapse border overflow-hidden">
            <thead>
              <tr>
                {headers.map((header) => (
                  <th
                    key={header.id}
                    className={`px-5 py-4 bg-swLightGray text-swGray border-0 font-[500] cursor-pointer text-start ${
                      header.id === sortField ? "" : ""
                    }`}
                    onClick={() => handleSort(header.id)}
                  >
                    {header.label}
                    {header.id === sortField && (
                      <span className="ml-1">
                        {sortDirection === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.map((item) => (
                <tr
                  onClick={() => {
                    if (onClickRow) {
                      setIsLoading(true);
                      router.push(`${onClickRow}/${item.id || item._id}`);
                    }
                  }}
                  key={item._id}
                  className="border pt-2 pb-2 hover:bg-swLightGray"
                  style={{ cursor: "pointer" }}
                >
                  {headers.map((header) => (
                    <td
                      key={header.id}
                      className="px-5 py-4 border font-400 text-xs text-swGray border-none"
                    >
                      {item[header.id]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="min-h-500 flex items-center justify-center">
            <div className="rounded-lg p-8 w-[400px] flex flex-col items-center">
              <Image src={sketch} alt="company logo" />
              <p className="text-center text-lg">This list is empty</p>
            </div>
          </div>
        )}

        {pagination && (
          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={() => handlePageChange(currentPage - 1, perPage)}
              disabled={
                !paginationLinks || !paginationLinks.prev || currentPage === 1
              }
              className="px-2 py-1 rounded bg-swLightGray text-gray-700 mr-2"
            >
              Previous
            </button>
            <div>
              {getPageNumbers().map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber, perPage)}
                  className={`px-3 py-1.5 ${
                    currentPage === pageNumber
                      ? "bg-swBlue text-white"
                      : "bg-swLightGray text-gray-700"
                  }`}
                >
                  {pageNumber}
                </button>
              ))}
            </div>
            <button
              onClick={() => handlePageChange(currentPage + 1, perPage)}
              disabled={!paginationLinks || !paginationLinks.next}
              className="px-2 py-1 rounded bg-swLightGray text-gray-700 ml-2"
            >
              Next
            </button>
          </div>
        )}
      </div>

      <Loader isOpen={isLoading} />
      <CenterModal
        isOpen={dateFilterOpen}
        onClose={() => {
          setDateFilterOpen(!dateFilterOpen);
        }}
        width={"fit-content"}
      >
        <div className="bg-white p-4 border shadow-lg">
          <div className="text-swBlue text-sm font-semibold pb-4">
            Filter By Date
          </div>
          <div className="flex gap-2 items-center">
            <DateRange
              editableDateInputs={true}
              onChange={(item) => setDateRange([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={dateRange}
            />
          </div>
          <div className="flex justify-between">
            <Button variant="danger" onClick={() => setDateFilterOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                console.log(dateRange);
                fetchData(currentPage, perPage, sortField, sortDirection);
                setDateFilterOpen(false);
              }}
            >
              Apply
            </Button>
          </div>
        </div>
      </CenterModal>
    </div>
  );
}

export default ReusableDataTable;
