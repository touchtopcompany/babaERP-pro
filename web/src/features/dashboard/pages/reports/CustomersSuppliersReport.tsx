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
  InfoCircleOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import useTheme from "@/theme/useTheme";
import { FilterPanel } from "../../components/filters";
import type { FilterConfig } from "../../components/filters";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { Search } = Input;

interface ContactReportRow {
  key: string;
  contact: string;
  totalPurchase: number;
  totalPurchaseReturn: number;
  totalSale: number;
  totalSellReturn: number;
  openingBalanceDue: number;
  due: number;
}

const formatCurrency = (value: number) =>
  `TSh ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const CustomersSuppliersReport: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(25);
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    contact: true,
    totalPurchase: true,
    totalPurchaseReturn: true,
    totalSale: true,
    totalSellReturn: true,
    openingBalanceDue: true,
    due: true,
  });

  const [filterConfig, setFilterConfig] = useState<FilterConfig>({
    customerGroup: {
      label: "Customer Group Name:",
      value: "all",
      options: [
        { label: "All", value: "all" },
        { label: "Retail", value: "retail" },
        { label: "Wholesale", value: "wholesale" },
        { label: "Corporate", value: "corporate" },
      ],
    },
    contactType: {
      label: "Type:",
      value: "all",
      options: [
        { label: "All", value: "all" },
        { label: "Customer", value: "customer" },
        { label: "Supplier", value: "supplier" },
      ],
    },
    businessLocation: {
      label: "Location:",
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
        { label: "Acme Corp", value: "acme" },
        { label: "Beta Ltd", value: "beta" },
        { label: "Gamma Inc", value: "gamma" },
        { label: "Tech Supplies Ltd", value: "tech_supplies" },
        { label: "Office Solutions", value: "office_sol" },
      ],
    },
    dateRange: {
      label: "Date Range:",
      value: [dayjs("2026-01-01"), dayjs("2026-12-31")],
    },
  });

  // Mock data - replace with API
  const mockData: ContactReportRow[] = [
    { key: "1", contact: "Acme Corp", totalPurchase: 4250000, totalPurchaseReturn: 180000, totalSale: 8900000, totalSellReturn: 320000, openingBalanceDue: 150000, due: 420000 },
    { key: "2", contact: "Beta Ltd", totalPurchase: 2100000, totalPurchaseReturn: 95000, totalSale: 5600000, totalSellReturn: 140000, openingBalanceDue: 0, due: 185000 },
    { key: "3", contact: "Gamma Inc", totalPurchase: 6800000, totalPurchaseReturn: 420000, totalSale: 12400000, totalSellReturn: 580000, openingBalanceDue: 320000, due: 710000 },
    { key: "4", contact: "Tech Supplies Ltd", totalPurchase: 3500000, totalPurchaseReturn: 0, totalSale: 0, totalSellReturn: 0, openingBalanceDue: 0, due: 275000 },
    { key: "5", contact: "Office Solutions", totalPurchase: 1200000, totalPurchaseReturn: 45000, totalSale: 2100000, totalSellReturn: 80000, openingBalanceDue: 50000, due: 92000 },
    { key: "6", contact: "Global Traders", totalPurchase: 5200000, totalPurchaseReturn: 210000, totalSale: 7800000, totalSellReturn: 290000, openingBalanceDue: 180000, due: 390000 },
    { key: "7", contact: "Metro Retail", totalPurchase: 0, totalPurchaseReturn: 0, totalSale: 15600000, totalSellReturn: 420000, openingBalanceDue: 0, due: 680000 },
    { key: "8", contact: "Prime Suppliers", totalPurchase: 9400000, totalPurchaseReturn: 380000, totalSale: 0, totalSellReturn: 0, openingBalanceDue: 450000, due: 520000 },
    { key: "9", contact: "City Wholesale", totalPurchase: 3100000, totalPurchaseReturn: 120000, totalSale: 6700000, totalSellReturn: 195000, openingBalanceDue: 90000, due: 245000 },
    { key: "10", contact: "Elite Distributors", totalPurchase: 7700000, totalPurchaseReturn: 290000, totalSale: 9800000, totalSellReturn: 360000, openingBalanceDue: 220000, due: 410000 },
    { key: "11", contact: "Quick Mart", totalPurchase: 0, totalPurchaseReturn: 0, totalSale: 4300000, totalSellReturn: 110000, openingBalanceDue: 0, due: 125000 },
    { key: "12", contact: "Industrial Parts Co", totalPurchase: 5800000, totalPurchaseReturn: 0, totalSale: 0, totalSellReturn: 0, openingBalanceDue: 310000, due: 380000 },
    { key: "13", contact: "Fashion Outlet", totalPurchase: 1900000, totalPurchaseReturn: 78000, totalSale: 5200000, totalSellReturn: 165000, openingBalanceDue: 0, due: 198000 },
    { key: "14", contact: "BuildMart Ltd", totalPurchase: 6200000, totalPurchaseReturn: 250000, totalSale: 3400000, totalSellReturn: 95000, openingBalanceDue: 140000, due: 295000 },
    { key: "15", contact: "Fresh Foods Co", totalPurchase: 4100000, totalPurchaseReturn: 165000, totalSale: 8900000, totalSellReturn: 280000, openingBalanceDue: 0, due: 335000 },
  ];

  const filteredData = useMemo(() => {
    if (!searchText.trim()) return mockData;
    const q = searchText.toLowerCase();
    return mockData.filter((r) => r.contact.toLowerCase().includes(q));
  }, [searchText]);

  const totals = useMemo(
    () => ({
      totalPurchase: filteredData.reduce((s, r) => s + r.totalPurchase, 0),
      totalPurchaseReturn: filteredData.reduce((s, r) => s + r.totalPurchaseReturn, 0),
      totalSale: filteredData.reduce((s, r) => s + r.totalSale, 0),
      totalSellReturn: filteredData.reduce((s, r) => s + r.totalSellReturn, 0),
      openingBalanceDue: filteredData.reduce((s, r) => s + r.openingBalanceDue, 0),
      due: filteredData.reduce((s, r) => s + r.due, 0),
    }),
    [filteredData]
  );

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html><head><title>Customers & Suppliers Reports</title>
      <style>body{font-family:Arial;padding:20px;} table{width:100%;border-collapse:collapse;} th,td{border:1px solid #ddd;padding:8px;} th{background:#f2f2f2;}
      </style></head><body>
      <h1>Customers & Suppliers Reports</h1>
      <p>Generated: ${new Date().toLocaleString()}</p>
      <table>
      <tr><th>Contact</th><th>Total Purchase</th><th>Total Purchase Return</th><th>Total Sale</th><th>Total Sell Return</th><th>Opening Balance Due</th><th>Due</th></tr>
      ${filteredData.map((r) => `<tr><td>${r.contact}</td><td>${formatCurrency(r.totalPurchase)}</td><td>${formatCurrency(r.totalPurchaseReturn)}</td><td>${formatCurrency(r.totalSale)}</td><td>${formatCurrency(r.totalSellReturn)}</td><td>${formatCurrency(r.openingBalanceDue)}</td><td>${formatCurrency(r.due)}</td></tr>`).join("")}
      <tr><td><strong>Total:</strong></td><td><strong>${formatCurrency(totals.totalPurchase)}</strong></td><td><strong>${formatCurrency(totals.totalPurchaseReturn)}</strong></td><td><strong>${formatCurrency(totals.totalSale)}</strong></td><td><strong>${formatCurrency(totals.totalSellReturn)}</strong></td><td><strong>${formatCurrency(totals.openingBalanceDue)}</strong></td><td><strong>${formatCurrency(totals.due)}</strong></td></tr>
      </table></body></html>
    `);
    printWindow.document.close();
    printWindow.print();
    message.success("Print dialog opened");
  };

  const handleExportCSV = () => {
    const headers = ["Contact", "Total Purchase", "Total Purchase Return", "Total Sale", "Total Sell Return", "Opening Balance Due", "Due"];
    const rows = filteredData.map((r) => [r.contact, r.totalPurchase, r.totalPurchaseReturn, r.totalSale, r.totalSellReturn, r.openingBalanceDue, r.due]);
    const csv = [headers.join(","), ...rows.map((r) => r.map((c) => `"${c}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `customers_suppliers_report_${dayjs().format("YYYY-MM-DD")}.csv`;
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
          {key === "totalPurchase" ? "Total Purchase" : key === "totalPurchaseReturn" ? "Total Purchase Return" : key === "totalSale" ? "Total Sale" : key === "totalSellReturn" ? "Total Sell Return" : key === "openingBalanceDue" ? "Opening Balance Due" : key === "due" ? "Due" : "Contact"}
        </div>
      ),
    })),
  };

  const DueTitle = () => (
    <span>
      Due
      <Tooltip title="Outstanding amount to be received from customers or paid to suppliers within the selected period">
        <InfoCircleOutlined style={{ color: "#1890ff", marginLeft: 6, fontSize: 14 }} />
      </Tooltip>
    </span>
  );

  const columns: ColumnsType<ContactReportRow> = [
    { title: "Contact", dataIndex: "contact", key: "contact", width: 180, sorter: (a, b) => a.contact.localeCompare(b.contact), render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
    { title: "Total Purchase", dataIndex: "totalPurchase", key: "totalPurchase", width: 140, align: "right", sorter: (a, b) => a.totalPurchase - b.totalPurchase, render: (v: number) => <Text style={{ fontSize: 13 }}>{formatCurrency(v)}</Text> },
    { title: "Total Purchase Return", dataIndex: "totalPurchaseReturn", key: "totalPurchaseReturn", width: 160, align: "right", sorter: (a, b) => a.totalPurchaseReturn - b.totalPurchaseReturn, render: (v: number) => <Text style={{ fontSize: 13 }}>{formatCurrency(v)}</Text> },
    { title: "Total Sale", dataIndex: "totalSale", key: "totalSale", width: 140, align: "right", sorter: (a, b) => a.totalSale - b.totalSale, render: (v: number) => <Text style={{ fontSize: 13 }}>{formatCurrency(v)}</Text> },
    { title: "Total Sell Return", dataIndex: "totalSellReturn", key: "totalSellReturn", width: 150, align: "right", sorter: (a, b) => a.totalSellReturn - b.totalSellReturn, render: (v: number) => <Text style={{ fontSize: 13 }}>{formatCurrency(v)}</Text> },
    { title: "Opening Balance Due", dataIndex: "openingBalanceDue", key: "openingBalanceDue", width: 160, align: "right", sorter: (a, b) => a.openingBalanceDue - b.openingBalanceDue, render: (v: number) => <Text style={{ fontSize: 13 }}>{formatCurrency(v)}</Text> },
    { title: <DueTitle />, dataIndex: "due", key: "due", width: 140, align: "right", sorter: (a, b) => a.due - b.due, render: (v: number) => <Text style={{ fontSize: 13, fontWeight: 500 }}>{formatCurrency(v)}</Text> },
  ];

  const visibleColumns = columns.filter((col) => col.key && columnVisibility[col.key as string] !== false);

  return (
    <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
      <Title level={2} style={{ marginBottom: 24, color: isDark ? "#fff" : "#1f1f1f", fontWeight: 600 }}>
        Customers & Suppliers Reports
      </Title>

      <FilterPanel filters={filterConfig} onFilterChange={setFilterConfig} defaultExpanded={true} />

      <Card
        style={{
          background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
          border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
          borderRadius: 8,
          overflow: "hidden",
        }}
        styles={{ body: { padding: "24px" } }}
      >
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
            <Table.Summary fixed>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>
                  <Text strong>Total:</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1} align="right">
                  <Text strong>{formatCurrency(totals.totalPurchase)}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2} align="right">
                  <Text strong>{formatCurrency(totals.totalPurchaseReturn)}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={3} align="right">
                  <Text strong>{formatCurrency(totals.totalSale)}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={4} align="right">
                  <Text strong>{formatCurrency(totals.totalSellReturn)}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={5} align="right">
                  <Text strong>{formatCurrency(totals.openingBalanceDue)}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={6} align="right">
                  <Text strong>{formatCurrency(totals.due)}</Text>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          )}
        />
      </Card>
    </div>
  );
};

export default CustomersSuppliersReport;
