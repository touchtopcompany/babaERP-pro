import React, { useState, useMemo } from "react";
import {
  Card,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Space,
  Typography,
  Row,
  Col,
  InputNumber,
  message,
  Tooltip,
  Upload,
  Checkbox,
} from "antd";
import {
  InfoCircleOutlined,
  UploadOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import type { UploadFile } from "antd";
import useTheme from "@/theme/useTheme";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { TextArea } = Input;

const AddExpense: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isRecurring, setIsRecurring] = useState(false);
  const [isRefund, setIsRefund] = useState(false);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);

  // Calculate payment due
  const paymentDue = useMemo(() => {
    return Math.max(0, totalAmount - paymentAmount);
  }, [totalAmount, paymentAmount]);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      // TODO: Implement API call to save expense
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.success("Expense created successfully");
      form.resetFields();
      setFileList([]);
      setIsRecurring(false);
      setIsRefund(false);
      setTotalAmount(0);
      setPaymentAmount(0);
    } catch (error) {
      console.error("Validation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    fileList,
    onChange: ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
      setFileList(newFileList);
    },
    beforeUpload: () => false,
    maxCount: 1,
    accept: ".pdf,.csv,.zip,.doc,.docx,.jpeg,.jpg,.png",
  };

  return (
    <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          date: dayjs("2025-12-28 13:23", "YYYY-MM-DD HH:mm"),
          paidOn: dayjs("2025-12-28 13:23", "YYYY-MM-DD HH:mm"),
          paymentMethod: "cash",
          expenseFor: "None",
          applicableTax: "None",
          paymentAccount: "None",
        }}
      >
        {/* Header */}
        <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
          <Col xs={24}>
            <Title
              level={2}
              style={{
                margin: 0,
                color: isDark ? "#fff" : "#1f1f1f",
                fontWeight: 600,
              }}
            >
              Add Expense
            </Title>
          </Col>
        </Row>

        {/* Expense Details Section */}
        <Card
          style={{
            marginBottom: "24px",
            background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
            borderRadius: "8px",
            overflow: "hidden",
            maxWidth: "100%",
          }}
          bodyStyle={{ padding: "24px", overflow: "hidden" }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label={
                  <Space>
                    <Text>Business Location:</Text>
                    <Text type="danger">*</Text>
                  </Space>
                }
                name="businessLocation"
                rules={[{ required: true, message: "Please select business location" }]}
              >
                <Select
                  placeholder="Please Select"
                  style={{
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                  }}
                >
                  <Select.Option value="C2Z Digital Solutions (C2Z1)">
                    C2Z Digital Solutions (C2Z1)
                  </Select.Option>
                  <Select.Option value="Location 2">Location 2</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item label="Reference No:" name="referenceNo">
                <Input
                  placeholder="Reference No"
                  style={{
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                  }}
                />
                <Text
                  type="secondary"
                  style={{
                    fontSize: "12px",
                    color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                    display: "block",
                    marginTop: "4px",
                  }}
                >
                  Leave empty to autogenerate
                </Text>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label={
                  <Space>
                    <Text>Date:</Text>
                    <Text type="danger">*</Text>
                  </Space>
                }
                name="date"
                rules={[{ required: true, message: "Please select date" }]}
              >
                <DatePicker
                  showTime
                  format="MM/DD/YYYY HH:mm"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item label="Attach Document:" name="attachDocument">
                <Upload {...uploadProps}>
                  <Button icon={<UploadOutlined />}>Browse..</Button>
                </Upload>
                <Text
                  type="secondary"
                  style={{
                    fontSize: "12px",
                    color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                    display: "block",
                    marginTop: "4px",
                  }}
                >
                  Max File size: 5MB
                </Text>
                <Text
                  type="secondary"
                  style={{
                    fontSize: "12px",
                    color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                    display: "block",
                  }}
                >
                  Allowed File: .pdf, .csv, .zip, .doc, .docx, .jpeg, .jpg, .png
                </Text>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item label="Expense Category:" name="expenseCategory">
                <Select
                  placeholder="Please Select"
                  style={{
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                  }}
                >
                  <Select.Option value="office_supplies">Office Supplies</Select.Option>
                  <Select.Option value="utilities">Utilities</Select.Option>
                  <Select.Option value="travel">Travel</Select.Option>
                  <Select.Option value="marketing">Marketing</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item label="Sub category:" name="subCategory">
                <Select
                  placeholder="Please Select"
                  style={{
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                  }}
                >
                  <Select.Option value="stationery">Stationery</Select.Option>
                  <Select.Option value="equipment">Equipment</Select.Option>
                  <Select.Option value="cleaning">Cleaning</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label={
                  <Space>
                    <Text>Expense for:</Text>
                    <Tooltip title="Expense for">
                      <InfoCircleOutlined
                        style={{
                          color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                          fontSize: "12px",
                        }}
                      />
                    </Tooltip>
                  </Space>
                }
                name="expenseFor"
              >
                <Input
                  placeholder="None"
                  style={{
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label={
                  <Space>
                    <Text>Applicable Tax:</Text>
                    <Tooltip title="Applicable Tax">
                      <InfoCircleOutlined
                        style={{
                          color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                          fontSize: "12px",
                        }}
                      />
                    </Tooltip>
                  </Space>
                }
                name="applicableTax"
              >
                <Input
                  placeholder="None"
                  style={{
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item label="Expense for contact:" name="expenseForContact">
                <Select
                  placeholder="Please Select"
                  style={{
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                  }}
                >
                  <Select.Option value="supplier_a">Supplier A</Select.Option>
                  <Select.Option value="supplier_b">Supplier B</Select.Option>
                  <Select.Option value="utility_company">Utility Company</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label={
                  <Space>
                    <Text>Total amount:</Text>
                    <Text type="danger">*</Text>
                  </Space>
                }
                name="totalAmount"
                rules={[{ required: true, message: "Please enter total amount" }]}
              >
                <InputNumber
                  value={totalAmount}
                  onChange={(val) => setTotalAmount(val || 0)}
                  placeholder="Total amount"
                  min={0}
                  precision={2}
                  style={{ width: "100%" }}
                  prefix="TSh"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label={
                  <Space>
                    <Text>Is refund?:</Text>
                    <Tooltip title="Is refund">
                      <InfoCircleOutlined
                        style={{
                          color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                          fontSize: "12px",
                        }}
                      />
                    </Tooltip>
                  </Space>
                }
                name="isRefund"
                valuePropName="checked"
              >
                <Checkbox
                  checked={isRefund}
                  onChange={(e) => setIsRefund(e.target.checked)}
                  style={{
                    color: isDark ? "rgba(255,255,255,0.85)" : "#1f1f1f",
                  }}
                >
                  Is refund?
                </Checkbox>
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item label="Expense note:" name="expenseNote">
                <TextArea
                  rows={4}
                  placeholder="Expense note"
                  style={{
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* Recurring Expense Options Section */}
        <Card
          style={{
            marginBottom: "24px",
            background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
            borderRadius: "8px",
            overflow: "hidden",
            maxWidth: "100%",
          }}
          bodyStyle={{ padding: "24px", overflow: "hidden" }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label={
                  <Space>
                    <Text>Is Recurring?:</Text>
                    <Tooltip title="Is Recurring">
                      <InfoCircleOutlined
                        style={{
                          color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                          fontSize: "12px",
                        }}
                      />
                    </Tooltip>
                  </Space>
                }
                name="isRecurring"
                valuePropName="checked"
              >
                <Checkbox
                  checked={isRecurring}
                  onChange={(e) => setIsRecurring(e.target.checked)}
                  style={{
                    color: isDark ? "rgba(255,255,255,0.85)" : "#1f1f1f",
                  }}
                >
                  Is Recurring?
                </Checkbox>
              </Form.Item>
            </Col>
            {isRecurring && (
              <>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item label="Recurring interval:" name="recurringInterval">
                    <Input.Group compact>
                      <InputNumber
                        min={1}
                        style={{ width: "70%" }}
                        placeholder="Interval"
                      />
                      <Select
                        defaultValue="days"
                        style={{ width: "30%" }}
                      >
                        <Select.Option value="days">Days</Select.Option>
                        <Select.Option value="weeks">Weeks</Select.Option>
                        <Select.Option value="months">Months</Select.Option>
                        <Select.Option value="years">Years</Select.Option>
                      </Select>
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item label="No. of Repetitions:" name="noOfRepetitions">
                    <InputNumber
                      min={1}
                      placeholder="No. of Repetitions"
                      style={{ width: "100%" }}
                    />
                    <Text
                      type="secondary"
                      style={{
                        fontSize: "12px",
                        color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                        display: "block",
                        marginTop: "4px",
                      }}
                    >
                      If blank expense will be generated infinite times
                    </Text>
                  </Form.Item>
                </Col>
              </>
            )}
          </Row>
        </Card>

        {/* Payment Details Section */}
        <Card
          style={{
            marginBottom: "24px",
            background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
            borderRadius: "8px",
            overflow: "hidden",
            maxWidth: "100%",
          }}
          bodyStyle={{ padding: "24px", overflow: "hidden" }}
        >
          <Title
            level={4}
            style={{
              marginBottom: "16px",
              color: isDark ? "#fff" : "#1f1f1f",
              fontWeight: 600,
            }}
          >
            Add payment
          </Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label={
                  <Space>
                    <Text>Amount:</Text>
                    <Text type="danger">*</Text>
                  </Space>
                }
                name="paymentAmount"
                rules={[{ required: true, message: "Please enter payment amount" }]}
              >
                <InputNumber
                  value={paymentAmount}
                  onChange={(val) => setPaymentAmount(val || 0)}
                  min={0}
                  precision={2}
                  style={{ width: "100%" }}
                  prefix={<DollarOutlined />}
                  placeholder="0.00"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item label="Payment Account:" name="paymentAccount">
                <Input.Group compact>
                  <Input
                    value="None"
                    readOnly
                    style={{
                      width: "70%",
                      background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                      border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                    }}
                  />
                  <Select
                    defaultValue="None"
                    style={{ width: "30%" }}
                  >
                    <Select.Option value="None">None</Select.Option>
                    <Select.Option value="account1">Account 1</Select.Option>
                    <Select.Option value="account2">Account 2</Select.Option>
                  </Select>
                </Input.Group>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label={
                  <Space>
                    <Text>Paid on:</Text>
                    <Text type="danger">*</Text>
                  </Space>
                }
                name="paidOn"
                rules={[{ required: true, message: "Please select paid on date" }]}
              >
                <DatePicker
                  showTime
                  format="MM/DD/YYYY HH:mm"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label={
                  <Space>
                    <Text>Payment Method:</Text>
                    <Text type="danger">*</Text>
                  </Space>
                }
                name="paymentMethod"
                rules={[{ required: true, message: "Please select payment method" }]}
              >
                <Input.Group compact>
                  <Input
                    value="Cash"
                    readOnly
                    style={{
                      width: "70%",
                      background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                      border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                    }}
                  />
                  <Select
                    defaultValue="cash"
                    style={{ width: "30%" }}
                  >
                    <Select.Option value="cash">Cash</Select.Option>
                    <Select.Option value="bank_transfer">Bank Transfer</Select.Option>
                    <Select.Option value="credit_card">Credit Card</Select.Option>
                    <Select.Option value="cheque">Cheque</Select.Option>
                  </Select>
                </Input.Group>
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item label="Payment note:" name="paymentNote">
                <TextArea
                  rows={4}
                  placeholder="Payment note"
                  style={{
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} style={{ textAlign: "right" }}>
              <Text
                strong
                style={{
                  fontSize: "16px",
                  color: isDark ? "#fff" : "#1f1f1f",
                }}
              >
                Payment due: {paymentDue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Text>
            </Col>
          </Row>
        </Card>

        {/* Save Button */}
        <Row justify="end" gutter={[16, 16]} style={{ marginBottom: "24px" }}>
          <Col>
            <Space>
              <Button onClick={() => form.resetFields()}>Cancel</Button>
              <Button
                type="primary"
                loading={loading}
                onClick={handleSave}
              >
                Save
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AddExpense;

