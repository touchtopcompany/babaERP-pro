import React, { useState } from "react";
import {
    Card,
    Button,
    Select,
    DatePicker,
    Space,
    Typography,
    Row,
    Col,
    Tabs,
} from "antd";
import {
    PlusOutlined,
    ShareAltOutlined,
} from "@ant-design/icons";
import useTheme from "@/theme/useTheme";
import dayjs from "dayjs";
import MyTasks from "./MyTasks";
import ProjectsReports from "./ProjectsReports";
import ProjectCategories from "./ProjectCategories";

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

interface Project {
    id: string;
    name: string;
    status: "active" | "completed" | "on-hold" | "cancelled";
    endDate: string;
    category: string;
    description?: string;
}

const Projects: React.FC = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    // State for filters
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [categoryFilter, setCategoryFilter] = useState<string>("all");
    const [dateRange, setDateRange] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null] | null>(null);
    const [activeTab, setActiveTab] = useState<string>("projects");
    const [projects, setProjects] = useState<Project[]>([]);

    // Filter projects based on selected filters

    const handleNewProject = () => {
        const newProj: Project = {
            id: Math.random().toString(),
            name: "New Project",
            status: "active",
            endDate: dayjs().add(1, "month").format("YYYY-MM-DD"),
            category: "development",
        };
        setProjects([...projects, newProj]);
    };

    return (
        <div style={{ width: "100%" }}>
            {/* Navigation Tabs */}
            <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                style={{ marginBottom: 24 }}
                items={[
                    {
                        key: "project",
                        label: (
                            <span>
                                <ShareAltOutlined style={{ marginRight: 8 }} />
                                Project
                            </span>
                        ),
                    },
                    {
                        key: "projects",
                        label: "Projects",
                    },
                    {
                        key: "my-tasks",
                        label: "My Tasks",
                    },
                    {
                        key: "reports",
                        label: "Reports",
                    },
                    {
                        key: "project-categories",
                        label: "Project Categories",
                    },
                ]}
            />

            {/* Content based on active tab */}
            {activeTab === "my-tasks" ? (
                <MyTasks />
            ) : activeTab === "reports" ? (
                <ProjectsReports />
            ) : activeTab === "project-categories" ? (
                <ProjectCategories />
            ) : (
                <>
                    {/* Header with title and actions */}
                    <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
                        <Col>
                            <Title level={3} style={{ margin: 0, color: isDark ? "#fff" : "#262626" }}>
                                Projects
                            </Title>
                        </Col>
                        <Col>
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={handleNewProject}
                                size="large"
                            >
                                New Project
                            </Button>
                        </Col>
                    </Row>

                    {/* Filters and View Options */}
                    <Card
                        style={{
                            marginBottom: 24,
                            backgroundColor: isDark ? "#1f1f1f" : "#fff",
                            borderColor: isDark ? "#303030" : "#d9d9d9",
                        }}
                        bodyStyle={{ padding: "16px 20px" }}
                    >
                        <Row justify="space-between" align="middle" wrap>
                            <Col xs={24} lg={18}>
                                <Space wrap size={[12, 8]}>
                                    {/* Status Filter */}
                                    <div>
                                        <Text
                                            strong
                                            style={{
                                                color: isDark ? "#fff" : "#262626",
                                                marginRight: 8,
                                                display: "block",
                                                marginBottom: 4,
                                            }}
                                        >
                                            Status
                                        </Text>
                                        <Select
                                            value={statusFilter}
                                            onChange={setStatusFilter}
                                            style={{ width: 140 }}
                                            size="middle"
                                        >
                                            <Option value="all">All</Option>
                                            <Option value="active">Active</Option>
                                            <Option value="completed">Completed</Option>
                                            <Option value="on-hold">On Hold</Option>
                                            <Option value="cancelled">Cancelled</Option>
                                        </Select>
                                    </div>

                                    {/* End Date Filter */}
                                    <div>
                                        <Text
                                            strong
                                            style={{
                                                color: isDark ? "#fff" : "#262626",
                                                marginRight: 8,
                                                display: "block",
                                                marginBottom: 4,
                                            }}
                                        >
                                            End Date
                                        </Text>
                                        <RangePicker
                                            value={dateRange}
                                            onChange={setDateRange}
                                            size="middle"
                                            style={{ width: 240 }}
                                            placeholder={["Start date", "End date"]}
                                        />
                                    </div>

                                    {/* Category Filter */}
                                    <div>
                                        <Text
                                            strong
                                            style={{
                                                color: isDark ? "#fff" : "#262626",
                                                marginRight: 8,
                                                display: "block",
                                                marginBottom: 4,
                                            }}
                                        >
                                            Category
                                        </Text>
                                        <Select
                                            value={categoryFilter}
                                            onChange={setCategoryFilter}
                                            style={{ width: 140 }}
                                            size="middle"
                                        >
                                            <Option value="all">All</Option>
                                            <Option value="development">Development</Option>
                                            <Option value="design">Design</Option>
                                            <Option value="marketing">Marketing</Option>
                                            <Option value="research">Research</Option>
                                        </Select>
                                    </div>
                                </Space>
                            </Col>

                            <Col xs={24} lg={6}>
                                {/* View mode buttons removed */}
                            </Col>
                        </Row>
                    </Card>

                    {/* Projects Content */}
                </>
            )}

        </div>
    );
};

export default Projects;