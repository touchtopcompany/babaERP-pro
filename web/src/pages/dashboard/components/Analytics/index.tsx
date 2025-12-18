import React from 'react';
import {
    Card,
    Row,
    Col,
    Statistic,
    Select,
    DatePicker,
    Typography,
    Table,
    Tag
} from 'antd';
import {
    UserOutlined,
    ShoppingCartOutlined,
    DollarOutlined,
    BarChartOutlined,
    RiseOutlined,
    FallOutlined,
    CalendarOutlined
} from '@ant-design/icons';
import { Bar, Line, Pie } from '@ant-design/plots';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

// Sample data for charts
const revenueData = [
    { month: 'Jan', revenue: 4000 },
    { month: 'Feb', revenue: 3000 },
    { month: 'Mar', revenue: 5000 },
    { month: 'Apr', revenue: 4800 },
    { month: 'May', revenue: 6200 },
    { month: 'Jun', revenue: 7800 },
    { month: 'Jul', revenue: 9000 },
    { month: 'Aug', revenue: 8500 },
    { month: 'Sep', revenue: 9200 },
    { month: 'Oct', revenue: 10000 },
    { month: 'Nov', revenue: 11500 },
    { month: 'Dec', revenue: 13000 },
];

const userActivityData = [
    { date: '2025-12-01', activeUsers: 120 },
    { date: '2025-12-02', activeUsers: 190 },
    { date: '2025-12-03', activeUsers: 150 },
    { date: '2025-12-04', activeUsers: 210 },
    { date: '2025-12-05', activeUsers: 180 },
    { date: '2025-12-06', activeUsers: 250 },
    { date: '2025-12-07', activeUsers: 300 },
];

const topProducts = [
    { id: 1, name: 'Product A', sales: 1250, revenue: 12500, category: 'Electronics' },
    { id: 2, name: 'Product B', sales: 980, revenue: 15680, category: 'Clothing' },
    { id: 3, name: 'Product C', sales: 850, revenue: 10200, category: 'Home' },
    { id: 4, name: 'Product D', sales: 720, revenue: 8640, category: 'Electronics' },
    { id: 5, name: 'Product E', sales: 650, revenue: 7800, category: 'Books' },
];

const categoryData = [
    { type: 'Electronics', value: 35 },
    { type: 'Clothing', value: 25 },
    { type: 'Home', value: 20 },
    { type: 'Books', value: 15 },
    { type: 'Other', value: 5 },
];

const columns: ColumnsType<any> = [
    {
        title: 'Product',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        render: (category) => (
            <Tag color={category === 'Electronics' ? 'blue' : category === 'Clothing' ? 'green' : 'orange'}>
                {category}
            </Tag>
        ),
    },
    {
        title: 'Sales',
        dataIndex: 'sales',
        key: 'sales',
        sorter: (a, b) => a.sales - b.sales,
    },
    {
        title: 'Revenue',
        dataIndex: 'revenue',
        key: 'revenue',
        render: (value) => `$${value.toLocaleString()}`,
        sorter: (a, b) => a.revenue - b.revenue,
    },
];

