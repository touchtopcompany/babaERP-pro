import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
    DashboardOutlined,
    ToolOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import Settings from "./Settings";

const RepairSettingsPage: React.FC = () => {
    return (
        <DashboardLayout
            businessName="C2Z Electronics"
            breadcrumbs={[
                { label: "Dashboard", icon: <DashboardOutlined /> },
                { label: "Repair", icon: <ToolOutlined /> },
                { label: "Settings", icon: <SettingOutlined /> },
            ]}
        >
            <Settings />
        </DashboardLayout>
    );
};

export default RepairSettingsPage;
