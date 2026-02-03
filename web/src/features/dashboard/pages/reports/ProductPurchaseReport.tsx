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
  Collapse,
  DatePicker,
} from "antd";
import type { MenuProps } from "antd";
import type { CollapseProps } from "antd";
import {
  PrinterOutlined,
  SearchOutlined,
  FileTextOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  UnorderedListOutlined,
  DownOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import useTheme from "@/theme/useTheme";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { Search } = Input;
const { RangePicker } = DatePicker;

interface ProductPurchaseRow {
  key: string;
  product: string;
  sku: string;
  supplier: string;
  referenceNo: string;
  date: string;
  quantity: number;
  totalUnitAdjusted: number;
  unitPurchasePrice: number;
  subtotal: number;
}

const formatCurrency = (value: number) =>
  `TSh ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const ProductPurchaseReport: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [searchProduct, setSearchProduct] = useState("");
  const [tableSearch, setTableSearch] = useState("");
  const [pageSize, setPageSize] = useState(25);
  const [supplier, setSupplier] = useState<string | null>(null);
  const [businessLocation, setBusinessLocation] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([dayjs("2026-01-01"), dayjs("2026-12-31")]);
  const [brand, setBrand] = useState("all");
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    product: true,
    sku: true,
    supplier: true,
    referenceNo: true,
    date: true,
    quantity: true,
    totalUnitAdjusted: true,
    unitPurchasePrice: true,
    subtotal: true,
  });

  // Mock data - replace with API
  const mockData: ProductPurchaseRow[] = [
    { key: "1", product: "Laptop Pro 15", sku: "LAP-PRO-15", supplier: "Tech Supplies Ltd", referenceNo: "PO-2026-001", date: "2026-01-05", quantity: 12, totalUnitAdjusted: 0, unitPurchasePrice: 1200000, subtotal: 14400000 },
    { key: "2", product: "Wireless Mouse", sku: "ACC-WM-01", supplier: "Office Solutions", referenceNo: "PO-2026-002", date: "2026-01-08", quantity: 50, totalUnitAdjusted: 0, unitPurchasePrice: 28000, subtotal: 1400000 },
    { key: "3", product: "USB-C Hub", sku: "ACC-USB-HUB", supplier: "Tech Supplies Ltd", referenceNo: "PO-2026-003", date: "2026-01-12", quantity: 25, totalUnitAdjusted: 0, unitPurchasePrice: 95000, subtotal: 2375000 },
    { key: "4", product: "Monitor 24\"", sku: "MON-24-HD", supplier: "Global Traders", referenceNo: "PO-2026-004", date: "2026-01-15", quantity: 8, totalUnitAdjusted: 0, unitPurchasePrice: 320000, subtotal: 2560000 },
    { key: "5", product: "Keyboard Mechanical", sku: "ACC-KB-MEC", supplier: "Office Solutions", referenceNo: "PO-2026-005", date: "2026-01-18", quantity: 20, totalUnitAdjusted: 0, unitPurchasePrice: 145000, subtotal: 2900000 },
    { key: "6", product: "SSD 512GB", sku: "SSD-512-NVME", supplier: "Tech Supplies Ltd", referenceNo: "PO-2026-006", date: "2026-01-22", quantity: 30, totalUnitAdjusted: 0, unitPurchasePrice: 145000, subtotal: 4350000 },
    { key: "7", product: "Extension Cord", sku: "6941950207634", supplier: "Global Traders", referenceNo: "PO-2026-007", date: "2026-01-25", quantity: 100, totalUnitAdjusted: 0, unitPurchasePrice: 30000, subtotal: 3000000 },
    { key: "8", product: "Headphones Wireless", sku: "ACC-HP-WL", supplier: "Office Solutions", referenceNo: "PO-2026-008", date: "2026-01-28", quantity: 40, totalUnitAdjusted: 0, unitPurchasePrice: 65000, subtotal: 2600000 },
    { key: "9", product: "Webcam HD", sku: "ACC-WC-HD", supplier: "Tech Supplies Ltd", referenceNo: "PO-2026-009", date: "2026-02-02", quantity: 15, totalUnitAdjusted: 0, unitPurchasePrice: 95000, subtotal: 1425000 },
    { key: "10", product: "Tablet 10\"", sku: "TAB-10-B", supplier: "Global Traders", referenceNo: "PO-2026-010", date: "2026-02-05", quantity: 10, totalUnitAdjusted: 0, unitPurchasePrice: 520000, subtotal: 5200000 },
  ];

  const filteredData = useMemo(() => {
    let data = mockData;
    if (searchProduct.trim()) {
      const q = searchProduct.toLowerCase();
      data = data.filter(
        (r) =>
          r.product.toLowerCase().includes(q) ||
          r.sku.toLowerCase().includes(q)
      );
    }
    if (tableSearch.trim()) {
      const q = tableSearch.toLowerCase();
      data = data.filter(
        (r) =>
          r.product.toLowerCase().includes(q) ||
          r.sku.toLowerCase().includes(q) ||
          r.supplier.toLowerCase().includes(q) ||
          r.referenceNo.toLowerCase().includes(q)
      );
    }
    return data;
  }, [searchProduct, tableSearch]);

  const subtotalSum = useMemo(() => filteredData.reduce((s, r) => s + r.subtotal, 0), [filteredData]);

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html><head><title>Product Purchase Report</title>
      <style>body{font-family:Arial;padding:20px;} table{width:100%;border-collapse:collapse;} th,td{border:1px solid #ddd;padding:8px;} th{background:#f2f2f2;}
      </style></head><body>
      <h1>Product Purchase Report</h1>
      <p>Generated: ${new Date().toLocaleString()}</p>
      <table>
      <tr><th>Product</th><th>SKU</th><th>Supplier</th><th>Reference No</th><th>Date</th><th>Quantity</th><th>Total Unit Adjusted</th><th>Unit Purchase Price</th><th>Subtotal</th></tr>
      ${filteredData.map((r) => `<tr><td>${r.product}</td><td>${r.sku}</td><td>${r.supplier}</td><td>${r.referenceNo}</td><td>${r.date}</td><td>${r.quantity}</td><td>${r.totalUnitAdjusted}</td><td>${formatCurrency(r.unitPurchasePrice)}</td><td>${formatCurrency(r.subtotal)}</td></tr>`).join("")}
      <tr><td colspan="8"><strong>Total:</strong></td><td><strong>${formatCurrency(subtotalSum)}</strong></td></tr>
      </table></body></html>
    `);
    printWindow.document.close();
    printWindow.print();
    message.success("Print dialog opened");
  };

  const handleExportCSV = () => {
    const headers = ["Product", "SKU", "Supplier", "Reference No", "Date", "Quantity", "Total Unit Adjusted", "Unit Purchase Price", "Subtotal"];
    const rows = filteredData.map((r) => [r.product, r.sku, r.supplier, r.referenceNo, r.date, r.quantity, r.totalUnitAdjusted, r.unitPurchasePrice, r.subtotal]);
    const csv = [headers.join(","), ...rows.map((r) => r.map((c) => `"${c}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `product_purchase_report_${dayjs().format("YYYY-MM-DD")}.csv`;
    a.click();
    message.success("Exported to CSV");
  };

  const labelStyle = { color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", fontSize: 13, marginBottom: 8, display: "block" as const };
  const inputStyle = { background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff", border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9", borderRadius: 6, color: isDark ? "#fff" : "#1f1f1f", width: "100%" };

  const collapseItems: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <Space>
          <FilterOutlined style={{ color: "#1890ff", fontSize: 14 }} />
          <Text strong style={{ color: "#1890ff", fontSize: 14 }}>Filters</Text>
        </Space>
      ),
      style: { background: "transparent", border: "none" },
      children: (
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={8}>
            <Text style={labelStyle}>Search Product:</Text>
            <Input
              placeholder="Enter Product name / SKU / Scan bar code"
              prefix={<SearchOutlined style={{ color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c" }} />}
              value={searchProduct}
              onChange={(e) => setSearchProduct(e.target.value)}
              allowClear
              style={inputStyle}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Text style={labelStyle}>Supplier:</Text>
            <Select
              value={supplier ?? "none"}
              onChange={(v) => setSupplier(v === "none" ? null : v)}
              style={inputStyle}
              suffixIcon={<DownOutlined />}
              placeholder="None"
              allowClear
              options={[{ label: "None", value: "none" }, { label: "Tech Supplies Ltd", value: "tech" }, { label: "Office Solutions", value: "office" }, { label: "Global Traders", value: "global" }]}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Text style={labelStyle}>Business Location:</Text>
            <Select
              value={businessLocation ?? undefined}
              onChange={(v) => setBusinessLocation(v || null)}
              style={inputStyle}
              suffixIcon={<DownOutlined />}
              placeholder="Please Select"
              allowClear
              options={[{ label: "C2Z Digital Solutions (C2Z1)", value: "C2Z Digital Solutions (C2Z1)" }, { label: "Location 2", value: "Location 2" }, { label: "Location 3", value: "Location 3" }]}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Text style={labelStyle}>Date Range:</Text>
            <RangePicker value={dateRange} onChange={(dates) => dates && dates[0] && dates[1] && setDateRange([dates[0], dates[1]])} format="MM/DD/YYYY" style={inputStyle} />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Text style={labelStyle}>Brand:</Text>
            <Select value={brand} onChange={setBrand} style={inputStyle} suffixIcon={<DownOutlined />} options={[{ label: "All", value: "all" }, { label: "Brand A", value: "brand_a" }, { label: "Brand B", value: "brand_b" }]} />
          </Col>
        </Row>
      ),
    },
  ];

  const columnLabels: Record<string, string> = {
    product: "Product",
    sku: "SKU",
    supplier: "Supplier",
    referenceNo: "Reference No",
    date: "Date",
    quantity: "Quantity",
    totalUnitAdjusted: "Total Unit Adjusted",
    unitPurchasePrice: "Unit Purchase Price",
    subtotal: "Subtotal",
  };

  const columnVisibilityMenu: MenuProps = {
    items: Object.keys(columnVisibility).map((key) => ({
      key,
      label: (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Checkbox checked={columnVisibility[key]} onChange={(e) => setColumnVisibility((p) => ({ ...p, [key]: e.target.checked }))} style={{ marginRight: 8 }} />
          {columnLabels[key] ?? key}
        </div>
      ),
    })),
  };

  const columns: ColumnsType<ProductPurchaseRow> = [
    { title: "Product", dataIndex: "product", key: "product", width: 180, sorter: (a, b) => a.product.localeCompare(b.product), render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
    { title: "SKU", dataIndex: "sku", key: "sku", width: 130, sorter: (a, b) => a.sku.localeCompare(b.sku), render: (t: string) => <Text style={{ fontSize: 13, fontFamily: "monospace" }}>{t}</Text> },
    { title: "Supplier", dataIndex: "supplier", key: "supplier", width: 180, sorter: (a, b) => a.supplier.localeCompare(b.supplier), render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
    { title: "Reference No", dataIndex: "referenceNo", key: "referenceNo", width: 130, sorter: (a, b) => a.referenceNo.localeCompare(b.referenceNo), render: (t: string) => <Text style={{ fontSize: 13, fontFamily: "monospace" }}>{t}</Text> },
    { title: "Date", dataIndex: "date", key: "date", width: 120, sorter: (a, b) => a.date.localeCompare(b.date), render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
    { title: "Quantity", dataIndex: "quantity", key: "quantity", width: 100, align: "right", sorter: (a, b) => a.quantity - b.quantity, render: (v: number) => <Text style={{ fontSize: 13 }}>{v}</Text> },
    { title: "Total Unit Adjusted", dataIndex: "totalUnitAdjusted", key: "totalUnitAdjusted", width: 150, align: "right", sorter: (a, b) => a.totalUnitAdjusted - b.totalUnitAdjusted, render: (v: number) => <Text style={{ fontSize: 13 }}>{v}</Text> },
    { title: "Unit Purchase Price", dataIndex: "unitPurchasePrice", key: "unitPurchasePrice", width: 150, align: "right", sorter: (a, b) => a.unitPurchasePrice - b.unitPurchasePrice, render: (v: number) => <Text style={{ fontSize: 13 }}>{formatCurrency(v)}</Text> },
    { title: "Subtotal", dataIndex: "subtotal", key: "subtotal", width: 140, align: "right", sorter: (a, b) => a.subtotal - b.subtotal, render: (v: number) => <Text style={{ fontSize: 13, fontWeight: 500 }}>{formatCurrency(v)}</Text> },
  ];

  const visibleColumns = columns.filter((col) => col.key && columnVisibility[col.key as string] !== false);

  return (
    <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
      <Title level={2} style={{ marginBottom: 24, color: isDark ? "#fff" : "#1f1f1f", fontWeight: 600 }}>
        Product Purchase Report
      </Title>

      <Collapse defaultActiveKey={["1"]} items={collapseItems} style={{ marginBottom: 24, background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff", border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0", borderRadius: 8 }} expandIconPosition="start" />

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
            <Space>
              <Text style={{ color: isDark ? "rgba(255,255,255,0.85)" : "#595959", fontSize: 13 }}>Show</Text>
              <Select value={pageSize} onChange={setPageSize} options={[{ value: 10, label: "10" }, { value: 25, label: "25" }, { value: 50, label: "50" }, { value: 100, label: "100" }]} style={{ width: 80 }} suffixIcon={<DownOutlined />} />
              <Text style={{ color: isDark ? "rgba(255,255,255,0.85)" : "#595959", fontSize: 13 }}>entries</Text>
            </Space>
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
              <Search placeholder="Search..." allowClear value={tableSearch} onChange={(e) => setTableSearch(e.target.value)} style={{ width: 200 }} addonAfter={<Button type="primary" icon={<SearchOutlined />} />} />
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
                <Table.Summary.Cell index={0} colSpan={8}>
                  <Text strong>Total:</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1} align="right">
                  <Text strong>{formatCurrency(subtotalSum)}</Text>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          )}
        />
      </Card>
    </div>
  );
};

export default ProductPurchaseReport;
