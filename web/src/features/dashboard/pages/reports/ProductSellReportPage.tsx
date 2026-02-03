import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import ProductSellReport from "./ProductSellReport";
import { DashboardOutlined, BarChartOutlined } from "@ant-design/icons";

const ProductSellReportPage: React.FC = () => {
  const breadcrumbs = [
    { label: "Dashboard", icon: <DashboardOutlined /> },
    { label: "Reports", icon: <BarChartOutlined /> },
    { label: "Product Sell Report" },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <ProductSellReport />
    </DashboardLayout>
  );
};

export default ProductSellReportPage;
