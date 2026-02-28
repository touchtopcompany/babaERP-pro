import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
    DashboardOutlined,
    TagsOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import Settings from "./Settings";

const SettingsPage: React.FC = () => {
    return (
        <DashboardLayout
            businessName="C2Z Electronics"
            breadcrumbs={[
                { label: "Dashboard", icon: <DashboardOutlined /> },
                { label: "Asset-Management", icon: <TagsOutlined /> },
                { label: "Settings", icon: <SettingOutlined /> },
            ]}
        >
            <Settings />
        </DashboardLayout>
    );
};

export default SettingsPage;