import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import PaymentAccountReport from "./PaymentAccountReport";
import { DashboardOutlined, DollarOutlined } from "@ant-design/icons";

const PaymentAccountReportPage: React.FC = () => {
  const breadcrumbs = [
    {
      label: "Dashboard",
      icon: <DashboardOutlined />,
    },
    {
      label: "Payment Accounts",
      icon: <DollarOutlined />,
    },
    {
      label: "Payment Account Report",
    },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <PaymentAccountReport />
    </DashboardLayout>
  );
};

export default PaymentAccountReportPage;

