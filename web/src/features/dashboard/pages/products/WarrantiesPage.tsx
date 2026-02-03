import DashboardLayout from "../../components/layout/DashboardLayout";
import Warranties from "./Warranties";
import {
  DashboardOutlined,
  AppstoreOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

const WarrantiesPage: React.FC = () => {
  return (
    <DashboardLayout
      businessName="C2Z Electronics"
      breadcrumbs={[
        { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
        { label: "Products", icon: <AppstoreOutlined />, path: "/products/list-products" },
        { label: "Warranties", icon: <SafetyCertificateOutlined /> },
      ]}
      showFilters={false}
    >
      <Warranties />
    </DashboardLayout>
  );
};

export default WarrantiesPage;

