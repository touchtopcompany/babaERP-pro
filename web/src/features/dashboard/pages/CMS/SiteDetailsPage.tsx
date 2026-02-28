import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import SiteDetails from "./SiteDetails";
import {
    DashboardOutlined,
    FileTextOutlined,
} from "@ant-design/icons";

const SiteDetailsPage: React.FC = () => {
    return (
        <DashboardLayout
            businessName="C2Z Electronics"
            breadcrumbs={[
                { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
                { label: "CMS", icon: <FileTextOutlined /> },
            ]}
        >
            <SiteDetails />
        </DashboardLayout>
    );
};

export default SiteDetailsPage;