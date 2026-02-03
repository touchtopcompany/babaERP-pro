import React, { useState, useMemo } from "react";
import {
  Table,
  Button,
  Input,
  Typography,
  Space,
  Modal,
  Form,
  Select,
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

export interface PrinterRecord {
  key: string;
  printerName: string;
  connectionType: string;
  capabilityProfile: string;
  charactersPerLine: number | string;
  ipAddress: string;
  port: string;
  path: string;
}

const MOCK_PRINTERS: PrinterRecord[] = [
  {
    key: "1",
    printerName: "POS Receipt Printer",
    connectionType: "network",
    capabilityProfile: "default",
    charactersPerLine: 42,
    ipAddress: "192.168.1.50",
    port: "9100",
    path: "",
  },
  {
    key: "2",
    printerName: "Kitchen Printer",
    connectionType: "network",
    capabilityProfile: "default",
    charactersPerLine: 48,
    ipAddress: "192.168.1.51",
    port: "9100",
    path: "",
  },
  {
    key: "3",
    printerName: "Back Office USB",
    connectionType: "usb",
    capabilityProfile: "default",
    charactersPerLine: 80,
    ipAddress: "",
    port: "",
    path: "/dev/usb/lp0",
  },
];

const Printers: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [printers, setPrinters] = useState<PrinterRecord[]>(MOCK_PRINTERS);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<PrinterRecord | null>(null);
  const [viewingRecord, setViewingRecord] = useState<PrinterRecord | null>(null);
  const [form] = Form.useForm();

  const filteredPrinters = useMemo(() => {
    if (!searchText.trim()) return printers;
    const q = searchText.toLowerCase();
    return printers.filter(
      (p) =>
        p.printerName.toLowerCase().includes(q) ||
        p.connectionType.toLowerCase().includes(q) ||
        (p.ipAddress && p.ipAddress.toLowerCase().includes(q)) ||
        (p.path && p.path.toLowerCase().includes(q))
    );
  }, [printers, searchText]);

  const handleAddPrinter = () => {
    form.resetFields();
    setAddModalOpen(true);
  };

  const handleAddModalSubmit = () => {
    form.validateFields().then((values) => {
      const newRecord: PrinterRecord = {
        key: String(Date.now()),
        printerName: values.printerName || "",
        connectionType: values.connectionType || "",
        capabilityProfile: values.capabilityProfile || "",
        charactersPerLine: values.charactersPerLine ?? "",
        ipAddress: values.ipAddress || "",
        port: values.port || "",
        path: values.path || "",
      };
      setPrinters((prev) => [...prev, newRecord]);
      message.success("Printer added successfully");
      setAddModalOpen(false);
      form.resetFields();
    });
  };

  const openEditModal = (record: PrinterRecord) => {
    setEditingRecord(record);
    form.setFieldsValue({
      printerName: record.printerName,
      connectionType: record.connectionType || undefined,
      capabilityProfile: record.capabilityProfile,
      charactersPerLine: record.charactersPerLine,
      ipAddress: record.ipAddress,
      port: record.port,
      path: record.path,
    });
    setEditModalOpen(true);
  };

  const handleEditSubmit = () => {
    if (!editingRecord) return;
    form.validateFields().then((values) => {
      setPrinters((prev) =>
        prev.map((p) =>
          p.key === editingRecord.key
            ? {
                ...p,
                printerName: values.printerName || "",
                connectionType: values.connectionType || "",
                capabilityProfile: values.capabilityProfile || "",
                charactersPerLine: values.charactersPerLine ?? "",
                ipAddress: values.ipAddress || "",
                port: values.port || "",
                path: values.path || "",
              }
            : p
        )
      );
      message.success("Printer updated successfully");
      setEditModalOpen(false);
      setEditingRecord(null);
      form.resetFields();
    });
  };

  const openViewModal = (record: PrinterRecord) => {
    setViewingRecord(record);
    setViewModalOpen(true);
  };

  const handleDelete = (record: PrinterRecord) => {
    setPrinters((prev) => prev.filter((p) => p.key !== record.key));
    message.success("Printer deleted");
  };

  const columns: ColumnsType<PrinterRecord> = [
    {
      title: "Printer Name",
      dataIndex: "printerName",
      key: "printerName",
      sorter: (a, b) => a.printerName.localeCompare(b.printerName),
      width: 160,
    },
    {
      title: "Connection Type",
      dataIndex: "connectionType",
      key: "connectionType",
      sorter: (a, b) => a.connectionType.localeCompare(b.connectionType),
      width: 140,
    },
    {
      title: "Capability Profile",
      dataIndex: "capabilityProfile",
      key: "capabilityProfile",
      sorter: (a, b) => (a.capabilityProfile || "").localeCompare(b.capabilityProfile || ""),
      width: 160,
    },
    {
      title: "Characters per line",
      dataIndex: "charactersPerLine",
      key: "charactersPerLine",
      width: 140,
    },
    {
      title: "IP Address",
      dataIndex: "ipAddress",
      key: "ipAddress",
      sorter: (a, b) => (a.ipAddress || "").localeCompare(b.ipAddress || ""),
      width: 120,
    },
    {
      title: "Port",
      dataIndex: "port",
      key: "port",
      sorter: (a, b) => (a.port || "").localeCompare(b.port || ""),
      width: 80,
    },
    {
      title: "Path",
      dataIndex: "path",
      key: "path",
      width: 180,
    },
    {
      title: "Action",
      key: "action",
      width: 180,
      render: (_: unknown, record: PrinterRecord) => (
        <Space size="small">
          <Button type="link" size="small" icon={<EyeOutlined />} onClick={() => openViewModal(record)}>
            View
          </Button>
          <Button type="primary" size="small" icon={<EditOutlined />} onClick={() => openEditModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Delete printer"
            description="Are you sure you want to delete this printer?"
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
  const end = Math.min(start + pageSize, filteredPrinters.length);
  const total = filteredPrinters.length;
  const paginationText = total > 0 ? `Showing ${start + 1} to ${end} of ${total} entries` : "Showing 0 to 0 of 0 entries";

  return (
    <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
      <Title level={2} style={{ marginBottom: 4, color: isDark ? "#fff" : "#1f1f1f", fontWeight: 600 }}>
        Printers
      </Title>
      <Typography.Text type="secondary" style={{ display: "block", marginBottom: 16, fontSize: 14 }}>
        Manage your Printers
      </Typography.Text>
      <div style={{ borderBottom: "3px solid #1890ff", marginBottom: 24, width: "100%" }} />

      <Title level={5} style={{ marginBottom: 16, color: isDark ? "#fff" : "#1f1f1f" }}>
        All configured Printers
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
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddPrinter} style={{ borderRadius: 6 }}>
            Add Printer
          </Button>
        </Space>
      </div>

      <Table<PrinterRecord>
        columns={columns}
        dataSource={filteredPrinters}
        locale={{ emptyText: "No data available in table" }}
        pagination={{
          current: currentPage,
          pageSize,
          total: filteredPrinters.length,
          showSizeChanger: true,
          pageSizeOptions: ["10", "25", "50", "100"],
          showTotal: () => paginationText,
          onChange: (page, size) => {
            setCurrentPage(page);
            if (size) setPageSize(size);
          },
        }}
        scroll={{ x: 1200 }}
        size="small"
        style={{
          background: isDark ? "transparent" : "#fff",
          borderRadius: 8,
          border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
        }}
      />

      <Modal
        title="Add Printer"
        open={addModalOpen}
        onCancel={() => setAddModalOpen(false)}
        onOk={handleAddModalSubmit}
        okText="Add"
        destroyOnClose
        width={520}
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item
            name="printerName"
            label="Printer Name"
            rules={[{ required: true, message: "Please enter printer name" }]}
          >
            <Input placeholder="Printer name" />
          </Form.Item>
          <Form.Item name="connectionType" label="Connection Type">
            <Select placeholder="Select connection type" allowClear options={[
              { label: "Network", value: "network" },
              { label: "USB", value: "usb" },
              { label: "Bluetooth", value: "bluetooth" },
            ]} />
          </Form.Item>
          <Form.Item name="capabilityProfile" label="Capability Profile">
            <Input placeholder="Capability profile" />
          </Form.Item>
          <Form.Item name="charactersPerLine" label="Characters per line">
            <Input type="number" min={1} placeholder="e.g. 42" />
          </Form.Item>
          <Form.Item name="ipAddress" label="IP Address">
            <Input placeholder="e.g. 192.168.1.100" />
          </Form.Item>
          <Form.Item name="port" label="Port">
            <Input placeholder="e.g. 9100" />
          </Form.Item>
          <Form.Item name="path" label="Path">
            <Input placeholder="Printer path" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Edit Printer"
        open={editModalOpen}
        onCancel={() => { setEditModalOpen(false); setEditingRecord(null); form.resetFields(); }}
        onOk={handleEditSubmit}
        okText="Save"
        destroyOnClose
        width={520}
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item
            name="printerName"
            label="Printer Name"
            rules={[{ required: true, message: "Please enter printer name" }]}
          >
            <Input placeholder="Printer name" />
          </Form.Item>
          <Form.Item name="connectionType" label="Connection Type">
            <Select placeholder="Select connection type" allowClear options={[
              { label: "Network", value: "network" },
              { label: "USB", value: "usb" },
              { label: "Bluetooth", value: "bluetooth" },
            ]} />
          </Form.Item>
          <Form.Item name="capabilityProfile" label="Capability Profile">
            <Input placeholder="Capability profile" />
          </Form.Item>
          <Form.Item name="charactersPerLine" label="Characters per line">
            <Input type="number" min={1} placeholder="e.g. 42" />
          </Form.Item>
          <Form.Item name="ipAddress" label="IP Address">
            <Input placeholder="e.g. 192.168.1.100" />
          </Form.Item>
          <Form.Item name="port" label="Port">
            <Input placeholder="e.g. 9100" />
          </Form.Item>
          <Form.Item name="path" label="Path">
            <Input placeholder="Printer path" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="View Printer"
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
            {[
              { label: "Printer Name", value: viewingRecord.printerName },
              { label: "Connection Type", value: viewingRecord.connectionType || "—" },
              { label: "Capability Profile", value: viewingRecord.capabilityProfile || "—" },
              { label: "Characters per line", value: viewingRecord.charactersPerLine ?? "—" },
              { label: "IP Address", value: viewingRecord.ipAddress || "—" },
              { label: "Port", value: viewingRecord.port || "—" },
              { label: "Path", value: viewingRecord.path || "—" },
            ].map(({ label, value }) => (
              <div key={label} style={{ marginBottom: 12 }}>
                <Typography.Text type="secondary">{label}</Typography.Text>
                <div style={{ marginTop: 4 }}>{String(value)}</div>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Printers;
