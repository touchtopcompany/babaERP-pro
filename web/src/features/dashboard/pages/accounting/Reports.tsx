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
    Table,
    Input,
    Dropdown,
    Tag,
} from "antd";
import {
    FileTextOutlined,
    EyeOutlined,
    BarChartOutlined,
    AccountBookOutlined,
    DollarOutlined,
    WalletOutlined,
    ArrowLeftOutlined,
    CalendarOutlined,
    DownloadOutlined,
    PrinterOutlined,
    FilterOutlined,
    SearchOutlined,
    CaretDownOutlined,
    CaretRightOutlined,
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
        } else if (reportId === "ledger-report") {
            setCurrentView("ledger-report");
        } else if (reportId === "balance-sheet") {
            setCurrentView("balance-sheet");
        } else if (reportId === "ar-ageing-summary") {
            setCurrentView("ar-ageing-summary");
        } else if (reportId === "ap-ageing-summary") {
            setCurrentView("ap-ageing-summary");
        } else if (reportId === "ar-ageing-details") {
            setCurrentView("ar-ageing-details");
        } else if (reportId === "ap-ageing-details") {
            setCurrentView("ap-ageing-details");
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

    // TrialBalance
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

    // LedgerReport
    const LedgerReportView = () => {
        const formatDate = (date: dayjs.Dayjs) => date.format('DD-MM-YYYY');
        const [selectedAccount, setSelectedAccount] = useState<string>("Accounts Payable (A/P)");
        const [searchText, setSearchText] = useState<string>("");
        const [pageSize, setPageSize] = useState<number>(25);

        const exportMenuItems = [
            { key: 'csv', label: 'Export to CSV' },
            { key: 'excel', label: 'Export to Excel' },
            { key: 'pdf', label: 'Export to PDF' },
            { key: 'print', label: 'Print' },
        ];

        const columns = [
            {
                title: 'Date',
                dataIndex: 'date',
                key: 'date',
                width: 120,
            },
            {
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
            },
            {
                title: 'Note',
                dataIndex: 'note',
                key: 'note',
            },
            {
                title: 'Added By',
                dataIndex: 'addedBy',
                key: 'addedBy',
                width: 120,
            },
            {
                title: 'Debit',
                dataIndex: 'debit',
                key: 'debit',
                width: 120,
                align: 'right' as const,
            },
            {
                title: 'Credit',
                dataIndex: 'credit',
                key: 'credit',
                width: 120,
                align: 'right' as const,
            },
            {
                title: 'Action',
                dataIndex: 'action',
                key: 'action',
                width: 80,
                align: 'center' as const,
            },
        ];

        const data = []; // Empty data as shown in the image

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
                                Ledger - Accounts Payable (A/P)
                            </Title>
                        </div>
                    </Col>
                </Row>

                <Row gutter={[24, 24]}>
                    {/* Left Sidebar - Account Details */}
                    <Col xs={24} sm={24} md={8} lg={6}>
                        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                            {/* Account Details Card */}
                            <Card
                                style={{
                                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
                                    borderRadius: "8px",
                                }}
                            >
                                <Space direction="vertical" size="small" style={{ width: "100%" }}>
                                    <Title level={5} style={{ margin: 0, color: isDark ? "#fff" : "#1f1f1f" }}>
                                        Account Details
                                    </Title>
                                    <Divider style={{ margin: "8px 0", borderColor: isDark ? "rgba(255,255,255,0.1)" : "#f0f0f0" }} />
                                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                        <div>
                                            <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", fontSize: "12px" }}>
                                                Name
                                            </Text>
                                            <div style={{ color: isDark ? "#fff" : "#1f1f1f", fontWeight: 500 }}>
                                                Accounts Payable (A/P)
                                            </div>
                                        </div>
                                        <div>
                                            <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", fontSize: "12px" }}>
                                                Account Type
                                            </Text>
                                            <div style={{ color: isDark ? "#fff" : "#1f1f1f", fontWeight: 500 }}>
                                                Liability
                                            </div>
                                        </div>
                                        <div>
                                            <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", fontSize: "12px" }}>
                                                Account Sub Type
                                            </Text>
                                            <div style={{ color: isDark ? "#fff" : "#1f1f1f", fontWeight: 500 }}>
                                                Accounts Payable (A/P)
                                            </div>
                                        </div>
                                        <div>
                                            <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", fontSize: "12px" }}>
                                                Detail Type
                                            </Text>
                                            <div style={{ color: isDark ? "#fff" : "#1f1f1f", fontWeight: 500 }}>
                                                Accounts Payable (A/P)
                                            </div>
                                        </div>
                                        <div>
                                            <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", fontSize: "12px" }}>
                                                Balance
                                            </Text>
                                            <div style={{ color: isDark ? "#fff" : "#1f1f1f", fontWeight: 600, fontSize: "16px" }}>
                                                TSh 0
                                            </div>
                                        </div>
                                    </div>
                                </Space>
                            </Card>

                            {/* Filters Card */}
                            <Card
                                style={{
                                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
                                    borderRadius: "8px",
                                }}
                            >
                                <Space direction="vertical" size="small" style={{ width: "100%" }}>
                                    <Title level={5} style={{ margin: 0, color: isDark ? "#fff" : "#1f1f1f" }}>
                                        <FilterOutlined /> Filters
                                    </Title>
                                    <Divider style={{ margin: "8px 0", borderColor: isDark ? "rgba(255,255,255,0.1)" : "#f0f0f0" }} />

                                    <div>
                                        <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", fontSize: "12px", display: "block", marginBottom: "8px" }}>
                                            Date Range
                                        </Text>
                                        <RangePicker
                                            value={dateRange}
                                            onChange={(dates) => {
                                                if (dates && dates[0] && dates[1]) {
                                                    setDateRange([dates[0], dates[1]]);
                                                }
                                            }}
                                            format="DD-MM-YYYY"
                                            style={{ width: "100%" }}
                                            suffixIcon={<CalendarOutlined />}
                                        />
                                    </div>

                                    <div style={{ marginTop: "16px" }}>
                                        <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", fontSize: "12px", display: "block", marginBottom: "8px" }}>
                                            Account
                                        </Text>
                                        <Select
                                            value={selectedAccount}
                                            onChange={setSelectedAccount}
                                            style={{ width: "100%" }}
                                        >
                                            <Select.Option value="Accounts Payable (A/P)">Accounts Payable (A/P)</Select.Option>
                                        </Select>
                                    </div>
                                </Space>
                            </Card>
                        </Space>
                    </Col>

                    {/* Main Content - Ledger Table */}
                    <Col xs={24} sm={24} md={16} lg={18}>
                        <Card
                            style={{
                                background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                                border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
                                borderRadius: "8px",
                            }}
                        >
                            <Space direction="vertical" size="large" style={{ width: "100%" }}>
                                {/* Table Controls */}
                                <Row gutter={[16, 16]} align="middle">
                                    <Col xs={24} sm={12} md={8}>
                                        <Space>
                                            <Text style={{ color: isDark ? "#fff" : "#1f1f1f" }}>Show</Text>
                                            <Select
                                                value={pageSize}
                                                onChange={setPageSize}
                                                style={{ width: 80 }}
                                            >
                                                <Select.Option value="all">all</Select.Option>
                                                <Select.Option value={25}>25</Select.Option>
                                                <Select.Option value={50}>50</Select.Option>
                                                <Select.Option value={100}>100</Select.Option>
                                            </Select>
                                            <Text style={{ color: isDark ? "#fff" : "#1f1f1f" }}>entries</Text>
                                        </Space>
                                    </Col>
                                    <Col xs={24} sm={12} md={16}>
                                        <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", flexWrap: "wrap" }}>
                                            <Dropdown
                                                menu={{ items: exportMenuItems }}
                                                trigger={['click']}
                                            >
                                                <Button icon={<DownloadOutlined />}>
                                                    Export
                                                </Button>
                                            </Dropdown>
                                            <Button icon={<PrinterOutlined />}>
                                                Print
                                            </Button>
                                            <Button icon={<FilterOutlined />}>
                                                Column visibility
                                            </Button>
                                            <Input
                                                placeholder="Search"
                                                prefix={<SearchOutlined />}
                                                value={searchText}
                                                onChange={(e) => setSearchText(e.target.value)}
                                                style={{ width: 200 }}
                                            />
                                        </div>
                                    </Col>
                                </Row>

                                {/* Table */}
                                <Table
                                    columns={columns}
                                    dataSource={data}
                                    pagination={{
                                        current: 1,
                                        pageSize: pageSize,
                                        total: 0,
                                        showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                        showSizeChanger: false,
                                        position: ["bottomCenter"],
                                    }}
                                    scroll={{ x: "max-content" }}
                                    size="small"
                                    bordered={false}
                                    locale={{
                                        emptyText: (
                                            <div style={{ padding: "40px", textAlign: "center" }}>
                                                <Text style={{ color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c" }}>
                                                    No data available in table
                                                </Text>
                                            </div>
                                        ),
                                    }}
                                    summary={() => (
                                        <Table.Summary>
                                            <Table.Summary.Row>
                                                <Table.Summary.Cell index={0} colSpan={4}>
                                                    <Text strong style={{ color: isDark ? "#fff" : "#1f1f1f" }}>
                                                        Total
                                                    </Text>
                                                </Table.Summary.Cell>
                                                <Table.Summary.Cell index={1}>
                                                    <Text strong style={{ color: isDark ? "#fff" : "#1f1f1f", textAlign: "right", display: "block" }}>
                                                        TSh 0
                                                    </Text>
                                                </Table.Summary.Cell>
                                                <Table.Summary.Cell index={2}>
                                                    <Text strong style={{ color: isDark ? "#fff" : "#1f1f1f", textAlign: "right", display: "block" }}>
                                                        TSh 0
                                                    </Text>
                                                </Table.Summary.Cell>
                                                <Table.Summary.Cell index={3}></Table.Summary.Cell>
                                            </Table.Summary.Row>
                                        </Table.Summary>
                                    )}
                                />
                            </Space>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    };

    // Balance sheet
    const BalanceSheetView = () => {
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
                                Balance Sheet
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

                    {/* Main Content - Balance Sheet Report */}
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
                                        Balance Sheet
                                    </Title>
                                    <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c" }}>
                                        Date Range: {formatDate(dateRange[0])} - {formatDate(dateRange[1])}
                                    </Text>
                                </div>

                                <Divider style={{ margin: "16px 0", borderColor: isDark ? "rgba(255,255,255,0.1)" : "#f0f0f0" }} />

                                {/* Balance Sheet Content */}
                                <Row gutter={[24, 0]}>
                                    {/* Assets Column */}
                                    <Col xs={24} md={12}>
                                        <div style={{
                                            background: isDark ? "rgba(255,255,255,0.02)" : "#fafafa",
                                            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
                                            borderRadius: "8px",
                                            padding: "16px"
                                        }}>
                                            <Title level={4} style={{ margin: "0 0 16px 0", color: isDark ? "#fff" : "#1f1f1f", textAlign: "center" }}>
                                                Assets
                                            </Title>
                                            <div style={{ textAlign: "center", padding: "40px 0" }}>
                                                <Text style={{ color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c" }}>
                                                    TSh 0
                                                </Text>
                                            </div>
                                        </div>
                                    </Col>

                                    {/* Liabilities & Owner's Capital Column */}
                                    <Col xs={24} md={12}>
                                        <div style={{
                                            background: isDark ? "rgba(255,255,255,0.02)" : "#fafafa",
                                            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
                                            borderRadius: "8px",
                                            padding: "16px"
                                        }}>
                                            <Title level={4} style={{ margin: "0 0 16px 0", color: isDark ? "#fff" : "#1f1f1f", textAlign: "center" }}>
                                                Liabilities & Owner's Capital
                                            </Title>
                                            <div style={{ textAlign: "center", padding: "40px 0" }}>
                                                <Text style={{ color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c" }}>
                                                    TSh 0
                                                </Text>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Space>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    };

    // Account Receivable Ageing Report (Summary)
    const ARAgeingSummaryView = () => {
        const formatDate = (date: dayjs.Dayjs) => date.format('DD-MM-YYYY');
        const [selectedLocation, setSelectedLocation] = useState<string>("All locations");

        const handlePrint = () => {
            message.info('Preparing report for printing...');

            // Create a new window for printing
            const printWindow = window.open('', '_blank');
            if (!printWindow) {
                message.error('Failed to open print window. Please allow popups for this site.');
                return;
            }

            // Get the current date range
            const dateRangeText = `${formatDate(dateRange[0])} - ${formatDate(dateRange[1])}`;

            // Build the HTML content for printing
            const printContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Account Receivable Ageing Report (Summary)</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 20px;
                            color: #000;
                        }
                        h1, h2, h3 {
                            text-align: center;
                            margin-bottom: 10px;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                            margin-top: 20px;
                        }
                        th, td {
                            border: 1px solid #ddd;
                            padding: 8px;
                            text-align: left;
                        }
                        th {
                            background-color: #f5f5f5;
                            font-weight: bold;
                        }
                        .text-right {
                            text-align: right;
                        }
                        .text-center {
                            text-align: center;
                        }
                        .summary-row {
                            font-weight: bold;
                            background-color: #f9f9f9;
                        }
                        @media print {
                            body { margin: 10px; }
                        }
                    </style>
                </head>
                <body>
                    <h1>Account Receivable Ageing Report (Summary)</h1>
                    <p class="text-center">${dateRangeText}</p>
                    <p class="text-center">Business Location: ${selectedLocation}</p>
                    
                    <table>
                        <thead>
                            <tr>
                                <th>Customer name</th>
                                <th class="text-right">Current</th>
                                <th class="text-right">1 to 30 days</th>
                                <th class="text-right">31 to 60 days</th>
                                <th class="text-right">61 to 90 days</th>
                                <th class="text-right">91 days and over</th>
                                <th class="text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.map(row => `
                                <tr>
                                    <td>${row.customerName}</td>
                                    <td class="text-right">${row.current}</td>
                                    <td class="text-right">${row.oneToThirtyDays}</td>
                                    <td class="text-right">${row.thirtyOneToSixtyDays}</td>
                                    <td class="text-right">${row.sixtyOneToNinetyDays}</td>
                                    <td class="text-right">${row.ninetyOneDaysAndOver}</td>
                                    <td class="text-right">${row.total}</td>
                                </tr>
                            `).join('')}
                            <tr class="summary-row">
                                <td><strong>Total</strong></td>
                                <td class="text-right"><strong>TSh 2,650,000</strong></td>
                                <td class="text-right"><strong>TSh 1,300,000</strong></td>
                                <td class="text-right"><strong>TSh 650,000</strong></td>
                                <td class="text-right"><strong>TSh 325,000</strong></td>
                                <td class="text-right"><strong>TSh 175,000</strong></td>
                                <td class="text-right"><strong>TSh 5,300,000</strong></td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <script>
                        window.onload = function() {
                            window.print();
                            window.close();
                        }
                    </script>
                </body>
                </html>
            `;

            printWindow.document.write(printContent);
            printWindow.document.close();
        };

        const exportMenuItems = [
            { key: 'csv', label: 'Export to CSV' },
            { key: 'excel', label: 'Export to Excel' },
            { key: 'pdf', label: 'Export to PDF' },
            { key: 'print', label: 'Print' },
        ];

        const columns = [
            {
                title: 'Customer name',
                dataIndex: 'customerName',
                key: 'customerName',
                width: 200,
            },
            {
                title: 'Current',
                dataIndex: 'current',
                key: 'current',
                width: 120,
                align: 'right' as const,
            },
            {
                title: '1 to 30 days',
                dataIndex: 'oneToThirtyDays',
                key: 'oneToThirtyDays',
                width: 120,
                align: 'right' as const,
            },
            {
                title: '31 to 60 days',
                dataIndex: 'thirtyOneToSixtyDays',
                key: 'thirtyOneToSixtyDays',
                width: 120,
                align: 'right' as const,
            },
            {
                title: '61 to 90 days',
                dataIndex: 'sixtyOneToNinetyDays',
                key: 'sixtyOneToNinetyDays',
                width: 120,
                align: 'right' as const,
            },
            {
                title: '91 days and over',
                dataIndex: 'ninetyOneDaysAndOver',
                key: 'ninetyOneDaysAndOver',
                width: 140,
                align: 'right' as const,
            },
            {
                title: 'Total',
                dataIndex: 'total',
                key: 'total',
                width: 120,
                align: 'right' as const,
            },
        ];

        const data = [
            {
                key: '1',
                customerName: 'ABC Trading Ltd',
                current: 'TSh 500,000',
                oneToThirtyDays: 'TSh 300,000',
                thirtyOneToSixtyDays: 'TSh 200,000',
                sixtyOneToNinetyDays: 'TSh 100,000',
                ninetyOneDaysAndOver: 'TSh 50,000',
                total: 'TSh 1,150,000'
            },
            {
                key: '2',
                customerName: 'XYZ Corporation',
                current: 'TSh 750,000',
                oneToThirtyDays: 'TSh 0',
                thirtyOneToSixtyDays: 'TSh 150,000',
                sixtyOneToNinetyDays: 'TSh 75,000',
                ninetyOneDaysAndOver: 'TSh 25,000',
                total: 'TSh 1,000,000'
            },
            {
                key: '3',
                customerName: 'Global Imports Inc',
                current: 'TSh 200,000',
                oneToThirtyDays: 'TSh 400,000',
                thirtyOneToSixtyDays: 'TSh 300,000',
                sixtyOneToNinetyDays: 'TSh 0',
                ninetyOneDaysAndOver: 'TSh 0',
                total: 'TSh 900,000'
            },
            {
                key: '4',
                customerName: 'Local Suppliers Ltd',
                current: 'TSh 0',
                oneToThirtyDays: 'TSh 100,000',
                thirtyOneToSixtyDays: 'TSh 200,000',
                sixtyOneToNinetyDays: 'TSh 150,000',
                ninetyOneDaysAndOver: 'TSh 100,000',
                total: 'TSh 550,000'
            },
            {
                key: '5',
                customerName: 'Regional Distributors',
                current: 'TSh 1,200,000',
                oneToThirtyDays: 'TSh 500,000',
                thirtyOneToSixtyDays: 'TSh 0',
                sixtyOneToNinetyDays: 'TSh 0',
                ninetyOneDaysAndOver: 'TSh 0',
                total: 'TSh 1,700,000'
            }
        ];

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
                                Account Receivable Ageing Report (Summary)
                            </Title>
                        </div>
                    </Col>
                </Row>

                <Row gutter={[24, 24]}>
                    {/* Left Sidebar - Filters */}
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
                                    <FilterOutlined /> Filters
                                </Title>
                                <Divider style={{ margin: "12px 0", borderColor: isDark ? "rgba(255,255,255,0.1)" : "#f0f0f0" }} />

                                <div>
                                    <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", fontSize: "12px", display: "block", marginBottom: "8px" }}>
                                        Business Location
                                    </Text>
                                    <Select
                                        value={selectedLocation}
                                        onChange={setSelectedLocation}
                                        style={{ width: "100%" }}
                                    >
                                        <Select.Option value="All locations">All locations</Select.Option>
                                        <Select.Option value="Location 1">Location 1</Select.Option>
                                        <Select.Option value="Location 2">Location 2</Select.Option>
                                    </Select>
                                </div>

                                <div style={{ marginTop: "16px" }}>
                                    <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", fontSize: "12px", display: "block", marginBottom: "8px" }}>
                                        Date Range
                                    </Text>
                                    <RangePicker
                                        value={dateRange}
                                        onChange={(dates) => {
                                            if (dates && dates[0] && dates[1]) {
                                                setDateRange([dates[0], dates[1]]);
                                            }
                                        }}
                                        format="DD-MM-YYYY"
                                        style={{ width: "100%" }}
                                        suffixIcon={<CalendarOutlined />}
                                    />
                                </div>

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

                    {/* Main Content - AR Ageing Summary Table */}
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
                                        Account Receivable Ageing Report (Summary)
                                    </Title>
                                    <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c" }}>
                                        {formatDate(dateRange[0])} - {formatDate(dateRange[1])}
                                    </Text>
                                </div>

                                <Divider style={{ margin: "16px 0", borderColor: isDark ? "rgba(255,255,255,0.1)" : "#f0f0f0" }} />

                                {/* Table Controls */}
                                <Row gutter={[16, 16]} align="middle">
                                    <Col xs={24} sm={12} md={8}>
                                        <Space>
                                            <Text style={{ color: isDark ? "#fff" : "#1f1f1f" }}>Show</Text>
                                            <Select
                                                value="all"
                                                style={{ width: 80 }}
                                            >
                                                <Select.Option value="all">all</Select.Option>
                                                <Select.Option value={25}>25</Select.Option>
                                                <Select.Option value={50}>50</Select.Option>
                                                <Select.Option value={100}>100</Select.Option>
                                            </Select>
                                            <Text style={{ color: isDark ? "#fff" : "#1f1f1f" }}>entries</Text>
                                        </Space>
                                    </Col>
                                    <Col xs={24} sm={12} md={16}>
                                        <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", flexWrap: "wrap" }}>
                                            <Dropdown
                                                menu={{
                                                    items: exportMenuItems,
                                                    onClick: ({ key }) => {
                                                        switch (key) {
                                                            case 'csv':
                                                                message.info('Exporting to CSV...');
                                                                break;
                                                            case 'excel':
                                                                message.info('Exporting to Excel...');
                                                                break;
                                                            case 'pdf':
                                                                message.info('Exporting to PDF...');
                                                                break;
                                                            case 'print':
                                                                handlePrint();
                                                                break;
                                                        }
                                                    }
                                                }}
                                                trigger={['click']}
                                            >
                                                <Button icon={<DownloadOutlined />}>
                                                    Export
                                                </Button>
                                            </Dropdown>
                                            <Button icon={<PrinterOutlined />} onClick={handlePrint}>
                                                Print
                                            </Button>
                                            <Button icon={<FilterOutlined />}>
                                                Column visibility
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>

                                {/* Table */}
                                <Table
                                    columns={columns}
                                    dataSource={data}
                                    pagination={false}
                                    scroll={{ x: "max-content" }}
                                    size="small"
                                    bordered={false}
                                    locale={{
                                        emptyText: (
                                            <div style={{ padding: "40px", textAlign: "center" }}>
                                                <Text style={{ color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c" }}>
                                                    No data available in table
                                                </Text>
                                            </div>
                                        ),
                                    }}
                                    summary={() => (
                                        <Table.Summary>
                                            <Table.Summary.Row>
                                                <Table.Summary.Cell index={0}>
                                                    <Text strong style={{ color: isDark ? "#fff" : "#1f1f1f" }}>
                                                        Total
                                                    </Text>
                                                </Table.Summary.Cell>
                                                <Table.Summary.Cell index={1}>
                                                    <Text strong style={{ color: isDark ? "#fff" : "#1f1f1f", textAlign: "right", display: "block" }}>
                                                        TSh 2,650,000
                                                    </Text>
                                                </Table.Summary.Cell>
                                                <Table.Summary.Cell index={2}>
                                                    <Text strong style={{ color: isDark ? "#fff" : "#1f1f1f", textAlign: "right", display: "block" }}>
                                                        TSh 1,300,000
                                                    </Text>
                                                </Table.Summary.Cell>
                                                <Table.Summary.Cell index={3}>
                                                    <Text strong style={{ color: isDark ? "#fff" : "#1f1f1f", textAlign: "right", display: "block" }}>
                                                        TSh 650,000
                                                    </Text>
                                                </Table.Summary.Cell>
                                                <Table.Summary.Cell index={4}>
                                                    <Text strong style={{ color: isDark ? "#fff" : "#1f1f1f", textAlign: "right", display: "block" }}>
                                                        TSh 325,000
                                                    </Text>
                                                </Table.Summary.Cell>
                                                <Table.Summary.Cell index={5}>
                                                    <Text strong style={{ color: isDark ? "#fff" : "#1f1f1f", textAlign: "right", display: "block" }}>
                                                        TSh 175,000
                                                    </Text>
                                                </Table.Summary.Cell>
                                                <Table.Summary.Cell index={6}>
                                                    <Text strong style={{ color: isDark ? "#fff" : "#1f1f1f", textAlign: "right", display: "block" }}>
                                                        TSh 5,300,000
                                                    </Text>
                                                </Table.Summary.Cell>
                                            </Table.Summary.Row>
                                        </Table.Summary>
                                    )}
                                />
                            </Space>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    };

    const APAgeingSummaryView = () => {
        const formatDate = (date: dayjs.Dayjs) => date.format('DD-MM-YYYY');
        const [selectedLocation, setSelectedLocation] = useState<string>("All locations");

        const handlePrint = () => {
            message.info('Preparing report for printing...');

            // Create a new window for printing
            const printWindow = window.open('', '_blank');
            if (!printWindow) {
                message.error('Failed to open print window. Please allow popups for this site.');
                return;
            }

            // Get the current date range
            const dateRangeText = `${formatDate(dateRange[0])} - ${formatDate(dateRange[1])}`;

            // Build the HTML content for printing
            const printContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Account Payable Ageing Report (Summary)</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 20px;
                            color: #000;
                        }
                        h1, h2, h3 {
                            text-align: center;
                            margin-bottom: 10px;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                            margin-top: 20px;
                        }
                        th, td {
                            border: 1px solid #ddd;
                            padding: 8px;
                            text-align: left;
                        }
                        th {
                            background-color: #f5f5f5;
                            font-weight: bold;
                        }
                        .text-right {
                            text-align: right;
                        }
                        .text-center {
                            text-align: center;
                        }
                        .summary-row {
                            font-weight: bold;
                            background-color: #f9f9f9;
                        }
                        @media print {
                            body { margin: 10px; }
                        }
                    </style>
                </head>
                <body>
                    <h1>Account Payable Ageing Report (Summary)</h1>
                    <p class="text-center">${dateRangeText}</p>
                    <p class="text-center">Business Location: ${selectedLocation}</p>
                    
                    <table>
                        <thead>
                            <tr>
                                <th>Supplier Name</th>
                                <th class="text-right">Current</th>
                                <th class="text-right">1 to 30 days</th>
                                <th class="text-right">31 to 60 days</th>
                                <th class="text-right">61 to 90 days</th>
                                <th class="text-right">91 days and over</th>
                                <th class="text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="summary-row">
                                <td><strong>Total</strong></td>
                                <td class="text-right"><strong>TSh 0</strong></td>
                                <td class="text-right"><strong>TSh 0</strong></td>
                                <td class="text-right"><strong>TSh 0</strong></td>
                                <td class="text-right"><strong>TSh 0</strong></td>
                                <td class="text-right"><strong>TSh 0</strong></td>
                                <td class="text-right"><strong>TSh 0</strong></td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <script>
                        window.onload = function() {
                            window.print();
                            window.close();
                        }
                    </script>
                </body>
                </html>
            `;

            printWindow.document.write(printContent);
            printWindow.document.close();
        };

        const exportMenuItems = [
            { key: 'csv', label: 'Export to CSV' },
            { key: 'excel', label: 'Export to Excel' },
            { key: 'pdf', label: 'Export to PDF' },
            { key: 'print', label: 'Print' },
        ];

        const columns = [
            {
                title: 'Supplier Name',
                dataIndex: 'supplierName',
                key: 'supplierName',
                width: 200,
            },
            {
                title: 'Current',
                dataIndex: 'current',
                key: 'current',
                width: 120,
                align: 'right' as const,
            },
            {
                title: '1 to 30 days',
                dataIndex: 'oneToThirtyDays',
                key: 'oneToThirtyDays',
                width: 120,
                align: 'right' as const,
            },
            {
                title: '31 to 60 days',
                dataIndex: 'thirtyOneToSixtyDays',
                key: 'thirtyOneToSixtyDays',
                width: 120,
                align: 'right' as const,
            },
            {
                title: '61 to 90 days',
                dataIndex: 'sixtyOneToNinetyDays',
                key: 'sixtyOneToNinetyDays',
                width: 120,
                align: 'right' as const,
            },
            {
                title: '91 days and over',
                dataIndex: 'ninetyOneDaysAndOver',
                key: 'ninetyOneDaysAndOver',
                width: 140,
                align: 'right' as const,
            },
            {
                title: 'Total',
                dataIndex: 'total',
                key: 'total',
                width: 120,
                align: 'right' as const,
            },
        ];

        const data = []; // Empty data as shown in the image

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
                                Account Payable Ageing Report (Summary)
                            </Title>
                        </div>
                    </Col>
                </Row>

                <Row gutter={[24, 24]}>
                    {/* Left Sidebar - Filters */}
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
                                    <FilterOutlined /> Filters
                                </Title>
                                <Divider style={{ margin: "12px 0", borderColor: isDark ? "rgba(255,255,255,0.1)" : "#f0f0f0" }} />

                                <div>
                                    <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", fontSize: "12px", display: "block", marginBottom: "8px" }}>
                                        Business Location
                                    </Text>
                                    <Select
                                        value={selectedLocation}
                                        onChange={setSelectedLocation}
                                        style={{ width: "100%" }}
                                    >
                                        <Select.Option value="All locations">All locations</Select.Option>
                                        <Select.Option value="Location 1">Location 1</Select.Option>
                                        <Select.Option value="Location 2">Location 2</Select.Option>
                                    </Select>
                                </div>

                                <div style={{ marginTop: "16px" }}>
                                    <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", fontSize: "12px", display: "block", marginBottom: "8px" }}>
                                        Date Range
                                    </Text>
                                    <RangePicker
                                        value={dateRange}
                                        onChange={(dates) => {
                                            if (dates && dates[0] && dates[1]) {
                                                setDateRange([dates[0], dates[1]]);
                                            }
                                        }}
                                        format="DD-MM-YYYY"
                                        style={{ width: "100%" }}
                                        suffixIcon={<CalendarOutlined />}
                                    />
                                </div>

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

                    {/* Main Content - AP Ageing Summary Table */}
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
                                        Account Payable Ageing Report (Summary)
                                    </Title>
                                    <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c" }}>
                                        {formatDate(dateRange[0])} - {formatDate(dateRange[1])}
                                    </Text>
                                </div>

                                <Divider style={{ margin: "16px 0", borderColor: isDark ? "rgba(255,255,255,0.1)" : "#f0f0f0" }} />

                                {/* Table Controls */}
                                <Row gutter={[16, 16]} align="middle">
                                    <Col xs={24} sm={12} md={8}>
                                        <Space>
                                            <Text style={{ color: isDark ? "#fff" : "#1f1f1f" }}>Show</Text>
                                            <Select
                                                value="all"
                                                style={{ width: 80 }}
                                            >
                                                <Select.Option value="all">all</Select.Option>
                                                <Select.Option value={25}>25</Select.Option>
                                                <Select.Option value={50}>50</Select.Option>
                                                <Select.Option value={100}>100</Select.Option>
                                            </Select>
                                            <Text style={{ color: isDark ? "#fff" : "#1f1f1f" }}>entries</Text>
                                        </Space>
                                    </Col>
                                    <Col xs={24} sm={12} md={16}>
                                        <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", flexWrap: "wrap" }}>
                                            <Dropdown
                                                menu={{
                                                    items: exportMenuItems,
                                                    onClick: ({ key }) => {
                                                        switch (key) {
                                                            case 'csv':
                                                                message.info('Exporting to CSV...');
                                                                break;
                                                            case 'excel':
                                                                message.info('Exporting to Excel...');
                                                                break;
                                                            case 'pdf':
                                                                message.info('Exporting to PDF...');
                                                                break;
                                                            case 'print':
                                                                handlePrint();
                                                                break;
                                                        }
                                                    }
                                                }}
                                                trigger={['click']}
                                            >
                                                <Button icon={<DownloadOutlined />}>
                                                    Export
                                                </Button>
                                            </Dropdown>
                                            <Button icon={<PrinterOutlined />} onClick={handlePrint}>
                                                Print
                                            </Button>
                                            <Button icon={<FilterOutlined />}>
                                                Column visibility
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>

                                {/* Table */}
                                <Table
                                    columns={columns}
                                    dataSource={data}
                                    pagination={false}
                                    scroll={{ x: "max-content" }}
                                    size="small"
                                    bordered={false}
                                    locale={{
                                        emptyText: (
                                            <div style={{ padding: "40px", textAlign: "center" }}>
                                                <Text style={{ color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c" }}>
                                                    No data available in table
                                                </Text>
                                            </div>
                                        ),
                                    }}
                                    summary={() => (
                                        <Table.Summary>
                                            <Table.Summary.Row>
                                                <Table.Summary.Cell index={0}>
                                                    <Text strong style={{ color: isDark ? "#fff" : "#1f1f1f" }}>
                                                        Total
                                                    </Text>
                                                </Table.Summary.Cell>
                                                <Table.Summary.Cell index={1}>
                                                    <Text strong style={{ color: isDark ? "#fff" : "#1f1f1f", textAlign: "right", display: "block" }}>
                                                        TSh 0
                                                    </Text>
                                                </Table.Summary.Cell>
                                                <Table.Summary.Cell index={2}>
                                                    <Text strong style={{ color: isDark ? "#fff" : "#1f1f1f", textAlign: "right", display: "block" }}>
                                                        TSh 0
                                                    </Text>
                                                </Table.Summary.Cell>
                                                <Table.Summary.Cell index={3}>
                                                    <Text strong style={{ color: isDark ? "#fff" : "#1f1f1f", textAlign: "right", display: "block" }}>
                                                        TSh 0
                                                    </Text>
                                                </Table.Summary.Cell>
                                                <Table.Summary.Cell index={4}>
                                                    <Text strong style={{ color: isDark ? "#fff" : "#1f1f1f", textAlign: "right", display: "block" }}>
                                                        TSh 0
                                                    </Text>
                                                </Table.Summary.Cell>
                                                <Table.Summary.Cell index={5}>
                                                    <Text strong style={{ color: isDark ? "#fff" : "#1f1f1f", textAlign: "right", display: "block" }}>
                                                        TSh 0
                                                    </Text>
                                                </Table.Summary.Cell>
                                                <Table.Summary.Cell index={6}>
                                                    <Text strong style={{ color: isDark ? "#fff" : "#1f1f1f", textAlign: "right", display: "block" }}>
                                                        TSh 0
                                                    </Text>
                                                </Table.Summary.Cell>
                                            </Table.Summary.Row>
                                        </Table.Summary>
                                    )}
                                />
                            </Space>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    };

    // Account Receivable Ageing Details (Details)
    const ARAgeingDetailsView = () => {
        const formatDate = (date: dayjs.Dayjs) => date.format('DD-MM-YYYY');
        const [selectedLocation, setSelectedLocation] = useState<string>("All locations");
        const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
            current: true,
            '1-30': true,
            '31-60': true,
            '61-90': true,
            '91+': true,
        });

        const toggleGroup = (group: string) => {
            setExpandedGroups(prev => ({
                ...prev,
                [group]: !prev[group]
            }));
        };

        // Sample data for each ageing period
        const ageingData = {
            current: [
                { date: '15-01-2026', transactionType: 'Invoice', invoiceNo: 'INV-001', customer: 'ABC Trading Ltd', dueDate: '15-02-2026', due: 'TSh 500,000' },
                { date: '20-01-2026', transactionType: 'Invoice', invoiceNo: 'INV-002', customer: 'XYZ Corporation', dueDate: '20-02-2026', due: 'TSh 750,000' },
            ],
            '1-30': [
                { date: '15-12-2025', transactionType: 'Invoice', invoiceNo: 'INV-003', customer: 'Global Imports Inc', dueDate: '15-01-2026', due: 'TSh 200,000' },
                { date: '20-12-2025', transactionType: 'Invoice', invoiceNo: 'INV-004', customer: 'Local Suppliers Ltd', dueDate: '20-01-2026', due: 'TSh 100,000' },
            ],
            '31-60': [
                { date: '15-11-2025', transactionType: 'Invoice', invoiceNo: 'INV-005', customer: 'ABC Trading Ltd', dueDate: '15-12-2025', due: 'TSh 200,000' },
                { date: '20-11-2025', transactionType: 'Invoice', invoiceNo: 'INV-006', customer: 'XYZ Corporation', dueDate: '20-12-2025', due: 'TSh 150,000' },
            ],
            '61-90': [
                { date: '15-10-2025', transactionType: 'Invoice', invoiceNo: 'INV-007', customer: 'Global Imports Inc', dueDate: '15-11-2025', due: 'TSh 100,000' },
                { date: '20-10-2025', transactionType: 'Invoice', invoiceNo: 'INV-008', customer: 'Local Suppliers Ltd', dueDate: '20-11-2025', due: 'TSh 75,000' },
            ],
            '91+': [
                { date: '15-08-2025', transactionType: 'Invoice', invoiceNo: 'INV-009', customer: 'ABC Trading Ltd', dueDate: '15-09-2025', due: 'TSh 50,000' },
                { date: '20-08-2025', transactionType: 'Invoice', invoiceNo: 'INV-010', customer: 'XYZ Corporation', dueDate: '20-09-2025', due: 'TSh 25,000' },
            ],
        };

        const calculateTotal = (group: string) => {
            return ageingData[group as keyof typeof ageingData]?.reduce((total, item) => {
                const amount = parseInt(item.due.replace('TSh ', '').replace(/,/g, ''));
                return total + amount;
            }, 0) || 0;
        };

        const exportMenuItems = [
            { key: 'csv', label: 'Export to CSV' },
            { key: 'excel', label: 'Export to Excel' },
            { key: 'pdf', label: 'Export to PDF' },
            { key: 'print', label: 'Print' },
        ];

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
                                Account Receivable Ageing Details (Details)
                            </Title>
                        </div>
                    </Col>
                </Row>

                <Row gutter={[24, 24]}>
                    {/* Left Sidebar - Filters */}
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
                                    <FilterOutlined /> Filters
                                </Title>
                                <Divider style={{ margin: "12px 0", borderColor: isDark ? "rgba(255,255,255,0.1)" : "#f0f0f0" }} />

                                <div>
                                    <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", fontSize: "12px", display: "block", marginBottom: "8px" }}>
                                        Business Location
                                    </Text>
                                    <Select
                                        value={selectedLocation}
                                        onChange={setSelectedLocation}
                                        style={{ width: "100%" }}
                                    >
                                        <Select.Option value="All locations">All locations</Select.Option>
                                        <Select.Option value="Location 1">Location 1</Select.Option>
                                        <Select.Option value="Location 2">Location 2</Select.Option>
                                    </Select>
                                </div>

                                <div style={{ marginTop: "16px" }}>
                                    <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", fontSize: "12px", display: "block", marginBottom: "8px" }}>
                                        Date Range
                                    </Text>
                                    <RangePicker
                                        value={dateRange}
                                        onChange={(dates) => {
                                            if (dates && dates[0] && dates[1]) {
                                                setDateRange([dates[0], dates[1]]);
                                            }
                                        }}
                                        format="DD-MM-YYYY"
                                        style={{ width: "100%" }}
                                        suffixIcon={<CalendarOutlined />}
                                    />
                                </div>

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

                    {/* Main Content - AR Ageing Details Table */}
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
                                        Account Receivable Ageing Details (Details)
                                    </Title>
                                    <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c" }}>
                                        {formatDate(dateRange[0])} - {formatDate(dateRange[1])}
                                    </Text>
                                </div>

                                <Divider style={{ margin: "16px 0", borderColor: isDark ? "rgba(255,255,255,0.1)" : "#f0f0f0" }} />

                                {/* Table Controls */}
                                <Row gutter={[16, 16]} align="middle">
                                    <Col xs={24} sm={12} md={8}>
                                        <Space>
                                            <Text style={{ color: isDark ? "#fff" : "#1f1f1f" }}>Show</Text>
                                            <Select
                                                value="all"
                                                style={{ width: 80 }}
                                            >
                                                <Select.Option value="all">all</Select.Option>
                                                <Select.Option value={25}>25</Select.Option>
                                                <Select.Option value={50}>50</Select.Option>
                                                <Select.Option value={100}>100</Select.Option>
                                            </Select>
                                            <Text style={{ color: isDark ? "#fff" : "#1f1f1f" }}>entries</Text>
                                        </Space>
                                    </Col>
                                    <Col xs={24} sm={12} md={16}>
                                        <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", flexWrap: "wrap" }}>
                                            <Dropdown
                                                menu={{
                                                    items: exportMenuItems,
                                                    onClick: ({ key }) => {
                                                        switch (key) {
                                                            case 'csv':
                                                                message.info('Exporting to CSV...');
                                                                break;
                                                            case 'excel':
                                                                message.info('Exporting to Excel...');
                                                                break;
                                                            case 'pdf':
                                                                message.info('Exporting to PDF...');
                                                                break;
                                                            case 'print':
                                                                message.info('Preparing report for printing...');
                                                                break;
                                                        }
                                                    }
                                                }}
                                                trigger={['click']}
                                            >
                                                <Button icon={<DownloadOutlined />}>
                                                    Export
                                                </Button>
                                            </Dropdown>
                                            <Button icon={<PrinterOutlined />}>
                                                Print
                                            </Button>
                                            <Button icon={<FilterOutlined />}>
                                                Column visibility
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>

                                {/* Ageing Details Table */}
                                <div style={{ overflowX: "auto" }}>
                                    {/* Table Header */}
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
                                                    Date
                                                </th>
                                                <th style={{
                                                    padding: "12px",
                                                    textAlign: "left",
                                                    borderBottom: `2px solid ${isDark ? "rgba(255,255,255,0.1)" : "#f0f0f0"}`,
                                                    color: isDark ? "#fff" : "#1f1f1f",
                                                    fontWeight: 600
                                                }}>
                                                    Transaction Type
                                                </th>
                                                <th style={{
                                                    padding: "12px",
                                                    textAlign: "left",
                                                    borderBottom: `2px solid ${isDark ? "rgba(255,255,255,0.1)" : "#f0f0f0"}`,
                                                    color: isDark ? "#fff" : "#1f1f1f",
                                                    fontWeight: 600
                                                }}>
                                                    Invoice No.
                                                </th>
                                                <th style={{
                                                    padding: "12px",
                                                    textAlign: "left",
                                                    borderBottom: `2px solid ${isDark ? "rgba(255,255,255,0.1)" : "#f0f0f0"}`,
                                                    color: isDark ? "#fff" : "#1f1f1f",
                                                    fontWeight: 600
                                                }}>
                                                    Customer
                                                </th>
                                                <th style={{
                                                    padding: "12px",
                                                    textAlign: "left",
                                                    borderBottom: `2px solid ${isDark ? "rgba(255,255,255,0.1)" : "#f0f0f0"}`,
                                                    color: isDark ? "#fff" : "#1f1f1f",
                                                    fontWeight: 600
                                                }}>
                                                    Due Date
                                                </th>
                                                <th style={{
                                                    padding: "12px",
                                                    textAlign: "right",
                                                    borderBottom: `2px solid ${isDark ? "rgba(255,255,255,0.1)" : "#f0f0f0"}`,
                                                    color: isDark ? "#fff" : "#1f1f1f",
                                                    fontWeight: 600,
                                                    width: "150px"
                                                }}>
                                                    Due
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* Current Group */}
                                            <tr>
                                                <td colSpan={6} style={{
                                                    padding: "8px 12px",
                                                    background: isDark ? "rgba(255,255,255,0.02)" : "#fafafa",
                                                    borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#f0f0f0"}`,
                                                    cursor: "pointer"
                                                }} onClick={() => toggleGroup('current')}>
                                                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                        {expandedGroups.current ? <CaretDownOutlined /> : <CaretRightOutlined />}
                                                        <Text strong style={{ color: "#52c41a" }}>Current</Text>
                                                    </div>
                                                </td>
                                            </tr>
                                            {expandedGroups.current && ageingData.current.map((item, index) => (
                                                <tr key={`current-${index}`}>
                                                    <td style={{
                                                        padding: "12px",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.date}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.transactionType}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.invoiceNo}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.customer}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.dueDate}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        textAlign: "right",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.due}
                                                    </td>
                                                </tr>
                                            ))}
                                            {expandedGroups.current && (
                                                <tr>
                                                    <td colSpan={5} style={{
                                                        padding: "12px",
                                                        textAlign: "right",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f",
                                                        fontWeight: 600
                                                    }}>
                                                        Total for Current
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        textAlign: "right",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f",
                                                        fontWeight: 600
                                                    }}>
                                                        TSh {calculateTotal('current').toLocaleString()}
                                                    </td>
                                                </tr>
                                            )}

                                            {/* 1-30 days past due Group */}
                                            <tr>
                                                <td colSpan={6} style={{
                                                    padding: "8px 12px",
                                                    background: isDark ? "rgba(255,255,255,0.02)" : "#fafafa",
                                                    borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#f0f0f0"}`,
                                                    cursor: "pointer"
                                                }} onClick={() => toggleGroup('1-30')}>
                                                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                        {expandedGroups['1-30'] ? <CaretDownOutlined /> : <CaretRightOutlined />}
                                                        <Text strong style={{ color: "#fa8c16" }}>1 - 30 days past due</Text>
                                                    </div>
                                                </td>
                                            </tr>
                                            {expandedGroups['1-30'] && ageingData['1-30'].map((item, index) => (
                                                <tr key={`1-30-${index}`}>
                                                    <td style={{
                                                        padding: "12px",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.date}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.transactionType}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.invoiceNo}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.customer}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.dueDate}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        textAlign: "right",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.due}
                                                    </td>
                                                </tr>
                                            ))}
                                            {expandedGroups['1-30'] && (
                                                <tr>
                                                    <td colSpan={5} style={{
                                                        padding: "12px",
                                                        textAlign: "right",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f",
                                                        fontWeight: 600
                                                    }}>
                                                        Total for 1 - 30 days past due
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        textAlign: "right",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f",
                                                        fontWeight: 600
                                                    }}>
                                                        TSh {calculateTotal('1-30').toLocaleString()}
                                                    </td>
                                                </tr>
                                            )}

                                            {/* 31-60 days past due Group */}
                                            <tr>
                                                <td colSpan={6} style={{
                                                    padding: "8px 12px",
                                                    background: isDark ? "rgba(255,255,255,0.02)" : "#fafafa",
                                                    borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#f0f0f0"}`,
                                                    cursor: "pointer"
                                                }} onClick={() => toggleGroup('31-60')}>
                                                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                        {expandedGroups['31-60'] ? <CaretDownOutlined /> : <CaretRightOutlined />}
                                                        <Text strong style={{ color: "#fa8c16" }}>31 - 60 days past due</Text>
                                                    </div>
                                                </td>
                                            </tr>
                                            {expandedGroups['31-60'] && ageingData['31-60'].map((item, index) => (
                                                <tr key={`31-60-${index}`}>
                                                    <td style={{
                                                        padding: "12px",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.date}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.transactionType}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.invoiceNo}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.customer}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.dueDate}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        textAlign: "right",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.due}
                                                    </td>
                                                </tr>
                                            ))}
                                            {expandedGroups['31-60'] && (
                                                <tr>
                                                    <td colSpan={5} style={{
                                                        padding: "12px",
                                                        textAlign: "right",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f",
                                                        fontWeight: 600
                                                    }}>
                                                        Total for 31 - 60 days past due
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        textAlign: "right",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f",
                                                        fontWeight: 600
                                                    }}>
                                                        TSh {calculateTotal('31-60').toLocaleString()}
                                                    </td>
                                                </tr>
                                            )}

                                            {/* 61-90 days past due Group */}
                                            <tr>
                                                <td colSpan={6} style={{
                                                    padding: "8px 12px",
                                                    background: isDark ? "rgba(255,255,255,0.02)" : "#fafafa",
                                                    borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#f0f0f0"}`,
                                                    cursor: "pointer"
                                                }} onClick={() => toggleGroup('61-90')}>
                                                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                        {expandedGroups['61-90'] ? <CaretDownOutlined /> : <CaretRightOutlined />}
                                                        <Text strong style={{ color: "#fa8c16" }}>61 - 90 days past due</Text>
                                                    </div>
                                                </td>
                                            </tr>
                                            {expandedGroups['61-90'] && ageingData['61-90'].map((item, index) => (
                                                <tr key={`61-90-${index}`}>
                                                    <td style={{
                                                        padding: "12px",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.date}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.transactionType}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.invoiceNo}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.customer}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.dueDate}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        textAlign: "right",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.due}
                                                    </td>
                                                </tr>
                                            ))}
                                            {expandedGroups['61-90'] && (
                                                <tr>
                                                    <td colSpan={5} style={{
                                                        padding: "12px",
                                                        textAlign: "right",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f",
                                                        fontWeight: 600
                                                    }}>
                                                        Total for 61 - 90 days past due
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        textAlign: "right",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f",
                                                        fontWeight: 600
                                                    }}>
                                                        TSh {calculateTotal('61-90').toLocaleString()}
                                                    </td>
                                                </tr>
                                            )}

                                            {/* 91 days and over past due Group */}
                                            <tr>
                                                <td colSpan={6} style={{
                                                    padding: "8px 12px",
                                                    background: isDark ? "rgba(255,255,255,0.02)" : "#fafafa",
                                                    borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#f0f0f0"}`,
                                                    cursor: "pointer"
                                                }} onClick={() => toggleGroup('91+')}>
                                                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                        {expandedGroups['91+'] ? <CaretDownOutlined /> : <CaretRightOutlined />}
                                                        <Text strong style={{ color: "#ff4d4f" }}>91 days and over past due</Text>
                                                    </div>
                                                </td>
                                            </tr>
                                            {expandedGroups['91+'] && ageingData['91+'].map((item, index) => (
                                                <tr key={`91+-${index}`}>
                                                    <td style={{
                                                        padding: "12px",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.date}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.transactionType}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.invoiceNo}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.customer}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.dueDate}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        textAlign: "right",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.due}
                                                    </td>
                                                </tr>
                                            ))}
                                            {expandedGroups['91+'] && (
                                                <tr>
                                                    <td colSpan={5} style={{
                                                        padding: "12px",
                                                        textAlign: "right",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f",
                                                        fontWeight: 600
                                                    }}>
                                                        Total for 91 days and over past due
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        textAlign: "right",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f",
                                                        fontWeight: 600
                                                    }}>
                                                        TSh {calculateTotal('91+').toLocaleString()}
                                                    </td>
                                                </tr>
                                            )}
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

    // Account Payable Ageing Details (Details)
    const APAgeingDetailsView = () => {
        const formatDate = (date: dayjs.Dayjs) => date.format('DD-MM-YYYY');
        const [selectedLocation, setSelectedLocation] = useState<string>("All locations");
        const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
            current: true,
            '1-30': true,
            '31-60': true,
            '61-90': true,
            '91+': true,
        });

        const toggleGroup = (group: string) => {
            setExpandedGroups(prev => ({
                ...prev,
                [group]: !prev[group]
            }));
        };

        // Sample data for each ageing period - AP version with suppliers
        const ageingData = {
            current: [
                { date: '15-01-2026', transactionType: 'Bill', referenceNo: 'BILL-001', supplier: 'ABC Supply Co', dueDate: '15-02-2026', due: 'TSh 300,000' },
                { date: '20-01-2026', transactionType: 'Bill', referenceNo: 'BILL-002', supplier: 'XYZ Materials Ltd', dueDate: '20-02-2026', due: 'TSh 450,000' },
            ],
            '1-30': [
                { date: '15-12-2025', transactionType: 'Bill', referenceNo: 'BILL-003', supplier: 'Global Suppliers Inc', dueDate: '15-01-2026', due: 'TSh 150,000' },
                { date: '20-12-2025', transactionType: 'Bill', referenceNo: 'BILL-004', supplier: 'Local Vendor Ltd', dueDate: '20-01-2026', due: 'TSh 80,000' },
            ],
            '31-60': [
                { date: '15-11-2025', transactionType: 'Bill', referenceNo: 'BILL-005', supplier: 'ABC Supply Co', dueDate: '15-12-2025', due: 'TSh 120,000' },
                { date: '20-11-2025', transactionType: 'Bill', referenceNo: 'BILL-006', supplier: 'XYZ Materials Ltd', dueDate: '20-12-2025', due: 'TSh 90,000' },
            ],
            '61-90': [
                { date: '15-10-2025', transactionType: 'Bill', referenceNo: 'BILL-007', supplier: 'Global Suppliers Inc', dueDate: '15-11-2025', due: 'TSh 60,000' },
                { date: '20-10-2025', transactionType: 'Bill', referenceNo: 'BILL-008', supplier: 'Local Vendor Ltd', dueDate: '20-11-2025', due: 'TSh 45,000' },
            ],
            '91+': [
                { date: '15-08-2025', transactionType: 'Bill', referenceNo: 'BILL-009', supplier: 'ABC Supply Co', dueDate: '15-09-2025', due: 'TSh 30,000' },
                { date: '20-08-2025', transactionType: 'Bill', referenceNo: 'BILL-010', supplier: 'XYZ Materials Ltd', dueDate: '20-09-2025', due: 'TSh 15,000' },
            ],
        };

        const calculateTotal = (group: string) => {
            return ageingData[group as keyof typeof ageingData]?.reduce((total, item) => {
                const amount = parseInt(item.due.replace('TSh ', '').replace(/,/g, ''));
                return total + amount;
            }, 0) || 0;
        };

        const exportMenuItems = [
            { key: 'csv', label: 'Export to CSV' },
            { key: 'excel', label: 'Export to Excel' },
            { key: 'pdf', label: 'Export to PDF' },
            { key: 'print', label: 'Print' },
        ];

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
                                Account Payable Ageing Details (Details)
                            </Title>
                        </div>
                    </Col>
                </Row>

                <Row gutter={[24, 24]}>
                    {/* Left Sidebar - Filters */}
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
                                    <FilterOutlined /> Filters
                                </Title>
                                <Divider style={{ margin: "12px 0", borderColor: isDark ? "rgba(255,255,255,0.1)" : "#f0f0f0" }} />

                                <div>
                                    <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", fontSize: "12px", display: "block", marginBottom: "8px" }}>
                                        Business Location
                                    </Text>
                                    <Select
                                        value={selectedLocation}
                                        onChange={setSelectedLocation}
                                        style={{ width: "100%" }}
                                    >
                                        <Select.Option value="All locations">All locations</Select.Option>
                                        <Select.Option value="Location 1">Location 1</Select.Option>
                                        <Select.Option value="Location 2">Location 2</Select.Option>
                                    </Select>
                                </div>

                                <div style={{ marginTop: "16px" }}>
                                    <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", fontSize: "12px", display: "block", marginBottom: "8px" }}>
                                        Date Range
                                    </Text>
                                    <RangePicker
                                        value={dateRange}
                                        onChange={(dates) => {
                                            if (dates && dates[0] && dates[1]) {
                                                setDateRange([dates[0], dates[1]]);
                                            }
                                        }}
                                        format="DD-MM-YYYY"
                                        style={{ width: "100%" }}
                                        suffixIcon={<CalendarOutlined />}
                                    />
                                </div>

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

                    {/* Main Content - AP Ageing Details Table */}
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
                                        Account Payable Ageing Details (Details)
                                    </Title>
                                    <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c" }}>
                                        {formatDate(dateRange[0])} - {formatDate(dateRange[1])}
                                    </Text>
                                </div>

                                <Divider style={{ margin: "16px 0", borderColor: isDark ? "rgba(255,255,255,0.1)" : "#f0f0f0" }} />

                                {/* Table Controls */}
                                <Row gutter={[16, 16]} align="middle">
                                    <Col xs={24} sm={12} md={8}>
                                        <Space>
                                            <Text style={{ color: isDark ? "#fff" : "#1f1f1f" }}>Show</Text>
                                            <Select
                                                value="all"
                                                style={{ width: 80 }}
                                            >
                                                <Select.Option value="all">all</Select.Option>
                                                <Select.Option value={25}>25</Select.Option>
                                                <Select.Option value={50}>50</Select.Option>
                                                <Select.Option value={100}>100</Select.Option>
                                            </Select>
                                            <Text style={{ color: isDark ? "#fff" : "#1f1f1f" }}>entries</Text>
                                        </Space>
                                    </Col>
                                    <Col xs={24} sm={12} md={16}>
                                        <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", flexWrap: "wrap" }}>
                                            <Dropdown
                                                menu={{
                                                    items: exportMenuItems,
                                                    onClick: ({ key }) => {
                                                        switch (key) {
                                                            case 'csv':
                                                                message.info('Exporting to CSV...');
                                                                break;
                                                            case 'excel':
                                                                message.info('Exporting to Excel...');
                                                                break;
                                                            case 'pdf':
                                                                message.info('Exporting to PDF...');
                                                                break;
                                                            case 'print':
                                                                message.info('Preparing report for printing...');
                                                                break;
                                                        }
                                                    }
                                                }}
                                                trigger={['click']}
                                            >
                                                <Button icon={<DownloadOutlined />}>
                                                    Export
                                                </Button>
                                            </Dropdown>
                                            <Button icon={<PrinterOutlined />}>
                                                Print
                                            </Button>
                                            <Button icon={<FilterOutlined />}>
                                                Column visibility
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>

                                {/* Ageing Details Table */}
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
                                                    Date
                                                </th>
                                                <th style={{
                                                    padding: "12px",
                                                    textAlign: "left",
                                                    borderBottom: `2px solid ${isDark ? "rgba(255,255,255,0.1)" : "#f0f0f0"}`,
                                                    color: isDark ? "#fff" : "#1f1f1f",
                                                    fontWeight: 600
                                                }}>
                                                    Transaction Type
                                                </th>
                                                <th style={{
                                                    padding: "12px",
                                                    textAlign: "left",
                                                    borderBottom: `2px solid ${isDark ? "rgba(255,255,255,0.1)" : "#f0f0f0"}`,
                                                    color: isDark ? "#fff" : "#1f1f1f",
                                                    fontWeight: 600
                                                }}>
                                                    Reference No
                                                </th>
                                                <th style={{
                                                    padding: "12px",
                                                    textAlign: "left",
                                                    borderBottom: `2px solid ${isDark ? "rgba(255,255,255,0.1)" : "#f0f0f0"}`,
                                                    color: isDark ? "#fff" : "#1f1f1f",
                                                    fontWeight: 600
                                                }}>
                                                    Suppliers
                                                </th>
                                                <th style={{
                                                    padding: "12px",
                                                    textAlign: "left",
                                                    borderBottom: `2px solid ${isDark ? "rgba(255,255,255,0.1)" : "#f0f0f0"}`,
                                                    color: isDark ? "#fff" : "#1f1f1f",
                                                    fontWeight: 600
                                                }}>
                                                    Due Date
                                                </th>
                                                <th style={{
                                                    padding: "12px",
                                                    textAlign: "right",
                                                    borderBottom: `2px solid ${isDark ? "rgba(255,255,255,0.1)" : "#f0f0f0"}`,
                                                    color: isDark ? "#fff" : "#1f1f1f",
                                                    fontWeight: 600,
                                                    width: "150px"
                                                }}>
                                                    Due
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* Current Group */}
                                            <tr>
                                                <td colSpan={6} style={{
                                                    padding: "8px 12px",
                                                    background: isDark ? "rgba(255,255,255,0.02)" : "#fafafa",
                                                    borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#f0f0f0"}`,
                                                    cursor: "pointer"
                                                }} onClick={() => toggleGroup('current')}>
                                                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                        {expandedGroups.current ? <CaretDownOutlined /> : <CaretRightOutlined />}
                                                        <Text strong style={{ color: "#52c41a" }}>Current</Text>
                                                    </div>
                                                </td>
                                            </tr>
                                            {expandedGroups.current && ageingData.current.map((item, index) => (
                                                <tr key={`current-${index}`}>
                                                    <td style={{
                                                        padding: "12px",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.date}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.transactionType}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.referenceNo}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.supplier}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.dueDate}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        textAlign: "right",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.due}
                                                    </td>
                                                </tr>
                                            ))}
                                            {expandedGroups.current && (
                                                <tr>
                                                    <td colSpan={5} style={{
                                                        padding: "12px",
                                                        textAlign: "right",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f",
                                                        fontWeight: 600
                                                    }}>
                                                        Total for Current
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        textAlign: "right",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f",
                                                        fontWeight: 600
                                                    }}>
                                                        TSh {calculateTotal('current').toLocaleString()}
                                                    </td>
                                                </tr>
                                            )}

                                            {/* 1-30 days past due Group */}
                                            <tr>
                                                <td colSpan={6} style={{
                                                    padding: "8px 12px",
                                                    background: isDark ? "rgba(255,255,255,0.02)" : "#fafafa",
                                                    borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#f0f0f0"}`,
                                                    cursor: "pointer"
                                                }} onClick={() => toggleGroup('1-30')}>
                                                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                        {expandedGroups['1-30'] ? <CaretDownOutlined /> : <CaretRightOutlined />}
                                                        <Text strong style={{ color: "#fa8c16" }}>1 - 30 days past due</Text>
                                                    </div>
                                                </td>
                                            </tr>
                                            {expandedGroups['1-30'] && ageingData['1-30'].map((item, index) => (
                                                <tr key={`1-30-${index}`}>
                                                    <td style={{
                                                        padding: "12px",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.date}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.transactionType}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.referenceNo}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.supplier}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.dueDate}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        textAlign: "right",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.due}
                                                    </td>
                                                </tr>
                                            ))}
                                            {expandedGroups['1-30'] && (
                                                <tr>
                                                    <td colSpan={5} style={{
                                                        padding: "12px",
                                                        textAlign: "right",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f",
                                                        fontWeight: 600
                                                    }}>
                                                        Total for 1 - 30 days past due
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        textAlign: "right",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f",
                                                        fontWeight: 600
                                                    }}>
                                                        TSh {calculateTotal('1-30').toLocaleString()}
                                                    </td>
                                                </tr>
                                            )}

                                            {/* 31-60 days past due Group */}
                                            <tr>
                                                <td colSpan={6} style={{
                                                    padding: "8px 12px",
                                                    background: isDark ? "rgba(255,255,255,0.02)" : "#fafafa",
                                                    borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#f0f0f0"}`,
                                                    cursor: "pointer"
                                                }} onClick={() => toggleGroup('31-60')}>
                                                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                        {expandedGroups['31-60'] ? <CaretDownOutlined /> : <CaretRightOutlined />}
                                                        <Text strong style={{ color: "#fa8c16" }}>31 - 60 days past due</Text>
                                                    </div>
                                                </td>
                                            </tr>
                                            {expandedGroups['31-60'] && ageingData['31-60'].map((item, index) => (
                                                <tr key={`31-60-${index}`}>
                                                    <td style={{
                                                        padding: "12px",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.date}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.transactionType}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.referenceNo}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.supplier}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.dueDate}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        textAlign: "right",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.due}
                                                    </td>
                                                </tr>
                                            ))}
                                            {expandedGroups['31-60'] && (
                                                <tr>
                                                    <td colSpan={5} style={{
                                                        padding: "12px",
                                                        textAlign: "right",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f",
                                                        fontWeight: 600
                                                    }}>
                                                        Total for 31 - 60 days past due
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        textAlign: "right",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f",
                                                        fontWeight: 600
                                                    }}>
                                                        TSh {calculateTotal('31-60').toLocaleString()}
                                                    </td>
                                                </tr>
                                            )}

                                            {/* 61-90 days past due Group */}
                                            <tr>
                                                <td colSpan={6} style={{
                                                    padding: "8px 12px",
                                                    background: isDark ? "rgba(255,255,255,0.02)" : "#fafafa",
                                                    borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#f0f0f0"}`,
                                                    cursor: "pointer"
                                                }} onClick={() => toggleGroup('61-90')}>
                                                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                        {expandedGroups['61-90'] ? <CaretDownOutlined /> : <CaretRightOutlined />}
                                                        <Text strong style={{ color: "#f5222d" }}>61 - 90 days past due</Text>
                                                    </div>
                                                </td>
                                            </tr>
                                            {expandedGroups['61-90'] && ageingData['61-90'].map((item, index) => (
                                                <tr key={`61-90-${index}`}>
                                                    <td style={{
                                                        padding: "12px",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.date}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.transactionType}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.referenceNo}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.supplier}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.dueDate}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        textAlign: "right",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.due}
                                                    </td>
                                                </tr>
                                            ))}
                                            {expandedGroups['61-90'] && (
                                                <tr>
                                                    <td colSpan={5} style={{
                                                        padding: "12px",
                                                        textAlign: "right",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f",
                                                        fontWeight: 600
                                                    }}>
                                                        Total for 61 - 90 days past due
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        textAlign: "right",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f",
                                                        fontWeight: 600
                                                    }}>
                                                        TSh {calculateTotal('61-90').toLocaleString()}
                                                    </td>
                                                </tr>
                                            )}

                                            {/* 91 days and over past due Group */}
                                            <tr>
                                                <td colSpan={6} style={{
                                                    padding: "8px 12px",
                                                    background: isDark ? "rgba(255,255,255,0.02)" : "#fafafa",
                                                    borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#f0f0f0"}`,
                                                    cursor: "pointer"
                                                }} onClick={() => toggleGroup('91+')}>
                                                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                        {expandedGroups['91+'] ? <CaretDownOutlined /> : <CaretRightOutlined />}
                                                        <Text strong style={{ color: "#f5222d" }}>91 days and over past due</Text>
                                                    </div>
                                                </td>
                                            </tr>
                                            {expandedGroups['91+'] && ageingData['91+'].map((item, index) => (
                                                <tr key={`91+-${index}`}>
                                                    <td style={{
                                                        padding: "12px",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.date}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.transactionType}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.referenceNo}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.supplier}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.dueDate}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        textAlign: "right",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f"
                                                    }}>
                                                        {item.due}
                                                    </td>
                                                </tr>
                                            ))}
                                            {expandedGroups['91+'] && (
                                                <tr>
                                                    <td colSpan={5} style={{
                                                        padding: "12px",
                                                        textAlign: "right",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f",
                                                        fontWeight: 600
                                                    }}>
                                                        Total for 91 days and over past due
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        textAlign: "right",
                                                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0"}`,
                                                        color: isDark ? "#fff" : "#1f1f1f",
                                                        fontWeight: 600
                                                    }}>
                                                        TSh {calculateTotal('91+').toLocaleString()}
                                                    </td>
                                                </tr>
                                            )}
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
            ) : currentView === "ledger-report" ? (
                <LedgerReportView />
            ) : currentView === "balance-sheet" ? (
                <BalanceSheetView />
            ) : currentView === "ar-ageing-summary" ? (
                <ARAgeingSummaryView />
            ) : currentView === "ap-ageing-summary" ? (
                <APAgeingSummaryView />
            ) : currentView === "ar-ageing-details" ? (
                <ARAgeingDetailsView />
            ) : currentView === "ap-ageing-details" ? (
                <APAgeingDetailsView />
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