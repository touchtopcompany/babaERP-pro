import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Space,
  Typography,
  Row,
  Col,
  DatePicker,
  Alert,
} from "antd";
import {
  CloseOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import useTheme from "@/theme/useTheme";
import dayjs, { type Dayjs } from "dayjs";

const { Text } = Typography;
const { TextArea } = Input;

export interface ChartOfAccountFormData {
  accountType: string;
  accountSubType: string;
  detailType: string;
  name: string;
  glCode?: string;
  parentAccount?: string;
  balance?: number;
  asOf?: Dayjs;
  description?: string;
}

interface AddChartOfAccountModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (values: ChartOfAccountFormData) => Promise<void> | void;
  loading?: boolean;
  parentAccounts?: Array<{ label: string; value: string }>;
}

const AddChartOfAccountModal: React.FC<AddChartOfAccountModalProps> = ({
  open,
  onClose,
  onSave,
  loading = false,
  parentAccounts = [],
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [form] = Form.useForm();
  const [selectedAccountType, setSelectedAccountType] = useState<string>("");

  // Account type options
  const accountTypeOptions = [
    { label: "Asset", value: "Asset" },
    { label: "Liability", value: "Liability" },
    { label: "Expenses", value: "Expenses" },
    { label: "Income", value: "Income" },
    { label: "Equity", value: "Equity" },
  ];

  // Account sub type options based on account type
  const getAccountSubTypeOptions = () => {
    switch (selectedAccountType) {
      case "Asset":
        return [
          { label: "Accounts Receivable (A/R)", value: "Accounts Receivable (A/R)" },
          { label: "Current assets", value: "Current assets" },
          { label: "Fixed assets", value: "Fixed assets" },
          { label: "Non-current assets", value: "Non-current assets" },
        ];
      case "Liability":
        return [
          { label: "Accounts Payable (A/P)", value: "Accounts Payable (A/P)" },
          { label: "Credit Card", value: "Credit Card" },
          { label: "Current liabilities", value: "Current liabilities" },
          { label: "Non-current liabilities", value: "Non-current liabilities" },
        ];
      case "Expenses":
        return [
          { label: "Cost of sales", value: "Cost of sales" },
          { label: "Expenses", value: "Expenses" },
          { label: "Other Expense", value: "Other Expense" },
        ];
      case "Income":
        return [
          { label: "Income", value: "Income" },
          { label: "Other income", value: "Other income" },
        ];
      case "Equity":
        return [
          { label: "Owner's Equity", value: "Owner's Equity" },
        ];
      default:
        return [];
    }
  };

  // Detail type options based on account sub type
  const getDetailTypeOptions = () => {
    const subType = form.getFieldValue("accountSubType");
    if (!subType) return [];

    // Common detail types
    const commonDetailTypes = [
      { label: "Payroll Expenses", value: "Payroll Expenses" },
      { label: "Office/General Administrative Expenses", value: "Office/General Administrative Expenses" },
      { label: "Sales of Product Income", value: "Sales of Product Income" },
      { label: "Taxes Paid", value: "Taxes Paid" },
      { label: "Unrealised loss on securities, net of tax", value: "Unrealised loss on securities, net of tax" },
    ];

    // Return common types or empty based on sub type
    if (subType === "Expenses" || subType === "Cost of sales") {
      return commonDetailTypes.filter(
        (type) =>
          type.value === "Payroll Expenses" ||
          type.value === "Office/General Administrative Expenses" ||
          type.value === "Taxes Paid"
      );
    }
    if (subType === "Income" || subType === "Other income") {
      return commonDetailTypes.filter(
        (type) =>
          type.value === "Sales of Product Income" ||
          type.value === "Unrealised loss on securities, net of tax"
      );
    }

    return [];
  };

  useEffect(() => {
    if (!open) {
      form.resetFields();
      setSelectedAccountType("");
    }
  }, [open, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formData: ChartOfAccountFormData = {
        ...values,
      };
      await onSave(formData);
      form.resetFields();
      setSelectedAccountType("");
      onClose();
    } catch (_error) {
      // Validation errors are handled by Ant Design
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setSelectedAccountType("");
    onClose();
  };

  const handleAccountTypeChange = (value: string) => {
    setSelectedAccountType(value);
    form.setFieldsValue({ accountSubType: undefined, detailType: undefined });
  };

  const handleAccountSubTypeChange = () => {
    form.setFieldsValue({ detailType: undefined });
  };

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={800}
      closeIcon={
        <CloseOutlined
          style={{
            color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
            fontSize: "16px",
          }}
        />
      }
      title={
        <Text
          strong
          style={{
            fontSize: "18px",
            color: isDark ? "#fff" : "#1f1f1f",
          }}
        >
          Add Account
        </Text>
      }
      styles={{
        content: {
          background: isDark ? "#1f1f1f" : "#ffffff",
          padding: "0",
        },
        header: {
          background: isDark ? "#1f1f1f" : "#ffffff",
          borderBottom: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
          padding: "20px 24px",
          borderRadius: "8px 8px 0 0",
        },
        body: {
          padding: "24px",
          maxHeight: "70vh",
          overflowY: "auto",
        },
      }}
      style={{
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={12}>
            <Form.Item
              name="accountType"
              label={
                <Space>
                  <Text>Account Type:</Text>
                  <Text type="danger">*</Text>
                </Space>
              }
              rules={[{ required: true, message: "Please select account type" }]}
            >
              <Select
                placeholder="Please Select"
                onChange={handleAccountTypeChange}
                style={{
                  height: "40px",
                  borderRadius: "6px",
                }}
              >
                {accountTypeOptions.map((option) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              name="accountSubType"
              label={
                <Space>
                  <Text>Account Sub Type:</Text>
                  <Text type="danger">*</Text>
                </Space>
              }
              rules={[{ required: true, message: "Please select account sub type" }]}
            >
              <Select
                placeholder="Please Select"
                onChange={handleAccountSubTypeChange}
                disabled={!selectedAccountType}
                style={{
                  height: "40px",
                  borderRadius: "6px",
                }}
              >
                {getAccountSubTypeOptions().map((option) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              name="detailType"
              label={
                <Space>
                  <Text>Detail Type:</Text>
                  <Text type="danger">*</Text>
                </Space>
              }
              rules={[{ required: true, message: "Please select detail type" }]}
            >
              <Select
                placeholder="Please Select"
                disabled={!form.getFieldValue("accountSubType")}
                style={{
                  height: "40px",
                  borderRadius: "6px",
                }}
              >
                {getDetailTypeOptions().map((option) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              name="name"
              label={
                <Space>
                  <Text>Name:</Text>
                  <Text type="danger">*</Text>
                </Space>
              }
              rules={[{ required: true, message: "Please enter account name" }]}
            >
              <Input
                placeholder="Name"
                style={{
                  height: "40px",
                  borderRadius: "6px",
                  background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                  border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                }}
              />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item
              name="glCode"
              label="General Ledger (GL) Code:"
            >
              <Input
                placeholder="General Ledger (GL) Code"
                maxLength={6}
                style={{
                  height: "40px",
                  borderRadius: "6px",
                  background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                  border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                }}
              />
              <Alert
                message={
                  <Text
                    style={{
                      fontSize: "12px",
                      color: isDark ? "rgba(255,255,255,0.65)" : "#595959",
                    }}
                  >
                    All General Ledger accounts have a 6-digit number. 1xxxxx = Assets, 2xxxxx = Liabilities, 3xxxxx = Net Assets, 4xxxxx = Revenue, 5xxxxx = Revenue, 8xxxxx = Allocations
                  </Text>
                }
                type="info"
                icon={<InfoCircleOutlined />}
                showIcon
                style={{
                  marginTop: "8px",
                  background: isDark ? "rgba(24,144,255,0.1)" : "#e6f7ff",
                  border: isDark ? "1px solid rgba(24,144,255,0.2)" : "1px solid #91d5ff",
                }}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              name="parentAccount"
              label="Parent Account:"
            >
              <Select
                placeholder="Please Select"
                allowClear
                style={{
                  height: "40px",
                  borderRadius: "6px",
                }}
              >
                {parentAccounts.map((account) => (
                  <Select.Option key={account.value} value={account.value}>
                    {account.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              name="balance"
              label="Balance:"
            >
              <InputNumber
                placeholder="Balance"
                style={{
                  width: "100%",
                  height: "40px",
                  borderRadius: "6px",
                }}
                formatter={(value) =>
                  value ? `TSh ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""
                }
                parser={(value) => value!.replace(/TSh\s?|(,*)/g, "")}
                min={0}
                precision={2}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              name="asOf"
              label="As of:"
            >
              <DatePicker
                placeholder="Select date"
                style={{
                  width: "100%",
                  height: "40px",
                  borderRadius: "6px",
                }}
                format="MM/DD/YYYY"
              />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item
              name="description"
              label="Description:"
            >
              <TextArea
                placeholder="Description"
                rows={6}
                style={{
                  borderRadius: "6px",
                  background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                  border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                }}
              />
              <Text
                style={{
                  fontSize: "12px",
                  color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                  marginTop: "4px",
                  display: "block",
                }}
              >
                0 words
              </Text>
            </Form.Item>
          </Col>
        </Row>

      {/* Action Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "12px",
          marginTop: "24px",
          paddingTop: "16px",
          borderTop: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
        }}
      >
        <Button
          onClick={handleCancel}
          style={{
            height: "40px",
            borderRadius: "6px",
            fontWeight: 500,
            minWidth: "100px",
          }}
        >
          Close
        </Button>
        <Button
          type="primary"
          onClick={handleSubmit}
          loading={loading}
          style={{
            height: "40px",
            borderRadius: "6px",
            fontWeight: 500,
            minWidth: "100px",
          }}
        >
          Save
        </Button>
      </div>
      </Form>
    </Modal>
  );
};

export default AddChartOfAccountModal;

