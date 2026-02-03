import DashboardLayout from "../../components/layout/DashboardLayout";
import ImportOpeningStock from "./ImportOpeningStock";
import {
  DashboardOutlined,
  AppstoreOutlined,
  ImportOutlined,
} from "@ant-design/icons";

const ImportOpeningStockPage: React.FC = () => {
  return (
    <DashboardLayout
      businessName="C2Z Electronics"
      breadcrumbs={[
        { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
        { label: "Products", icon: <AppstoreOutlined />, path: "/products/list-products" },
        { label: "Import Opening Stock", icon: <ImportOutlined /> },
      ]}
      showFilters={false}
    >
      <ImportOpeningStock />
    </DashboardLayout>
  );
};

export default ImportOpeningStockPage;

