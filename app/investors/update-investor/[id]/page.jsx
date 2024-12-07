import DashboardLayout from "@/app/components/dashboardLayout/DashboardLayout";
import { investorsAuthRoles } from "@/app/components/helpers/pageAuthRoles";
import UpdateInvestorPorfileScreen from "@/app/components/investor-profile/UpdateInvestorPorfile";

const UpdateInvestorProfile = () => {
  return (
    <DashboardLayout
      isBackNav={true}
      paths={["Investors", "Update investor"]}
      roles={investorsAuthRoles}
    >
      <UpdateInvestorPorfileScreen />
    </DashboardLayout>
  );
};

export default UpdateInvestorProfile;
