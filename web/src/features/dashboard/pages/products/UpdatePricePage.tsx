import DashboardLayout from "../../components/layout/DashboardLayout";
import UpdatePrice from "./UpdatePrice";
import {
  DashboardOutlined,
  AppstoreOutlined,
  DollarOutlined,
} from "@ant-design/icons";

const UpdatePricePage: React.FC = () => {
  return (
    <DashboardLayout
      businessName="C2Z Electronics"
      breadcrumbs={[
        { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
        { label: "Products", icon: <AppstoreOutlined />, path: "/products/list-products" },
        { label: "Update Price", icon: <DollarOutlined /> },
      ]}
      showFilters={false}
    >
      <UpdatePrice />
    </DashboardLayout>
  );
};

export default UpdatePricePage;

