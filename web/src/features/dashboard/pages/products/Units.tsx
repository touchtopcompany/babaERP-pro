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
  Tag,
  Tooltip,
} from "antd";
import type { MenuProps } from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  PrinterOutlined,
  UnorderedListOutlined,
  FileTextOutlined,
  DownOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import useTheme from "@/theme/useTheme";
import { ViewModal, EditModal, DeleteModal, AddModal } from "@/components/modals";

const { Title, Text } = Typography;
const { Search } = Input;

export interface UnitData {
  key: string;
  name: string;
  shortName: string;
  allowDecimal: boolean;
}

const Units: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [searchText, setSearchText] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<UnitData | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(25);
  
  // Column visibility state
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    name: true,
    shortName: true,
    allowDecimal: true,
    action: true,
  });

  // Mock data - replace with API call
  const defaultUnits: UnitData[] = [
    {
      key: "1",
      name: "Pairs",
      shortName: "Pr",
      allowDecimal: false,
    },
    {
      key: "2",
      name: "pieces",
      shortName: "Pcs",
      allowDecimal: true,
    },
    {
      key: "3",
      name: "Sets",
      shortName: "Sets",
      allowDecimal: true,
    },
  ];

  const [units, setUnits] = useState<UnitData[]>(defaultUnits);

  // Filter units based on search text
  const filteredUnits = useMemo(() => {
    if (!searchText) return units;
    const searchLower = searchText.toLowerCase();
    return units.filter(
      (unit) =>
        unit.name.toLowerCase().includes(searchLower) ||
        unit.shortName.toLowerCase().includes(searchLower)
    );
  }, [units, searchText]);

  const handleAddUnit = () => {
    setAddModalOpen(true);
  };

  const handleRefresh = () => {
    setLoading(true);
    // TODO: Implement API call to refresh units
    setTimeout(() => {
      setLoading(false);
      message.success("Units refreshed successfully");
    }, 1000);
  };

  const handleExportCSV = () => {
    const headers = ["Name", "Short Name", "Allow Decimal"];
    const csvData = filteredUnits.map((unit) => [
      unit.name,
      unit.shortName,
      unit.allowDecimal ? "Yes" : "No",
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `units_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success("Units exported to CSV successfully");
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
          <title>Units Report</title>
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
          <h1>Units Management Report</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Short Name</th>
                <th>Allow Decimal</th>
              </tr>
            </thead>
            <tbody>
              ${filteredUnits
                .map(
                  (unit) => `
                <tr>
                  <td>${unit.name}</td>
                  <td>${unit.shortName}</td>
                  <td>${unit.allowDecimal ? "Yes" : "No"}</td>
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
          <input
            type="checkbox"
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

  const columns: ColumnsType<UnitData> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text: string) => (
        <Text
          style={{
            fontSize: "14px",
            color: isDark ? "#fff" : "#1f1f1f",
          }}
        >
          {text}
        </Text>
      ),
    },
    {
      title: "Short name",
      dataIndex: "shortName",
      key: "shortName",
      sorter: (a, b) => a.shortName.localeCompare(b.shortName),
      render: (text: string) => (
        <Text
          style={{
            fontSize: "14px",
            color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
          }}
        >
          {text}
        </Text>
      ),
    },
    {
      title: (
        <Space>
          <Text>Allow decimal</Text>
          <Tooltip title="Whether decimal values are allowed for this unit">
            <InfoCircleOutlined
              style={{
                color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                fontSize: "14px",
                cursor: "help",
              }}
            />
          </Tooltip>
        </Space>
      ),
      dataIndex: "allowDecimal",
      key: "allowDecimal",
      sorter: (a, b) => (a.allowDecimal === b.allowDecimal ? 0 : a.allowDecimal ? 1 : -1),
      render: (value: boolean) => (
        <Tag color={value ? "green" : "default"}>
          {value ? "Yes" : "No"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedUnit(record);
              setEditModalOpen(true);
            }}
            style={{
              height: "32px",
              borderRadius: "6px",
              fontWeight: 500,
            }}
          >
            Edit
          </Button>
          <Button
            type="primary"
            danger
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => {
              setSelectedUnit(record);
              setDeleteModalOpen(true);
            }}
            style={{
              height: "32px",
              borderRadius: "6px",
              fontWeight: 500,
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  // Filter columns based on visibility
  const visibleColumns = columns.filter((col) => {
    if (!col.key) return true;
    return columnVisibility[col.key as string] !== false;
  });

  return (
    <div>
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
            Units
          </Title>
          <Text
            style={{
              fontSize: "14px",
              color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
              display: "block",
              marginTop: "4px",
            }}
          >
            Manage your units
          </Text>
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
              onClick={handleAddUnit}
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

      {/* All your units Section */}
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
              All your units
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

        <style>{`
          .units-table .ant-table-thead > tr > th {
            transition: all 0.2s ease;
            cursor: pointer;
          }
          .units-table .ant-table-thead > tr > th:hover {
            background: ${isDark ? "rgba(24, 144, 255, 0.3)" : "rgba(24, 144, 255, 0.9)"} !important;
          }
          .units-table .ant-table-tbody > tr {
            transition: all 0.2s ease;
          }
          .units-table .ant-table-tbody > tr:hover > td {
            background: ${isDark ? "rgba(24, 144, 255, 0.1)" : "rgba(24, 144, 255, 0.05)"} !important;
          }
          .units-table .ant-table-tbody > tr:hover {
            transform: translateY(-1px);
            box-shadow: ${isDark ? "0 2px 8px rgba(0,0,0,0.2)" : "0 2px 8px rgba(0,0,0,0.08)"};
          }
          .units-table .ant-table-column-sorter {
            color: ${isDark ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.45)"} !important;
          }
          .units-table .ant-table-column-sorted .ant-table-column-sorter-up,
          .units-table .ant-table-column-sorted .ant-table-column-sorter-down,
          .units-table .ant-table-column-sorter-up.on,
          .units-table .ant-table-column-sorter-down.on,
          .units-table .ant-table-column-sorter-up.active,
          .units-table .ant-table-column-sorter-down.active {
            color: ${isDark ? "#fff" : "#1890ff"} !important;
            opacity: 1 !important;
          }
        `}</style>
        <Table
          className="units-table"
          columns={visibleColumns}
          dataSource={filteredUnits}
          loading={loading}
          pagination={{
            pageSize: pageSize,
            showSizeChanger: false,
            showTotal: (total, range) =>
              `Showing ${range[0]} to ${range[1]} of ${total} entries`,
            style: {
              marginTop: "16px",
            },
          }}
          locale={{
            emptyText: "No data available in table",
          }}
          style={{
            background: isDark ? "transparent" : "#fafafa",
          }}
        />
      </Card>

      {/* Add Modal */}
      <AddModal
        open={addModalOpen}
        onClose={() => {
          setAddModalOpen(false);
        }}
        onSave={async (values) => {
          setActionLoading(true);
          try {
            // TODO: Implement API call to create unit
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const newUnit: UnitData = {
              key: Date.now().toString(),
              name: values.name,
              shortName: values.shortName,
              allowDecimal: values.allowDecimal || false,
            };
            setUnits([...units, newUnit]);
            message.success("Unit created successfully");
            setAddModalOpen(false);
          } catch (_error) {
            message.error("Failed to create unit");
          } finally {
            setActionLoading(false);
          }
        }}
        title="Add Unit"
        fields={[
          { name: "name", label: "Name", type: "text", required: true, placeholder: "Enter unit name" },
          { name: "shortName", label: "Short Name", type: "text", required: true, placeholder: "Enter short name" },
          {
            name: "allowDecimal",
            label: "Allow Decimal",
            type: "select",
            required: false,
            options: [
              { label: "Yes", value: true },
              { label: "No", value: false },
            ],
            placeholder: "Select whether to allow decimal values",
          },
        ]}
        loading={actionLoading}
        width={600}
      />

      {/* View Modal */}
      <ViewModal
        open={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false);
          setSelectedUnit(null);
        }}
        title="Unit Details"
        data={selectedUnit ? {
          ...selectedUnit,
          allowDecimal: selectedUnit.allowDecimal ? "Yes" : "No",
        } : null}
        fields={[
          { key: "name", label: "Name" },
          { key: "shortName", label: "Short Name" },
          { key: "allowDecimal", label: "Allow Decimal" },
        ]}
        width={600}
      />

      {/* Edit Modal */}
      <EditModal
        open={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedUnit(null);
        }}
        onSave={async (_values) => {
          setActionLoading(true);
          try {
            // TODO: Implement API call to update unit
            await new Promise((resolve) => setTimeout(resolve, 1000));
            message.success("Unit updated successfully");
            setEditModalOpen(false);
            setSelectedUnit(null);
          } catch (_error) {
            message.error("Failed to update unit");
          } finally {
            setActionLoading(false);
          }
        }}
        title="Edit Unit"
        data={selectedUnit}
        fields={[
          { name: "name", label: "Name", type: "text", required: true },
          { name: "shortName", label: "Short Name", type: "text", required: true },
          {
            name: "allowDecimal",
            label: "Allow Decimal",
            type: "select",
            required: false,
            options: [
              { label: "Yes", value: true },
              { label: "No", value: false },
            ],
          },
        ]}
        loading={actionLoading}
        width={600}
      />

      {/* Delete Modal */}
      <DeleteModal
        open={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedUnit(null);
        }}
        onConfirm={async () => {
          setActionLoading(true);
          try {
            // TODO: Implement API call to delete unit
            await new Promise((resolve) => setTimeout(resolve, 1000));
            message.success("Unit deleted successfully");
            setUnits(units.filter((u) => u.key !== selectedUnit?.key));
            setDeleteModalOpen(false);
            setSelectedUnit(null);
          } catch (_error) {
            message.error("Failed to delete unit");
          } finally {
            setActionLoading(false);
          }
        }}
        title="Delete Unit"
        itemName={selectedUnit?.name}
        loading={actionLoading}
      />
    </div>
  );
};

export default Units;

