import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Payroll from "./Payroll";
import {
    DashboardOutlined,
    FileTextOutlined,
} from "@ant-design/icons";

const PayrollPage: React.FC = () => {
    return (
        <DashboardLayout
            businessName="C2Z Electronics"
            breadcrumbs={[
                { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
                { label: "HMS", icon: <FileTextOutlined /> },
            ]}
        >
            <Payroll />
        </DashboardLayout>
    );
};

export default PayrollPage;