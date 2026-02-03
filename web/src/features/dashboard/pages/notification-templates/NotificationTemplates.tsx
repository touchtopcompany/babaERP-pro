import React, { useState } from "react";
import {
  Card,
  Tabs,
  Input,
  Row,
  Col,
  Typography,
  Button,
  message,
  Alert,
  Checkbox,
  Space,
  Tooltip,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import useTheme from "@/theme/useTheme";

const { Title, Text } = Typography;
const { TextArea } = Input;

const SEND_LEDGER_TAGS = [
  "{business_name}",
  "{business_logo}",
  "{balance_due}",
  "{contact_name}",
  ...Array.from({ length: 10 }, (_, i) => `{contact_custom_field_${i + 1}}`),
];

const CUSTOMER_TAGS = [
  "{business_name}",
  "{business_logo}",
  "{invoice_number}",
  "{invoice_url}",
  "{total_amount}",
  "{paid_amount}",
  "{due_amount}",
  "{cumulative_due_amount}",
  "{due_date}",
  "{location_name}",
  "{location_address}",
  "{location_email}",
  "{location_phone}",
  ...Array.from({ length: 4 }, (_, i) => `{location_custom_field_${i + 1}}`),
  "{contact_name}",
  ...Array.from({ length: 10 }, (_, i) => `{contact_custom_field_${i + 1}}`),
  ...Array.from({ length: 4 }, (_, i) => `{sell_custom_field_${i + 1}}`),
  ...Array.from({ length: 5 }, (_, i) => `{shipping_custom_field_${i + 1}}`),
];

const SUPPLIER_TAGS = [
  "{business_name}",
  "{business_logo}",
  "{order_ref_number}",
  "{total_amount}",
  "{received_amount}",
  "{due_amount}",
  "{location_name}",
  "{location_address}",
  "{location_email}",
  "{location_phone}",
  ...Array.from({ length: 4 }, (_, i) => `{location_custom_field_${i + 1}}`),
  ...Array.from({ length: 4 }, (_, i) => `{purchase_custom_field_${i + 1}}`),
  "{contact_business_name}",
  "{contact_name}",
  ...Array.from({ length: 10 }, (_, i) => `{contact_custom_field_${i + 1}}`),
  ...Array.from({ length: 5 }, (_, i) => `{shipping_custom_field_${i + 1}}`),
];

const TagList: React.FC<{ tags: string[] }> = ({ tags }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
    {tags.map((tag) => (
      <code key={tag} style={{ fontSize: 12, padding: "2px 8px", background: "rgba(0,0,0,0.06)", borderRadius: 4 }}>
        {tag}
      </code>
    ))}
  </div>
);

const NotificationTemplates: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [notifEmailSubject, setNotifEmailSubject] = useState("");
  const [notifCc, setNotifCc] = useState("");
  const [notifBcc, setNotifBcc] = useState("");
  const [notifEmailBody, setNotifEmailBody] = useState("");

  const [customerEmailSubject, setCustomerEmailSubject] = useState("");
  const [customerCc, setCustomerCc] = useState("");
  const [customerBcc, setCustomerBcc] = useState("");
  const [customerEmailBody, setCustomerEmailBody] = useState("");
  const [customerSmsBody, setCustomerSmsBody] = useState("");
  const [customerWhatsappText, setCustomerWhatsappText] = useState("");
  const [autoSendEmail, setAutoSendEmail] = useState(false);
  const [autoSendSms, setAutoSendSms] = useState(false);
  const [autoSendWhatsapp, setAutoSendWhatsapp] = useState(false);

  const [supplierEmailSubject, setSupplierEmailSubject] = useState("");
  const [supplierCc, setSupplierCc] = useState("");
  const [supplierBcc, setSupplierBcc] = useState("");
  const [supplierEmailBody, setSupplierEmailBody] = useState("");

  const inputStyle = {
    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
    borderRadius: 6,
    color: isDark ? "#fff" : "#1f1f1f",
  };

  const labelStyle: React.CSSProperties = { color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", fontSize: 13, marginBottom: 8, display: "block" };

  const handleSave = () => {
    message.success("Notification templates saved successfully");
  };

  const NotificationsContent = () => (
    <>
      <Tooltip title="Rich Text Area. Press ALT-0 for help.">
        <Text style={{ ...labelStyle, display: "inline-flex", alignItems: "center", marginBottom: 16 }}>
          Available Tags: <QuestionCircleOutlined style={{ marginLeft: 6, color: "#1890ff" }} />
        </Text>
      </Tooltip>
      <TagList tags={SEND_LEDGER_TAGS} />
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Text style={labelStyle}>Email Subject:</Text>
          <Input placeholder="Email Subject" value={notifEmailSubject} onChange={(e) => setNotifEmailSubject(e.target.value)} style={inputStyle} />
        </Col>
        <Col xs={24} md={12}>
          <Text style={labelStyle}>CC:</Text>
          <Input placeholder="CC" value={notifCc} onChange={(e) => setNotifCc(e.target.value)} style={inputStyle} />
        </Col>
        <Col xs={24} md={12}>
          <Text style={labelStyle}>BCC:</Text>
          <Input placeholder="BCC" value={notifBcc} onChange={(e) => setNotifBcc(e.target.value)} style={inputStyle} />
        </Col>
        <Col xs={24}>
          <Text style={labelStyle}>Email Body:</Text>
          <TextArea placeholder="Email body content. Use the tags above for dynamic values." value={notifEmailBody} onChange={(e) => setNotifEmailBody(e.target.value)} rows={12} style={inputStyle} />
          <Text type="secondary" style={{ fontSize: 12, marginTop: 4 }}>0 words · Rich text editor placeholder</Text>
        </Col>
      </Row>
    </>
  );

  const CustomerContent = () => (
    <>
      <Tooltip title="Rich Text Area. Press ALT-0 for help.">
        <Text style={{ ...labelStyle, display: "inline-flex", alignItems: "center", marginBottom: 16 }}>
          Available Tags: <QuestionCircleOutlined style={{ marginLeft: 6, color: "#1890ff" }} />
        </Text>
      </Tooltip>
      <TagList tags={CUSTOMER_TAGS} />
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Text style={labelStyle}>Email Subject:</Text>
          <Input placeholder="Email Subject" value={customerEmailSubject} onChange={(e) => setCustomerEmailSubject(e.target.value)} style={inputStyle} />
        </Col>
        <Col xs={24} md={6}>
          <Text style={labelStyle}>CC:</Text>
          <Input placeholder="CC" value={customerCc} onChange={(e) => setCustomerCc(e.target.value)} style={inputStyle} />
        </Col>
        <Col xs={24} md={6}>
          <Text style={labelStyle}>BCC:</Text>
          <Input placeholder="BCC" value={customerBcc} onChange={(e) => setCustomerBcc(e.target.value)} style={inputStyle} />
        </Col>
        <Col xs={24}>
          <Text style={labelStyle}>Email Body:</Text>
          <TextArea placeholder="Email body content." value={customerEmailBody} onChange={(e) => setCustomerEmailBody(e.target.value)} rows={10} style={inputStyle} />
          <Text type="secondary" style={{ fontSize: 12, marginTop: 4 }}>0 words</Text>
        </Col>
        <Col xs={24}>
          <Text style={labelStyle}>SMS Body:</Text>
          <TextArea placeholder="SMS Body" value={customerSmsBody} onChange={(e) => setCustomerSmsBody(e.target.value)} rows={3} style={inputStyle} />
        </Col>
        <Col xs={24}>
          <Text style={labelStyle}>Whatsapp Text:</Text>
          <TextArea placeholder="Whatsapp Text" value={customerWhatsappText} onChange={(e) => setCustomerWhatsappText(e.target.value)} rows={3} style={inputStyle} />
        </Col>
        <Col xs={24}>
          <Space direction="vertical" size={8}>
            <Checkbox checked={autoSendEmail} onChange={(e) => setAutoSendEmail(e.target.checked)}>Auto Send Email</Checkbox>
            <Checkbox checked={autoSendSms} onChange={(e) => setAutoSendSms(e.target.checked)}>Auto Send SMS</Checkbox>
            <Checkbox checked={autoSendWhatsapp} onChange={(e) => setAutoSendWhatsapp(e.target.checked)}>Auto send Whatsapp notification</Checkbox>
            <Text type="secondary" style={{ fontSize: 12 }}>If enabled, sell notification will be automatically sent to customer on creating new sales for them.</Text>
          </Space>
        </Col>
      </Row>
    </>
  );

  const SupplierContent = () => (
    <>
      <Text style={{ ...labelStyle, marginBottom: 16 }}>Available Tags:</Text>
      <TagList tags={SUPPLIER_TAGS} />
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Text style={labelStyle}>Email Subject:</Text>
          <Input placeholder="Email Subject" value={supplierEmailSubject} onChange={(e) => setSupplierEmailSubject(e.target.value)} style={inputStyle} />
        </Col>
        <Col xs={24} md={6}>
          <Text style={labelStyle}>CC:</Text>
          <Input placeholder="CC" value={supplierCc} onChange={(e) => setSupplierCc(e.target.value)} style={inputStyle} />
        </Col>
        <Col xs={24} md={6}>
          <Text style={labelStyle}>BCC:</Text>
          <Input placeholder="BCC" value={supplierBcc} onChange={(e) => setSupplierBcc(e.target.value)} style={inputStyle} />
        </Col>
        <Col xs={24}>
          <Text style={labelStyle}>Email Body:</Text>
          <TextArea placeholder="Email body content." value={supplierEmailBody} onChange={(e) => setSupplierEmailBody(e.target.value)} rows={12} style={inputStyle} />
        </Col>
      </Row>
    </>
  );

  return (
    <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
      <Title level={2} style={{ marginBottom: 24, color: isDark ? "#fff" : "#1f1f1f", fontWeight: 600 }}>
        Notification Templates
      </Title>

      <Card
        style={{
          background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
          border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
          borderRadius: 8,
          marginBottom: 24,
        }}
        styles={{ body: { padding: "24px" } }}
      >
        <Title level={5} style={{ marginBottom: 16, color: isDark ? "#fff" : "#1f1f1f" }}>
          Notifications:
        </Title>
        <Tabs
          defaultActiveKey="send-ledger"
          items={[
            { key: "send-ledger", label: "Send Ledger", children: <NotificationsContent /> },
          ]}
        />
      </Card>

      <Card
        style={{
          background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
          border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
          borderRadius: 8,
          marginBottom: 24,
        }}
        styles={{ body: { padding: "24px" } }}
      >
        <Title level={5} style={{ marginBottom: 16, color: isDark ? "#fff" : "#1f1f1f" }}>
          Customer Notifications:
        </Title>
        <Tabs
          defaultActiveKey="new-sale"
          items={[
            { key: "new-sale", label: "New Sale", children: <CustomerContent /> },
            { key: "payment-received", label: "Payment Received", children: <CustomerContent /> },
            { key: "payment-reminder", label: "Payment Reminder", children: <CustomerContent /> },
            { key: "new-booking", label: "New Booking", children: <CustomerContent /> },
            { key: "new-quotation", label: "New Quotation", children: <CustomerContent /> },
          ]}
        />
      </Card>

      <Card
        style={{
          background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
          border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
          borderRadius: 8,
          marginBottom: 24,
        }}
        styles={{ body: { padding: "24px" } }}
      >
        <Title level={5} style={{ marginBottom: 16, color: isDark ? "#fff" : "#1f1f1f" }}>
          Supplier Notifications:
        </Title>
        <Tabs
          defaultActiveKey="new-order"
          items={[
            { key: "new-order", label: "New Order", children: <SupplierContent /> },
            { key: "payment-paid", label: "Payment Paid", children: <SupplierContent /> },
            { key: "items-received", label: "Items Received", children: <SupplierContent /> },
            { key: "items-pending", label: "Items Pending", children: <SupplierContent /> },
            { key: "purchase-order", label: "Purchase Order", children: <SupplierContent /> },
          ]}
        />
      </Card>

      <Alert
        message="Business logo will not work in SMS."
        type="warning"
        showIcon
        style={{ marginBottom: 24, borderRadius: 8 }}
      />

      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <Button type="primary" size="large" danger onClick={handleSave} style={{ borderRadius: 6, minWidth: 120 }}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default NotificationTemplates;
