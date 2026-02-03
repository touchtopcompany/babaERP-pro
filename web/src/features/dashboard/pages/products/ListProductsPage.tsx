import DashboardLayout from "../../components/layout/DashboardLayout";
import ListProducts from "./ListProducts";
import {
  DashboardOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

const ListProductsPage: React.FC = () => {
  return (
    <DashboardLayout
      businessName="C2Z Electronics"
      breadcrumbs={[
        { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
        { label: "Products", icon: <AppstoreOutlined />, path: "/products" },
        { label: "List Products", icon: <UnorderedListOutlined /> },
      ]}
      showFilters={false}
    >
      <ListProducts />
    </DashboardLayout>
  );
};

export default ListProductsPage;

