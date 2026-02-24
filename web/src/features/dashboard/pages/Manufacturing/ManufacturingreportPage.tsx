import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import ManufacturingReport from "./ManufacturingReport";
import {
    DashboardOutlined,
    FileTextOutlined,
} from "@ant-design/icons";

const ManufacturingreportPage: React.FC = () => {
    return (
        <DashboardLayout
            businessName="C2Z Electronics"
            breadcrumbs={[
                { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
                { label: "Manufacturing", icon: <FileTextOutlined /> },
            ]}
        >
            <ManufacturingReport />
        </DashboardLayout>
    );
};

export default ManufacturingreportPage;