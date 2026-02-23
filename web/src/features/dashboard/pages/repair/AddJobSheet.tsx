import React, { useState } from "react";
import {
    Card,
    Form,
    Input,
    Select,
    Radio,
    Button,
    Row,
    Col,
    Typography,
    Upload,
    Checkbox,
    DatePicker,
    Space,
    Divider,
    message,
} from "antd";
import {
    PlusOutlined,
    UploadOutlined,
    CalendarOutlined,
    InfoCircleOutlined,
} from "@ant-design/icons";
import useTheme from "@/theme/useTheme";

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const AddJobSheet: React.FC = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSave = async (values: any) => {
        setLoading(true);
        try {
            // TODO: Implement API call to save job sheet
            console.log("Saving job sheet:", values);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            message.success("Job sheet saved successfully");
            form.resetFields();
        } catch (error) {
            message.error("Failed to save job sheet");
        } finally {
            setLoading(false);
        }
    };

    const handleSaveAndAddParts = async (values: any) => {
        setLoading(true);
        try {
            // TODO: Implement API call to save job sheet and navigate to parts
            console.log("Saving job sheet and adding parts:", values);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            message.success("Job sheet saved successfully");
            // TODO: Navigate to parts page
        } catch (error) {
            message.error("Failed to save job sheet");
        } finally {
            setLoading(false);
        }
    };

    const handleSaveAndUploadDocs = async (values: any) => {
        setLoading(true);
        try {
            // TODO: Implement API call to save job sheet and navigate to documents
            console.log("Saving job sheet and uploading docs:", values);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            message.success("Job sheet saved successfully");
            // TODO: Navigate to documents page
        } catch (error) {
            message.error("Failed to save job sheet");
        } finally {
            setLoading(false);
        }
    };

    const uploadProps = {
        name: "file",
        multiple: false,
        beforeUpload: (file: File) => {
            const isValidSize = file.size / 1024 / 1024 < 5;
            if (!isValidSize) {
                message.error("File must be smaller than 5MB!");
            }
            return isValidSize;
        },
    };

    return (
        <div style={{ width: "100%", maxWidth: "100%" }}>
            <Card
                style={{
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
                    borderRadius: "8px",
                }}
                bodyStyle={{ padding: "24px" }}
            >
                <Title level={3} style={{ margin: "0 0 24px 0", color: isDark ? "#fff" : "#1f1f1f" }}>
                    Job sheet Create
                </Title>

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSave}
                    style={{ width: "100%" }}
                >
                    <Row gutter={[24, 16]}>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item
                                name="businessLocation"
                                label="Business Location"
                                rules={[{ required: true, message: "Please select business location" }]}
                            >
                                <Select placeholder="Please Select">
                                    <Option value="main-store">Main Store</Option>
                                    <Option value="branch-office">Branch Office</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item
                                name="customer"
                                label="Customer"
                                rules={[{ required: true, message: "Please select customer" }]}
                            >
                                <Select placeholder="Walk-in Customer" showSearch>
                                    <Option value="walk-in">Walk-in Customer</Option>
                                    <Option value="john-doe">John Doe</Option>
                                    <Option value="jane-smith">Jane Smith</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item
                                name="serviceType"
                                label="Service type"
                                rules={[{ required: true, message: "Please select service type" }]}
                            >
                                <Radio.Group>
                                    <Radio value="carry-in">Carry in</Radio>
                                    <Radio value="pick-up">Pick up</Radio>
                                    <Radio value="on-site">On site</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[24, 16]}>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item name="brand" label="Brand">
                                <Select
                                    placeholder="Please Select"
                                    suffixIcon={
                                        <Button
                                            type="link"
                                            size="small"
                                            icon={<PlusOutlined />}
                                            style={{ padding: 0 }}
                                        />
                                    }
                                >
                                    <Option value="apple">Apple</Option>
                                    <Option value="samsung">Samsung</Option>
                                    <Option value="dell">Dell</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item name="device" label="Device">
                                <Select
                                    placeholder="Please Select"
                                    suffixIcon={
                                        <Button
                                            type="link"
                                            size="small"
                                            icon={<PlusOutlined />}
                                            style={{ padding: 0 }}
                                        />
                                    }
                                >
                                    <Option value="laptop">Laptop</Option>
                                    <Option value="phone">Phone</Option>
                                    <Option value="tablet">Tablet</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item name="deviceModel" label="Device Model">
                                <Select
                                    placeholder="Please Select"
                                    suffixIcon={
                                        <Button
                                            type="link"
                                            size="small"
                                            icon={<PlusOutlined />}
                                            style={{ padding: 0 }}
                                        />
                                    }
                                >
                                    <Option value="iphone-14">iPhone 14</Option>
                                    <Option value="galaxy-s23">Galaxy S23</Option>
                                    <Option value="xps-15">XPS 15</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <div style={{ marginBottom: "16px" }}>
                        <Text style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c" }}>
                            Pre Repair Checklist: N/A = Not Applicable
                        </Text>
                        <InfoCircleOutlined style={{ marginLeft: "8px", color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c" }} />
                    </div>

                    <Row gutter={[24, 16]}>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item
                                name="serialNumber"
                                label="Serial Number"
                                rules={[{ required: true, message: "Please enter serial number" }]}
                            >
                                <Input placeholder="Serial Number" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item name="password" label="Password/Pattern Lock">
                                <Input.Password placeholder="Password" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item name="patternLock" label=" ">
                                <Button>Pattern Lock</Button>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[24, 16]}>
                        <Col xs={24} sm={12}>
                            <Form.Item name="productConfiguration" label="Product Configuration">
                                <Input placeholder="Product Configuration" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item name="problemReported" label="Problem Reported By The Customer">
                                <Input placeholder="Problem Reported By The Customer" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[24, 16]}>
                        <Col xs={24}>
                            <Form.Item name="condition" label="Condition Of The Product">
                                <TextArea rows={3} placeholder="Condition Of The Product" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[24, 16]}>
                        <Col xs={24} sm={12}>
                            <Form.Item name="technician" label="Assign Operator/Technician">
                                <Select placeholder="Select service staff">
                                    <Option value="john-tech">John Tech</Option>
                                    <Option value="jane-tech">Jane Tech</Option>
                                    <Option value="mike-tech">Mike Tech</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item name="technicianComment" label="Comment by technician">
                                <TextArea rows={3} placeholder="Comment by technician" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[24, 16]}>
                        <Col xs={24} sm={8}>
                            <Form.Item name="estimatedCost" label="Estimated Cost">
                                <Input type="number" placeholder="Estimated Cost" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={8}>
                            <Form.Item
                                name="status"
                                label="Status"
                                rules={[{ required: true, message: "Please select status" }]}
                            >
                                <Radio.Group>
                                    <Radio value="pending">Pending</Radio>
                                    <Radio value="in-progress">In Progress</Radio>
                                    <Radio value="completed">Completed</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={8}>
                            <Form.Item name="dueDate" label="Due Date">
                                <DatePicker
                                    style={{ width: "100%" }}
                                    placeholder="Select due date"
                                    suffixIcon={<CalendarOutlined />}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Divider />

                    <Row gutter={[24, 16]}>
                        <Col xs={24}>
                            <Form.Item label="Document">
                                <div style={{ marginBottom: "8px" }}>
                                    <Text style={{ fontSize: "12px", color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c" }}>
                                        Max File size: 5MB
                                    </Text>
                                    <br />
                                    <Text style={{ fontSize: "12px", color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c" }}>
                                        Allowed File: pdf, csv, zip, doc, docx, jpg, jpeg, png
                                    </Text>
                                </div>
                                <Upload {...uploadProps}>
                                    <Button icon={<UploadOutlined />}>Browse</Button>
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[24, 16]}>
                        <Col xs={24}>
                            <Form.Item name="notifications" label="Send notification">
                                <Checkbox.Group>
                                    <Checkbox value="sms">Sms</Checkbox>
                                    <Checkbox value="email">Email</Checkbox>
                                </Checkbox.Group>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Divider />

                    <Row gutter={[24, 16]}>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item name="customField1" label="Custom Field 1">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item name="customField2" label="Custom Field 2">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item name="customField3" label="Custom Field 3">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item name="customField4" label="Custom Field 4">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Form.Item name="customField5" label="Custom Field 5">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
                        <Col>
                            <Button
                                type="primary"
                                htmlType="submit"
                                onClick={() => form.submit()}
                                loading={loading}
                                style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
                            >
                                Save and add parts
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                type="primary"
                                htmlType="submit"
                                onClick={() => form.submit()}
                                loading={loading}
                            >
                                Save
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                htmlType="submit"
                                onClick={() => form.submit()}
                                loading={loading}
                                style={{ backgroundColor: "#1890ff", borderColor: "#1890ff" }}
                            >
                                Save and upload docs
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </div>
    );
};

export default AddJobSheet;