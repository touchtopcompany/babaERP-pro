import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import ProductPurchaseReport from "./ProductPurchaseReport";
import { DashboardOutlined, BarChartOutlined } from "@ant-design/icons";

const ProductPurchaseReportPage: React.FC = () => {
  const breadcrumbs = [
    { label: "Dashboard", icon: <DashboardOutlined /> },
    { label: "Reports", icon: <BarChartOutlined /> },
    { label: "Product Purchase Report" },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <ProductPurchaseReport />
    </DashboardLayout>
  );
};

export default ProductPurchaseReportPage;
