import DashboardLayout from "../../components/layout/DashboardLayout";
import PurchaseReturn from "./PurchaseReturn";
import {
  DashboardOutlined,
  ArrowDownOutlined,
  UndoOutlined,
} from "@ant-design/icons";

const PurchaseReturnPage: React.FC = () => {
  return (
    <DashboardLayout
      businessName="C2Z Electronics"
      breadcrumbs={[
        { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
        { label: "Purchases", icon: <ArrowDownOutlined />, path: "/purchases/list-purchases" },
        { label: "Purchase Return", icon: <UndoOutlined /> },
      ]}
      showFilters={false}
    >
      <PurchaseReturn />
    </DashboardLayout>
  );
};

export default PurchaseReturnPage;

