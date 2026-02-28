import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Settings from "./Settings";
import {
    DashboardOutlined,
    SettingOutlined,
} from "@ant-design/icons";

const SettingsPage: React.FC = () => {
    return (
        <DashboardLayout
            businessName="C2Z Electronics"
            breadcrumbs={[
                { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
                { label: "Manufacturing", icon: <SettingOutlined />, path: "/manufacturing" },
                { label: "Settings", icon: <SettingOutlined /> },
            ]}
        >
            <Settings />
        </DashboardLayout>
    );
};

export default SettingsPage;