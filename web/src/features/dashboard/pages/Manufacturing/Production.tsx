import React, { useState } from "react";
import {
    Card,
    Button,
    Table,
    Select,
    DatePicker,
    Switch,
    Space,
    Typography,
    Row,
    Col,
    Input,
    Dropdown,
    message,
    Modal,
    Form,
    InputNumber,
    Upload,
} from "antd";
import {
    PlusOutlined,
    ExportOutlined,
    PrinterOutlined,
    FileExcelOutlined,
    FilePdfOutlined,
    EyeOutlined,
    SearchOutlined,
    FilterOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Search } = Input;
const { Option } = Select;

interface ProductionRecord {
    key: string;
    date: string;
    referenceNo: string;
    location: string;
    product: string;
    quantity: number;
    totalCost: number;
}

const Production: React.FC = () => {
    const [businessLocation, setBusinessLocation] = useState<string>("all");
    const [dateRange, setDateRange] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null] | null>([
        dayjs("2026-01-01"),
        dayjs("2026-12-31"),
    ]);
    const [finalize, setFinalize] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>("");
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [form] = Form.useForm();

    // Mock data - replace with actual API call
    const mockData: ProductionRecord[] = [];

    // Filter data based on search text
    const filteredData = mockData.filter(item =>
        item.referenceNo.toLowerCase().includes(searchText.toLowerCase()) ||
        item.location.toLowerCase().includes(searchText.toLowerCase()) ||
        item.product.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns: ColumnsType<ProductionRecord> = [
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        },
        {
            title: "Reference No",
            dataIndex: "referenceNo",
            key: "referenceNo",
        },
        {
            title: "Location",
            dataIndex: "location",
            key: "location",
        },
        {
            title: "Product",
            dataIndex: "product",
            key: "product",
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
            sorter: (a, b) => a.quantity - b.quantity,
        },
        {
            title: "Total Cost",
            dataIndex: "totalCost",
            key: "totalCost",
            sorter: (a, b) => a.totalCost - b.totalCost,
            render: (value: number) => `$${value.toFixed(2)}`,
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="text"
                        icon={<EyeOutlined />}
                        onClick={() => handleView(record)}
                    />
                    <Dropdown
                        menu={{
                            items: [
                                {
                                    key: "edit",
                                    label: "Edit",
                                },
                                {
                                    key: "delete",
                                    label: "Delete",
                                    danger: true,
                                },
                            ],
                        }}
                    >
                        <Button type="text" />
                    </Dropdown>
                </Space>
            ),
        },
    ];

    const handleView = (record: ProductionRecord) => {
        message.info(`Viewing record: ${record.referenceNo}`);
    };

    const handleExport = (type: string) => {
        message.info(`Exporting as ${type}`);
    };

    const handlePrint = () => {
        message.info("Printing table");
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleOk = () => {
        form.validateFields().then((values) => {
            console.log('Form values:', values);
            message.success('Production record added successfully!');
            setIsModalVisible(false);
            form.resetFields();
        }).catch((error) => {
            console.error('Validation failed:', error);
        });
    };

    const exportMenuItems = [
        {
            key: "csv",
            label: "CSV",
            icon: <ExportOutlined />,
            onClick: () => handleExport("CSV"),
        },
        {
            key: "excel",
            label: "Excel",
            icon: <FileExcelOutlined />,
            onClick: () => handleExport("Excel"),
        },
        {
            key: "pdf",
            label: "PDF",
            icon: <FilePdfOutlined />,
            onClick: () => handleExport("PDF"),
        },
        {
            key: "print",
            label: "Print",
            icon: <PrinterOutlined />,
            onClick: handlePrint,
        },
    ];

    return (
        <div style={{ padding: "24px" }}>
            <Title level={2}>Production</Title>

            {/* Filters Section */}
            <Card style={{ marginBottom: "16px" }}>
                <Row gutter={[16, 16]} align="middle">
                    <Col xs={24} sm={8} md={6}>
                        <label style={{ display: "block", marginBottom: "8px" }}>
                            Business Location
                        </label>
                        <Select
                            value={businessLocation}
                            onChange={setBusinessLocation}
                            style={{ width: "100%" }}
                        >
                            <Option value="all">All</Option>
                            <Option value="location1">Location 1</Option>
                            <Option value="location2">Location 2</Option>
                            <Option value="location3">Location 3</Option>
                        </Select>
                    </Col>
                    <Col xs={24} sm={8} md={6}>
                        <label style={{ display: "block", marginBottom: "8px" }}>
                            Date Range
                        </label>
                        <RangePicker
                            value={dateRange}
                            onChange={setDateRange}
                            style={{ width: "100%" }}
                        />
                    </Col>
                    <Col xs={24} sm={8} md={6}>
                        <label style={{ display: "block", marginBottom: "8px" }}>
                            Finalize
                        </label>
                        <Switch
                            checked={finalize}
                            onChange={setFinalize}
                        />
                    </Col>
                </Row>
            </Card>

            {/* Table Section */}
            <Card>
                <div style={{ marginBottom: "16px" }}>
                    <Row justify="space-between" align="middle">
                        <Col>
                            <Space>
                                <Search
                                    placeholder="Search..."
                                    allowClear
                                    style={{ width: 250 }}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    prefix={<SearchOutlined />}
                                />
                                <Button icon={<FilterOutlined />}>
                                    Filters
                                </Button>
                            </Space>
                        </Col>
                        <Col>
                            <Space>
                                <Dropdown
                                    menu={{ items: exportMenuItems }}
                                    placement="bottomRight"
                                >
                                    <Button icon={<ExportOutlined />}>
                                        Export
                                    </Button>
                                </Dropdown>
                                <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
                                    Add
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                </div>

                <Table
                    columns={columns}
                    dataSource={filteredData}
                    pagination={{
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) =>
                            `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                        pageSizeOptions: ["25", "50", "100"],
                        defaultPageSize: 25,
                    }}
                    locale={{
                        emptyText: "No data available in table",
                    }}
                    scroll={{ x: "max-content" }}
                />
            </Card>

            {/* Add Production Modal */}
            <Modal
                title="Add New Production Record"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                width={800}
                okText="Submit"
                cancelText="Cancel"
            >
                <Form
                    form={form}
                    layout="vertical"
                    style={{ marginTop: '20px' }}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Reference No"
                                name="referenceNo"
                                rules={[{ required: true, message: 'Please enter reference number!' }]}
                            >
                                <Input placeholder="Enter reference number" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Business Location"
                                name="businessLocation"
                                rules={[{ required: true, message: 'Please select business location!' }]}
                            >
                                <Select placeholder="Select business location">
                                    <Option value="location1">Location 1</Option>
                                    <Option value="location2">Location 2</Option>
                                    <Option value="location3">Location 3</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Product"
                                name="product"
                                rules={[{ required: true, message: 'Please select product!' }]}
                            >
                                <Select placeholder="Select product">
                                    <Option value="product1">Product 1</Option>
                                    <Option value="product2">Product 2</Option>
                                    <Option value="product3">Product 3</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Quantity"
                                name="quantity"
                                rules={[{ required: true, message: 'Please enter quantity!' }]}
                            >
                                <InputNumber
                                    placeholder="Enter quantity"
                                    style={{ width: '100%' }}
                                    min={0}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Manufacturing Date"
                                name="manufacturingDate"
                                rules={[{ required: true, message: 'Please select manufacturing date!' }]}
                            >
                                <DatePicker style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Production Cost"
                                name="productionCost"
                                rules={[{ required: true, message: 'Please enter production cost!' }]}
                            >
                                <InputNumber
                                    placeholder="Enter production cost"
                                    style={{ width: '100%' }}
                                    min={0}
                                    prefix="$"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Wasted Quantity"
                                name="wastedQuantity"
                            >
                                <InputNumber
                                    placeholder="Enter wasted quantity"
                                    style={{ width: '100%' }}
                                    min={0}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Attach Document"
                                name="document"
                            >
                                <Upload
                                    beforeUpload={() => false}
                                    maxCount={1}
                                    accept=".pdf,.csv,.zip,.doc,.docx,.jpeg,.jpg,.png"
                                    style={{ width: '100%' }}
                                >
                                    <Button icon={<UploadOutlined />}>
                                        Browse...
                                    </Button>
                                </Upload>
                                <div style={{ marginTop: '8px' }}>
                                    <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
                                        Max File size: 5MB
                                    </Typography.Text>
                                    <br />
                                    <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
                                        Allowed File: .pdf, .csv, .zip, .doc, .docx, .jpeg, .jpg, .png
                                    </Typography.Text>
                                </div>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                label="Finalize"
                                name="finalize"
                                valuePropName="checked"
                            >
                                <Switch />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    );
};

export default Production;