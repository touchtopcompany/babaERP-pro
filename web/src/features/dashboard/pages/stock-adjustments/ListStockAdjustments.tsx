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
  Dropdown,
  Select,
  Checkbox,
  Tag,
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

const { Title, Text } = Typography;
const { Search } = Input;

export interface StockAdjustmentData {
  key: string;
  date: string;
  referenceNo: string;
  location: string;
  adjustmentType: "increase" | "decrease";
  totalAmount: number;
  totalAmountRecovered: number;
  reason: string;
  addedBy: string;
}

const ListStockAdjustments: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [searchText, setSearchText] = useState("");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedAdjustment, setSelectedAdjustment] = useState<StockAdjustmentData | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(25);

  // Column visibility state
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

  // Mock data - replace with API call
  const defaultAdjustments: StockAdjustmentData[] = [
    {
      key: "1",
      date: "2025-01-15",
      referenceNo: "SA-2025-001",
      location: "C2Z Digital Solutions (C2Z1)",
      adjustmentType: "increase",
      totalAmount: 125000.00,
      totalAmountRecovered: 0.00,
      reason: "Stock count discrepancy - found additional items",
      addedBy: "John Doe",
    },
    {
      key: "2",
      date: "2025-01-16",
      referenceNo: "SA-2025-002",
      location: "Location 2",
      adjustmentType: "decrease",
      totalAmount: 45000.00,
      totalAmountRecovered: 45000.00,
      reason: "Damaged goods - write off",
      addedBy: "Jane Smith",
    },
    {
      key: "3",
      date: "2025-01-17",
      referenceNo: "SA-2025-003",
      location: "C2Z Digital Solutions (C2Z1)",
      adjustmentType: "increase",
      totalAmount: 87500.00,
      totalAmountRecovered: 0.00,
      reason: "Returned items from customer",
      addedBy: "Mike Johnson",
    },
    {
      key: "4",
      date: "2025-01-18",
      referenceNo: "SA-2025-004",
      location: "Location 2",
      adjustmentType: "decrease",
      totalAmount: 32000.00,
      totalAmountRecovered: 32000.00,
      reason: "Theft - security incident",
      addedBy: "Sarah Williams",
    },
    {
      key: "5",
      date: "2025-01-19",
      referenceNo: "SA-2025-005",
      location: "C2Z Digital Solutions (C2Z1)",
      adjustmentType: "increase",
      totalAmount: 189000.00,
      totalAmountRecovered: 0.00,
      reason: "Found items in warehouse audit",
      addedBy: "David Brown",
    },
    {
      key: "6",
      date: "2025-01-20",
      referenceNo: "SA-2025-006",
      location: "Location 2",
      adjustmentType: "decrease",
      totalAmount: 15600.00,
      totalAmountRecovered: 15600.00,
      reason: "Expired products - disposal",
      addedBy: "Emily Davis",
    },
    {
      key: "7",
      date: "2025-01-21",
      referenceNo: "SA-2025-007",
      location: "C2Z Digital Solutions (C2Z1)",
      adjustmentType: "increase",
      totalAmount: 98000.00,
      totalAmountRecovered: 0.00,
      reason: "Correction of data entry error",
      addedBy: "Robert Miller",
    },
    {
      key: "8",
      date: "2025-01-22",
      referenceNo: "SA-2025-008",
      location: "Location 2",
      adjustmentType: "decrease",
      totalAmount: 24500.00,
      totalAmountRecovered: 24500.00,
      reason: "Lost items during relocation",
      addedBy: "Lisa Anderson",
    },
    {
      key: "9",
      date: "2025-01-23",
      referenceNo: "SA-2025-009",
      location: "C2Z Digital Solutions (C2Z1)",
      adjustmentType: "increase",
      totalAmount: 112000.00,
      totalAmountRecovered: 0.00,
      reason: "Supplier credit note adjustment",
      addedBy: "James Wilson",
    },
    {
      key: "10",
      date: "2025-01-24",
      referenceNo: "SA-2025-010",
      location: "Location 2",
      adjustmentType: "decrease",
      totalAmount: 67000.00,
      totalAmountRecovered: 67000.00,
      reason: "Quality control rejection",
      addedBy: "Patricia Taylor",
    },
    {
      key: "11",
      date: "2025-01-25",
      referenceNo: "SA-2025-011",
      location: "C2Z Digital Solutions (C2Z1)",
      adjustmentType: "increase",
      totalAmount: 198000.00,
      totalAmountRecovered: 0.00,
      reason: "Inventory reconciliation adjustment",
      addedBy: "Michael Martinez",
    },
    {
      key: "12",
      date: "2025-01-26",
      referenceNo: "SA-2025-012",
      location: "Location 2",
      adjustmentType: "decrease",
      totalAmount: 89000.00,
      totalAmountRecovered: 89000.00,
      reason: "Fire damage - insurance claim",
      addedBy: "Jennifer Garcia",
    },
  ];

  const [adjustments, setAdjustments] = useState<StockAdjustmentData[]>(defaultAdjustments);

  // Filter adjustments based on search text
  const filteredAdjustments = useMemo(() => {
    let filtered = adjustments;

    // Apply search filter
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(
        (adjustment) =>
          adjustment.referenceNo.toLowerCase().includes(searchLower) ||
          adjustment.location.toLowerCase().includes(searchLower) ||
          adjustment.reason.toLowerCase().includes(searchLower) ||
          adjustment.addedBy.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [adjustments, searchText]);

  const handleAddAdjustment = () => {
    message.info("Add stock adjustment functionality coming soon");
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success("Stock adjustments refreshed successfully");
    }, 1000);
  };

  const handleView = (record: StockAdjustmentData) => {
    setSelectedAdjustment(record);
    setViewModalOpen(true);
  };

  const handleEdit = (record: StockAdjustmentData) => {
    setSelectedAdjustment(record);
    setEditModalOpen(true);
  };

  const handleDelete = (record: StockAdjustmentData) => {
    setSelectedAdjustment(record);
    setDeleteModalOpen(true);
  };

  const handleExportCSV = () => {
    const headers = [
      "Date",
      "Reference No",
      "Location",
      "Adjustment Type",
      "Total Amount",
      "Total Amount Recovered",
      "Reason",
      "Added By",
    ];
    const csvData = filteredAdjustments.map((adjustment) => [
      adjustment.date,
      adjustment.referenceNo,
      adjustment.location,
      adjustment.adjustmentType,
      adjustment.totalAmount,
      adjustment.totalAmountRecovered,
      adjustment.reason,
      adjustment.addedBy,
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `stock_adjustments_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success("Stock adjustments exported to CSV successfully");
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
          <title>Stock Adjustments Report</title>
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
          <h1>Stock Adjustments Report</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Reference No</th>
                <th>Location</th>
                <th>Adjustment Type</th>
                <th>Total Amount</th>
                <th>Total Amount Recovered</th>
                <th>Reason</th>
                <th>Added By</th>
              </tr>
            </thead>
            <tbody>
              ${filteredAdjustments
                .map(
                  (adjustment) => `
                <tr>
                  <td>${adjustment.date}</td>
                  <td>${adjustment.referenceNo}</td>
                  <td>${adjustment.location}</td>
                  <td>${adjustment.adjustmentType}</td>
                  <td>TSh ${adjustment.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  <td>TSh ${adjustment.totalAmountRecovered.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  <td>${adjustment.reason}</td>
                  <td>${adjustment.addedBy}</td>
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

  const columns: ColumnsType<StockAdjustmentData> = [
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
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 150,
      sorter: (a, b) => a.date.localeCompare(b.date),
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
      title: "Location",
      dataIndex: "location",
      key: "location",
      width: 200,
      sorter: (a, b) => a.location.localeCompare(b.location),
    },
    {
      title: "Adjustment type",
      dataIndex: "adjustmentType",
      key: "adjustmentType",
      width: 150,
      sorter: (a, b) => a.adjustmentType.localeCompare(b.adjustmentType),
      render: (text: string) => {
        const typeConfig: Record<string, { color: string; text: string }> = {
          increase: { color: "success", text: "Increase" },
          decrease: { color: "error", text: "Decrease" },
        };
        const config = typeConfig[text] || { color: "default", text: text };
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      width: 150,
      align: "right",
      sorter: (a, b) => a.totalAmount - b.totalAmount,
      render: (value: number) => (
        <Text
          style={{
            fontSize: "13px",
            color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
          }}
        >
          TSh {value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </Text>
      ),
    },
    {
      title: "Total amount recovered",
      dataIndex: "totalAmountRecovered",
      key: "totalAmountRecovered",
      width: 180,
      align: "right",
      sorter: (a, b) => a.totalAmountRecovered - b.totalAmountRecovered,
      render: (value: number) => (
        <Text
          style={{
            fontSize: "13px",
            color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
          }}
        >
          TSh {value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </Text>
      ),
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
      width: 200,
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
    {
      title: "Added By",
      dataIndex: "addedBy",
      key: "addedBy",
      width: 150,
      sorter: (a, b) => a.addedBy.localeCompare(b.addedBy),
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
            Stock Adjustments
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
              onClick={handleAddAdjustment}
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

      {/* All Stock Adjustments Section */}
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
              All stock adjustments
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
          dataSource={filteredAdjustments}
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
      {selectedAdjustment && (
        <>
          <ViewModal
            open={viewModalOpen}
            onClose={() => setViewModalOpen(false)}
            title="Stock Adjustment Details"
            data={selectedAdjustment}
          />
          <EditModal
            open={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            title="Edit Stock Adjustment"
            data={selectedAdjustment}
            onSave={async (_values) => {
              setActionLoading(true);
              try {
                // TODO: Implement API call to update stock adjustment
                await new Promise((resolve) => setTimeout(resolve, 1000));
                message.success("Stock adjustment updated successfully");
                setEditModalOpen(false);
              } catch (_error) {
                message.error("Failed to update stock adjustment");
              } finally {
                setActionLoading(false);
              }
            }}
          />
          <DeleteModal
            open={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            title="Delete Stock Adjustment"
            message={`Are you sure you want to delete stock adjustment "${selectedAdjustment.referenceNo}"?`}
            onConfirm={async () => {
              setActionLoading(true);
              try {
                // TODO: Implement API call to delete stock adjustment
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setAdjustments(adjustments.filter((a) => a.key !== selectedAdjustment.key));
                message.success("Stock adjustment deleted successfully");
                setDeleteModalOpen(false);
              } catch (_error) {
                message.error("Failed to delete stock adjustment");
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

export default ListStockAdjustments;

