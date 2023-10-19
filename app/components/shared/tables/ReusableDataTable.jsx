import React, { useState, useEffect } from "react";
import { FiFilter } from "react-icons/fi";
import { MdOutlineSort } from "react-icons/md";
import Select from "react-select";
import Button from "../buttonComponent/Button";
import Image from "next/image";
import sketch from "../../../../public/images/sketch.jpg";
import { useRouter } from "next/navigation";
function ReusableDataTable({
  apiEndpoint,
  initialData,
  headers,
  sortedBy,
  btnText,
  btnTextClick,
  dataTransformer,
  onClickRow,
}) {
  const [data, setData] = useState(initialData || []);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [sortField, setSortField] = useState(sortedBy?.field || "");
  const [sortDirection, setSortDirection] = useState(
    sortedBy?.direction || "asc"
  );
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search term
  const [paginationLinks, setPaginationLinks] = useState(null);
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
      borderColor: "#ffffff", // Set border color to white or transparent
      boxShadow: state.isFocused ? "none" : provided.boxShadow, // Remove box-shadow when focused
      "&:hover": {
        borderColor: "#ffffff", // Set border color to white or transparent on hover
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

  const fetchData = (page, perPage, field, direction) => {
    let apiUrl = `${apiEndpoint}?page=${page}&per_page=${perPage}&sortedBy=${field}`;
    if (searchTerm) {
      apiUrl += `&search=${searchTerm}`;
    }

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (typeof dataTransformer === "function") {
          const transformedData = dataTransformer(data.results);
          setData(transformedData);
          setPaginationLinks(data.links);
        } else {
          setData(data.results);
          setPaginationLinks(data.links);
        }
      });
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

  return (
    <div className=" p-4 w-full mx-auto text-xs md:text-sm">
      {/* {data?.length > 0 ? ( */}
      <div className="">
        <div className="flex flex-col md:flex-row justify-between md:items-center">
          <div className="flex gap-2 items-center justify-between w-full md:w-fit">
            <div
              className="flex border border-1 items-center mb-4 pl-2"
              // style={{ width: "max-content" }}
            >
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
              <button className=" flex gap-2 items-center border border-swLightGray bg-white py-1.5 px-3 mb-4">
                <FiFilter size={20} />
                <p>Filter</p>
              </button>
            </div>
          </div>

          <div className="mb-4 flex items-center justify-between w-full md:w-fit">
            <input
              type="search"
              placeholder="search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="px-2 rounded outline-none border w-full border-gray-300 h-10"
            />
            {btnText ? (
              <div>
                <Button
                  className="bg-swBlue text-white md:p-2 rounded-md ml-2 whitespace-nowrap"
                  onClick={btnTextClick}
                >
                  {btnText}
                </Button>
              </div>
            ) : null}
          </div>
        </div>

        <table className="table-auto w-full border-collapse border overflow-hidden">
          <thead>
            <tr>
              {headers.map((header) => (
                <th
                  key={header.id}
                  className={`px-2 py-2 bg-swLightGray text-gray-500 border cursor-pointer text-start ${
                    header.id === sortField ? "font-light" : "font-light"
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
                onClick={() =>
                  router.push(`${onClickRow}/${item.id || item._id}`)
                }
                key={item._id}
                className="border pt-2 pb-2 hover:bg-swLightGray"
                style={{ cursor: "pointer" }}
              >
                {headers.map((header) => (
                  <td
                    key={header.id}
                    className="px-5 py-3 border font-400 text-xs text-swGray border-none"
                  >
                    {item[header.id]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
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
                    ? "bg-blue-500 text-white"
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
      </div>
      {/* // ) : (
      //   <div class="min-h-500 flex items-center justify-center">
      //     <div class="rounded-lg p-8 w-[400px] flex flex-col items-center">
      //       <Image src={sketch} alt="company logo" />
      //       <p class="text-center text-lg">This list is empty</p>
      //     </div>
      //   </div>
      // )} */}
    </div>
  );
}

export default ReusableDataTable;
