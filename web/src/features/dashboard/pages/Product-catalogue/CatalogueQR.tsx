import React, { useState } from 'react';
import { Button, Select, Input, Checkbox, ColorPicker, message } from 'antd';
import { QrcodeOutlined } from '@ant-design/icons';
import useTheme from '@/theme/useTheme';
import QRCode from 'qrcode';

const { Option } = Select;

interface CatalogueQRProps {
    onGenerateQR?: (qrData: QRData) => void;
}

interface QRData {
    businessLocation: string;
    qrCodeColor: string;
    title: string;
    subtitle: string;
    showLogo: boolean;
}

const CatalogueQR: React.FC<CatalogueQRProps> = ({ onGenerateQR }) => {
    const { theme } = useTheme();
    const [businessLocation, setBusinessLocation] = useState<string>('');
    const [qrCodeColor, setQrCodeColor] = useState<string>('#000000');
    const [title, setTitle] = useState<string>('');
    const [subtitle, setSubtitle] = useState<string>('Product Catalogue');
    const [showLogo, setShowLogo] = useState<boolean>(true);
    const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

    const isDarkMode = theme === 'dark';

    const handleGenerateQR = async () => {
        if (!businessLocation) {
            message.error('Please select a business location');
            return;
        }

        if (!title.trim()) {
            message.error('Please enter a title');
            return;
        }

        const qrData: QRData = {
            businessLocation,
            qrCodeColor,
            title,
            subtitle,
            showLogo,
        };

        // Create QR code data as a JSON string with all input information
        const qrText = JSON.stringify({
            businessLocation,
            title,
            subtitle,
            showLogo,
            qrCodeColor,
            timestamp: new Date().toISOString()
        });

        try {
            // Generate QR code with custom color
            const qrDataUrl = await QRCode.toDataURL(qrText, {
                width: 200,
                margin: 2,
                color: {
                    dark: qrCodeColor,
                    light: '#FFFFFF'
                }
            });

            setQrCodeUrl(qrDataUrl);

            if (onGenerateQR) {
                onGenerateQR(qrData);
            } else {
                console.log('Generating QR with data:', qrData);
                message.success('QR Code generated successfully!');
            }
        } catch (error) {
            console.error('Error generating QR code:', error);
            message.error('Failed to generate QR code');
        }
    };

    return (
        <div className="catalogue-qr-container" style={{ maxWidth: '600px', margin: '0 auto', padding: '24px' }}>
            <div style={{ backgroundColor: isDarkMode ? '#1f1f1f' : '#f5f5f5', padding: '32px', borderRadius: '8px' }}>
                {/* Business Location Dropdown */}
                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: isDarkMode ? '#ffffff' : '#000000' }}>
                        Business Location
                    </label>
                    <Select
                        value={businessLocation}
                        onChange={setBusinessLocation}
                        placeholder="Please Select"
                        style={{ width: '100%' }}
                        size="large"
                    >
                        <Option value="nairobi">Nairobi</Option>
                        <Option value="mombasa">Mombasa</Option>
                        <Option value="kisumu">Kisumu</Option>
                        <Option value="nakuru">Nakuru</Option>
                    </Select>
                </div>

                {/* QR Code Color Picker */}
                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: isDarkMode ? '#ffffff' : '#000000' }}>
                        Qr code color
                    </label>
                    <ColorPicker
                        value={qrCodeColor}
                        onChange={(color) => setQrCodeColor(color.toHexString())}
                        showText
                        size="large"
                        style={{ width: '100%' }}
                    />
                </div>

                {/* Title Input */}
                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: isDarkMode ? '#ffffff' : '#000000' }}>
                        Title
                    </label>
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter title"
                        size="large"
                    />
                </div>

                {/* Subtitle Input */}
                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: isDarkMode ? '#ffffff' : '#000000' }}>
                        Subtitle
                    </label>
                    <Input
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        placeholder="Enter subtitle"
                        size="large"
                    />
                </div>

                {/* Show Logo Checkbox */}
                <div style={{ marginBottom: '32px' }}>
                    <Checkbox
                        checked={showLogo}
                        onChange={(e) => setShowLogo(e.target.checked)}
                        style={{ fontSize: '16px', color: isDarkMode ? '#ffffff' : '#000000' }}
                    >
                        Show business logo on qrcode
                    </Checkbox>
                </div>

                {/* Generate QR Button */}
                <Button
                    type="primary"
                    icon={<QrcodeOutlined />}
                    onClick={handleGenerateQR}
                    size="large"
                    style={{ width: '100%', height: '48px', fontSize: '16px' }}
                >
                    Generate QR Code
                </Button>
            </div>

            {/* QR Code Display */}
            {qrCodeUrl && (
                <div style={{
                    marginTop: '32px',
                    textAlign: 'center',
                    backgroundColor: isDarkMode ? '#1f1f1f' : '#ffffff',
                    padding: '24px',
                    borderRadius: '8px',
                    border: `1px solid ${isDarkMode ? '#333' : '#e0e0e0'}`
                }}>
                    <h3 style={{
                        marginBottom: '8px',
                        color: isDarkMode ? '#ffffff' : '#000000',
                        fontSize: '18px',
                        fontWeight: 'bold'
                    }}>
                        {title}
                    </h3>
                    <p style={{
                        marginBottom: '16px',
                        color: isDarkMode ? '#cccccc' : '#666',
                        fontSize: '14px'
                    }}>
                        {subtitle}
                    </p>
                    <img
                        src={qrCodeUrl}
                        alt="Generated QR Code"
                        style={{
                            maxWidth: '200px',
                            height: 'auto',
                            border: `2px solid ${isDarkMode ? '#333' : '#e0e0e0'}`,
                            borderRadius: '4px',
                            padding: '8px',
                            backgroundColor: '#ffffff'
                        }}
                    />
                    <div style={{ marginTop: '16px', fontSize: '12px', color: isDarkMode ? '#999' : '#666' }}>
                        Location: {businessLocation.charAt(0).toUpperCase() + businessLocation.slice(1)}
                    </div>
                    {showLogo && (
                        <div style={{ marginTop: '8px', fontSize: '12px', color: isDarkMode ? '#999' : '#666' }}>
                            Business logo will be displayed
                        </div>
                    )}
                </div>
            )}

            {/* Instructions */}
            <div style={{ marginTop: '32px', textAlign: 'center' }}>
                <h4 style={{ marginBottom: '16px', color: isDarkMode ? '#ffffff' : '#666' }}>Instructions:</h4>
                <div style={{ color: isDarkMode ? '#cccccc' : '#888', lineHeight: '1.8' }}>
                    <div>1. Select business location and QR code color</div>
                    <div>2. Choose title, subtitle and to show logo or not</div>
                    <div>3. Click on generate QR code</div>
                </div>
            </div>
        </div>
    );
};

export default CatalogueQR;