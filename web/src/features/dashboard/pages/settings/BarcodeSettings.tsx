import React, { useState, useMemo } from "react";
import {
  Table,
  Button,
  Input,
  Typography,
  Space,
  Modal,
  Form,
  message,
  Popconfirm,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import useTheme from "@/theme/useTheme";

const { Title } = Typography;

export interface BarcodeSettingRecord {
  key: string;
  name: string;
  description: string;
}

const MOCK_BARCODE_SETTINGS: BarcodeSettingRecord[] = [
  { key: "1", name: "Standard 1D", description: "Single-line barcode for product SKU (Code 128)" },
  { key: "2", name: "QR Code", description: "QR code for product details and links" },
  { key: "3", name: "Receipt 40mm", description: "Thermal receipt paper 40mm width, 2 labels per row" },
  { key: "4", name: "Shelf Label A4", description: "A4 sheet with multiple barcode labels for shelf pricing" },
];

const BarcodeSettings: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [settings, setSettings] = useState<BarcodeSettingRecord[]>(MOCK_BARCODE_SETTINGS);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<BarcodeSettingRecord | null>(null);
  const [viewingRecord, setViewingRecord] = useState<BarcodeSettingRecord | null>(null);
  const [form] = Form.useForm();

  const filteredSettings = useMemo(() => {
    if (!searchText.trim()) return settings;
    const q = searchText.toLowerCase();
    return settings.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
    );
  }, [settings, searchText]);

  const handleAddNewSetting = () => {
    form.resetFields();
    setAddModalOpen(true);
  };

  const handleAddModalSubmit = () => {
    form.validateFields().then((values) => {
      const newRecord: BarcodeSettingRecord = {
        key: String(Date.now()),
        name: values.name || "",
        description: values.description || "",
      };
      setSettings((prev) => [...prev, newRecord]);
      message.success("Barcode setting added successfully");
      setAddModalOpen(false);
      form.resetFields();
    });
  };

  const openEditModal = (record: BarcodeSettingRecord) => {
    setEditingRecord(record);
    form.setFieldsValue({ name: record.name, description: record.description });
    setEditModalOpen(true);
  };

  const handleEditSubmit = () => {
    if (!editingRecord) return;
    form.validateFields().then((values) => {
      setSettings((prev) =>
        prev.map((s) =>
          s.key === editingRecord.key
            ? { ...s, name: values.name || "", description: values.description || "" }
            : s
        )
      );
      message.success("Barcode setting updated successfully");
      setEditModalOpen(false);
      setEditingRecord(null);
      form.resetFields();
    });
  };

  const openViewModal = (record: BarcodeSettingRecord) => {
    setViewingRecord(record);
    setViewModalOpen(true);
  };

  const handleDelete = (record: BarcodeSettingRecord) => {
    setSettings((prev) => prev.filter((s) => s.key !== record.key));
    message.success("Barcode setting deleted");
  };

  const columns: ColumnsType<BarcodeSettingRecord> = [
    {
      title: "Sticker Sheet setting Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      width: 240,
    },
    {
      title: "Sticker Sheet setting Description",
      dataIndex: "description",
      key: "description",
      sorter: (a, b) => a.description.localeCompare(b.description),
      width: 320,
    },
    {
      title: "Action",
      key: "action",
      width: 240,
      render: (_: unknown, record: BarcodeSettingRecord) => (
        <Space size="small">
          <Button type="link" size="small" icon={<EyeOutlined />} onClick={() => openViewModal(record)}>
            View
          </Button>
          <Button type="primary" size="small" icon={<EditOutlined />} onClick={() => openEditModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Delete barcode setting"
            description="Are you sure you want to delete this barcode setting?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" size="small" danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const start = (currentPage - 1) * pageSize;
  const end = Math.min(start + pageSize, filteredSettings.length);
  const total = filteredSettings.length;
  const paginationText = total > 0 ? `Showing ${start + 1} to ${end} of ${total} entries` : "Showing 0 to 0 of 0 entries";

  return (
    <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
      <Title level={2} style={{ marginBottom: 4, color: isDark ? "#fff" : "#1f1f1f", fontWeight: 600 }}>
        Barcodes
      </Title>
      <Typography.Text type="secondary" style={{ display: "block", marginBottom: 16, fontSize: 14 }}>
        Manage your barcode settings.
      </Typography.Text>
      <div style={{ borderBottom: "3px solid #1890ff", marginBottom: 24, width: "100%" }} />

      <Title level={5} style={{ marginBottom: 16, color: isDark ? "#fff" : "#1f1f1f" }}>
        All your barcode settings
      </Title>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
        <div />
        <Space size="middle">
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined style={{ color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c" }} />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{
              width: 220,
              background: isDark ? "rgba(255,255,255,0.05)" : "#fff",
              border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
              borderRadius: 6,
            }}
            allowClear
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddNewSetting} style={{ borderRadius: 6 }}>
            Add new setting
          </Button>
        </Space>
      </div>

      <Table<BarcodeSettingRecord>
        columns={columns}
        dataSource={filteredSettings}
        locale={{ emptyText: "No data available in table" }}
        pagination={{
          current: currentPage,
          pageSize,
          total: filteredSettings.length,
          showSizeChanger: true,
          pageSizeOptions: ["10", "25", "50", "100"],
          showTotal: () => paginationText,
          onChange: (page, size) => {
            setCurrentPage(page);
            if (size) setPageSize(size);
          },
        }}
        size="small"
        style={{
          background: isDark ? "transparent" : "#fff",
          borderRadius: 8,
          border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
        }}
      />

      <Modal
        title="Add new barcode setting"
        open={addModalOpen}
        onCancel={() => setAddModalOpen(false)}
        onOk={handleAddModalSubmit}
        okText="Add"
        destroyOnClose
        width={480}
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item
            name="name"
            label="Sticker Sheet setting Name"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>
          <Form.Item name="description" label="Sticker Sheet setting Description">
            <Input.TextArea placeholder="Enter description" rows={3} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Edit barcode setting"
        open={editModalOpen}
        onCancel={() => { setEditModalOpen(false); setEditingRecord(null); form.resetFields(); }}
        onOk={handleEditSubmit}
        okText="Save"
        destroyOnClose
        width={480}
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item
            name="name"
            label="Sticker Sheet setting Name"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>
          <Form.Item name="description" label="Sticker Sheet setting Description">
            <Input.TextArea placeholder="Enter description" rows={3} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="View barcode setting"
        open={viewModalOpen}
        onCancel={() => { setViewModalOpen(false); setViewingRecord(null); }}
        footer={[
          <Button key="close" onClick={() => { setViewModalOpen(false); setViewingRecord(null); }}>
            Close
          </Button>,
        ]}
        width={480}
      >
        {viewingRecord && (
          <div style={{ marginTop: 16 }}>
            <div style={{ marginBottom: 12 }}>
              <Typography.Text type="secondary">Sticker Sheet setting Name</Typography.Text>
              <div style={{ marginTop: 4 }}>{viewingRecord.name}</div>
            </div>
            <div>
              <Typography.Text type="secondary">Sticker Sheet setting Description</Typography.Text>
              <div style={{ marginTop: 4 }}>{viewingRecord.description || "—"}</div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BarcodeSettings;
