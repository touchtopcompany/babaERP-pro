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
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import useTheme from "@/theme/useTheme";
import { FilterPanel } from "../../components/filters";
import type { FilterConfig } from "../../components/filters";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { Search } = Input;

interface StockTransferRow {
  key: string;
  date: string;
  referenceNo: string;
  product: string;
  sku: string;
  locationFrom: string;
  locationTo: string;
  quantity: number;
  unitPriceBySellingPrice: number;
  totalAmount: number;
}

const formatCurrency = (value: number) =>
  `TSh ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const StockTransferReport: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(25);
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    date: true,
    referenceNo: true,
    product: true,
    sku: true,
    locationFrom: true,
    locationTo: true,
    quantity: true,
    unitPriceBySellingPrice: true,
    totalAmount: true,
  });

  const [filterConfig, setFilterConfig] = useState<FilterConfig>({
    businessLocation: {
      label: "Location (From):",
      value: "all",
      options: [
        { label: "All locations", value: "all" },
        { label: "C2Z Digital Solutions (C2Z1)", value: "C2Z Digital Solutions (C2Z1)" },
        { label: "Location 2", value: "Location 2" },
        { label: "Location 3", value: "Location 3" },
      ],
    },
    locationTo: {
      label: "Location (To):",
      value: "all",
      options: [
        { label: "All", value: "all" },
        { label: "C2Z Digital Solutions (C2Z1)", value: "C2Z Digital Solutions (C2Z1)" },
        { label: "Location 2", value: "Location 2" },
        { label: "Location 3", value: "Location 3" },
      ],
    },
    dateRange: {
      label: "Date Range:",
      value: [dayjs("2026-01-01"), dayjs("2026-12-31")],
    },
  });

  // Mock data - replace with API
  const mockData: StockTransferRow[] = [
    { key: "1", date: "2026-01-05", referenceNo: "ST-2026-001", product: "Laptop Pro 15", sku: "LAP-PRO-15", locationFrom: "C2Z Digital Solutions (C2Z1)", locationTo: "Location 2", quantity: 12, unitPriceBySellingPrice: 1850000, totalAmount: 22200000 },
    { key: "2", date: "2026-01-08", referenceNo: "ST-2026-002", product: "Wireless Mouse", sku: "ACC-WM-01", locationFrom: "Location 2", locationTo: "Location 3", quantity: 50, unitPriceBySellingPrice: 45000, totalAmount: 2250000 },
    { key: "3", date: "2026-01-12", referenceNo: "ST-2026-003", product: "USB-C Hub", sku: "ACC-USB-HUB", locationFrom: "C2Z Digital Solutions (C2Z1)", locationTo: "Location 3", quantity: 25, unitPriceBySellingPrice: 125000, totalAmount: 3125000 },
    { key: "4", date: "2026-01-15", referenceNo: "ST-2026-004", product: "Monitor 24\"", sku: "MON-24-HD", locationFrom: "Location 3", locationTo: "C2Z Digital Solutions (C2Z1)", quantity: 8, unitPriceBySellingPrice: 420000, totalAmount: 3360000 },
    { key: "5", date: "2026-01-18", referenceNo: "ST-2026-005", product: "Keyboard Mechanical", sku: "ACC-KB-MEC", locationFrom: "C2Z Digital Solutions (C2Z1)", locationTo: "Location 2", quantity: 20, unitPriceBySellingPrice: 185000, totalAmount: 3700000 },
    { key: "6", date: "2026-01-22", referenceNo: "ST-2026-006", product: "Webcam HD", sku: "ACC-WC-HD", locationFrom: "Location 2", locationTo: "Location 3", quantity: 15, unitPriceBySellingPrice: 95000, totalAmount: 1425000 },
    { key: "7", date: "2026-01-25", referenceNo: "ST-2026-007", product: "Tablet 10\"", sku: "TAB-10-B", locationFrom: "Location 3", locationTo: "C2Z Digital Solutions (C2Z1)", quantity: 10, unitPriceBySellingPrice: 650000, totalAmount: 6500000 },
    { key: "8", date: "2026-01-28", referenceNo: "ST-2026-008", product: "SSD 512GB", sku: "SSD-512-NVME", locationFrom: "C2Z Digital Solutions (C2Z1)", locationTo: "Location 2", quantity: 30, unitPriceBySellingPrice: 185000, totalAmount: 5550000 },
    { key: "9", date: "2026-02-02", referenceNo: "ST-2026-009", product: "Laptop Pro 15", sku: "LAP-PRO-15", locationFrom: "Location 2", locationTo: "Location 3", quantity: 5, unitPriceBySellingPrice: 1850000, totalAmount: 9250000 },
    { key: "10", date: "2026-02-05", referenceNo: "ST-2026-010", product: "Headphones Wireless", sku: "ACC-HP-WL", locationFrom: "C2Z Digital Solutions (C2Z1)", locationTo: "Location 3", quantity: 40, unitPriceBySellingPrice: 85000, totalAmount: 3400000 },
  ];

  const filteredData = useMemo(() => {
    if (!searchText.trim()) return mockData;
    const q = searchText.toLowerCase();
    return mockData.filter(
      (r) =>
        r.referenceNo.toLowerCase().includes(q) ||
        r.product.toLowerCase().includes(q) ||
        r.sku.toLowerCase().includes(q) ||
        r.locationFrom.toLowerCase().includes(q) ||
        r.locationTo.toLowerCase().includes(q)
    );
  }, [searchText]);

  const totals = useMemo(
    () => ({
      quantity: filteredData.reduce((s, r) => s + r.quantity, 0),
      totalAmount: filteredData.reduce((s, r) => s + r.totalAmount, 0),
    }),
    [filteredData]
  );

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html><head><title>Stock Transfer Report</title>
      <style>body{font-family:Arial;padding:20px;} table{width:100%;border-collapse:collapse;} th,td{border:1px solid #ddd;padding:8px;} th{background:#f2f2f2;}
      </style></head><body>
      <h1>Stock Transfer Report</h1>
      <p>Generated: ${new Date().toLocaleString()}</p>
      <table>
      <tr><th>Date</th><th>Reference No</th><th>Product</th><th>SKU</th><th>Location (From)</th><th>Location (To)</th><th>Quantity</th><th>Unit Price by Selling Price</th><th>Total Amount</th></tr>
      ${filteredData.map((r) => `<tr><td>${r.date}</td><td>${r.referenceNo}</td><td>${r.product}</td><td>${r.sku}</td><td>${r.locationFrom}</td><td>${r.locationTo}</td><td>${r.quantity}</td><td>${formatCurrency(r.unitPriceBySellingPrice)}</td><td>${formatCurrency(r.totalAmount)}</td></tr>`).join("")}
      <tr><td colspan="6"><strong>Total:</strong></td><td><strong>${totals.quantity}</strong></td><td></td><td><strong>${formatCurrency(totals.totalAmount)}</strong></td></tr>
      </table></body></html>
    `);
    printWindow.document.close();
    printWindow.print();
    message.success("Print dialog opened");
  };

  const handleExportCSV = () => {
    const headers = ["Date", "Reference No", "Product", "SKU", "Location (From)", "Location (To)", "Quantity", "Unit Price by Selling Price", "Total Amount"];
    const rows = filteredData.map((r) => [r.date, r.referenceNo, r.product, r.sku, r.locationFrom, r.locationTo, r.quantity, r.unitPriceBySellingPrice, r.totalAmount]);
    const csv = [headers.join(","), ...rows.map((r) => r.map((c) => `"${c}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `stock_transfer_report_${dayjs().format("YYYY-MM-DD")}.csv`;
    a.click();
    message.success("Exported to CSV");
  };

  const columnLabels: Record<string, string> = {
    date: "Date",
    referenceNo: "Reference No",
    product: "Product",
    sku: "SKU",
    locationFrom: "Location (From)",
    locationTo: "Location (To)",
    quantity: "Quantity",
    unitPriceBySellingPrice: "Unit Price by Selling Price",
    totalAmount: "Total Amount",
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

  const columns: ColumnsType<StockTransferRow> = [
    { title: "Date", dataIndex: "date", key: "date", width: 120, sorter: (a, b) => a.date.localeCompare(b.date), render: (t: string) => <Text style={{ fontSize: 13, color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>{t}</Text> },
    { title: "Reference No", dataIndex: "referenceNo", key: "referenceNo", width: 130, sorter: (a, b) => a.referenceNo.localeCompare(b.referenceNo), render: (t: string) => <Text style={{ fontSize: 13, fontFamily: "monospace" }}>{t}</Text> },
    { title: "Product", dataIndex: "product", key: "product", width: 180, sorter: (a, b) => a.product.localeCompare(b.product), render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
    { title: "SKU", dataIndex: "sku", key: "sku", width: 130, sorter: (a, b) => a.sku.localeCompare(b.sku), render: (t: string) => <Text style={{ fontSize: 13, fontFamily: "monospace" }}>{t}</Text> },
    { title: "Location (From)", dataIndex: "locationFrom", key: "locationFrom", width: 200, sorter: (a, b) => a.locationFrom.localeCompare(b.locationFrom), render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
    { title: "Location (To)", dataIndex: "locationTo", key: "locationTo", width: 200, sorter: (a, b) => a.locationTo.localeCompare(b.locationTo), render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
    { title: "Quantity", dataIndex: "quantity", key: "quantity", width: 100, align: "right", sorter: (a, b) => a.quantity - b.quantity, render: (v: number) => <Text style={{ fontSize: 13 }}>{v}</Text> },
    { title: "Unit Price by Selling Price", dataIndex: "unitPriceBySellingPrice", key: "unitPriceBySellingPrice", width: 180, align: "right", sorter: (a, b) => a.unitPriceBySellingPrice - b.unitPriceBySellingPrice, render: (v: number) => <Text style={{ fontSize: 13 }}>{formatCurrency(v)}</Text> },
    { title: "Total Amount", dataIndex: "totalAmount", key: "totalAmount", width: 140, align: "right", sorter: (a, b) => a.totalAmount - b.totalAmount, render: (v: number) => <Text style={{ fontSize: 13, fontWeight: 500 }}>{formatCurrency(v)}</Text> },
  ];

  const visibleColumns = columns.filter((col) => col.key && columnVisibility[col.key as string] !== false);

  return (
    <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
      <Title level={2} style={{ marginBottom: 24, color: isDark ? "#fff" : "#1f1f1f", fontWeight: 600 }}>
        Stock Transfer Report
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
                <Table.Summary.Cell index={0} colSpan={6}>
                  <Text strong>Total:</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1} align="right">
                  <Text strong>{totals.quantity}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2} align="right" />
                <Table.Summary.Cell index={3} align="right">
                  <Text strong>{formatCurrency(totals.totalAmount)}</Text>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          )}
        />
      </Card>
    </div>
  );
};

export default StockTransferReport;
