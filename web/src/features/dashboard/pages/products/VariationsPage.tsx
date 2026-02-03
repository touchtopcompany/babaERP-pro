import DashboardLayout from "../../components/layout/DashboardLayout";
import Variations from "./Variations";
import {
  DashboardOutlined,
  AppstoreOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";

const VariationsPage: React.FC = () => {
  return (
    <DashboardLayout
      businessName="C2Z Electronics"
      breadcrumbs={[
        { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
        { label: "Products", icon: <AppstoreOutlined />, path: "/products/list-products" },
        { label: "Variations", icon: <AppstoreAddOutlined /> },
      ]}
      showFilters={false}
    >
      <Variations />
    </DashboardLayout>
  );
};

export default VariationsPage;

