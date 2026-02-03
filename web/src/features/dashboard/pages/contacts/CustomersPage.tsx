import DashboardLayout from "../../components/layout/DashboardLayout";
import Customers from "./Customers";
import {
  DashboardOutlined,
  ContactsOutlined,
  UserOutlined,
} from "@ant-design/icons";

const CustomersPage: React.FC = () => {
  return (
    <DashboardLayout
      businessName="C2Z Electronics"
      breadcrumbs={[
        { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
        { label: "Contacts", icon: <ContactsOutlined />, path: "/contacts" },
        { label: "Customers", icon: <UserOutlined /> },
      ]}
      showFilters={false}
    >
      <Customers />
    </DashboardLayout>
  );
};

export default CustomersPage;

