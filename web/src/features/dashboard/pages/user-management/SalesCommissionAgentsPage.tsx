import DashboardLayout from "../../components/layout/DashboardLayout";
import SalesCommissionAgents from "./SalesCommissionAgents";
import {
  DashboardOutlined,
  UsergroupAddOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const SalesCommissionAgentsPage: React.FC = () => {
  return (
    <DashboardLayout
      businessName="C2Z Electronics"
      breadcrumbs={[
        { label: "Dashboard", icon: <DashboardOutlined /> },
        { label: "User Management", icon: <UsergroupAddOutlined /> },
        { label: "Sales Commission Agents", icon: <TeamOutlined /> },
      ]}
    >
      <SalesCommissionAgents />
    </DashboardLayout>
  );
};

export default SalesCommissionAgentsPage;

