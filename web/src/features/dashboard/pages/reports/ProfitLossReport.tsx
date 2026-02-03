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
  Alert,
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
  ShoppingOutlined,
  FolderOutlined,
  TagOutlined,
  EnvironmentOutlined,
  FileOutlined,
  CalendarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import useTheme from "@/theme/useTheme";
import { FilterPanel } from "../../components/filters";
import type { FilterConfig } from "../../components/filters";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { Search } = Input;

interface SummaryItem {
  label: string;
  value: number;
}

interface ProfitByRow {
  key: string;
  name: string;
  grossProfit: number;
}

const formatCurrency = (value: number) =>
  `TSh ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const ProfitLossReport: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeTab, setActiveTab] = useState("products");
  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(25);

  const [filterConfig, setFilterConfig] = useState<FilterConfig>({
    businessLocation: {
      label: "Location:",
      value: "all",
      type: "select",
      options: [
        { label: "All locations", value: "all" },
        { label: "C2Z Digital Solutions (C2Z1)", value: "C2Z Digital Solutions (C2Z1)" },
        { label: "Location 2", value: "Location 2" },
        { label: "Location 3", value: "Location 3" },
      ],
    },
    dateRange: {
      label: "Filter by date:",
      value: [dayjs().startOf("month"), dayjs().endOf("month")],
    },
  });

  // Mock summary data - left panel (purchase/expense)
  const leftSummary: SummaryItem[] = [
    { label: "Opening Stock (By purchase price)", value: 12500000.00 },
    { label: "Opening Stock (By sale price)", value: 15000000.00 },
    { label: "Total purchase: (Exc. tax, Discount)", value: 8500000.00 },
    { label: "Total Stock Adjustment", value: 120000.00 },
    { label: "Total Expense", value: 3200000.00 },
    { label: "Total purchase shipping charge", value: 180000.00 },
    { label: "Purchase additional expenses", value: 95000.00 },
    { label: "Total transfer shipping charge", value: 75000.00 },
    { label: "Total Sell discount", value: 420000.00 },
    { label: "Total customer reward", value: 150000.00 },
    { label: "Total Sell Return", value: 380000.00 },
  ];

  // Mock summary data - right panel (sales/recovery)
  const rightSummary: SummaryItem[] = [
    { label: "Closing stock (By purchase price)", value: 13200000.00 },
    { label: "Closing stock (By sale price)", value: 15800000.00 },
    { label: "Total Sales: (Exc. tax, Discount)", value: 28500000.00 },
    { label: "Total sell shipping charge", value: 420000.00 },
    { label: "Sell additional expenses", value: 120000.00 },
    { label: "Total Stock Recovered", value: 85000.00 },
    { label: "Total Purchase Return", value: 280000.00 },
    { label: "Total Purchase discount", value: 195000.00 },
    { label: "Total sell round off", value: 25000.00 },
  ];

  // Derived for formulas (mock)
  const totalSellPrice = 28500000.00;
  const totalPurchasePrice = 8500000.00 + 12500000.00 - 13200000.00; // opening + purchase - closing
  const grossProfit = totalSellPrice - totalPurchasePrice;
  const netProfit = grossProfit + 420000 + 120000 + 85000 + 195000 + 25000
    - (120000 + 3200000 + 180000 + 75000 + 95000 + 420000 + 150000);

  // Mock table data - Profit by products
  const profitByProductsData: ProfitByRow[] = [
    { key: "1", name: "Laptop Pro 15", grossProfit: 450000.00 },
    { key: "2", name: "Wireless Mouse", grossProfit: 125000.00 },
    { key: "3", name: "USB-C Hub", grossProfit: 89000.00 },
    { key: "4", name: "Monitor 24\"", grossProfit: 320000.00 },
    { key: "5", name: "Keyboard Mechanical", grossProfit: 156000.00 },
    { key: "6", name: "Webcam HD", grossProfit: 78000.00 },
    { key: "7", name: "Headset Pro", grossProfit: 210000.00 },
    { key: "8", name: "SSD 512GB", grossProfit: 95000.00 },
    { key: "9", name: "Docking Station", grossProfit: 185000.00 },
    { key: "10", name: "Screen Protector", grossProfit: 45000.00 },
    { key: "11", name: "Laptop Bag", grossProfit: 62000.00 },
    { key: "12", name: "HDMI Cable", grossProfit: 28000.00 },
    { key: "13", name: "Tablet 10\"", grossProfit: 275000.00 },
    { key: "14", name: "Phone Stand", grossProfit: 35000.00 },
    { key: "15", name: "Power Bank", grossProfit: 58000.00 },
  ];

  const [tableData, setTableData] = useState<ProfitByRow[]>(profitByProductsData);

  const filteredTableData = useMemo(() => {
    if (!searchText.trim()) return tableData;
    const q = searchText.toLowerCase();
    return tableData.filter(
      (row) => row.name.toLowerCase().includes(q)
    );
  }, [tableData, searchText]);

  const totalGrossProfit = useMemo(
    () => filteredTableData.reduce((sum, r) => sum + r.grossProfit, 0),
    [filteredTableData]
  );

  const tabItems = [
    { key: "products", label: "Profit by products", icon: <ShoppingOutlined /> },
    { key: "categories", label: "Profit by categories", icon: <FolderOutlined /> },
    { key: "brands", label: "Profit by brands", icon: <TagOutlined /> },
    { key: "locations", label: "Profit by locations", icon: <EnvironmentOutlined /> },
    { key: "invoice", label: "Profit by invoice", icon: <FileOutlined /> },
    { key: "date", label: "Profit by date", icon: <CalendarOutlined /> },
    { key: "customer", label: "Profit by customer", icon: <UserOutlined /> },
    { key: "day", label: "Profit by day", icon: <CalendarOutlined /> },
  ];

  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    name: true,
    grossProfit: true,
  });

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html><head><title>Profit / Loss Report</title>
      <style>body{font-family:Arial;padding:20px;} h1{} table{width:100%;border-collapse:collapse;} th,td{border:1px solid #ddd;padding:8px;} th{background:#f2f2f2;}
      </style></head><body>
      <h1>Profit / Loss Report</h1>
      <p>Generated: ${new Date().toLocaleString()}</p>
      <p>Gross Profit: ${formatCurrency(grossProfit)}</p>
      <p>Net Profit: ${formatCurrency(netProfit)}</p>
      <table><tr><th>Product</th><th>Gross Profit</th></tr>
      ${filteredTableData.map((r) => `<tr><td>${r.name}</td><td>${formatCurrency(r.grossProfit)}</td></tr>`).join("")}
      <tr><td><strong>Total</strong></td><td><strong>${formatCurrency(totalGrossProfit)}</strong></td></tr>
      </table></body></html>
    `);
    printWindow.document.close();
    printWindow.print();
    message.success("Print dialog opened");
  };

  const handleExportCSV = () => {
    const headers = ["Product", "Gross Profit"];
    const rows = filteredTableData.map((r) => [r.name, r.grossProfit]);
    const csv = [headers.join(","), ...rows.map((r) => r.map((c) => `"${c}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `profit_loss_${dayjs().format("YYYY-MM-DD")}.csv`;
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
          {key === "name" ? "Product" : "Gross Profit"}
        </div>
      ),
    })),
  };

  const summaryRowStyle = {
    padding: "10px 12px",
    background: isDark ? "rgba(255,255,255,0.06)" : "#fafafa",
    borderRadius: "6px",
    textAlign: "right" as const,
    minWidth: 120,
    fontSize: "13px",
    color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
    fontWeight: 500,
  };

  const columns: ColumnsType<ProfitByRow> = [
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (t: string) => (
        <Text style={{ fontSize: "13px", color: isDark ? "#fff" : "#1f1f1f" }}>{t}</Text>
      ),
    },
    {
      title: "Gross Profit",
      dataIndex: "grossProfit",
      key: "grossProfit",
      align: "right",
      sorter: (a, b) => a.grossProfit - b.grossProfit,
      render: (v: number) => (
        <Text style={{ fontSize: "13px", color: isDark ? "#fff" : "#1f1f1f", fontWeight: 500 }}>
          {formatCurrency(v)}
        </Text>
      ),
    },
  ];

  const visibleColumns = columns.filter((col) => col.key && columnVisibility[col.key as string] !== false);

  return (
    <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
      {/* Header: Title + Print */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }} justify="space-between" align="middle">
        <Col>
          <Title level={2} style={{ margin: 0, color: isDark ? "#fff" : "#1f1f1f", fontWeight: 600 }}>
            Profit / Loss Report
          </Title>
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<PrinterOutlined />}
            onClick={handlePrint}
            style={{ height: 40, borderRadius: 6, fontWeight: 500 }}
          >
            Print
          </Button>
        </Col>
      </Row>

      {/* Filters */}
      <FilterPanel filters={filterConfig} onFilterChange={setFilterConfig} defaultExpanded={true} />

      {/* Two summary panels */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={12}>
          <Card
            style={{
              background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
              border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
              borderRadius: 8,
            }}
            styles={{ body: { padding: "16px 24px" } }}
          >
            {leftSummary.map((item, i) => (
              <Row key={i} justify="space-between" align="middle" style={{ marginBottom: 12 }}>
                <Col>
                  <Text style={{ fontSize: 13, color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>
                    {item.label}
                  </Text>
                </Col>
                <Col>
                  <div style={summaryRowStyle}>{formatCurrency(item.value)}</div>
                </Col>
              </Row>
            ))}
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card
            style={{
              background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
              border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
              borderRadius: 8,
            }}
            styles={{ body: { padding: "16px 24px" } }}
          >
            {rightSummary.map((item, i) => (
              <Row key={i} justify="space-between" align="middle" style={{ marginBottom: 12 }}>
                <Col>
                  <Text style={{ fontSize: 13, color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>
                    {item.label}
                  </Text>
                </Col>
                <Col>
                  <div style={summaryRowStyle}>{formatCurrency(item.value)}</div>
                </Col>
              </Row>
            ))}
          </Card>
        </Col>
      </Row>

      {/* Gross Profit & Net Profit */}
      <Card
        style={{
          background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
          border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
          borderRadius: 8,
          marginBottom: 24,
        }}
        styles={{ body: { padding: "20px 24px" } }}
      >
        <div style={{ marginBottom: 16 }}>
          <Text strong style={{ fontSize: 15, color: isDark ? "#fff" : "#1f1f1f" }}>
            Gross Profit: {formatCurrency(grossProfit)}
          </Text>
          <div style={{ fontSize: 12, color: isDark ? "rgba(255,255,255,0.5)" : "#8c8c8c", marginTop: 4 }}>
            (Total sell price - Total purchase price)
          </div>
        </div>
        <div>
          <Text strong style={{ fontSize: 15, color: isDark ? "#fff" : "#1f1f1f" }}>
            Net Profit: {formatCurrency(netProfit)}
          </Text>
          <div style={{ fontSize: 12, color: isDark ? "rgba(255,255,255,0.5)" : "#8c8c8c", marginTop: 4 }}>
            Gross Profit + (Total sell shipping charge + Sell additional expenses + Total Stock Recovered + Total
            Purchase discount + Total sell round off) - (Total Stock Adjustment + Total Expense + Total purchase
            shipping charge + Total transfer shipping charge + Purchase additional expenses + Total Sell discount +
            Total customer reward)
          </div>
        </div>
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
                <Alert
                  message="Note: Profit by products/categories/brands only considers inline discount. Invoice discount is not considered."
                  type="info"
                  showIcon
                  style={{ marginBottom: 16 }}
                />
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
                      <Button icon={<FileTextOutlined />} onClick={handleExportCSV} style={{ height: 40, borderRadius: 6 }}>
                        Export to CSV
                      </Button>
                      <Button icon={<FileExcelOutlined />} onClick={handleExportCSV} style={{ height: 40, borderRadius: 6 }}>
                        Export to Excel
                      </Button>
                      <Button icon={<PrinterOutlined />} onClick={handlePrint} style={{ height: 40, borderRadius: 6 }}>
                        Print
                      </Button>
                      <Dropdown menu={columnVisibilityMenu} trigger={["click"]} placement="bottomRight">
                        <Button icon={<UnorderedListOutlined />} style={{ height: 40, borderRadius: 6 }}>
                          Column visibility
                        </Button>
                      </Dropdown>
                      <Button icon={<FilePdfOutlined />} onClick={() => message.info("PDF export coming soon")} style={{ height: 40, borderRadius: 6 }}>
                        Export to PDF
                      </Button>
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
                  dataSource={filteredTableData}
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
                      <Table.Summary.Cell index={0}>
                        <Text strong>Total:</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={1} align="right">
                        <Text strong>{formatCurrency(totalGrossProfit)}</Text>
                      </Table.Summary.Cell>
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

export default ProfitLossReport;
