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
  DatePicker,
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
  EnvironmentOutlined,
  CalendarOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import useTheme from "@/theme/useTheme";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { Search } = Input;
const { RangePicker } = DatePicker;

interface StockAdjustmentRow {
  key: string;
  date: string;
  referenceNo: string;
  location: string;
  adjustmentType: string;
  totalAmount: number;
  totalAmountRecovered: number;
  reason: string;
  addedBy: string;
}

const formatCurrency = (value: number) =>
  `TSh ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const StockAdjustmentReport: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(25);
  const [locationFilter, setLocationFilter] = useState("all");
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>([dayjs("2026-01-01"), dayjs("2026-12-31")]);
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    action: true,
    date: true,
    referenceNo: true,
    location: true,
    adjustmentType: true,
    totalAmount: true,
    totalAmountRecovered: true,
    reason: true,
    addedBy: true,
  });

  // Mock summary - replace with API
  const summaryStats = useMemo(
    () => ({
      totalNormal: 1850000,
      totalAbnormal: 420000,
      totalStockAdjustment: 2270000,
      totalAmountRecovered: 380000,
    }),
    []
  );

  // Mock table data - replace with API
  const mockData: StockAdjustmentRow[] = [
    { key: "1", date: "2026-01-05", referenceNo: "SA-2026-001", location: "C2Z Digital Solutions (C2Z1)", adjustmentType: "Normal", totalAmount: 450000, totalAmountRecovered: 0, reason: "Cycle count correction", addedBy: "John Doe" },
    { key: "2", date: "2026-01-08", referenceNo: "SA-2026-002", location: "Location 2", adjustmentType: "Abnormal", totalAmount: 120000, totalAmountRecovered: 120000, reason: "Damaged goods write-off", addedBy: "Jane Smith" },
    { key: "3", date: "2026-01-12", referenceNo: "SA-2026-003", location: "C2Z Digital Solutions (C2Z1)", adjustmentType: "Normal", totalAmount: 280000, totalAmountRecovered: 0, reason: "Stock take variance", addedBy: "John Doe" },
    { key: "4", date: "2026-01-15", referenceNo: "SA-2026-004", location: "Location 3", adjustmentType: "Normal", totalAmount: 520000, totalAmountRecovered: 0, reason: "Receiving discrepancy", addedBy: "Mike Wilson" },
    { key: "5", date: "2026-01-18", referenceNo: "SA-2026-005", location: "C2Z Digital Solutions (C2Z1)", adjustmentType: "Abnormal", totalAmount: 180000, totalAmountRecovered: 80000, reason: "Expired items", addedBy: "Jane Smith" },
    { key: "6", date: "2026-01-22", referenceNo: "SA-2026-006", location: "Location 2", adjustmentType: "Normal", totalAmount: 350000, totalAmountRecovered: 0, reason: "Cycle count correction", addedBy: "John Doe" },
    { key: "7", date: "2026-01-25", referenceNo: "SA-2026-007", location: "Location 3", adjustmentType: "Abnormal", totalAmount: 120000, totalAmountRecovered: 120000, reason: "Theft/loss", addedBy: "Mike Wilson" },
    { key: "8", date: "2026-01-28", referenceNo: "SA-2026-008", location: "C2Z Digital Solutions (C2Z1)", adjustmentType: "Normal", totalAmount: 250000, totalAmountRecovered: 0, reason: "Stock take variance", addedBy: "John Doe" },
    { key: "9", date: "2026-02-02", referenceNo: "SA-2026-009", location: "Location 2", adjustmentType: "Normal", totalAmount: 150000, totalAmountRecovered: 60000, reason: "Return to supplier", addedBy: "Jane Smith" },
    { key: "10", date: "2026-02-05", referenceNo: "SA-2026-010", location: "C2Z Digital Solutions (C2Z1)", adjustmentType: "Normal", totalAmount: 380000, totalAmountRecovered: 0, reason: "Cycle count correction", addedBy: "John Doe" },
  ];

  const filteredData = useMemo(() => {
    let data = mockData;
    if (searchText.trim()) {
      const q = searchText.toLowerCase();
      data = data.filter(
        (r) =>
          r.referenceNo.toLowerCase().includes(q) ||
          r.location.toLowerCase().includes(q) ||
          r.reason.toLowerCase().includes(q) ||
          r.addedBy.toLowerCase().includes(q) ||
          r.adjustmentType.toLowerCase().includes(q)
      );
    }
    return data;
  }, [searchText]);

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html><head><title>Stock Adjustment Report</title>
      <style>body{font-family:Arial;padding:20px;} table{width:100%;border-collapse:collapse;} th,td{border:1px solid #ddd;padding:8px;} th{background:#f2f2f2;}
      </style></head><body>
      <h1>Stock Adjustment Report</h1>
      <p>Generated: ${new Date().toLocaleString()}</p>
      <p>Total Normal: ${formatCurrency(summaryStats.totalNormal)} | Total Abnormal: ${formatCurrency(summaryStats.totalAbnormal)} | Total Stock Adjustment: ${formatCurrency(summaryStats.totalStockAdjustment)} | Total Amount Recovered: ${formatCurrency(summaryStats.totalAmountRecovered)}</p>
      <table>
      <tr><th>Date</th><th>Reference No</th><th>Location</th><th>Adjustment type</th><th>Total Amount</th><th>Total amount recovered</th><th>Reason</th><th>Added By</th></tr>
      ${filteredData.map((r) => `<tr><td>${r.date}</td><td>${r.referenceNo}</td><td>${r.location}</td><td>${r.adjustmentType}</td><td>${formatCurrency(r.totalAmount)}</td><td>${formatCurrency(r.totalAmountRecovered)}</td><td>${r.reason}</td><td>${r.addedBy}</td></tr>`).join("")}
      </table></body></html>
    `);
    printWindow.document.close();
    printWindow.print();
    message.success("Print dialog opened");
  };

  const handleExportCSV = () => {
    const headers = ["Date", "Reference No", "Location", "Adjustment type", "Total Amount", "Total amount recovered", "Reason", "Added By"];
    const rows = filteredData.map((r) => [r.date, r.referenceNo, r.location, r.adjustmentType, r.totalAmount, r.totalAmountRecovered, r.reason, r.addedBy]);
    const csv = [headers.join(","), ...rows.map((r) => r.map((c) => `"${c}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `stock_adjustment_report_${dayjs().format("YYYY-MM-DD")}.csv`;
    a.click();
    message.success("Exported to CSV");
  };

  const handleView = (record: StockAdjustmentRow) => {
    message.info(`View adjustment: ${record.referenceNo}`);
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
    date: "Date",
    referenceNo: "Reference No",
    location: "Location",
    adjustmentType: "Adjustment type",
    totalAmount: "Total Amount",
    totalAmountRecovered: "Total amount recovered",
    reason: "Reason",
    addedBy: "Added By",
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

  const columns: ColumnsType<StockAdjustmentRow> = [
    {
      title: "Action",
      key: "action",
      width: 120,
      fixed: "left",
      render: (_: unknown, record: StockAdjustmentRow) => (
        <Button type="link" size="small" icon={<EyeOutlined />} onClick={() => handleView(record)} style={{ padding: 0 }}>
          View
        </Button>
      ),
    },
    { title: "Date", dataIndex: "date", key: "date", width: 120, sorter: (a, b) => a.date.localeCompare(b.date), render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
    { title: "Reference No", dataIndex: "referenceNo", key: "referenceNo", width: 130, sorter: (a, b) => a.referenceNo.localeCompare(b.referenceNo), render: (t: string) => <Text style={{ fontSize: 13, fontFamily: "monospace" }}>{t}</Text> },
    { title: "Location", dataIndex: "location", key: "location", width: 220, sorter: (a, b) => a.location.localeCompare(b.location), render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
    { title: "Adjustment type", dataIndex: "adjustmentType", key: "adjustmentType", width: 130, sorter: (a, b) => a.adjustmentType.localeCompare(b.adjustmentType), render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
    { title: "Total Amount", dataIndex: "totalAmount", key: "totalAmount", width: 140, align: "right", sorter: (a, b) => a.totalAmount - b.totalAmount, render: (v: number) => <Text style={{ fontSize: 13 }}>{formatCurrency(v)}</Text> },
    { title: "Total amount recovered", dataIndex: "totalAmountRecovered", key: "totalAmountRecovered", width: 160, align: "right", sorter: (a, b) => a.totalAmountRecovered - b.totalAmountRecovered, render: (v: number) => <Text style={{ fontSize: 13 }}>{formatCurrency(v)}</Text> },
    { title: "Reason", dataIndex: "reason", key: "reason", width: 180, render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
    { title: "Added By", dataIndex: "addedBy", key: "addedBy", width: 120, sorter: (a, b) => a.addedBy.localeCompare(b.addedBy), render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
  ];

  const visibleColumns = columns.filter((col) => col.key && columnVisibility[col.key as string] !== false);

  return (
    <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }} justify="space-between" align="middle">
        <Col>
          <Title level={2} style={{ margin: 0, color: isDark ? "#fff" : "#1f1f1f", fontWeight: 600 }}>
            Stock Adjustment Report
          </Title>
        </Col>
        <Col>
          <Space wrap>
            <Space>
              <EnvironmentOutlined style={{ color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c" }} />
              <Select
                value={locationFilter}
                onChange={setLocationFilter}
                options={[
                  { label: "All locations", value: "all" },
                  { label: "C2Z Digital Solutions (C2Z1)", value: "C2Z Digital Solutions (C2Z1)" },
                  { label: "Location 2", value: "Location 2" },
                  { label: "Location 3", value: "Location 3" },
                ]}
                style={{ width: 200 }}
                suffixIcon={<DownOutlined />}
                placeholder="All locations"
                allowClear
              />
            </Space>
            <Dropdown
              trigger={["click"]}
              dropdownRender={() => (
                <Card style={{ padding: 16, boxShadow: "0 6px 16px rgba(0,0,0,0.08)" }}>
                  <Text style={{ display: "block", marginBottom: 8, fontSize: 13 }}>Filter by date</Text>
                  <RangePicker value={dateRange} onChange={(dates) => setDateRange(dates as [dayjs.Dayjs, dayjs.Dayjs] | null)} format="MM/DD/YYYY" style={{ width: "100%" }} />
                </Card>
              )}
            >
              <Button type="primary" icon={<CalendarOutlined />} style={{ height: 40, borderRadius: 6 }}>
                Filter by date <DownOutlined style={{ fontSize: 10, marginLeft: 4 }} />
              </Button>
            </Dropdown>
          </Space>
        </Col>
      </Row>

      {/* Summary cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={12}>
          <Card style={{ background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff", border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0", borderRadius: 8 }} styles={{ body: { padding: "20px 24px" } }}>
            <Row justify="space-between" align="middle" style={{ marginBottom: 12 }}>
              <Text style={{ fontSize: 13, color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>Total Normal:</Text>
              <div style={summaryRowStyle}>{formatCurrency(summaryStats.totalNormal)}</div>
            </Row>
            <Row justify="space-between" align="middle" style={{ marginBottom: 12 }}>
              <Text style={{ fontSize: 13, color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>Total Abnormal:</Text>
              <div style={summaryRowStyle}>{formatCurrency(summaryStats.totalAbnormal)}</div>
            </Row>
            <Row justify="space-between" align="middle">
              <Text style={{ fontSize: 13, color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>Total Stock Adjustment:</Text>
              <div style={summaryRowStyle}>{formatCurrency(summaryStats.totalStockAdjustment)}</div>
            </Row>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card style={{ background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff", border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0", borderRadius: 8 }} styles={{ body: { padding: "20px 24px" } }}>
            <Row justify="space-between" align="middle">
              <Text style={{ fontSize: 13, color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>Total Amount Recovered:</Text>
              <div style={summaryRowStyle}>{formatCurrency(summaryStats.totalAmountRecovered)}</div>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Stock Adjustments table */}
      <Card
        style={{
          background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
          border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
          borderRadius: 8,
          overflow: "hidden",
        }}
        styles={{ body: { padding: "24px" } }}
      >
        <Title level={5} style={{ margin: "0 0 16px 0", color: isDark ? "#fff" : "#1f1f1f", fontWeight: 600 }}>
          Stock Adjustments
        </Title>
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
        />
      </Card>
    </div>
  );
};

export default StockAdjustmentReport;
