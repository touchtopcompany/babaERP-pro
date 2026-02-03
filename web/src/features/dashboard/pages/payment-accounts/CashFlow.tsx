import React, { useState, useMemo } from "react";
import {
  Card,
  Table,
  Button,
  Input,
  Space,
  Typography,
  message,
  Row,
  Col,
  Dropdown,
  Select,
  Checkbox,
  Tooltip,
} from "antd";
import type { MenuProps } from "antd";
import {
  SearchOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  PrinterOutlined,
  UnorderedListOutlined,
  FileTextOutlined,
  DownOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import useTheme from "@/theme/useTheme";
import { FilterPanel } from "../../components/filters";
import type { FilterConfig } from "../../components/filters";
import dayjs, { type Dayjs } from "dayjs";

const { Title, Text } = Typography;
const { Search } = Input;

export interface CashFlowData {
  key: string;
  date: string;
  account: string;
  description: string;
  paymentMethod: string;
  paymentDetails: string;
  debit: number;
  credit: number;
  accountBalance: number;
  totalBalance: number;
}

const CashFlow: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(25);

  // Column visibility state
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    date: true,
    account: true,
    description: true,
    paymentMethod: true,
    paymentDetails: true,
    debit: true,
    credit: true,
    accountBalance: true,
    totalBalance: true,
  });

  // Filter states
  const [filterConfig, setFilterConfig] = useState<FilterConfig>({
    account: {
      label: "Account:",
      value: "all",
      options: [
        { label: "All", value: "all" },
        { label: "Main Business Account", value: "main" },
        { label: "Savings Account", value: "savings" },
        { label: "Cash Account", value: "cash" },
        { label: "Mobile Money - M-Pesa", value: "mpesa" },
        { label: "Mobile Money - Tigo Pesa", value: "tigo" },
        { label: "Credit Card Account", value: "credit_card" },
        { label: "PayPal Account", value: "paypal" },
      ],
    },
    businessLocation: {
      label: "Business Location:",
      value: "all",
      options: [
        { label: "All locations", value: "all" },
        { label: "C2Z Digital Solutions (C2Z1)", value: "C2Z Digital Solutions (C2Z1)" },
        { label: "Location 2", value: "Location 2" },
        { label: "Location 3", value: "Location 3" },
      ],
    },
    transactionType: {
      label: "Transaction Type:",
      value: "all",
      options: [
        { label: "All", value: "all" },
        { label: "Sale", value: "sale" },
        { label: "Purchase", value: "purchase" },
        { label: "Expense", value: "expense" },
        { label: "Payment", value: "payment" },
        { label: "Receipt", value: "receipt" },
      ],
    },
    dateRange: {
      label: "Date Range:",
      value: [dayjs("2025-01-01"), dayjs("2025-12-31")] as [Dayjs, Dayjs],
    },
  });

  // Mock data - replace with API call
  const defaultCashFlow: CashFlowData[] = [
    {
      key: "1",
      date: "2025-01-15 10:30",
      account: "Main Business Account",
      description: "Sale - Invoice #INV-001",
      paymentMethod: "Bank Transfer",
      paymentDetails: "Ref: TXN-2025-001",
      debit: 0.00,
      credit: 500000.00,
      accountBalance: 500000.00,
      totalBalance: 500000.00,
    },
    {
      key: "2",
      date: "2025-01-16 14:20",
      account: "Cash Account",
      description: "Sale - Invoice #INV-002",
      paymentMethod: "Cash",
      paymentDetails: "Ref: TXN-2025-002",
      debit: 0.00,
      credit: 250000.00,
      accountBalance: 250000.00,
      totalBalance: 750000.00,
    },
    {
      key: "3",
      date: "2025-01-17 09:15",
      account: "Main Business Account",
      description: "Purchase - PO #PO-001",
      paymentMethod: "Bank Transfer",
      paymentDetails: "Ref: TXN-2025-003",
      debit: 1200000.00,
      credit: 0.00,
      accountBalance: -700000.00,
      totalBalance: 50000.00,
    },
    {
      key: "4",
      date: "2025-01-18 11:45",
      account: "Mobile Money - M-Pesa",
      description: "Sale - Invoice #INV-003",
      paymentMethod: "Mobile Money",
      paymentDetails: "Ref: TXN-2025-004",
      debit: 0.00,
      credit: 150000.00,
      accountBalance: 150000.00,
      totalBalance: 200000.00,
    },
    {
      key: "5",
      date: "2025-01-19 16:30",
      account: "Main Business Account",
      description: "Expense - Office Supplies",
      paymentMethod: "Bank Transfer",
      paymentDetails: "Ref: TXN-2025-005",
      debit: 85000.00,
      credit: 0.00,
      accountBalance: -785000.00,
      totalBalance: 115000.00,
    },
    {
      key: "6",
      date: "2025-01-20 13:10",
      account: "Savings Account",
      description: "Sale - Invoice #INV-004",
      paymentMethod: "Bank Transfer",
      paymentDetails: "Ref: TXN-2025-006",
      debit: 0.00,
      credit: 950000.00,
      accountBalance: 950000.00,
      totalBalance: 1065000.00,
    },
    {
      key: "7",
      date: "2025-01-21 10:00",
      account: "Cash Account",
      description: "Expense - Travel",
      paymentMethod: "Cash",
      paymentDetails: "Ref: TXN-2025-007",
      debit: 45000.00,
      credit: 0.00,
      accountBalance: 205000.00,
      totalBalance: 1020000.00,
    },
    {
      key: "8",
      date: "2025-01-22 15:20",
      account: "Main Business Account",
      description: "Sale - Invoice #INV-005",
      paymentMethod: "Credit Card",
      paymentDetails: "Ref: TXN-2025-008",
      debit: 0.00,
      credit: 1800000.00,
      accountBalance: 1015000.00,
      totalBalance: 2820000.00,
    },
    {
      key: "9",
      date: "2025-01-23 09:30",
      account: "Mobile Money - Tigo Pesa",
      description: "Sale - Invoice #INV-006",
      paymentMethod: "Mobile Money",
      paymentDetails: "Ref: TXN-2025-009",
      debit: 0.00,
      credit: 75000.00,
      accountBalance: 75000.00,
      totalBalance: 2895000.00,
    },
    {
      key: "10",
      date: "2025-01-24 14:45",
      account: "Main Business Account",
      description: "Purchase - PO #PO-002",
      paymentMethod: "Bank Transfer",
      paymentDetails: "Ref: TXN-2025-010",
      debit: 650000.00,
      credit: 0.00,
      accountBalance: 365000.00,
      totalBalance: 2245000.00,
    },
    {
      key: "11",
      date: "2025-01-25 11:15",
      account: "Cash Account",
      description: "Sale - Invoice #INV-007",
      paymentMethod: "Cash",
      paymentDetails: "Ref: TXN-2025-011",
      debit: 0.00,
      credit: 320000.00,
      accountBalance: 525000.00,
      totalBalance: 2565000.00,
    },
    {
      key: "12",
      date: "2025-01-26 16:00",
      account: "Main Business Account",
      description: "Expense - Utilities",
      paymentMethod: "Bank Transfer",
      paymentDetails: "Ref: TXN-2025-012",
      debit: 125000.00,
      credit: 0.00,
      accountBalance: 240000.00,
      totalBalance: 2440000.00,
    },
    {
      key: "13",
      date: "2025-01-27 10:30",
      account: "Savings Account",
      description: "Sale - Invoice #INV-008",
      paymentMethod: "Bank Transfer",
      paymentDetails: "Ref: TXN-2025-013",
      debit: 0.00,
      credit: 2100000.00,
      accountBalance: 3050000.00,
      totalBalance: 4540000.00,
    },
    {
      key: "14",
      date: "2025-01-28 13:20",
      account: "Main Business Account",
      description: "Purchase - PO #PO-003",
      paymentMethod: "Bank Transfer",
      paymentDetails: "Ref: TXN-2025-014",
      debit: 980000.00,
      credit: 0.00,
      accountBalance: -740000.00,
      totalBalance: 3560000.00,
    },
    {
      key: "15",
      date: "2025-01-29 15:45",
      account: "Mobile Money - M-Pesa",
      description: "Sale - Invoice #INV-009",
      paymentMethod: "Mobile Money",
      paymentDetails: "Ref: TXN-2025-015",
      debit: 0.00,
      credit: 180000.00,
      accountBalance: 330000.00,
      totalBalance: 3740000.00,
    },
  ];

  const [cashFlowItems, setCashFlowItems] = useState<CashFlowData[]>(defaultCashFlow);

  // Filter cash flow items based on search text and filters
  const filteredCashFlow = useMemo(() => {
    let filtered = cashFlowItems;

    // Apply account filter
    if (filterConfig.account?.value && filterConfig.account.value !== "all") {
      // Filter by account when implemented
    }

    // Apply business location filter
    if (filterConfig.businessLocation?.value && filterConfig.businessLocation.value !== "all") {
      // Filter by location when implemented
    }

    // Apply transaction type filter
    if (filterConfig.transactionType?.value && filterConfig.transactionType.value !== "all") {
      // Filter by transaction type when implemented
    }

    // Apply date range filter
    if (filterConfig.dateRange?.value) {
      const [startDate, endDate] = filterConfig.dateRange.value;
      filtered = filtered.filter((item) => {
        const itemDate = dayjs(item.date);
        return itemDate.isAfter(startDate.subtract(1, "day")) && itemDate.isBefore(endDate.add(1, "day"));
      });
    }

    // Apply search filter
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.account.toLowerCase().includes(searchLower) ||
          item.description.toLowerCase().includes(searchLower) ||
          item.paymentMethod.toLowerCase().includes(searchLower) ||
          item.paymentDetails.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [cashFlowItems, searchText, filterConfig]);

  // Calculate totals
  const totalDebit = useMemo(() => {
    return filteredCashFlow.reduce((sum, item) => sum + item.debit, 0);
  }, [filteredCashFlow]);

  const totalCredit = useMemo(() => {
    return filteredCashFlow.reduce((sum, item) => sum + item.credit, 0);
  }, [filteredCashFlow]);

  const handleExportCSV = () => {
    const headers = [
      "Date",
      "Account",
      "Description",
      "Payment Method",
      "Payment details",
      "Debit",
      "Credit",
      "Account Balance",
      "Total Balance",
    ];
    const csvData = filteredCashFlow.map((item) => [
      item.date,
      item.account,
      item.description,
      item.paymentMethod,
      item.paymentDetails,
      item.debit,
      item.credit,
      item.accountBalance,
      item.totalBalance,
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `cash_flow_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success("Cash flow exported to CSV successfully");
  };

  const handleExportExcel = () => {
    message.info("Excel export will be available soon. Exporting as CSV for now.");
    handleExportCSV();
  };

  const handleExportPDF = () => {
    message.info("PDF export functionality coming soon");
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const tableHTML = `
      <html>
        <head>
          <title>Cash Flow Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #1f1f1f; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; font-weight: bold; }
            tr:nth-child(even) { background-color: #f9f9f9; }
            .debit, .credit { text-align: right; }
          </style>
        </head>
        <body>
          <h1>Cash Flow Report</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Account</th>
                <th>Description</th>
                <th>Payment Method</th>
                <th>Debit</th>
                <th>Credit</th>
                <th>Account Balance</th>
                <th>Total Balance</th>
              </tr>
            </thead>
            <tbody>
              ${filteredCashFlow
                .map(
                  (item) => `
                <tr>
                  <td>${item.date}</td>
                  <td>${item.account}</td>
                  <td>${item.description}</td>
                  <td>${item.paymentMethod}</td>
                  <td class="debit">TSh ${item.debit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  <td class="credit">TSh ${item.credit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  <td class="debit">TSh ${item.accountBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  <td class="debit">TSh ${item.totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;

    printWindow.document.write(tableHTML);
    printWindow.document.close();
    printWindow.print();
    message.success("Print dialog opened");
  };

  const handleColumnVisibilityChange = (key: string, visible: boolean) => {
    setColumnVisibility((prev) => ({ ...prev, [key]: visible }));
  };

  const columnVisibilityMenu: MenuProps = {
    items: Object.keys(columnVisibility).map((key) => ({
      key,
      label: (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Checkbox
            checked={columnVisibility[key]}
            onChange={(e) => handleColumnVisibilityChange(key, e.target.checked)}
            style={{ marginRight: "8px" }}
          />
          {key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())
            .trim()}
        </div>
      ),
    })),
  };

  const columns: ColumnsType<CashFlowData> = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
      render: (text: string) => (
        <Text
          style={{
            fontSize: "13px",
            color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
          }}
        >
          {dayjs(text).format("MM/DD/YYYY HH:mm")}
        </Text>
      ),
    },
    {
      title: "Account",
      dataIndex: "account",
      key: "account",
      sorter: (a, b) => a.account.localeCompare(b.account),
      render: (text: string) => (
        <Text
          style={{
            fontSize: "13px",
            color: isDark ? "#fff" : "#1f1f1f",
            fontWeight: 500,
          }}
        >
          {text}
        </Text>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      sorter: (a, b) => a.description.localeCompare(b.description),
      render: (text: string) => (
        <Text
          style={{
            fontSize: "13px",
            color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
          }}
        >
          {text}
        </Text>
      ),
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      sorter: (a, b) => a.paymentMethod.localeCompare(b.paymentMethod),
      render: (text: string) => (
        <Text
          style={{
            fontSize: "13px",
            color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
          }}
        >
          {text}
        </Text>
      ),
    },
    {
      title: "Payment details",
      dataIndex: "paymentDetails",
      key: "paymentDetails",
      render: (text: string) => (
        <Text
          style={{
            fontSize: "13px",
            color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
          }}
        >
          {text}
        </Text>
      ),
    },
    {
      title: "Debit",
      dataIndex: "debit",
      key: "debit",
      align: "right",
      sorter: (a, b) => a.debit - b.debit,
      render: (value: number) => (
        <Text
          style={{
            fontSize: "13px",
            color: value > 0 ? (isDark ? "#fff" : "#1f1f1f") : (isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c"),
            fontWeight: value > 0 ? 500 : 400,
          }}
        >
          {value > 0
            ? `TSh ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
            : "TSh 0.00"}
        </Text>
      ),
    },
    {
      title: "Credit",
      dataIndex: "credit",
      key: "credit",
      align: "right",
      sorter: (a, b) => a.credit - b.credit,
      render: (value: number) => (
        <Text
          style={{
            fontSize: "13px",
            color: value > 0 ? (isDark ? "#fff" : "#1f1f1f") : (isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c"),
            fontWeight: value > 0 ? 500 : 400,
          }}
        >
          {value > 0
            ? `TSh ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
            : "TSh 0.00"}
        </Text>
      ),
    },
    {
      title: (
        <Space>
          <span>Account Balance</span>
          <Tooltip title="Balance for this specific account">
            <InfoCircleOutlined
              style={{
                fontSize: "12px",
                color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
              }}
            />
          </Tooltip>
        </Space>
      ),
      dataIndex: "accountBalance",
      key: "accountBalance",
      align: "right",
      sorter: (a, b) => a.accountBalance - b.accountBalance,
      render: (value: number) => (
        <Text
          style={{
            fontSize: "13px",
            color: value < 0 ? "#ff4d4f" : (isDark ? "rgba(255,255,255,0.85)" : "#595959"),
            fontWeight: 500,
          }}
        >
          TSh {value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </Text>
      ),
    },
    {
      title: (
        <Space>
          <span>Total Balance</span>
          <Tooltip title="Cumulative total balance across all accounts">
            <InfoCircleOutlined
              style={{
                fontSize: "12px",
                color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
              }}
            />
          </Tooltip>
        </Space>
      ),
      dataIndex: "totalBalance",
      key: "totalBalance",
      align: "right",
      sorter: (a, b) => a.totalBalance - b.totalBalance,
      render: (value: number) => (
        <Text
          style={{
            fontSize: "13px",
            color: value < 0 ? "#ff4d4f" : (isDark ? "rgba(255,255,255,0.85)" : "#595959"),
            fontWeight: 500,
          }}
        >
          TSh {value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </Text>
      ),
    },
  ];

  // Filter columns based on visibility
  const visibleColumns = columns.filter((col) => {
    if (!col.key) return true;
    return columnVisibility[col.key as string] !== false;
  });

  return (
    <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
      {/* Header Section */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24}>
          <Title
            level={2}
            style={{
              margin: 0,
              color: isDark ? "#fff" : "#1f1f1f",
              fontWeight: 600,
            }}
          >
            Cash Flow
          </Title>
        </Col>
      </Row>

      {/* Filters Section */}
      <FilterPanel
        filters={filterConfig}
        onFilterChange={setFilterConfig}
        defaultExpanded={true}
      />

      {/* Table Section */}
      <Card
        style={{
          background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
          border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
          borderRadius: "8px",
          overflow: "hidden",
          maxWidth: "100%",
        }}
        bodyStyle={{ padding: "24px", overflow: "hidden" }}
      >
        {/* Table Controls */}
        <Row gutter={[16, 16]} style={{ marginBottom: "16px" }} align="middle">
          <Col xs={24} sm={24} md={12} lg={12}>
            <Select
              value={pageSize}
              onChange={setPageSize}
              style={{ width: 150 }}
              suffixIcon={<DownOutlined />}
            >
              <Select.Option value={10}>Show 10 entries</Select.Option>
              <Select.Option value={25}>Show 25 entries</Select.Option>
              <Select.Option value={50}>Show 50 entries</Select.Option>
              <Select.Option value={100}>Show 100 entries</Select.Option>
            </Select>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Space
              style={{
                width: "100%",
                justifyContent: "flex-end",
                flexWrap: "wrap",
              }}
            >
              <Button
                icon={<FileTextOutlined />}
                onClick={handleExportCSV}
                style={{
                  height: "40px",
                  borderRadius: "6px",
                  fontWeight: 500,
                  background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                  border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                  color: isDark ? "#fff" : "#1f1f1f",
                }}
              >
                Export to CSV
              </Button>
              <Button
                icon={<FileExcelOutlined />}
                onClick={handleExportExcel}
                style={{
                  height: "40px",
                  borderRadius: "6px",
                  fontWeight: 500,
                  background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                  border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                  color: isDark ? "#fff" : "#1f1f1f",
                }}
              >
                Export to Excel
              </Button>
              <Button
                icon={<PrinterOutlined />}
                onClick={handlePrint}
                style={{
                  height: "40px",
                  borderRadius: "6px",
                  fontWeight: 500,
                  background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                  border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                  color: isDark ? "#fff" : "#1f1f1f",
                }}
              >
                Print
              </Button>
              <Dropdown
                menu={columnVisibilityMenu}
                trigger={["click"]}
                placement="bottomRight"
              >
                <Button
                  icon={<UnorderedListOutlined />}
                  style={{
                    height: "40px",
                    borderRadius: "6px",
                    fontWeight: 500,
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                    color: isDark ? "#fff" : "#1f1f1f",
                  }}
                >
                  Column visibility
                </Button>
              </Dropdown>
              <Button
                icon={<FilePdfOutlined />}
                onClick={handleExportPDF}
                style={{
                  height: "40px",
                  borderRadius: "6px",
                  fontWeight: 500,
                  background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                  border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                  color: isDark ? "#fff" : "#1f1f1f",
                }}
              >
                Export to PDF
              </Button>
              <Search
                placeholder="Search..."
                allowClear
                enterButton={
                  <Button
                    type="primary"
                    icon={<SearchOutlined />}
                    style={{
                      height: "40px",
                      borderRadius: "0 6px 6px 0",
                    }}
                  />
                }
                size="large"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onSearch={(value) => setSearchText(value)}
                style={{
                  width: 200,
                }}
              />
            </Space>
          </Col>
        </Row>

        <Table
          columns={visibleColumns}
          dataSource={filteredCashFlow}
          loading={loading}
          scroll={{ x: "max-content" }}
          pagination={{
            pageSize,
            showSizeChanger: false,
            showTotal: (total, range) =>
              `Showing ${range[0]} to ${range[1]} of ${total} entries`,
            style: {
              marginTop: "16px",
              color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
            },
          }}
          locale={{
            emptyText: (
              <div style={{ padding: "40px", textAlign: "center" }}>
                <Text
                  style={{
                    fontSize: "14px",
                    color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                  }}
                >
                  No data available in table
                </Text>
              </div>
            ),
          }}
          style={{
            width: "100%",
          }}
          summary={() => {
            return (
              <Table.Summary fixed>
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0} colSpan={visibleColumns.length - 2}>
                    <Text
                      strong
                      style={{
                        fontSize: "14px",
                        color: isDark ? "#fff" : "#1f1f1f",
                      }}
                    >
                      Total:
                    </Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={1} align="right">
                    <Text
                      strong
                      style={{
                        fontSize: "14px",
                        color: isDark ? "#fff" : "#1f1f1f",
                      }}
                    >
                      TSh {totalDebit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={2} align="right">
                    <Text
                      strong
                      style={{
                        fontSize: "14px",
                        color: isDark ? "#fff" : "#1f1f1f",
                      }}
                    >
                      TSh {totalCredit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Text>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </Table.Summary>
            );
          }}
        />
      </Card>
    </div>
  );
};

export default CashFlow;

