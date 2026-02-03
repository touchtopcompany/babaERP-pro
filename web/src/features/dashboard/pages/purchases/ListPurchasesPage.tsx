import DashboardLayout from "../../components/layout/DashboardLayout";
import ListPurchases from "./ListPurchases";
import {
  DashboardOutlined,
  ArrowDownOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

const ListPurchasesPage: React.FC = () => {
  return (
    <DashboardLayout
      businessName="C2Z Electronics"
      breadcrumbs={[
        { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
        { label: "Purchases", icon: <ArrowDownOutlined />, path: "/purchases" },
        { label: "List Purchases", icon: <UnorderedListOutlined /> },
      ]}
      showFilters={false}
    >
      <ListPurchases />
    </DashboardLayout>
  );
};

export default ListPurchasesPage;

