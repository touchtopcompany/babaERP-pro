import React, { useState } from 'react';
import {
    Layout,
    Input,
    Button,
    Tree,
    Modal,
    Form,
    message,
    Dropdown,
    Space
} from 'antd';
import {
    SearchOutlined,
    FolderOutlined,
    FolderOpenOutlined,
    FileOutlined,
    PlusOutlined,
    MoreOutlined,
    EditOutlined,
    DeleteOutlined,
    DownloadOutlined,
    ShareAltOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import type { DataNode } from 'antd/es/tree';

const { Content } = Layout;

interface SpreadsheetItem {
    key: string;
    title: string;
    type: 'folder' | 'file';
    children?: SpreadsheetItem[];
    isLeaf?: boolean;
}

const Spreadsheet: React.FC = () => {
    const [searchValue, setSearchValue] = useState('');
    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
    const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
    const [isAddFolderModalVisible, setIsAddFolderModalVisible] = useState(false);
    const [isAddFileModalVisible, setIsAddFileModalVisible] = useState(false);
    const [contextMenuNode, setContextMenuNode] = useState<string | null>(null);
    const [form] = Form.useForm();

    const [treeData, setTreeData] = useState<SpreadsheetItem[]>([
        {
            key: 'my-spreadsheets',
            title: 'My Spreadsheets',
            type: 'folder',
            children: [
                {
                    key: 'untitled',
                    title: 'Untitled',
                    type: 'file',
                    isLeaf: true
                }
            ]
        }
    ]);

    const handleExpandAll = () => {
        const allKeys = getAllKeys(treeData);
        setExpandedKeys(allKeys);
    };

    const handleCollapseAll = () => {
        setExpandedKeys([]);
    };

    const getAllKeys = (data: SpreadsheetItem[]): React.Key[] => {
        let keys: React.Key[] = [];
        data.forEach(item => {
            keys.push(item.key);
            if (item.children) {
                keys = keys.concat(getAllKeys(item.children));
            }
        });
        return keys;
    };

    const handleAddFolder = () => {
        form.validateFields().then(values => {
            const newFolder: SpreadsheetItem = {
                key: `folder-${Date.now()}`,
                title: values.name,
                type: 'folder',
                children: []
            };

            setTreeData(prev => [...prev, newFolder]);
            setIsAddFolderModalVisible(false);
            form.resetFields();
            message.success('Folder created successfully');
        });
    };

    const handleAddFile = () => {
        form.validateFields().then(values => {
            const newFile: SpreadsheetItem = {
                key: `file-${Date.now()}`,
                title: values.name,
                type: 'file',
                isLeaf: true
            };

            if (selectedKeys.length > 0) {
                const updateTreeData = (data: SpreadsheetItem[]): SpreadsheetItem[] => {
                    return data.map(item => {
                        if (item.key === selectedKeys[0] && item.type === 'folder') {
                            return {
                                ...item,
                                children: [...(item.children || []), newFile]
                            };
                        }
                        if (item.children) {
                            return {
                                ...item,
                                children: updateTreeData(item.children)
                            };
                        }
                        return item;
                    });
                };
                setTreeData(updateTreeData(treeData));
            } else {
                setTreeData(prev => [...prev, newFile]);
            }

            setIsAddFileModalVisible(false);
            form.resetFields();
            message.success('File created successfully');
        });
    };

    const handleContextMenuClick: MenuProps['onClick'] = ({ key }) => {
        if (!contextMenuNode) return;

        switch (key) {
            case 'rename':
                Modal.confirm({
                    title: 'Rename',
                    content: (
                        <Input
                            placeholder="Enter new name"
                            onPressEnter={(e) => {
                                const newName = (e.target as HTMLInputElement).value;
                                updateItemName(contextMenuNode, newName);
                                Modal.destroyAll();
                            }}
                        />
                    ),
                    okText: 'Rename',
                    cancelText: 'Cancel'
                });
                break;
            case 'delete':
                Modal.confirm({
                    title: 'Are you sure you want to delete this item?',
                    onOk: () => deleteItem(contextMenuNode),
                    okText: 'Delete',
                    cancelText: 'Cancel'
                });
                break;
            case 'download':
                message.info('Download started');
                break;
            case 'share':
                message.info('Share link copied to clipboard');
                break;
        }
        setContextMenuNode(null);
    };

    const updateItemName = (key: string, newName: string) => {
        const updateTree = (data: SpreadsheetItem[]): SpreadsheetItem[] => {
            return data.map(item => {
                if (item.key === key) {
                    return { ...item, title: newName };
                }
                if (item.children) {
                    return {
                        ...item,
                        children: updateTree(item.children)
                    };
                }
                return item;
            });
        };
        setTreeData(updateTree(treeData));
        message.success('Item renamed successfully');
    };

    const deleteItem = (key: string) => {
        const deleteFromTree = (data: SpreadsheetItem[]): SpreadsheetItem[] => {
            return data.filter(item => item.key !== key).map(item => {
                if (item.children) {
                    return {
                        ...item,
                        children: deleteFromTree(item.children)
                    };
                }
                return item;
            });
        };
        setTreeData(deleteFromTree(treeData));
        message.success('Item deleted successfully');
    };

    const contextMenuItems: MenuProps['items'] = [
        { key: 'rename', label: 'Rename', icon: <EditOutlined /> },
        { key: 'delete', label: 'Delete', icon: <DeleteOutlined /> },
        { type: 'divider' },
        { key: 'download', label: 'Download', icon: <DownloadOutlined /> },
        { key: 'share', label: 'Share', icon: <ShareAltOutlined /> }
    ];

    const convertToTreeData = (data: SpreadsheetItem[]): DataNode[] => {
        return data.map(item => ({
            key: item.key,
            title: (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {item.type === 'folder' ? (
                            expandedKeys.includes(item.key) ? <FolderOpenOutlined /> : <FolderOutlined />
                        ) : (
                            <FileOutlined />
                        )}
                        {item.title}
                    </span>
                    {item.type === 'file' && (
                        <Dropdown
                            menu={{ items: contextMenuItems, onClick: handleContextMenuClick }}
                            trigger={['click']}
                            onOpenChange={(open) => {
                                if (open) {
                                    setContextMenuNode(item.key);
                                }
                            }}
                        >
                            <Button
                                type="text"
                                size="small"
                                icon={<MoreOutlined />}
                                onClick={(e) => e.stopPropagation()}
                            />
                        </Dropdown>
                    )}
                </div>
            ),
            icon: item.type === 'folder' ? (
                expandedKeys.includes(item.key) ? <FolderOpenOutlined /> : <FolderOutlined />
            ) : (
                <FileOutlined />
            ),
            children: item.children ? convertToTreeData(item.children) : undefined,
            isLeaf: item.isLeaf
        }));
    };

    const onExpand = (expandedKeysValue: React.Key[]) => {
        setExpandedKeys(expandedKeysValue);
    };

    const onSelect = (selectedKeysValue: React.Key[]) => {
        setSelectedKeys(selectedKeysValue);
    };

    const onRightClick = ({ node }: { node: any }) => {
        if (node.key !== 'my-spreadsheets') {
            setContextMenuNode(node.key);
        }
    };

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
                            Spreadsheet
                        </h1>

                        {/* Search and Actions */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '15px' }}>
                            <Input
                                placeholder="Search"
                                prefix={<SearchOutlined style={{ color: 'rgba(9, 9, 9, 0.5)' }} />}
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                style={{
                                    flex: 1,
                                    maxWidth: '400px',
                                    borderRadius: '15px',
                                    background: '#f0f2f5',
                                    border: '1px solid transparent',
                                    height: '40px'
                                }}
                            />

                            <Space>
                                <Button
                                    onClick={handleExpandAll}
                                    style={{ borderRadius: '8px' }}
                                >
                                    Expand all
                                </Button>
                                <Button
                                    onClick={handleCollapseAll}
                                    style={{ borderRadius: '8px' }}
                                >
                                    Collapse all
                                </Button>
                                <Button
                                    type="primary"
                                    icon={<PlusOutlined />}
                                    onClick={() => setIsAddFolderModalVisible(true)}
                                    style={{
                                        background: '#0d9488',
                                        borderColor: '#0d9488',
                                        borderRadius: '8px'
                                    }}
                                >
                                    Add Folder
                                </Button>
                            </Space>
                        </div>
                    </div>

                    {/* Tree View */}
                    <div style={{
                        background: 'white',
                        borderRadius: '12px',
                        padding: '20px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                    }}>
                        <Tree
                            showLine
                            treeData={convertToTreeData(treeData)}
                            expandedKeys={expandedKeys}
                            selectedKeys={selectedKeys}
                            onExpand={onExpand}
                            onSelect={onSelect}
                            onRightClick={onRightClick}
                            style={{ fontSize: '14px' }}
                        />
                    </div>

                    {/* Add Folder Modal */}
                    <Modal
                        title="Add New Folder"
                        open={isAddFolderModalVisible}
                        onOk={handleAddFolder}
                        onCancel={() => {
                            setIsAddFolderModalVisible(false);
                            form.resetFields();
                        }}
                        okText="Create"
                        cancelText="Cancel"
                    >
                        <Form form={form} layout="vertical">
                            <Form.Item
                                name="name"
                                label="Folder Name"
                                rules={[{ required: true, message: 'Please enter folder name' }]}
                            >
                                <Input placeholder="Enter folder name" />
                            </Form.Item>
                        </Form>
                    </Modal>

                    {/* Add File Modal */}
                    <Modal
                        title="Add New Spreadsheet"
                        open={isAddFileModalVisible}
                        onOk={handleAddFile}
                        onCancel={() => {
                            setIsAddFileModalVisible(false);
                            form.resetFields();
                        }}
                        okText="Create"
                        cancelText="Cancel"
                    >
                        <Form form={form} layout="vertical">
                            <Form.Item
                                name="name"
                                label="Spreadsheet Name"
                                rules={[{ required: true, message: 'Please enter spreadsheet name' }]}
                            >
                                <Input placeholder="Enter spreadsheet name" />
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            </Content>
        </Layout>
    );
};

export default Spreadsheet;