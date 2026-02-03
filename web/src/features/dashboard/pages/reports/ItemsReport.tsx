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

interface ItemReportRow {
  key: string;
  product: string;
  sku: string;
  description: string;
  purchaseDate: string;
  purchase: string;
  lotNumber: string;
  supplier: string;
  purchasePrice: number;
  sellDate: string;
  sale: string;
  customer: string;
  location: string;
  sellQuantity: number;
  sellingPrice: number;
  subtotal: number;
}

const formatCurrency = (value: number) =>
  `TSh ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const ItemsReport: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(25);
  const [supplier, setSupplier] = useState("all");
  const [purchaseDateRange, setPurchaseDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([dayjs("2026-01-01"), dayjs("2026-12-31")]);
  const [businessLocation, setBusinessLocation] = useState<string | null>(null);
  const [customer, setCustomer] = useState("all");
  const [sellDateRange, setSellDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([dayjs("2026-01-01"), dayjs("2026-12-31")]);
  const [onlyManufactured, setOnlyManufactured] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    product: true,
    sku: true,
    description: true,
    purchaseDate: true,
    purchase: true,
    lotNumber: true,
    supplier: true,
    purchasePrice: true,
    sellDate: true,
    sale: true,
    customer: true,
    location: true,
    sellQuantity: true,
    sellingPrice: true,
    subtotal: true,
  });

  // Mock data - replace with API
  const mockData: ItemReportRow[] = [
    { key: "1", product: "Laptop Pro 15", sku: "LAP-PRO-15", description: "15\" laptop", purchaseDate: "2026-01-05", purchase: "PO-001", lotNumber: "LOT-2026-001", supplier: "Tech Supplies Ltd", purchasePrice: 1200000, sellDate: "2026-01-18", sale: "SO-001", customer: "Acme Corp", location: "C2Z Digital Solutions", sellQuantity: 2, sellingPrice: 1850000, subtotal: 3700000 },
    { key: "2", product: "Wireless Mouse", sku: "ACC-WM-01", description: "Ergonomic mouse", purchaseDate: "2026-01-08", purchase: "PO-002", lotNumber: "LOT-2026-002", supplier: "Office Solutions", purchasePrice: 28000, sellDate: "2026-01-20", sale: "SO-002", customer: "Beta Ltd", location: "C2Z Digital Solutions", sellQuantity: 15, sellingPrice: 45000, subtotal: 675000 },
    { key: "3", product: "USB-C Hub", sku: "ACC-USB-HUB", description: "7-in-1 hub", purchaseDate: "2026-01-10", purchase: "PO-003", lotNumber: "LOT-2026-003", supplier: "Tech Supplies Ltd", purchasePrice: 95000, sellDate: "2026-01-22", sale: "SO-003", customer: "Gamma Inc", location: "Location 2", sellQuantity: 8, sellingPrice: 125000, subtotal: 1000000 },
    { key: "4", product: "Monitor 24\"", sku: "MON-24-HD", description: "24\" HD monitor", purchaseDate: "2026-01-12", purchase: "PO-004", lotNumber: "LOT-2026-004", supplier: "Global Traders", purchasePrice: 320000, sellDate: "2026-01-25", sale: "SO-004", customer: "Acme Corp", location: "C2Z Digital Solutions", sellQuantity: 3, sellingPrice: 420000, subtotal: 1260000 },
    { key: "5", product: "Keyboard Mechanical", sku: "ACC-KB-MEC", description: "Mechanical keyboard", purchaseDate: "2026-01-15", purchase: "PO-005", lotNumber: "LOT-2026-005", supplier: "Office Solutions", purchasePrice: 145000, sellDate: "2026-01-28", sale: "SO-005", customer: "Beta Ltd", location: "Location 2", sellQuantity: 5, sellingPrice: 185000, subtotal: 925000 },
    { key: "6", product: "SSD 512GB", sku: "SSD-512-NVME", description: "NVMe SSD", purchaseDate: "2026-01-18", purchase: "PO-006", lotNumber: "LOT-2026-006", supplier: "Tech Supplies Ltd", purchasePrice: 145000, sellDate: "2026-02-01", sale: "SO-006", customer: "Gamma Inc", location: "C2Z Digital Solutions", sellQuantity: 10, sellingPrice: 185000, subtotal: 1850000 },
    { key: "7", product: "Extension Cord", sku: "6941950207634", description: "5m extension", purchaseDate: "2026-01-20", purchase: "PO-007", lotNumber: "LOT-2026-007", supplier: "Global Traders", purchasePrice: 30000, sellDate: "2026-02-03", sale: "SO-007", customer: "Acme Corp", location: "Location 2", sellQuantity: 20, sellingPrice: 40000, subtotal: 800000 },
    { key: "8", product: "Headphones Wireless", sku: "ACC-HP-WL", description: "Bluetooth headphones", purchaseDate: "2026-01-22", purchase: "PO-008", lotNumber: "LOT-2026-008", supplier: "Office Solutions", purchasePrice: 65000, sellDate: "2026-02-05", sale: "SO-008", customer: "Beta Ltd", location: "C2Z Digital Solutions", sellQuantity: 12, sellingPrice: 85000, subtotal: 1020000 },
  ];

  const filteredData = useMemo(() => {
    if (!searchText.trim()) return mockData;
    const q = searchText.toLowerCase();
    return mockData.filter(
      (r) =>
        r.product.toLowerCase().includes(q) ||
        r.sku.toLowerCase().includes(q) ||
        r.supplier.toLowerCase().includes(q) ||
        r.customer.toLowerCase().includes(q) ||
        r.purchase.toLowerCase().includes(q) ||
        r.sale.toLowerCase().includes(q)
    );
  }, [searchText]);

  const totals = useMemo(
    () => ({
      sellingPrice: filteredData.reduce((s, r) => s + r.sellingPrice * r.sellQuantity, 0),
      subtotal: filteredData.reduce((s, r) => s + r.subtotal, 0),
    }),
    [filteredData]
  );

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html><head><title>Items Report</title>
      <style>body{font-family:Arial;padding:20px;} table{width:100%;border-collapse:collapse;} th,td{border:1px solid #ddd;padding:8px;} th{background:#f2f2f2;}
      </style></head><body>
      <h1>Items Report</h1>
      <p>Generated: ${new Date().toLocaleString()}</p>
      <table>
      <tr><th>Product</th><th>SKU</th><th>Description</th><th>Purchase Date</th><th>Purchase</th><th>Lot Number</th><th>Supplier</th><th>Purchase Price</th><th>Sell Date</th><th>Sale</th><th>Customer</th><th>Location</th><th>Sell Quantity</th><th>Selling Price</th><th>Subtotal</th></tr>
      ${filteredData.map((r) => `<tr><td>${r.product}</td><td>${r.sku}</td><td>${r.description}</td><td>${r.purchaseDate}</td><td>${r.purchase}</td><td>${r.lotNumber}</td><td>${r.supplier}</td><td>${formatCurrency(r.purchasePrice)}</td><td>${r.sellDate}</td><td>${r.sale}</td><td>${r.customer}</td><td>${r.location}</td><td>${r.sellQuantity}</td><td>${formatCurrency(r.sellingPrice)}</td><td>${formatCurrency(r.subtotal)}</td></tr>`).join("")}
      <tr><td colspan="13"><strong>Total:</strong></td><td><strong>${formatCurrency(totals.sellingPrice)}</strong></td><td><strong>${formatCurrency(totals.subtotal)}</strong></td></tr>
      </table></body></html>
    `);
    printWindow.document.close();
    printWindow.print();
    message.success("Print dialog opened");
  };

  const handleExportCSV = () => {
    const headers = ["Product", "SKU", "Description", "Purchase Date", "Purchase", "Lot Number", "Supplier", "Purchase Price", "Sell Date", "Sale", "Customer", "Location", "Sell Quantity", "Selling Price", "Subtotal"];
    const rows = filteredData.map((r) => [r.product, r.sku, r.description, r.purchaseDate, r.purchase, r.lotNumber, r.supplier, r.purchasePrice, r.sellDate, r.sale, r.customer, r.location, r.sellQuantity, r.sellingPrice, r.subtotal]);
    const csv = [headers.join(","), ...rows.map((r) => r.map((c) => `"${c}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `items_report_${dayjs().format("YYYY-MM-DD")}.csv`;
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
          <Col xs={24} sm={12} md={8}>
            <Text style={labelStyle}>Supplier:</Text>
            <Select value={supplier} onChange={setSupplier} style={inputStyle} suffixIcon={<DownOutlined />} options={[{ label: "All", value: "all" }, { label: "Tech Supplies Ltd", value: "tech" }, { label: "Office Solutions", value: "office" }, { label: "Global Traders", value: "global" }]} />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text style={labelStyle}>Purchase Date:</Text>
            <RangePicker value={purchaseDateRange} onChange={(dates) => dates && dates[0] && dates[1] && setPurchaseDateRange([dates[0], dates[1]])} format="MM/DD/YYYY" style={inputStyle} />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text style={labelStyle}>Business Location:</Text>
            <Select value={businessLocation ?? undefined} onChange={(v) => setBusinessLocation(v || null)} style={inputStyle} suffixIcon={<DownOutlined />} placeholder="Please Select" allowClear options={[{ label: "C2Z Digital Solutions (C2Z1)", value: "C2Z Digital Solutions (C2Z1)" }, { label: "Location 2", value: "Location 2" }, { label: "Location 3", value: "Location 3" }]} />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text style={labelStyle}>Customer:</Text>
            <Select value={customer} onChange={setCustomer} style={inputStyle} suffixIcon={<DownOutlined />} options={[{ label: "All", value: "all" }, { label: "Acme Corp", value: "acme" }, { label: "Beta Ltd", value: "beta" }, { label: "Gamma Inc", value: "gamma" }]} />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text style={labelStyle}>Sell Date:</Text>
            <RangePicker value={sellDateRange} onChange={(dates) => dates && dates[0] && dates[1] && setSellDateRange([dates[0], dates[1]])} format="MM/DD/YYYY" style={inputStyle} />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text style={labelStyle}>&nbsp;</Text>
            <Checkbox checked={onlyManufactured} onChange={(e) => setOnlyManufactured(e.target.checked)} style={{ color: isDark ? "#fff" : "#1f1f1f" }}>Only manufactured products</Checkbox>
          </Col>
        </Row>
      ),
    },
  ];

  const columnLabels: Record<string, string> = {
    product: "Product",
    sku: "SKU",
    description: "Description",
    purchaseDate: "Purchase Date",
    purchase: "Purchase",
    lotNumber: "Lot Number",
    supplier: "Supplier",
    purchasePrice: "Purchase Price",
    sellDate: "Sell Date",
    sale: "Sale",
    customer: "Customer",
    location: "Location",
    sellQuantity: "Sell Quantity",
    sellingPrice: "Selling Price",
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

  const columns: ColumnsType<ItemReportRow> = [
    { title: "Product", dataIndex: "product", key: "product", width: 160, sorter: (a, b) => a.product.localeCompare(b.product), render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
    { title: "SKU", dataIndex: "sku", key: "sku", width: 120, sorter: (a, b) => a.sku.localeCompare(b.sku), render: (t: string) => <Text style={{ fontSize: 13, fontFamily: "monospace" }}>{t}</Text> },
    { title: "Description", dataIndex: "description", key: "description", width: 120, render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
    { title: "Purchase Date", dataIndex: "purchaseDate", key: "purchaseDate", width: 120, sorter: (a, b) => a.purchaseDate.localeCompare(b.purchaseDate), render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
    { title: "Purchase", dataIndex: "purchase", key: "purchase", width: 100, sorter: (a, b) => a.purchase.localeCompare(b.purchase), render: (t: string) => <Text style={{ fontSize: 13, fontFamily: "monospace" }}>{t}</Text> },
    { title: "Lot Number", dataIndex: "lotNumber", key: "lotNumber", width: 120, sorter: (a, b) => a.lotNumber.localeCompare(b.lotNumber), render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
    { title: "Supplier", dataIndex: "supplier", key: "supplier", width: 160, sorter: (a, b) => a.supplier.localeCompare(b.supplier), render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
    { title: "Purchase Price", dataIndex: "purchasePrice", key: "purchasePrice", width: 130, align: "right", sorter: (a, b) => a.purchasePrice - b.purchasePrice, render: (v: number) => <Text style={{ fontSize: 13 }}>{formatCurrency(v)}</Text> },
    { title: "Sell Date", dataIndex: "sellDate", key: "sellDate", width: 120, sorter: (a, b) => a.sellDate.localeCompare(b.sellDate), render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
    { title: "Sale", dataIndex: "sale", key: "sale", width: 100, sorter: (a, b) => a.sale.localeCompare(b.sale), render: (t: string) => <Text style={{ fontSize: 13, fontFamily: "monospace" }}>{t}</Text> },
    { title: "Customer", dataIndex: "customer", key: "customer", width: 120, sorter: (a, b) => a.customer.localeCompare(b.customer), render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
    { title: "Location", dataIndex: "location", key: "location", width: 180, sorter: (a, b) => a.location.localeCompare(b.location), render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
    { title: "Sell Quantity", dataIndex: "sellQuantity", key: "sellQuantity", width: 110, align: "right", sorter: (a, b) => a.sellQuantity - b.sellQuantity, render: (v: number) => <Text style={{ fontSize: 13 }}>{v}</Text> },
    { title: "Selling Price", dataIndex: "sellingPrice", key: "sellingPrice", width: 130, align: "right", sorter: (a, b) => a.sellingPrice - b.sellingPrice, render: (v: number) => <Text style={{ fontSize: 13 }}>{formatCurrency(v)}</Text> },
    { title: "Subtotal", dataIndex: "subtotal", key: "subtotal", width: 130, align: "right", sorter: (a, b) => a.subtotal - b.subtotal, render: (v: number) => <Text style={{ fontSize: 13, fontWeight: 500 }}>{formatCurrency(v)}</Text> },
  ];

  const visibleColumns = columns.filter((col) => col.key && columnVisibility[col.key as string] !== false);

  return (
    <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
      <Title level={2} style={{ marginBottom: 24, color: isDark ? "#fff" : "#1f1f1f", fontWeight: 600 }}>
        Items Report
      </Title>

      <Collapse
        defaultActiveKey={["1"]}
        items={collapseItems}
        style={{ marginBottom: 24, background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff", border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0", borderRadius: 8 }}
        expandIconPosition="start"
      />

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
              <Search placeholder="Search..." allowClear value={searchText} onChange={(e) => setSearchText(e.target.value)} style={{ width: 200 }} addonAfter={<Button type="primary" icon={<SearchOutlined />} />} />
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
                <Table.Summary.Cell index={0} colSpan={13}>
                  <Text strong>Total:</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1} align="right">
                  <Text strong>{formatCurrency(totals.sellingPrice)}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2} align="right">
                  <Text strong>{formatCurrency(totals.subtotal)}</Text>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          )}
        />
      </Card>
    </div>
  );
};

export default ItemsReport;
