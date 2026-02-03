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
  EyeOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import useTheme from "@/theme/useTheme";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

interface RegisterRow {
  key: string;
  openTime: string;
  closeTime: string;
  location: string;
  user: string;
  totalCardSlips: number;
  totalCheques: number;
  totalCash: number;
  totalBankTransfer: number;
  totalAdvancePayment: number;
  otherPayments: number;
  total: number;
  cashToBank: number;
}

const formatCurrency = (value: number) =>
  `TSh ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const RegisterReport: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [tableSearch, setTableSearch] = useState("");
  const [pageSize, setPageSize] = useState(25);
  const [businessLocation, setBusinessLocation] = useState<string>("C2Z Digital Solutions (C2Z1)");
  const [user, setUser] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([dayjs("2026-01-01"), dayjs("2026-12-31")]);
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    openTime: true,
    closeTime: true,
    location: true,
    user: true,
    totalCardSlips: true,
    totalCheques: true,
    totalCash: true,
    totalBankTransfer: true,
    totalAdvancePayment: true,
    otherPayments: true,
    total: true,
    cashToBank: true,
    action: true,
  });

  const mockData: RegisterRow[] = [
    { key: "1", openTime: "10/14/2025 12:41", closeTime: "10/14/2025 13:27", location: "C2Z Digital Solutions", user: "Mr C2Z Electronics admin@c2z.tz", totalCardSlips: 0, totalCheques: 0, totalCash: 2350000, totalBankTransfer: 0, totalAdvancePayment: 0, otherPayments: 0, total: 2350000, cashToBank: 2350000 },
    { key: "2", openTime: "10/14/2025 14:00", closeTime: "10/14/2025 15:30", location: "C2Z Digital Solutions", user: "Mr C2Z Electronics admin@c2z.tz", totalCardSlips: 0, totalCheques: 0, totalCash: 299000, totalBankTransfer: 0, totalAdvancePayment: 0, otherPayments: 0, total: 299000, cashToBank: 299000 },
    { key: "3", openTime: "10/15/2025 09:00", closeTime: "10/15/2025 12:00", location: "C2Z Digital Solutions", user: "Mr C2Z Electronics admin@c2z.tz", totalCardSlips: 0, totalCheques: 0, totalCash: 450000, totalBankTransfer: 0, totalAdvancePayment: 0, otherPayments: 0, total: 450000, cashToBank: 450000 },
    { key: "4", openTime: "10/15/2025 13:00", closeTime: "10/15/2025 17:00", location: "C2Z Digital Solutions", user: "Mr C2Z Electronics admin@c2z.tz", totalCardSlips: 0, totalCheques: 0, totalCash: 420000, totalBankTransfer: 0, totalAdvancePayment: 0, otherPayments: 0, total: 420000, cashToBank: 420000 },
    { key: "5", openTime: "10/16/2025 08:30", closeTime: "10/16/2025 11:45", location: "C2Z Digital Solutions", user: "Mr C2Z Electronics admin@c2z.tz", totalCardSlips: 0, totalCheques: 0, totalCash: 325000, totalBankTransfer: 0, totalAdvancePayment: 0, otherPayments: 0, total: 325000, cashToBank: 325000 },
  ];

  const filteredData = useMemo(() => {
    let data = [...mockData];
    if (tableSearch.trim()) {
      const q = tableSearch.toLowerCase();
      data = data.filter(
        (r) =>
          r.location.toLowerCase().includes(q) ||
          r.user.toLowerCase().includes(q) ||
          r.openTime.toLowerCase().includes(q) ||
          r.closeTime.toLowerCase().includes(q)
      );
    }
    return data;
  }, [tableSearch]);

  const sums = useMemo(
    () => ({
      totalCardSlips: filteredData.reduce((s, r) => s + r.totalCardSlips, 0),
      totalCheques: filteredData.reduce((s, r) => s + r.totalCheques, 0),
      totalCash: filteredData.reduce((s, r) => s + r.totalCash, 0),
      totalBankTransfer: filteredData.reduce((s, r) => s + r.totalBankTransfer, 0),
      totalAdvancePayment: filteredData.reduce((s, r) => s + r.totalAdvancePayment, 0),
      otherPayments: filteredData.reduce((s, r) => s + r.otherPayments, 0),
      total: filteredData.reduce((s, r) => s + r.total, 0),
      cashToBank: filteredData.reduce((s, r) => s + r.cashToBank, 0),
    }),
    [filteredData]
  );

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html><head><title>Register Report</title>
      <style>body{font-family:Arial;padding:20px;} table{width:100%;border-collapse:collapse;} th,td{border:1px solid #ddd;padding:8px;} th{background:#f2f2f2;}
      </style></head><body>
      <h1>Register Report</h1>
      <p>Generated: ${new Date().toLocaleString()}</p>
      <table>
      <tr><th>Open Time</th><th>Close Time</th><th>Location</th><th>User</th><th>Total Card Slips</th><th>Total cheques</th><th>Total Cash</th><th>Total bank transfer</th><th>Total advance payment</th><th>Other Payments</th><th>Total</th><th>Cash To Bank</th></tr>
      ${filteredData.map((r) => `<tr><td>${r.openTime}</td><td>${r.closeTime}</td><td>${r.location}</td><td>${r.user}</td><td>${formatCurrency(r.totalCardSlips)}</td><td>${formatCurrency(r.totalCheques)}</td><td>${formatCurrency(r.totalCash)}</td><td>${formatCurrency(r.totalBankTransfer)}</td><td>${formatCurrency(r.totalAdvancePayment)}</td><td>${formatCurrency(r.otherPayments)}</td><td>${formatCurrency(r.total)}</td><td>${formatCurrency(r.cashToBank)}</td></tr>`).join("")}
      <tr><td colspan="4"><strong>Total:</strong></td><td><strong>${formatCurrency(sums.totalCardSlips)}</strong></td><td><strong>${formatCurrency(sums.totalCheques)}</strong></td><td><strong>${formatCurrency(sums.totalCash)}</strong></td><td><strong>${formatCurrency(sums.totalBankTransfer)}</strong></td><td><strong>${formatCurrency(sums.totalAdvancePayment)}</strong></td><td><strong>${formatCurrency(sums.otherPayments)}</strong></td><td><strong>${formatCurrency(sums.total)}</strong></td><td><strong>${formatCurrency(sums.cashToBank)}</strong></td></tr>
      </table></body></html>
    `);
    printWindow.document.close();
    printWindow.print();
    message.success("Print dialog opened");
  };

  const handleExportCSV = () => {
    const headers = ["Open Time", "Close Time", "Location", "User", "Total Card Slips", "Total cheques", "Total Cash", "Total bank transfer", "Total advance payment", "Other Payments", "Total", "Cash To Bank"];
    const rows = filteredData.map((r) => [r.openTime, r.closeTime, r.location, r.user, formatCurrency(r.totalCardSlips), formatCurrency(r.totalCheques), formatCurrency(r.totalCash), formatCurrency(r.totalBankTransfer), formatCurrency(r.totalAdvancePayment), formatCurrency(r.otherPayments), formatCurrency(r.total), formatCurrency(r.cashToBank)]);
    const csv = [headers.join(","), ...rows.map((r) => r.map((c) => `"${c}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `register_report_${dayjs().format("YYYY-MM-DD")}.csv`;
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
            <Text style={labelStyle}>Business Location:</Text>
            <Select
              value={businessLocation}
              onChange={setBusinessLocation}
              style={inputStyle}
              suffixIcon={<DownOutlined />}
              options={[
                { label: "C2Z Digital Solutions (C2Z1)", value: "C2Z Digital Solutions (C2Z1)" },
                { label: "Location 2", value: "Location 2" },
                { label: "Location 3", value: "Location 3" },
              ]}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Text style={labelStyle}>User:</Text>
            <Select
              value={user}
              onChange={setUser}
              style={inputStyle}
              suffixIcon={<DownOutlined />}
              options={[
                { label: "All Users", value: "all" },
                { label: "Mr C2Z Electronics admin@c2z.tz", value: "mr_c2z" },
              ]}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Text style={labelStyle}>Status:</Text>
            <Select
              value={status}
              onChange={setStatus}
              style={inputStyle}
              suffixIcon={<DownOutlined />}
              options={[
                { label: "All", value: "all" },
                { label: "Open", value: "open" },
                { label: "Closed", value: "closed" },
              ]}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Text style={labelStyle}>Date Range:</Text>
            <RangePicker value={dateRange} onChange={(dates) => dates && dates[0] && dates[1] && setDateRange([dates[0], dates[1]])} format="MM/DD/YYYY" style={inputStyle} />
          </Col>
        </Row>
      ),
    },
  ];

  const columnLabels: Record<string, string> = {
    openTime: "Open Time",
    closeTime: "Close Time",
    location: "Location",
    user: "User",
    totalCardSlips: "Total Card Slips",
    totalCheques: "Total cheques",
    totalCash: "Total Cash",
    totalBankTransfer: "Total bank transfer",
    totalAdvancePayment: "Total advance payment",
    otherPayments: "Other Payments",
    total: "Total",
    cashToBank: "Cash To Bank",
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

  const columns: ColumnsType<RegisterRow> = [
    { title: "Open Time", dataIndex: "openTime", key: "openTime", width: 150, sorter: (a, b) => a.openTime.localeCompare(b.openTime), render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
    { title: "Close Time", dataIndex: "closeTime", key: "closeTime", width: 150, sorter: (a, b) => a.closeTime.localeCompare(b.closeTime), render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
    { title: "Location", dataIndex: "location", key: "location", width: 180, sorter: (a, b) => a.location.localeCompare(b.location), render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
    { title: "User", dataIndex: "user", key: "user", width: 220, sorter: (a, b) => a.user.localeCompare(b.user), render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
    { title: "Total Card Slips", dataIndex: "totalCardSlips", key: "totalCardSlips", width: 130, align: "right", sorter: (a, b) => a.totalCardSlips - b.totalCardSlips, render: (v: number) => <Text style={{ fontSize: 13 }}>{formatCurrency(v)}</Text> },
    { title: "Total cheques", dataIndex: "totalCheques", key: "totalCheques", width: 120, align: "right", sorter: (a, b) => a.totalCheques - b.totalCheques, render: (v: number) => <Text style={{ fontSize: 13 }}>{formatCurrency(v)}</Text> },
    { title: "Total Cash", dataIndex: "totalCash", key: "totalCash", width: 140, align: "right", sorter: (a, b) => a.totalCash - b.totalCash, render: (v: number) => <Text style={{ fontSize: 13, fontWeight: 500 }}>{formatCurrency(v)}</Text> },
    { title: "Total bank transfer", dataIndex: "totalBankTransfer", key: "totalBankTransfer", width: 150, align: "right", sorter: (a, b) => a.totalBankTransfer - b.totalBankTransfer, render: (v: number) => <Text style={{ fontSize: 13 }}>{formatCurrency(v)}</Text> },
    { title: "Total advance payment", dataIndex: "totalAdvancePayment", key: "totalAdvancePayment", width: 170, align: "right", sorter: (a, b) => a.totalAdvancePayment - b.totalAdvancePayment, render: (v: number) => <Text style={{ fontSize: 13 }}>{formatCurrency(v)}</Text> },
    { title: "Other Payments", dataIndex: "otherPayments", key: "otherPayments", width: 130, align: "right", sorter: (a, b) => a.otherPayments - b.otherPayments, render: (v: number) => <Text style={{ fontSize: 13 }}>{formatCurrency(v)}</Text> },
    { title: "Total", dataIndex: "total", key: "total", width: 130, align: "right", sorter: (a, b) => a.total - b.total, render: (v: number) => <Text style={{ fontSize: 13, fontWeight: 500 }}>{formatCurrency(v)}</Text> },
    { title: "Cash To Bank", dataIndex: "cashToBank", key: "cashToBank", width: 140, align: "right", sorter: (a, b) => a.cashToBank - b.cashToBank, render: (v: number) => <Text style={{ fontSize: 13 }}>{formatCurrency(v)}</Text> },
    { title: "Action", key: "action", width: 100, sorter: () => 0, render: (_, record) => <Button type="primary" size="small" icon={<EyeOutlined />} onClick={() => message.info(`View register ${record.openTime}`)}>View</Button> },
  ];

  const visibleColumns = columns.filter((col) => col.key && columnVisibility[col.key as string] !== false);

  const sumByKey: Record<string, number> = {
    totalCardSlips: sums.totalCardSlips,
    totalCheques: sums.totalCheques,
    totalCash: sums.totalCash,
    totalBankTransfer: sums.totalBankTransfer,
    totalAdvancePayment: sums.totalAdvancePayment,
    otherPayments: sums.otherPayments,
    total: sums.total,
    cashToBank: sums.cashToBank,
  };

  const labelKeys = ["openTime", "closeTime", "location", "user"];
  const renderSummary = () => {
    const cells: React.ReactNode[] = [];
    let labelColSpan = 0;
    visibleColumns.forEach((col) => {
      const key = col.key as string;
      if (labelKeys.includes(key)) labelColSpan++;
    });
    if (labelColSpan > 0) {
      cells.push(
        <Table.Summary.Cell key="total-label" index={0} colSpan={labelColSpan}>
          <Text strong>Total:</Text>
        </Table.Summary.Cell>
      );
    }
    let cellIndex = labelColSpan;
    visibleColumns.forEach((col) => {
      const key = col.key as string;
      if (labelKeys.includes(key)) return;
      if (key === "action") {
        cells.push(<Table.Summary.Cell key="action" index={cellIndex} />);
        cellIndex++;
      } else if (sumByKey[key] !== undefined) {
        cells.push(
          <Table.Summary.Cell key={key} index={cellIndex} align="right">
            <Text strong>{formatCurrency(sumByKey[key])}</Text>
          </Table.Summary.Cell>
        );
        cellIndex++;
      }
    });
    return cells;
  };

  return (
    <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
      <Title level={2} style={{ marginBottom: 24, color: isDark ? "#fff" : "#1f1f1f", fontWeight: 600 }}>
        Register Report
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
          summary={() => (
            <Table.Summary fixed>
              <Table.Summary.Row>{renderSummary()}</Table.Summary.Row>
            </Table.Summary>
          )}
        />
      </Card>
    </div>
  );
};

export default RegisterReport;
