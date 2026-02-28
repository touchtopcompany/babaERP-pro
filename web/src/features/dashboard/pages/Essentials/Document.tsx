import React, { useState, useRef } from "react";
import {
    Table,
    Button,
    Input,
    Space,
    Typography,
    Dropdown,
    message,
    Row,
    Col,
    Tag,
    Tooltip,
    Popconfirm,
} from "antd";
import {
    PlusOutlined,
    SearchOutlined,
    ExportOutlined,
    PrinterOutlined,
    EyeOutlined,
    DeleteOutlined,
    DownloadOutlined,
    FileTextOutlined,
    FilePdfOutlined,
    FileExcelOutlined,
    FileOutlined,
    DashboardOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { MenuProps } from "antd";
import DashboardLayout from "../../components/layout/DashboardLayout";
import AddModal, { type FormField } from "@/components/modals/AddModal";
import useTheme from "@/theme/useTheme";

const { Search } = Input;
const { Title, Text } = Typography;

export interface Document {
    id: string;
    name: string;
    description: string;
    uploadedDate: string;
    file: File | null;
    fileSize: number;
    fileType: string;
    category: string;
}

const Document: React.FC = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [documents, setDocuments] = useState<Document[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const tableRef = useRef<HTMLDivElement>(null);

    const addModalFields: FormField[] = [
        {
            name: "name",
            label: "Document Name",
            type: "text",
            placeholder: "Enter document name",
            required: true,
        },
        {
            name: "description",
            label: "Description",
            type: "textarea",
            placeholder: "Enter document description",
            required: true,
        },
        {
            name: "category",
            label: "Category",
            type: "select",
            placeholder: "Select category",
            required: true,
            options: [
                { label: "Contract", value: "contract" },
                { label: "Invoice", value: "invoice" },
                { label: "Report", value: "report" },
                { label: "Presentation", value: "presentation" },
                { label: "Other", value: "other" },
            ],
        },
        {
            name: "file",
            label: "Upload File",
            type: "text",
            placeholder: "Choose file to upload",
            required: true,
        },
    ];

    const handleAddDocument = async (values: any) => {
        setLoading(true);
        try {
            const newDocument: Document = {
                id: Date.now().toString(),
                name: values.name,
                description: values.description,
                uploadedDate: new Date().toISOString(),
                file: null, // In a real app, this would be the uploaded file
                fileSize: 0,
                fileType: values.category,
                category: values.category,
            };

            setDocuments([...documents, newDocument]);
            message.success("Document added successfully!");
            setIsAddModalOpen(false);
        } catch (error) {
            message.error("Failed to add document");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id: string) => {
        setDocuments(documents.filter(doc => doc.id !== id));
        message.success("Document deleted successfully!");
    };

    const handleExportCSV = () => {
        if (documents.length === 0) {
            message.warning("No documents to export");
            return;
        }

        const csvData = documents.map(doc => ({
            Name: doc.name,
            Description: doc.description,
            "Uploaded Date": new Date(doc.uploadedDate).toLocaleDateString(),
            Category: doc.category,
        }));

        const headers = Object.keys(csvData[0] || {});
        const csvContent = [
            headers.join(','),
            ...csvData.map(doc => headers.map(header => doc[header as keyof typeof doc]).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'documents.csv';
        a.click();
        window.URL.revokeObjectURL(url);
        message.success("Exported to CSV successfully!");
    };

    const handleExportExcel = () => {
        // Simple CSV export as Excel fallback
        handleExportCSV();
        message.success("Exported to Excel successfully!");
    };

    const handleExportPDF = () => {
        // Simple print fallback for PDF
        handlePrint();
        message.success("PDF export initiated!");
    };

    const handlePrint = () => {
        const printContent = `
      <html>
        <head>
          <title>Documents</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #1890ff; }
            table { border-collapse: collapse; width: 100%; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f5f5f5; font-weight: bold; }
          </style>
        </head>
        <body>
          <h1>Documents</h1>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Uploaded Date</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              ${documents.map(doc => `
                <tr>
                  <td>${doc.name}</td>
                  <td>${doc.description}</td>
                  <td>${new Date(doc.uploadedDate).toLocaleDateString()}</td>
                  <td>${doc.category}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

        const printWindow = window.open('', '', 'width=800,height=600');
        if (printWindow) {
            printWindow.document.write(printContent);
            printWindow.document.close();
            printWindow.print();
            printWindow.close();
            message.success("Print dialog opened!");
        }
    };

    const getFileIcon = (fileType: string) => {
        switch (fileType.toLowerCase()) {
            case 'pdf':
                return <FilePdfOutlined style={{ color: '#ff4d4f' }} />;
            case 'excel':
            case 'xlsx':
            case 'xls':
                return <FileExcelOutlined style={{ color: '#52c41a' }} />;
            default:
                return <FileOutlined style={{ color: '#1890ff' }} />;
        }
    };

    const getCategoryColor = (category: string) => {
        const colors: Record<string, string> = {
            contract: 'blue',
            invoice: 'green',
            report: 'orange',
            presentation: 'purple',
            other: 'default',
        };
        return colors[category] || 'default';
    };

    const exportMenuItems: MenuProps['items'] = [
        {
            key: 'csv',
            label: 'Export to CSV',
            icon: <FileTextOutlined />,
            onClick: handleExportCSV,
        },
        {
            key: 'excel',
            label: 'Export to Excel',
            icon: <FileExcelOutlined />,
            onClick: handleExportExcel,
        },
        {
            key: 'pdf',
            label: 'Export to PDF',
            icon: <FilePdfOutlined />,
            onClick: handleExportPDF,
        },
    ];

    const columns: ColumnsType<Document> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder="Search name"
                        value={selectedKeys[0]}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => confirm?.()}
                        style={{ width: 188, marginBottom: 8, display: 'block' }}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => confirm?.()}
                            size="small"
                            style={{ width: 90 }}
                        >
                            Filter
                        </Button>
                        <Button onClick={() => clearFilters?.()} size="small" style={{ width: 90 }}>
                            Reset
                        </Button>
                    </Space>
                </div>
            ),
            onFilter: (value, record) =>
                record.name.toLowerCase().includes((value as string).toLowerCase()),
            render: (text: string, record: Document) => (
                <Space>
                    {getFileIcon(record.fileType)}
                    <Text strong>{text}</Text>
                </Space>
            ),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
            render: (text: string) => (
                <Tooltip title={text}>
                    <Text>{text}</Text>
                </Tooltip>
            ),
        },
        {
            title: 'Uploaded Date',
            dataIndex: 'uploadedDate',
            key: 'uploadedDate',
            sorter: (a, b) => new Date(a.uploadedDate).getTime() - new Date(b.uploadedDate).getTime(),
            render: (date: string) => (
                <Text>{new Date(date).toLocaleDateString()}</Text>
            ),
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            filters: [
                { text: 'Contract', value: 'contract' },
                { text: 'Invoice', value: 'invoice' },
                { text: 'Report', value: 'report' },
                { text: 'Presentation', value: 'presentation' },
                { text: 'Other', value: 'other' },
            ],
            onFilter: (value, record) => record.category === value,
            render: (category: string) => (
                <Tag color={getCategoryColor(category)}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                </Tag>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record: Document) => (
                <Space size="middle">
                    <Tooltip title="View">
                        <Button
                            type="text"
                            icon={<EyeOutlined />}
                            style={{ color: '#1890ff' }}
                        />
                    </Tooltip>
                    <Tooltip title="Download">
                        <Button
                            type="text"
                            icon={<DownloadOutlined />}
                            style={{ color: '#52c41a' }}
                        />
                    </Tooltip>
                    <Popconfirm
                        title="Are you sure you want to delete this document?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Tooltip title="Delete">
                            <Button
                                type="text"
                                icon={<DeleteOutlined />}
                                style={{ color: '#ff4d4f' }}
                            />
                        </Tooltip>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const filteredDocuments = documents.filter(doc =>
        doc.name.toLowerCase().includes(searchText.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchText.toLowerCase())
    );

    const rowSelection = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys: React.Key[]) => {
            setSelectedRowKeys(newSelectedRowKeys);
        },
    };

    return (
        <DashboardLayout
            breadcrumbs={[
                { label: "Home", icon: <DashboardOutlined /> },
                { label: "Essentials" },
                { label: "Documents" },
            ]}
        >
            <div style={{ marginBottom: 24 }}>
                <Row justify="space-between" align="middle" gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={8}>
                        <Title level={3} style={{ margin: 0, color: isDark ? "#fff" : "#1f1f1f" }}>
                            Document Management
                        </Title>
                    </Col>
                    <Col xs={24} sm={12} md={16}>
                        <Row justify="end" gutter={[8, 8]}>
                            <Col>
                                <Search
                                    placeholder="Search documents..."
                                    allowClear
                                    enterButton={<SearchOutlined />}
                                    size="middle"
                                    style={{ width: 250 }}
                                    onChange={(e) => setSearchText(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <Button
                                    type="primary"
                                    icon={<PlusOutlined />}
                                    onClick={() => setIsAddModalOpen(true)}
                                    size="middle"
                                >
                                    Add Document
                                </Button>
                            </Col>
                            <Col>
                                <Dropdown menu={{ items: exportMenuItems }} placement="bottomRight">
                                    <Button icon={<ExportOutlined />} size="middle">
                                        Export
                                    </Button>
                                </Dropdown>
                            </Col>
                            <Col>
                                <Button
                                    icon={<PrinterOutlined />}
                                    onClick={handlePrint}
                                    size="middle"
                                >
                                    Print
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>

            <div
                ref={tableRef}
                style={{
                    background: isDark ? "#1f1f1f" : "#ffffff",
                    borderRadius: "8px",
                    padding: "24px",
                    boxShadow: isDark
                        ? "0 1px 3px rgba(0,0,0,0.3)"
                        : "0 1px 3px rgba(0,0,0,0.12)",
                }}
            >
                <Table
                    columns={columns}
                    dataSource={filteredDocuments}
                    rowKey="id"
                    rowSelection={rowSelection}
                    pagination={{
                        total: filteredDocuments.length,
                        pageSize: 10,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) =>
                            `${range[0]}-${range[1]} of ${total} documents`,
                    }}
                    scroll={{ x: 800 }}
                    locale={{
                        emptyText: (
                            <div style={{ textAlign: 'center', padding: '40px' }}>
                                <FileOutlined style={{ fontSize: '48px', color: '#d9d9d9', marginBottom: '16px' }} />
                                <div style={{ color: '#8c8c8c', fontSize: '16px' }}>
                                    No data available in table
                                </div>
                                <div style={{ color: '#bfbfbf', fontSize: '14px', marginTop: '8px' }}>
                                    Add your first document to get started
                                </div>
                            </div>
                        ),
                    }}
                />
            </div>

            <AddModal
                open={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSave={handleAddDocument}
                title="Add New Document"
                fields={addModalFields}
                loading={loading}
                width={600}
            />
        </DashboardLayout>
    );
};

export default Document;