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
  UserOutlined,
  EnvironmentOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import useTheme from "@/theme/useTheme";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

interface PurchasePaymentRow {
  key: string;
  referenceNo: string;
  paidOn: string;
  amount: number;
  supplier: string;
  paymentMethod: string;
  purchase: string;
}

const formatCurrency = (value: number) =>
  `TSh ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const PurchasePaymentReport: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [tableSearch, setTableSearch] = useState("");
  const [pageSize, setPageSize] = useState(25);
  const [supplier, setSupplier] = useState<string | null>(null);
  const [businessLocation, setBusinessLocation] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([dayjs("2026-01-01"), dayjs("2026-12-31")]);
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    referenceNo: true,
    paidOn: true,
    amount: true,
    supplier: true,
    paymentMethod: true,
    purchase: true,
    action: true,
  });

  const mockData: PurchasePaymentRow[] = [
    { key: "1", referenceNo: "PP2025/0001", paidOn: "10/14/2025 18:11", amount: 640000, supplier: "LENYES CO.", paymentMethod: "Cash", purchase: "PO2025/0001" },
    { key: "2", referenceNo: "PP2025/0002", paidOn: "10/15/2025 09:30", amount: 1200000, supplier: "Tech Supplies Ltd", paymentMethod: "Bank Transfer", purchase: "PO2025/0002" },
    { key: "3", referenceNo: "PP2025/0003", paidOn: "10/16/2025 14:00", amount: 450000, supplier: "Office Solutions", paymentMethod: "Mobile Money", purchase: "PO2025/0003" },
    { key: "4", referenceNo: "PP2025/0004", paidOn: "10/17/2025 11:45", amount: 2100000, supplier: "LENYES CO.", paymentMethod: "Cash", purchase: "PO2025/0004" },
    { key: "5", referenceNo: "PP2025/0005", paidOn: "10/18/2025 16:20", amount: 890000, supplier: "Global Traders", paymentMethod: "Credit Card", purchase: "PO2025/0005" },
  ];

  const filteredData = useMemo(() => {
    let data = [...mockData];
    if (supplier) {
      data = data.filter((r) => r.supplier === supplier);
    }
    if (tableSearch.trim()) {
      const q = tableSearch.toLowerCase();
      data = data.filter(
        (r) =>
          r.referenceNo.toLowerCase().includes(q) ||
          r.supplier.toLowerCase().includes(q) ||
          r.purchase.toLowerCase().includes(q) ||
          r.paymentMethod.toLowerCase().includes(q)
      );
    }
    return data;
  }, [tableSearch, supplier]);

  const totalAmount = useMemo(() => filteredData.reduce((s, r) => s + r.amount, 0), [filteredData]);

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html><head><title>Purchase Payment Report</title>
      <style>body{font-family:Arial;padding:20px;} table{width:100%;border-collapse:collapse;} th,td{border:1px solid #ddd;padding:8px;} th{background:#f2f2f2;}
      </style></head><body>
      <h1>Purchase Payment Report</h1>
      <p>Generated: ${new Date().toLocaleString()}</p>
      <table>
      <tr><th>Reference No</th><th>Paid on</th><th>Amount</th><th>Supplier</th><th>Payment Method</th><th>Purchase</th></tr>
      ${filteredData.map((r) => `<tr><td>${r.referenceNo}</td><td>${r.paidOn}</td><td>${formatCurrency(r.amount)}</td><td>${r.supplier}</td><td>${r.paymentMethod}</td><td>${r.purchase}</td></tr>`).join("")}
      <tr><td colspan="5"><strong>Total:</strong></td><td><strong>${formatCurrency(totalAmount)}</strong></td></tr>
      </table></body></html>
    `);
    printWindow.document.close();
    printWindow.print();
    message.success("Print dialog opened");
  };

  const handleExportCSV = () => {
    const headers = ["Reference No", "Paid on", "Amount", "Supplier", "Payment Method", "Purchase"];
    const rows = filteredData.map((r) => [r.referenceNo, r.paidOn, formatCurrency(r.amount), r.supplier, r.paymentMethod, r.purchase]);
    const csv = [headers.join(","), ...rows.map((r) => r.map((c) => `"${c}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `purchase_payment_report_${dayjs().format("YYYY-MM-DD")}.csv`;
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
            <Text style={labelStyle}><UserOutlined style={{ marginRight: 6, color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c" }} />Supplier:</Text>
            <Select
              value={supplier ?? undefined}
              onChange={(v) => setSupplier(v || null)}
              style={inputStyle}
              suffixIcon={<DownOutlined />}
              placeholder="Please Select"
              allowClear
              options={[
                { label: "LENYES CO.", value: "LENYES CO." },
                { label: "Tech Supplies Ltd", value: "Tech Supplies Ltd" },
                { label: "Office Solutions", value: "Office Solutions" },
                { label: "Global Traders", value: "Global Traders" },
              ]}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={8}>
            <Text style={labelStyle}><EnvironmentOutlined style={{ marginRight: 6, color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c" }} />Business Location:</Text>
            <Select
              value={businessLocation ?? undefined}
              onChange={(v) => setBusinessLocation(v || null)}
              style={inputStyle}
              suffixIcon={<DownOutlined />}
              placeholder="Please Select"
              allowClear
              options={[
                { label: "C2Z Digital Solutions (C2Z1)", value: "C2Z Digital Solutions (C2Z1)" },
                { label: "Location 2", value: "Location 2" },
                { label: "Location 3", value: "Location 3" },
              ]}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={8}>
            <Text style={labelStyle}>Date Range:</Text>
            <RangePicker value={dateRange} onChange={(dates) => dates && dates[0] && dates[1] && setDateRange([dates[0], dates[1]])} format="MM/DD/YYYY" style={inputStyle} />
          </Col>
        </Row>
      ),
    },
  ];

  const columnLabels: Record<string, string> = {
    referenceNo: "Reference No",
    paidOn: "Paid on",
    amount: "Amount",
    supplier: "Supplier",
    paymentMethod: "Payment Method",
    purchase: "Purchase",
    action: "Action",
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

  const columns: ColumnsType<PurchasePaymentRow> = [
    { title: "Reference No", dataIndex: "referenceNo", key: "referenceNo", width: 140, sorter: (a, b) => a.referenceNo.localeCompare(b.referenceNo), render: (t: string) => <Text style={{ fontSize: 13, fontFamily: "monospace" }}>{t}</Text> },
    { title: "Paid on", dataIndex: "paidOn", key: "paidOn", width: 150, sorter: (a, b) => a.paidOn.localeCompare(b.paidOn), render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
    { title: "Amount", dataIndex: "amount", key: "amount", width: 140, align: "right", sorter: (a, b) => a.amount - b.amount, render: (v: number) => <Text style={{ fontSize: 13, fontWeight: 500 }}>{formatCurrency(v)}</Text> },
    { title: "Supplier", dataIndex: "supplier", key: "supplier", width: 160, sorter: (a, b) => a.supplier.localeCompare(b.supplier), render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
    { title: "Payment Method", dataIndex: "paymentMethod", key: "paymentMethod", width: 140, render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
    { title: "Purchase", dataIndex: "purchase", key: "purchase", width: 130, sorter: (a, b) => a.purchase.localeCompare(b.purchase), render: (t: string) => <Typography.Link style={{ fontSize: 13 }} onClick={() => message.info(`View purchase ${t}`)}>{t}</Typography.Link> },
    { title: "Action", key: "action", width: 100, sorter: () => 0, render: (_, record) => <Button type="primary" size="small" icon={<EyeOutlined />} onClick={() => message.info(`View payment ${record.referenceNo}`)}>View</Button> },
  ];

  const visibleColumns = columns.filter((col) => col.key && columnVisibility[col.key as string] !== false);

  return (
    <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
      <Title level={2} style={{ marginBottom: 24, color: isDark ? "#fff" : "#1f1f1f", fontWeight: 600 }}>
        Purchase Payment Report
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
              <Input placeholder="Search..." allowClear value={tableSearch} onChange={(e) => setTableSearch(e.target.value)} style={{ width: 200 }} addonAfter={<Button type="primary" icon={<SearchOutlined />} />} />
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
          summary={() => {
            const visibleCount = visibleColumns.length;
            return (
              <Table.Summary fixed>
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0} colSpan={visibleCount > 1 ? visibleCount - 1 : 1}>
                    <Text strong>Total:</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={1} align="right">
                    <Text strong>{formatCurrency(totalAmount)}</Text>
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

export default PurchasePaymentReport;
