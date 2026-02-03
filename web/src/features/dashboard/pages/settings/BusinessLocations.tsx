import React, { useState, useMemo } from "react";
import {
  Table,
  Button,
  Input,
  Typography,
  Space,
  Modal,
  Form,
  Row,
  Col,
  message,
  Popconfirm,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  SettingOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import useTheme from "@/theme/useTheme";

const { Title, Text } = Typography;

export interface BusinessLocationRecord {
  key: string;
  name: string;
  locationId: string;
  landmark: string;
  city: string;
  zipCode: string;
  state: string;
  country: string;
  priceGroup: string;
  invoiceScheme: string;
  invoiceLayoutPos: string;
  invoiceLayoutSale: string;
  active: boolean;
}

const MOCK_LOCATIONS: BusinessLocationRecord[] = [
  {
    key: "1",
    name: "C2Z Digital Solutions",
    locationId: "C2Z1",
    landmark: "Moivo Building",
    city: "Arusha",
    zipCode: "23100",
    state: "Moivo Street",
    country: "Tanzania",
    priceGroup: "",
    invoiceScheme: "C2Z Digital Solutions",
    invoiceLayoutPos: "C2Z Repair",
    invoiceLayoutSale: "C2Z Repair",
    active: true,
  },
];

const BusinessLocations: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [locations, setLocations] = useState<BusinessLocationRecord[]>(MOCK_LOCATIONS);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<BusinessLocationRecord | null>(null);
  const [form] = Form.useForm();

  const filteredLocations = useMemo(() => {
    if (!searchText.trim()) return locations;
    const q = searchText.toLowerCase();
    return locations.filter(
      (loc) =>
        loc.name.toLowerCase().includes(q) ||
        loc.locationId.toLowerCase().includes(q) ||
        loc.city.toLowerCase().includes(q) ||
        loc.country.toLowerCase().includes(q)
    );
  }, [locations, searchText]);

  const handleAdd = () => {
    form.resetFields();
    setAddModalOpen(true);
  };

  const handleAddModalSubmit = () => {
    form.validateFields().then((values) => {
      const newRecord: BusinessLocationRecord = {
        key: String(Date.now()),
        name: values.name || "",
        locationId: values.locationId || "",
        landmark: values.landmark || "",
        city: values.city || "",
        zipCode: values.zipCode || "",
        state: values.state || "",
        country: values.country || "",
        priceGroup: values.priceGroup || "",
        invoiceScheme: values.invoiceScheme || "",
        invoiceLayoutPos: values.invoiceLayoutPos || "",
        invoiceLayoutSale: values.invoiceLayoutSale || "",
        active: true,
      };
      setLocations((prev) => [...prev, newRecord]);
      message.success("Business location added successfully");
      setAddModalOpen(false);
      form.resetFields();
    });
  };

  const openEditModal = (record: BusinessLocationRecord) => {
    setEditingRecord(record);
    form.setFieldsValue({
      name: record.name,
      locationId: record.locationId,
      landmark: record.landmark,
      city: record.city,
      zipCode: record.zipCode,
      state: record.state,
      country: record.country,
      priceGroup: record.priceGroup,
      invoiceScheme: record.invoiceScheme,
      invoiceLayoutPos: record.invoiceLayoutPos,
      invoiceLayoutSale: record.invoiceLayoutSale,
    });
    setEditModalOpen(true);
  };

  const handleEditSubmit = () => {
    if (!editingRecord) return;
    form.validateFields().then((values) => {
      setLocations((prev) =>
        prev.map((loc) =>
          loc.key === editingRecord.key
            ? {
                ...loc,
                name: values.name || "",
                locationId: values.locationId || "",
                landmark: values.landmark || "",
                city: values.city || "",
                zipCode: values.zipCode || "",
                state: values.state || "",
                country: values.country || "",
                priceGroup: values.priceGroup || "",
                invoiceScheme: values.invoiceScheme || "",
                invoiceLayoutPos: values.invoiceLayoutPos || "",
                invoiceLayoutSale: values.invoiceLayoutSale || "",
              }
            : loc
        )
      );
      message.success("Business location updated successfully");
      setEditModalOpen(false);
      setEditingRecord(null);
      form.resetFields();
    });
  };

  const handleSettings = (record: BusinessLocationRecord) => {
    message.info(`Settings: ${record.name}`);
  };

  const handleDeactivate = (record: BusinessLocationRecord) => {
    setLocations((prev) =>
      prev.map((loc) => (loc.key === record.key ? { ...loc, active: false } : loc))
    );
    message.success("Location deactivated");
  };

  const columns: ColumnsType<BusinessLocationRecord> = [
    { title: "Name", dataIndex: "name", key: "name", sorter: (a, b) => a.name.localeCompare(b.name), width: 180 },
    { title: "Location ID", dataIndex: "locationId", key: "locationId", sorter: (a, b) => a.locationId.localeCompare(b.locationId), width: 100 },
    { title: "Landmark", dataIndex: "landmark", key: "landmark", sorter: (a, b) => a.landmark.localeCompare(b.landmark), width: 140 },
    { title: "City", dataIndex: "city", key: "city", sorter: (a, b) => a.city.localeCompare(b.city), width: 100 },
    { title: "Zip Code", dataIndex: "zipCode", key: "zipCode", sorter: (a, b) => a.zipCode.localeCompare(b.zipCode), width: 100 },
    { title: "State", dataIndex: "state", key: "state", sorter: (a, b) => a.state.localeCompare(b.state), width: 120 },
    { title: "Country", dataIndex: "country", key: "country", sorter: (a, b) => a.country.localeCompare(b.country), width: 100 },
    { title: "Price Group", dataIndex: "priceGroup", key: "priceGroup", width: 110 },
    { title: "Invoice scheme", dataIndex: "invoiceScheme", key: "invoiceScheme", width: 160 },
    { title: "Invoice layout for POS", dataIndex: "invoiceLayoutPos", key: "invoiceLayoutPos", width: 160 },
    { title: "Invoice layout for sale", dataIndex: "invoiceLayoutSale", key: "invoiceLayoutSale", width: 160 },
    {
      title: "Action",
      key: "action",
      width: 260,
      fixed: "right",
      render: (_: unknown, record: BusinessLocationRecord) => (
        <Space size="small">
          <Button type="primary" size="small" icon={<EditOutlined />} onClick={() => openEditModal(record)}>
            Edit
          </Button>
          <Button type="primary" size="small" style={{ background: "#52c41a", borderColor: "#52c41a" }} icon={<SettingOutlined />} onClick={() => handleSettings(record)}>
            Settings
          </Button>
          {record.active && (
            <Popconfirm
              title="Deactivate location"
              description="Are you sure you want to deactivate this location?"
              onConfirm={() => handleDeactivate(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" size="small" danger icon={<PoweroffOutlined />}>
                Deactivate Location
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  const start = (currentPage - 1) * pageSize;
  const end = Math.min(start + pageSize, filteredLocations.length);
  const total = filteredLocations.length;
  const paginationText = total > 0 ? `Showing ${start + 1} to ${end} of ${total} entries` : "Showing 0 to 0 of 0 entries";

  return (
    <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
      <Title level={2} style={{ marginBottom: 4, color: isDark ? "#fff" : "#1f1f1f", fontWeight: 600 }}>
        Business Locations
      </Title>
      <Text type="secondary" style={{ display: "block", marginBottom: 16, fontSize: 14 }}>
        Manage your business locations
      </Text>
      <div style={{ borderBottom: "3px solid #1890ff", marginBottom: 24, width: "100%" }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
        <Title level={5} style={{ margin: 0, color: isDark ? "#fff" : "#1f1f1f" }}>
          All your business locations
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
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} style={{ borderRadius: 6 }}>
            Add
          </Button>
        </Space>
      </div>

      <Table<BusinessLocationRecord>
        columns={columns}
        dataSource={filteredLocations}
        pagination={{
          current: currentPage,
          pageSize,
          total: filteredLocations.length,
          showSizeChanger: true,
          pageSizeOptions: ["10", "25", "50", "100"],
          showTotal: () => paginationText,
          onChange: (page, size) => {
            setCurrentPage(page);
            if (size) setPageSize(size);
          },
        }}
        scroll={{ x: 1600 }}
        size="small"
        style={{
          background: isDark ? "transparent" : "#fff",
          borderRadius: 8,
          border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
        }}
      />

      <Modal
        title="Add Business Location"
        open={addModalOpen}
        onCancel={() => setAddModalOpen(false)}
        onOk={handleAddModalSubmit}
        okText="Add"
        destroyOnClose
        width={640}
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please enter name" }]}>
                <Input placeholder="Location name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="locationId" label="Location ID" rules={[{ required: true, message: "Please enter Location ID" }]}>
                <Input placeholder="e.g. LOC1" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="landmark" label="Landmark">
                <Input placeholder="Landmark" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="city" label="City">
                <Input placeholder="City" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="zipCode" label="Zip Code">
                <Input placeholder="Zip code" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="state" label="State">
                <Input placeholder="State" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="country" label="Country">
                <Input placeholder="Country" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="priceGroup" label="Price Group">
                <Input placeholder="Price group" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="invoiceScheme" label="Invoice scheme">
                <Input placeholder="Invoice scheme" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="invoiceLayoutPos" label="Invoice layout for POS">
                <Input placeholder="Invoice layout for POS" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="invoiceLayoutSale" label="Invoice layout for sale">
                <Input placeholder="Invoice layout for sale" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      <Modal
        title="Edit Business Location"
        open={editModalOpen}
        onCancel={() => { setEditModalOpen(false); setEditingRecord(null); form.resetFields(); }}
        onOk={handleEditSubmit}
        okText="Save"
        destroyOnClose
        width={640}
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please enter name" }]}>
                <Input placeholder="Location name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="locationId" label="Location ID" rules={[{ required: true, message: "Please enter Location ID" }]}>
                <Input placeholder="e.g. LOC1" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="landmark" label="Landmark">
                <Input placeholder="Landmark" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="city" label="City">
                <Input placeholder="City" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="zipCode" label="Zip Code">
                <Input placeholder="Zip code" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="state" label="State">
                <Input placeholder="State" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="country" label="Country">
                <Input placeholder="Country" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="priceGroup" label="Price Group">
                <Input placeholder="Price group" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="invoiceScheme" label="Invoice scheme">
                <Input placeholder="Invoice scheme" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="invoiceLayoutPos" label="Invoice layout for POS">
                <Input placeholder="Invoice layout for POS" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="invoiceLayoutSale" label="Invoice layout for sale">
                <Input placeholder="Invoice layout for sale" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default BusinessLocations;
