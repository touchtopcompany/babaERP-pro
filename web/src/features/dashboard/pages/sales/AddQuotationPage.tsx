import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import AddQuotation from "./AddQuotation";
import { DashboardOutlined, ShoppingOutlined, FileTextOutlined } from "@ant-design/icons";

const AddQuotationPage: React.FC = () => {
  const breadcrumbs = [
    {
      label: "Dashboard",
      icon: <DashboardOutlined />,
    },
    {
      label: "Sales",
      icon: <ShoppingOutlined />,
    },
    {
      label: "Add Quotation",
      icon: <FileTextOutlined />,
    },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <AddQuotation />
    </DashboardLayout>
  );
};

export default AddQuotationPage;

