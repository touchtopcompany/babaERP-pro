import DashboardLayout from "../../components/layout/DashboardLayout";
import Categories from "./Categories";
import {
  DashboardOutlined,
  AppstoreOutlined,
  FolderOutlined,
} from "@ant-design/icons";

const CategoriesPage: React.FC = () => {
  return (
    <DashboardLayout
      businessName="C2Z Electronics"
      breadcrumbs={[
        { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
        { label: "Products", icon: <AppstoreOutlined />, path: "/products/list-products" },
        { label: "Categories", icon: <FolderOutlined /> },
      ]}
      showFilters={false}
    >
      <Categories />
    </DashboardLayout>
  );
};

export default CategoriesPage;

