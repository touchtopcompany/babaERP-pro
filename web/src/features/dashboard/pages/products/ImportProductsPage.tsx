import DashboardLayout from "../../components/layout/DashboardLayout";
import ImportProducts from "./ImportProducts";
import {
  DashboardOutlined,
  AppstoreOutlined,
  ImportOutlined,
} from "@ant-design/icons";

const ImportProductsPage: React.FC = () => {
  return (
    <DashboardLayout
      businessName="C2Z Electronics"
      breadcrumbs={[
        { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
        { label: "Products", icon: <AppstoreOutlined />, path: "/products/list-products" },
        { label: "Import Products", icon: <ImportOutlined /> },
      ]}
      showFilters={false}
    >
      <ImportProducts />
    </DashboardLayout>
  );
};

export default ImportProductsPage;

