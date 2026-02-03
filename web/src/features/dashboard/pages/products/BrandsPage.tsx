import DashboardLayout from "../../components/layout/DashboardLayout";
import Brands from "./Brands";
import {
  DashboardOutlined,
  AppstoreOutlined,
  ShopOutlined,
} from "@ant-design/icons";

const BrandsPage: React.FC = () => {
  return (
    <DashboardLayout
      businessName="C2Z Electronics"
      breadcrumbs={[
        { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
        { label: "Products", icon: <AppstoreOutlined />, path: "/products/list-products" },
        { label: "Brands", icon: <ShopOutlined /> },
      ]}
      showFilters={false}
    >
      <Brands />
    </DashboardLayout>
  );
};

export default BrandsPage;

