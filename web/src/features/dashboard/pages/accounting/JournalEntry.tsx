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
  PlusOutlined,
  SearchOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  PrinterOutlined,
  UnorderedListOutlined,
  FileTextOutlined,
  DownOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import useTheme from "@/theme/useTheme";
import { ViewModal, EditModal, DeleteModal } from "@/components/modals";
import { FilterPanel } from "../../components/filters";
import type { FilterConfig } from "../../components/filters";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { Search } = Input;

export interface JournalEntryData {
  key: string;
  journalDate: string;
  referenceNo: string;
  addedBy: string;
  additionalNotes: string;
}

const JournalEntry: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [searchText, setSearchText] = useState("");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntryData | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(25);

  // Filter states
  const [filterConfig, setFilterConfig] = useState<FilterConfig>({
    dateRange: {
      label: "Date Range:",
      value: [dayjs("2025-01-01"), dayjs("2026-12-31")],
    },
  });

  // Convert FilterConfig to filters object for filtering logic
  const filters = {
    dateRange: filterConfig.dateRange?.value || [dayjs(), dayjs()],
  };

  // Column visibility state
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    action: true,
    journalDate: true,
    referenceNo: true,
    addedBy: true,
    additionalNotes: true,
  });

  // Mock data - replace with API call
  const defaultEntries: JournalEntryData[] = [
    {
      key: "1",
      journalDate: "2025-01-01 22:51:00",
      referenceNo: "01",
      addedBy: "Mr C2Z Electronics",
      additionalNotes: "Opening stock from January 2023",
    },
    {
      key: "2",
      journalDate: "2025-01-15 10:30:00",
      referenceNo: "02",
      addedBy: "John Doe",
      additionalNotes: "Monthly depreciation adjustment",
    },
    {
      key: "3",
      journalDate: "2025-01-20 14:22:00",
      referenceNo: "03",
      addedBy: "Jane Smith",
      additionalNotes: "Accrued expenses adjustment",
    },
    {
      key: "4",
      journalDate: "2025-02-01 09:15:00",
      referenceNo: "04",
      addedBy: "Mike Johnson",
      additionalNotes: "Prepaid expenses allocation",
    },
    {
      key: "5",
      journalDate: "2025-02-10 16:45:00",
      referenceNo: "05",
      addedBy: "Sarah Williams",
      additionalNotes: "Bad debt write-off",
    },
    {
      key: "6",
      journalDate: "2025-02-15 11:20:00",
      referenceNo: "06",
      addedBy: "David Brown",
      additionalNotes: "Inventory valuation adjustment",
    },
    {
      key: "7",
      journalDate: "2025-02-28 13:10:00",
      referenceNo: "07",
      addedBy: "Emily Davis",
      additionalNotes: "Month-end closing entries",
    },
    {
      key: "8",
      journalDate: "2025-03-05 08:30:00",
      referenceNo: "08",
      addedBy: "Robert Miller",
      additionalNotes: "Interest income accrual",
    },
    {
      key: "9",
      journalDate: "2025-03-12 15:40:00",
      referenceNo: "09",
      addedBy: "Lisa Anderson",
      additionalNotes: "Salary accrual adjustment",
    },
    {
      key: "10",
      journalDate: "2025-03-20 10:55:00",
      referenceNo: "10",
      addedBy: "James Wilson",
      additionalNotes: "Tax provision adjustment",
    },
    {
      key: "11",
      journalDate: "2025-03-25 14:00:00",
      referenceNo: "11",
      addedBy: "Patricia Taylor",
      additionalNotes: "Foreign exchange gain/loss",
    },
    {
      key: "12",
      journalDate: "2025-04-01 09:25:00",
      referenceNo: "12",
      addedBy: "Michael Martinez",
      additionalNotes: "Quarterly depreciation",
    },
    {
      key: "13",
      journalDate: "2025-04-10 16:15:00",
      referenceNo: "13",
      addedBy: "Jennifer Garcia",
      additionalNotes: "Revenue recognition adjustment",
    },
    {
      key: "14",
      journalDate: "2025-04-18 11:50:00",
      referenceNo: "14",
      addedBy: "William Rodriguez",
      additionalNotes: "Warranty provision",
    },
    {
      key: "15",
      journalDate: "2025-04-30 12:30:00",
      referenceNo: "15",
      addedBy: "Linda Martinez",
      additionalNotes: "Month-end reconciliation",
    },
    {
      key: "16",
      journalDate: "2025-05-05 10:20:00",
      referenceNo: "16",
      addedBy: "Richard Lee",
      additionalNotes: "Accounts receivable adjustment",
    },
    {
      key: "17",
      journalDate: "2025-05-12 14:35:00",
      referenceNo: "17",
      addedBy: "Nancy White",
      additionalNotes: "Deferred revenue recognition",
    },
    {
      key: "18",
      journalDate: "2025-05-18 09:45:00",
      referenceNo: "18",
      addedBy: "Thomas Harris",
      additionalNotes: "Fixed asset revaluation",
    },
    {
      key: "19",
      journalDate: "2025-05-25 16:10:00",
      referenceNo: "19",
      addedBy: "Barbara Clark",
      additionalNotes: "Inventory obsolescence provision",
    },
    {
      key: "20",
      journalDate: "2025-06-01 11:25:00",
      referenceNo: "20",
      addedBy: "Christopher Lewis",
      additionalNotes: "Quarterly bonus accrual",
    },
    {
      key: "21",
      journalDate: "2025-06-08 13:50:00",
      referenceNo: "21",
      addedBy: "Jessica Walker",
      additionalNotes: "Insurance premium prepayment",
    },
    {
      key: "22",
      journalDate: "2025-06-15 08:15:00",
      referenceNo: "22",
      addedBy: "Daniel Hall",
      additionalNotes: "Rent expense accrual",
    },
    {
      key: "23",
      journalDate: "2025-06-22 15:30:00",
      referenceNo: "23",
      addedBy: "Amanda Allen",
      additionalNotes: "Allowance for doubtful accounts",
    },
    {
      key: "24",
      journalDate: "2025-06-28 10:40:00",
      referenceNo: "24",
      addedBy: "Matthew Young",
      additionalNotes: "Equipment maintenance accrual",
    },
    {
      key: "25",
      journalDate: "2025-06-30 12:00:00",
      referenceNo: "25",
      addedBy: "Michelle King",
      additionalNotes: "Quarter-end closing adjustments",
    },
  ];

  const [entries, setEntries] = useState<JournalEntryData[]>(defaultEntries);

  // Filter entries based on search text and filters
  const filteredEntries = useMemo(() => {
    let filtered = entries;

    // Apply search filter
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(
        (entry) =>
          entry.referenceNo.toLowerCase().includes(searchLower) ||
          entry.addedBy.toLowerCase().includes(searchLower) ||
          entry.additionalNotes.toLowerCase().includes(searchLower) ||
          entry.journalDate.toLowerCase().includes(searchLower)
      );
    }

    // Apply date range filter
    if (filters.dateRange && filters.dateRange[0] && filters.dateRange[1]) {
      filtered = filtered.filter((entry) => {
        const entryDate = dayjs(entry.journalDate);
        return (
          entryDate.isAfter(filters.dateRange[0].subtract(1, "day")) &&
          entryDate.isBefore(filters.dateRange[1].add(1, "day"))
        );
      });
    }

    return filtered;
  }, [entries, searchText, filters]);

  const handleAddEntry = () => {
    message.info("Add Journal Entry functionality coming soon");
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success("Journal entries refreshed successfully");
    }, 1000);
  };

  const handleView = (record: JournalEntryData) => {
    setSelectedEntry(record);
    setViewModalOpen(true);
  };

  const handleEdit = (record: JournalEntryData) => {
    setSelectedEntry(record);
    setEditModalOpen(true);
  };

  const handleDelete = (record: JournalEntryData) => {
    setSelectedEntry(record);
    setDeleteModalOpen(true);
  };

  const handleExportCSV = () => {
    const headers = ["Journal Date", "Reference No", "Added By", "Additional notes"];
    const csvData = filteredEntries.map((entry) => [
      entry.journalDate,
      entry.referenceNo,
      entry.addedBy,
      entry.additionalNotes,
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `journal_entries_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success("Journal entries exported to CSV successfully");
  };

  const handleExportExcel = () => {
    message.info("Excel export will be available soon. Exporting as CSV for now.");
    handleExportCSV();
  };

  const handleExportPDF = () => {
    message.info("PDF export functionality coming soon");
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const tableHTML = `
      <html>
        <head>
          <title>Journal Entries Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #1f1f1f; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; font-weight: bold; }
            tr:nth-child(even) { background-color: #f9f9f9; }
          </style>
        </head>
        <body>
          <h1>Journal Entries Report</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>Journal Date</th>
                <th>Reference No</th>
                <th>Added By</th>
                <th>Additional notes</th>
              </tr>
            </thead>
            <tbody>
              ${filteredEntries
                .map(
                  (entry) => `
                <tr>
                  <td>${entry.journalDate}</td>
                  <td>${entry.referenceNo}</td>
                  <td>${entry.addedBy}</td>
                  <td>${entry.additionalNotes}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;

    printWindow.document.write(tableHTML);
    printWindow.document.close();
    printWindow.print();
    message.success("Print dialog opened");
  };

  const handleColumnVisibilityChange = (key: string, visible: boolean) => {
    setColumnVisibility((prev) => ({ ...prev, [key]: visible }));
  };

  const columnVisibilityMenu: MenuProps = {
    items: Object.keys(columnVisibility).map((key) => ({
      key,
      label: (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Checkbox
            checked={columnVisibility[key]}
            onChange={(e) => handleColumnVisibilityChange(key, e.target.checked)}
            style={{ marginRight: "8px" }}
          />
          {key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())
            .trim()}
        </div>
      ),
    })),
  };

  const columns: ColumnsType<JournalEntryData> = [
    {
      title: "Action",
      key: "action",
      width: 150,
      fixed: "left",
      render: (_, record) => (
        <Space size="small">
          <Button
            type="text"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
            style={{
              color: isDark ? "rgba(255,255,255,0.85)" : "#1890ff",
            }}
          />
          <Button
            type="text"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{
              color: isDark ? "rgba(255,255,255,0.85)" : "#52c41a",
            }}
          />
          <Button
            type="text"
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
            danger
            style={{
              color: isDark ? "rgba(255,255,255,0.85)" : "#ff4d4f",
            }}
          />
        </Space>
      ),
    },
    {
      title: "Journal Date",
      dataIndex: "journalDate",
      key: "journalDate",
      width: 180,
      sorter: (a, b) => a.journalDate.localeCompare(b.journalDate),
      render: (text: string) => (
        <Text
          style={{
            fontSize: "13px",
            color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
          }}
        >
          {text}
        </Text>
      ),
    },
    {
      title: "Reference No",
      dataIndex: "referenceNo",
      key: "referenceNo",
      width: 150,
      sorter: (a, b) => a.referenceNo.localeCompare(b.referenceNo),
      render: (text: string) => (
        <Text
          style={{
            fontSize: "13px",
            color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
            fontFamily: "monospace",
          }}
        >
          {text}
        </Text>
      ),
    },
    {
      title: "Added By",
      dataIndex: "addedBy",
      key: "addedBy",
      width: 200,
      sorter: (a, b) => a.addedBy.localeCompare(b.addedBy),
      render: (text: string) => (
        <Text
          style={{
            fontSize: "13px",
            color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
          }}
        >
          {text}
        </Text>
      ),
    },
    {
      title: "Additional notes",
      dataIndex: "additionalNotes",
      key: "additionalNotes",
      width: 300,
      render: (text: string) => (
        <Text
          ellipsis
          style={{
            fontSize: "13px",
            color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
          }}
        >
          {text}
        </Text>
      ),
    },
  ];

  // Filter columns based on visibility
  const visibleColumns = columns.filter((col) => {
    if (!col.key) return true;
    return columnVisibility[col.key as string] !== false;
  });

  return (
    <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
      {/* Header Section */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Title
            level={2}
            style={{
              margin: 0,
              color: isDark ? "#fff" : "#1f1f1f",
              fontWeight: 600,
            }}
          >
            Journal Entry
          </Title>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Space
            style={{
              width: "100%",
              justifyContent: "flex-end",
              flexWrap: "wrap",
            }}
          >
            <Button
              icon={<ReloadOutlined />}
              onClick={handleRefresh}
              loading={loading}
              style={{
                height: "40px",
                borderRadius: "6px",
                fontWeight: 500,
              }}
            >
              Refresh
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddEntry}
              style={{
                height: "40px",
                borderRadius: "6px",
                fontWeight: 500,
              }}
            >
              Add
            </Button>
          </Space>
        </Col>
      </Row>

      {/* Filters Section */}
      <FilterPanel
        filters={filterConfig}
        onFilterChange={setFilterConfig}
        defaultExpanded={true}
      />

      {/* Journal Entries Table Section */}
      <Card
        style={{
          background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
          border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
          borderRadius: "8px",
          overflow: "hidden",
          maxWidth: "100%",
        }}
        bodyStyle={{ padding: "24px", overflow: "hidden" }}
      >
        <Row gutter={[16, 16]} style={{ marginBottom: "16px" }} align="middle">
          <Col xs={24} sm={24} md={12} lg={8}>
            <Title
              level={4}
              style={{
                margin: 0,
                color: isDark ? "#fff" : "#1f1f1f",
                fontWeight: 600,
              }}
            >
              All Journal Entries
            </Title>
          </Col>
          <Col xs={24} sm={24} md={12} lg={16}>
            <Space
              style={{
                width: "100%",
                justifyContent: "flex-end",
                flexWrap: "wrap",
              }}
            >
              <Select
                value={pageSize}
                onChange={setPageSize}
                style={{ width: 150 }}
                suffixIcon={<DownOutlined />}
              >
                <Select.Option value={10}>Show 10 entries</Select.Option>
                <Select.Option value={25}>Show 25 entries</Select.Option>
                <Select.Option value={50}>Show 50 entries</Select.Option>
                <Select.Option value={100}>Show 100 entries</Select.Option>
              </Select>
              <Button
                icon={<FileTextOutlined />}
                onClick={handleExportCSV}
                style={{
                  height: "40px",
                  borderRadius: "6px",
                  fontWeight: 500,
                  background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                  border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                  color: isDark ? "#fff" : "#1f1f1f",
                }}
              >
                Export to CSV
              </Button>
              <Button
                icon={<FileExcelOutlined />}
                onClick={handleExportExcel}
                style={{
                  height: "40px",
                  borderRadius: "6px",
                  fontWeight: 500,
                  background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                  border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                  color: isDark ? "#fff" : "#1f1f1f",
                }}
              >
                Export to Excel
              </Button>
              <Button
                icon={<PrinterOutlined />}
                onClick={handlePrint}
                style={{
                  height: "40px",
                  borderRadius: "6px",
                  fontWeight: 500,
                  background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                  border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                  color: isDark ? "#fff" : "#1f1f1f",
                }}
              >
                Print
              </Button>
              <Dropdown
                menu={columnVisibilityMenu}
                trigger={["click"]}
                placement="bottomRight"
              >
                <Button
                  icon={<UnorderedListOutlined />}
                  style={{
                    height: "40px",
                    borderRadius: "6px",
                    fontWeight: 500,
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                    color: isDark ? "#fff" : "#1f1f1f",
                  }}
                >
                  Column visibility
                </Button>
              </Dropdown>
              <Button
                icon={<FilePdfOutlined />}
                onClick={handleExportPDF}
                style={{
                  height: "40px",
                  borderRadius: "6px",
                  fontWeight: 500,
                  background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                  border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                  color: isDark ? "#fff" : "#1f1f1f",
                }}
              >
                Export to PDF
              </Button>
              <Search
                placeholder="Search..."
                allowClear
                enterButton={
                  <Button
                    type="primary"
                    icon={<SearchOutlined />}
                    style={{
                      height: "40px",
                      borderRadius: "0 6px 6px 0",
                    }}
                  />
                }
                size="large"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onSearch={(value) => setSearchText(value)}
                style={{
                  width: 200,
                }}
              />
            </Space>
          </Col>
        </Row>

        <Table
          columns={visibleColumns}
          dataSource={filteredEntries}
          loading={loading}
          scroll={{ x: "max-content" }}
          pagination={{
            pageSize,
            showSizeChanger: false,
            showTotal: (total, range) =>
              `Showing ${range[0]} to ${range[1]} of ${total} entries`,
            style: {
              marginTop: "16px",
              color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
            },
          }}
          locale={{
            emptyText: (
              <div style={{ padding: "40px", textAlign: "center" }}>
                <Text
                  style={{
                    fontSize: "14px",
                    color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                  }}
                >
                  No data available in table
                </Text>
              </div>
            ),
          }}
          style={{
            width: "100%",
          }}
        />
      </Card>

      {/* Modals */}
      {selectedEntry && (
        <>
          <ViewModal
            open={viewModalOpen}
            onClose={() => setViewModalOpen(false)}
            title="Journal Entry Details"
            data={selectedEntry}
          />
          <EditModal
            open={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            title="Edit Journal Entry"
            data={selectedEntry}
            onSave={async (_values) => {
              setActionLoading(true);
              try {
                // TODO: Implement API call to update journal entry
                await new Promise((resolve) => setTimeout(resolve, 1000));
                message.success("Journal entry updated successfully");
                setEditModalOpen(false);
              } catch (_error) {
                message.error("Failed to update journal entry");
              } finally {
                setActionLoading(false);
              }
            }}
          />
          <DeleteModal
            open={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            title="Delete Journal Entry"
            message={`Are you sure you want to delete journal entry "${selectedEntry.referenceNo}"?`}
            onConfirm={async () => {
              setActionLoading(true);
              try {
                // TODO: Implement API call to delete journal entry
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setEntries(entries.filter((e) => e.key !== selectedEntry.key));
                message.success("Journal entry deleted successfully");
                setDeleteModalOpen(false);
              } catch (_error) {
                message.error("Failed to delete journal entry");
              } finally {
                setActionLoading(false);
              }
            }}
          />
        </>
      )}
    </div>
  );
};

export default JournalEntry;
