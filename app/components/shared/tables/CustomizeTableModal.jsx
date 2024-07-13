import { IoClose } from "react-icons/io5";

const CustomizeTableModal = ({
  open,
  onClose,
  data,
  filteredData,
  setFilteredData,
  dataId,
  setDataId,
  headers,
}) => {
  const handleChange = (e, id) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setFilteredData((prev) =>
        prev.map((item, index) => ({
          ...item,
          [id]: data[index][id],
        }))
      );
      setDataId((prev) => [...prev, id]);
    } else {
      setDataId(dataId.filter((item) => item !== id));
      for (let i = 0; i < filteredData.length; i++) {
        delete filteredData[i][id];
      }
    }
  };

  const handleReset = () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = true;
    });

    // Reset filteredData and dataId to their initial values
    setFilteredData(data.map((item) => ({ ...item })));
    setDataId(headers.map((header) => header.id));
  };

  if (!open) return null;
  return (
    <main className="fixed bg-black bg-opacity-25 top-0 left-0 h-full w-full flex justify-center items-center p-5 z-[200]">
      <div className="bg-white max-w-lg w-full p-4 rounded-lg z-10">
        <div className="flex justify-between items-normal">
          <div>
            <p className="text-lg font-semibold">Customize Table</p>
            <p className="text-sm font-light">
              Customize table to show details you want to show
            </p>
          </div>
          <IoClose
            size={20}
            className="cursor-pointer"
            onClick={() => onClose(false)}
          />
        </div>

        <div className="my-5 flex flex-col gap-2 font-normal">
          {headers.length > 0 &&
            headers.map((header) => (
              <div key={header.id} className="flex items-center capitalize">
                <input
                  type="checkbox"
                  id={header.id}
                  className="mr-2 h-5 w-5"
                  checked={dataId.includes(header.id)}
                  onChange={(e) => handleChange(e, header.id)}
                />
                <label htmlFor={header.id}>{header.label}</label>
              </div>
            ))}
        </div>

        <div className="flex items-center gap-5">
          <button
            className="py-2 px-4 w-full rounded-md border hover:bg-gray-100"
            onClick={handleReset}
          >
            Reset to default
          </button>
          <button
            className="py-2 px-4 w-full rounded-md bg-swBlue text-white hover:bg-swDarkBlue"
            onClick={() => onClose(false)}
          >
            Save
          </button>
        </div>
      </div>
    </main>
  );
};

export default CustomizeTableModal;
