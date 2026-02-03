import React, { useState, useMemo } from "react";
import {
  Table,
  Button,
  Input,
  Typography,
  Space,
  Tabs,
  Tag,
  Tooltip,
  Modal,
  Form,
  Select,
  Checkbox,
  message,
  Card,
  Row,
  Col,
  Popconfirm,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import useTheme from "@/theme/useTheme";

const { Title, Text } = Typography;

export interface InvoiceSchemeRecord {
  key: string;
  name: string;
  isDefault: boolean;
  prefix: string;
  numberingType: string;
  startFrom: number;
  invoiceCount: number;
  numberOfDigits: number;
}

const MOCK_SCHEMES: InvoiceSchemeRecord[] = [
  {
    key: "1",
    name: "C2Z Digital Solutions",
    isDefault: true,
    prefix: "",
    numberingType: "Sequential",
    startFrom: 0,
    invoiceCount: 9,
    numberOfDigits: 4,
  },
];

export interface InvoiceLayoutRecord {
  key: string;
  name: string;
  isDefault: boolean;
  usedInLocations?: string[];
}

const MOCK_LAYOUTS: InvoiceLayoutRecord[] = [
  { key: "1", name: "C2Z Digital Solutions", isDefault: true },
  { key: "2", name: "C2Z Repair", isDefault: false, usedInLocations: ["C2Z Digital Solutions"] },
];

const ColHeader: React.FC<{ title: string; tooltip: string }> = ({ title, tooltip }) => (
  <span>
    {title}{" "}
    <Tooltip title={tooltip}>
      <InfoCircleOutlined style={{ marginLeft: 4, color: "#1890ff", fontSize: 12 }} />
    </Tooltip>
  </span>
);

const InvoiceSettings: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeTab, setActiveTab] = useState("schemes");
  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [schemes, setSchemes] = useState<InvoiceSchemeRecord[]>(MOCK_SCHEMES);
  const [layouts, setLayouts] = useState<InvoiceLayoutRecord[]>(MOCK_LAYOUTS);
  const [addSchemeModalOpen, setAddSchemeModalOpen] = useState(false);
  const [addLayoutModalOpen, setAddLayoutModalOpen] = useState(false);
  const [editSchemeModalOpen, setEditSchemeModalOpen] = useState(false);
  const [editLayoutModalOpen, setEditLayoutModalOpen] = useState(false);
  const [editingScheme, setEditingScheme] = useState<InvoiceSchemeRecord | null>(null);
  const [editingLayout, setEditingLayout] = useState<InvoiceLayoutRecord | null>(null);
  const [schemeForm] = Form.useForm();
  const [layoutForm] = Form.useForm();

  const filteredSchemes = useMemo(() => {
    if (!searchText.trim()) return schemes;
    const q = searchText.toLowerCase();
    return schemes.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        (s.prefix && s.prefix.toLowerCase().includes(q)) ||
        s.numberingType.toLowerCase().includes(q)
    );
  }, [schemes, searchText]);

  const handleAddScheme = () => {
    schemeForm.resetFields();
    setAddSchemeModalOpen(true);
  };

  const handleAddSchemeSubmit = () => {
    schemeForm.validateFields().then((values) => {
      const newRecord: InvoiceSchemeRecord = {
        key: String(Date.now()),
        name: values.name || "",
        isDefault: values.isDefault ?? false,
        prefix: values.prefix || "",
        numberingType: values.numberingType || "Sequential",
        startFrom: Number(values.startFrom) ?? 0,
        invoiceCount: 0,
        numberOfDigits: Number(values.numberOfDigits) ?? 4,
      };
      setSchemes((prev) => [...prev, newRecord]);
      message.success("Invoice scheme added successfully");
      setAddSchemeModalOpen(false);
      schemeForm.resetFields();
    });
  };

  const openEditScheme = (record: InvoiceSchemeRecord) => {
    setEditingScheme(record);
    schemeForm.setFieldsValue({
      name: record.name,
      prefix: record.prefix,
      numberingType: record.numberingType,
      startFrom: record.startFrom,
      numberOfDigits: record.numberOfDigits,
      isDefault: record.isDefault,
    });
    setEditSchemeModalOpen(true);
  };

  const handleEditSchemeSubmit = () => {
    if (!editingScheme) return;
    schemeForm.validateFields().then((values) => {
      setSchemes((prev) =>
        prev.map((s) =>
          s.key === editingScheme.key
            ? {
                ...s,
                name: values.name || "",
                prefix: values.prefix || "",
                numberingType: values.numberingType || "Sequential",
                startFrom: Number(values.startFrom) ?? 0,
                numberOfDigits: Number(values.numberOfDigits) ?? 4,
                isDefault: values.isDefault ?? false,
              }
            : s
        )
      );
      message.success("Invoice scheme updated successfully");
      setEditSchemeModalOpen(false);
      setEditingScheme(null);
      schemeForm.resetFields();
    });
  };

  const handleDeleteScheme = (record: InvoiceSchemeRecord) => {
    setSchemes((prev) => prev.filter((s) => s.key !== record.key));
    message.success("Invoice scheme deleted");
  };

  const handleSetDefault = (record: InvoiceSchemeRecord) => {
    setSchemes((prev) =>
      prev.map((s) => ({ ...s, isDefault: s.key === record.key }))
    );
    message.success(`Default set to ${record.name}`);
  };

  const openEditLayout = (record: InvoiceLayoutRecord) => {
    setEditingLayout(record);
    layoutForm.setFieldsValue({
      name: record.name,
      isDefault: record.isDefault,
      usedInLocations: record.usedInLocations?.join(", "),
    });
    setEditLayoutModalOpen(true);
  };

  const handleEditLayoutSubmit = () => {
    if (!editingLayout) return;
    layoutForm.validateFields().then((values) => {
      const usedIn = values.usedInLocations;
      const usedInLocations = typeof usedIn === "string"
        ? (usedIn.trim() ? usedIn.split(",").map((s: string) => s.trim()).filter(Boolean) : undefined)
        : Array.isArray(usedIn) ? usedIn : undefined;
      setLayouts((prev) =>
        prev.map((l) =>
          l.key === editingLayout.key
            ? { ...l, name: values.name || "", isDefault: values.isDefault ?? false, usedInLocations }
            : l
        )
      );
      message.success("Invoice layout updated successfully");
      setEditLayoutModalOpen(false);
      setEditingLayout(null);
      layoutForm.resetFields();
    });
  };

  const handleDeleteLayout = (record: InvoiceLayoutRecord) => {
    setLayouts((prev) => prev.filter((l) => l.key !== record.key));
    message.success("Invoice layout deleted");
  };

  const handleAddLayout = () => {
    layoutForm.resetFields();
    setAddLayoutModalOpen(true);
  };

  const handleAddLayoutSubmit = () => {
    layoutForm.validateFields().then((values) => {
      const usedIn = values.usedInLocations;
      const usedInLocations = typeof usedIn === "string" ? (usedIn.trim() ? usedIn.split(",").map((s: string) => s.trim()).filter(Boolean) : undefined) : Array.isArray(usedIn) ? usedIn : undefined;
      const newRecord: InvoiceLayoutRecord = {
        key: String(Date.now()),
        name: values.name || "",
        isDefault: values.isDefault ?? false,
        usedInLocations,
      };
      setLayouts((prev) => [...prev, newRecord]);
      message.success("Invoice layout added successfully");
      setAddLayoutModalOpen(false);
      layoutForm.resetFields();
    });
  };

  const columns: ColumnsType<InvoiceSchemeRecord> = [
    {
      title: <ColHeader title="Name" tooltip="Invoice scheme name" />,
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      width: 200,
      render: (name: string, record: InvoiceSchemeRecord) => (
        <Space>
          <span>{name}</span>
          {record.isDefault && <Tag color="green">Default</Tag>}
        </Space>
      ),
    },
    {
      title: <ColHeader title="Prefix" tooltip="Prefix for invoice numbers" />,
      dataIndex: "prefix",
      key: "prefix",
      sorter: (a, b) => (a.prefix || "").localeCompare(b.prefix || ""),
      width: 100,
    },
    {
      title: <ColHeader title="Numbering Type" tooltip="How invoice numbers are generated" />,
      dataIndex: "numberingType",
      key: "numberingType",
      sorter: (a, b) => a.numberingType.localeCompare(b.numberingType),
      width: 120,
    },
    {
      title: <ColHeader title="Start from" tooltip="Starting number for sequential numbering" />,
      dataIndex: "startFrom",
      key: "startFrom",
      sorter: (a, b) => a.startFrom - b.startFrom,
      width: 100,
    },
    {
      title: <ColHeader title="Invoice Count" tooltip="Current invoice count" />,
      dataIndex: "invoiceCount",
      key: "invoiceCount",
      sorter: (a, b) => a.invoiceCount - b.invoiceCount,
      width: 120,
    },
    {
      title: <ColHeader title="Number of digits" tooltip="Number of digits in invoice number" />,
      dataIndex: "numberOfDigits",
      key: "numberOfDigits",
      sorter: (a, b) => a.numberOfDigits - b.numberOfDigits,
      width: 120,
    },
    {
      title: "Action",
      key: "action",
      width: 260,
      fixed: "right",
      render: (_: unknown, record: InvoiceSchemeRecord) => (
        <Space size="small">
          <Button type="primary" size="small" icon={<EditOutlined />} onClick={() => openEditScheme(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Delete invoice scheme"
            description="Are you sure you want to delete this invoice scheme?"
            onConfirm={() => handleDeleteScheme(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" size="small" danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
          {!record.isDefault && (
            <Button
              type="primary"
              size="small"
              style={{ background: "#52c41a", borderColor: "#52c41a" }}
              icon={<CheckCircleOutlined />}
              onClick={() => handleSetDefault(record)}
            >
              Default
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const start = (currentPage - 1) * pageSize;
  const end = Math.min(start + pageSize, filteredSchemes.length);
  const total = filteredSchemes.length;
  const paginationText = total > 0 ? `Showing ${start + 1} to ${end} of ${total} entries` : "Showing 0 to 0 of 0 entries";

  const schemesTab = (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
        <Title level={5} style={{ margin: 0, color: isDark ? "#fff" : "#1f1f1f" }}>
          All your invoice schemes
        </Title>
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
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddScheme} style={{ borderRadius: 6 }}>
            Add
          </Button>
        </Space>
      </div>
      <Table<InvoiceSchemeRecord>
        columns={columns}
        dataSource={filteredSchemes}
        pagination={{
          current: currentPage,
          pageSize,
          total: filteredSchemes.length,
          showSizeChanger: true,
          pageSizeOptions: ["10", "25", "50", "100"],
          showTotal: () => paginationText,
          onChange: (page, size) => {
            setCurrentPage(page);
            if (size) setPageSize(size);
          },
        }}
        scroll={{ x: 1000 }}
        size="small"
        style={{
          background: isDark ? "transparent" : "#fff",
          borderRadius: 8,
          border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
        }}
      />
    </>
  );

  const layoutsTab = (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <Title level={5} style={{ margin: 0, color: isDark ? "#fff" : "#1f1f1f" }}>
          All your invoice layouts
        </Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddLayout} style={{ borderRadius: 6 }}>
          Add
        </Button>
      </div>
      <Row gutter={[24, 24]}>
        {layouts.map((layout) => (
          <Col xs={24} sm={12} md={8} lg={6} key={layout.key}>
            <Card
              hoverable
              style={{
                background: isDark ? "rgba(255,255,255,0.03)" : "#fff",
                border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
                borderRadius: 8,
                textAlign: "center",
              }}
              bodyStyle={{ padding: 24 }}
            >
              <div style={{ marginBottom: 12 }}>
                <FileTextOutlined style={{ fontSize: 48, color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c" }} />
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, flexWrap: "wrap", marginBottom: layout.usedInLocations?.length ? 8 : 0 }}>
                <Text strong style={{ fontSize: 16, color: isDark ? "#fff" : "#1f1f1f" }}>
                  {layout.name}
                </Text>
                {layout.isDefault && <Tag color="green">Default</Tag>}
              </div>
              {layout.usedInLocations && layout.usedInLocations.length > 0 && (
                <Text type="secondary" style={{ display: "block", fontSize: 13, marginBottom: 12 }}>
                  Used in locations: {layout.usedInLocations.join(", ")}
                </Text>
              )}
              <Space size="small" wrap style={{ justifyContent: "center" }}>
                <Button type="primary" size="small" icon={<EditOutlined />} onClick={() => openEditLayout(layout)}>
                  Edit
                </Button>
                <Popconfirm
                  title="Delete invoice layout"
                  description="Are you sure you want to delete this layout?"
                  onConfirm={() => handleDeleteLayout(layout)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="primary" size="small" danger icon={<DeleteOutlined />}>
                    Delete
                  </Button>
                </Popconfirm>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );

  return (
    <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
      <Title level={2} style={{ marginBottom: 4, color: isDark ? "#fff" : "#1f1f1f", fontWeight: 600 }}>
        Invoice Settings
      </Title>
      <Text type="secondary" style={{ display: "block", marginBottom: 16, fontSize: 14 }}>
        Manage your invoice settings
      </Text>
      <div style={{ borderBottom: "3px solid #1890ff", marginBottom: 24, width: "100%" }} />

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          { key: "schemes", label: "Invoice Schemes", children: schemesTab },
          { key: "layouts", label: "Invoice Layouts", children: layoutsTab },
        ]}
        style={{ color: isDark ? "#fff" : "#1f1f1f" }}
      />

      <Modal
        title="Add Invoice Scheme"
        open={addSchemeModalOpen}
        onCancel={() => setAddSchemeModalOpen(false)}
        onOk={handleAddSchemeSubmit}
        okText="Add"
        destroyOnClose
        width={480}
      >
        <Form form={schemeForm} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please enter name" }]}>
            <Input placeholder="Scheme name" />
          </Form.Item>
          <Form.Item name="prefix" label="Prefix">
            <Input placeholder="Prefix for invoice numbers" />
          </Form.Item>
          <Form.Item name="numberingType" label="Numbering Type">
            <Select placeholder="Select" options={[{ label: "Sequential", value: "Sequential" }, { label: "Year", value: "Year" }, { label: "Random", value: "Random" }]} />
          </Form.Item>
          <Form.Item name="startFrom" label="Start from">
            <Input type="number" min={0} placeholder="0" />
          </Form.Item>
          <Form.Item name="numberOfDigits" label="Number of digits">
            <Input type="number" min={1} max={10} placeholder="4" />
          </Form.Item>
          <Form.Item name="isDefault" valuePropName="checked">
            <Checkbox>Set as default</Checkbox>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Add Invoice Layout"
        open={addLayoutModalOpen}
        onCancel={() => setAddLayoutModalOpen(false)}
        onOk={handleAddLayoutSubmit}
        okText="Add"
        destroyOnClose
        width={420}
      >
        <Form form={layoutForm} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please enter name" }]}>
            <Input placeholder="Layout name" />
          </Form.Item>
          <Form.Item name="isDefault" valuePropName="checked">
            <Checkbox>Set as default</Checkbox>
          </Form.Item>
          <Form.Item name="usedInLocations" label="Used in locations">
            <Input placeholder="Comma-separated location names" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Edit Invoice Scheme"
        open={editSchemeModalOpen}
        onCancel={() => { setEditSchemeModalOpen(false); setEditingScheme(null); schemeForm.resetFields(); }}
        onOk={handleEditSchemeSubmit}
        okText="Save"
        destroyOnClose
        width={480}
      >
        <Form form={schemeForm} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please enter name" }]}>
            <Input placeholder="Scheme name" />
          </Form.Item>
          <Form.Item name="prefix" label="Prefix">
            <Input placeholder="Prefix for invoice numbers" />
          </Form.Item>
          <Form.Item name="numberingType" label="Numbering Type">
            <Select placeholder="Select" options={[{ label: "Sequential", value: "Sequential" }, { label: "Year", value: "Year" }, { label: "Random", value: "Random" }]} />
          </Form.Item>
          <Form.Item name="startFrom" label="Start from">
            <Input type="number" min={0} placeholder="0" />
          </Form.Item>
          <Form.Item name="numberOfDigits" label="Number of digits">
            <Input type="number" min={1} max={10} placeholder="4" />
          </Form.Item>
          <Form.Item name="isDefault" valuePropName="checked">
            <Checkbox>Set as default</Checkbox>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Edit Invoice Layout"
        open={editLayoutModalOpen}
        onCancel={() => { setEditLayoutModalOpen(false); setEditingLayout(null); layoutForm.resetFields(); }}
        onOk={handleEditLayoutSubmit}
        okText="Save"
        destroyOnClose
        width={420}
      >
        <Form form={layoutForm} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please enter name" }]}>
            <Input placeholder="Layout name" />
          </Form.Item>
          <Form.Item name="isDefault" valuePropName="checked">
            <Checkbox>Set as default</Checkbox>
          </Form.Item>
          <Form.Item name="usedInLocations" label="Used in locations">
            <Input placeholder="Comma-separated location names" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default InvoiceSettings;
