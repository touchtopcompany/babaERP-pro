import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
    DashboardOutlined,
    UserOutlined,
} from "@ant-design/icons";
import AssetAllocated from "./AssetAllocated";

const AssetAllocatedPage: React.FC = () => {
    return (
        <DashboardLayout
            businessName="C2Z Electronics"
            breadcrumbs={[
                { label: "Dashboard", icon: <DashboardOutlined /> },
                { label: "Asset-Management", icon: <UserOutlined /> },
                { label: "Asset Allocated", icon: <UserOutlined /> },
            ]}
        >
            <AssetAllocated />
        </DashboardLayout>
    );
};

export default AssetAllocatedPage;