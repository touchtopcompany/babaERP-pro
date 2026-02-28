import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Card,
    Button,
    Row,
    Col,
    DatePicker,
    Typography,
    Statistic,
    Dropdown,
    Menu,
} from "antd";
import {
    PrinterOutlined,
    FileTextOutlined,
    BarChartOutlined,
    FilterOutlined,
    DownOutlined,
} from "@ant-design/icons";

import { Dayjs } from "dayjs";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const ManufacturingReport: React.FC = () => {
    const navigate = useNavigate();
    const [selectedLocation, setSelectedLocation] = useState("all");
    const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);

    const locations = [
        { key: "all", label: "All locations" },
        { key: "warehouse1", label: "Warehouse 1" },
        { key: "warehouse2", label: "Warehouse 2" },
        { key: "factory", label: "Main Factory" },
    ];

    const locationMenu = (
        <Menu
            items={locations.map(location => ({
                key: location.key,
                label: location.label,
                onClick: () => setSelectedLocation(location.key),
            }))}
        />
    );

    const handlePrint = () => {
        const printContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Manufacturing Report</title>
                <style>
                    body {
                        font-family: 'Times New Roman', serif;
                        margin: 20px;
                        color: #000;
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 30px;
                        border-bottom: 2px solid #000;
                        padding-bottom: 10px;
                    }
                    .title {
                        font-size: 24px;
                        font-weight: bold;
                        margin-bottom: 10px;
                    }
                    .subtitle {
                        font-size: 14px;
                        color: #666;
                    }
                    .stats-container {
                        display: flex;
                        justify-content: space-between;
                        margin: 30px 0;
                    }
                    .stat-box {
                        border: 2px solid #000;
                        padding: 20px;
                        width: 30%;
                        text-align: center;
                    }
                    .stat-title {
                        font-size: 16px;
                        font-weight: bold;
                        margin-bottom: 10px;
                        text-transform: uppercase;
                    }
                    .stat-value {
                        font-size: 20px;
                        font-weight: bold;
                    }
                    .footer {
                        margin-top: 50px;
                        text-align: center;
                        font-size: 12px;
                        color: #666;
                    }
                    @media print {
                        body { margin: 0; }
                        .no-print { display: none; }
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <div class="title">MANUFACTURING REPORT</div>
                    <div class="subtitle">Production Statistics Summary</div>
                    <div class="subtitle">${new Date().toLocaleDateString()}</div>
                </div>
                
                <div class="stats-container">
                    <div class="stat-box">
                        <div class="stat-title">Total Production</div>
                        <div class="stat-value">TSh 0.00</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-title">Total Production Cost</div>
                        <div class="stat-value">TSh 0.00</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-title">Total Sold</div>
                        <div class="stat-value">TSh 0.00</div>
                    </div>
                </div>
                
                <div class="footer">
                    <div>This is an automatically generated report</div>
                    <div>Generated on ${new Date().toLocaleString()}</div>
                </div>
            </body>
            </html>
        `;

        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(printContent);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
            printWindow.close();
        }
    };

    const handleStockReport = () => {
        navigate('/reports/stock-report');
    };

    const handleItemsReport = () => {
        navigate('/reports/items-report');
    };

    const handleApplyFilters = () => {
        console.log('Applying filters:', { selectedLocation, dateRange });
        // TODO: Implement filter logic
    };

    return (
        <div style={{ padding: "24px" }}>
            <div style={{ marginBottom: "24px", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Title level={2} style={{ margin: 0 }}>
                    Manufacturing Report
                </Title>
                <Button
                    type="primary"
                    icon={<PrinterOutlined />}
                    onClick={handlePrint}
                >
                    Print
                </Button>
            </div>

            {/* Production Statistics */}
            <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
                <Col xs={24} sm={12} md={8}>
                    <Card>
                        <Statistic
                            title="Total Production"
                            value={0}
                            precision={2}
                            prefix="TSh"
                            valueStyle={{ color: '#3f8600' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <Card>
                        <Statistic
                            title="Total Production Cost"
                            value={0}
                            precision={2}
                            prefix="TSh"
                            valueStyle={{ color: '#cf1322' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <Card>
                        <Statistic
                            title="Total Sold"
                            value={0}
                            precision={2}
                            prefix="TSh"
                            valueStyle={{ color: '#1890ff' }}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Report Actions */}
            <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
                <Col xs={24} sm={12} md={6}>
                    <Card
                        hoverable
                        onClick={handleStockReport}
                        style={{ cursor: 'pointer', textAlign: 'center' }}
                    >
                        <FileTextOutlined style={{ fontSize: '32px', color: '#1890ff', marginBottom: '16px' }} />
                        <Title level={4}>Stock Report</Title>
                        <Text type="secondary">View inventory levels</Text>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card
                        hoverable
                        onClick={handleItemsReport}
                        style={{ cursor: 'pointer', textAlign: 'center' }}
                    >
                        <BarChartOutlined style={{ fontSize: '32px', color: '#52c41a', marginBottom: '16px' }} />
                        <Title level={4}>Items Report</Title>
                        <Text type="secondary">View items statistics</Text>
                    </Card>
                </Col>
            </Row>

            {/* Filters Section */}
            <Card style={{ marginBottom: "24px" }}>
                <Row gutter={[16, 16]} align="middle">
                    <Col xs={24} sm={12} md={6}>
                        <Text strong>Location:</Text>
                        <Dropdown overlay={locationMenu} trigger={['click']}>
                            <Button style={{ width: '100%', marginTop: '8px' }}>
                                {locations.find(loc => loc.key === selectedLocation)?.label || 'All locations'}
                                <DownOutlined />
                            </Button>
                        </Dropdown>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Text strong>Filter by date:</Text>
                        <RangePicker
                            style={{ width: '100%', marginTop: '8px' }}
                            onChange={(dates) => setDateRange(dates)}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={4}>
                        <Button
                            type="primary"
                            icon={<FilterOutlined />}
                            style={{ marginTop: '32px' }}
                            block
                            onClick={handleApplyFilters}
                        >
                            Apply Filters
                        </Button>
                    </Col>
                </Row>
            </Card>

            {/* Additional Report Content */}
            <Card>
                <Title level={4}>Production Details</Title>
                <Text type="secondary">
                    No production data available for the selected criteria.
                    Please adjust your filters or check back later for updated reports.
                </Text>
            </Card>
        </div>
    );
};

export default ManufacturingReport;