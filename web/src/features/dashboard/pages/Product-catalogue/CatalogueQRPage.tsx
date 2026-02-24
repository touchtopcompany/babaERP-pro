import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import CatalogueQR from "./CatalogueQR";
import {
    DashboardOutlined,
    QrcodeOutlined,
} from "@ant-design/icons";

const CatalogueQRPage: React.FC = () => {
    return (
        <DashboardLayout
            businessName="C2Z Electronics"
            breadcrumbs={[
                { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
                { label: "Product Catalogue QR", icon: <QrcodeOutlined /> },
            ]}
        >
            <CatalogueQR />
        </DashboardLayout>
    );
};

export default CatalogueQRPage;