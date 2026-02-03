import DashboardLayout from "../../components/layout/DashboardLayout";
import AddPurchase from "./AddPurchase";
import {
  DashboardOutlined,
  ArrowDownOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const AddPurchasePage: React.FC = () => {
  return (
    <DashboardLayout
      businessName="C2Z Electronics"
      breadcrumbs={[
        { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
        { label: "Purchases", icon: <ArrowDownOutlined />, path: "/purchases/list-purchases" },
        { label: "Add Purchase", icon: <PlusOutlined /> },
      ]}
      showFilters={false}
    >
      <AddPurchase />
    </DashboardLayout>
  );
};

export default AddPurchasePage;

