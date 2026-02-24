import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Manufacturing from "./Manufacturing";
import {
    DashboardOutlined,
    FileTextOutlined,
} from "@ant-design/icons";

const ManufacturingPage: React.FC = () => {
    return (
        <DashboardLayout
            businessName="C2Z Electronics"
            breadcrumbs={[
                { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
                { label: "Manufacturing", icon: <FileTextOutlined /> },
            ]}
        >
            <Manufacturing />
        </DashboardLayout>
    );
};

export default ManufacturingPage;