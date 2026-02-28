import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
    DashboardOutlined,
    ToolOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import AddInvoice from "./AddInvoice";

const AddInvoicePage: React.FC = () => {
    return (
        <DashboardLayout
            businessName="C2Z Electronics"
            breadcrumbs={[
                { label: "Dashboard", icon: <DashboardOutlined /> },
                { label: "Repair", icon: <ToolOutlined /> },
                { label: "Add Invoice", icon: <PlusOutlined /> },
            ]}
        >
            <AddInvoice />
        </DashboardLayout>
    );
};

export default AddInvoicePage;