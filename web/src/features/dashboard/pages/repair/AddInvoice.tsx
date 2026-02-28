import React, { useState } from "react";
import {
    Card,
    Form,
    Input,
    Select,
    Button,
    Row,
    Col,
    Typography,
    Table,
    InputNumber,
    DatePicker,
    Checkbox,
    Space,
    Divider,
    message,
} from "antd";
import {
    PlusOutlined,
    DeleteOutlined,
    SaveOutlined,
    PrinterOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

interface InvoiceItem {
    id: string;
    product: string;
    quantity: number;
    price: number;
    subtotal: number;
}

const AddInvoice: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<InvoiceItem[]>([]);
    const [discount, setDiscount] = useState<number>(0);
    const [shipping, setShipping] = useState<number>(0);
    const [loyaltyPoints, setLoyaltyPoints] = useState<number>(0);
    const [selectedLocation, setSelectedLocation] = useState<string>('davao');

    const addItem = () => {
        const newItem: InvoiceItem = {
            id: Date.now().toString(),
            product: "",
            quantity: 1,
            price: 0,
            subtotal: 0,
        };
        setItems([...items, newItem]);
    };

    const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
        setItems(items.map(item => {
            if (item.id === id) {
                const updated = { ...item, [field]: value };
                if (field === 'quantity' || field === 'price') {
                    updated.subtotal = updated.quantity * updated.price;
                }
                return updated;
            }
            return item;
        }));
    };

    const removeItem = (id: string) => {
        setItems(items.filter(item => item.id !== id));
    };

    const calculateSubtotal = () => {
        return items.reduce((sum, item) => sum + item.subtotal, 0);
    };

    const calculateTotal = () => {
        const subtotal = calculateSubtotal();
        return subtotal - discount + shipping - loyaltyPoints;
    };

    const handleSaveDraft = async () => {
        setLoading(true);
        try {
            const formValues = await form.validateFields();
            const invoiceData = {
                ...formValues,
                items,
                discount,
                shipping,
                loyaltyPoints,
                total: calculateTotal(),
                status: 'draft',
                createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            };

            console.log("Saving draft invoice:", invoiceData);
            // TODO: Implement API call to save draft
            await new Promise((resolve) => setTimeout(resolve, 1000));
            message.success("Invoice saved as draft successfully");
        } catch (error) {
            message.error("Failed to save draft");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const formValues = await form.validateFields();
            const invoiceData = {
                ...formValues,
                items,
                discount,
                shipping,
                loyaltyPoints,
                total: calculateTotal(),
                status: 'completed',
                createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            };

            console.log("Saving invoice:", invoiceData);
            // TODO: Implement API call to save invoice
            await new Promise((resolve) => setTimeout(resolve, 1000));
            message.success("Invoice saved successfully");
            form.resetFields();
            setItems([]);
            setDiscount(0);
            setShipping(0);
            setLoyaltyPoints(0);
        } catch (error) {
            message.error("Failed to save invoice");
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: 'Product',
            dataIndex: 'product',
            key: 'product',
            render: (text: string, record: InvoiceItem) => (
                <Input
                    value={text}
                    placeholder="Enter product name / SKU / Scan bar code"
                    onChange={(e) => updateItem(record.id, 'product', e.target.value)}
                    style={{ width: '100%' }}
                />
            ),
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            width: 100,
            render: (value: number, record: InvoiceItem) => (
                <InputNumber
                    min={1}
                    value={value}
                    onChange={(val) => updateItem(record.id, 'quantity', val || 1)}
                    style={{ width: '100%' }}
                />
            ),
        },
        {
            title: 'Price inc. tax',
            dataIndex: 'price',
            key: 'price',
            width: 120,
            render: (value: number, record: InvoiceItem) => (
                <InputNumber
                    min={0}
                    step={0.01}
                    value={value}
                    onChange={(val) => updateItem(record.id, 'price', val || 0)}
                    style={{ width: '100%' }}
                />
            ),
        },
        {
            title: 'Subtotal',
            dataIndex: 'subtotal',
            key: 'subtotal',
            width: 120,
            render: (value: number) => (
                <Text strong>₹{value.toFixed(2)}</Text>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            width: 80,
            render: (_: any, record: InvoiceItem) => (
                <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => removeItem(record.id)}
                />
            ),
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <Card>
                <div style={{ marginBottom: '24px' }}>
                    <Row justify="space-between" align="middle">
                        <Col>
                            <Title level={4} style={{ margin: 0 }}>{selectedLocation.toUpperCase()} SERVICE CENTER (BL0006)</Title>
                        </Col>
                        <Col>
                            <Space>
                                <Text strong>Location:</Text>
                                <Select
                                    value={selectedLocation}
                                    onChange={(value) => setSelectedLocation(value)}
                                    style={{ width: 150 }}
                                    placeholder="Select location"
                                >
                                    <Option value="davao">Davao</Option>
                                    <Option value="cebu">Cebu</Option>
                                    <Option value="manila">Manila</Option>
                                    <Option value="quezon">Quezon</Option>
                                    <Option value="makati">Makati</Option>
                                </Select>
                            </Space>
                        </Col>
                    </Row>
                    <Text type="secondary">
                        {dayjs().format('DD-MM-YYYY HH:mm')}
                    </Text>
                </div>

                <Form form={form} layout="vertical">
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <Form.Item label="Customer Information">
                                <Input placeholder="Enter customer name" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item label="Selling price">
                                <Select placeholder="Select selling price">
                                    <Option value="sellingprice1">Default selling Price</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={8}>
                            <Form.Item label="Select Service Staff">
                                <Select placeholder="Select service staff">
                                    <Option value="staff1">Staff Member 1</Option>
                                    <Option value="staff2">Staff Member 2</Option>
                                    <Option value="staff3">Staff Member 3</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item label="Delivery Date">
                                <DatePicker style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item label="Repair Completed On">
                                <DatePicker style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={6}>
                            <Form.Item label="Status">
                                <Select placeholder="Select status">
                                    <Option value="pending">Pending</Option>
                                    <Option value="in-progress">In Progress</Option>
                                    <Option value="completed">Completed</Option>
                                    <Option value="delivered">Delivered</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={6}>
                            <Form.Item label="Brand">
                                <Input placeholder="Enter brand" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={6}>
                            <Form.Item label="Device">
                                <Input placeholder="Enter device" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={6}>
                            <Form.Item label="Device Model">
                                <Input placeholder="Enter device model" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={8}>
                            <Form.Item label="Location (From)">
                                <Select placeholder="Select location">
                                    <Option value="davao">Davao</Option>
                                    <Option value="cebu">Cebu</Option>
                                    <Option value="manila">Manila</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item label="Serial Number">
                                <Input placeholder="Enter serial number" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item label="Subscribe?">
                                <Checkbox>Subscribe to notifications</Checkbox>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item label="Problem Reported By The Customer:">
                        <TextArea rows={3} placeholder="Describe the problem reported by the customer" />
                    </Form.Item>

                    <Divider />

                    <div style={{ marginBottom: '16px' }}>
                        <Button
                            type="dashed"
                            icon={<PlusOutlined />}
                            onClick={addItem}
                            style={{ width: '100%' }}
                        >
                            Add Item
                        </Button>
                    </div>

                    <Table
                        columns={columns}
                        dataSource={items}
                        pagination={false}
                        rowKey="id"
                        size="small"
                    />

                    <div style={{ marginTop: '16px', textAlign: 'right' }}>
                        <Space direction="vertical" size="small" style={{ width: '300px' }}>
                            <Row justify="space-between">
                                <Col>Items:</Col>
                                <Col><Text strong>{items.length}</Text></Col>
                            </Row>
                            <Row justify="space-between">
                                <Col>Subtotal:</Col>
                                <Col><Text strong>₹{calculateSubtotal().toFixed(2)}</Text></Col>
                            </Row>
                            <Row justify="space-between">
                                <Col>Discount:</Col>
                                <Col>
                                    <InputNumber
                                        min={0}
                                        step={0.01}
                                        value={discount}
                                        onChange={(value) => setDiscount(value || 0)}
                                        style={{ width: '120px' }}
                                        placeholder="0.00"
                                    />
                                </Col>
                            </Row>
                            <Row justify="space-between">
                                <Col>LOYALTY REWARD POINTS (-):</Col>
                                <Col>
                                    <InputNumber
                                        min={0}
                                        step={1}
                                        value={loyaltyPoints}
                                        onChange={(value) => setLoyaltyPoints(value || 0)}
                                        style={{ width: '120px' }}
                                        placeholder="0"
                                    />
                                </Col>
                            </Row>
                            <Row justify="space-between">
                                <Col>Shipping(+):</Col>
                                <Col>
                                    <InputNumber
                                        min={0}
                                        step={0.01}
                                        value={shipping}
                                        onChange={(value) => setShipping(value || 0)}
                                        style={{ width: '120px' }}
                                        placeholder="0.00"
                                    />
                                </Col>
                            </Row>
                            <Row justify="space-between">
                                <Col>Round Off:</Col>
                                <Col><Text>0</Text></Col>
                            </Row>
                            <Divider style={{ margin: '8px 0' }} />
                            <Row justify="space-between">
                                <Col><Title level={5} style={{ margin: 0 }}>Total Payable</Title></Col>
                                <Col><Title level={5} style={{ margin: 0, color: '#1890ff' }}>₹{calculateTotal().toFixed(2)}</Title></Col>
                            </Row>
                        </Space>
                    </div>

                    <Divider />

                    <Row justify="space-between">
                        <Col>
                            <Space>
                                <Button
                                    type="default"
                                    icon={<SaveOutlined />}
                                    onClick={handleSaveDraft}
                                    loading={loading}
                                >
                                    Save as Draft
                                </Button>
                                <Button
                                    type="primary"
                                    icon={<SaveOutlined />}
                                    onClick={handleSave}
                                    loading={loading}
                                >
                                    Save Invoice
                                </Button>
                            </Space>
                        </Col>
                        <Col>
                            <Button
                                type="default"
                                icon={<PrinterOutlined />}
                                onClick={() => message.info('Print functionality coming soon')}
                            >
                                Print
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card>

            <div style={{ textAlign: 'center', marginTop: '24px', color: '#999' }}>
                <Text type="secondary">BabaERP - V5.21 | Copyright © 2026 All rights reserved.</Text>
            </div>
        </div>
    );
};

export default AddInvoice;