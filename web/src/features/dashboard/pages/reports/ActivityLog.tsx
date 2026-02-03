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
const { RangePicker } = DatePicker;

interface ActivityLogRow {
  key: string;
  date: string;
  subjectType: string;
  action: string;
  by: string;
  note: string;
}

const ActivityLog: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [tableSearch, setTableSearch] = useState("");
  const [pageSize, setPageSize] = useState(25);
  const [filterBy, setFilterBy] = useState<string>("all");
  const [subjectType, setSubjectType] = useState<string>("all");
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([dayjs("2026-01-01"), dayjs("2026-12-31")]);
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    date: true,
    subjectType: true,
    action: true,
    by: true,
    note: true,
  });

  const mockData: ActivityLogRow[] = [
    { key: "1", date: "02/03/2026 07:48", subjectType: "User", action: "Login", by: "Mr C2Z Electronics", note: "" },
    { key: "2", date: "02/03/2026 06:22", subjectType: "User", action: "Login", by: "Mr C2Z Electronics", note: "" },
    { key: "3", date: "02/02/2026 18:15", subjectType: "User", action: "Login", by: "Mr C2Z Electronics", note: "" },
    { key: "4", date: "02/02/2026 09:30", subjectType: "User", action: "Login", by: "Mr C2Z Electronics", note: "" },
    { key: "5", date: "02/01/2026 14:05", subjectType: "User", action: "Logout", by: "Mr C2Z Electronics", note: "" },
    { key: "6", date: "02/01/2026 08:00", subjectType: "System", action: "Backup completed", by: "System", note: "Daily backup" },
  ];

  const filteredData = useMemo(() => {
    let data = [...mockData];
    if (filterBy && filterBy !== "all") {
      data = data.filter((r) => r.by === filterBy);
    }
    if (subjectType && subjectType !== "all") {
      data = data.filter((r) => r.subjectType === subjectType);
    }
    if (tableSearch.trim()) {
      const q = tableSearch.toLowerCase();
      data = data.filter(
        (r) =>
          r.date.toLowerCase().includes(q) ||
          r.subjectType.toLowerCase().includes(q) ||
          r.action.toLowerCase().includes(q) ||
          r.by.toLowerCase().includes(q) ||
          (r.note && r.note.toLowerCase().includes(q))
      );
    }
    return data;
  }, [tableSearch, filterBy, subjectType]);

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html><head><title>Activity Log</title>
      <style>body{font-family:Arial;padding:20px;} table{width:100%;border-collapse:collapse;} th,td{border:1px solid #ddd;padding:8px;} th{background:#f2f2f2;}
      </style></head><body>
      <h1>Activity Log</h1>
      <p>Generated: ${new Date().toLocaleString()}</p>
      <table>
      <tr><th>Date</th><th>Subject Type</th><th>Action</th><th>By</th><th>Note</th></tr>
      ${filteredData.map((r) => `<tr><td>${r.date}</td><td>${r.subjectType}</td><td>${r.action}</td><td>${r.by}</td><td>${r.note || ""}</td></tr>`).join("")}
      </table></body></html>
    `);
    printWindow.document.close();
    printWindow.print();
    message.success("Print dialog opened");
  };

  const handleExportCSV = () => {
    const headers = ["Date", "Subject Type", "Action", "By", "Note"];
    const rows = filteredData.map((r) => [r.date, r.subjectType, r.action, r.by, r.note || ""]);
    const csv = [headers.join(","), ...rows.map((r) => r.map((c) => `"${c}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `activity_log_${dayjs().format("YYYY-MM-DD")}.csv`;
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
            <Text style={labelStyle}>By:</Text>
            <Select
              value={filterBy}
              onChange={setFilterBy}
              style={inputStyle}
              suffixIcon={<DownOutlined />}
              options={[
                { label: "All", value: "all" },
                { label: "Mr C2Z Electronics", value: "Mr C2Z Electronics" },
                { label: "System", value: "System" },
              ]}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={8}>
            <Text style={labelStyle}>Subject Type:</Text>
            <Select
              value={subjectType}
              onChange={setSubjectType}
              style={inputStyle}
              suffixIcon={<DownOutlined />}
              options={[
                { label: "All", value: "all" },
                { label: "User", value: "User" },
                { label: "System", value: "System" },
                { label: "Item", value: "Item" },
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
    date: "Date",
    subjectType: "Subject Type",
    action: "Action",
    by: "By",
    note: "Note",
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

  const columns: ColumnsType<ActivityLogRow> = [
    { title: "Date", dataIndex: "date", key: "date", width: 160, sorter: (a, b) => a.date.localeCompare(b.date), render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
    { title: "Subject Type", dataIndex: "subjectType", key: "subjectType", width: 140, sorter: (a, b) => a.subjectType.localeCompare(b.subjectType), render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
    { title: "Action", dataIndex: "action", key: "action", width: 160, sorter: (a, b) => a.action.localeCompare(b.action), render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
    { title: "By", dataIndex: "by", key: "by", width: 200, sorter: (a, b) => a.by.localeCompare(b.by), render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
    { title: "Note", dataIndex: "note", key: "note", width: 220, render: (t: string) => <Text style={{ fontSize: 13 }}>{t || "—"}</Text> },
  ];

  const visibleColumns = columns.filter((col) => col.key && columnVisibility[col.key as string] !== false);

  return (
    <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
      <Title level={2} style={{ marginBottom: 24, color: isDark ? "#fff" : "#1f1f1f", fontWeight: 600 }}>
        Activity Log
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
        />
      </Card>
    </div>
  );
};

export default ActivityLog;
