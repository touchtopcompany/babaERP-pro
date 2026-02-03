import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import TrendingProductsReport from "./TrendingProductsReport";
import { DashboardOutlined, BarChartOutlined } from "@ant-design/icons";

const TrendingProductsReportPage: React.FC = () => {
  const breadcrumbs = [
    { label: "Dashboard", icon: <DashboardOutlined /> },
    { label: "Reports", icon: <BarChartOutlined /> },
    { label: "Trending Products" },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <TrendingProductsReport />
    </DashboardLayout>
  );
};

export default TrendingProductsReportPage;
