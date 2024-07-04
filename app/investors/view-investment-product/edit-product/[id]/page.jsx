"use client";
import DashboardLayout from "../../../../components/dashboardLayout/DashboardLayout";
import InputField from "../../../../components/shared/input/InputField";
import { AiOutlinePercentage, AiOutlineMinus } from "react-icons/ai";
import SelectField from "../../../../components/shared/input/SelectField";
import Button from "../../../../components/shared/buttonComponent/Button";
import { useEffect, useState } from "react";
import EditableButton from "@/app/components/shared/editableButtonComponent/EditableButton";
import {
  createInvestmentProduct,
  getSingleInvestmentProduct,
  updateProduct,
  updateSingleInvestmentProduct,
} from "@/redux/slices/investmentSlice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";

const EditInvestmentProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    minInterestRange: "",
    maxInterestRange: "",
    interestMethod: "",
    minimumInvestmentAmount: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      minInterestRange: "",
      maxInterestRange: "",
      interestMethod: "",
      minimumInvestmentAmount: "",
    });
  };
  const investOptions = [
    {
      value: "LIAB",
      label: "Last investor account balance",
    },
    { value: "PRB", label: "Pro-Rata basis" },
  ];

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    if (name === "minimumInvestmentAmount") {
      // Remove all non-numeric characters except for a dot
      const numericValue = value.replace(/[^0-9.]/g, "");

      // Format the value with commas
      const formattedValue = Number(numericValue).toLocaleString();

      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: formattedValue,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const preventMinus = (e) => {
    if (/[^0-9,]/g.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    let payload = {
      name: formData.name,
      interestRateRange: {
        min: Number(formData.minInterestRange),
        max: Number(formData.maxInterestRange),
      },
      interestMethod: formData.interestMethod,
      minimumInvestmentAmount: Number(
        removeCommasFromNumber(formData.minimumInvestmentAmount)
      ),
    };

    dispatch(updateProduct({id, payload}))
      .unwrap()
      .then((response) => {
        toast.success(response?.message);
        console.log(response);
        resetForm();
        // router.push("/investors");
        // setNewUserId(response?.data?._id);
      })
      .catch((error) => {
        console.log({ error });
        toast.error(error?.message);
        setLoading(false);
      });

    // console.log({ payload });
  };

  const removeCommasFromNumber = (numberString) => {
    if (typeof numberString !== "string") {
      // Convert to string or handle the case appropriately
      numberString = String(numberString);
    }
    return numberString.replace(/,/g, "");
  };

  console.log({ formData });
  useEffect(() => {
    dispatch(getSingleInvestmentProduct(id))
      .unwrap()
      .then((res) =>
        setFormData({
          name: res?.data?.name,
          minInterestRange: res?.data?.interestRateRange?.min,
          maxInterestRange: res?.data?.interestRateRange?.max,
          interestMethod: res?.data?.interestMethod?.code,
          minimumInvestmentAmount:
            res?.data?.minimumInvestmentAmount.toLocaleString(),
        })
      )
      .catch((err) => console.log(err));
  }, []);

  return (
    <DashboardLayout
      isBackNav={true}
      paths={["Investors", "View investment product", "Edit product"]}
    >
      <ToastContainer />
      <div className="mx-auto w-3/5">
        <h1 className="font-medium text-xl leading-7 text-black py-5">
          Edit product
        </h1>
        <div>
          <div className="mt-5">
            <InputField
              name={"name"}
              label={"Product Name"}
              placeholder={"Enter product name"}
              required={true}
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          {/* Interest rate range */}
          <div className="my-10 flex justify-between gap-4">
            <div className="w-full">
              <InputField
                required={true}
                name="minInterestRange"
                inputType="number"
                onKeyPress={preventMinus}
                onWheel={() => document.activeElement.blur()}
                activeBorderColor="border-swBlue"
                label={"Interest rate range"}
                value={formData.minInterestRange}
                placeholder={"Minimum rate"}
                onChange={handleInputChange}
              />
            </div>
            <div className="mt-10">
              <AiOutlineMinus className="text-swGray" size={20} />
            </div>
            <div className="w-full mt-7">
              <InputField
                required={true}
                name="maxInterestRange"
                inputType="number"
                onKeyPress={preventMinus}
                onWheel={() => document.activeElement.blur()}
                activeBorderColor="border-swBlue"
                value={formData.maxInterestRange}
                placeholder={"Maximum rate"}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Invest method */}
          <div>
            <SelectField
              name={"interestMethod"}
              label={"Interest method"}
              required={true}
              placeholder={"Select method"}
              optionValue={investOptions}
              value={investOptions.find(
                (e) => e.value === formData.interestMethod
              )}
              onChange={(e) =>
                setFormData({ ...formData, interestMethod: e.value })
              }
            />
            <div className="mt-2 text-sm leading-5">
              <p className="font-normal">
                <b className="font-medium">Last Investor account balance:</b>{" "}
                Will calculate the interest on the last balance
              </p>
              <p className="font-normal">
                <b className="font-medium">Pro-Rata Basis:</b> Will look at the
                balance for each day and calculate interest for those days only
              </p>
            </div>
          </div>

          {/* investment amount range */}
          <div className="my-10 flex justify-between gap-4">
            <div className="w-full">
              <InputField
                required={true}
                name={"minimumInvestmentAmount"}
                label={"Investment amount range"}
                onKeyPress={preventMinus}
                onWheel={() => document.activeElement.blur()}
                activeBorderColor="border-swBlue"
                endIcon={"NGN"}
                value={formData.minimumInvestmentAmount}
                placeholder={"Minimum amount"}
                onChange={handleInputChange}
              />
            </div>
            <div className="mt-10">
              <AiOutlineMinus className="text-swGray" size={20} />
            </div>
            <div className="w-full">
              <InputField
                required={true}
                name={"minimumInvestmentAmount"}
                label={"Investment amount range"}
                onKeyPress={preventMinus}
                onWheel={() => document.activeElement.blur()}
                activeBorderColor="border-swBlue"
                endIcon={"NGN"}
                // value={formData.maxInterestRange}
                placeholder={"Minimum amount"}
                // onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex justify-center my-20">
            <EditableButton
              disabled={loading}
              blueBtn={true}
              onClick={handleSubmit}
              className="rounded-md"
              label={"Update product"}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EditInvestmentProduct;
