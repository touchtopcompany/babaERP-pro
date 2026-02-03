import DashboardLayout from "../../components/layout/DashboardLayout";
import PrintLabels from "./PrintLabels";
import {
  DashboardOutlined,
  AppstoreOutlined,
  PrinterOutlined,
} from "@ant-design/icons";

const PrintLabelsPage: React.FC = () => {
  return (
    <DashboardLayout
      businessName="C2Z Electronics"
      breadcrumbs={[
        { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
        { label: "Products", icon: <AppstoreOutlined />, path: "/products/list-products" },
        { label: "Print Labels", icon: <PrinterOutlined /> },
      ]}
      showFilters={false}
    >
      <PrintLabels />
    </DashboardLayout>
  );
};

export default PrintLabelsPage;

