import DashboardLayout from "../../components/layout/DashboardLayout";
import Dashboard from "./Dashboard";

const DashboardPage: React.FC = () => {
  return (
    <DashboardLayout businessName="C2Z Electronics">
      <Dashboard />
    </DashboardLayout>
  );
};

export default DashboardPage;

