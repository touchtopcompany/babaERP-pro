import DashboardLayout from "../../components/layout/DashboardLayout";
import Suppliers from "./Suppliers";
import {
  DashboardOutlined,
  ContactsOutlined,
  ShopOutlined,
} from "@ant-design/icons";

const SuppliersPage: React.FC = () => {
  return (
    <DashboardLayout
      businessName="C2Z Electronics"
      breadcrumbs={[
        { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
        { label: "Contacts", icon: <ContactsOutlined />, path: "/contacts" },
        { label: "Suppliers", icon: <ShopOutlined /> },
      ]}
      showFilters={false}
    >
      <Suppliers />
    </DashboardLayout>
  );
};

export default SuppliersPage;

