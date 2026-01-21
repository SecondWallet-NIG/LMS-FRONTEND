"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditableButton from "../shared/editableButtonComponent/EditableButton";
import {
  triggerLoanInterestAccruals,
  triggerInvestmentInterestAccruals,
  triggerOverdueAccruals,
  triggerAllAccruals,
} from "@/redux/slices/accrualsSlice";
import { FiRefreshCw, FiDollarSign, FiTrendingUp, FiAlertCircle } from "react-icons/fi";

const AccrualsPage = () => {
  const dispatch = useDispatch();
  const accrualsState = useSelector((state) => state.accruals);
  const [loadingType, setLoadingType] = useState(null);

  const handleTriggerLoanInterest = async () => {
    setLoadingType("loan");
    try {
      await dispatch(triggerLoanInterestAccruals()).unwrap();
      toast.success("Loan interest accruals triggered successfully");
    } catch (error) {
      toast.error(error.message || "Failed to trigger loan interest accruals");
    } finally {
      setLoadingType(null);
    }
  };

  const handleTriggerInvestmentInterest = async () => {
    setLoadingType("investment");
    try {
      await dispatch(triggerInvestmentInterestAccruals()).unwrap();
      toast.success("Investment interest accruals triggered successfully");
    } catch (error) {
      toast.error(error.message || "Failed to trigger investment interest accruals");
    } finally {
      setLoadingType(null);
    }
  };

  const handleTriggerOverdueAccruals = async () => {
    setLoadingType("overdue");
    try {
      await dispatch(triggerOverdueAccruals()).unwrap();
      toast.success("Overdue accruals triggered successfully");
    } catch (error) {
      toast.error(error.message || "Failed to trigger overdue accruals");
    } finally {
      setLoadingType(null);
    }
  };

  const handleTriggerAllAccruals = async () => {
    setLoadingType("all");
    try {
      const result = await dispatch(triggerAllAccruals()).unwrap();
      toast.success("All accruals triggered successfully");
      
      // Show detailed results if available
      if (result?.data) {
        const results = result.data;
        const successCount = Object.values(results).filter(r => r?.success).length;
        const totalCount = Object.keys(results).length;
        toast.info(`${successCount}/${totalCount} accrual types completed successfully`);
      }
    } catch (error) {
      toast.error(error.message || "Failed to trigger accruals");
    } finally {
      setLoadingType(null);
    }
  };

  const isLoading = (type) => loadingType === type || accrualsState.loading;

  return (
    <div className="max-w-4xl mx-auto p-5 my-10">
      <ToastContainer />
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-swBlue mb-2">Daily Accruals Management</h2>
        <p className="text-swGray">
          Trigger daily accruals calculations manually. These functions normally run automatically via cron jobs.
        </p>
        <p className="text-sm text-yellow-600 mt-2 font-medium">
          ⚠️ Development Mode Only - These buttons are only visible in development environment
        </p>
      </div>

      <div className="space-y-6">
        {/* All Accruals Button */}
        <div className="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-2 border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FiRefreshCw size={24} className="text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-swBlue">Trigger All Accruals</h3>
              <p className="text-sm text-swGray">
                Calculate loan interest, investment interest, and overdue fees in one action
              </p>
            </div>
          </div>
          <EditableButton
            blueBtn={true}
            disabled={isLoading("all")}
            label={isLoading("all") ? "Processing..." : "Run All Accruals"}
            startIcon={isLoading("all") ? <FiRefreshCw className="animate-spin" /> : <FiRefreshCw />}
            onClick={handleTriggerAllAccruals}
            className="w-full sm:w-auto"
          />
        </div>

        {/* Individual Accrual Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Loan Interest Accrual */}
          <div className="rounded-lg bg-white p-5 border-2 border-gray-200 hover:border-blue-300 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <FiDollarSign size={20} className="text-green-600" />
              </div>
              <h3 className="font-semibold text-swBlue">Loan Interest</h3>
            </div>
            <p className="text-sm text-swGray mb-4">
              Calculate daily interest for all active loans
            </p>
            <EditableButton
              blueBtn={true}
              disabled={isLoading("loan")}
              label={isLoading("loan") ? "Calculating..." : "Calculate Loan Interest"}
              startIcon={isLoading("loan") ? <FiRefreshCw className="animate-spin" /> : <FiDollarSign />}
              onClick={handleTriggerLoanInterest}
              className="w-full"
            />
          </div>

          {/* Investment Interest Accrual */}
          <div className="rounded-lg bg-white p-5 border-2 border-gray-200 hover:border-blue-300 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FiTrendingUp size={20} className="text-purple-600" />
              </div>
              <h3 className="font-semibold text-swBlue">Investment Interest</h3>
            </div>
            <p className="text-sm text-swGray mb-4">
              Calculate daily interest for all active investments
            </p>
            <EditableButton
              blueBtn={true}
              disabled={isLoading("investment")}
              label={isLoading("investment") ? "Calculating..." : "Calculate Investment Interest"}
              startIcon={isLoading("investment") ? <FiRefreshCw className="animate-spin" /> : <FiTrendingUp />}
              onClick={handleTriggerInvestmentInterest}
              className="w-full"
            />
          </div>

          {/* Overdue Accruals */}
          <div className="rounded-lg bg-white p-5 border-2 border-gray-200 hover:border-red-300 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <FiAlertCircle size={20} className="text-red-600" />
              </div>
              <h3 className="font-semibold text-swBlue">Overdue Fees</h3>
            </div>
            <p className="text-sm text-swGray mb-4">
              Calculate overdue fees for all overdue repayments
            </p>
            <EditableButton
              redBtn={true}
              disabled={isLoading("overdue")}
              label={isLoading("overdue") ? "Calculating..." : "Calculate Overdue Fees"}
              startIcon={isLoading("overdue") ? <FiRefreshCw className="animate-spin" /> : <FiAlertCircle />}
              onClick={handleTriggerOverdueAccruals}
              className="w-full"
            />
          </div>
        </div>

        {/* Status Information */}
        {accrualsState.lastTriggered && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-swGray">
              <span className="font-semibold">Last Triggered:</span>{" "}
              {new Date(accrualsState.lastTriggered).toLocaleString()}
            </p>
          </div>
        )}

        {accrualsState.error && (
          <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
            <p className="text-sm text-red-600">
              <span className="font-semibold">Error:</span> {accrualsState.error}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccrualsPage;








