import React, { useState } from "react";
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
} from "antd";
import {
  CloseOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import useTheme from "@/theme/useTheme";

const { Text } = Typography;
const { TextArea } = Input;

export interface AccountDetailRow {
  key: string;
  label: string;
  value: string;
}

export interface AccountFormData {
  name: string;
  accountNumber: string;
  accountType?: string;
  openingBalance: number;
  accountDetails: AccountDetailRow[];
  note?: string;
}

interface AddAccountModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (values: AccountFormData) => Promise<void> | void;
  loading?: boolean;
}

const AddAccountModal: React.FC<AddAccountModalProps> = ({
  open,
  onClose,
  onSave,
  loading = false,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [form] = Form.useForm();
  const [accountDetails, setAccountDetails] = useState<AccountDetailRow[]>([
    { key: "1", label: "", value: "" },
    { key: "2", label: "", value: "" },
    { key: "3", label: "", value: "" },
    { key: "4", label: "", value: "" },
    { key: "5", label: "", value: "" },
  ]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formData: AccountFormData = {
        ...values,
        accountDetails: accountDetails.filter((detail) => detail.label || detail.value),
      };
      await onSave(formData);
      form.resetFields();
      setAccountDetails([
        { key: "1", label: "", value: "" },
        { key: "2", label: "", value: "" },
        { key: "3", label: "", value: "" },
        { key: "4", label: "", value: "" },
        { key: "5", label: "", value: "" },
      ]);
      onClose();
    } catch (_error) {
      // Validation errors are handled by Ant Design
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setAccountDetails([
      { key: "1", label: "", value: "" },
      { key: "2", label: "", value: "" },
      { key: "3", label: "", value: "" },
      { key: "4", label: "", value: "" },
      { key: "5", label: "", value: "" },
    ]);
    onClose();
  };

  const handleDetailChange = (key: string, field: "label" | "value", value: string) => {
    setAccountDetails(
      accountDetails.map((detail) =>
        detail.key === key ? { ...detail, [field]: value } : detail
      )
    );
  };

  const handleAddDetailRow = () => {
    const newKey = Date.now().toString();
    setAccountDetails([...accountDetails, { key: newKey, label: "", value: "" }]);
  };

  const handleRemoveDetailRow = (key: string) => {
    setAccountDetails(accountDetails.filter((detail) => detail.key !== key));
  };

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      footer={null}
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
      width={800}
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
        initialValues={{
          openingBalance: 0,
        }}
      >
        {/* Name */}
        <Form.Item
          label={
            <Space>
              <Text>Name:</Text>
              <Text type="danger">*</Text>
            </Space>
          }
          name="name"
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

        {/* Account Number */}
        <Form.Item
          label={
            <Space>
              <Text>Account Number:</Text>
              <Text type="danger">*</Text>
            </Space>
          }
          name="accountNumber"
          rules={[{ required: true, message: "Please enter account number" }]}
        >
          <Input
            placeholder="Account Number"
            style={{
              height: "40px",
              borderRadius: "6px",
              background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
              border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
            }}
          />
        </Form.Item>

        {/* Account Type */}
        <Form.Item label="Account Type:" name="accountType">
          <Select
            placeholder="Please Select"
            style={{
              height: "40px",
              borderRadius: "6px",
            }}
          >
            <Select.Option value="Bank Account">Bank Account</Select.Option>
            <Select.Option value="Cash">Cash</Select.Option>
            <Select.Option value="Mobile Money">Mobile Money</Select.Option>
            <Select.Option value="Credit Card">Credit Card</Select.Option>
            <Select.Option value="Online Payment">Online Payment</Select.Option>
            <Select.Option value="Loan">Loan</Select.Option>
          </Select>
        </Form.Item>

        {/* Opening Balance */}
        <Form.Item label="Opening Balance:" name="openingBalance">
          <InputNumber
            placeholder="0"
            min={0}
            style={{
              width: "100%",
              height: "40px",
              borderRadius: "6px",
            }}
          />
        </Form.Item>

        {/* Account details */}
        <Form.Item label="Account details:">
          <div>
            <Row gutter={[16, 8]} style={{ marginBottom: "8px" }}>
              <Col xs={24} sm={12}>
                <Text
                  strong
                  style={{
                    fontSize: "14px",
                    color: isDark ? "#fff" : "#1f1f1f",
                  }}
                >
                  Label
                </Text>
              </Col>
              <Col xs={24} sm={12}>
                <Text
                  strong
                  style={{
                    fontSize: "14px",
                    color: isDark ? "#fff" : "#1f1f1f",
                  }}
                >
                  Value
                </Text>
              </Col>
            </Row>
            {accountDetails.map((detail) => (
              <Row gutter={[16, 8]} key={detail.key} style={{ marginBottom: "8px" }}>
                <Col xs={24} sm={11}>
                  <Input
                    value={detail.label}
                    onChange={(e) => handleDetailChange(detail.key, "label", e.target.value)}
                    placeholder="Label"
                    style={{
                      height: "40px",
                      borderRadius: "6px",
                      background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                      border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                    }}
                  />
                </Col>
                <Col xs={24} sm={11}>
                  <Input
                    value={detail.value}
                    onChange={(e) => handleDetailChange(detail.key, "value", e.target.value)}
                    placeholder="Value"
                    style={{
                      height: "40px",
                      borderRadius: "6px",
                      background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                      border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                    }}
                  />
                </Col>
                <Col xs={24} sm={2}>
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleRemoveDetailRow(detail.key)}
                    style={{
                      height: "40px",
                      width: "100%",
                    }}
                  />
                </Col>
              </Row>
            ))}
            <Button
              type="dashed"
              icon={<PlusOutlined />}
              onClick={handleAddDetailRow}
              style={{
                width: "100%",
                height: "40px",
                borderRadius: "6px",
                marginTop: "8px",
              }}
            >
              Add Row
            </Button>
          </div>
        </Form.Item>

        {/* Note */}
        <Form.Item label="Note:" name="note">
          <TextArea
            placeholder="Note"
            rows={4}
            style={{
              background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
              border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
              borderRadius: "6px",
            }}
          />
        </Form.Item>
      </Form>

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
    </Modal>
  );
};

export default AddAccountModal;

