import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Production from "./Production";
import {
    DashboardOutlined,
    FileTextOutlined,
} from "@ant-design/icons";

const ProductionPage: React.FC = () => {
    return (
        <DashboardLayout
            businessName="C2Z Electronics"
            breadcrumbs={[
                { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
                { label: "Manufacturing", icon: <FileTextOutlined /> },
            ]}
        >
            <Production />
        </DashboardLayout>
    );
};

export default ProductionPage;