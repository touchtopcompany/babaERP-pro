import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import Settings from "./Settings";
import { DashboardOutlined, FileTextOutlined, SettingOutlined } from "@ant-design/icons";

const SettingsPage: React.FC = () => {
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
            label: "Settings",
            icon: <SettingOutlined />,
        },
    ];

    return (
        <DashboardLayout breadcrumbs={breadcrumbs}>
            <Settings />
        </DashboardLayout>
    );
};

export default SettingsPage;