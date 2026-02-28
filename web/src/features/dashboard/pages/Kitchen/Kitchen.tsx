import React, { useState } from "react";
import { Card, Typography, Button, Modal, Descriptions, Space, message, Tag } from "antd";
import { ClockCircleOutlined, UserOutlined, EyeOutlined } from "@ant-design/icons";
import useTheme from "@/theme/useTheme";

interface OrderItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
}

interface Order {
    id: string;
    placedAt: string;
    status: "Received" | "Cooking" | "Ready" | "Completed";
    customer: string;
    table: string;
    location: string;
    items: OrderItem[];
    totalAmount: number;
}

const Kitchen: React.FC = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [orders, setOrders] = useState<Order[]>([
        {
            id: "ORD-001",
            placedAt: "10:30 AM",
            status: "Received",
            customer: "John Doe",
            table: "Table 1",
            location: "Indoor",
            items: [
                { id: "1", name: "Burger", quantity: 2, price: 12.99 },
                { id: "2", name: "Fries", quantity: 1, price: 4.99 },
            ],
            totalAmount: 30.97,
        },
        {
            id: "ORD-002",
            placedAt: "10:45 AM",
            status: "Received",
            customer: "Jane Smith",
            table: "Table 3",
            location: "Outdoor",
            items: [
                { id: "3", name: "Pizza", quantity: 1, price: 18.99 },
                { id: "4", name: "Salad", quantity: 1, price: 8.99 },
            ],
            totalAmount: 27.98,
        },
        {
            id: "ORD-003",
            placedAt: "11:00 AM",
            status: "Received",
            customer: "Bob Johnson",
            table: "Table 2",
            location: "Indoor",
            items: [
                { id: "5", name: "Pasta", quantity: 2, price: 14.99 },
                { id: "6", name: "Garlic Bread", quantity: 1, price: 5.99 },
            ],
            totalAmount: 35.97,
        },
    ]);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [detailsModalOpen, setDetailsModalOpen] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Received":
                return "orange";
            case "Cooking":
                return "blue";
            case "Ready":
                return "green";
            case "Completed":
                return "default";
            default:
                return "default";
        }
    };

    const handleMarkAsCooked = async (orderId: string) => {
        setActionLoading(true);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order.id === orderId
                        ? { ...order, status: "Cooking" as const }
                        : order
                )
            );

            message.success("Order status updated to Cooking");
        } catch (error) {
            message.error("Failed to update order status");
        } finally {
            setActionLoading(false);
        }
    };

    const handleOrderDetails = (order: Order) => {
        setSelectedOrder(order);
        setDetailsModalOpen(true);
    };

    const OrderCard: React.FC<{ order: Order }> = ({ order }) => (
        <Card
            hoverable
            style={{
                borderRadius: "12px",
                border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
                boxShadow: isDark
                    ? "0 2px 8px rgba(0,0,0,0.3)"
                    : "0 2px 8px rgba(0,0,0,0.06)",
                background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                transition: "all 0.3s ease",
                marginBottom: "16px",
            }}
            styles={{
                body: { padding: "20px" },
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
            <div style={{ marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                    <Typography.Text
                        strong
                        style={{
                            fontSize: "16px",
                            fontWeight: 600,
                            color: isDark ? "#fff" : "#1f1f1f",
                        }}
                    >
                        {order.id}
                    </Typography.Text>
                    <Tag color={getStatusColor(order.status)}>
                        {order.status}
                    </Tag>
                </div>

                <Space direction="vertical" size="small" style={{ width: "100%" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <ClockCircleOutlined style={{ color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c" }} />
                        <Typography.Text style={{ fontSize: "13px", color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c" }}>
                            Placed at {order.placedAt}
                        </Typography.Text>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <UserOutlined style={{ color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c" }} />
                        <Typography.Text style={{ fontSize: "13px", color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c" }}>
                            {order.customer}
                        </Typography.Text>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c" }}>📍</span>
                        <Typography.Text style={{ fontSize: "13px", color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c" }}>
                            {order.table} • {order.location}
                        </Typography.Text>
                    </div>
                </Space>
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
                <Button
                    type="primary"
                    size="small"
                    loading={actionLoading}
                    disabled={order.status !== "Received"}
                    onClick={() => handleMarkAsCooked(order.id)}
                    style={{
                        flex: 1,
                        borderRadius: "6px",
                        height: "32px",
                        fontSize: "12px",
                    }}
                >
                    {order.status === "Received" ? "Mark as cooked" : "In progress"}
                </Button>

                <Button
                    type="default"
                    size="small"
                    icon={<EyeOutlined />}
                    onClick={() => handleOrderDetails(order)}
                    style={{
                        borderRadius: "6px",
                        height: "32px",
                        fontSize: "12px",
                    }}
                >
                    Order details
                </Button>
            </div>
        </Card>
    );

    return (
        <div style={{ padding: "24px" }}>
            <div style={{ marginBottom: "24px" }}>
                <Typography.Title
                    level={2}
                    style={{
                        margin: 0,
                        color: isDark ? "#fff" : "#1f1f1f",
                        fontSize: "24px",
                        fontWeight: 600,
                    }}
                >
                    Kitchen
                </Typography.Title>
                <Typography.Text
                    style={{
                        fontSize: "14px",
                        color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
                        marginTop: "8px",
                        display: "block",
                    }}
                >
                    All orders
                </Typography.Text>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "16px" }}>
                {orders.map((order) => (
                    <OrderCard key={order.id} order={order} />
                ))}
            </div>

            {/* Order Details Modal */}
            <Modal
                title={`Order Details - ${selectedOrder?.id}`}
                open={detailsModalOpen}
                onCancel={() => {
                    setDetailsModalOpen(false);
                    setSelectedOrder(null);
                }}
                footer={[
                    <Button key="close" onClick={() => setDetailsModalOpen(false)}>
                        Close
                    </Button>,
                ]}
                width={600}
            >
                {selectedOrder && (
                    <div>
                        <Descriptions column={2} bordered size="small">
                            <Descriptions.Item label="Order ID">{selectedOrder.id}</Descriptions.Item>
                            <Descriptions.Item label="Status">
                                <Tag color={getStatusColor(selectedOrder.status)}>
                                    {selectedOrder.status}
                                </Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="Placed At">{selectedOrder.placedAt}</Descriptions.Item>
                            <Descriptions.Item label="Customer">{selectedOrder.customer}</Descriptions.Item>
                            <Descriptions.Item label="Table">{selectedOrder.table}</Descriptions.Item>
                            <Descriptions.Item label="Location">{selectedOrder.location}</Descriptions.Item>
                            <Descriptions.Item label="Total Amount" span={2}>
                                ${selectedOrder.totalAmount.toFixed(2)}
                            </Descriptions.Item>
                        </Descriptions>

                        <div style={{ marginTop: "16px" }}>
                            <Typography.Text strong style={{ display: "block", marginBottom: "8px" }}>
                                Order Items:
                            </Typography.Text>
                            {selectedOrder.items.map((item, index) => (
                                <div key={item.id} style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    padding: "8px 0",
                                    borderBottom: index < selectedOrder.items.length - 1 ? "1px solid #f0f0f0" : "none"
                                }}>
                                    <span>{item.name} x{item.quantity}</span>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Kitchen;