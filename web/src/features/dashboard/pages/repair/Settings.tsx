import { useState, useEffect } from 'react';
import { Card, Table, Button, Input, Form, Select, Modal, Space, Typography, notification, Tabs, Radio, Dropdown, Menu, Checkbox } from 'antd';
import { PlusOutlined, EditOutlined, DownloadOutlined, PrinterOutlined, FileTextOutlined, DeleteOutlined, SearchOutlined, CheckCircleOutlined, MobileOutlined, TabletOutlined, SettingOutlined, FilePdfOutlined, InfoCircleOutlined, BoldOutlined, ItalicOutlined, AlignLeftOutlined, AlignCenterOutlined, AlignRightOutlined, UnorderedListOutlined, OrderedListOutlined, LinkOutlined, PictureOutlined, PrinterOutlined as PrintIcon } from '@ant-design/icons';

const { Title } = Typography;

// Rich Text Editor Component
const RichTextEditor = ({ value, onChange }: { value?: string; onChange?: (value: string) => void }) => {
    const [text, setText] = useState(value || '');

    const handleCommand = (command: string) => {
        document.execCommand(command, false);
    };

    const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
        const content = e.currentTarget.innerHTML || '';
        setText(content);
        onChange?.(content);
    };

    useEffect(() => {
        const editor = document.getElementById('editor-content');
        if (editor && text) {
            editor.innerHTML = text;
        }
    }, []);

    return (
        <div style={{ border: '1px solid #d9d9d9', borderRadius: '6px' }}>
            {/* Toolbar */}
            <div style={{
                backgroundColor: '#fafafa',
                padding: '8px 12px',
                borderBottom: '1px solid #d9d9d9',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                flexWrap: 'wrap'
            }}>
                <Dropdown
                    overlay={
                        <Menu>
                            <Menu.Item key="favorites" icon={<InfoCircleOutlined />}>My Favorites</Menu.Item>
                            <Menu.Item key="file" icon={<FileTextOutlined />}>File</Menu.Item>
                            <Menu.Item key="edit" icon={<EditOutlined />}>Edit</Menu.Item>
                            <Menu.Item key="view" icon={<InfoCircleOutlined />}>View</Menu.Item>
                            <Menu.Item key="insert" icon={<PlusOutlined />}>Insert</Menu.Item>
                            <Menu.Item key="format" icon={<InfoCircleOutlined />}>Format</Menu.Item>
                            <Menu.Item key="tools" icon={<SettingOutlined />}>Tools</Menu.Item>
                            <Menu.Item key="table" icon={<TabletOutlined />}>Table</Menu.Item>
                            <Menu.Item key="help" icon={<InfoCircleOutlined />}>Help</Menu.Item>
                        </Menu>
                    }
                    trigger={['click']}
                >
                    <Button size="small" icon={<InfoCircleOutlined />} />
                </Dropdown>

                <Button size="small" onClick={() => handleCommand('bold')} icon={<BoldOutlined />} />
                <Button size="small" onClick={() => handleCommand('italic')} icon={<ItalicOutlined />} />

                <div style={{ width: '1px', height: '20px', backgroundColor: '#d9d9d9', margin: '0 4px' }} />

                <Button size="small" onClick={() => handleCommand('justifyLeft')} icon={<AlignLeftOutlined />} />
                <Button size="small" onClick={() => handleCommand('justifyCenter')} icon={<AlignCenterOutlined />} />
                <Button size="small" onClick={() => handleCommand('justifyRight')} icon={<AlignRightOutlined />} />

                <div style={{ width: '1px', height: '20px', backgroundColor: '#d9d9d9', margin: '0 4px' }} />

                <Button size="small" onClick={() => handleCommand('insertUnorderedList')} icon={<UnorderedListOutlined />} />
                <Button size="small" onClick={() => handleCommand('insertOrderedList')} icon={<OrderedListOutlined />} />

                <div style={{ width: '1px', height: '20px', backgroundColor: '#d9d9d9', margin: '0 4px' }} />

                <Button size="small" onClick={() => handleCommand('createLink')} icon={<LinkOutlined />} />
                <Button size="small" onClick={() => handleCommand('insertImage')} icon={<PictureOutlined />} />
                <Button size="small" onClick={() => window.print()} icon={<PrintIcon />} />
            </div>

            {/* Editor Content */}
            <div
                id="editor-content"
                contentEditable
                style={{
                    minHeight: '120px',
                    padding: '12px',
                    outline: 'none',
                    fontSize: '14px',
                    lineHeight: '1.5'
                }}
                onInput={handleContentChange}
                onBlur={handleContentChange}
                suppressContentEditableWarning={true}
            />
        </div>
    );
};

interface Status {
    id: string;
    name: string;
    color: string;
    sortOrder: number;
}

interface Device {
    id: string;
    name: string;
    description: string;
}

interface DeviceModel {
    id: string;
    modelName: string;
    repairChecklist: string;
    device: string;
    brand: string;
}

interface RepairSettings {
    defaultJobSheetStatus: string;
    jobSheetNumberPrefix: string;
    defaultRepairChecklist: string;
    productConfiguration: string;
    problemReportedByCustomer: string;
    conditionOfProduct: string;
    repairTermsAndConditions: string;
    customField1Label: string;
    customField2Label: string;
    customField3Label: string;
    customField4Label: string;
    customField5Label: string;
}

interface JobSheetSettings {
    // Job Sheet PDF Settings
    showCustomerInformation: boolean;
    showClientId: boolean;
    customerLabel: string;
    clientIdLabel: string;
    clientTaxNumberLabel: string;
    url: string;
    customField2Enabled: boolean;
    customField3Enabled: boolean;
    customField4Enabled: boolean;

    // Customer Information
    customerName: boolean;
    customerAddress: boolean;
    customerPhone: boolean;
    alternatePhone: boolean;
    customerEmail: boolean;

    // Label Details
    salesPerson: boolean;
    barcode: boolean;
    status: boolean;
    dueDate: boolean;

    // Label Information
    technician: boolean;
    problem: boolean;

