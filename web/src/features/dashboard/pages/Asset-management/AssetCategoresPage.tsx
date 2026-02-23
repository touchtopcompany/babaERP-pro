import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
    DashboardOutlined,
    TagsOutlined,
} from "@ant-design/icons";
import AssetCategores from "./AssetCategores";

const AssetCategoresPage: React.FC = () => {
    return (
        <DashboardLayout
            businessName="C2Z Electronics"
            breadcrumbs={[
                { label: "Dashboard", icon: <DashboardOutlined /> },
                { label: "Asset-Management", icon: <TagsOutlined /> },
                { label: "Asset Categories", icon: <TagsOutlined /> },
            ]}
        >
            <AssetCategores />
        </DashboardLayout>
    );
};

export default AssetCategoresPage;