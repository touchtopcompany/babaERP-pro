import React, { useState, useEffect } from 'react';
import {
    Card,
    Button,
    Input,
    Table,
    Modal,
    Form,
    Space,
    Typography,
    Tag,
    message,
    Popconfirm,
} from 'antd';
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    SearchOutlined,
    DownloadOutlined,
    PrinterOutlined,
    FileTextOutlined,
} from '@ant-design/icons';

const { Title } = Typography;

interface ProjectCategory {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

const ProjectCategories: React.FC = () => {
    const [categories, setCategories] = useState<ProjectCategory[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<ProjectCategory | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });

    // Mock data - replace with actual API call
    useEffect(() => {
        // Simulate API call
        const mockCategories: ProjectCategory[] = [
            {
                id: '1',
                name: 'Web Development',
                description: 'Projects related to web application development',
                createdAt: '2024-01-15T10:30:00Z',
                updatedAt: '2024-01-15T10:30:00Z'
            },
            {
                id: '2',
                name: 'Mobile Development',
                description: 'Projects for mobile application development',
                createdAt: '2024-01-16T14:20:00Z',
                updatedAt: '2024-01-16T14:20:00Z'
            }
        ];
        setCategories(mockCategories);
    }, []);

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddCategory = () => {
        if (!formData.name.trim()) {
            message.error('Category name is required');
            return;
        }

        const newCategory: ProjectCategory = {
            id: Date.now().toString(),
            name: formData.name,
            description: formData.description,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        setCategories([...categories, newCategory]);
        setFormData({ name: '', description: '' });
        setIsAddDialogOpen(false);
        message.success('Category added successfully');
    };

    const handleEditCategory = () => {
        if (!formData.name.trim()) {
            message.error('Category name is required');
            return;
        }

        if (!editingCategory) return;

        const updatedCategories = categories.map(category =>
            category.id === editingCategory.id
                ? {
                    ...category,
                    name: formData.name,
                    description: formData.description,
                    updatedAt: new Date().toISOString()
                }
                : category
        );

        setCategories(updatedCategories);
        setFormData({ name: '', description: '' });
        setEditingCategory(null);
        setIsEditDialogOpen(false);
        message.success('Category updated successfully');
    };

    const handleDeleteCategory = (id: string) => {
        const updatedCategories = categories.filter(category => category.id !== id);
        setCategories(updatedCategories);
        message.success('Category deleted successfully');
    };

    const openEditDialog = (category: ProjectCategory) => {
        setEditingCategory(category);
        setFormData({
            name: category.name,
            description: category.description
        });
        setIsEditDialogOpen(true);
    };

    const exportToCSV = () => {
        const csvContent = [
            ['Project Category', 'Description', 'Created At'],
            ...filteredCategories.map(cat => [
                cat.name,
                cat.description,
                new Date(cat.createdAt).toLocaleDateString()
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'project-categories.csv';
        a.click();
        window.URL.revokeObjectURL(url);
        message.success('Exported to CSV successfully');
    };

    const exportToExcel = () => {
        // This would require a library like xlsx
        message.info('Excel export requires additional library implementation');
    };

    const exportToPDF = () => {
        // This would require a library like jspdf
        message.info('PDF export requires additional library implementation');
    };

    const handlePrint = () => {
        window.print();
        message.info('Print dialog opened');
    };

    const columns = [
        {
            title: 'Project Category',
            dataIndex: 'name',
            key: 'name',
            render: (text: string) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (text: string) => (
                <span style={{ color: '#666' }}>
                    {text || 'No description'}
                </span>
            ),
        },
        {
            title: 'Created',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date: string) => (
                <span style={{ color: '#999' }}>
                    {new Date(date).toLocaleDateString()}
                </span>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: ProjectCategory) => (
                <Space size="small">
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => openEditDialog(record)}
                    >
                        Edit
                    </Button>
                    <Popconfirm
                        title="Are you sure you want to delete this category?"
                        onConfirm={() => handleDeleteCategory(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            type="link"
                            danger
                            icon={<DeleteOutlined />}
                        >
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <Title level={2}>Project Categories</Title>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setIsAddDialogOpen(true)}
                >
                    Add Category
                </Button>
            </div>

            <Card>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <Input
                        placeholder="Search categories..."
                        prefix={<SearchOutlined />}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: '300px' }}
                    />
                    <Space>
                        <Button icon={<DownloadOutlined />} onClick={exportToCSV}>
                            CSV
                        </Button>
                        <Button icon={<DownloadOutlined />} onClick={exportToExcel}>
                            Excel
                        </Button>
                        <Button icon={<PrinterOutlined />} onClick={handlePrint}>
                            Print
                        </Button>
                        <Button icon={<FileTextOutlined />} onClick={exportToPDF}>
                            PDF
                        </Button>
                    </Space>
                </div>

                {filteredCategories.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '48px' }}>
                        <p style={{ color: '#999' }}>No data available in table</p>
                        <p style={{ color: '#bbb', fontSize: '14px', marginTop: '8px' }}>
                            {searchTerm ? 'No categories match your search' : 'Start by adding a new category'}
                        </p>
                    </div>
                ) : (
                    <Table
                        columns={columns}
                        dataSource={filteredCategories}
                        rowKey="id"
                        pagination={false}
                    />
                )}

                {filteredCategories.length > 0 && (
                    <div style={{ marginTop: '16px', fontSize: '14px', color: '#999' }}>
                        Showing {filteredCategories.length} of {categories.length} entries
                    </div>
                )}
            </Card>

            {/* Add Modal */}
            <Modal
                title="Add New Category"
                open={isAddDialogOpen}
                onOk={handleAddCategory}
                onCancel={() => {
                    setIsAddDialogOpen(false);
                    setFormData({ name: '', description: '' });
                }}
                okText="Add Category"
                cancelText="Cancel"
            >
                <Form layout="vertical">
                    <Form.Item label="Category Name" required>
                        <Input
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Enter category name"
                        />
                    </Form.Item>
                    <Form.Item label="Description">
                        <Input.TextArea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Enter category description"
                            rows={3}
                        />
                    </Form.Item>
                </Form>
            </Modal>

            {/* Edit Modal */}
            <Modal
                title="Edit Category"
                open={isEditDialogOpen}
                onOk={handleEditCategory}
                onCancel={() => {
                    setIsEditDialogOpen(false);
                    setFormData({ name: '', description: '' });
                    setEditingCategory(null);
                }}
                okText="Update Category"
                cancelText="Cancel"
            >
                <Form layout="vertical">
                    <Form.Item label="Category Name" required>
                        <Input
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Enter category name"
                        />
                    </Form.Item>
                    <Form.Item label="Description">
                        <Input.TextArea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Enter category description"
                            rows={3}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ProjectCategories;