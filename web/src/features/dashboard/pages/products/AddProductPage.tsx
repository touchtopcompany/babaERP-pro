import DashboardLayout from "../../components/layout/DashboardLayout";
import AddProduct from "./AddProduct";
import {
  DashboardOutlined,
  AppstoreOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const AddProductPage: React.FC = () => {
  return (
    <DashboardLayout
      businessName="C2Z Electronics"
      breadcrumbs={[
        { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
        { label: "Products", icon: <AppstoreOutlined />, path: "/products/list-products" },
        { label: "Add Product", icon: <PlusOutlined /> },
      ]}
      showFilters={false}
    >
      <AddProduct />
    </DashboardLayout>
  );
};

export default AddProductPage;

