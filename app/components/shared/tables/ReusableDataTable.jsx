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
import { FaWindowClose } from "react-icons/fa";

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
  filterParams,
  userId,
  role,
}) {
  const [data, setData] = useState(initialData || []);
  const [dataCheck, setDataCheck] = useState(null);
  const [downloadData, setDownloadData] = useState();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [sortField, setSortField] = useState(sortedBy?.field || "");
  const [isLoading, setIsLoading] = useState(true);
  const [sortDirection, setSortDirection] = useState(
    sortedBy?.direction || "asc"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [paginationLinks, setPaginationLinks] = useState(null);
  const [logSearch, setLogSearch] = useState(false);
  const [dateFilterOpen, setDateFilterOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState(false);

  const [dateRange, setDateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);
  const [status, setStatus] = useState(" ");
  const toggleDateFilter = () => {
    setDateFilterOpen(!dateFilterOpen);
  };

  const handleDownload = () => {
    let x = `${apiEndpoint}?page=${1}&per_page=${downloadData}`;
    if (dateRange && dateRange.length > 0) {
      if (
        dateRange[0].startDate instanceof Date &&
        dateRange[0].endDate instanceof Date
      ) {
        // const startDate = dateRange[0].startDate.toISOString();
        // const endDate = dateRange[0].endDate.toISOString();

        // Adjust the time zone offset for the start date
        const startDate = new Date(dateRange[0].startDate);
        startDate.setDate(startDate.getDate() + 1);
        startDate.setMinutes(
          startDate.getMinutes() - startDate.getTimezoneOffset()
        );

        // Adjust the time zone offset for the end date
        const endDate = new Date(dateRange[0].endDate);
        endDate.setDate(endDate.getDate() + 1);
        endDate.setMinutes(endDate.getMinutes() - endDate.getTimezoneOffset());

        // apiUrl += `&startDate=${startDate}&endDate=${endDate}`;
        x += `&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
      }
    }

    if (status != " ") {
      console.log({ status });
      x += `&status=${status}`;
    }

    if (userId && role === "Loan Officer") {
      x += `&userId=${userId}`;
    }
    setLoading(true);
    axios
      .get(x, {
        headers: {
          Authorization: `Bearer ${user?.data?.token}`,
        },
      })
      .then((data) => {
        const allData = data?.data.results || data?.data?.data;
        const nestedJsonData = allData;

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
        const flattenedData = nestedJsonData.map((item) => flattenData(item));

        const ws = XLSX.utils.json_to_sheet(flattenedData);

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
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
      .catch((error) => {
        console.log({ error });
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
    }),
  };

  let user;
  if (typeof window !== "undefined") {
    user = JSON.parse(localStorage.getItem("user"));
  }

  const fetchData = (page, perPage, field, direction) => {
    let apiUrl = `${apiEndpoint}?page=${page}&per_page=${perPage}`;
    if (searchTerm) {
      apiUrl += `&search=${searchTerm}`;
      if (role === "Pending") {
        apiUrl += `&status=${"Pending"}`;
      }

      if (role === "Overdue") {
        apiUrl += `&status=${"Overdue"}`;
      }

      if (role === "In Progress") {
        apiUrl += `&status=${"In Progress"}`;
      }

      if (userId && role === "Loan Officer") {
        apiUrl += `&userId=${userId}`;
      }

      if (role === "pendingTask") {
        apiUrl += `&status=${"Pending"}`;
      }

      if (role === "completedTask") {
        apiUrl += `&status=${"Done"}`;
      }

      if (role === "unpaid-repayment") {
        apiUrl += `&status=${"Unpaid"}`;
      }

      if (role === "Fully Paid") {
        apiUrl += `&status=${"Fully Paid"}`;
      }
      axios
        .get(apiUrl, {
          headers: {
            Authorization: `Bearer ${user?.data?.token}`,
          },
        })
        .then((data) => {
          setDataCheck(data);
          if (typeof dataTransformer === "function") {
            const transformedData = dataTransformer(
              data?.data?.data?.repayments ||
                data?.data?.results ||
                data?.data?.data ||
                data?.results
            );
            setData(transformedData);
            setPaginationLinks(data?.data.links);
            console.log(data?.data.links);
            setDownloadData(
              data?.data?.links?.totalDocuments ||
                data?.data?.data?.links?.totalDocuments
            );
            setLoading(false);
          } else {
            setData(
              data?.data?.data?.repayments ||
                data?.data?.results ||
                data?.data?.data ||
                data.results
            );
            console.log(data?.data.links.totalDocuments);
            setDownloadData(
              data?.data?.links?.totalDocuments ||
                data?.data?.data?.links?.totalDocuments
            );
            setPaginationLinks(data?.data?.links);
            setLoading(false);
          }
        })
        .catch(() => {});
    } else {
      console.log({ dateRange });
      setIsLoading(true);
      if (dateRange && dateRange.length > 0) {
        if (
          dateRange[0].startDate instanceof Date &&
          dateRange[0].endDate instanceof Date
        ) {
          // const startDate = dateRange[0].startDate.toISOString();
          // const endDate = dateRange[0].endDate.toISOString();

          // Adjust the time zone offset for the start date
          const startDate = new Date(dateRange[0].startDate);
          startDate.setDate(startDate.getDate() + 1);
          startDate.setMinutes(
            startDate.getMinutes() - startDate.getTimezoneOffset()
          );

          // Adjust the time zone offset for the end date
          const endDate = new Date(dateRange[0].endDate);
          endDate.setDate(endDate.getDate() + 1);
          endDate.setMinutes(
            endDate.getMinutes() - endDate.getTimezoneOffset()
          );

          // apiUrl += `&startDate=${startDate}&endDate=${endDate}`;
          apiUrl += `&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
        }
      }
      if (role === "Pending") {
        apiUrl += `&status=${"Pending"}`;
      }
      if (role === "Overdue") {
        apiUrl += `&status=${"Overdue"}`;
      }

      if (role === "In Progress") {
        apiUrl += `&status=${"In Progress"}`;
      }

      if (userId && role === "Loan Officer") {
        apiUrl += `&userId=${userId}`;
      }

      if (role === "pendingTask") {
        apiUrl += `&status=${"Pending"}`;
      }

      if (role === "completedTask") {
        apiUrl += `&status=${"Done"}`;
      }

      if (role === "collectorsReport") {
        apiUrl += `&roleId=${"65a4321a975ea01d1aefa9a6"}`;
      }

      if (status != " ") {
        apiUrl += `&status=${status}`;
      }

      if (role === "unpaid-repayment") {
        apiUrl += `&status=${"Unpaid"}`;
      }

      if (role === "Fully Paid") {
        apiUrl += `&status=${"Fully Paid"}`;
      }
      axios
        .get(apiUrl, {
          headers: {
            Authorization: `Bearer ${user?.data?.token}`,
          },
        })
        .then((data) => {
          console.log({ data });
          setDataCheck(data);
          if (typeof dataTransformer === "function") {
            const transformedData = dataTransformer(
              data?.data?.data?.repayments ||
                data?.data?.results ||
                data?.data?.data ||
                data?.results ||
                data?.data?.data?.results ||
                data?.data?.data?.data?.results
            );
            console.log("table data", data);
            setData(transformedData);
            setPaginationLinks(
              data?.data?.links ||
                data?.data?.data?.links ||
                data?.data?.data?.data?.links
            );
            // console.log(data?.data?.links?.totalDocuments);
            setDownloadData(
              data?.data?.links?.totalDocuments ||
                data?.data?.data?.links?.totalDocuments
            );
            setLoading(false);
          } else {
            setData(
              data?.data?.data?.repayments ||
                data?.data?.results ||
                data?.data?.data ||
                data.results ||
                data?.data?.data?.results ||
                data?.data?.data?.data?.results
            );
            setPaginationLinks(
              data?.data?.links ||
                data?.data?.data?.links ||
                data?.data?.data?.data?.links
            );
            console.log(data?.data.links.totalDocuments);
            setDownloadData(
              data?.data?.links?.totalDocuments ||
                data?.data?.data?.links?.totalDocuments
            );
            setLoading(false);
          }
          setLoading(false);
          setIsLoading(false);
        })
        .catch(() => {
          setTimeout(() => {
            setIsLoading(false);
            setLoading(false);
          }, 2000);
        });
    }
  };

  const clearFilter = () => {
    setStatus(" ");
    fetchData(currentPage, perPage, sortField, sortDirection);
  };

  const clearDateFilter = () => {
    setDateRange([
      {
        startDate: null,
        endDate: null,
        key: "selection",
      },
    ]);
    window.location.reload();
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

  const handleClearFilters = () => {
    setStatus("");
    fetchData(currentPage, perPage, sortField, sortDirection);
  };

  useEffect(() => {
    fetchData(currentPage, perPage, sortField, sortDirection);
  }, [
    apiEndpoint,
    currentPage,
    perPage,
    sortField,
    sortDirection,
    searchTerm,
    status,
  ]);

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

  console.log("data.length", data.length);

  const handleLogSearch = (state) => {
    state === "open" ? setLogSearch(true) : setLogSearch(false);
  };

  return (
    <div className="w-full mx-auto text-xs font-semibold md:text-sm overflow-x-hidden">
      <ToastContainer />
      <div className="">
        {filters && (
          <div className="px-4 pt-4 flex flex-col md:flex-row justify-between md:items-center">
            <div className="flex gap-2 items-center justify-between w-full md:w-fit">
              <div className="text-xs font-semibold flex border border-1 items-center mb-4 h-3">
                <Select
                  className="text-xs"
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
                  className="text-xs font-semibold flex gap-2 items-center border border-swGray bg-white py-1.5 px-3 mb-4 rounded-lg hover:bg-swBlue hover:text-white"
                >
                  <FiFilter size={15} />
                  <p>Filter By Date</p>
                </button>
              </div>
              {filterParams && (
                <div className="flex gap-3 items-center">
                  <button
                    onClick={() => {
                      setFilterOptions(true);
                    }}
                    className="text-xs font-semibold flex gap-2 items-center border border-swGray bg-white py-1.5 px-3 mb-4 rounded-lg hover:bg-swBlue hover:text-white"
                  >
                    <p>Filter Status</p>
                  </button>
                </div>
              )}

              {status != " " ? (
                <div className="flex gap-3 items-center">
                  {" "}
                  <div className="text-xs font-semibold flex gap-3 items-center">
                    <p className=" flex gap-2 items-center border border-swGray bg-white py-1.5 px-3 mb-4 rounded-lg">
                      Status : {status}{" "}
                      <span>
                        {" "}
                        <FaWindowClose
                          color="red"
                          size={15}
                          cursor={"pointer"}
                          onClick={clearFilter}
                        />
                      </span>
                    </p>
                  </div>
                </div>
              ) : null}
              {dateRange && dateRange[0].startDate != null ? (
                <div className="flex gap-3 items-center">
                  {" "}
                  <div className="flex gap-3 items-center">
                    <p className="text-xs font-semibold flex gap-2 items-center border border-swGray bg-white py-1.5 px-3 mb-4 rounded-lg">
                      Date Range :{" "}
                      {dateRange[0]?.startDate.toISOString().slice(0, 10)} to{" "}
                      {dateRange[0]?.endDate.toISOString().slice(0, 10)}{" "}
                      <span>
                        {" "}
                        <FaWindowClose
                          color="red"
                          size={15}
                          cursor={"pointer"}
                          onClick={clearDateFilter}
                        />
                      </span>
                    </p>{" "}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="mb-4 flex flex-col gap-2 sm:gap-0 sm:flex-row items-center justify-between w-full md:w-fit">
              <div className="flex justify-center items-center gap-2 w-full">
                
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

                {/* <div className="bg-white w-fit p-2 rounded-md border-2 border-transparent hover:border-gray-200 cursor-pointer">
                  <BsThreeDotsVertical size={20} />
                </div> */}
              </div>
              <div className="flex">
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
                    <p className=""> {loading ? "Exporting" : "Export"}</p>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        )}
        {data?.length > 0 && loading == false ? (
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
                      item?.taskId
                        ? localStorage.setItem("taskId", item?.taskId)
                        : null;
                    }
                  }}
                  key={item._id}
                  className="border pt-2 pb-2 hover:bg-swLightGray"
                  style={{ cursor: "pointer" }}
                >
                  {headers.map((header) => (
                    <td
                      key={header.id}
                      className="px-5 py-4 border font-400 text-xs font-semibold text-swGray border-none"
                    >
                      {item[header.id]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : data?.length == 0 && !isLoading ? (
          <div class="min-h-500 flex items-center justify-center">
            <div class="rounded-lg p-8 w-[400px] flex flex-col items-center">
              <Image src={sketch} alt="company logo" />
              <p class="text-center text-md">This list is empty</p>
            </div>
          </div>
        ) : null}

        {pagination && data?.length > 0 && (
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
        width={"fit-content"}
        isOpen={dateFilterOpen}
        onClose={() => {
          setDateFilterOpen(!dateFilterOpen);
        }}
      >
        <div className="bg-white p-4 border shadow-lg">
          <div className="text-swBlue text-sm font-semibold pb-4">
            Filter By Date
          </div>
          <div className="w-full items-center">
            <DateRange
              editableDateInputs={true}
              onChange={(item) => {
                const adjustedItem = {
                  ...item.selection,
                  startDate: new Date(
                    Date.UTC(
                      item.selection.startDate.getFullYear(),
                      item.selection.startDate.getMonth(),
                      item.selection.startDate.getDate()
                    )
                  ),
                  endDate: new Date(
                    Date.UTC(
                      item.selection.endDate.getFullYear(),
                      item.selection.endDate.getMonth(),
                      item.selection.endDate.getDate()
                    )
                  ),
                };
                setDateRange([adjustedItem]);
              }}
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
                fetchData(currentPage, perPage, sortField, sortDirection);
                setDateFilterOpen(false);
              }}
            >
              Apply
            </Button>
          </div>
        </div>
      </CenterModal>
      {filterParams && (
        <CenterModal
          width={"20%"}
          isOpen={filterOptions}
          onClose={() => {
            setFilterOptions(!filterOptions);
          }}
        >
          <div className="bg-white p-4 border shadow-lg">
            <div
              className="flex justify-end cursor-pointer text-red-500"
              onClick={() => setFilterOptions(false)}
            >
              x
            </div>
            <div className="w-full items-center">
              {Array.isArray(filterParams) &&
                filterParams?.map((item) => (
                  <div
                    onClick={() => {
                      setStatus(item.name);
                      setFilterOptions(false);
                    }}
                    key={item._id}
                    className="mb-4 p-2 border rounded-lg shadow-md transition duration-300 hover:bg-gray-100 cursor-pointer"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-xs font-semibold text-gray-600">
                          {item.name}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </CenterModal>
      )}
    </div>
  );
}

export default ReusableDataTable;
