import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { DashboardOutlined, ShoppingOutlined } from "@ant-design/icons";
import Woocommerce from "./Woocommerce";

const WoocommercePage: React.FC = () => {
    return (
        <DashboardLayout
            businessName="C2Z Electronics"
            breadcrumbs={[
                { label: "Dashboard", icon: <DashboardOutlined /> },
                { label: "WooCommerce", icon: <ShoppingOutlined /> },
            ]}
        >
            <Woocommerce />
        </DashboardLayout>
    );
};

export default WoocommercePage;