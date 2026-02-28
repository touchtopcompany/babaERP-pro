import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Holiday from "./Holiday";
import {
    DashboardOutlined,
    FileTextOutlined,
} from "@ant-design/icons";

const HolidayPage: React.FC = () => {
    return (
        <DashboardLayout
            businessName="C2Z Electronics"
            breadcrumbs={[
                { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
                { label: "HMS", icon: <FileTextOutlined /> },
            ]}
        >
            <Holiday />
        </DashboardLayout>
    );
};

export default HolidayPage;