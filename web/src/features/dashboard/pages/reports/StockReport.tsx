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
  HistoryOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import useTheme from "@/theme/useTheme";
import { FilterPanel } from "../../components/filters";
import type { FilterConfig } from "../../components/filters";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { Search } = Input;

interface StockRow {
  key: string;
  sku: string;
  product: string;
  variation: string;
  category: string;
  location: string;
  unitPurchasePrice: number;
  unitSellingPrice: number;
  openingStock: number;
  closingStock: number;
  currentStock: number;
  currentStockValuePurchase: number;
  currentStockValueSale: number;
  potentialProfit: number;
  totalUnitPurchase: number;
}

const formatCurrency = (value: number) =>
  `TSh ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const formatQty = (qty: number) => `${qty.toFixed(2)} Pcs`;

const StockReport: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(25);
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    action: true,
    sku: true,
    product: true,
    variation: true,
    category: true,
    location: true,
    unitPurchasePrice: true,
    unitSellingPrice: true,
    openingStock: true,
    closingStock: true,
    currentStock: true,
    currentStockValuePurchase: true,
    currentStockValueSale: true,
    potentialProfit: true,
    totalUnitPurchase: true,
  });

  const [filterConfig, setFilterConfig] = useState<FilterConfig>({
    businessLocation: {
      label: "Business Location:",
      value: "all",
      options: [
        { label: "All", value: "all" },
        { label: "C2Z Digital Solutions (C2Z1)", value: "C2Z Digital Solutions (C2Z1)" },
        { label: "Location 2", value: "Location 2" },
        { label: "Location 3", value: "Location 3" },
      ],
    },
    category: {
      label: "Category:",
      value: "all",
      options: [
        { label: "All", value: "all" },
        { label: "Electronics", value: "electronics" },
        { label: "Accessories", value: "accessories" },
        { label: "Office", value: "office" },
      ],
    },
    subCategory: {
      label: "Sub category:",
      value: "all",
      options: [
        { label: "All", value: "all" },
        { label: "Chargers", value: "chargers" },
        { label: "Cables", value: "cables" },
      ],
    },
    brand: {
      label: "Brand:",
      value: "all",
      options: [
        { label: "All", value: "all" },
        { label: "Brand A", value: "brand_a" },
        { label: "Brand B", value: "brand_b" },
      ],
    },
    unit: {
      label: "Unit:",
      value: "all",
      options: [
        { label: "All", value: "all" },
        { label: "Pcs", value: "pcs" },
        { label: "Box", value: "box" },
      ],
    },
    dateRange: {
      label: "Date Range:",
      value: [dayjs("2026-02-01"), dayjs("2026-02-02")],
    },
    timeRange: {
      label: "Time range:",
      value: [dayjs("00:00", "HH:mm"), dayjs("23:59", "HH:mm")],
    },
  });

  // Mock summary (from filter date range)
  const openingDateStr = filterConfig.dateRange?.value?.[0]?.format("YYYY-MM-DD HH:mm") ?? "2026-02-01 00:00";
  const closingDateStr = (filterConfig.dateRange?.value?.[1]?.format("YYYY-MM-DD") ?? "2026-02-02") + " " + (filterConfig.timeRange?.value?.[1]?.format("HH:mm") ?? "23:59");

  const summaryStats = useMemo(
    () => ({
      closingStockPurchase: 24333900,
      closingStockSale: 30707000,
      potentialProfit: 6373100,
      profitMarginPct: 20.75,
    }),
    []
  );

  // Mock table data - replace with API
  const mockData: StockRow[] = [
    { key: "1", sku: "6933138600757", product: "100W Super charge", variation: "", category: "Electronics", location: "C2Z Digital Solutions", unitPurchasePrice: 37500, unitSellingPrice: 45000, openingStock: 25, closingStock: 25, currentStock: 25, currentStockValuePurchase: 937500, currentStockValueSale: 1125000, potentialProfit: 187500, totalUnitPurchase: 0 },
    { key: "2", sku: "6941950207634", product: "Extension Cord", variation: "", category: "Accessories", location: "C2Z Digital Solutions", unitPurchasePrice: 30000, unitSellingPrice: 40000, openingStock: 2, closingStock: 2, currentStock: 2, currentStockValuePurchase: 60000, currentStockValueSale: 80000, potentialProfit: 20000, totalUnitPurchase: 0 },
    { key: "3", sku: "8692518165085", product: "HD TV 10M", variation: "", category: "Electronics", location: "C2Z Digital Solutions", unitPurchasePrice: 68000, unitSellingPrice: 85000, openingStock: 1, closingStock: 1, currentStock: 1, currentStockValuePurchase: 68000, currentStockValueSale: 85000, potentialProfit: 17000, totalUnitPurchase: 0 },
    { key: "4", sku: "0039", product: "iPad Cover", variation: "", category: "Accessories", location: "C2Z Digital Solutions", unitPurchasePrice: 45000, unitSellingPrice: 55000, openingStock: 15, closingStock: 15, currentStock: 15, currentStockValuePurchase: 675000, currentStockValueSale: 825000, potentialProfit: 150000, totalUnitPurchase: 0 },
    { key: "5", sku: "LAP-PRO-15", product: "Laptop Pro 15", variation: "", category: "Electronics", location: "C2Z Digital Solutions", unitPurchasePrice: 1200000, unitSellingPrice: 1850000, openingStock: 8, closingStock: 8, currentStock: 8, currentStockValuePurchase: 9600000, currentStockValueSale: 14800000, potentialProfit: 5200000, totalUnitPurchase: 0 },
    { key: "6", sku: "ACC-WM-01", product: "Wireless Mouse", variation: "", category: "Accessories", location: "C2Z Digital Solutions", unitPurchasePrice: 28000, unitSellingPrice: 45000, openingStock: 40, closingStock: 40, currentStock: 40, currentStockValuePurchase: 1120000, currentStockValueSale: 1800000, potentialProfit: 680000, totalUnitPurchase: 0 },
    { key: "7", sku: "MON-24-HD", product: "Monitor 24\"", variation: "", category: "Electronics", location: "C2Z Digital Solutions", unitPurchasePrice: 320000, unitSellingPrice: 420000, openingStock: 12, closingStock: 12, currentStock: 12, currentStockValuePurchase: 3840000, currentStockValueSale: 5040000, potentialProfit: 1200000, totalUnitPurchase: 0 },
    { key: "8", sku: "ACC-USB-HUB", product: "USB-C Hub", variation: "", category: "Accessories", location: "C2Z Digital Solutions", unitPurchasePrice: 95000, unitSellingPrice: 125000, openingStock: 20, closingStock: 20, currentStock: 20, currentStockValuePurchase: 1900000, currentStockValueSale: 2500000, potentialProfit: 600000, totalUnitPurchase: 0 },
    { key: "9", sku: "TAB-10-B", product: "Tablet 10\"", variation: "", category: "Electronics", location: "C2Z Digital Solutions", unitPurchasePrice: 520000, unitSellingPrice: 650000, openingStock: 6, closingStock: 6, currentStock: 6, currentStockValuePurchase: 3120000, currentStockValueSale: 3900000, potentialProfit: 780000, totalUnitPurchase: 0 },
    { key: "10", sku: "SSD-512-NVME", product: "SSD 512GB", variation: "", category: "Electronics", location: "C2Z Digital Solutions", unitPurchasePrice: 145000, unitSellingPrice: 185000, openingStock: 25, closingStock: 25, currentStock: 25, currentStockValuePurchase: 3625000, currentStockValueSale: 4625000, potentialProfit: 1000000, totalUnitPurchase: 0 },
  ];

  const filteredData = useMemo(() => {
    if (!searchText.trim()) return mockData;
    const q = searchText.toLowerCase();
    return mockData.filter(
      (r) =>
        r.sku.toLowerCase().includes(q) ||
        r.product.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q)
    );
  }, [searchText]);

  const totals = useMemo(
    () => ({
      currentStock: filteredData.reduce((s, r) => s + r.currentStock, 0),
      currentStockValuePurchase: filteredData.reduce((s, r) => s + r.currentStockValuePurchase, 0),
      currentStockValueSale: filteredData.reduce((s, r) => s + r.currentStockValueSale, 0),
      potentialProfit: filteredData.reduce((s, r) => s + r.potentialProfit, 0),
      totalUnitPurchase: filteredData.reduce((s, r) => s + r.totalUnitPurchase, 0),
    }),
    [filteredData]
  );

  const handlePrint = () => {
    message.success("Print dialog opened");
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html><head><title>Stock Report</title>
      <style>body{font-family:Arial;padding:20px;} table{width:100%;border-collapse:collapse;} th,td{border:1px solid #ddd;padding:8px;} th{background:#f2f2f2;}
      </style></head><body>
      <h1>Stock Report</h1>
      <p>Generated: ${new Date().toLocaleString()}</p>
      <p>Closing stock (By purchase price): ${formatCurrency(summaryStats.closingStockPurchase)} | By sale price: ${formatCurrency(summaryStats.closingStockSale)} | Potential profit: ${formatCurrency(summaryStats.potentialProfit)} | Profit Margin: ${summaryStats.profitMarginPct}%</p>
      <table>
      <tr><th>SKU</th><th>Product</th><th>Category</th><th>Location</th><th>Unit Purchase</th><th>Unit Selling</th><th>Current Stock</th><th>Current Stock Value (Purchase)</th><th>Current Stock Value (Sale)</th><th>Potential profit</th></tr>
      ${filteredData.map((r) => `<tr><td>${r.sku}</td><td>${r.product}</td><td>${r.category}</td><td>${r.location}</td><td>${formatCurrency(r.unitPurchasePrice)}</td><td>${formatCurrency(r.unitSellingPrice)}</td><td>${formatQty(r.currentStock)}</td><td>${formatCurrency(r.currentStockValuePurchase)}</td><td>${formatCurrency(r.currentStockValueSale)}</td><td>${formatCurrency(r.potentialProfit)}</td></tr>`).join("")}
      <tr><td colspan="6"><strong>Total:</strong></td><td><strong>${formatQty(totals.currentStock)}</strong></td><td><strong>${formatCurrency(totals.currentStockValuePurchase)}</strong></td><td><strong>${formatCurrency(totals.currentStockValueSale)}</strong></td><td><strong>${formatCurrency(totals.potentialProfit)}</strong></td></tr>
      </table></body></html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleExportCSV = () => {
    const headers = ["SKU", "Product", "Variation", "Category", "Location", "Unit Purchase Price", "Unit Selling Price", "Opening Stock", "Closing Stock", "Current stock", "Current Stock Value (Purchase)", "Current Stock Value (Sale)", "Potential profit", "Total Unit Purchase"];
    const rows = filteredData.map((r) => [r.sku, r.product, r.variation, r.category, r.location, r.unitPurchasePrice, r.unitSellingPrice, r.openingStock, r.closingStock, r.currentStock, r.currentStockValuePurchase, r.currentStockValueSale, r.potentialProfit, r.totalUnitPurchase]);
    const csv = [headers.join(","), ...rows.map((r) => r.map((c) => `"${c}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `stock_report_${dayjs().format("YYYY-MM-DD")}.csv`;
    a.click();
    message.success("Exported to CSV");
  };

  const handleProductStockHistory = (record: StockRow) => {
    message.info(`Product stock history: ${record.product} (${record.sku})`);
  };

  const summaryRowStyle = {
    padding: "10px 12px",
    background: isDark ? "rgba(255,255,255,0.06)" : "#fafafa",
    borderRadius: 6,
    textAlign: "right" as const,
    minWidth: 120,
    fontSize: "13px",
    color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
    fontWeight: 500,
  };

  const columnLabels: Record<string, string> = {
    action: "Action",
    sku: "SKU",
    product: "Product",
    variation: "Variation",
    category: "Category",
    location: "Location",
    unitPurchasePrice: "Unit Purchase Price",
    unitSellingPrice: "Unit Selling Price",
    openingStock: "Opening Stock",
    closingStock: "Closing Stock",
    currentStock: "Current stock",
    currentStockValuePurchase: "Current Stock Value (By purchase price)",
    currentStockValueSale: "Current Stock Value (By sale price)",
    potentialProfit: "Potential profit",
    totalUnitPurchase: "Total Unit Purchase",
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
          {columnLabels[key] ?? key}
        </div>
      ),
    })),
  };

  const columns: ColumnsType<StockRow> = [
    {
      title: "Action",
      key: "action",
      width: 180,
      fixed: "left",
      render: (_: unknown, record: StockRow) => (
        <Button type="primary" size="small" icon={<HistoryOutlined />} onClick={() => handleProductStockHistory(record)} style={{ borderRadius: 6 }}>
          Product stock history
        </Button>
      ),
    },
    { title: "SKU", dataIndex: "sku", key: "sku", width: 140, sorter: (a, b) => a.sku.localeCompare(b.sku), render: (t: string) => <Text style={{ fontSize: 13, fontFamily: "monospace" }}>{t}</Text> },
    { title: "Product", dataIndex: "product", key: "product", width: 180, sorter: (a, b) => a.product.localeCompare(b.product), render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
    { title: "Variation", dataIndex: "variation", key: "variation", width: 100, render: (t: string) => <Text style={{ fontSize: 13 }}>{t || "—"}</Text> },
    { title: "Category", dataIndex: "category", key: "category", width: 120, sorter: (a, b) => a.category.localeCompare(b.category), render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
    { title: "Location", dataIndex: "location", key: "location", width: 180, sorter: (a, b) => a.location.localeCompare(b.location), render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
    { title: "Unit Purchase Price", dataIndex: "unitPurchasePrice", key: "unitPurchasePrice", width: 150, align: "right", sorter: (a, b) => a.unitPurchasePrice - b.unitPurchasePrice, render: (v: number) => <Text style={{ fontSize: 13 }}>{formatCurrency(v)}</Text> },
    { title: "Unit Selling Price", dataIndex: "unitSellingPrice", key: "unitSellingPrice", width: 150, align: "right", sorter: (a, b) => a.unitSellingPrice - b.unitSellingPrice, render: (v: number) => <Text style={{ fontSize: 13 }}>{formatCurrency(v)}</Text> },
    { title: `Opening Stock (as of ${openingDateStr})`, dataIndex: "openingStock", key: "openingStock", width: 180, align: "right", sorter: (a, b) => a.openingStock - b.openingStock, render: (v: number) => <Text style={{ fontSize: 13 }}>{formatQty(v)}</Text> },
    { title: `Closing Stock (as of ${closingDateStr})`, dataIndex: "closingStock", key: "closingStock", width: 180, align: "right", sorter: (a, b) => a.closingStock - b.closingStock, render: (v: number) => <Text style={{ fontSize: 13 }}>{formatQty(v)}</Text> },
    { title: "Current stock", dataIndex: "currentStock", key: "currentStock", width: 120, align: "right", sorter: (a, b) => a.currentStock - b.currentStock, render: (v: number) => <Text style={{ fontSize: 13 }}>{formatQty(v)}</Text> },
    { title: "Current Stock Value (By purchase price)", dataIndex: "currentStockValuePurchase", key: "currentStockValuePurchase", width: 220, align: "right", sorter: (a, b) => a.currentStockValuePurchase - b.currentStockValuePurchase, render: (v: number) => <Text style={{ fontSize: 13 }}>{formatCurrency(v)}</Text> },
    { title: "Current Stock Value (By sale price)", dataIndex: "currentStockValueSale", key: "currentStockValueSale", width: 200, align: "right", sorter: (a, b) => a.currentStockValueSale - b.currentStockValueSale, render: (v: number) => <Text style={{ fontSize: 13 }}>{formatCurrency(v)}</Text> },
    { title: "Potential profit", dataIndex: "potentialProfit", key: "potentialProfit", width: 140, align: "right", sorter: (a, b) => a.potentialProfit - b.potentialProfit, render: (v: number) => <Text style={{ fontSize: 13, fontWeight: 500 }}>{formatCurrency(v)}</Text> },
    { title: "Total Unit Purchase", dataIndex: "totalUnitPurchase", key: "totalUnitPurchase", width: 150, align: "right", sorter: (a, b) => a.totalUnitPurchase - b.totalUnitPurchase, render: (v: number) => <Text style={{ fontSize: 13 }}>{formatQty(v)}</Text> },
  ];

  const visibleColumns = columns.filter((col) => col.key && columnVisibility[col.key as string] !== false);

  return (
    <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
      <Title level={2} style={{ marginBottom: 24, color: isDark ? "#fff" : "#1f1f1f", fontWeight: 600 }}>
        Stock Report
      </Title>

      <FilterPanel filters={filterConfig} onFilterChange={setFilterConfig} defaultExpanded={true} />

      {/* Summary cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff", border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0", borderRadius: 8 }} styles={{ body: { padding: "20px 24px" } }}>
            <Text style={{ fontSize: 13, color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", display: "block", marginBottom: 8 }}>Closing stock (By purchase price)</Text>
            <div style={summaryRowStyle}>{formatCurrency(summaryStats.closingStockPurchase)}</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff", border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0", borderRadius: 8 }} styles={{ body: { padding: "20px 24px" } }}>
            <Text style={{ fontSize: 13, color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", display: "block", marginBottom: 8 }}>Closing stock (By sale price)</Text>
            <div style={summaryRowStyle}>{formatCurrency(summaryStats.closingStockSale)}</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff", border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0", borderRadius: 8 }} styles={{ body: { padding: "20px 24px" } }}>
            <Text style={{ fontSize: 13, color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", display: "block", marginBottom: 8 }}>Potential profit</Text>
            <div style={summaryRowStyle}>{formatCurrency(summaryStats.potentialProfit)}</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff", border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0", borderRadius: 8 }} styles={{ body: { padding: "20px 24px" } }}>
            <Text style={{ fontSize: 13, color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", display: "block", marginBottom: 8 }}>Profit Margin %</Text>
            <div style={summaryRowStyle}>{summaryStats.profitMarginPct}</div>
          </Card>
        </Col>
      </Row>

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
              <Search placeholder="Search ..." allowClear value={searchText} onChange={(e) => setSearchText(e.target.value)} style={{ width: 200 }} addonAfter={<Button type="primary" icon={<SearchOutlined />} />} />
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
                <Table.Summary.Cell index={0} colSpan={9}>
                  <Text strong>Total:</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1} align="right">
                  <Text strong>{formatQty(totals.currentStock)}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2} align="right">
                  <Text strong>{formatCurrency(totals.currentStockValuePurchase)}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={3} align="right">
                  <Text strong>{formatCurrency(totals.currentStockValueSale)}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={4} align="right">
                  <Text strong>{formatCurrency(totals.potentialProfit)}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={5} align="right">
                  <Text strong>{formatQty(totals.totalUnitPurchase)}</Text>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          )}
        />
      </Card>
    </div>
  );
};

export default StockReport;
