import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
    DashboardOutlined,
    ToolOutlined,
} from "@ant-design/icons";
import AssetMaintainance from "./AssetMaintainance";

const AssetMaintainancePage: React.FC = () => {
    return (
        <DashboardLayout
            businessName="C2Z Electronics"
            breadcrumbs={[
                { label: "Dashboard", icon: <DashboardOutlined /> },
                { label: "Asset-Management", icon: <ToolOutlined /> },
                { label: "Asset Maintenance", icon: <ToolOutlined /> },
            ]}
        >
            <AssetMaintainance />
        </DashboardLayout>
    );
};

export default AssetMaintainancePage;