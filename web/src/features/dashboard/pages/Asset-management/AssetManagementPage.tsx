import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
    DashboardOutlined,
    ToolOutlined,
} from "@ant-design/icons";
import AssetManagement from "./AssetManagement";

const AssetManagementPage: React.FC = () => {
    return (
        <DashboardLayout
            businessName="C2Z Electronics"
            breadcrumbs={[
                { label: "Dashboard", icon: <DashboardOutlined /> },
                { label: "Asset-Management", icon: <ToolOutlined /> },
            ]}
        >
            <AssetManagement />
        </DashboardLayout>
    );
};

export default AssetManagementPage;