import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { DashboardOutlined, FileTextOutlined } from "@ant-design/icons";
import ListInvoices from "./ListInvoices";

const ListInvoicesPage: React.FC = () => {
    return (
        <DashboardLayout
            businessName="C2Z Electronics"
            breadcrumbs={[
                { label: "Dashboard", icon: <DashboardOutlined /> },
                { label: "Invoices", icon: <FileTextOutlined /> },
            ]}
        >
            <ListInvoices />
        </DashboardLayout>
    );
};

export default ListInvoicesPage;