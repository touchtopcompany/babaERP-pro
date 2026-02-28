import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Settings from "./Settings";
import {
    DashboardOutlined,
    FileTextOutlined,
} from "@ant-design/icons";

const SettingsPage: React.FC = () => {
    return (
        <DashboardLayout
            businessName="C2Z Electronics"
            breadcrumbs={[
                { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
                { label: "HMS", icon: <FileTextOutlined /> },
            ]}
        >
            <Settings />
        </DashboardLayout>
    );
};

export default SettingsPage;