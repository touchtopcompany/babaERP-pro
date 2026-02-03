import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import JournalEntry from "./JournalEntry";
import { DashboardOutlined, FileTextOutlined } from "@ant-design/icons";

const JournalEntryPage: React.FC = () => {
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
      label: "Journal Entry",
    },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <JournalEntry />
    </DashboardLayout>
  );
};

export default JournalEntryPage;
