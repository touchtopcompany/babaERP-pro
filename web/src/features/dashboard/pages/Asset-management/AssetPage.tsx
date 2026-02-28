import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
    DashboardOutlined,
    ToolOutlined,
    DesktopOutlined,
} from "@ant-design/icons";
import Assets from "./Assets";

const AssetPage: React.FC = () => {
    return (
        <DashboardLayout
            businessName="C2Z Electronics"
            breadcrumbs={[
                { label: "Dashboard", icon: <DashboardOutlined /> },
                { label: "Asset-Management", icon: <ToolOutlined /> },
                { label: "Assets", icon: <DesktopOutlined /> },
            ]}
        >
            <Assets />
        </DashboardLayout>
    );
};

export default AssetPage;