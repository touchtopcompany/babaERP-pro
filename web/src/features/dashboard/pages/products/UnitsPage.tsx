import DashboardLayout from "../../components/layout/DashboardLayout";
import Units from "./Units";
import {
  DashboardOutlined,
  AppstoreOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";

const UnitsPage: React.FC = () => {
  return (
    <DashboardLayout
      businessName="C2Z Electronics"
      breadcrumbs={[
        { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
        { label: "Products", icon: <AppstoreOutlined />, path: "/products/list-products" },
        { label: "Units", icon: <AppstoreAddOutlined /> },
      ]}
      showFilters={false}
    >
      <Units />
    </DashboardLayout>
  );
};

export default UnitsPage;

