import React from 'react';
import DashboardLayout from '@/features/dashboard/components/layout/DashboardLayout';
import Tables from './Tables';
import { DashboardOutlined, SettingOutlined, TableOutlined } from '@ant-design/icons';

const TablesPage: React.FC = () => {
    const breadcrumbs = [
        { label: 'Dashboard', icon: <DashboardOutlined />, path: '/dashboard' },
        { label: 'Settings', icon: <SettingOutlined />, path: '/settings/business-settings' },
        { label: 'Tables', icon: <TableOutlined /> },
    ];

    return (
        <DashboardLayout breadcrumbs={breadcrumbs}>
            <Tables />
        </DashboardLayout>
    );
};

export default TablesPage;