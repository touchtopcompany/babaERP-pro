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
  Tabs,
  TimePicker,
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
  UserOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import useTheme from "@/theme/useTheme";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { Search } = Input;
const { RangePicker } = DatePicker;

interface ProductSellRow {
  key: string;
  product: string;
  sku: string;
  customerName: string;
  contactId: string;
  invoiceNo: string;
  date: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  tax: number;
  priceIncTax: number;
  total: number;
  paymentMethod: string;
}

const formatCurrency = (value: number) =>
  `TSh ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const ProductSellReport: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeTab, setActiveTab] = useState("detailed");
  const [searchProduct, setSearchProduct] = useState("");
  const [tableSearch, setTableSearch] = useState("");
  const [pageSize, setPageSize] = useState(25);
  const [customer, setCustomer] = useState<string | null>(null);
  const [category, setCategory] = useState("all");
  const [brand, setBrand] = useState("all");
  const [customerGroupName, setCustomerGroupName] = useState("all");
  const [businessLocation, setBusinessLocation] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([dayjs("2026-01-01"), dayjs("2026-12-31")]);
  const [timeRange, setTimeRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([dayjs("00:00", "HH:mm"), dayjs("23:59", "HH:mm")]);
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    product: true,
    sku: true,
    customerName: true,
    contactId: true,
    invoiceNo: true,
    date: true,
    quantity: true,
    unitPrice: true,
    discount: true,
    tax: true,
    priceIncTax: true,
    total: true,
    paymentMethod: true,
  });

  // Mock data - replace with API
  const mockData: ProductSellRow[] = [
    { key: "1", product: "Laptop Pro 15", sku: "LAP-PRO-15", customerName: "Acme Corp", contactId: "C-001", invoiceNo: "INV-2026-001", date: "2026-01-08", quantity: 2, unitPrice: 1850000, discount: 0, tax: 370000, priceIncTax: 2220000, total: 3700000, paymentMethod: "Bank Transfer" },
    { key: "2", product: "Wireless Mouse", sku: "ACC-WM-01", customerName: "Beta Ltd", contactId: "C-002", invoiceNo: "INV-2026-002", date: "2026-01-10", quantity: 15, unitPrice: 45000, discount: 6750, tax: 64125, priceIncTax: 48375, total: 675000, paymentMethod: "Cash" },
    { key: "3", product: "USB-C Hub", sku: "ACC-USB-HUB", customerName: "Gamma Inc", contactId: "C-003", invoiceNo: "INV-2026-003", date: "2026-01-12", quantity: 8, unitPrice: 125000, discount: 0, tax: 100000, priceIncTax: 135000, total: 1000000, paymentMethod: "Mobile Money" },
    { key: "4", product: "Monitor 24\"", sku: "MON-24-HD", customerName: "Acme Corp", contactId: "C-001", invoiceNo: "INV-2026-004", date: "2026-01-15", quantity: 3, unitPrice: 420000, discount: 12600, tax: 122400, priceIncTax: 453600, total: 1260000, paymentMethod: "Bank Transfer" },
    { key: "5", product: "Keyboard Mechanical", sku: "ACC-KB-MEC", customerName: "Beta Ltd", contactId: "C-002", invoiceNo: "INV-2026-005", date: "2026-01-18", quantity: 5, unitPrice: 185000, discount: 0, tax: 92500, priceIncTax: 199800, total: 925000, paymentMethod: "Credit Card" },
    { key: "6", product: "SSD 512GB", sku: "SSD-512-NVME", customerName: "Gamma Inc", contactId: "C-003", invoiceNo: "INV-2026-006", date: "2026-01-20", quantity: 10, unitPrice: 185000, discount: 18500, tax: 166500, priceIncTax: 199800, total: 1850000, paymentMethod: "Bank Transfer" },
    { key: "7", product: "Extension Cord", sku: "6941950207634", customerName: "Acme Corp", contactId: "C-001", invoiceNo: "INV-2026-007", date: "2026-01-22", quantity: 20, unitPrice: 40000, discount: 0, tax: 80000, priceIncTax: 43200, total: 800000, paymentMethod: "Cash" },
    { key: "8", product: "Headphones Wireless", sku: "ACC-HP-WL", customerName: "Beta Ltd", contactId: "C-002", invoiceNo: "INV-2026-008", date: "2026-01-25", quantity: 12, unitPrice: 85000, discount: 10200, tax: 91800, priceIncTax: 91800, total: 1020000, paymentMethod: "Mobile Money" },
  ];

  const filteredData = useMemo(() => {
    let data = [...mockData];
    if (searchProduct.trim()) {
      const q = searchProduct.toLowerCase();
      data = data.filter((r) => r.product.toLowerCase().includes(q) || r.sku.toLowerCase().includes(q));
    }
    if (customer && customer !== "none") {
      data = data.filter((r) => r.customerName === customer);
    }
    if (tableSearch.trim()) {
      const q = tableSearch.toLowerCase();
      data = data.filter(
        (r) =>
          r.product.toLowerCase().includes(q) ||
          r.sku.toLowerCase().includes(q) ||
          r.customerName.toLowerCase().includes(q) ||
          r.invoiceNo.toLowerCase().includes(q)
      );
    }
    return data;
  }, [searchProduct, tableSearch, customer]);

  const totalSum = useMemo(() => filteredData.reduce((s, r) => s + r.total, 0), [filteredData]);

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html><head><title>Product Sell Report</title>
      <style>body{font-family:Arial;padding:20px;} table{width:100%;border-collapse:collapse;} th,td{border:1px solid #ddd;padding:8px;} th{background:#f2f2f2;}
      </style></head><body>
      <h1>Product Sell Report</h1>
      <p>Generated: ${new Date().toLocaleString()}</p>
      <table>
      <tr><th>Product</th><th>SKU</th><th>Customer name</th><th>Contact ID</th><th>Invoice No.</th><th>Date</th><th>Quantity</th><th>Unit Price</th><th>Discount</th><th>Tax</th><th>Price inc. tax</th><th>Total</th><th>Payment Method</th></tr>
      ${filteredData.map((r) => `<tr><td>${r.product}</td><td>${r.sku}</td><td>${r.customerName}</td><td>${r.contactId}</td><td>${r.invoiceNo}</td><td>${r.date}</td><td>${r.quantity}</td><td>${formatCurrency(r.unitPrice)}</td><td>${formatCurrency(r.discount)}</td><td>${formatCurrency(r.tax)}</td><td>${formatCurrency(r.priceIncTax)}</td><td>${formatCurrency(r.total)}</td><td>${r.paymentMethod}</td></tr>`).join("")}
      <tr><td colspan="12"><strong>Total:</strong></td><td><strong>${formatCurrency(totalSum)}</strong></td></tr>
      </table></body></html>
    `);
    printWindow.document.close();
    printWindow.print();
    message.success("Print dialog opened");
  };

  const handleExportCSV = () => {
    const headers = ["Product", "SKU", "Customer name", "Contact ID", "Invoice No.", "Date", "Quantity", "Unit Price", "Discount", "Tax", "Price inc. tax", "Total", "Payment Method"];
    const rows = filteredData.map((r) => [r.product, r.sku, r.customerName, r.contactId, r.invoiceNo, r.date, r.quantity, r.unitPrice, r.discount, r.tax, r.priceIncTax, r.total, r.paymentMethod]);
    const csv = [headers.join(","), ...rows.map((r) => r.map((c) => `"${c}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `product_sell_report_${dayjs().format("YYYY-MM-DD")}.csv`;
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
          <Col xs={24} sm={12} md={8} lg={6}>
            <Text style={labelStyle}>Search Product:</Text>
            <Input placeholder="Enter Product name / SKU / Scan bar code" prefix={<SearchOutlined style={{ color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c" }} />} value={searchProduct} onChange={(e) => setSearchProduct(e.target.value)} allowClear style={inputStyle} />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Text style={labelStyle}><UserOutlined style={{ marginRight: 6, color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c" }} />Customer:</Text>
            <Select value={customer ?? "none"} onChange={(v) => setCustomer(v === "none" ? null : v)} style={inputStyle} suffixIcon={<DownOutlined />} placeholder="None" allowClear options={[{ label: "None", value: "none" }, { label: "Acme Corp", value: "Acme Corp" }, { label: "Beta Ltd", value: "Beta Ltd" }, { label: "Gamma Inc", value: "Gamma Inc" }]} />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Text style={labelStyle}>Category:</Text>
            <Select value={category} onChange={setCategory} style={inputStyle} suffixIcon={<DownOutlined />} options={[{ label: "All", value: "all" }, { label: "Electronics", value: "electronics" }, { label: "Accessories", value: "accessories" }]} />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Text style={labelStyle}>Brand:</Text>
            <Select value={brand} onChange={setBrand} style={inputStyle} suffixIcon={<DownOutlined />} options={[{ label: "All", value: "all" }, { label: "Brand A", value: "brand_a" }, { label: "Brand B", value: "brand_b" }]} />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Text style={labelStyle}>Customer Group Name:</Text>
            <Select value={customerGroupName} onChange={setCustomerGroupName} style={inputStyle} suffixIcon={<DownOutlined />} options={[{ label: "All", value: "all" }, { label: "Retail", value: "retail" }, { label: "Wholesale", value: "wholesale" }, { label: "Corporate", value: "corporate" }]} />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Text style={labelStyle}><EnvironmentOutlined style={{ marginRight: 6, color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c" }} />Business Location:</Text>
            <Select value={businessLocation ?? undefined} onChange={(v) => setBusinessLocation(v || null)} style={inputStyle} suffixIcon={<DownOutlined />} placeholder="Please Select" allowClear options={[{ label: "C2Z Digital Solutions (C2Z1)", value: "C2Z Digital Solutions (C2Z1)" }, { label: "Location 2", value: "Location 2" }, { label: "Location 3", value: "Location 3" }]} />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Text style={labelStyle}>Date Range:</Text>
            <RangePicker value={dateRange} onChange={(dates) => dates && dates[0] && dates[1] && setDateRange([dates[0], dates[1]])} format="MM/DD/YYYY" style={inputStyle} />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Text style={labelStyle}>Time range:</Text>
            <Space.Compact style={{ width: "100%" }}>
              <TimePicker value={timeRange[0]} onChange={(t) => t && setTimeRange([t, timeRange[1]])} format="HH:mm" style={{ ...inputStyle, width: "50%" }} />
              <TimePicker value={timeRange[1]} onChange={(t) => t && setTimeRange([timeRange[0], t])} format="HH:mm" style={{ ...inputStyle, width: "50%" }} />
            </Space.Compact>
          </Col>
        </Row>
      ),
    },
  ];

  const tabItems = [
    { key: "detailed", label: "Detailed" },
    { key: "detailed-purchase", label: "Detailed (With purchase)" },
    { key: "grouped", label: "Grouped" },
    { key: "by-category", label: "By Category" },
    { key: "by-brand", label: "By Brand" },
  ];

  const columnLabels: Record<string, string> = {
    product: "Product",
    sku: "SKU",
    customerName: "Customer name",
    contactId: "Contact ID",
    invoiceNo: "Invoice No.",
    date: "Date",
    quantity: "Quantity",
    unitPrice: "Unit Price",
    discount: "Discount",
    tax: "Tax",
    priceIncTax: "Price inc. tax",
    total: "Total",
    paymentMethod: "Payment Method",
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

  const columns: ColumnsType<ProductSellRow> = [
    { title: "Product", dataIndex: "product", key: "product", width: 160, sorter: (a, b) => a.product.localeCompare(b.product), render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
    { title: "SKU", dataIndex: "sku", key: "sku", width: 120, sorter: (a, b) => a.sku.localeCompare(b.sku), render: (t: string) => <Text style={{ fontSize: 13, fontFamily: "monospace" }}>{t}</Text> },
    { title: "Customer name", dataIndex: "customerName", key: "customerName", width: 140, sorter: (a, b) => a.customerName.localeCompare(b.customerName), render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
    { title: "Contact ID", dataIndex: "contactId", key: "contactId", width: 100, sorter: (a, b) => a.contactId.localeCompare(b.contactId), render: (t: string) => <Text style={{ fontSize: 13, fontFamily: "monospace" }}>{t}</Text> },
    { title: "Invoice No.", dataIndex: "invoiceNo", key: "invoiceNo", width: 120, sorter: (a, b) => a.invoiceNo.localeCompare(b.invoiceNo), render: (t: string) => <Text style={{ fontSize: 13, fontFamily: "monospace" }}>{t}</Text> },
    { title: "Date", dataIndex: "date", key: "date", width: 120, sorter: (a, b) => a.date.localeCompare(b.date), render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
    { title: "Quantity", dataIndex: "quantity", key: "quantity", width: 90, align: "right", sorter: (a, b) => a.quantity - b.quantity, render: (v: number) => <Text style={{ fontSize: 13 }}>{v}</Text> },
    { title: "Unit Price", dataIndex: "unitPrice", key: "unitPrice", width: 120, align: "right", sorter: (a, b) => a.unitPrice - b.unitPrice, render: (v: number) => <Text style={{ fontSize: 13 }}>{formatCurrency(v)}</Text> },
    { title: "Discount", dataIndex: "discount", key: "discount", width: 100, align: "right", sorter: (a, b) => a.discount - b.discount, render: (v: number) => <Text style={{ fontSize: 13 }}>{formatCurrency(v)}</Text> },
    { title: "Tax", dataIndex: "tax", key: "tax", width: 100, align: "right", sorter: (a, b) => a.tax - b.tax, render: (v: number) => <Text style={{ fontSize: 13 }}>{formatCurrency(v)}</Text> },
    { title: "Price inc. tax", dataIndex: "priceIncTax", key: "priceIncTax", width: 120, align: "right", sorter: (a, b) => a.priceIncTax - b.priceIncTax, render: (v: number) => <Text style={{ fontSize: 13 }}>{formatCurrency(v)}</Text> },
    { title: "Total", dataIndex: "total", key: "total", width: 120, align: "right", sorter: (a, b) => a.total - b.total, render: (v: number) => <Text style={{ fontSize: 13, fontWeight: 500 }}>{formatCurrency(v)}</Text> },
    { title: "Payment Method", dataIndex: "paymentMethod", key: "paymentMethod", width: 140, render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
  ];

  const visibleColumns = columns.filter((col) => col.key && columnVisibility[col.key as string] !== false);

  const tableContent = (
    <>
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
              <Table.Summary.Cell index={0} colSpan={12}>
                <Text strong>Total:</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={1} align="right">
                <Text strong>{formatCurrency(totalSum)}</Text>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        )}
      />
    </>
  );

  return (
    <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
      <Title level={2} style={{ marginBottom: 24, color: isDark ? "#fff" : "#1f1f1f", fontWeight: 600 }}>
        Product Sell Report
      </Title>

      <Collapse defaultActiveKey={["1"]} items={collapseItems} style={{ marginBottom: 24, background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff", border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0", borderRadius: 8 }} expandIconPosition="start" />

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
            label: tab.label,
            children: tableContent,
          }))}
        />
      </Card>
    </div>
  );
};

export default ProductSellReport;
