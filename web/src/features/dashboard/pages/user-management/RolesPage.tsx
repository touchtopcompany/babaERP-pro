import DashboardLayout from "../../components/layout/DashboardLayout";
import Roles from "./Roles";
import {
  DashboardOutlined,
  UsergroupAddOutlined,
  SafetyOutlined,
} from "@ant-design/icons";

const RolesPage: React.FC = () => {
  return (
    <DashboardLayout
      businessName="C2Z Electronics"
      breadcrumbs={[
        { label: "Dashboard", icon: <DashboardOutlined /> },
        { label: "User Management", icon: <UsergroupAddOutlined /> },
        { label: "Roles", icon: <SafetyOutlined /> },
      ]}
      showFilters={false}
    >
      <Roles />
    </DashboardLayout>
  );
};

export default RolesPage;

