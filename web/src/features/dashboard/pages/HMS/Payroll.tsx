import React, { useState } from 'react';
import {
    Card,
    Tabs,
    Select,
    Input,
    Button,
    Space,
    Table,
    Dropdown,
    Menu,
    Modal,
    Form,
    DatePicker,
    InputNumber
} from 'antd';
import {
    SearchOutlined,
    DownloadOutlined,
    PrinterOutlined,
    EyeOutlined,
    PlusOutlined,
    FilterOutlined,
    FileExcelOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Option } = Select;
const { Search } = Input;
const { TabPane } = Tabs;

interface PayrollRecord {
    key: string;
    employee: string;
    department: string;
    designation: string;
    monthYear: string;
    referenceNo: string;
    totalAmount: number;
    paymentStatus: 'Paid' | 'Pending' | 'Partial';
}

interface PayrollGroupRecord {
    key: string;
    groupName: string;
    groupType: string;
    employeeCount: number;
    totalAmount: number;
    paymentStatus: 'Paid' | 'Pending' | 'Partial';
    createdDate: string;
}

interface PayComponentRecord {
    key: string;
    description: string;
    type: 'Earning' | 'Deduction';
    amount: number;
    applicableDate: string;
    employee: string;
}

const Payroll: React.FC = () => {
    const [activeTab, setActiveTab] = useState('payrolls');
    const [showEntries, setShowEntries] = useState('10');
    const [filterDepartment, setFilterDepartment] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [form] = Form.useForm();

    // Sample data - replace with actual API call
    const payrollData: PayrollRecord[] = [];
    const payrollGroupsData: PayrollGroupRecord[] = [];
    const payComponentsData: PayComponentRecord[] = [];

    const payrollColumns: ColumnsType<PayrollRecord> = [
        {
            title: 'Employee',
            dataIndex: 'employee',
            key: 'employee',
            sorter: (a, b) => a.employee.localeCompare(b.employee),
        },
        {
            title: 'Department',
            dataIndex: 'department',
            key: 'department',
            sorter: (a, b) => a.department.localeCompare(b.department),
        },
        {
            title: 'Designation',
            dataIndex: 'designation',
            key: 'designation',
            sorter: (a, b) => a.designation.localeCompare(b.designation),
        },
        {
            title: 'Month/Year',
            dataIndex: 'monthYear',
            key: 'monthYear',
            sorter: (a, b) => a.monthYear.localeCompare(b.monthYear),
        },
        {
            title: 'Reference No',
            dataIndex: 'referenceNo',
            key: 'referenceNo',
        },
        {
            title: 'Total amount',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            render: (amount: number) => `₦${amount.toLocaleString()}`,
            sorter: (a, b) => a.totalAmount - b.totalAmount,
        },
        {
            title: 'Payment Status',
            dataIndex: 'paymentStatus',
            key: 'paymentStatus',
            render: (status: string) => (
                <span
                    style={{
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 500,
                        backgroundColor:
                            status === 'Paid' ? '#f6ffed' :
                                status === 'Pending' ? '#fff2e8' : '#e6f7ff',
                        color:
                            status === 'Paid' ? '#52c41a' :
                                status === 'Pending' ? '#fa8c16' : '#1890ff',
                    }}
                >
                    {status}
                </span>
            ),
            sorter: (a, b) => a.paymentStatus.localeCompare(b.paymentStatus),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="text"
                        icon={<PrinterOutlined />}
                        size="small"
                        onClick={() => console.log('Viewing payroll for', record.employee)}
                    />
                    <Dropdown
                        overlay={
                            <Menu>
                                <Menu.Item key="edit" onClick={() => console.log('Editing payroll for', record.employee)}>
                                    Edit
                                </Menu.Item>
                                <Menu.Item key="delete" onClick={() => console.log('Deleting payroll for', record.employee)}>
                                    Delete
                                </Menu.Item>
                            </Menu>
                        }
                        trigger={['click']}
                    >
                        <Button type="text" size="small">
                            <FilterOutlined />
                        </Button>
                    </Dropdown>
                </Space>
            ),
        },
    ];

    const payrollGroupsColumns: ColumnsType<PayrollGroupRecord> = [
        {
            title: 'Group Name',
            dataIndex: 'groupName',
            key: 'groupName',
            sorter: (a, b) => a.groupName.localeCompare(b.groupName),
        },
        {
            title: 'Group Type',
            dataIndex: 'groupType',
            key: 'groupType',
            render: (type: string) => (
                <span
                    style={{
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 500,
                        backgroundColor: '#f0f5ff',
                        color: '#1890ff',
                    }}
                >
                    {type}
                </span>
            ),
        },
        {
            title: 'Employees Count',
            dataIndex: 'employeeCount',
            key: 'employeeCount',
            sorter: (a, b) => a.employeeCount - b.employeeCount,
        },
        {
            title: 'Total Amount',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            render: (amount: number) => `₦${amount.toLocaleString()}`,
            sorter: (a, b) => a.totalAmount - b.totalAmount,
        },
        {
            title: 'Payment Status',
            dataIndex: 'paymentStatus',
            key: 'paymentStatus',
            render: (status: string) => (
                <span
                    style={{
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 500,
                        backgroundColor:
                            status === 'Paid' ? '#f6ffed' :
                                status === 'Pending' ? '#fff2e8' : '#e6f7ff',
                        color:
                            status === 'Paid' ? '#52c41a' :
                                status === 'Pending' ? '#fa8c16' : '#1890ff',
                    }}
                >
                    {status}
                </span>
            ),
            sorter: (a, b) => a.paymentStatus.localeCompare(b.paymentStatus),
        },
        {
            title: 'Created Date',
            dataIndex: 'createdDate',
            key: 'createdDate',
            sorter: (a, b) => a.createdDate.localeCompare(b.createdDate),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="text"
                        icon={<EyeOutlined />}
                        size="small"
                        onClick={() => console.log('Viewing group:', record.groupName)}
                    />
                    <Button
                        type="text"
                        icon={<PrinterOutlined />}
                        size="small"
                        onClick={() => console.log('Printing group:', record.groupName)}
                    />
                    <Dropdown
                        overlay={
                            <Menu>
                                <Menu.Item key="edit" onClick={() => console.log('Editing group:', record.groupName)}>
                                    Edit
                                </Menu.Item>
                                <Menu.Item key="delete" onClick={() => console.log('Deleting group:', record.groupName)}>
                                    Delete
                                </Menu.Item>
                            </Menu>
                        }
                        trigger={['click']}
                    >
                        <Button type="text" size="small">
                            <FilterOutlined />
                        </Button>
                    </Dropdown>
                </Space>
            ),
        },
    ];

    const payComponentsColumns: ColumnsType<PayComponentRecord> = [
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            sorter: (a, b) => a.description.localeCompare(b.description),
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (type: string) => (
                <span
                    style={{
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 500,
                        backgroundColor: type === 'Earning' ? '#f6ffed' : '#fff2e8',
                        color: type === 'Earning' ? '#52c41a' : '#fa8c16',
                    }}
                >
                    {type}
                </span>
            ),
            sorter: (a, b) => a.type.localeCompare(b.type),
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount: number) => `₦${amount.toLocaleString()}`,
            sorter: (a, b) => a.amount - b.amount,
        },
        {
            title: 'Applicable Date',
            dataIndex: 'applicableDate',
            key: 'applicableDate',
            sorter: (a, b) => a.applicableDate.localeCompare(b.applicableDate),
        },
        {
            title: 'Employee',
            dataIndex: 'employee',
            key: 'employee',
            sorter: (a, b) => a.employee.localeCompare(b.employee),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="text"
                        icon={<EyeOutlined />}
                        size="small"
                        onClick={() => console.log('Viewing pay component:', record.description)}
                    />
                    <Dropdown
                        overlay={
                            <Menu>
                                <Menu.Item key="edit" onClick={() => console.log('Editing pay component:', record.description)}>
                                    Edit
                                </Menu.Item>
                                <Menu.Item key="delete" onClick={() => console.log('Deleting pay component:', record.description)}>
                                    Delete
                                </Menu.Item>
                            </Menu>
                        }
                        trigger={['click']}
                    >
                        <Button type="text" size="small">
                            <FilterOutlined />
                        </Button>
                    </Dropdown>
                </Space>
            ),
        },
    ];

    const exportMenu = (
        <Menu>
            <Menu.Item key="csv" icon={<FileExcelOutlined />} onClick={() => console.log('Exporting as CSV')}>
                Export CSV
            </Menu.Item>
            <Menu.Item key="excel" icon={<FileExcelOutlined />} onClick={() => console.log('Exporting as Excel')}>
                Export Excel
            </Menu.Item>
            <Menu.Item key="pdf" icon={<FileExcelOutlined />} onClick={() => console.log('Exporting as PDF')}>
                Export PDF
            </Menu.Item>
        </Menu>
    );

    const handlePrint = () => {
        window.print();
    };

    const handleAddPayroll = () => {
        form.validateFields().then(values => {
            console.log('New payroll:', values);
            console.log('Payroll added successfully');
            setAddModalVisible(false);
            form.resetFields();
        });
    };

    return (
        <div className="payroll-container">
            <Card>
                <Tabs activeKey={activeTab} onChange={setActiveTab}>
                    <TabPane tab="All Payrolls" key="payrolls">
                        {/* Filters Section */}
                        <div style={{ marginBottom: 16, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                            <Space>
                                <FilterOutlined />
                                <span style={{ fontWeight: 500 }}>Filter:</span>
                            </Space>

                            <Select
                                placeholder="Select Department"
                                style={{ width: 150 }}
                                value={filterDepartment}
                                onChange={setFilterDepartment}
                                allowClear
                            >
                                <Option value="it">IT Department</Option>
                                <Option value="hr">HR Department</Option>
                                <Option value="finance">Finance Department</Option>
                                <Option value="operations">Operations</Option>
                            </Select>

                            <Select
                                placeholder="Payment Status"
                                style={{ width: 150 }}
                                value={filterStatus}
                                onChange={setFilterStatus}
                                allowClear
                            >
                                <Option value="paid">Paid</Option>
                                <Option value="pending">Pending</Option>
                                <Option value="partial">Partial</Option>
                            </Select>

                            <Search
                                placeholder="Search employees..."
                                style={{ width: 200 }}
                                onSearch={(value) => console.log('Searching:', value)}
                                onChange={(e) => console.log('Search input:', e.target.value)}
                            />

                            <Button icon={<SearchOutlined />} type="primary">
                                Search
                            </Button>
                        </div>

                        {/* Table Actions */}
                        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Space>
                                <span>Show</span>
                                <Select
                                    value={showEntries}
                                    onChange={setShowEntries}
                                    style={{ width: 80 }}
                                >
                                    <Option value="10">10</Option>
                                    <Option value="25">25</Option>
                                    <Option value="50">50</Option>
                                    <Option value="100">100</Option>
                                </Select>
                                <span>entries</span>
                            </Space>

                            <Space>
                                <Dropdown overlay={exportMenu} placement="bottomRight">
                                    <Button icon={<DownloadOutlined />}>
                                        Export
                                    </Button>
                                </Dropdown>

                                <Button icon={<PrinterOutlined />} onClick={handlePrint}>
                                    Print
                                </Button>

                                <Button icon={<EyeOutlined />}>
                                    Column Visibility
                                </Button>

                                <Button
                                    type="primary"
                                    icon={<PlusOutlined />}
                                    onClick={() => setAddModalVisible(true)}
                                >
                                    Add
                                </Button>
                            </Space>
                        </div>

                        {/* Data Table */}
                        <Table
                            columns={payrollColumns}
                            dataSource={payrollData}
                            pagination={{
                                current: 1,
                                pageSize: parseInt(showEntries),
                                total: payrollData.length,
                                showSizeChanger: false,
                                showQuickJumper: true,
                                showTotal: (total, range) =>
                                    `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                            }}
                            size="middle"
                            scroll={{ x: 'max-content' }}
                        />
                    </TabPane>

                    <TabPane tab="All payroll groups" key="groups">
                        {/* Filters Section */}
                        <div style={{ marginBottom: 16, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                            <Space>
                                <FilterOutlined />
                                <span style={{ fontWeight: 500 }}>Filter:</span>
                            </Space>

                            <Select
                                placeholder="Select Group Type"
                                style={{ width: 150 }}
                                allowClear
                            >
                                <Option value="department">Department</Option>
                                <Option value="designation">Designation</Option>
                                <Option value="location">Location</Option>
                                <Option value="custom">Custom Group</Option>
                            </Select>

                            <Select
                                placeholder="Payment Status"
                                style={{ width: 150 }}
                                allowClear
                            >
                                <Option value="paid">Paid</Option>
                                <Option value="pending">Pending</Option>
                                <Option value="partial">Partial</Option>
                            </Select>

                            <Search
                                placeholder="Search groups..."
                                style={{ width: 200 }}
                                onSearch={(value) => console.log('Searching groups:', value)}
                                onChange={(e) => console.log('Group search input:', e.target.value)}
                            />

                            <Button icon={<SearchOutlined />} type="primary">
                                Search
                            </Button>
                        </div>

                        {/* Table Actions */}
                        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Space>
                                <span>Show</span>
                                <Select
                                    value={showEntries}
                                    onChange={setShowEntries}
                                    style={{ width: 80 }}
                                >
                                    <Option value="10">10</Option>
                                    <Option value="25">25</Option>
                                    <Option value="50">50</Option>
                                    <Option value="100">100</Option>
                                </Select>
                                <span>entries</span>
                            </Space>

                            <Space>
                                <Dropdown overlay={exportMenu} placement="bottomRight">
                                    <Button icon={<DownloadOutlined />}>
                                        Export
                                    </Button>
                                </Dropdown>

                                <Button icon={<PrinterOutlined />} onClick={handlePrint}>
                                    Print
                                </Button>

                                <Button icon={<EyeOutlined />}>
                                    Column Visibility
                                </Button>

                                <Button
                                    type="primary"
                                    icon={<PlusOutlined />}
                                    onClick={() => console.log('Add new payroll group')}
                                >
                                    Add Group
                                </Button>
                            </Space>
                        </div>

                        {/* Payroll Groups Table */}
                        <Table
                            columns={payrollGroupsColumns}
                            dataSource={payrollGroupsData}
                            pagination={{
                                current: 1,
                                pageSize: parseInt(showEntries),
                                total: 0,
                                showSizeChanger: false,
                                showQuickJumper: true,
                                showTotal: (total, range) =>
                                    `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                            }}
                            size="middle"
                            scroll={{ x: 'max-content' }}
                        />
                    </TabPane>

                    <TabPane tab="Pay Components" key="components">
                        {/* Filters Section */}
                        <div style={{ marginBottom: 16, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                            <Space>
                                <FilterOutlined />
                                <span style={{ fontWeight: 500 }}>Filter:</span>
                            </Space>

                            <Select
                                placeholder="Select Type"
                                style={{ width: 150 }}
                                allowClear
                            >
                                <Option value="earning">Earning</Option>
                                <Option value="deduction">Deduction</Option>
                            </Select>

                            <Select
                                placeholder="Select Employee"
                                style={{ width: 150 }}
                                allowClear
                            >
                                <Option value="emp1">John Doe</Option>
                                <Option value="emp2">Jane Smith</Option>
                                <Option value="emp3">Mike Johnson</Option>
                            </Select>

                            <Search
                                placeholder="Search components..."
                                style={{ width: 200 }}
                                onSearch={(value) => console.log('Searching components:', value)}
                                onChange={(e) => console.log('Component search input:', e.target.value)}
                            />

                            <Button icon={<SearchOutlined />} type="primary">
                                Search
                            </Button>
                        </div>

                        {/* Table Actions */}
                        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Space>
                                <span>Show</span>
                                <Select
                                    value={showEntries}
                                    onChange={setShowEntries}
                                    style={{ width: 80 }}
                                >
                                    <Option value="10">10</Option>
                                    <Option value="25">25</Option>
                                    <Option value="50">50</Option>
                                    <Option value="100">100</Option>
                                </Select>
                                <span>entries</span>
                            </Space>

                            <Space>
                                <Dropdown overlay={exportMenu} placement="bottomRight">
                                    <Button icon={<DownloadOutlined />}>
                                        Export
                                    </Button>
                                </Dropdown>

                                <Button icon={<PrinterOutlined />} onClick={handlePrint}>
                                    Print
                                </Button>

                                <Button icon={<EyeOutlined />}>
                                    Column Visibility
                                </Button>

                                <Button
                                    type="primary"
                                    icon={<PlusOutlined />}
                                    onClick={() => console.log('Add new pay component')}
                                >
                                    Add
                                </Button>
                            </Space>
                        </div>

                        {/* Pay Components Table */}
                        <Table
                            columns={payComponentsColumns}
                            dataSource={payComponentsData}
                            pagination={{
                                current: 1,
                                pageSize: parseInt(showEntries),
                                total: 0,
                                showSizeChanger: false,
                                showQuickJumper: true,
                                showTotal: (total, range) =>
                                    `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                            }}
                            size="middle"
                            scroll={{ x: 'max-content' }}
                        />
                    </TabPane>
                </Tabs>
            </Card>

            {/* Add Payroll Modal */}
            <Modal
                title="Add New Payroll"
                open={addModalVisible}
                onOk={handleAddPayroll}
                onCancel={() => {
                    setAddModalVisible(false);
                    form.resetFields();
                }}
                width={600}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="employee"
                        label="Employee"
                        rules={[{ required: true, message: 'Please select an employee' }]}
                    >
                        <Select placeholder="Select Employee">
                            <Option value="emp1">John Doe</Option>
                            <Option value="emp2">Jane Smith</Option>
                            <Option value="emp3">Mike Johnson</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="monthYear"
                        label="Month/Year"
                        rules={[{ required: true, message: 'Please select month/year' }]}
                    >
                        <DatePicker picker="month" style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name="basicSalary"
                        label="Basic Salary"
                        rules={[{ required: true, message: 'Please enter basic salary' }]}
                    >
                        <InputNumber
                            style={{ width: '100%' }}
                            formatter={value => `₦ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value!.replace(/₦\s?|(,*)/g, '')}
                        />
                    </Form.Item>

                    <Form.Item
                        name="allowances"
                        label="Allowances"
                    >
                        <InputNumber
                            style={{ width: '100%' }}
                            formatter={value => `₦ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value!.replace(/₦\s?|(,*)/g, '')}
                        />
                    </Form.Item>

                    <Form.Item
                        name="deductions"
                        label="Deductions"
                    >
                        <InputNumber
                            style={{ width: '100%' }}
                            formatter={value => `₦ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value!.replace(/₦\s?|(,*)/g, '')}
                        />
                    </Form.Item>

                    <Form.Item
                        name="paymentStatus"
                        label="Payment Status"
                        rules={[{ required: true, message: 'Please select payment status' }]}
                    >
                        <Select placeholder="Select Status">
                            <Option value="paid">Paid</Option>
                            <Option value="pending">Pending</Option>
                            <Option value="partial">Partial</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Payroll;