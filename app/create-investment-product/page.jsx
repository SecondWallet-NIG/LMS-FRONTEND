"use client"
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import InputField from "../components/shared/input/InputField";
import { AiOutlinePercentage, AiOutlineMinus } from "react-icons/ai";
import SelectField from "../components/shared/input/SelectField";
import Button from "../components/shared/buttonComponent/Button";


const CreateInvestmentProduct = () => {
  const investOptions = [
    { value: '', label: 'Last investor account balance' },
    { value: '', label: 'Pro-Rata basis' }
  ]

  return (
    <DashboardLayout>
      <div className="mx-auto w-3/5">
        <h1 className="font-medium text-xl leading-7 text-black py-5">Create investment product</h1>
        <div>
          <div className="mt-5">
            <InputField
              name={'productName'}
              label={'Product Name'}
              placeholder={'Enter product name'}
              required={true}
            />
          </div>

          {/* Interest rate range */}
          <div className="my-10 flex justify-between gap-4">
            <div className="w-full">
              <InputField
                css={''}
                name={'minRate'}
                label={'Interest rate range'}
                placeholder={'Minimum rate'}
                required={true}
                endIcon={<AiOutlinePercentage />}
              />
            </div>
            <div className="mt-10">
              <AiOutlineMinus className="text-swGray" size={20} />
            </div>
            <div className="w-full mt-7">
              <InputField
                name={'maxRate'}
                placeholder={'Maximum rate'}
                required={true}
                endIcon={<AiOutlinePercentage />}
              />
            </div>
          </div>

          {/* Invest method */}
          <div>
            <SelectField
              name={'investMethod'}
              label={'Interest method'}
              required={true}
              placeholder={'Select method'}
              optionValue={investOptions}
            />
            <div className="mt-2 text-sm leading-5">
              <p className="font-normal">
                <b className="font-medium">Last Investor account balance:</b> Will calculate the interest on the last balance
              </p>
              <p className="font-normal">
                <b className="font-medium">Pro-Rata Basis:</b> Will look at the balance for each day and calculate interest for those days only
              </p>
            </div>
          </div>

          {/* investment amount range */}
          <div className="my-10 flex justify-between gap-4">
            <div className="w-full">
              <InputField
                css={''}
                name={'minAmount'}
                label={'Investment amount range'}
                placeholder={'Minimum amount'}
                required={true}
                endIcon={'NGN'}
              />
            </div>
            <div className="mt-10">
              <AiOutlineMinus className="text-swGray" size={20} />
            </div>
            <div className="w-full mt-7">
              <InputField
                name={'maxAmount'}
                placeholder={'Maximum amount'}
                required={true}
                endIcon={'NGN'}
              />
            </div>
          </div>

          <div className="text-center my-40">
            <Button
              className='text-white font-base leading-6 font-semibold rounded-md px-2 gap-2'
            >
              Create investment product
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};


export default CreateInvestmentProduct;