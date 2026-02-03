import DashboardLayout from "../../components/layout/DashboardLayout";
import CustomerGroups from "./CustomerGroups";
import {
  DashboardOutlined,
  ContactsOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const CustomerGroupsPage: React.FC = () => {
  return (
    <DashboardLayout
      businessName="C2Z Electronics"
      breadcrumbs={[
        { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
        { label: "Contacts", icon: <ContactsOutlined />, path: "/contacts" },
        { label: "Customer Groups", icon: <TeamOutlined /> },
      ]}
      showFilters={false}
    >
      <CustomerGroups />
    </DashboardLayout>
  );
};

export default CustomerGroupsPage;