    // Device Info
    imeiSerial: boolean;
    brandModel: boolean;
    location: boolean;
    password: boolean;

    // Label Dimensions
    labelWidth: number;
    labelHeight: number;
}

const defaultStatuses: Status[] = [
    { id: '1', name: 'Cancelled | Unrepaired', color: '#ef4444', sortOrder: 1 },
    { id: '2', name: 'Paid | Closed', color: '#22c55e', sortOrder: 2 },
    { id: '3', name: 'QC Approved | Ready for Delivery', color: '#3b82f6', sortOrder: 3 },
    { id: '4', name: 'Pending', color: '#f59e0b', sortOrder: 4 },
    { id: '5', name: 'Assigned', color: '#8b5cf6', sortOrder: 5 },
    { id: '6', name: 'Waiting Customer Approval', color: '#f97316', sortOrder: 6 },
    { id: '7', name: 'Approved | Repair in Progress', color: '#06b6d4', sortOrder: 7 },
    { id: '8', name: 'Returned to Technician', color: '#ec4899', sortOrder: 8 },
    { id: '9', name: 'Repair Completed', color: '#10b981', sortOrder: 9 },
];

const defaultDevices: Device[] = [
    { id: '1', name: 'Mobile Phone', description: 'Mobile phone devices for repair' },
    { id: '2', name: 'Tablet', description: 'Tablet devices for repair' },
];

const defaultDeviceModels: DeviceModel[] = [
    { id: '1', modelName: 'iPhone 13', repairChecklist: 'Screen replacement, Battery check', device: 'Mobile Phone', brand: 'Apple' },
    { id: '2', modelName: 'Samsung Galaxy S21', repairChecklist: 'Screen replacement, Camera test', device: 'Mobile Phone', brand: 'Samsung' },
    { id: '3', modelName: 'iPad Pro', repairChecklist: 'Screen check, Battery test, Port inspection', device: 'Tablet', brand: 'Apple' },
];

const defaultRepairSettings: RepairSettings = {
    defaultJobSheetStatus: 'Pending',
    jobSheetNumberPrefix: 'DAV-REP-',
    defaultRepairChecklist: '',
    productConfiguration: '',
    problemReportedByCustomer: '',
    conditionOfProduct: '',
    repairTermsAndConditions: '• The company is not responsible for data loss.\n• Repair warranty covers only the replaced component.',
    customField1Label: '',
    customField2Label: '',
    customField3Label: '',
    customField4Label: '',
    customField5Label: '',
};

const defaultJobSheetSettings: JobSheetSettings = {
    // Job Sheet PDF Settings
    showCustomerInformation: true,
    showClientId: true,
    customerLabel: 'Customer Label',
    clientIdLabel: 'Client ID Label',
    clientTaxNumberLabel: 'Client tax number label',
    url: '',
    customField2Enabled: false,
    customField3Enabled: false,
    customField4Enabled: false,

    // Customer Information
    customerName: true,
    customerAddress: false,
    customerPhone: true,
    alternatePhone: false,
    customerEmail: false,

    // Label Details
    salesPerson: true,
    barcode: true,
    status: true,
    dueDate: true,

    // Label Information
    technician: true,
    problem: true,

    // Device Info
    imeiSerial: true,
    brandModel: true,
    location: true,
    password: true,

    // Label Dimensions
    labelWidth: 75,
    labelHeight: 50,
};

const statusOptions = [
    { value: 'Pending', label: 'Pending', color: '#f59e0b' },
    { value: 'Assigned', label: 'Assigned', color: '#8b5cf6' },
    { value: 'Waiting Customer Approval', label: 'Waiting Customer Approval', color: '#f97316' },
    { value: 'Approved | Repair in Progress', label: 'Approved | Repair in Progress', color: '#06b6d4' },
    { value: 'Repair Completed', label: 'Repair Completed', color: '#10b981' },
];

const colorOptions = [
    { value: '#ef4444', label: 'Red' },
    { value: '#f97316', label: 'Orange' },
    { value: '#f59e0b', label: 'Amber' },
    { value: '#22c55e', label: 'Green' },
    { value: '#10b981', label: 'Emerald' },
    { value: '#06b6d4', label: 'Cyan' },
    { value: '#3b82f6', label: 'Blue' },
    { value: '#8b5cf6', label: 'Violet' },
    { value: '#ec4899', label: 'Pink' },
    { value: '#6b7280', label: 'Gray' },
];

