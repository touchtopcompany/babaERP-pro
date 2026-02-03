import DashboardLayout from "../../components/layout/DashboardLayout";
import PriceGroup from "./PriceGroup";
import {
  DashboardOutlined,
  AppstoreOutlined,
  DollarOutlined,
} from "@ant-design/icons";

const PriceGroupPage: React.FC = () => {
  return (
    <DashboardLayout
      businessName="C2Z Electronics"
      breadcrumbs={[
        { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
        { label: "Products", icon: <AppstoreOutlined />, path: "/products/list-products" },
        { label: "Price Group", icon: <DollarOutlined /> },
      ]}
      showFilters={false}
    >
      <PriceGroup />
    </DashboardLayout>
  );
};

export default PriceGroupPage;

