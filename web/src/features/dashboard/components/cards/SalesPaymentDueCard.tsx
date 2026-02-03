import React, { useState } from "react";
import { Card, Typography, Table, Space, Skeleton, Button, message } from "antd";
import { CreditCardOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import useTheme from "@/theme/useTheme";
import type { ColumnsType } from "antd/es/table";
import { ViewModal, EditModal, DeleteModal } from "@/components/modals";

interface SalesPaymentDueData {
  key: string;
  customer: string;
  invoiceNo: string;
  dueAmount: string;
  action?: string;
}

interface SalesPaymentDueCardProps {
  data?: SalesPaymentDueData[];
  totalAmount?: string;
  loading?: boolean;
}

const SalesPaymentDueCard: React.FC<SalesPaymentDueCardProps> = ({
  data = [],
  totalAmount = "TSh 0.00",
  loading = false,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<SalesPaymentDueData | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const defaultData: SalesPaymentDueData[] = data.length > 0 ? data : [
    {
      key: "1",
      customer: "John Doe",
      invoiceNo: "INV-001",
      dueAmount: "TSh 5,000.00",
    },
    {
      key: "2",
      customer: "Jane Smith",
      invoiceNo: "INV-002",
      dueAmount: "TSh 3,500.00",
    },
    {
      key: "3",
      customer: "Bob Johnson",
      invoiceNo: "INV-003",
      dueAmount: "TSh 2,200.00",
    },
    {
      key: "4",
      customer: "Alice Williams",
      invoiceNo: "INV-004",
      dueAmount: "TSh 1,800.00",
    },
  ];

  const columns: ColumnsType<SalesPaymentDueData> = [
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      render: (text: string) => (
        <Typography.Text
          style={{
            fontSize: "13px",
            color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
          }}
        >
          {text}
        </Typography.Text>
      ),
    },
    {
      title: "Invoice No.",
      dataIndex: "invoiceNo",
      key: "invoiceNo",
      render: (text: string) => (
        <Typography.Text
          style={{
            fontSize: "13px",
            fontWeight: 500,
            color: isDark ? "#fff" : "#1f1f1f",
          }}
        >
          {text}
        </Typography.Text>
      ),
    },
    {
      title: "Due Amount",
      dataIndex: "dueAmount",
      key: "dueAmount",
      align: "right",
      render: (text: string) => (
        <Typography.Text
          strong
          style={{
            fontSize: "13px",
            fontWeight: 600,
            color: isDark ? "#fff" : "#1f1f1f",
          }}
        >
          {text}
        </Typography.Text>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Button
            type="text"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedRecord(record);
              setViewModalOpen(true);
            }}
            style={{
              color: isDark ? "rgba(255,255,255,0.85)" : "#1890ff",
            }}
          />
          <Button
            type="text"
            size="small"
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedRecord(record);
              setEditModalOpen(true);
            }}
            style={{
              color: isDark ? "rgba(255,255,255,0.85)" : "#52c41a",
            }}
          />
          <Button
            type="text"
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => {
              setSelectedRecord(record);
              setDeleteModalOpen(true);
            }}
            danger
            style={{
              color: isDark ? "rgba(255,255,255,0.85)" : "#ff4d4f",
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <Card
      hoverable
      style={{
        borderRadius: "8px",
        border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
        boxShadow: isDark 
          ? "0 2px 8px rgba(0,0,0,0.3)" 
          : "0 2px 8px rgba(0,0,0,0.06)",
        height: "100%",
        background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
        transition: "all 0.3s ease",
      }}
      styles={{ 
        body: { padding: "24px" },
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = isDark
          ? "0 4px 16px rgba(0,0,0,0.4)"
          : "0 4px 16px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = isDark
          ? "0 2px 8px rgba(0,0,0,0.3)"
          : "0 2px 8px rgba(0,0,0,0.06)";
      }}
    >
      {loading ? (
        <Skeleton active paragraph={{ rows: 4 }} />
      ) : (
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #1890ff20 0%, #1890ff10 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#1890ff",
                  fontSize: "24px",
                  border: "1px solid #1890ff30",
                }}
              >
                <CreditCardOutlined />
              </div>
              <div>
                <Typography.Text
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Sales Payment Due
                </Typography.Text>
                <Typography.Text
                  strong
                  style={{
                    fontSize: "24px",
                    fontWeight: 600,
                    color: isDark ? "#fff" : "#1f1f1f",
                    display: "block",
                    marginTop: "4px",
                  }}
                >
                  {totalAmount}
                </Typography.Text>
              </div>
            </div>
          </div>
          <Table
            columns={columns}
            dataSource={defaultData}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
              pageSizeOptions: ["10", "25", "50", "100"],
            }}
            size="small"
            style={{
              background: isDark ? "transparent" : "#fafafa",
              borderRadius: "6px",
            }}
          />
        </Space>
      )}

      {/* View Modal */}
      <ViewModal
        open={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false);
          setSelectedRecord(null);
        }}
        title="Sales Payment Due Details"
        data={selectedRecord}
        fields={[
          { key: "customer", label: "Customer" },
          { key: "invoiceNo", label: "Invoice No." },
          { key: "dueAmount", label: "Due Amount" },
        ]}
      />

      {/* Edit Modal */}
      <EditModal
        open={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedRecord(null);
        }}
        onSave={async (_values) => {
          setActionLoading(true);
          try {
            // TODO: Implement API call to update record
            // await updateSalesPaymentDue(selectedRecord?.key, _values);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            message.success("Record updated successfully");
            setEditModalOpen(false);
            setSelectedRecord(null);
          } catch (error) {
            message.error("Failed to update record");
          } finally {
            setActionLoading(false);
          }
        }}
        title="Edit Sales Payment Due"
        data={selectedRecord}
        fields={[
          { name: "customer", label: "Customer", type: "text", required: true },
          { name: "invoiceNo", label: "Invoice No.", type: "text", required: true },
          { name: "dueAmount", label: "Due Amount", type: "text", required: true },
        ]}
        loading={actionLoading}
      />

      {/* Delete Modal */}
      <DeleteModal
        open={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedRecord(null);
        }}
        onConfirm={async () => {
          setActionLoading(true);
          try {
            // TODO: Implement API call to delete record
            await new Promise((resolve) => setTimeout(resolve, 1000));
            message.success("Record deleted successfully");
            setDeleteModalOpen(false);
            setSelectedRecord(null);
          } catch (error) {
            message.error("Failed to delete record");
          } finally {
            setActionLoading(false);
          }
        }}
        title="Delete Sales Payment Due"
        itemName={selectedRecord?.customer}
        loading={actionLoading}
      />
    </Card>
  );
};

export default SalesPaymentDueCard;

