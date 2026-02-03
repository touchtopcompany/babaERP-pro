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
import { ViewModal, EditModal, DeleteModal, AddModal } from "@/components/modals";

const { Title, Text } = Typography;
const { Search } = Input;

export interface PriceGroupData {
  key: string;
  name: string;
  description: string;
}

const PriceGroup: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [searchText, setSearchText] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPriceGroup, setSelectedPriceGroup] = useState<PriceGroupData | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(25);
  
  // Column visibility state
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    name: true,
    description: true,
    action: true,
  });

  // Mock data - replace with API call
  const defaultPriceGroups: PriceGroupData[] = [
    {
      key: "1",
      name: "Default",
      description: "Default pricing for all products",
    },
    {
      key: "2",
      name: "Wholesale",
      description: "Wholesale pricing for bulk purchases",
    },
    {
      key: "3",
      name: "Retail",
      description: "Retail pricing for individual customers",
    },
    {
      key: "4",
      name: "VIP",
      description: "Special pricing for VIP customers",
    },
    {
      key: "5",
      name: "Seasonal",
      description: "Seasonal pricing for special promotions",
    },
  ];

  const [priceGroups, setPriceGroups] = useState<PriceGroupData[]>(defaultPriceGroups);

  // Filter price groups based on search text
  const filteredPriceGroups = useMemo(() => {
    if (!searchText) return priceGroups;
    const searchLower = searchText.toLowerCase();
    return priceGroups.filter(
      (group) =>
        group.name.toLowerCase().includes(searchLower) ||
        group.description.toLowerCase().includes(searchLower)
    );
  }, [priceGroups, searchText]);

  const handleAddPriceGroup = () => {
    setAddModalOpen(true);
  };

  const handleRefresh = () => {
    setLoading(true);
    // TODO: Implement API call to refresh price groups
    setTimeout(() => {
      setLoading(false);
      message.success("Price groups refreshed successfully");
    }, 1000);
  };

  const handleExportCSV = () => {
    const headers = ["Name", "Description"];
    const csvData = filteredPriceGroups.map((group) => [
      group.name,
      group.description,
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `price_groups_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success("Price groups exported to CSV successfully");
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
          <title>Price Groups Report</title>
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
          <h1>Price Groups Management Report</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              ${filteredPriceGroups
                .map(
                  (group) => `
                <tr>
                  <td>${group.name}</td>
                  <td>${group.description}</td>
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

  const columns: ColumnsType<PriceGroupData> = [
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
      title: "Description",
      dataIndex: "description",
      key: "description",
      sorter: (a, b) => a.description.localeCompare(b.description),
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
      title: "Action",
      key: "action",
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="text"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedPriceGroup(record);
              setViewModalOpen(true);
            }}
            style={{
              color: isDark ? "rgba(255,255,255,0.85)" : "#1890ff",
            }}
          />
          <Button
            type="text"
            size="small"
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedPriceGroup(record);
              setEditModalOpen(true);
            }}
            style={{
              color: isDark ? "rgba(255,255,255,0.85)" : "#52c41a",
            }}
          />
          <Button
            type="text"
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => {
              setSelectedPriceGroup(record);
              setDeleteModalOpen(true);
            }}
            danger
            style={{
              color: isDark ? "rgba(255,255,255,0.85)" : "#ff4d4f",
            }}
          />
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
            Price Group
          </Title>
          <Text
            style={{
              fontSize: "14px",
              color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
              display: "block",
              marginTop: "4px",
            }}
          >
            All Price Group
          </Text>
          <Text
            style={{
              fontSize: "13px",
              color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
              display: "block",
              marginTop: "8px",
            }}
          >
            Set multiple price for products. Name different price and then update price from &quot;Update Price&quot; or List Products -&gt; Actions -&gt; Add or edit Group prices
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
              onClick={handleAddPriceGroup}
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

      {/* All Price Group Section */}
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
              All Price Group
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
          .price-group-table .ant-table-thead > tr > th {
            transition: all 0.2s ease;
            cursor: pointer;
          }
          .price-group-table .ant-table-thead > tr > th:hover {
            background: ${isDark ? "rgba(24, 144, 255, 0.3)" : "rgba(24, 144, 255, 0.9)"} !important;
          }
          .price-group-table .ant-table-tbody > tr {
            transition: all 0.2s ease;
          }
          .price-group-table .ant-table-tbody > tr:hover > td {
            background: ${isDark ? "rgba(24, 144, 255, 0.1)" : "rgba(24, 144, 255, 0.05)"} !important;
          }
          .price-group-table .ant-table-tbody > tr:hover {
            transform: translateY(-1px);
            box-shadow: ${isDark ? "0 2px 8px rgba(0,0,0,0.2)" : "0 2px 8px rgba(0,0,0,0.08)"};
          }
          .price-group-table .ant-table-column-sorter {
            color: ${isDark ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.45)"} !important;
          }
          .price-group-table .ant-table-column-sorted .ant-table-column-sorter-up,
          .price-group-table .ant-table-column-sorted .ant-table-column-sorter-down,
          .price-group-table .ant-table-column-sorter-up.on,
          .price-group-table .ant-table-column-sorter-down.on,
          .price-group-table .ant-table-column-sorter-up.active,
          .price-group-table .ant-table-column-sorter-down.active {
            color: ${isDark ? "#fff" : "#1890ff"} !important;
            opacity: 1 !important;
          }
        `}</style>
        <Table
          className="price-group-table"
          columns={visibleColumns}
          dataSource={filteredPriceGroups}
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
            // TODO: Implement API call to create price group
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const newPriceGroup: PriceGroupData = {
              key: Date.now().toString(),
              name: values.name,
              description: values.description || "",
            };
            setPriceGroups([...priceGroups, newPriceGroup]);
            message.success("Price group created successfully");
            setAddModalOpen(false);
          } catch (_error) {
            message.error("Failed to create price group");
          } finally {
            setActionLoading(false);
          }
        }}
        title="Add Price Group"
        fields={[
          { name: "name", label: "Name", type: "text", required: true, placeholder: "Enter price group name" },
          { name: "description", label: "Description", type: "textarea", required: false, placeholder: "Enter description" },
        ]}
        loading={actionLoading}
        width={600}
      />

      {/* View Modal */}
      <ViewModal
        open={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false);
          setSelectedPriceGroup(null);
        }}
        title="Price Group Details"
        data={selectedPriceGroup}
        fields={[
          { key: "name", label: "Name" },
          { key: "description", label: "Description" },
        ]}
        width={600}
      />

      {/* Edit Modal */}
      <EditModal
        open={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedPriceGroup(null);
        }}
        onSave={async (_values) => {
          setActionLoading(true);
          try {
            // TODO: Implement API call to update price group
            await new Promise((resolve) => setTimeout(resolve, 1000));
            message.success("Price group updated successfully");
            setEditModalOpen(false);
            setSelectedPriceGroup(null);
          } catch (_error) {
            message.error("Failed to update price group");
          } finally {
            setActionLoading(false);
          }
        }}
        title="Edit Price Group"
        data={selectedPriceGroup}
        fields={[
          { name: "name", label: "Name", type: "text", required: true },
          { name: "description", label: "Description", type: "textarea", required: false },
        ]}
        loading={actionLoading}
        width={600}
      />

      {/* Delete Modal */}
      <DeleteModal
        open={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedPriceGroup(null);
        }}
        onConfirm={async () => {
          setActionLoading(true);
          try {
            // TODO: Implement API call to delete price group
            await new Promise((resolve) => setTimeout(resolve, 1000));
            message.success("Price group deleted successfully");
            setPriceGroups(priceGroups.filter((g) => g.key !== selectedPriceGroup?.key));
            setDeleteModalOpen(false);
            setSelectedPriceGroup(null);
          } catch (_error) {
            message.error("Failed to delete price group");
          } finally {
            setActionLoading(false);
          }
        }}
        title="Delete Price Group"
        itemName={selectedPriceGroup?.name}
        loading={actionLoading}
      />
    </div>
  );
};

export default PriceGroup;

