import React, { useState } from "react";
import { Card, Typography, Table, Space, Skeleton, Button, message } from "antd";
import { FileTextOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import useTheme from "@/theme/useTheme";
import type { ColumnsType } from "antd/es/table";
import { ViewModal, EditModal, DeleteModal } from "@/components/modals";

interface SalesOrderData {
  key: string;
  action?: string;
  date: string;
  orderNo: string;
  customerName: string;
  contactNumber: string;
  location: string;
  status: string;
  shippingStatus: string;
  quantityRemaining: number;
  addedBy: string;
}

interface SalesOrderCardProps {
  data?: SalesOrderData[];
  totalOrders?: number;
  loading?: boolean;
}

const SalesOrderCard: React.FC<SalesOrderCardProps> = ({
  data = [],
  totalOrders = 0,
  loading = false,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<SalesOrderData | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const defaultData: SalesOrderData[] = data.length > 0 ? data : [
    {
      key: "1",
      date: "2024-01-15",
      orderNo: "ORD-001",
      customerName: "John Doe",
      contactNumber: "+255 123 456 789",
      location: "Dar es Salaam",
      status: "Pending",
      shippingStatus: "Not Shipped",
      quantityRemaining: 10,
      addedBy: "Admin",
    },
    {
      key: "2",
      date: "2024-01-16",
      orderNo: "ORD-002",
      customerName: "Jane Smith",
      contactNumber: "+255 987 654 321",
      location: "Arusha",
      status: "Processing",
      shippingStatus: "In Transit",
      quantityRemaining: 5,
      addedBy: "Manager",
    },
    {
      key: "3",
      date: "2024-01-17",
      orderNo: "ORD-003",
      customerName: "Bob Johnson",
      contactNumber: "+255 555 123 456",
      location: "Mwanza",
      status: "Completed",
      shippingStatus: "Delivered",
      quantityRemaining: 0,
      addedBy: "Admin",
    },
  ];

  const columns: ColumnsType<SalesOrderData> = [
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
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text: string) => (
        <Typography.Text
          style={{
            fontSize: "13px",
            color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
          }}
        >
          {text}
        </Typography.Text>
      ),
    },
    {
      title: "Order No.",
      dataIndex: "orderNo",
      key: "orderNo",
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
      title: "Customer name",
      dataIndex: "customerName",
      key: "customerName",
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
      title: "Contact Number",
      dataIndex: "contactNumber",
      key: "contactNumber",
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
      title: "Location",
      dataIndex: "location",
      key: "location",
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
      title: "Status",
      dataIndex: "status",
      key: "status",
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
      title: "Shipping Status",
      dataIndex: "shippingStatus",
      key: "shippingStatus",
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
      title: "Quantity Remaining",
      dataIndex: "quantityRemaining",
      key: "quantityRemaining",
      render: (value: number) => (
        <Typography.Text
          style={{
            fontSize: "13px",
            color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
          }}
        >
          {value}
        </Typography.Text>
      ),
    },
    {
      title: "Added By",
      dataIndex: "addedBy",
      key: "addedBy",
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
                  background: "linear-gradient(135deg, #52c41a20 0%, #52c41a10 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#52c41a",
                  fontSize: "24px",
                  border: "1px solid #52c41a30",
                }}
              >
                <FileTextOutlined />
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
                  Sales Order
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
                  {totalOrders || defaultData.length} orders
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
        title="Sales Order Details"
        data={selectedRecord}
        fields={[
          { key: "date", label: "Date" },
          { key: "orderNo", label: "Order No." },
          { key: "customerName", label: "Customer Name" },
          { key: "contactNumber", label: "Contact Number" },
          { key: "location", label: "Location" },
          { key: "status", label: "Status" },
          { key: "shippingStatus", label: "Shipping Status" },
          { key: "quantityRemaining", label: "Quantity Remaining" },
          { key: "addedBy", label: "Added By" },
        ]}
        width={700}
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
            // await updateSalesOrder(selectedRecord?.key, _values);
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
        title="Edit Sales Order"
        data={selectedRecord}
        fields={[
          { name: "date", label: "Date", type: "date", required: true },
          { name: "orderNo", label: "Order No.", type: "text", required: true },
          { name: "customerName", label: "Customer Name", type: "text", required: true },
          { name: "contactNumber", label: "Contact Number", type: "phone", required: true },
          { name: "location", label: "Location", type: "text", required: true },
          {
            name: "status",
            label: "Status",
            type: "select",
            required: true,
            options: [
              { label: "Pending", value: "Pending" },
              { label: "Processing", value: "Processing" },
              { label: "Completed", value: "Completed" },
            ],
          },
          {
            name: "shippingStatus",
            label: "Shipping Status",
            type: "select",
            required: true,
            options: [
              { label: "Not Shipped", value: "Not Shipped" },
              { label: "In Transit", value: "In Transit" },
              { label: "Delivered", value: "Delivered" },
            ],
          },
          { name: "quantityRemaining", label: "Quantity Remaining", type: "number", required: true },
          { name: "addedBy", label: "Added By", type: "text", required: true },
        ]}
        loading={actionLoading}
        width={700}
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
        title="Delete Sales Order"
        itemName={selectedRecord?.orderNo}
        loading={actionLoading}
      />
    </Card>
  );
};

export default SalesOrderCard;

