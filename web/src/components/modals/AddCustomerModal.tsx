import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  Space,
  Typography,
  Row,
  Col,
  Radio,
  Collapse,
  message,
} from "antd";
import {
  CloseOutlined,
  IdcardOutlined,
  MobileOutlined,
  UserOutlined,
  TeamOutlined,
  PhoneOutlined,
  MailOutlined,
  DownOutlined,
} from "@ant-design/icons";
import useTheme from "@/theme/useTheme";

const { Title, Text } = Typography;
const { Panel } = Collapse;

interface AddCustomerModalProps {
  open: boolean;
  onClose: () => void;
  onSave?: (customerData: any) => void;
}

const AddCustomerModal: React.FC<AddCustomerModalProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [contactType, setContactType] = useState<"individual" | "business">("individual");
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      // TODO: Implement API call to save customer
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.success("Customer created successfully");
      form.resetFields();
      setContactType("individual");
      setShowMoreInfo(false);
      onSave?.(values);
      onClose();
    } catch (_error) {
      message.error("Failed to create customer");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setContactType("individual");
    setShowMoreInfo(false);
    onClose();
  };

  const inputStyle = {
    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
    borderRadius: "6px",
    color: isDark ? "#fff" : "#1f1f1f",
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
            color: isDark ? "rgba(255,255,255,0.85)" : "#1f1f1f",
            fontSize: "18px",
          }}
        />
      }
      style={{
        top: 50,
      }}
      styles={{
        content: {
          background: isDark ? "#1f1f1f" : "#ffffff",
          borderRadius: "8px",
          padding: "24px",
        },
        header: {
          background: "transparent",
          borderBottom: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
          paddingBottom: "16px",
          marginBottom: "24px",
        },
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          contactType: "individual",
          customerGroup: "none",
        }}
      >
        {/* Header */}
        <Title
          level={4}
          style={{
            margin: 0,
            marginBottom: "24px",
            color: isDark ? "#fff" : "#1f1f1f",
            fontWeight: 600,
          }}
        >
          Add a new contact
        </Title>

        {/* Contact Type */}
        <Form.Item name="contactType" style={{ marginBottom: "24px" }}>
          <Radio.Group
            value={contactType}
            onChange={(e) => setContactType(e.target.value)}
            style={{ width: "100%" }}
          >
            <Radio value="individual">Individual</Radio>
            <Radio value="business">Business</Radio>
          </Radio.Group>
        </Form.Item>

        {/* Form Fields */}
        <Row gutter={[16, 16]}>
          {/* Left Column */}
          <Col xs={24} sm={12}>
            <Form.Item
              label="Contact ID"
              name="contactId"
              tooltip="Leave empty to autogenerate"
            >
              <Input
                placeholder="Contact ID"
                prefix={<IdcardOutlined style={{ color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c" }} />}
                style={inputStyle}
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

            <Form.Item
              label={
                <Space>
                  <Text>Mobile:</Text>
                  <Text type="danger">*</Text>
                </Space>
              }
              name="mobile"
              rules={[{ required: true, message: "Please enter mobile number" }]}
            >
              <Input
                placeholder="Mobile"
                prefix={<MobileOutlined style={{ color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c" }} />}
                style={inputStyle}
              />
            </Form.Item>

            <Form.Item label="Assigned to" name="assignedTo">
              <Input
                placeholder="Assigned to"
                prefix={<UserOutlined style={{ color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c" }} />}
                style={inputStyle}
              />
            </Form.Item>
          </Col>

          {/* Right Column */}
          <Col xs={24} sm={12}>
            <Form.Item label="Customer Group" name="customerGroup">
              <Select
                placeholder="None"
                style={inputStyle}
                suffixIcon={<TeamOutlined style={{ color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c" }} />}
              >
                <Select.Option value="none">None</Select.Option>
                <Select.Option value="group1">Group 1</Select.Option>
                <Select.Option value="group2">Group 2</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Alternate contact number" name="alternateContact">
              <Input
                placeholder="Alternate contact"
                prefix={<PhoneOutlined style={{ color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c" }} />}
                style={inputStyle}
              />
            </Form.Item>

            <Form.Item label="Landline" name="landline">
              <Input
                placeholder="Landline"
                prefix={<PhoneOutlined style={{ color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c" }} />}
                style={inputStyle}
              />
            </Form.Item>

            <Form.Item label="Email" name="email">
              <Input
                placeholder="Email"
                prefix={<MailOutlined style={{ color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c" }} />}
                style={inputStyle}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* More Informations Collapse */}
        <Form.Item style={{ marginBottom: "24px" }}>
          <Collapse
            ghost
            activeKey={showMoreInfo ? ["1"] : []}
            onChange={(keys) => setShowMoreInfo(keys.length > 0)}
            expandIcon={({ isActive }) => (
              <DownOutlined
                style={{
                  color: "#1890ff",
                  transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                }}
              />
            )}
            style={{
              background: isDark ? "rgba(255,255,255,0.05)" : "#f5f5f5",
              borderRadius: "6px",
            }}
          >
            <Panel
              header={
                <Button
                  type="primary"
                  icon={<DownOutlined />}
                  style={{
                    background: "#1890ff",
                    borderColor: "#1890ff",
                    borderRadius: "6px",
                  }}
                >
                  More Informations
                </Button>
              }
              key="1"
              style={{ border: "none" }}
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                  <Form.Item label="First Name" name="firstName">
                    <Input placeholder="First Name" style={inputStyle} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item label="Last Name" name="lastName">
                    <Input placeholder="Last Name" style={inputStyle} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item label="Company Name" name="companyName">
                    <Input placeholder="Company Name" style={inputStyle} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item label="Tax Number" name="taxNumber">
                    <Input placeholder="Tax Number" style={inputStyle} />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item label="Address" name="address">
                    <Input.TextArea rows={3} placeholder="Address" style={inputStyle} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item label="City" name="city">
                    <Input placeholder="City" style={inputStyle} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item label="State" name="state">
                    <Input placeholder="State" style={inputStyle} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item label="Country" name="country">
                    <Input placeholder="Country" style={inputStyle} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item label="ZIP Code" name="zipCode">
                    <Input placeholder="ZIP Code" style={inputStyle} />
                  </Form.Item>
                </Col>
              </Row>
            </Panel>
          </Collapse>
        </Form.Item>

        {/* Action Buttons */}
        <Row justify="end" style={{ marginTop: "24px" }}>
          <Space>
            <Button onClick={handleCancel}>Close</Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{
                background: "#1890ff",
                borderColor: "#1890ff",
              }}
            >
              Save
            </Button>
          </Space>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddCustomerModal;

