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
  Select,
  Card
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
  DownOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';

const { Content } = Layout;
const { Option } = Select;

interface TableItem {
  id: string;
  name: string;
  businessLocation: string;
  description: string;
  status: 'available' | 'occupied' | 'reserved';
  capacity: number;
}

const Tables: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTable, setEditingTable] = useState<TableItem | null>(null);
  const [form] = Form.useForm();
  const [tables, setTables] = useState<TableItem[]>([]);

  const businessLocations = [
    'Main Restaurant',
    'Outdoor Patio',
    'Private Dining Room 1',
    'Private Dining Room 2',
    'Bar Area'
  ];

  const handleAdd = () => {
    setEditingTable(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: TableItem) => {
    setEditingTable(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (record: TableItem) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this table?',
      content: `Table: ${record.name}`,
      onOk: () => {
        setTables(prev => prev.filter(table => table.id !== record.id));
        message.success('Table deleted successfully');
      },
      okText: 'Delete',
      cancelText: 'Cancel'
    });
  };

  const handleSubmit = () => {
    form.validateFields().then(values => {
      if (editingTable) {
        setTables(prev => prev.map(table => 
          table.id === editingTable.id 
            ? { ...table, ...values }
            : table
        ));
        message.success('Table updated successfully');
      } else {
        const newTable: TableItem = {
          id: `table-${Date.now()}`,
          ...values,
          status: 'available'
        };
        setTables(prev => [...prev, newTable]);
        message.success('Table added successfully');
      }
      setIsModalVisible(false);
      form.resetFields();
    });
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

  const actionMenuItems = (record: TableItem): MenuProps['items'] => [
    {
      key: 'view',
      label: 'View',
      icon: <EyeOutlined />,
      onClick: () => message.info(`Viewing table: ${record.name}`)
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

  const columns: ColumnsType<TableItem> = [
    {
      title: 'Table',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text: string, record: TableItem) => (
        <div>
          <div style={{ fontWeight: 'bold' }}>{text}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            Capacity: {record.capacity} persons
          </div>
        </div>
      )
    },
    {
      title: 'Business Location',
      dataIndex: 'businessLocation',
      key: 'businessLocation',
      sorter: (a, b) => a.businessLocation.localeCompare(b.businessLocation),
      filters: businessLocations.map(location => ({
        text: location,
        value: location
      })),
      onFilter: (value, record) => record.businessLocation === value
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      render: (text: string) => text || '-'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Available', value: 'available' },
        { text: 'Occupied', value: 'occupied' },
        { text: 'Reserved', value: 'reserved' }
      ],
      onFilter: (value, record) => record.status === value,
      render: (status: string) => {
        const colors = {
          available: '#52c41a',
          occupied: '#ff4d4f',
          reserved: '#faad14'
        };
        return (
          <span
            style={{
              color: colors[status as keyof typeof colors],
              fontWeight: 'bold',
              textTransform: 'capitalize'
            }}
          >
            {status}
          </span>
        );
      }
    },
    {
      title: 'Action',
      key: 'action',
      width: 80,
      render: (_, record: TableItem) => (
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

  const filteredTables = tables.filter(table =>
    table.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    table.businessLocation.toLowerCase().includes(searchValue.toLowerCase()) ||
    (table.description && table.description.toLowerCase().includes(searchValue.toLowerCase()))
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
              Tables
            </h1>
            <p style={{ color: '#6b7280', marginBottom: '20px' }}>
              Manage restaurant tables
            </p>
            
            {/* Search and Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
              <Input
                placeholder="Search"
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
              dataSource={filteredTables}
              rowKey="id"
              pagination={{
                total: filteredTables.length,
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
            title={editingTable ? 'Edit Table' : 'Add Table'}
            open={isModalVisible}
            onOk={handleSubmit}
            onCancel={() => {
              setIsModalVisible(false);
              form.resetFields();
            }}
            okText={editingTable ? 'Update' : 'Add'}
            cancelText="Cancel"
            width={600}
          >
            <Form form={form} layout="vertical">
              <Form.Item
                name="name"
                label="Table Name"
                rules={[{ required: true, message: 'Please enter table name' }]}
              >
                <Input placeholder="e.g., Table 1, Window Table" />
              </Form.Item>

              <Form.Item
                name="businessLocation"
                label="Business Location"
                rules={[{ required: true, message: 'Please select business location' }]}
              >
                <Select placeholder="Select business location">
                  {businessLocations.map(location => (
                    <Option key={location} value={location}>{location}</Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="description"
                label="Description"
              >
                <Input.TextArea 
                  rows={3}
                  placeholder="Optional description about the table"
                />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </Content>
    </Layout>
  );
};

export default Tables;