export default function Settings() {
    const [statuses, setStatuses] = useState<Status[]>(defaultStatuses);
    const [devices, setDevices] = useState<Device[]>(defaultDevices);
    const [deviceModels, setDeviceModels] = useState<DeviceModel[]>(defaultDeviceModels);
    const [repairSettings, setRepairSettings] = useState<RepairSettings>(defaultRepairSettings);
    const [jobSheetSettings, setJobSheetSettings] = useState<JobSheetSettings>(defaultJobSheetSettings);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeviceModalOpen, setIsDeviceModalOpen] = useState(false);
    const [isDeviceModelModalOpen, setIsDeviceModelModalOpen] = useState(false);
    const [editingStatus, setEditingStatus] = useState<Status | null>(null);
    const [editingDevice, setEditingDevice] = useState<Device | null>(null);
    const [editingDeviceModel, setEditingDeviceModel] = useState<DeviceModel | null>(null);
    const [form] = Form.useForm();
    const [deviceForm] = Form.useForm();
    const [deviceModelForm] = Form.useForm();
    const [repairSettingsForm] = Form.useForm();
    const [jobSheetSettingsForm] = Form.useForm();
    const [activeTab, setActiveTab] = useState('status');
    const [searchText, setSearchText] = useState('');
    const [deviceSearchText, setDeviceSearchText] = useState('');
    const [deviceModelSearchText, setDeviceModelSearchText] = useState('');
    const [filterEntity, setFilterEntity] = useState('all');
    const [filterBrand, setFilterBrand] = useState('all');
    const [filterDevice, setFilterDevice] = useState('all');

    useEffect(() => {
        // Load statuses from localStorage or API
        const savedStatuses = localStorage.getItem('repair-statuses');
        if (savedStatuses) {
            setStatuses(JSON.parse(savedStatuses));
        }

        // Load devices from localStorage or API
        const savedDevices = localStorage.getItem('repair-devices');
        if (savedDevices) {
            setDevices(JSON.parse(savedDevices));
        }

        // Load device models from localStorage or API
        const savedDeviceModels = localStorage.getItem('repair-device-models');
        if (savedDeviceModels) {
            setDeviceModels(JSON.parse(savedDeviceModels));
        }

        // Load repair settings from localStorage or API
        const savedRepairSettings = localStorage.getItem('repair-settings');
        if (savedRepairSettings) {
            setRepairSettings(JSON.parse(savedRepairSettings));
            repairSettingsForm.setFieldsValue(JSON.parse(savedRepairSettings));
        } else {
            repairSettingsForm.setFieldsValue(defaultRepairSettings);
        }

        // Load job sheet settings from localStorage or API
        const savedJobSheetSettings = localStorage.getItem('jobsheet-settings');
        if (savedJobSheetSettings) {
            setJobSheetSettings(JSON.parse(savedJobSheetSettings));
            jobSheetSettingsForm.setFieldsValue(JSON.parse(savedJobSheetSettings));
        } else {
            jobSheetSettingsForm.setFieldsValue(defaultJobSheetSettings);
        }
    }, []);

    // Filter logic
    const filteredStatuses = statuses.filter(status => {
        const matchesSearch = status.name.toLowerCase().includes(searchText.toLowerCase());
        const matchesFilter = filterEntity === 'all' ||
            (filterEntity === 'cancelled' && status.name.includes('Cancelled')) ||
            (filterEntity === 'paid' && status.name.includes('Paid')) ||
            (filterEntity === 'pending' && status.name.includes('Pending')) ||
            (filterEntity === 'approved' && status.name.includes('Approved')) ||
            (filterEntity === 'completed' && status.name.includes('Completed'));
        return matchesSearch && matchesFilter;
    });

    // Filter devices based on search
    const filteredDevices = devices.filter(device =>
        device.name.toLowerCase().includes(deviceSearchText.toLowerCase()) ||
        device.description.toLowerCase().includes(deviceSearchText.toLowerCase())
    );

    // Filter device models based on search and filters
    const filteredDeviceModels = deviceModels.filter(model => {
        const matchesSearch = model.modelName.toLowerCase().includes(deviceModelSearchText.toLowerCase()) ||
            model.repairChecklist.toLowerCase().includes(deviceModelSearchText.toLowerCase()) ||
            model.brand.toLowerCase().includes(deviceModelSearchText.toLowerCase());
        const matchesBrand = filterBrand === 'all' || model.brand === filterBrand;
        const matchesDevice = filterDevice === 'all' || model.device === filterDevice;
        return matchesSearch && matchesBrand && matchesDevice;
    });

    // Get unique brands and devices for filters
    const uniqueBrands = Array.from(new Set(deviceModels.map(model => model.brand)));
    const uniqueDevices = Array.from(new Set(deviceModels.map(model => model.device)));

    const entityOptions = [
        { value: 'all', label: 'All Entities' },
        { value: 'cancelled', label: 'Cancelled' },
        { value: 'paid', label: 'Paid' },
        { value: 'pending', label: 'Pending' },
        { value: 'approved', label: 'Approved' },
        { value: 'completed', label: 'Completed' },
    ];

    const saveStatuses = (updatedStatuses: Status[]) => {
        setStatuses(updatedStatuses);
        localStorage.setItem('repair-statuses', JSON.stringify(updatedStatuses));
        notification.success({
            message: 'Success',
            description: 'Statuses saved successfully',
        });
    };

    const handleSubmit = async (values: any) => {
        if (editingStatus) {
            const updatedStatuses = statuses.map(status =>
                status.id === editingStatus.id
                    ? { ...editingStatus, ...values }
                    : status
            );
            saveStatuses(updatedStatuses);
        } else {
            const newStatus: Status = {
                id: Date.now().toString(),
                ...values,
                sortOrder: statuses.length + 1,
            };
            saveStatuses([...statuses, newStatus]);
        }

        resetForm();
        setIsModalOpen(false);
    };

    const resetForm = () => {
        form.resetFields();
        setEditingStatus(null);
    };

    const handleEdit = (status: Status) => {
        setEditingStatus(status);
        form.setFieldsValue({
            name: status.name,
            color: status.color,
            sortOrder: status.sortOrder,
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this status?',
            onOk: () => {
                const updatedStatuses = statuses.filter(status => status.id !== id);
                saveStatuses(updatedStatuses);
            },
        });
    };

    const exportToCSV = () => {
        const csv = [
            ['Status Name', 'Color', 'Sort Order'],
            ...statuses.map(status => [status.name, status.color, status.sortOrder.toString()])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'repair-statuses.csv';
        a.click();
        window.URL.revokeObjectURL(url);
        notification.success({
            message: 'Success',
            description: 'Exported to CSV',
        });
    };

    const exportToExcel = () => {
        // Simple Excel export using CSV format with .xlsx extension
        const csv = [
            ['Status Name', 'Color', 'Sort Order'],
            ...statuses.map(status => [status.name, status.color, status.sortOrder.toString()])
        ].map(row => row.join('\t')).join('\n');

        const blob = new Blob([csv], { type: 'application/vnd.ms-excel' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'repair-statuses.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
        notification.success({
            message: 'Success',
            description: 'Exported to Excel',
        });
    };

    const printTable = () => {
        window.print();
        notification.success({
            message: 'Success',
            description: 'Print dialog opened',
        });
    };

    const exportToPDF = () => {
        // For PDF export, we'll create a simple HTML representation
        const html = `
      <html>
        <head>
          <title>Repair Statuses</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>Repair Statuses</h1>
          <table>
            <thead>
              <tr>
                <th>Status Name</th>
                <th>Color</th>
                <th>Sort Order</th>
              </tr>
            </thead>
            <tbody>
              ${statuses.map(status => `
                <tr>
                  <td>${status.name}</td>
                  <td>${status.color}</td>
                  <td>${status.sortOrder}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

        const blob = new Blob([html], { type: 'text/html' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'repair-statuses.html';
        a.click();
        window.URL.revokeObjectURL(url);
        notification.success({
            message: 'Success',
            description: 'Exported to PDF (HTML format)',
        });
    };

    // Device functions
    const saveDevices = (updatedDevices: Device[]) => {
        setDevices(updatedDevices);
        localStorage.setItem('repair-devices', JSON.stringify(updatedDevices));
        notification.success({
            message: 'Success',
            description: 'Devices saved successfully',
        });
    };

    const handleDeviceSubmit = async (values: any) => {
        if (editingDevice) {
            const updatedDevices = devices.map(device =>
                device.id === editingDevice.id
                    ? { ...editingDevice, ...values }
                    : device
            );
            saveDevices(updatedDevices);
        } else {
            const newDevice: Device = {
                id: Date.now().toString(),
                ...values,
            };
            saveDevices([...devices, newDevice]);
        }

        resetDeviceForm();
        setIsDeviceModalOpen(false);
    };

    const resetDeviceForm = () => {
        deviceForm.resetFields();
        setEditingDevice(null);
    };

    const handleDeviceEdit = (device: Device) => {
        setEditingDevice(device);
        deviceForm.setFieldsValue({
            name: device.name,
            description: device.description,
        });
        setIsDeviceModalOpen(true);
    };

    const handleDeviceDelete = (id: string) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this device?',
            onOk: () => {
                const updatedDevices = devices.filter(device => device.id !== id);
                saveDevices(updatedDevices);
            },
        });
    };

    // Device Model functions
    const saveDeviceModels = (updatedDeviceModels: DeviceModel[]) => {
        setDeviceModels(updatedDeviceModels);
        localStorage.setItem('repair-device-models', JSON.stringify(updatedDeviceModels));
        notification.success({
            message: 'Success',
            description: 'Device models saved successfully',
        });
    };

    const handleDeviceModelSubmit = async (values: any) => {
        if (editingDeviceModel) {
            const updatedDeviceModels = deviceModels.map(model =>
                model.id === editingDeviceModel.id
                    ? { ...editingDeviceModel, ...values }
                    : model
            );
            saveDeviceModels(updatedDeviceModels);
        } else {
            const newDeviceModel: DeviceModel = {
                id: Date.now().toString(),
                ...values,
            };
            saveDeviceModels([...deviceModels, newDeviceModel]);
        }

        resetDeviceModelForm();
        setIsDeviceModelModalOpen(false);
    };

    const resetDeviceModelForm = () => {
        deviceModelForm.resetFields();
        setEditingDeviceModel(null);
    };

    const handleDeviceModelEdit = (deviceModel: DeviceModel) => {
        setEditingDeviceModel(deviceModel);
        deviceModelForm.setFieldsValue({
            modelName: deviceModel.modelName,
            repairChecklist: deviceModel.repairChecklist,
            device: deviceModel.device,
            brand: deviceModel.brand,
        });
        setIsDeviceModelModalOpen(true);
    };

    const handleDeviceModelDelete = (id: string) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this device model?',
            onOk: () => {
                const updatedDeviceModels = deviceModels.filter(model => model.id !== id);
                saveDeviceModels(updatedDeviceModels);
            },
        });
    };

    // Repair Settings functions
    const handleRepairSettingsSubmit = async (values: any) => {
        setRepairSettings(values);
        localStorage.setItem('repair-settings', JSON.stringify(values));
        notification.success({
            message: 'Success',
            description: 'Repair settings saved successfully',
        });
    };

    // Job Sheet Settings functions
    const handleJobSheetSettingsSubmit = async (values: any) => {
        setJobSheetSettings(values);
        localStorage.setItem('jobsheet-settings', JSON.stringify(values));
        notification.success({
            message: 'Success',
            description: 'Job sheet settings saved successfully',
        });
    };

    const columns = [
        {
            title: 'Status Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Color',
            dataIndex: 'color',
            key: 'color',
            render: (color: string) => (
                <Space>
                    <div
                        style={{
                            width: 16,
                            height: 16,
                            borderRadius: 4,
                            backgroundColor: color,
                        }}
                    />
                    <span style={{ color: '#666' }}>{color}</span>
                </Space>
            ),
        },
        {
            title: 'Sort Order',
            dataIndex: 'sortOrder',
            key: 'sortOrder',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: Status) => (
                <Space>
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                    />
                    <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record.id)}
                    />
                </Space>
            ),
        },
    ];

    const deviceColumns = [
        {
            title: 'Device',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: Device) => (
                <Space>
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => handleDeviceEdit(record)}
                    />
                    <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDeviceDelete(record.id)}
                    />
                </Space>
            ),
        },
    ];

    const deviceModelColumns = [
        {
            title: 'Model Name',
            dataIndex: 'modelName',
            key: 'modelName',
        },
        {
            title: 'Repair Checklist',
            dataIndex: 'repairChecklist',
            key: 'repairChecklist',
        },
        {
            title: 'Device',
            dataIndex: 'device',
            key: 'device',
        },
        {
            title: 'Brand',
            dataIndex: 'brand',
            key: 'brand',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: DeviceModel) => (
                <Space>
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => handleDeviceModelEdit(record)}
                    />
                    <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDeviceModelDelete(record.id)}
                    />
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '24px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px',
                backgroundColor: '#fff',
                padding: '16px 24px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
                <Title level={2} style={{ margin: 0, color: '#262626' }}>Settings</Title>
                <Space>
                    <Button
                        icon={<DownloadOutlined />}
                        onClick={exportToCSV}
                        style={{ borderColor: '#d9d9d9' }}
                    >
                        Export to CSV
                    </Button>
                    <Button
                        icon={<DownloadOutlined />}
                        onClick={exportToExcel}
                        style={{ borderColor: '#d9d9d9' }}
                    >
                        Export to Excel
                    </Button>
                    <Button
                        icon={<PrinterOutlined />}
                        onClick={printTable}
                        style={{ borderColor: '#d9d9d9' }}
                    >
                        Print
                    </Button>
                    <Button
                        icon={<FileTextOutlined />}
                        onClick={exportToPDF}
                        style={{ borderColor: '#d9d9d9' }}
                    >
                        Export to PDF
                    </Button>
                </Space>
            </div>

            <Card
                style={{
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    border: '1px solid #e8e8e8'
                }}
                bodyStyle={{ padding: '0' }}
            >
                <Tabs
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    size="large"
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: '8px 8px 0 0'
                    }}
                    items={[
                        {
                            key: 'status',
                            label: (
                                <Space style={{ fontSize: '14px' }}>
                                    <CheckCircleOutlined style={{ color: '#1890ff' }} />
                                    <span>Status Management</span>
                                </Space>
                            ),
                            children: (
                                <div style={{ padding: '24px' }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginBottom: '20px',
                                        padding: '16px',
                                        backgroundColor: '#fafafa',
                                        borderRadius: '6px',
                                        border: '1px solid #e8e8e8'
                                    }}>
                                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                            <Input
                                                placeholder="Search status..."
                                                prefix={<SearchOutlined />}
                                                value={searchText}
                                                onChange={(e) => setSearchText(e.target.value)}
                                                style={{ width: 250 }}
                                            />
                                            <Select
                                                placeholder="Filter by entity"
                                                value={filterEntity}
                                                onChange={setFilterEntity}
                                                style={{ width: 200 }}
                                                options={entityOptions}
                                            />
                                        </div>
                                        <Button
                                            type="primary"
                                            icon={<PlusOutlined />}
                                            onClick={() => {
                                                resetForm();
                                                setIsModalOpen(true);
                                            }}
                                            style={{ borderRadius: '6px' }}
                                        >
                                            Add Status
                                        </Button>
                                    </div>

                                    <Table
                                        columns={columns}
                                        dataSource={filteredStatuses.sort((a, b) => a.sortOrder - b.sortOrder)}
                                        rowKey="id"
                                        pagination={false}
                                        style={{
                                            backgroundColor: '#fff',
                                            borderRadius: '6px',
                                            overflow: 'hidden'
                                        }}
                                        rowClassName={(record, index) =>
                                            index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
                                        }
                                    />
                                </div>
                            ),
                        },
                        {
                            key: 'devices',
                            label: (
                                <Space style={{ fontSize: '14px' }}>
                                    <MobileOutlined style={{ color: '#52c41a' }} />
                                    <span>Device Management</span>
                                </Space>
                            ),
                            children: (
                                <div style={{ padding: '24px' }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginBottom: '20px',
                                        padding: '16px',
                                        backgroundColor: '#fafafa',
                                        borderRadius: '6px',
                                        border: '1px solid #e8e8e8'
                                    }}>
                                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                            <Input
                                                placeholder="Search devices..."
                                                prefix={<SearchOutlined />}
                                                value={deviceSearchText}
                                                onChange={(e) => setDeviceSearchText(e.target.value)}
                                                style={{ width: 250 }}
                                            />
                                            <span style={{ color: '#666', fontSize: '14px' }}>
                                                Showing 1 to {filteredDevices.length} of {devices.length} entries
                                            </span>
                                        </div>
                                        <Button
                                            type="primary"
                                            icon={<PlusOutlined />}
                                            onClick={() => {
                                                resetDeviceForm();
                                                setIsDeviceModalOpen(true);
                                            }}
                                            style={{ borderRadius: '6px' }}
                                        >
                                            Add Device
                                        </Button>
                                    </div>

                                    <Table
                                        columns={deviceColumns}
                                        dataSource={filteredDevices}
                                        rowKey="id"
                                        pagination={{
                                            current: 1,
                                            pageSize: 25,
                                            total: filteredDevices.length,
                                            showSizeChanger: true,
                                            showQuickJumper: true,
                                            showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                        }}
                                        style={{
                                            backgroundColor: '#fff',
                                            borderRadius: '6px',
                                            overflow: 'hidden'
                                        }}
                                        rowClassName={(record, index) =>
                                            index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
                                        }
                                    />
                                </div>
                            ),
                        },
                        {
                            key: 'device-models',
                            label: (
                                <Space style={{ fontSize: '14px' }}>
                                    <TabletOutlined style={{ color: '#722ed1' }} />
                                    <span>Device Models</span>
                                </Space>
                            ),
                            children: (
                                <div style={{ padding: '24px' }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginBottom: '20px',
                                        padding: '16px',
                                        backgroundColor: '#fafafa',
                                        borderRadius: '6px',
                                        border: '1px solid #e8e8e8'
                                    }}>
                                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                            <Input
                                                placeholder="Search device models..."
                                                prefix={<SearchOutlined />}
                                                value={deviceModelSearchText}
                                                onChange={(e) => setDeviceModelSearchText(e.target.value)}
                                                style={{ width: 250 }}
                                            />
                                            <Select
                                                placeholder="Filter by brand"
                                                value={filterBrand}
                                                onChange={setFilterBrand}
                                                style={{ width: 150 }}
                                                allowClear
                                            >
                                                <Select.Option value="all">All Brands</Select.Option>
                                                {uniqueBrands.map(brand => (
                                                    <Select.Option key={brand} value={brand}>{brand}</Select.Option>
                                                ))}
                                            </Select>
                                            <Select
                                                placeholder="Filter by device"
                                                value={filterDevice}
                                                onChange={setFilterDevice}
                                                style={{ width: 150 }}
                                                allowClear
                                            >
                                                <Select.Option value="all">All Devices</Select.Option>
                                                {uniqueDevices.map(device => (
                                                    <Select.Option key={device} value={device}>{device}</Select.Option>
                                                ))}
                                            </Select>
                                            <span style={{ color: '#666', fontSize: '14px' }}>
                                                Showing 1 to {filteredDeviceModels.length} of {deviceModels.length} entries
                                            </span>
                                        </div>
                                        <Button
                                            type="primary"
                                            icon={<PlusOutlined />}
                                            onClick={() => {
                                                resetDeviceModelForm();
                                                setIsDeviceModelModalOpen(true);
                                            }}
                                            style={{ borderRadius: '6px' }}
                                        >
                                            Add
                                        </Button>
                                    </div>

                                    <Table
                                        columns={deviceModelColumns}
                                        dataSource={filteredDeviceModels}
                                        rowKey="id"
                                        pagination={{
                                            current: 1,
                                            pageSize: 25,
                                            total: filteredDeviceModels.length,
                                            showSizeChanger: true,
                                            showQuickJumper: true,
                                            showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                        }}
                                        style={{
                                            backgroundColor: '#fff',
                                            borderRadius: '6px',
                                            overflow: 'hidden'
                                        }}
                                        rowClassName={(_, index) =>
                                            index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
                                        }
                                    />
                                </div>
                            ),
                        },
                        {
                            key: 'repair-settings',
                            label: (
                                <Space style={{ fontSize: '14px' }}>
                                    <SettingOutlined style={{ color: '#fa8c16' }} />
                                    <span>Repair Settings</span>
                                </Space>
                            ),
                            children: (
                                <div style={{
                                    padding: '24px',
                                    backgroundColor: '#fafafa',
                                    minHeight: '600px'
                                }}>
                                    <Form
                                        form={repairSettingsForm}
                                        layout="vertical"
                                        onFinish={handleRepairSettingsSubmit}
                                        style={{
                                            maxWidth: '800px',
                                            margin: '0 auto',
                                            backgroundColor: '#fff',
                                            padding: '32px',
                                            borderRadius: '8px',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                                        }}
                                    >
                                        <div style={{ marginBottom: '24px' }}>
                                            <Form.Item
                                                name="defaultJobSheetStatus"
                                                label="Default Job Sheet Status"
                                                rules={[{ required: true, message: 'Please select default status' }]}
                                                style={{ marginBottom: '16px' }}
                                            >
                                                <Radio.Group size="large">
                                                    {statusOptions.map(status => (
                                                        <Radio key={status.value} value={status.value}>
                                                            <Space>
                                                                <div
                                                                    style={{
                                                                        width: 12,
                                                                        height: 12,
                                                                        borderRadius: '50%',
                                                                        backgroundColor: status.color,
                                                                        marginRight: 8
                                                                    }}
                                                                />
                                                                <span>{status.label}</span>
                                                            </Space>
                                                        </Radio>
                                                    ))}
                                                </Radio.Group>
                                            </Form.Item>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                                            <Form.Item
                                                name="jobSheetNumberPrefix"
                                                label={
                                                    <Space>
                                                        <InfoCircleOutlined style={{ color: '#1890ff', marginRight: 8 }} />
                                                        <span>Job sheet number prefix</span>
                                                    </Space>
                                                }
                                                rules={[{ required: true, message: 'Please enter job sheet number prefix' }]}
                                            >
                                                <Input
                                                    size="large"
                                                    placeholder="Enter job sheet number prefix"
                                                    style={{ borderRadius: '6px' }}
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                name="defaultRepairChecklist"
                                                label={
                                                    <Space>
                                                        <InfoCircleOutlined style={{ color: '#1890ff', marginRight: 8 }} />
                                                        <span>Default repair checklist</span>
                                                    </Space>
                                                }
                                            >
                                                <Input.TextArea
                                                    placeholder="Enter default repair checklist"
                                                    rows={4}
                                                    style={{ borderRadius: '6px' }}
                                                />
                                            </Form.Item>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                                            <Form.Item
                                                name="productConfiguration"
                                                label={
                                                    <Space>
                                                        <InfoCircleOutlined style={{ color: '#1890ff', marginRight: 8 }} />
                                                        <span>Product Configuration</span>
                                                    </Space>
                                                }
                                            >
                                                <Input.TextArea
                                                    placeholder="Enter product configuration details"
                                                    rows={4}
                                                    style={{ borderRadius: '6px' }}
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                name="problemReportedByCustomer"
                                                label={
                                                    <Space>
                                                        <InfoCircleOutlined style={{ color: '#1890ff', marginRight: 8 }} />
                                                        <span>Problem Reported By The Customer</span>
                                                    </Space>
                                                }
                                            >
                                                <Input.TextArea
                                                    placeholder="Enter problem details reported by customer"
                                                    rows={4}
                                                    style={{ borderRadius: '6px' }}
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                name="conditionOfProduct"
                                                label={
                                                    <Space>
                                                        <InfoCircleOutlined style={{ color: '#1890ff', marginRight: 8 }} />
                                                        <span>Condition Of The Product</span>
                                                    </Space>
                                                }
                                            >
                                                <Input.TextArea
                                                    placeholder="Enter product condition details"
                                                    rows={4}
                                                    style={{ borderRadius: '6px' }}
                                                />
                                            </Form.Item>
                                        </div>

                                        <div style={{ marginBottom: '24px' }}>
                                            <Form.Item
                                                name="repairTermsAndConditions"
                                                label={
                                                    <Space>
                                                        <InfoCircleOutlined style={{ color: '#1890ff', marginRight: 8 }} />
                                                        <span>Repair terms & conditions</span>
                                                    </Space>
                                                }
                                            >
                                                <RichTextEditor
                                                    placeholder="Enter repair terms and conditions"
                                                />
                                            </Form.Item>
                                        </div>


                                        <div style={{ marginBottom: '24px' }}>
                                            <Typography.Title level={5} style={{ marginBottom: '16px', color: '#262626' }}>
                                                Custom Field Labels
                                            </Typography.Title>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                                <Form.Item
                                                    name="customField1Label"
                                                    label="Label for job sheet custom field 1"
                                                >
                                                    <Input placeholder="Enter custom field 1 label" style={{ borderRadius: '6px' }} />
                                                </Form.Item>
                                                <Form.Item
                                                    name="customField2Label"
                                                    label="Label for job sheet custom field 2"
                                                >
                                                    <Input placeholder="Enter custom field 2 label" style={{ borderRadius: '6px' }} />
                                                </Form.Item>
                                                <Form.Item
                                                    name="customField3Label"
                                                    label="Label for job sheet custom field 3"
                                                >
                                                    <Input placeholder="Enter custom field 3 label" style={{ borderRadius: '6px' }} />
                                                </Form.Item>
                                                <Form.Item
                                                    name="customField4Label"
                                                    label="Label for job sheet custom field 4"
                                                >
                                                    <Input placeholder="Enter custom field 4 label" style={{ borderRadius: '6px' }} />
                                                </Form.Item>
                                                <Form.Item
                                                    name="customField5Label"
                                                    label="Label for job sheet custom field 5"
                                                >
                                                    <Input placeholder="Enter custom field 5 label" style={{ borderRadius: '6px' }} />
                                                </Form.Item>
                                            </div>
                                        </div>

                                        <Form.Item style={{ marginBottom: 0, textAlign: 'right', marginTop: '32px' }}>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                size="large"
                                                style={{
                                                    borderRadius: '6px',
                                                    minWidth: '120px',
                                                    height: '40px'
                                                }}
                                            >
                                                Update
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                            ),
                        },
                        {
                            key: 'jobsheet-pdf-label',
                            label: (
                                <Space style={{ fontSize: '14px' }}>
                                    <FilePdfOutlined style={{ color: '#eb2f96' }} />
                                    <span>Jobsheet PDF & Label</span>
                                </Space>
                            ),
                            children: (
                                <div style={{
                                    padding: '24px',
                                    backgroundColor: '#fafafa',
                                    minHeight: '600px'
                                }}>
                                    <Form
                                        form={jobSheetSettingsForm}
                                        layout="vertical"
                                        onFinish={handleJobSheetSettingsSubmit}
                                        style={{
                                            maxWidth: '1000px',
                                            margin: '0 auto',
                                            backgroundColor: '#fff',
                                            padding: '32px',
                                            borderRadius: '8px',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                                        }}
                                    >
                                        {/* Job Sheet PDF Settings */}
                                        <div style={{ marginBottom: '32px' }}>
                                            <Typography.Title level={4} style={{ marginBottom: '20px', color: '#262626', borderBottom: '2px solid #1890ff', paddingBottom: '8px' }}>
                                                Job Sheet PDF: Fields for customer details
                                            </Typography.Title>

                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                                                <Form.Item name="showCustomerInformation" valuePropName="checked">
                                                    <Checkbox>Show Customer Information</Checkbox>
                                                </Form.Item>
                                                <Form.Item name="showClientId" valuePropName="checked">
                                                    <Checkbox>Show client ID</Checkbox>
                                                </Form.Item>
                                            </div>

                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                                                <Form.Item name="customerLabel" label="Customer Label">
                                                    <Input placeholder="Enter customer label" style={{ borderRadius: '6px' }} />
                                                </Form.Item>
                                                <Form.Item name="clientIdLabel" label="Client ID Label">
                                                    <Input placeholder="Enter client ID label" style={{ borderRadius: '6px' }} />
                                                </Form.Item>
                                                <Form.Item name="clientTaxNumberLabel" label="Client tax number label">
                                                    <Input placeholder="Enter client tax number label" style={{ borderRadius: '6px' }} />
                                                </Form.Item>
                                                <Form.Item name="url" label="URL">
                                                    <Input placeholder="Enter URL" style={{ borderRadius: '6px' }} />
                                                </Form.Item>
                                            </div>

                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                                                <Form.Item name="customField2Enabled" valuePropName="checked">
                                                    <Checkbox>Custom Field 2</Checkbox>
                                                </Form.Item>
                                                <Form.Item name="customField3Enabled" valuePropName="checked">
                                                    <Checkbox>Custom Field 3</Checkbox>
                                                </Form.Item>
                                                <Form.Item name="customField4Enabled" valuePropName="checked">
                                                    <Checkbox>Custom Field 4</Checkbox>
                                                </Form.Item>
                                            </div>
                                        </div>

                                        {/* Job Sheet Label */}
                                        <div style={{ marginBottom: '32px' }}>
                                            <Typography.Title level={4} style={{ marginBottom: '20px', color: '#262626', borderBottom: '2px solid #1890ff', paddingBottom: '8px' }}>
                                                Job Sheet Label
                                            </Typography.Title>

                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                                                <Form.Item name="labelWidth" label="Label width(MM):">
                                                    <Input type="number" placeholder="75" style={{ borderRadius: '6px' }} />
                                                </Form.Item>
                                                <Form.Item name="labelHeight" label="Label Height(MM):">
                                                    <Input type="number" placeholder="50" style={{ borderRadius: '6px' }} />
                                                </Form.Item>
                                            </div>
                                        </div>

                                        {/* Customer Information */}
                                        <div style={{ marginBottom: '32px' }}>
                                            <Typography.Title level={5} style={{ marginBottom: '16px', color: '#262626' }}>
                                                Customer Information
                                            </Typography.Title>

                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                                <Form.Item name="customerName" valuePropName="checked">
                                                    <Checkbox>Customer name</Checkbox>
                                                </Form.Item>
                                                <Form.Item name="customerAddress" valuePropName="checked">
                                                    <Checkbox>Customer Address</Checkbox>
                                                </Form.Item>
                                                <Form.Item name="customerPhone" valuePropName="checked">
                                                    <Checkbox>Customer Phone</Checkbox>
                                                </Form.Item>
                                                <Form.Item name="alternatePhone" valuePropName="checked">
                                                    <Checkbox>Alternate Phone</Checkbox>
                                                </Form.Item>
                                                <Form.Item name="customerEmail" valuePropName="checked">
                                                    <Checkbox>Customer Email</Checkbox>
                                                </Form.Item>
                                            </div>
                                        </div>

                                        {/* Label Details */}
                                        <div style={{ marginBottom: '32px' }}>
                                            <Typography.Title level={5} style={{ marginBottom: '16px', color: '#262626' }}>
                                                Label Details
                                            </Typography.Title>

                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                                <Form.Item name="salesPerson" valuePropName="checked">
                                                    <Checkbox>Sales Person</Checkbox>
                                                </Form.Item>
                                                <Form.Item name="barcode" valuePropName="checked">
                                                    <Checkbox>Barcode (Job Sheet Number)</Checkbox>
                                                </Form.Item>
                                                <Form.Item name="status" valuePropName="checked">
                                                    <Checkbox>Status</Checkbox>
                                                </Form.Item>
                                                <Form.Item name="dueDate" valuePropName="checked">
                                                    <Checkbox>Due Date</Checkbox>
                                                </Form.Item>
                                            </div>
                                        </div>

                                        {/* Label Information */}
                                        <div style={{ marginBottom: '32px' }}>
                                            <Typography.Title level={5} style={{ marginBottom: '16px', color: '#262626' }}>
                                                Label Information
                                            </Typography.Title>

                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                                <Form.Item name="technician" valuePropName="checked">
                                                    <Checkbox>Technician</Checkbox>
                                                </Form.Item>
                                                <Form.Item name="problem" valuePropName="checked">
                                                    <Checkbox>Problem</Checkbox>
                                                </Form.Item>
                                            </div>
                                        </div>

                                        {/* Device Info */}
                                        <div style={{ marginBottom: '32px' }}>
                                            <Typography.Title level={5} style={{ marginBottom: '16px', color: '#262626' }}>
                                                Device Info
                                            </Typography.Title>

                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                                <Form.Item name="imeiSerial" valuePropName="checked">
                                                    <Checkbox>IMEI/Serial No.</Checkbox>
                                                </Form.Item>
                                                <Form.Item name="brandModel" valuePropName="checked">
                                                    <Checkbox>Brand/Model</Checkbox>
                                                </Form.Item>
                                                <Form.Item name="location" valuePropName="checked">
                                                    <Checkbox>Location</Checkbox>
                                                </Form.Item>
                                                <Form.Item name="password" valuePropName="checked">
                                                    <Checkbox>Password</Checkbox>
                                                </Form.Item>
                                            </div>
                                        </div>

                                        <Form.Item style={{ marginBottom: 0, textAlign: 'right', marginTop: '32px' }}>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                size="large"
                                                style={{
                                                    borderRadius: '6px',
                                                    minWidth: '120px',
                                                    height: '40px',
                                                    backgroundColor: '#ff4d4f',
                                                    borderColor: '#ff4d4f'
                                                }}
                                            >
                                                Update
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                            ),
                        },
                    ]}
                />
            </Card>

            <Modal
                title={editingStatus ? 'Edit Status' : 'Add New Status'}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                width={600}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="name"
                        label="Status Name"
                        rules={[{ required: true, message: 'Please enter status name' }]}
                    >
                        <Input placeholder="Enter status name" />
                    </Form.Item>

                    <Form.Item
                        name="color"
                        label="Color"
                        rules={[{ required: true, message: 'Please select a color' }]}
                    >
                        <Select placeholder="Select a color">
                            {colorOptions.map((color) => (
                                <Select.Option key={color.value} value={color.value}>
                                    <Space>
                                        <div
                                            style={{
                                                width: 16,
                                                height: 16,
                                                borderRadius: 4,
                                                backgroundColor: color.value,
                                            }}
                                        />
                                        {color.label}
                                    </Space>
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="sortOrder"
                        label="Sort Order"
                        rules={[{ required: true, message: 'Please enter sort order' }]}
                    >
                        <Input type="number" placeholder="Enter sort order" />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
                        <Space>
                            <Button onClick={() => setIsModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="primary" htmlType="submit">
                                {editingStatus ? 'Update' : 'Add'}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title={editingDevice ? 'Edit Device' : 'Add New Device'}
                open={isDeviceModalOpen}
                onCancel={() => setIsDeviceModalOpen(false)}
                footer={null}
                width={600}
            >
                <Form
                    form={deviceForm}
                    layout="vertical"
                    onFinish={handleDeviceSubmit}
                >
                    <Form.Item
                        name="name"
                        label="Device Name"
                        rules={[{ required: true, message: 'Please enter device name' }]}
                    >
                        <Input placeholder="Enter device name" />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: 'Please enter description' }]}
                    >
                        <Input.TextArea placeholder="Enter device description" rows={4} />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
                        <Space>
                            <Button onClick={() => setIsDeviceModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="primary" htmlType="submit">
                                {editingDevice ? 'Update' : 'Add'}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title={editingDeviceModel ? 'Edit Device Model' : 'Add New Device Model'}
                open={isDeviceModelModalOpen}
                onCancel={() => setIsDeviceModelModalOpen(false)}
                footer={null}
                width={600}
            >
                <Form
                    form={deviceModelForm}
                    layout="vertical"
                    onFinish={handleDeviceModelSubmit}
                >
                    <Form.Item
                        name="modelName"
                        label="Model Name"
                        rules={[{ required: true, message: 'Please enter model name' }]}
                    >
                        <Input placeholder="Enter model name" />
                    </Form.Item>

                    <Form.Item
                        name="repairChecklist"
                        label="Repair Checklist"
                        rules={[{ required: true, message: 'Please enter repair checklist' }]}
                    >
                        <Input.TextArea placeholder="Enter repair checklist items" rows={4} />
                    </Form.Item>

                    <Form.Item
                        name="device"
                        label="Device"
                        rules={[{ required: true, message: 'Please select device type' }]}
                    >
                        <Select placeholder="Select device type">
                            {devices.map(device => (
                                <Select.Option key={device.id} value={device.name}>{device.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="brand"
                        label="Brand"
                        rules={[{ required: true, message: 'Please enter brand' }]}
                    >
                        <Input placeholder="Enter brand name" />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
                        <Space>
                            <Button onClick={() => setIsDeviceModelModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="primary" htmlType="submit">
                                {editingDeviceModel ? 'Update' : 'Add'}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
