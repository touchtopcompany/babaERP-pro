import React, { useState, useMemo } from "react";
import {
  Table,
  Button,
  Input,
  Typography,
  Space,
  Select,
  Tooltip,
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
  FileExcelOutlined,
  FilePdfOutlined,
  PrinterOutlined,
  FileTextOutlined,
  ColumnWidthOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import useTheme from "@/theme/useTheme";

const { Title } = Typography;

export interface TaxRateRecord {
  key: string;
  name: string;
  taxRatePercent: number;
}

export interface TaxGroupRecord {
  key: string;
  name: string;
  taxRatePercent: number;
  subTaxes: string;
}

const MOCK_TAX_RATES: TaxRateRecord[] = [
  { key: "1", name: "VAT 18%", taxRatePercent: 18 },
  { key: "2", name: "VAT 0%", taxRatePercent: 0 },
  { key: "3", name: "VAT 10%", taxRatePercent: 10 },
];

const MOCK_TAX_GROUPS: TaxGroupRecord[] = [
  { key: "1", name: "Standard VAT", taxRatePercent: 18, subTaxes: "VAT 18%" },
  { key: "2", name: "Zero Rated", taxRatePercent: 0, subTaxes: "VAT 0%" },
];

const TaxRates: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [searchRates, setSearchRates] = useState("");
  const [searchGroups, setSearchGroups] = useState("");
  const [pageSizeRates, setPageSizeRates] = useState(25);
  const [pageSizeGroups, setPageSizeGroups] = useState(25);
  const [currentPageRates, setCurrentPageRates] = useState(1);
  const [currentPageGroups, setCurrentPageGroups] = useState(1);
  const [taxRates, setTaxRates] = useState<TaxRateRecord[]>(MOCK_TAX_RATES);
  const [taxGroups, setTaxGroups] = useState<TaxGroupRecord[]>(MOCK_TAX_GROUPS);
  const [addRateModalOpen, setAddRateModalOpen] = useState(false);
  const [addGroupModalOpen, setAddGroupModalOpen] = useState(false);
  const [editRateModalOpen, setEditRateModalOpen] = useState(false);
  const [editGroupModalOpen, setEditGroupModalOpen] = useState(false);
  const [editingRate, setEditingRate] = useState<TaxRateRecord | null>(null);
  const [editingGroup, setEditingGroup] = useState<TaxGroupRecord | null>(null);
  const [rateForm] = Form.useForm();
  const [groupForm] = Form.useForm();

  const filteredRates = useMemo(() => {
    if (!searchRates.trim()) return taxRates;
    const q = searchRates.toLowerCase();
    return taxRates.filter(
      (r) => r.name.toLowerCase().includes(q) || String(r.taxRatePercent).includes(q)
    );
  }, [taxRates, searchRates]);

  const filteredGroups = useMemo(() => {
    if (!searchGroups.trim()) return taxGroups;
    const q = searchGroups.toLowerCase();
    return taxGroups.filter(
      (g) =>
        g.name.toLowerCase().includes(q) ||
        String(g.taxRatePercent).includes(q) ||
        g.subTaxes.toLowerCase().includes(q)
    );
  }, [taxGroups, searchGroups]);

  const handleAddRate = () => {
    rateForm.resetFields();
    setAddRateModalOpen(true);
  };
  const handleAddGroup = () => {
    groupForm.resetFields();
    setAddGroupModalOpen(true);
  };

  const handleAddRateSubmit = () => {
    rateForm.validateFields().then((values) => {
      const newRecord: TaxRateRecord = {
        key: String(Date.now()),
        name: values.name || "",
        taxRatePercent: Number(values.taxRatePercent) || 0,
      };
      setTaxRates((prev) => [...prev, newRecord]);
      message.success("Tax rate added successfully");
      setAddRateModalOpen(false);
      rateForm.resetFields();
    });
  };

  const handleAddGroupSubmit = () => {
    groupForm.validateFields().then((values) => {
      const newRecord: TaxGroupRecord = {
        key: String(Date.now()),
        name: values.name || "",
        taxRatePercent: Number(values.taxRatePercent) || 0,
        subTaxes: values.subTaxes || "",
      };
      setTaxGroups((prev) => [...prev, newRecord]);
      message.success("Tax group added successfully");
      setAddGroupModalOpen(false);
      groupForm.resetFields();
    });
  };
  const openEditRate = (r: TaxRateRecord) => {
    setEditingRate(r);
    rateForm.setFieldsValue({ name: r.name, taxRatePercent: r.taxRatePercent });
    setEditRateModalOpen(true);
  };
  const handleEditRateSubmit = () => {
    if (!editingRate) return;
    rateForm.validateFields().then((values) => {
      setTaxRates((prev) =>
        prev.map((x) =>
          x.key === editingRate.key
            ? { ...x, name: values.name || "", taxRatePercent: Number(values.taxRatePercent) || 0 }
            : x
        )
      );
      message.success("Tax rate updated successfully");
      setEditRateModalOpen(false);
      setEditingRate(null);
      rateForm.resetFields();
    });
  };
  const handleDeleteRate = (r: TaxRateRecord) => {
    setTaxRates((prev) => prev.filter((x) => x.key !== r.key));
    message.success("Tax rate deleted");
  };

  const openEditGroup = (g: TaxGroupRecord) => {
    setEditingGroup(g);
    groupForm.setFieldsValue({ name: g.name, taxRatePercent: g.taxRatePercent, subTaxes: g.subTaxes });
    setEditGroupModalOpen(true);
  };
  const handleEditGroupSubmit = () => {
    if (!editingGroup) return;
    groupForm.validateFields().then((values) => {
      setTaxGroups((prev) =>
        prev.map((x) =>
          x.key === editingGroup.key
            ? {
                ...x,
                name: values.name || "",
                taxRatePercent: Number(values.taxRatePercent) || 0,
                subTaxes: values.subTaxes || "",
              }
            : x
        )
      );
      message.success("Tax group updated successfully");
      setEditGroupModalOpen(false);
      setEditingGroup(null);
      groupForm.resetFields();
    });
  };
  const handleDeleteGroup = (g: TaxGroupRecord) => {
    setTaxGroups((prev) => prev.filter((x) => x.key !== g.key));
    message.success("Tax group deleted");
  };
  const handleExport = (format: string) => message.info(`Export to ${format} (demo)`);
  const handlePrint = () => message.info("Print (demo)");
  const handleColumnVisibility = () => message.info("Column visibility (demo)");

  const rateColumns: ColumnsType<TaxRateRecord> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      width: 200,
    },
    {
      title: "Tax Rate %",
      dataIndex: "taxRatePercent",
      key: "taxRatePercent",
      sorter: (a, b) => a.taxRatePercent - b.taxRatePercent,
      width: 120,
      render: (v: number) => (v != null ? `${v}%` : "-"),
    },
    {
      title: "Action",
      key: "action",
      sorter: () => 0,
      width: 180,
      render: (_: unknown, record: TaxRateRecord) => (
        <Space size="small">
          <Button type="primary" size="small" icon={<EditOutlined />} onClick={() => openEditRate(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Delete tax rate"
            description="Are you sure you want to delete this tax rate?"
            onConfirm={() => handleDeleteRate(record)}
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

  const groupColumns: ColumnsType<TaxGroupRecord> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      width: 200,
    },
    {
      title: "Tax Rate %",
      dataIndex: "taxRatePercent",
      key: "taxRatePercent",
      sorter: (a, b) => a.taxRatePercent - b.taxRatePercent,
      width: 120,
      render: (v: number) => (v != null ? `${v}%` : "-"),
    },
    {
      title: "Sub taxes",
      dataIndex: "subTaxes",
      key: "subTaxes",
      sorter: (a, b) => (a.subTaxes || "").localeCompare(b.subTaxes || ""),
      width: 200,
    },
    {
      title: "Action",
      key: "action",
      width: 180,
      render: (_: unknown, record: TaxGroupRecord) => (
        <Space size="small">
          <Button type="primary" size="small" icon={<EditOutlined />} onClick={() => openEditGroup(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Delete tax group"
            description="Are you sure you want to delete this tax group?"
            onConfirm={() => handleDeleteGroup(record)}
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

  const inputStyle = {
    width: 220,
    background: isDark ? "rgba(255,255,255,0.05)" : "#fff",
    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
    borderRadius: 6,
  };

  const tableStyle = {
    background: isDark ? "transparent" : "#fff",
    borderRadius: 8,
    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
  };

  const renderTableBar = (
    showEntriesValue: number,
    onShowEntriesChange: (v: number) => void,
    searchValue: string,
    onSearchChange: (v: string) => void,
    onAdd: () => void,
    addLabel = "Add"
  ) => (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12, marginBottom: 16 }}>
      <Space size="small">
        <Typography.Text type="secondary" style={{ fontSize: 13 }}>Show</Typography.Text>
        <Select
          value={showEntriesValue}
          onChange={onShowEntriesChange}
          options={[10, 25, 50, 100].map((n) => ({ label: String(n), value: n }))}
          style={{ width: 70 }}
        />
        <Typography.Text type="secondary" style={{ fontSize: 13 }}>entries</Typography.Text>
      </Space>
      <Space size="small">
        <Button size="small" icon={<FileTextOutlined />} onClick={() => handleExport("CSV")}>
          Export to CSV
        </Button>
        <Button size="small" icon={<FileExcelOutlined />} onClick={() => handleExport("Excel")}>
          Export to Excel
        </Button>
        <Button size="small" icon={<PrinterOutlined />} onClick={handlePrint}>
          Print
        </Button>
        <Button size="small" icon={<ColumnWidthOutlined />} onClick={handleColumnVisibility}>
          Column visibility
        </Button>
        <Button size="small" icon={<FilePdfOutlined />} onClick={() => handleExport("PDF")}>
          Export to PDF
        </Button>
      </Space>
      <div style={{ flex: 1, minWidth: 120 }} />
      <Space size="middle">
        <Input
          placeholder="Search..."
          prefix={<SearchOutlined style={{ color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c" }} />}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          style={inputStyle}
          allowClear
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={onAdd} style={{ borderRadius: 6 }}>
          {addLabel}
        </Button>
      </Space>
    </div>
  );

  const getPagination = (
    current: number,
    total: number,
    pageSize: number,
    setCurrent: (p: number) => void,
    setSize: (s: number) => void
  ) => ({
    current,
    pageSize,
    total,
    showSizeChanger: true,
    pageSizeOptions: ["10", "25", "50", "100"],
    showTotal: (t: number, range?: [number, number]) =>
      range ? `Showing ${range[0]} to ${range[1]} of ${t} entries` : `Showing 0 to 0 of ${t} entries`,
    onChange: (page: number, size: number) => {
      setCurrent(page);
      setSize(size);
    },
  });

  return (
    <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
      <Title level={2} style={{ marginBottom: 4, color: isDark ? "#fff" : "#1f1f1f", fontWeight: 600 }}>
        Tax Rates
      </Title>
      <Typography.Text type="secondary" style={{ display: "block", marginBottom: 16, fontSize: 14 }}>
        Manage your tax rates
      </Typography.Text>
      <div style={{ borderBottom: "3px solid #1890ff", marginBottom: 24, width: "100%" }} />

      {/* Section 1: All your tax rates */}
      <Title level={5} style={{ marginBottom: 16, color: isDark ? "#fff" : "#1f1f1f" }}>
        All your tax rates
      </Title>
      {renderTableBar(pageSizeRates, setPageSizeRates, searchRates, setSearchRates, handleAddRate, "Add")}
      <Table<TaxRateRecord>
        columns={rateColumns}
        dataSource={filteredRates}
        locale={{ emptyText: "No data available in table" }}
        pagination={getPagination(currentPageRates, filteredRates.length, pageSizeRates, setCurrentPageRates, setPageSizeRates)}
        size="small"
        style={tableStyle}
      />

      {/* Section 2: Tax groups */}
      <div style={{ marginTop: 32, paddingTop: 24, borderTop: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0" }}>
        <Title level={5} style={{ marginBottom: 16, color: isDark ? "#fff" : "#1f1f1f" }}>
          Tax groups (Combination of multiple taxes)
          <Tooltip title="Combine multiple tax rates into a group">
            <InfoCircleOutlined style={{ marginLeft: 6, color: "#1890ff", fontSize: 14 }} />
          </Tooltip>
        </Title>
        {renderTableBar(pageSizeGroups, setPageSizeGroups, searchGroups, setSearchGroups, handleAddGroup, "Add")}
        <Table<TaxGroupRecord>
          columns={groupColumns}
          dataSource={filteredGroups}
          locale={{ emptyText: "No data available in table" }}
          pagination={getPagination(currentPageGroups, filteredGroups.length, pageSizeGroups, setCurrentPageGroups, setPageSizeGroups)}
          size="small"
          style={tableStyle}
        />
      </div>

      <Modal
        title="Add Tax Rate"
        open={addRateModalOpen}
        onCancel={() => setAddRateModalOpen(false)}
        onOk={handleAddRateSubmit}
        okText="Add"
        destroyOnClose
        width={420}
      >
        <Form form={rateForm} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please enter the name" }]}>
            <Input placeholder="Tax rate name" />
          </Form.Item>
          <Form.Item
            name="taxRatePercent"
            label="Tax Rate %"
            rules={[{ required: true, message: "Please enter the tax rate" }]}
          >
            <Input type="number" min={0} step={0.01} placeholder="e.g. 18" addonAfter="%" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Add Tax Group"
        open={addGroupModalOpen}
        onCancel={() => setAddGroupModalOpen(false)}
        onOk={handleAddGroupSubmit}
        okText="Add"
        destroyOnClose
        width={420}
      >
        <Form form={groupForm} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please enter the name" }]}>
            <Input placeholder="Tax group name" />
          </Form.Item>
          <Form.Item
            name="taxRatePercent"
            label="Tax Rate %"
            rules={[{ required: true, message: "Please enter the tax rate" }]}
          >
            <Input type="number" min={0} step={0.01} placeholder="e.g. 18" addonAfter="%" />
          </Form.Item>
          <Form.Item name="subTaxes" label="Sub taxes">
            <Input.TextArea placeholder="Sub taxes (comma-separated or description)" rows={2} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Edit Tax Rate"
        open={editRateModalOpen}
        onCancel={() => { setEditRateModalOpen(false); setEditingRate(null); rateForm.resetFields(); }}
        onOk={handleEditRateSubmit}
        okText="Save"
        destroyOnClose
        width={420}
      >
        <Form form={rateForm} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please enter the name" }]}>
            <Input placeholder="Tax rate name" />
          </Form.Item>
          <Form.Item
            name="taxRatePercent"
            label="Tax Rate %"
            rules={[{ required: true, message: "Please enter the tax rate" }]}
          >
            <Input type="number" min={0} step={0.01} placeholder="e.g. 18" addonAfter="%" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Edit Tax Group"
        open={editGroupModalOpen}
        onCancel={() => { setEditGroupModalOpen(false); setEditingGroup(null); groupForm.resetFields(); }}
        onOk={handleEditGroupSubmit}
        okText="Save"
        destroyOnClose
        width={420}
      >
        <Form form={groupForm} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please enter the name" }]}>
            <Input placeholder="Tax group name" />
          </Form.Item>
          <Form.Item
            name="taxRatePercent"
            label="Tax Rate %"
            rules={[{ required: true, message: "Please enter the tax rate" }]}
          >
            <Input type="number" min={0} step={0.01} placeholder="e.g. 18" addonAfter="%" />
          </Form.Item>
          <Form.Item name="subTaxes" label="Sub taxes">
            <Input.TextArea placeholder="Sub taxes (comma-separated or description)" rows={2} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TaxRates;
