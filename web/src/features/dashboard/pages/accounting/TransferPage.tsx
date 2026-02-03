import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import Transfer from "./Transfer";
import { DashboardOutlined, FileTextOutlined } from "@ant-design/icons";

const TransferPage: React.FC = () => {
  const breadcrumbs = [
    {
      label: "Dashboard",
      icon: <DashboardOutlined />,
    },
    {
      label: "Accounting",
      icon: <FileTextOutlined />,
    },
    {
      label: "Transfer",
    },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <Transfer />
    </DashboardLayout>
  );
};

export default TransferPage;