const Analytics: React.FC = () => {
    // Chart configurations
    const revenueConfig = {
        data: revenueData,
        xField: 'month',
        yField: 'revenue',
        color: '#0d9488',
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        yAxis: {
            label: {
                formatter: (v: string) => `$${v}`,
            },
        },
        meta: {
            revenue: {
                alias: 'Revenue',
            },
        },
    };

    const userActivityConfig = {
        data: userActivityData,
        xField: 'date',
        yField: 'activeUsers',
        point: {
            size: 5,
            shape: 'diamond',
        },
        color: '#0d9488',
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
    };

    const categoryConfig = {
        data: categoryData,
        angleField: 'value',
        colorField: 'type',
        radius: 0.8,
        label: {
            type: 'outer',
            content: '{name} {percentage}',
        },
        interactions: [{ type: 'element-active' }],
        color: ['#0d9488', '#10b981', '#f59e0b', '#6366f1', '#8b5cf6'],
    };

    return (
        <div>
            <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Title level={4} style={{ margin: 0 }}>Analytics Dashboard</Title>
                <div style={{ display: 'flex', gap: '16px' }}>
                    <RangePicker
                        style={{ width: 250 }}
                        suffixIcon={<CalendarOutlined />}
                        placeholder={['Start Date', 'End Date']}
                    />
                    <Select defaultValue="all" style={{ width: 150 }}>
                        <Option value="all">All Categories</Option>
                        <Option value="electronics">Electronics</Option>
                        <Option value="clothing">Clothing</Option>
                        <Option value="home">Home</Option>
                    </Select>
                </div>
            </div>

            {/* Summary Cards */}
            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic
                            title="Total Revenue"
                            value={112893}
                            precision={2}
                            valueStyle={{ color: '#0d9488' }}
                            prefix={<DollarOutlined />}
                            suffix="USD"
                        />
                        <div style={{ marginTop: 8 }}>
                            <Text type="success">
                                <RiseOutlined /> 12.5% <span style={{ fontSize: 12 }}>vs last month</span>
                            </Text>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic
                            title="Active Users"
                            value={2841}
                            valueStyle={{ color: '#3b82f6' }}
                            prefix={<UserOutlined />}
                        />
                        <div style={{ marginTop: 8 }}>
                            <Text type="success">
                                <RiseOutlined /> 8.2% <span style={{ fontSize: 12 }}>vs last month</span>
                            </Text>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic
                            title="Total Orders"
                            value={1567}
                            valueStyle={{ color: '#8b5cf6' }}
                            prefix={<ShoppingCartOutlined />}
                        />
                        <div style={{ marginTop: 8 }}>
                            <Text type="success">
                                <RiseOutlined /> 5.4% <span style={{ fontSize: 12 }}>vs last month</span>
                            </Text>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic
                            title="Conversion Rate"
                            value={3.42}
                            precision={2}
                            valueStyle={{ color: '#10b981' }}
                            prefix={<BarChartOutlined />}
                            suffix="%"
                        />
                        <div style={{ marginTop: 8 }}>
                            <Text type="danger">
                                <FallOutlined /> 1.2% <span style={{ fontSize: 12 }}>vs last month</span>
                            </Text>
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* Main Charts */}
            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                <Col xs={24} lg={16}>
                    <Card title="Revenue Overview" extra={<a href="#">View Details</a>}>
                        <Bar {...revenueConfig} height={300} />
                    </Card>
                </Col>
                <Col xs={24} lg={8}>
                    <Card title="Sales by Category">
                        <Pie {...categoryConfig} height={300} />
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                <Col xs={24}>
                    <Card title="User Activity" extra={<a href="#">View All</a>}>
                        <Line {...userActivityConfig} height={300} />
                    </Card>
                </Col>
            </Row>

            {/* Recent Activity & Top Products */}
            <Row gutter={[16, 16]}>
                <Col xs={24} xl={16}>
                    <Card title="Top Performing Products" extra={<a href="#">View All</a>}>
                        <Table
                            columns={columns}
                            dataSource={topProducts}
                            pagination={false}
                            rowKey="id"
                        />
                    </Card>
                </Col>
                <Col xs={24} xl={8}>
                    <Card title="Recent Activity">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {[1, 2, 3, 4, 5].map((item) => (
                                <div key={item} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                                    <div style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: '50%',
                                        backgroundColor: '#e2e8f0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0
                                    }}>
                                        <UserOutlined style={{ color: '#64748b' }} />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 500 }}>New order #{1000 + item}</div>
                                        <Text type="secondary" style={{ fontSize: 12 }}>
                                            {item} hour{item !== 1 ? 's' : ''} ago
                                        </Text>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Analytics;