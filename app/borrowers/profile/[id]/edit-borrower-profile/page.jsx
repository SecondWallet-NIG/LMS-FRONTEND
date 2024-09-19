"use client";
import { useEffect, useState } from "react";
import DashboardLayout from "../../../../components/dashboardLayout/DashboardLayout";
import PersonalInformation from "../../../../components/editBorrowerProfile/PersonalInformation";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerById } from "@/redux/slices/customerSlice";
import { useParams } from "next/navigation";
import WorkInformation from "@/app/components/editBorrowerProfile/WorkInformation";
import ProfileDocuments from "@/app/components/editBorrowerProfile/Documents";
import { borrowersAuthRoles } from "@/app/components/helpers/pageAuthRoles";

const EditProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [pageState, setPageState] = useState("Personal information");

  const {
    loading,
    error,
    data: userData,
  } = useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(getCustomerById(id));
  }, []);
  return (
    <DashboardLayout
      isBackNav={true}
      paths={["Borrowers", "Edit Profile"]}
      roles={borrowersAuthRoles}
    >
      <main className="p-5 text-swTextColor">
        <div className="flex">
          <p
            className={`border-b-2 px-6 py-2 cursor-pointer ${
              pageState === "Personal information"
                ? "text-swBlue border-swBlue font-medium"
                : "border-transparent"
            } `}
            onClick={() => setPageState("Personal information")}
          >
            Personal information
          </p>
          <p
            className={` border-b-2  px-6 py-2 cursor-pointer ${
              pageState === "Work information"
                ? "text-swBlue border-b-swBlue font-medium"
                : "border-transparent"
            }`}
            onClick={() => setPageState("Work information")}
          >
            Work information
          </p>
          <p
            className={` border-b-2  px-6 py-2 cursor-pointer ${
              pageState === "Documents"
                ? "text-swBlue border-b-swBlue font-medium"
                : "border-transparent"
            }`}
            onClick={() => setPageState("Documents")}
          >
            Documents
          </p>
        </div>

        <div className="max-w-3xl mx-auto p-2 mt-10 text-sm">
          {pageState === "Personal information" && (
            <PersonalInformation userData={userData} loading={loading} />
          )}
          {pageState === "Work information" && (
            <div>
              {userData && userData?.employmentInformation === null ? (
                <div>No employment information uploaded yet</div>
              ) : (
                <WorkInformation userData={userData} loading={loading} />
              )}
            </div>
          )}
          {pageState === "Documents" && (
            <ProfileDocuments userData={userData} loading={loading} />
          )}
          {/*{pageState === "Security" && <SecurityPage />} */}
        </div>
      </main>
    </DashboardLayout>
  );
};

export default EditProfile;
