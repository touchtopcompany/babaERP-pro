import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import Accounting from "./Accounting";
import { DashboardOutlined, FileTextOutlined } from "@ant-design/icons";

const AccountingPage: React.FC = () => {
  const breadcrumbs = [
    {
      label: "Dashboard",
      icon: <DashboardOutlined />,
    },
    {
      label: "Accounting",
      icon: <FileTextOutlined />,
    },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <Accounting />
    </DashboardLayout>
  );
};

export default AccountingPage;

