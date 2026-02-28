import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
    DashboardOutlined,
    FileTextOutlined,
} from "@ant-design/icons";
import AssetRevoked from "./AssetRevoked";

const AssetRevokedPage: React.FC = () => {
    return (
        <DashboardLayout
            businessName="C2Z Electronics"
            breadcrumbs={[
                { label: "Dashboard", icon: <DashboardOutlined /> },
                { label: "Asset-Management", icon: <FileTextOutlined /> },
                { label: "Asset Revoked", icon: <FileTextOutlined /> },
            ]}
        >
            <AssetRevoked />
        </DashboardLayout>
    );
};

export default AssetRevokedPage;