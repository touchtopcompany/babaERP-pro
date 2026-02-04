import React, { useState } from "react";
import {
    Card,
    Row,
    Col,
    Typography,
    Button,
    Space,
    message,
    DatePicker,
    Select,
    Divider,
} from "antd";
import {
    FileTextOutlined,
    EyeOutlined,
    BarChartOutlined,
    AccountBookOutlined,
    DollarOutlined,
    WalletOutlined,
    ArrowLeftOutlined,
} from "@ant-design/icons";
import useTheme from "@/theme/useTheme";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

interface ReportCard {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
}

const Reports: React.FC = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [currentView, setCurrentView] = useState<string | null>(null);
    const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
        dayjs().startOf('year'),
        dayjs().endOf('year')
    ]);

    const reportCards: ReportCard[] = [
        {
            id: "trial-balance",
            title: "Trial Balance",
            description: "View the trial balance report showing all account balances",
            icon: <BarChartOutlined />,
            color: "#1890ff",
        },
        {
            id: "ledger-report",
            title: "Ledger Report",
            description: "Generate detailed ledger reports for all accounts",
            icon: <AccountBookOutlined />,
            color: "#52c41a",
        },
        {
            id: "balance-sheet",
            title: "Balance Sheet",
            description: "View the balance sheet showing assets, liabilities, and equity",
            icon: <FileTextOutlined />,
            color: "#722ed1",
        },
        {
            id: "ar-ageing-summary",
            title: "Account Receivable Ageing Report (Summary)",
            description: "View summary of accounts receivable by age periods",
            icon: <DollarOutlined />,
            color: "#fa8c16",
        },
        {
            id: "ap-ageing-summary",
            title: "Account Payable Ageing Report (Summary)",
            description: "View summary of accounts payable by age periods",
            icon: <WalletOutlined />,
            color: "#eb2f96",
        },
        {
            id: "ar-ageing-details",
            title: "Account Receivable Ageing Details (Details)",
            description: "View detailed accounts receivable ageing information",
            icon: <DollarOutlined />,
            color: "#13c2c2",
        },
        {
            id: "ap-ageing-details",
            title: "Account Payable Ageing Details (Details)",
            description: "View detailed accounts payable ageing information",
            icon: <WalletOutlined />,
            color: "#f5222d",
        },
    ];

    const handleViewReport = (reportId: string) => {
        console.log(`Viewing report: ${reportId}`);
        if (reportId === "trial-balance") {
            setCurrentView("trial-balance");
        } else {
            // For now, show a styled message. Individual report pages can be created later.
            const reportTitle = reportCards.find(card => card.id === reportId)?.title;
            message.info(`${reportTitle} report will be viewed soon.`);
            // Navigate to specific report pages (when they are created)
            // navigate(`/accounting/reports/${reportId}`);
        }
    };

    const handleBackToReports = () => {
        setCurrentView(null);
    };

    const predefinedRanges = [
        { label: "This Year", value: "thisYear" },
        { label: "This Quarter", value: "thisQuarter" },
        { label: "This Month", value: "thisMonth" },
        { label: "Last Year", value: "lastYear" },
        { label: "Last Quarter", value: "lastQuarter" },
        { label: "Last Month", value: "lastMonth" },
    ];

    const handlePredefinedRangeChange = (value: string) => {
        const now = dayjs();
        let start: dayjs.Dayjs;
        let end: dayjs.Dayjs;

        switch (value) {
            case "thisYear":
                start = now.startOf('year');
                end = now.endOf('year');
                break;
            case "thisQuarter":
                start = now.startOf('month').subtract(now.month() % 3, 'month');
                end = start.add(3, 'month').subtract(1, 'day').endOf('day');
                break;
            case "thisMonth":
                start = now.startOf('month');
                end = now.endOf('month');
                break;
            case "lastYear":
                start = now.subtract(1, 'year').startOf('year');
                end = now.subtract(1, 'year').endOf('year');
                break;
            case "lastQuarter":
                const lastQuarterStart = now.startOf('month').subtract(now.month() % 3 + 3, 'month');
                start = lastQuarterStart;
                end = lastQuarterStart.add(3, 'month').subtract(1, 'day').endOf('day');
                break;
            case "lastMonth":
                start = now.subtract(1, 'month').startOf('month');
                end = now.subtract(1, 'month').endOf('month');
                break;
            default:
                start = now.startOf('year');
                end = now.endOf('year');
        }

        setDateRange([start, end]);
    };

    const TrialBalanceView = () => {
        const formatDate = (date: dayjs.Dayjs) => date.format('DD-MM-YYYY');

        return (
            <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
                {/* Header Section */}
                <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                            <Button
                                icon={<ArrowLeftOutlined />}
                                onClick={handleBackToReports}
                                style={{
                                    background: isDark ? "rgba(255,255,255,0.1)" : "#f0f0f0",
                                    border: isDark ? "1px solid rgba(255,255,255,0.2)" : "1px solid #d9d9d9",
                                    color: isDark ? "#fff" : "#1f1f1f",
                                }}
                            >
                                Back to Reports
                            </Button>
                            <Title
                                level={2}
                                style={{
                                    margin: 0,
                                    color: isDark ? "#fff" : "#1f1f1f",
                                    fontWeight: 600,
                                }}
                            >
                                Trial Balance
                            </Title>
                        </div>
                    </Col>
                </Row>

                <Row gutter={[24, 24]}>
                    {/* Left Sidebar - Date Range */}
                    <Col xs={24} sm={24} md={8} lg={6}>
                        <Card
                            style={{
                                background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                                border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
                                borderRadius: "8px",
                            }}
                        >
                            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                                <Title level={5} style={{ margin: 0, color: isDark ? "#fff" : "#1f1f1f" }}>
                                    Date Range
                                </Title>

                                <RangePicker
                                    value={dateRange}
                                    onChange={(dates) => {
                                        if (dates && dates[0] && dates[1]) {
                                            setDateRange([dates[0], dates[1]]);
                                        }
                                    }}
                                    format="DD-MM-YYYY"
                                    style={{ width: "100%" }}
                                />

                                <Divider style={{ margin: "12px 0", borderColor: isDark ? "rgba(255,255,255,0.1)" : "#f0f0f0" }} />

                                <div>
                                    <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", fontSize: "12px", display: "block", marginBottom: "8px" }}>
                                        PREDEFINED RANGES
                                    </Text>
                                    <Select
                                        value="thisYear"
                                        onChange={handlePredefinedRangeChange}
                                        style={{ width: "100%" }}
                                        size="small"
                                    >
                                        {predefinedRanges.map((range) => (
                                            <Select.Option key={range.value} value={range.value}>
                                                {range.label}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </div>
                            </Space>
                        </Card>
                    </Col>

                    {/* Main Content - Trial Balance Report */}
                    <Col xs={24} sm={24} md={16} lg={18}>
                        <Card
                            style={{
                                background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                                border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
                                borderRadius: "8px",
                            }}
                        >
                            <Space direction="vertical" size="large" style={{ width: "100%" }}>
                                {/* Report Header */}
                                <div style={{ textAlign: "center" }}>
                                    <Title level={3} style={{ margin: 0, color: isDark ? "#fff" : "#1f1f1f" }}>
                                        Trial Balance
                                    </Title>
                                    <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c" }}>
                                        {formatDate(dateRange[0])} - {formatDate(dateRange[1])}
                                    </Text>
                                </div>

                                <Divider style={{ margin: "16px 0", borderColor: isDark ? "rgba(255,255,255,0.1)" : "#f0f0f0" }} />

                                {/* Trial Balance Table */}
                                <div style={{ overflowX: "auto" }}>
                                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                        <thead>
                                            <tr>
                                                <th style={{
                                                    padding: "12px",
                                                    textAlign: "left",
                                                    borderBottom: `2px solid ${isDark ? "rgba(255,255,255,0.1)" : "#f0f0f0"}`,
                                                    color: isDark ? "#fff" : "#1f1f1f",
                                                    fontWeight: 600
                                                }}>
                                                    Account
                                                </th>
                                                <th style={{
                                                    padding: "12px",
                                                    textAlign: "right",
                                                    borderBottom: `2px solid ${isDark ? "rgba(255,255,255,0.1)" : "#f0f0f0"}`,
                                                    color: isDark ? "#fff" : "#1f1f1f",
                                                    fontWeight: 600,
                                                    width: "150px"
                                                }}>
                                                    Debit
                                                </th>
                                                <th style={{
                                                    padding: "12px",
                                                    textAlign: "right",
                                                    borderBottom: `2px solid ${isDark ? "rgba(255,255,255,0.1)" : "#f0f0f0"}`,
                                                    color: isDark ? "#fff" : "#1f1f1f",
                                                    fontWeight: 600,
                                                    width: "150px"
                                                }}>
                                                    Credit
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td style={{
                                                    padding: "12px",
                                                    borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                    color: isDark ? "#fff" : "#1f1f1f",
                                                    fontWeight: 600
                                                }}>
                                                    Total
                                                </td>
                                                <td style={{
                                                    padding: "12px",
                                                    textAlign: "right",
                                                    borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                    color: isDark ? "#fff" : "#1f1f1f"
                                                }}>
                                                    TSh 0
                                                </td>
                                                <td style={{
                                                    padding: "12px",
                                                    textAlign: "right",
                                                    borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                    color: isDark ? "#fff" : "#1f1f1f"
                                                }}>
                                                    TSh 0
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </Space>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    };

    return (
        <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
            {currentView === "trial-balance" ? (
                <TrialBalanceView />
            ) : (
                <>
                    {/* Header Section */}
                    <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
                        <Col xs={24} sm={24} md={24} lg={24}>
                            <Title
                                level={2}
                                style={{
                                    margin: 0,
                                    color: isDark ? "#fff" : "#1f1f1f",
                                    fontWeight: 600,
                                }}
                            >
                                Reports
                            </Title>
                        </Col>
                    </Row>

                    {/* Report Cards Grid */}
                    <Row gutter={[16, 16]}>
                        {reportCards.map((report) => (
                            <Col xs={24} sm={24} md={12} lg={8} xl={8} key={report.id}>
                                <Card
                                    hoverable
                                    style={{
                                        height: "100%",
                                        background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                                        border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
                                        borderRadius: "8px",
                                        transition: "all 0.3s ease",
                                    }}
                                    bodyStyle={{
                                        padding: "24px",
                                        display: "flex",
                                        flexDirection: "column",
                                        height: "100%",
                                    }}
                                    onClick={() => handleViewReport(report.id)}
                                >
                                    <Space direction="vertical" size="middle" style={{ width: "100%", flex: 1 }}>
                                        {/* Icon */}
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                width: "48px",
                                                height: "48px",
                                                borderRadius: "8px",
                                                background: `${report.color}15`,
                                                color: report.color,
                                                fontSize: "20px",
                                            }}
                                        >
                                            {report.icon}
                                        </div>

                                        {/* Content */}
                                        <div style={{ flex: 1 }}>
                                            <Title
                                                level={4}
                                                style={{
                                                    margin: "0 0 8px 0",
                                                    color: isDark ? "#fff" : "#1f1f1f",
                                                    fontWeight: 600,
                                                    fontSize: "16px",
                                                    lineHeight: "1.4",
                                                }}
                                            >
                                                {report.title}
                                            </Title>
                                            <Text
                                                style={{
                                                    color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
                                                    fontSize: "14px",
                                                    lineHeight: "1.5",
                                                }}
                                            >
                                                {report.description}
                                            </Text>
                                        </div>

                                        {/* Action Button */}
                                        <Button
                                            type="primary"
                                            size="small"
                                            icon={<EyeOutlined />}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleViewReport(report.id);
                                            }}
                                            style={{
                                                background: report.color,
                                                borderColor: report.color,
                                                borderRadius: "6px",
                                                fontWeight: 500,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            View Report
                                        </Button>
                                    </Space>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </>
            )}
        </div>
    );
};

export default Reports;