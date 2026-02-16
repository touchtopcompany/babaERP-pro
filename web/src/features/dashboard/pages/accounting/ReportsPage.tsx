import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import Reports from "./Reports";
import { DashboardOutlined, FileTextOutlined } from "@ant-design/icons";

const ReportsPage: React.FC = () => {
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
            label: "Reports",
        },
    ];

    return (
        <DashboardLayout breadcrumbs={breadcrumbs}>
            <Reports />
        </DashboardLayout>
    );
};

export default ReportsPage;