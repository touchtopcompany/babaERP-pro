import React, { useState } from 'react';
import {
    Layout,
    Input,
    Button,
    Table,
    Space,
    Dropdown,
    Modal,
    Form,
    message,
    Card,
    Tag
} from 'antd';
import {
    SearchOutlined,
    PlusOutlined,
    ExportOutlined,
    PrinterOutlined,
    FileExcelOutlined,
    FilePdfOutlined,
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
    MoreOutlined,
    DownOutlined,
    AppstoreOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';

const { Content } = Layout;

interface ModifierItem {
    id: string;
    name: string;
    modifiers: { name: string; price: number }[];
    description?: string;
}

const Modifier: React.FC = () => {
    const [searchValue, setSearchValue] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingModifier, setEditingModifier] = useState<ModifierItem | null>(null);
    const [form] = Form.useForm();
    const [modifiers, setModifiers] = useState<ModifierItem[]>([]);
    const [currentModifiers, setCurrentModifiers] = useState<{ name: string; price: number }[]>([
        { name: '', price: 0 }
    ]);

    const handleAdd = () => {
        setEditingModifier(null);
        form.resetFields();
        setCurrentModifiers([{ name: '', price: 0 }]);
        setIsModalVisible(true);
    };

    const handleEdit = (record: ModifierItem) => {
        setEditingModifier(record);
        form.setFieldsValue(record);
        setCurrentModifiers(record.modifiers.length > 0 ? record.modifiers : [{ name: '', price: 0 }]);
        setIsModalVisible(true);
    };

    const addModifierField = () => {
        setCurrentModifiers([...currentModifiers, { name: '', price: 0 }]);
    };

    const removeModifierField = (index: number) => {
        const newModifiers = currentModifiers.filter((_, i) => i !== index);
        setCurrentModifiers(newModifiers.length > 0 ? newModifiers : [{ name: '', price: 0 }]);
    };

    const updateModifierField = (index: number, field: 'name' | 'price', value: string | number) => {
        const newModifiers = [...currentModifiers];
        if (field === 'price') {
            newModifiers[index][field] = Number(value);
        } else {
            newModifiers[index][field] = value as string;
        }
        setCurrentModifiers(newModifiers);
    };

    const handleDelete = (record: ModifierItem) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this modifier set?',
            content: `Modifier Set: ${record.name}`,
            onOk: () => {
                setModifiers(prev => prev.filter(modifier => modifier.id !== record.id));
                message.success('Modifier set deleted successfully');
            },
            okText: 'Delete',
            cancelText: 'Cancel'
        });
    };

    const handleSubmit = () => {
        const validModifiers = currentModifiers.filter(mod => mod.name.trim() !== '');
        if (validModifiers.length === 0) {
            message.error('Please add at least one modifier');
            return;
        }

        const values = {
            name: form.getFieldValue('name'),
            description: form.getFieldValue('description'),
            modifiers: validModifiers
        };

        if (editingModifier) {
            setModifiers(prev => prev.map(modifier =>
                modifier.id === editingModifier.id
                    ? { ...modifier, ...values }
                    : modifier
            ));
            message.success('Modifier set updated successfully');
        } else {
            const newModifier: ModifierItem = {
                id: `modifier-${Date.now()}`,
                ...values
            };
            setModifiers(prev => [...prev, newModifier]);
            message.success('Modifier set added successfully');
        }
        setIsModalVisible(false);
        form.resetFields();
        setCurrentModifiers([{ name: '', price: 0 }]);
    };

    const exportMenuItems: MenuProps['items'] = [
        {
            key: 'csv',
            label: 'Export as CSV',
            icon: <ExportOutlined />,
            onClick: () => message.info('Exporting as CSV...')
        },
        {
            key: 'excel',
            label: 'Export as Excel',
            icon: <FileExcelOutlined />,
            onClick: () => message.info('Exporting as Excel...')
        },
        {
            key: 'pdf',
            label: 'Export as PDF',
            icon: <FilePdfOutlined />,
            onClick: () => message.info('Exporting as PDF...')
        },
        {
            key: 'print',
            label: 'Print',
            icon: <PrinterOutlined />,
            onClick: () => message.info('Opening print dialog...')
        }
    ];

    const actionMenuItems = (record: ModifierItem): MenuProps['items'] => [
        {
            key: 'view',
            label: 'View',
            icon: <EyeOutlined />,
            onClick: () => message.info(`Viewing modifier set: ${record.name}`)
        },
        {
            key: 'edit',
            label: 'Edit',
            icon: <EditOutlined />,
            onClick: () => handleEdit(record)
        },
        {
            key: 'delete',
            label: 'Delete',
            icon: <DeleteOutlined />,
            onClick: () => handleDelete(record),
            danger: true
        }
    ];

    const columns: ColumnsType<ModifierItem> = [
        {
            title: 'Modifier Sets',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            render: (text: string, record: ModifierItem) => (
                <div>
                    <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <AppstoreOutlined style={{ color: '#0d9488' }} />
                        {text}
                    </div>
                    {record.description && (
                        <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                            {record.description}
                        </div>
                    )}
                </div>
            )
        },
        {
            title: 'Modifiers',
            dataIndex: 'modifiers',
            key: 'modifiers',
            render: (modifiers: { name: string; price: number }[]) => (
                <div>
                    {modifiers.length > 0 ? (
                        <div>
                            {modifiers.slice(0, 3).map((modifier, index) => (
                                <Tag key={index} style={{ marginBottom: '4px' }}>
                                    {modifier.name}
                                </Tag>
                            ))}
                            {modifiers.length > 3 && (
                                <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                                    +{modifiers.length - 3} more
                                </div>
                            )}
                        </div>
                    ) : (
                        <span style={{ color: '#999' }}>No modifiers</span>
                    )}
                </div>
            )
        },
        {
            title: 'Action',
            key: 'action',
            width: 80,
            render: (_, record: ModifierItem) => (
                <Dropdown
                    menu={{ items: actionMenuItems(record) }}
                    trigger={['click']}
                >
                    <Button
                        type="text"
                        icon={<MoreOutlined />}
                        onClick={(e) => e.stopPropagation()}
                    />
                </Dropdown>
            )
        }
    ];

    const filteredModifiers = modifiers.filter(modifier =>
        modifier.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        modifier.modifiers.some(mod => mod.name.toLowerCase().includes(searchValue.toLowerCase())) ||
        (modifier.description && modifier.description.toLowerCase().includes(searchValue.toLowerCase()))
    );

    return (
        <Layout style={{ minHeight: '100vh', background: '#0d9488' }}>
            <Content style={{ minHeight: '100vh' }}>
                <div style={{
                    background: '#F8FAFC',
                    minHeight: '100vh',
                    width: '100%',
                    borderRadius: '50px 0 0 50px',
                    padding: '40px 50px',
                    boxShadow: '-15px 0 30px rgba(0,0,0,0.1)'
                }}>
                    {/* Header */}
                    <div style={{ marginBottom: '30px' }}>
                        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', marginBottom: '20px' }}>
                            Modifier Sets
                        </h1>
                        <p style={{ color: '#6b7280', marginBottom: '20px' }}>
                            Manage restaurant modifier sets and their options
                        </p>

                        {/* Search and Actions */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                            <Input
                                placeholder="Search modifier sets..."
                                prefix={<SearchOutlined style={{ color: 'rgba(9, 9, 9, 0.5)' }} />}
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                style={{
                                    flex: 1,
                                    maxWidth: '300px',
                                    borderRadius: '8px',
                                    height: '40px'
                                }}
                            />

                            <Space>
                                <Button
                                    icon={<PlusOutlined />}
                                    type="primary"
                                    onClick={handleAdd}
                                    style={{
                                        background: '#0d9488',
                                        borderColor: '#0d9488',
                                        borderRadius: '8px'
                                    }}
                                >
                                    Add
                                </Button>

                                <Dropdown menu={{ items: exportMenuItems }} placement="bottomRight">
                                    <Button
                                        icon={<ExportOutlined />}
                                        style={{ borderRadius: '8px' }}
                                    >
                                        Export <DownOutlined />
                                    </Button>
                                </Dropdown>
                            </Space>
                        </div>
                    </div>

                    {/* Table */}
                    <Card style={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                        <Table
                            columns={columns}
                            dataSource={filteredModifiers}
                            rowKey="id"
                            pagination={{
                                total: filteredModifiers.length,
                                pageSize: 10,
                                showSizeChanger: true,
                                showQuickJumper: true,
                                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
                            }}
                            locale={{
                                emptyText: 'No data available in table'
                            }}
                        />
                    </Card>

                    {/* Add/Edit Modal */}
                    <Modal
                        title={editingModifier ? 'Edit Modifier Set' : 'Add Modifier Set'}
                        open={isModalVisible}
                        onOk={handleSubmit}
                        onCancel={() => {
                            setIsModalVisible(false);
                            form.resetFields();
                        }}
                        okText={editingModifier ? 'Update' : 'Add'}
                        cancelText="Cancel"
                        width={700}
                    >
                        <Form form={form} layout="vertical">
                            <Form.Item
                                name="name"
                                label="Modifier Set*"
                                rules={[{ required: true, message: 'Please enter modifier set name' }]}
                            >
                                <Input placeholder="e.g., Pizza Toppings, Burger Options" />
                            </Form.Item>

                            <Form.Item
                                name="description"
                                label="Description"
                            >
                                <Input.TextArea
                                    rows={2}
                                    placeholder="Optional description about this modifier set"
                                />
                            </Form.Item>

                            <Form.Item label="Modifiers">
                                {currentModifiers.map((modifier, index) => (
                                    <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
                                        <Form.Item
                                            style={{ flex: 1, marginBottom: 0 }}
                                            rules={[{ required: true, message: 'Required' }]}
                                        >
                                            <Input
                                                placeholder="Name"
                                                value={modifier.name}
                                                onChange={(e) => updateModifierField(index, 'name', e.target.value)}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            style={{ flex: 1, marginBottom: 0 }}
                                            rules={[{ required: true, message: 'Required' }]}
                                        >
                                            <Input
                                                type="number"
                                                placeholder="Price"
                                                value={modifier.price}
                                                onChange={(e) => updateModifierField(index, 'price', e.target.value)}
                                                prefix="$"
                                            />
                                        </Form.Item>
                                        {currentModifiers.length > 1 && (
                                            <Button
                                                type="text"
                                                icon={<DeleteOutlined />}
                                                onClick={() => removeModifierField(index)}
                                                style={{ color: '#ff4d4f' }}
                                            />
                                        )}
                                    </div>
                                ))}
                                <Button
                                    type="dashed"
                                    icon={<PlusOutlined />}
                                    onClick={addModifierField}
                                    style={{ width: '100%', marginTop: '10px' }}
                                >
                                    Add Modifier
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            </Content>
        </Layout>
    );
};

export default Modifier;