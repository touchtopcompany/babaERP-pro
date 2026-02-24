import React, { useState } from "react";
import {
    Button,
    Form,
    Input,
    Upload,
    message,
    Typography,
    Space,
    Menu,
    Layout,
} from "antd";
import {
    UploadOutlined,
    SaveOutlined,
    InfoCircleOutlined,
    PlusOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import type { UploadProps } from "antd";

const { Sider, Content } = Layout;

const SiteDetails: React.FC = () => {
    const [form] = Form.useForm();
    const [logoFile, setLogoFile] = useState<any>(null);
    const [selectedMenu, setSelectedMenu] = useState<string>('application');
    const [showNotification, setShowNotification] = useState<boolean>(false);
    const [notificationMessage, setNotificationMessage] = useState<string>('');
    const [notificationType, setNotificationType] = useState<'success' | 'error'>('success');
    const [faqItems, setFaqItems] = useState<Array<{ id: string; question: string; answer: string }>>([
        { id: '1', question: 'How do I reset my password?', answer: 'You can reset your password by clicking on the "Forgot Password" link on the login page.' },
        { id: '2', question: 'What payment methods do you accept?', answer: 'We accept all major credit cards, debit cards, and PayPal payments.' },
    ]);

    const uploadProps: UploadProps = {
        name: 'logo',
        multiple: false,
        accept: 'image/*',
        beforeUpload: (file) => {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                message.error('You can only upload JPG/PNG files!');
                return false;
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                message.error('Image must smaller than 2MB!');
                return false;
            }
            setLogoFile(file);
            return false; // Prevent automatic upload
        },
        onRemove: () => {
            setLogoFile(null);
        },
    };

    const handleSave = () => {
        form.validateFields().then((values) => {
            console.log('Saving site details:', { ...values, logoFile, faqItems });
            setNotificationMessage('Site details saved successfully!');
            setNotificationType('success');
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
            }, 3000);
        }).catch((error) => {
            console.error('Validation failed:', error);
            setNotificationMessage('Please fill in all required fields correctly.');
            setNotificationType('error');
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
            }, 3000);
        });
    };

    const addFaqItem = () => {
        const newItem = {
            id: Date.now().toString(),
            question: '',
            answer: ''
        };
        setFaqItems([...faqItems, newItem]);
    };

    const updateFaqItem = (id: string, field: 'question' | 'answer', value: string) => {
        setFaqItems(faqItems.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    const deleteFaqItem = (id: string) => {
        setFaqItems(faqItems.filter(item => item.id !== id));
    };

    const menuItems = [
        { key: 'application', label: 'Application' },
        { key: 'contact', label: 'Contact us' },
        { key: 'social', label: 'Follow us on / Social media links' },
        { key: 'statistics', label: 'Statistics' },
        { key: 'faq', label: 'FAQ' },
        { key: 'chat', label: 'Chat Widget' },
        { key: 'integration', label: 'Integration' },
        { key: 'buttons', label: 'Buttons' },
    ];

    return (
        <>
            <style>{`
                .classic-container {
                    background: #ffffff;
                    border: 1px solid #d0d0d0;
                    border-radius: 6px;
                    padding: 24px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                .classic-title {
                    color: #2c3e50 !important;
                    font-weight: 600;
                    border-bottom: 2px solid #3498db;
                    padding-bottom: 8px;
                    margin-bottom: 24px !important;
                }
                .classic-section {
                    background: #f8f9fa;
                    border: 1px solid #e0e0e0;
                    border-radius: 4px;
                    padding: 20px;
                    margin-bottom: 20px;
                }
                .classic-section-title {
                    color: #34495e !important;
                    font-weight: 500;
                    margin-bottom: 16px !important;
                    font-size: 16px;
                }
                .classic-form-row {
                    display: flex;
                    gap: 20px;
                    margin-bottom: 16px;
                    align-items: flex-start;
                }
                .classic-form-field {
                    flex: 1;
                    min-width: 250px;
                }
                .classic-label {
                    color: #2c3e50 !important;
                    font-weight: 500;
                    margin-bottom: 6px !important;
                    display: block;
                }
                .classic-input {
                    border: 1px solid #bdc3c7 !important;
                    border-radius: 4px !important;
                    padding: 8px 12px !important;
                    font-size: 14px !important;
                    transition: border-color 0.2s ease !important;
                    background-color: #ffffff !important;
                    color: #2c3e50 !important;
                }
                .classic-input:focus {
                    border-color: #3498db !important;
                    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2) !important;
                    outline: none !important;
                }
                .classic-input::placeholder {
                    color: #7f8c8d !important;
                }
                .classic-social-group {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    margin-bottom: 20px;
                    padding: 12px;
                    background: #ffffff;
                    border: 1px solid #e0e0e0;
                    border-radius: 4px;
                }
                .classic-social-icon {
                    width: 48px;
                    height: 48px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #ecf0f1;
                    border: 1px solid #bdc3c7;
                    border-radius: 4px;
                    color: #34495e;
                    font-weight: bold;
                    font-size: 18px;
                }
                .classic-social-input {
                    flex: 1;
                }
                .classic-description {
                    color: #7f8c8d !important;
                    font-size: 13px;
                    margin-top: 4px;
                    line-height: 1.4;
                }
                .classic-warning {
                    color: #e74c3c !important;
                    font-size: 12px;
                    margin-top: 4px;
                }
                .classic-button {
                    background: #3498db !important;
                    border: 1px solid #2980b9 !important;
                    border-radius: 4px !important;
                    padding: 8px 20px !important;
                    font-weight: 500 !important;
                    transition: background-color 0.2s ease !important;
                }
                .classic-button:hover {
                    background: #2980b9 !important;
                }
                .ant-form-item-label > label {
                    color: #2c3e50 !important;
                    font-weight: 500;
                }
                .ant-input {
                    border: 1px solid #bdc3c7 !important;
                    border-radius: 4px !important;
                    background-color: #ffffff !important;
                    color: #2c3e50 !important;
                }
                .ant-input:focus {
                    border-color: #3498db !important;
                    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2) !important;
                }
                .classic-notification {
                    position: fixed;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: #ffffff;
                    border: 1px solid #d0d0d0;
                    border-left: 4px solid #27ae60;
                    border-radius: 4px;
                    padding: 8px 20px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    z-index: 1000;
                    min-width: 240px;
                    max-width: 350px;
                    animation: slideDown 0.3s ease-out;
                }
                .classic-notification.error {
                    border-left-color: #e74c3c;
                }
                .classic-notification-title {
                    font-weight: 600;
                    color: #2c3e50;
                    margin-bottom: 2px;
                    font-size: 13px;
                }
                .classic-notification-message {
                    color: #34495e;
                    font-size: 12px;
                    line-height: 1.3;
                }
                @keyframes slideDown {
                    from {
                        transform: translateX(-50%) translateY(-100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(-50%) translateY(0);
                        opacity: 1;
                    }
                }
            `}</style>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider width={250} theme="light" style={{ borderRight: '1px solid #d9d9d9' }}>
                    <Menu
                        mode="inline"
                        selectedKeys={[selectedMenu]}
                        items={menuItems}
                        onSelect={({ key }) => setSelectedMenu(key)}
                        style={{ height: '100%', borderRight: 0 }}
                    />
                </Sider>
                <Content style={{ padding: '24px', background: '#fff' }}>
                    <div style={{ maxWidth: '800px' }}>
                        <Typography.Title level={3} className="classic-title" style={{ marginBottom: '32px' }}>
                            Site details
                        </Typography.Title>

                        {selectedMenu === 'application' && (
                            <>
                                {/* Logo Section */}
                                <div className="classic-section">
                                    <Typography.Title level={5} className="classic-section-title" style={{ marginBottom: '16px' }}>
                                        Logo Configuration
                                    </Typography.Title>

                                    <div style={{ marginBottom: '16px' }}>
                                        <label className="classic-label">Select Logo File:</label>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px' }}>
                                            <Upload {...uploadProps}>
                                                <Button icon={<UploadOutlined />} className="classic-button">Choose File</Button>
                                            </Upload>
                                            <span className="classic-description">
                                                {logoFile ? logoFile.name : 'No file chosen'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="classic-warning">
                                        Previously uploaded logo will be replaced.
                                    </div>

                                    <div className="classic-description">
                                        Logo dimension should be 60*42 (width x height) in pixel. Default logo will be used if not uploaded.
                                    </div>
                                </div>

                                {/* Notification Section */}
                                <div className="classic-section">
                                    <Typography.Title level={5} className="classic-section-title" style={{ marginBottom: '16px' }}>
                                        Email Notification Settings
                                    </Typography.Title>

                                    <Form form={form} layout="vertical">
                                        <Form.Item
                                            name="notificationEmail"
                                            label={
                                                <Space>
                                                    <span className="classic-label">Notification Email Address:</span>
                                                    <InfoCircleOutlined style={{ color: '#3498db' }} />
                                                </Space>
                                            }
                                            style={{ marginBottom: '12px' }}
                                        >
                                            <Input
                                                placeholder="notifyme@example.com"
                                                className="classic-input"
                                                style={{ maxWidth: '500px' }}
                                            />
                                        </Form.Item>

                                        <div className="classic-description">
                                            Email to which notification will be sent when contact form is submitted!
                                        </div>
                                    </Form>
                                </div>
                            </>
                        )}

                        {selectedMenu === 'contact' && (
                            <div className="classic-container">
                                {/* Contact Numbers Section */}
                                <div className="classic-section">
                                    <Typography.Title level={5} className="classic-section-title" style={{ marginBottom: '16px' }}>
                                        Contact Numbers
                                    </Typography.Title>

                                    <Form form={form} layout="vertical">
                                        <div className="classic-form-row">
                                            <div className="classic-form-field">
                                                <Form.Item
                                                    name="callLabel"
                                                    label="Label"
                                                    style={{ marginBottom: '0' }}
                                                    className="classic-label"
                                                >
                                                    <Input
                                                        defaultValue="Call"
                                                        className="classic-input"
                                                    />
                                                </Form.Item>
                                            </div>
                                            <div className="classic-form-field">
                                                <Form.Item
                                                    name="callNumber"
                                                    label="Contact Number"
                                                    style={{ marginBottom: '0' }}
                                                    className="classic-label"
                                                >
                                                    <Input
                                                        defaultValue="0000000000"
                                                        placeholder="Write mobile number with country code ex: 91XXXXXXXXXX"
                                                        className="classic-input"
                                                    />
                                                </Form.Item>
                                            </div>
                                        </div>

                                        <div className="classic-form-row">
                                            <div className="classic-form-field">
                                                <Form.Item
                                                    name="supportLabel"
                                                    label="Label"
                                                    style={{ marginBottom: '0' }}
                                                    className="classic-label"
                                                >
                                                    <Input
                                                        defaultValue="Support"
                                                        className="classic-input"
                                                    />
                                                </Form.Item>
                                            </div>
                                            <div className="classic-form-field">
                                                <Form.Item
                                                    name="supportNumber"
                                                    label="Contact Number"
                                                    style={{ marginBottom: '0' }}
                                                    className="classic-label"
                                                >
                                                    <Input
                                                        defaultValue="0000000000"
                                                        placeholder="Write mobile number with country code ex: 91XXXXXXXXXX"
                                                        className="classic-input"
                                                    />
                                                </Form.Item>
                                            </div>
                                        </div>

                                        <div className="classic-form-row">
                                            <div className="classic-form-field">
                                                <Form.Item
                                                    name="enquiryLabel"
                                                    label="Label"
                                                    style={{ marginBottom: '0' }}
                                                    className="classic-label"
                                                >
                                                    <Input
                                                        defaultValue="Enquiry"
                                                        className="classic-input"
                                                    />
                                                </Form.Item>
                                            </div>
                                            <div className="classic-form-field">
                                                <Form.Item
                                                    name="enquiryNumber"
                                                    label="Contact Number"
                                                    style={{ marginBottom: '0' }}
                                                    className="classic-label"
                                                >
                                                    <Input
                                                        defaultValue="0000000000"
                                                        placeholder="Write mobile number with country code ex: 91XXXXXXXXXX"
                                                        className="classic-input"
                                                    />
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </Form>
                                </div>

                                {/* Email Addresses Section */}
                                <div className="classic-section">
                                    <Typography.Title level={5} className="classic-section-title" style={{ marginBottom: '16px' }}>
                                        Email Addresses
                                    </Typography.Title>

                                    <Form form={form} layout="vertical">
                                        <div className="classic-form-row">
                                            <div className="classic-form-field">
                                                <Form.Item
                                                    name="contactLabel"
                                                    label="Label"
                                                    style={{ marginBottom: '0' }}
                                                    className="classic-label"
                                                >
                                                    <Input
                                                        defaultValue="Contact"
                                                        className="classic-input"
                                                    />
                                                </Form.Item>
                                            </div>
                                            <div className="classic-form-field">
                                                <Form.Item
                                                    name="contactEmail"
                                                    label="Email"
                                                    style={{ marginBottom: '0' }}
                                                    className="classic-label"
                                                >
                                                    <Input
                                                        defaultValue="contact@example.com"
                                                        className="classic-input"
                                                    />
                                                </Form.Item>
                                            </div>
                                        </div>

                                        <div className="classic-form-row">
                                            <div className="classic-form-field">
                                                <Form.Item
                                                    name="supportLabel"
                                                    label="Label"
                                                    style={{ marginBottom: '0' }}
                                                    className="classic-label"
                                                >
                                                    <Input
                                                        defaultValue="Support"
                                                        className="classic-input"
                                                    />
                                                </Form.Item>
                                            </div>
                                            <div className="classic-form-field">
                                                <Form.Item
                                                    name="supportEmail"
                                                    label="Email"
                                                    style={{ marginBottom: '0' }}
                                                    className="classic-label"
                                                >
                                                    <Input
                                                        defaultValue="support@example.co.in"
                                                        className="classic-input"
                                                    />
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        )}

                        {selectedMenu === 'social' && (
                            <div className="classic-container">
                                <div className="classic-section">
                                    <Typography.Title level={5} className="classic-section-title" style={{ marginBottom: '16px' }}>
                                        Follow us on / Social media links
                                    </Typography.Title>

                                    <Form form={form} layout="vertical">
                                        <div className="classic-social-group">
                                            <div className="classic-social-icon">
                                                <span>f</span>
                                            </div>
                                            <div className="classic-social-input">
                                                <Form.Item
                                                    name="facebookUrl"
                                                    label="Facebook"
                                                    className="classic-label"
                                                >
                                                    <Input
                                                        placeholder="https://facebook.com/yourpage"
                                                        className="classic-input"
                                                    />
                                                </Form.Item>
                                            </div>
                                        </div>

                                        <div className="classic-social-group">
                                            <div className="classic-social-icon">
                                                <span>𝕏</span>
                                            </div>
                                            <div className="classic-social-input">
                                                <Form.Item
                                                    name="twitterUrl"
                                                    label="Twitter"
                                                    className="classic-label"
                                                >
                                                    <Input
                                                        placeholder="https://twitter.com/yourhandle"
                                                        className="classic-input"
                                                    />
                                                </Form.Item>
                                            </div>
                                        </div>

                                        <div className="classic-social-group">
                                            <div className="classic-social-icon">
                                                <span>▶</span>
                                            </div>
                                            <div className="classic-social-input">
                                                <Form.Item
                                                    name="youtubeUrl"
                                                    label="YouTube"
                                                    className="classic-label"
                                                >
                                                    <Input
                                                        placeholder="https://youtube.com/yourchannel"
                                                        className="classic-input"
                                                    />
                                                </Form.Item>
                                            </div>
                                        </div>

                                        <div className="classic-social-group">
                                            <div className="classic-social-icon">
                                                <span>📷</span>
                                            </div>
                                            <div className="classic-social-input">
                                                <Form.Item
                                                    name="instagramUrl"
                                                    label="Instagram"
                                                    className="classic-label"
                                                >
                                                    <Input
                                                        placeholder="https://instagram.com/yourprofile"
                                                        className="classic-input"
                                                    />
                                                </Form.Item>
                                            </div>
                                        </div>

                                        <div className="classic-social-group">
                                            <div className="classic-social-icon">
                                                <span>in</span>
                                            </div>
                                            <div className="classic-social-input">
                                                <Form.Item
                                                    name="linkedinUrl"
                                                    label="LinkedIn"
                                                    className="classic-label"
                                                >
                                                    <Input
                                                        placeholder="https://linkedin.com/company/yourcompany"
                                                        className="classic-input"
                                                    />
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        )}

                        {selectedMenu === 'chat' && (
                            <div className="classic-container">
                                <div className="classic-section">
                                    <Typography.Title level={5} className="classic-section-title" style={{ marginBottom: '16px' }}>
                                        Choose chat widget:
                                    </Typography.Title>

                                    <Form form={form} layout="vertical">
                                        <Form.Item
                                            name="chatWidgetType"
                                            label="Chat Widget Type"
                                            className="classic-label"
                                            style={{ marginBottom: '24px' }}
                                        >
                                            <Input
                                                defaultValue="In app chat"
                                                className="classic-input"
                                            />
                                        </Form.Item>

                                        <Typography.Title level={5} className="classic-section-title" style={{ marginBottom: '16px' }}>
                                            Contact us
                                        </Typography.Title>

                                        <div className="classic-form-row">
                                            <div className="classic-form-field">
                                                <Form.Item
                                                    name="mobileNumber1"
                                                    label="Mobile number 1"
                                                    style={{ marginBottom: '0' }}
                                                    className="classic-label"
                                                >
                                                    <Input
                                                        placeholder="Enter mobile number 1"
                                                        className="classic-input"
                                                    />
                                                </Form.Item>
                                            </div>
                                            <div className="classic-form-field">
                                                <Form.Item
                                                    name="mobileNumber2"
                                                    label="Mobile number 2"
                                                    style={{ marginBottom: '0' }}
                                                    className="classic-label"
                                                >
                                                    <Input
                                                        placeholder="Enter mobile number 2"
                                                        className="classic-input"
                                                    />
                                                </Form.Item>
                                            </div>
                                        </div>

                                        <div className="classic-form-row">
                                            <div className="classic-form-field">
                                                <Form.Item
                                                    name="emailId1"
                                                    label="Email id 1"
                                                    style={{ marginBottom: '0' }}
                                                    className="classic-label"
                                                >
                                                    <Input
                                                        placeholder="Enter email id 1"
                                                        className="classic-input"
                                                    />
                                                </Form.Item>
                                            </div>
                                            <div className="classic-form-field">
                                                <Form.Item
                                                    name="emailId2"
                                                    label="Email id 2"
                                                    style={{ marginBottom: '0' }}
                                                    className="classic-label"
                                                >
                                                    <Input
                                                        placeholder="Enter email id 2"
                                                        className="classic-input"
                                                    />
                                                </Form.Item>
                                            </div>
                                        </div>

                                        <Typography.Title level={5} className="classic-section-title" style={{ marginBottom: '16px', marginTop: '24px' }}>
                                            Chat with us
                                        </Typography.Title>

                                        <div className="classic-form-row">
                                            <div className="classic-form-field">
                                                <Form.Item
                                                    name="whatsappNumber1"
                                                    label="Whatsapp number 1"
                                                    style={{ marginBottom: '0' }}
                                                    className="classic-label"
                                                >
                                                    <Input
                                                        placeholder="Enter WhatsApp number 1"
                                                        className="classic-input"
                                                    />
                                                </Form.Item>
                                            </div>
                                            <div className="classic-form-field">
                                                <Form.Item
                                                    name="whatsappNumber2"
                                                    label="Whatsapp number 2"
                                                    style={{ marginBottom: '0' }}
                                                    className="classic-label"
                                                >
                                                    <Input
                                                        placeholder="Enter WhatsApp number 2"
                                                        className="classic-input"
                                                    />
                                                </Form.Item>
                                            </div>
                                        </div>

                                        <div className="classic-form-row">
                                            <div className="classic-form-field">
                                                <Form.Item
                                                    name="facebookMessenger"
                                                    label="Facebook messenger link"
                                                    style={{ marginBottom: '0' }}
                                                    className="classic-label"
                                                >
                                                    <Input
                                                        placeholder="Enter Facebook Messenger link"
                                                        className="classic-input"
                                                    />
                                                </Form.Item>
                                            </div>
                                            <div className="classic-form-field">
                                                <Form.Item
                                                    name="telegram"
                                                    label="Telegram"
                                                    style={{ marginBottom: '0' }}
                                                    className="classic-label"
                                                >
                                                    <Input
                                                        placeholder="Enter Telegram link"
                                                        className="classic-input"
                                                    />
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        )}

                        {selectedMenu === 'statistics' && (
                            <div className="classic-container">
                                <div className="classic-section">
                                    <Typography.Title level={5} className="classic-section-title" style={{ marginBottom: '16px' }}>
                                        Statistics
                                    </Typography.Title>

                                    <Form form={form} layout="vertical">
                                        <Form.Item
                                            name="tagline"
                                            label="Tagline"
                                            className="classic-label"
                                            style={{ marginBottom: '16px' }}
                                        >
                                            <Input
                                                placeholder="Enter your tagline"
                                                className="classic-input"
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            name="description"
                                            label="Description"
                                            className="classic-label"
                                            style={{ marginBottom: '24px' }}
                                        >
                                            <Input.TextArea
                                                placeholder="Enter your description"
                                                className="classic-input"
                                                rows={3}
                                            />
                                        </Form.Item>

                                        <Typography.Title level={5} className="classic-section-title" style={{ marginBottom: '16px' }}>
                                            Stats
                                        </Typography.Title>

                                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                            <div className="classic-form-row" key={num} style={{ marginBottom: '16px' }}>
                                                <div className="classic-form-field">
                                                    <Form.Item
                                                        name={`stats${num}`}
                                                        label={`Stats ${num}`}
                                                        style={{ marginBottom: '0' }}
                                                        className="classic-label"
                                                    >
                                                        <Input
                                                            placeholder={`Enter stats ${num}`}
                                                            className="classic-input"
                                                        />
                                                    </Form.Item>
                                                </div>
                                                <div className="classic-form-field">
                                                    <Form.Item
                                                        name={`title${num}`}
                                                        label={`Title ${num}`}
                                                        style={{ marginBottom: '0' }}
                                                        className="classic-label"
                                                    >
                                                        <Input
                                                            placeholder={`Enter title ${num}`}
                                                            className="classic-input"
                                                        />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        ))}
                                    </Form>
                                </div>
                            </div>
                        )}

                        {selectedMenu === 'faq' && (
                            <div className="classic-container">
                                <div className="classic-section">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                        <Typography.Title level={5} className="classic-section-title" style={{ marginBottom: '0' }}>
                                            Add Frequently asked questions by your customer
                                        </Typography.Title>
                                        <Button
                                            type="primary"
                                            icon={<PlusOutlined />}
                                            onClick={addFaqItem}
                                            className="classic-button"
                                        >
                                            Add Question
                                        </Button>
                                    </div>

                                    {faqItems.map((item, index) => (
                                        <div key={item.id} style={{ marginBottom: '16px', padding: '16px', background: '#ffffff', border: '1px solid #e0e0e0', borderRadius: '4px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                                <Typography.Text strong style={{ color: '#2c3e50', fontSize: '14px' }}>
                                                    Question {index + 1}
                                                </Typography.Text>
                                                {faqItems.length > 1 && (
                                                    <Button
                                                        type="text"
                                                        danger
                                                        icon={<DeleteOutlined />}
                                                        onClick={() => deleteFaqItem(item.id)}
                                                        style={{ padding: '4px 8px', height: 'auto' }}
                                                    />
                                                )}
                                            </div>

                                            <div className="classic-form-row">
                                                <div className="classic-form-field">
                                                    <label className="classic-label">Question:</label>
                                                    <Input
                                                        value={item.question}
                                                        onChange={(e) => updateFaqItem(item.id, 'question', e.target.value)}
                                                        placeholder="Enter your question"
                                                        className="classic-input"
                                                        style={{ marginTop: '6px' }}
                                                    />
                                                </div>

                                                <div className="classic-form-field">
                                                    <label className="classic-label">Answer:</label>
                                                    <Input.TextArea
                                                        value={item.answer}
                                                        onChange={(e) => updateFaqItem(item.id, 'answer', e.target.value)}
                                                        placeholder="Enter your answer"
                                                        className="classic-input"
                                                        rows={3}
                                                        style={{ marginTop: '6px' }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {faqItems.length === 0 && (
                                        <div style={{ textAlign: 'center', padding: '40px', color: '#7f8c8d' }}>
                                            <Typography.Text>No FAQ items added yet. Click "Add Question" to get started.</Typography.Text>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {selectedMenu === 'integration' && (
                            <div className="classic-container">
                                <div className="classic-section">
                                    <Typography.Title level={5} className="classic-section-title" style={{ marginBottom: '16px' }}>
                                        Google Analytics
                                    </Typography.Title>

                                    <Form form={form} layout="vertical">
                                        <Form.Item
                                            name="googleAnalytics"
                                            label="Google Analytics"
                                            className="classic-label"
                                            style={{ marginBottom: '16px' }}
                                        >
                                            <Input
                                                placeholder="Enter Google Analytics tracking ID"
                                                className="classic-input"
                                            />
                                        </Form.Item>
                                    </Form>
                                </div>

                                <div className="classic-section">
                                    <Typography.Title level={5} className="classic-section-title" style={{ marginBottom: '16px' }}>
                                        Facebook Pixel
                                    </Typography.Title>

                                    <Form form={form} layout="vertical">
                                        <Form.Item
                                            name="facebookPixel"
                                            label="Facebook Pixel"
                                            className="classic-label"
                                            style={{ marginBottom: '16px' }}
                                        >
                                            <Input
                                                placeholder="Enter Facebook Pixel ID"
                                                className="classic-input"
                                            />
                                        </Form.Item>
                                    </Form>
                                </div>

                                <div className="classic-section">
                                    <Typography.Title level={5} className="classic-section-title" style={{ marginBottom: '16px' }}>
                                        Custom Javascript
                                    </Typography.Title>

                                    <Form form={form} layout="vertical">
                                        <Form.Item
                                            name="customJavascript"
                                            label={
                                                <Space>
                                                    <span className="classic-label">Custom Javascript</span>
                                                    <InfoCircleOutlined style={{ color: '#3498db' }} />
                                                </Space>
                                            }
                                            className="classic-label"
                                            style={{ marginBottom: '16px' }}
                                        >
                                            <Input.TextArea
                                                placeholder="Enter custom JavaScript code"
                                                className="classic-input"
                                                rows={6}
                                                style={{ fontFamily: 'monospace' }}
                                            />
                                        </Form.Item>

                                        <div className="classic-description">
                                            Add custom JavaScript code that will be executed on all pages. Use with caution.
                                        </div>
                                    </Form>
                                </div>

                                <div className="classic-section">
                                    <Typography.Title level={5} className="classic-section-title" style={{ marginBottom: '16px' }}>
                                        Custom Css
                                    </Typography.Title>

                                    <Form form={form} layout="vertical">
                                        <Form.Item
                                            name="customCss"
                                            label={
                                                <Space>
                                                    <span className="classic-label">Custom Css</span>
                                                    <InfoCircleOutlined style={{ color: '#3498db' }} />
                                                </Space>
                                            }
                                            className="classic-label"
                                            style={{ marginBottom: '16px' }}
                                        >
                                            <Input.TextArea
                                                placeholder="Enter custom CSS code"
                                                className="classic-input"
                                                rows={6}
                                                style={{ fontFamily: 'monospace' }}
                                            />
                                        </Form.Item>

                                        <div className="classic-description">
                                            Add custom CSS styles that will be applied to all pages.
                                        </div>
                                    </Form>
                                </div>

                                <div className="classic-section">
                                    <Typography.Title level={5} className="classic-section-title" style={{ marginBottom: '16px' }}>
                                        Meta Tags
                                    </Typography.Title>

                                    <Form form={form} layout="vertical">
                                        <Form.Item
                                            name="metaTags"
                                            label="Meta Tags"
                                            className="classic-label"
                                            style={{ marginBottom: '16px' }}
                                        >
                                            <Input.TextArea
                                                placeholder="Enter meta tags (one per line or comma-separated)"
                                                className="classic-input"
                                                rows={4}
                                            />
                                        </Form.Item>

                                        <div className="classic-description">
                                            Add meta tags for SEO and social media sharing. Example: &lt;meta name=&quot;description&quot; content=&quot;Your site description&quot;&gt;
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        )}

                        {selectedMenu === 'buttons' && (
                            <div className="classic-container">
                                <div className="classic-section">
                                    <div className="classic-form-row">
                                        <div className="classic-form-field">
                                            <Typography.Title level={5} className="classic-section-title" style={{ marginBottom: '16px' }}>
                                                Navbar button
                                            </Typography.Title>
                                            <Form form={form} layout="vertical">
                                                <Form.Item
                                                    name="navbarButtonTitle"
                                                    label="Button text:"
                                                    className="classic-label"
                                                    style={{ marginBottom: '16px' }}
                                                >
                                                    <Input
                                                        placeholder="Enter navbar button title"
                                                        className="classic-input"
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    name="navbarButtonLink"
                                                    label="Button link:"
                                                    className="classic-label"
                                                    style={{ marginBottom: '16px' }}
                                                >
                                                    <Input
                                                        placeholder="Enter navbar button link"
                                                        className="classic-input"
                                                    />
                                                </Form.Item>
                                            </Form>
                                        </div>
                                        <div className="classic-form-field">
                                            <Typography.Title level={5} className="classic-section-title" style={{ marginBottom: '16px' }}>
                                                Hero button
                                            </Typography.Title>
                                            <Form form={form} layout="vertical">
                                                <Form.Item
                                                    name="heroButtonTitle"
                                                    label="Button text:"
                                                    className="classic-label"
                                                    style={{ marginBottom: '16px' }}
                                                >
                                                    <Input
                                                        placeholder="Enter hero button title"
                                                        className="classic-input"
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    name="heroButtonLink"
                                                    label="Button link:"
                                                    className="classic-label"
                                                    style={{ marginBottom: '16px' }}
                                                >
                                                    <Input
                                                        placeholder="Enter hero button link"
                                                        className="classic-input"
                                                    />
                                                </Form.Item>
                                            </Form>
                                        </div>
                                    </div>
                                    <div className="classic-form-row">
                                        <div className="classic-form-field">
                                            <Typography.Title level={5} className="classic-section-title" style={{ marginBottom: '16px' }}>
                                                Industry button
                                            </Typography.Title>
                                            <Form form={form} layout="vertical">
                                                <Form.Item
                                                    name="industryButtonTitle"
                                                    label="Button text:"
                                                    className="classic-label"
                                                    style={{ marginBottom: '16px' }}
                                                >
                                                    <Input
                                                        placeholder="Enter industry button title"
                                                        className="classic-input"
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    name="industryButtonLink"
                                                    label="Button link:"
                                                    className="classic-label"
                                                    style={{ marginBottom: '16px' }}
                                                >
                                                    <Input
                                                        placeholder="Enter industry button link"
                                                        className="classic-input"
                                                    />
                                                </Form.Item>
                                            </Form>
                                        </div>
                                        <div className="classic-form-field">
                                            <Typography.Title level={5} className="classic-section-title" style={{ marginBottom: '16px' }}>
                                                Call to action(CTA) button
                                            </Typography.Title>
                                            <Form form={form} layout="vertical">
                                                <Form.Item
                                                    name="ctaButtonTitle"
                                                    label="Button text:"
                                                    className="classic-label"
                                                    style={{ marginBottom: '16px' }}
                                                >
                                                    <Input
                                                        placeholder="Enter CTA button title"
                                                        className="classic-input"
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    name="ctaButtonLink"
                                                    label="Button link:"
                                                    className="classic-label"
                                                    style={{ marginBottom: '16px' }}
                                                >
                                                    <Input
                                                        placeholder="Enter CTA button link"
                                                        className="classic-input"
                                                    />
                                                </Form.Item>
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Save Button */}
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
                            <Button
                                type="primary"
                                icon={<SaveOutlined />}
                                onClick={handleSave}
                                className="classic-button"
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </Content>
            </Layout>

            {/* Classic Notification */}
            {showNotification && (
                <div className={`classic-notification ${notificationType === 'error' ? 'error' : ''}`}>
                    <div className="classic-notification-title">
                        {notificationType === 'success' ? 'Success' : 'Error'}
                    </div>
                    <div className="classic-notification-message">
                        {notificationMessage}
                    </div>
                </div>
            )}
        </>
    );
};

export default SiteDetails;