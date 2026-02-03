import DashboardLayout from "../../components/layout/DashboardLayout";
import AddPurchaseReturn from "./AddPurchaseReturn";
import {
  DashboardOutlined,
  ArrowDownOutlined,
  PlusOutlined,
  UndoOutlined,
} from "@ant-design/icons";

const AddPurchaseReturnPage: React.FC = () => {
  return (
    <DashboardLayout
      businessName="C2Z Electronics"
      breadcrumbs={[
        { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
        { label: "Purchases", icon: <ArrowDownOutlined />, path: "/purchases/list-purchases" },
        { label: "Purchase Return", icon: <UndoOutlined />, path: "/purchases/purchase-return" },
        { label: "Add Purchase Return", icon: <PlusOutlined /> },
      ]}
      showFilters={false}
    >
      <AddPurchaseReturn />
    </DashboardLayout>
  );
};

export default AddPurchaseReturnPage;

