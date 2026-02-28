import React from 'react';
import DashboardLayout from '@/features/dashboard/components/layout/DashboardLayout';
import Modifier from './Modifier';
import { DashboardOutlined, SettingOutlined, AppstoreOutlined } from '@ant-design/icons';

const ModifierPage: React.FC = () => {
    const breadcrumbs = [
        { label: 'Dashboard', icon: <DashboardOutlined />, path: '/dashboard' },
        { label: 'Settings', icon: <SettingOutlined />, path: '/settings/business-settings' },
        { label: 'Modifier Sets', icon: <AppstoreOutlined /> },
    ];

    return (
        <DashboardLayout breadcrumbs={breadcrumbs}>
            <Modifier />
        </DashboardLayout>
    );
};

export default ModifierPage;