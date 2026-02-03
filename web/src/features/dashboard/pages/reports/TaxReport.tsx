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
  Tabs,
  Select,
  Dropdown,
  Checkbox,
  Tooltip,
} from "antd";
import type { MenuProps } from "antd";
import {
  PrinterOutlined,
  SearchOutlined,
  FileTextOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  UnorderedListOutlined,
  DownOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
  MinusOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import useTheme from "@/theme/useTheme";
import { FilterPanel } from "../../components/filters";
import type { FilterConfig } from "../../components/filters";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { Search } = Input;

interface TaxRow {
  key: string;
  date: string;
  referenceNo: string;
  supplier: string;
  taxNumber: string;
  totalAmount: number;
  paymentMethod: string;
  discount: number;
}

const formatCurrency = (value: number) =>
  `TSh ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const TaxReport: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeTab, setActiveTab] = useState("input");
  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(25);
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    date: true,
    referenceNo: true,
    supplier: true,
    taxNumber: true,
    totalAmount: true,
    paymentMethod: true,
    discount: true,
  });

  const [filterConfig, setFilterConfig] = useState<FilterConfig>({
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
    contact: {
      label: "Contact:",
      value: "all",
      options: [
        { label: "All", value: "all" },
        { label: "Supplier A", value: "supplier_a" },
        { label: "Supplier B", value: "supplier_b" },
        { label: "Customer X", value: "customer_x" },
      ],
    },
    dateRange: {
      label: "Date Range:",
      value: [dayjs("2026-01-01"), dayjs("2026-12-31")],
    },
  });

  // Mock overall tax (Output - Input - Expense)
  const inputTaxTotal = 1850000.00;
  const outputTaxTotal = 3200000.00;
  const expenseTaxTotal = 450000.00;
  const overallTax = outputTaxTotal - inputTaxTotal - expenseTaxTotal;

  // Mock table data per tab
  const inputTaxData: TaxRow[] = [
    { key: "1", date: "2026-01-05", referenceNo: "INV-2026-001", supplier: "Tech Supplies Ltd", taxNumber: "TIN-001", totalAmount: 1180000.00, paymentMethod: "Bank Transfer", discount: 0 },
    { key: "2", date: "2026-01-12", referenceNo: "INV-2026-002", supplier: "Office Solutions", taxNumber: "TIN-002", totalAmount: 590000.00, paymentMethod: "Cash", discount: 18000 },
    { key: "3", date: "2026-01-18", referenceNo: "INV-2026-003", supplier: "Global Traders", taxNumber: "TIN-003", totalAmount: 2360000.00, paymentMethod: "Bank Transfer", discount: 0 },
    { key: "4", date: "2026-01-22", referenceNo: "INV-2026-004", supplier: "Tech Supplies Ltd", taxNumber: "TIN-001", totalAmount: 885000.00, paymentMethod: "Mobile Money", discount: 27000 },
    { key: "5", date: "2026-01-28", referenceNo: "INV-2026-005", supplier: "Office Solutions", taxNumber: "TIN-002", totalAmount: 1475000.00, paymentMethod: "Bank Transfer", discount: 0 },
    { key: "6", date: "2026-02-02", referenceNo: "INV-2026-006", supplier: "Global Traders", taxNumber: "TIN-003", totalAmount: 708000.00, paymentMethod: "Credit Card", discount: 36000 },
    { key: "7", date: "2026-02-08", referenceNo: "INV-2026-007", supplier: "Tech Supplies Ltd", taxNumber: "TIN-001", totalAmount: 1770000.00, paymentMethod: "Bank Transfer", discount: 0 },
    { key: "8", date: "2026-02-14", referenceNo: "INV-2026-008", supplier: "Office Solutions", taxNumber: "TIN-002", totalAmount: 472000.00, paymentMethod: "Cash", discount: 9000 },
    { key: "9", date: "2026-02-20", referenceNo: "INV-2026-009", supplier: "Global Traders", taxNumber: "TIN-003", totalAmount: 2950000.00, paymentMethod: "Bank Transfer", discount: 45000 },
    { key: "10", date: "2026-02-25", referenceNo: "INV-2026-010", supplier: "Tech Supplies Ltd", taxNumber: "TIN-001", totalAmount: 590000.00, paymentMethod: "Mobile Money", discount: 0 },
  ];

  const outputTaxData: TaxRow[] = [
    { key: "o1", date: "2026-01-06", referenceNo: "SO-2026-001", supplier: "Acme Corp", taxNumber: "TIN-101", totalAmount: 1650000.00, paymentMethod: "Bank Transfer", discount: 0 },
    { key: "o2", date: "2026-01-14", referenceNo: "SO-2026-002", supplier: "Beta Ltd", taxNumber: "TIN-102", totalAmount: 825000.00, paymentMethod: "Cash", discount: 25000 },
    { key: "o3", date: "2026-01-20", referenceNo: "SO-2026-003", supplier: "Gamma Inc", taxNumber: "TIN-103", totalAmount: 3300000.00, paymentMethod: "Bank Transfer", discount: 0 },
    { key: "o4", date: "2026-01-25", referenceNo: "SO-2026-004", supplier: "Acme Corp", taxNumber: "TIN-101", totalAmount: 1237500.00, paymentMethod: "Mobile Money", discount: 37500 },
    { key: "o5", date: "2026-02-01", referenceNo: "SO-2026-005", supplier: "Beta Ltd", taxNumber: "TIN-102", totalAmount: 2062500.00, paymentMethod: "Bank Transfer", discount: 0 },
    { key: "o6", date: "2026-02-05", referenceNo: "SO-2026-006", supplier: "Gamma Inc", taxNumber: "TIN-103", totalAmount: 990000.00, paymentMethod: "Credit Card", discount: 50000 },
    { key: "o7", date: "2026-02-10", referenceNo: "SO-2026-007", supplier: "Acme Corp", taxNumber: "TIN-101", totalAmount: 2475000.00, paymentMethod: "Bank Transfer", discount: 0 },
    { key: "o8", date: "2026-02-16", referenceNo: "SO-2026-008", supplier: "Beta Ltd", taxNumber: "TIN-102", totalAmount: 660000.00, paymentMethod: "Cash", discount: 12000 },
    { key: "o9", date: "2026-02-22", referenceNo: "SO-2026-009", supplier: "Gamma Inc", taxNumber: "TIN-103", totalAmount: 4125000.00, paymentMethod: "Bank Transfer", discount: 63000 },
    { key: "o10", date: "2026-02-26", referenceNo: "SO-2026-010", supplier: "Acme Corp", taxNumber: "TIN-101", totalAmount: 825000.00, paymentMethod: "Mobile Money", discount: 0 },
  ];

  const expenseTaxData: TaxRow[] = [
    { key: "e1", date: "2026-01-07", referenceNo: "EXP-2026-001", supplier: "Utilities Co", taxNumber: "TIN-201", totalAmount: 180000.00, paymentMethod: "Bank Transfer", discount: 0 },
    { key: "e2", date: "2026-01-15", referenceNo: "EXP-2026-002", supplier: "Rent Office Ltd", taxNumber: "TIN-202", totalAmount: 450000.00, paymentMethod: "Bank Transfer", discount: 0 },
    { key: "e3", date: "2026-01-21", referenceNo: "EXP-2026-003", supplier: "Office Supplies Co", taxNumber: "TIN-203", totalAmount: 95000.00, paymentMethod: "Cash", discount: 5000 },
    { key: "e4", date: "2026-01-26", referenceNo: "EXP-2026-004", supplier: "Utilities Co", taxNumber: "TIN-201", totalAmount: 195000.00, paymentMethod: "Mobile Money", discount: 0 },
    { key: "e5", date: "2026-02-03", referenceNo: "EXP-2026-005", supplier: "Rent Office Ltd", taxNumber: "TIN-202", totalAmount: 450000.00, paymentMethod: "Bank Transfer", discount: 0 },
    { key: "e6", date: "2026-02-09", referenceNo: "EXP-2026-006", supplier: "Office Supplies Co", taxNumber: "TIN-203", totalAmount: 120000.00, paymentMethod: "Credit Card", discount: 8000 },
    { key: "e7", date: "2026-02-15", referenceNo: "EXP-2026-007", supplier: "Utilities Co", taxNumber: "TIN-201", totalAmount: 175000.00, paymentMethod: "Bank Transfer", discount: 0 },
    { key: "e8", date: "2026-02-21", referenceNo: "EXP-2026-008", supplier: "Rent Office Ltd", taxNumber: "TIN-202", totalAmount: 450000.00, paymentMethod: "Bank Transfer", discount: 0 },
    { key: "e9", date: "2026-02-27", referenceNo: "EXP-2026-009", supplier: "Office Supplies Co", taxNumber: "TIN-203", totalAmount: 88000.00, paymentMethod: "Cash", discount: 0 },
  ];

  const tableData = useMemo(() => {
    if (activeTab === "input") return inputTaxData;
    if (activeTab === "output") return outputTaxData;
    return expenseTaxData;
  }, [activeTab]);

  const filteredData = useMemo(() => {
    if (!searchText.trim()) return tableData;
    const q = searchText.toLowerCase();
    return tableData.filter(
      (r) =>
        r.referenceNo.toLowerCase().includes(q) ||
        r.supplier.toLowerCase().includes(q) ||
        r.taxNumber.toLowerCase().includes(q)
    );
  }, [tableData, searchText]);

  const totalAmountSum = useMemo(
    () => filteredData.reduce((sum, r) => sum + r.totalAmount, 0),
    [filteredData]
  );

  const tabItems = [
    { key: "input", label: "Input Tax", icon: <ArrowDownOutlined /> },
    { key: "output", label: "Output Tax", icon: <ArrowUpOutlined /> },
    { key: "expense", label: "Expense Tax", icon: <MinusOutlined /> },
  ];

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html><head><title>Tax Report</title>
      <style>body{font-family:Arial;padding:20px;} table{width:100%;border-collapse:collapse;} th,td{border:1px solid #ddd;padding:8px;} th{background:#f2f2f2;}
      </style></head><body>
      <h1>Tax Report</h1>
      <p>Tax details for the selected date range</p>
      <p>Overall: Output Tax - Input Tax - Expense Tax: ${formatCurrency(overallTax)}</p>
      <p>Generated: ${new Date().toLocaleString()}</p>
      <table><tr><th>Date</th><th>Reference No</th><th>Supplier</th><th>Tax number</th><th>Total amount</th><th>Payment Method</th><th>Discount</th></tr>
      ${filteredData.map((r) => `<tr><td>${r.date}</td><td>${r.referenceNo}</td><td>${r.supplier}</td><td>${r.taxNumber}</td><td>${formatCurrency(r.totalAmount)}</td><td>${r.paymentMethod}</td><td>${formatCurrency(r.discount)}</td></tr>`).join("")}
      <tr><td colspan="4"><strong>Total:</strong></td><td><strong>${formatCurrency(totalAmountSum)}</strong></td><td colspan="2"></td></tr>
      </table></body></html>
    `);
    printWindow.document.close();
    printWindow.print();
    message.success("Print dialog opened");
  };

  const handleExportCSV = () => {
    const headers = ["Date", "Reference No", "Supplier", "Tax number", "Total amount", "Payment Method", "Discount"];
    const rows = filteredData.map((r) => [r.date, r.referenceNo, r.supplier, r.taxNumber, r.totalAmount, r.paymentMethod, r.discount]);
    const csv = [headers.join(","), ...rows.map((r) => r.map((c) => `"${c}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `tax_report_${dayjs().format("YYYY-MM-DD")}.csv`;
    a.click();
    message.success("Exported to CSV");
  };

  const columnVisibilityMenu: MenuProps = {
    items: Object.keys(columnVisibility).map((key) => ({
      key,
      label: (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Checkbox
            checked={columnVisibility[key]}
            onChange={(e) => setColumnVisibility((p) => ({ ...p, [key]: e.target.checked }))}
            style={{ marginRight: 8 }}
          />
          {key === "referenceNo" ? "Reference No" : key === "taxNumber" ? "Tax number" : key === "totalAmount" ? "Total amount" : key === "paymentMethod" ? "Payment Method" : key.charAt(0).toUpperCase() + key.slice(1)}
        </div>
      ),
    })),
  };

  const contactColumnTitle = activeTab === "input" ? "Supplier" : activeTab === "output" ? "Customer" : "Payee";

  const columns: ColumnsType<TaxRow> = [
    { title: "Date", dataIndex: "date", key: "date", width: 120, sorter: (a, b) => a.date.localeCompare(b.date), render: (t: string) => <Text style={{ fontSize: 13, color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>{t}</Text> },
    { title: "Reference No", dataIndex: "referenceNo", key: "referenceNo", width: 140, sorter: (a, b) => a.referenceNo.localeCompare(b.referenceNo), render: (t: string) => <Text style={{ fontSize: 13, fontFamily: "monospace" }}>{t}</Text> },
    { title: contactColumnTitle, dataIndex: "supplier", key: "supplier", width: 180, sorter: (a, b) => a.supplier.localeCompare(b.supplier), render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
    { title: "Tax number", dataIndex: "taxNumber", key: "taxNumber", width: 120, sorter: (a, b) => a.taxNumber.localeCompare(b.taxNumber), render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
    { title: "Total amount", dataIndex: "totalAmount", key: "totalAmount", width: 140, align: "right", sorter: (a, b) => a.totalAmount - b.totalAmount, render: (v: number) => <Text style={{ fontSize: 13, fontWeight: 500 }}>{formatCurrency(v)}</Text> },
    { title: "Payment Method", dataIndex: "paymentMethod", key: "paymentMethod", width: 150, render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
    { title: "Discount", dataIndex: "discount", key: "discount", width: 120, align: "right", render: (v: number) => <Text style={{ fontSize: 13 }}>{formatCurrency(v)}</Text> },
  ];

  const visibleColumns = columns.filter((col) => col.key && columnVisibility[col.key as string] !== false);

  return (
    <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }} justify="space-between" align="middle">
        <Col>
          <Title level={2} style={{ margin: 0, color: isDark ? "#fff" : "#1f1f1f", fontWeight: 600 }}>
            Tax Report
          </Title>
          <Text style={{ fontSize: 14, color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", display: "block", marginTop: 4 }}>
            Tax details for the selected date range
          </Text>
        </Col>
        <Col>
          <Button type="primary" icon={<PrinterOutlined />} onClick={handlePrint} style={{ height: 40, borderRadius: 6, fontWeight: 500 }}>
            Print
          </Button>
        </Col>
      </Row>

      <FilterPanel filters={filterConfig} onFilterChange={setFilterConfig} defaultExpanded={true} />

      {/* Overall summary */}
      <Card
        style={{
          background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
          border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
          borderRadius: 8,
          marginBottom: 24,
        }}
        styles={{ body: { padding: "20px 24px" } }}
      >
        <Title level={5} style={{ margin: "0 0 8px 0", color: isDark ? "#fff" : "#1f1f1f", fontWeight: 600 }}>
          <span>
            Overall (Input - Output - Expense)
            <Tooltip title="Net tax position: Output Tax minus Input Tax minus Expense Tax">
              <InfoCircleOutlined style={{ color: "#1890ff", marginLeft: 6, fontSize: 14 }} />
            </Tooltip>
          </span>
        </Title>
        <Text style={{ fontSize: 14, color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>
          Output Tax - Input Tax - Expense Tax: <Text strong>{formatCurrency(overallTax)}</Text>
        </Text>
      </Card>

      {/* Tabs + Table */}
      <Card
        style={{
          background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
          border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
          borderRadius: 8,
          overflow: "hidden",
        }}
        styles={{ body: { padding: "0 24px 24px" } }}
      >
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems.map((tab) => ({
            key: tab.key,
            label: (
              <span>
                {tab.icon}
                <span style={{ marginLeft: 8 }}>{tab.label}</span>
              </span>
            ),
            children: (
              <>
                <Row gutter={[16, 16]} style={{ marginBottom: 16 }} align="middle">
                  <Col flex="none">
                    <Select
                      value={pageSize}
                      onChange={setPageSize}
                      options={[
                        { value: 10, label: "Show 10 entries" },
                        { value: 25, label: "Show 25 entries" },
                        { value: 50, label: "Show 50 entries" },
                        { value: 100, label: "Show 100 entries" },
                      ]}
                      style={{ width: 160 }}
                      suffixIcon={<DownOutlined />}
                    />
                  </Col>
                  <Col flex="auto">
                    <Space wrap>
                      <Button icon={<FileTextOutlined />} onClick={handleExportCSV} style={{ height: 40, borderRadius: 6 }}>Export to CSV</Button>
                      <Button icon={<FileExcelOutlined />} onClick={handleExportCSV} style={{ height: 40, borderRadius: 6 }}>Export to Excel</Button>
                      <Button icon={<PrinterOutlined />} onClick={handlePrint} style={{ height: 40, borderRadius: 6 }}>Print</Button>
                      <Dropdown menu={columnVisibilityMenu} trigger={["click"]} placement="bottomRight">
                        <Button icon={<UnorderedListOutlined />} style={{ height: 40, borderRadius: 6 }}>Column visibility</Button>
                      </Dropdown>
                      <Button icon={<FilePdfOutlined />} onClick={() => message.info("PDF export coming soon")} style={{ height: 40, borderRadius: 6 }}>Export to PDF</Button>
                      <Search
                        placeholder="Search..."
                        allowClear
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ width: 200 }}
                        addonAfter={<Button type="primary" icon={<SearchOutlined />} />}
                      />
                    </Space>
                  </Col>
                </Row>
                <Table
                  columns={visibleColumns}
                  dataSource={filteredData}
                  scroll={{ x: "max-content" }}
                  pagination={{
                    pageSize,
                    showSizeChanger: false,
                    showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                    style: { color: isDark ? "rgba(255,255,255,0.85)" : "#595959" },
                  }}
                  locale={{ emptyText: "No data available in table" }}
                  summary={() => (
                    <Table.Summary.Row>
                      <Table.Summary.Cell index={0} colSpan={4}>
                        <Text strong>Total:</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={1} align="right">
                        <Text strong>{formatCurrency(totalAmountSum)}</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={2} colSpan={2} />
                    </Table.Summary.Row>
                  )}
                />
              </>
            ),
          }))}
        />
      </Card>
    </div>
  );
};

export default TaxReport;
