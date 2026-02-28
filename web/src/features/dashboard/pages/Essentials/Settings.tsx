import React from 'react';
import { Card, Button, Typography, Space } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Settings: React.FC = () => {
    const handleSettingsClick = () => {
        // Redirect to localhost:5173/hrm/settings
        window.location.href = 'http://localhost:5173/hrm/settings';
    };

    return (
        <div className="settings-container">
            <Card>
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                    <SettingOutlined style={{ fontSize: '64px', color: '#1890ff', marginBottom: '24px' }} />
                    <Title level={3} style={{ marginBottom: '16px' }}>Settings</Title>
                    <Text style={{ color: '#666', fontSize: '16px', marginBottom: '32px', display: 'block' }}>
                        Configure your application settings and preferences
                    </Text>

                    <Space size="large" direction="vertical" style={{ width: '100%', maxWidth: '400px' }}>
                        <Button
                            type="primary"
                            size="large"
                            icon={<SettingOutlined />}
                            onClick={handleSettingsClick}
                            style={{ width: '100%', height: '50px' }}
                        >
                            Open HRM Settings
                        </Button>

                        <Text type="secondary" style={{ fontSize: '14px' }}>
                            Click to redirect to HRM Settings page
                        </Text>
                    </Space>
                </div>
            </Card>
        </div>
    );
};

export default Settings;