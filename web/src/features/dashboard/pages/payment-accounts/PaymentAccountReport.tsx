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
  LinkOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import useTheme from "@/theme/useTheme";
import { FilterPanel } from "../../components/filters";
import type { FilterConfig } from "../../components/filters";
import dayjs, { type Dayjs } from "dayjs";

const { Title, Text } = Typography;
const { Search } = Input;

export interface PaymentAccountReportData {
  key: string;
  date: string;
  paymentRefNo: string;
  invoiceNo: string;
  amount: number;
  paymentType: string;
  account?: string;
  description: string;
}

const PaymentAccountReport: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(25);

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
    dateRange: {
      label: "Date Range:",
      value: [dayjs("2025-01-01"), dayjs("2025-12-31")] as [Dayjs, Dayjs],
    },
  });

  // Mock data - replace with API call
  const defaultPayments: PaymentAccountReportData[] = [
    {
      key: "1",
      date: "2025-10-14 12:54",
      paymentRefNo: "SP2025/0001",
      invoiceNo: "0000",
      amount: 50000.00,
      paymentType: "Sell",
      description: "Customer: Kamgisha customer",
    },
    {
      key: "2",
      date: "2025-10-14 13:12",
      paymentRefNo: "SP2025/0002",
      invoiceNo: "0001",
      amount: 1900000.00,
      paymentType: "Sell",
      description: "Customer: Kamgisha customer",
    },
    {
      key: "3",
      date: "2025-10-14 13:18",
      paymentRefNo: "SP2025/0003",
      invoiceNo: "0002",
      amount: 400000.00,
      paymentType: "Sell",
      description: "Customer: Kamgisha customer",
    },
    {
      key: "4",
      date: "2025-10-14 15:52",
      paymentRefNo: "SP2025/0004",
      invoiceNo: "0004",
      amount: 298000.00,
      paymentType: "Sell",
      description: "Customer: Customers",
    },
    {
      key: "5",
      date: "2025-10-20 17:40",
      paymentRefNo: "SP2025/0005",
      invoiceNo: "0005",
      amount: 100000.00,
      paymentType: "Sell",
      description: "Customer: Customers",
    },
    {
      key: "6",
      date: "2025-10-20 17:42",
      paymentRefNo: "SP2025/0006",
      invoiceNo: "0006",
      amount: 95000.00,
      paymentType: "Sell",
      description: "Customer: Customers",
    },
    {
      key: "7",
      date: "2025-11-06 21:24",
      paymentRefNo: "SP2025/0007",
      invoiceNo: "0007",
      amount: 850000.00,
      paymentType: "Sell",
      description: "Customer: Customers",
    },
    {
      key: "8",
      date: "2025-12-17 23:55",
      paymentRefNo: "SP2025/0008",
      invoiceNo: "0008",
      amount: 150000.00,
      paymentType: "Sell",
      description: "Customer: Customers",
    },
  ];

  const [payments, setPayments] = useState<PaymentAccountReportData[]>(defaultPayments);

  // Filter payments based on search text and filters
  const filteredPayments = useMemo(() => {
    let filtered = payments;

    // Apply account filter
    if (filterConfig.account?.value && filterConfig.account.value !== "all") {
      // For now, all payments are shown as they don't have accounts linked
      // This would filter by account when accounts are linked
    }

    // Apply date range filter
    if (filterConfig.dateRange?.value) {
      const [startDate, endDate] = filterConfig.dateRange.value;
      filtered = filtered.filter((payment) => {
        const paymentDate = dayjs(payment.date);
        return paymentDate.isAfter(startDate.subtract(1, "day")) && paymentDate.isBefore(endDate.add(1, "day"));
      });
    }

    // Apply search filter
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(
        (payment) =>
          payment.paymentRefNo.toLowerCase().includes(searchLower) ||
          payment.invoiceNo.toLowerCase().includes(searchLower) ||
          payment.description.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [payments, searchText, filterConfig]);

  const handleLinkAccount = (record: PaymentAccountReportData) => {
    message.info(`Link account functionality for ${record.paymentRefNo} coming soon`);
  };

  const handleExportCSV = () => {
    const headers = [
      "Date",
      "Payment Ref No.",
      "Invoice No./Ref. No.",
      "Amount",
      "Payment Type",
      "Account",
      "Description",
    ];
    const csvData = filteredPayments.map((payment) => [
      payment.date,
      payment.paymentRefNo,
      payment.invoiceNo,
      payment.amount,
      payment.paymentType,
      payment.account || "",
      payment.description,
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `payment_account_report_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success("Payment account report exported to CSV successfully");
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
          <title>Payment Account Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #1f1f1f; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; font-weight: bold; }
            tr:nth-child(even) { background-color: #f9f9f9; }
          </style>
        </head>
        <body>
          <h1>Payment Account Report</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Payment Ref No.</th>
                <th>Invoice No./Ref. No.</th>
                <th>Amount</th>
                <th>Payment Type</th>
                <th>Account</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              ${filteredPayments
                .map(
                  (payment) => `
                <tr>
                  <td>${payment.date}</td>
                  <td>${payment.paymentRefNo}</td>
                  <td>${payment.invoiceNo}</td>
                  <td>TSh ${payment.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  <td>${payment.paymentType}</td>
                  <td>${payment.account || ""}</td>
                  <td>${payment.description}</td>
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
    // Column visibility functionality
  };

  const columnVisibilityMenu: MenuProps = {
    items: [
      { key: "date", label: "Date" },
      { key: "paymentRefNo", label: "Payment Ref No." },
      { key: "invoiceNo", label: "Invoice No./Ref. No." },
      { key: "amount", label: "Amount" },
      { key: "paymentType", label: "Payment Type" },
      { key: "account", label: "Account" },
      { key: "description", label: "Description" },
      { key: "action", label: "Action" },
    ].map((item) => ({
      key: item.key,
      label: (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Checkbox
            defaultChecked
            onChange={(e) => handleColumnVisibilityChange(item.key, e.target.checked)}
            style={{ marginRight: "8px" }}
          />
          {item.label}
        </div>
      ),
    })),
  };

  const columns: ColumnsType<PaymentAccountReportData> = [
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
      title: "Payment Ref No.",
      dataIndex: "paymentRefNo",
      key: "paymentRefNo",
      sorter: (a, b) => a.paymentRefNo.localeCompare(b.paymentRefNo),
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
      title: "Invoice No./Ref. No.",
      dataIndex: "invoiceNo",
      key: "invoiceNo",
      sorter: (a, b) => a.invoiceNo.localeCompare(b.invoiceNo),
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
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      align: "right",
      sorter: (a, b) => a.amount - b.amount,
      render: (value: number) => (
        <Text
          style={{
            fontSize: "13px",
            color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
          }}
        >
          TSh {value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </Text>
      ),
    },
    {
      title: "Payment Type",
      dataIndex: "paymentType",
      key: "paymentType",
      sorter: (a, b) => a.paymentType.localeCompare(b.paymentType),
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
      title: "Account",
      dataIndex: "account",
      key: "account",
      render: (text: string) => (
        <Text
          style={{
            fontSize: "13px",
            color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
          }}
        >
          {text || "-"}
        </Text>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
      title: "Action",
      key: "action",
      width: 150,
      fixed: "right",
      render: (_, record) => (
        <Button
          type="link"
          icon={<LinkOutlined />}
          onClick={() => handleLinkAccount(record)}
          style={{
            padding: 0,
            height: "auto",
            color: isDark ? "#1890ff" : "#1890ff",
          }}
        >
          Link Account
        </Button>
      ),
    },
  ];

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
            Payment Account Report
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
          columns={columns}
          dataSource={filteredPayments}
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
        />
      </Card>
    </div>
  );
};

export default PaymentAccountReport;

