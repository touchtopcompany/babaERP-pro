import React, { useState } from 'react';
import { Calendar, Button, Select, Modal, Form, Input, DatePicker, TimePicker, message } from 'antd';
import { LeftOutlined, RightOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Option } = Select;

const Reminder: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(dayjs());
    const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const onPanelChange = (date: dayjs.Dayjs) => {
        setCurrentDate(date);
    };

    const handlePrevMonth = () => {
        setCurrentDate(currentDate.subtract(1, 'month'));
    };

    const handleNextMonth = () => {
        setCurrentDate(currentDate.add(1, 'month'));
    };

    const handleToday = () => {
        setCurrentDate(dayjs());
    };

    const handleAddReminder = () => {
        setIsModalVisible(true);
        form.resetFields();
    };

    const handleModalOk = () => {
        form.validateFields().then(values => {
            console.log('New reminder:', values);
            message.success('Reminder added successfully');
            setIsModalVisible(false);
            form.resetFields();
        }).catch(error => {
            console.log('Validation failed:', error);
        });
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const monthCellRender = (value: dayjs.Dayjs) => {
        // Highlight specific dates if needed
        if (value.date() === 28 && value.month() === 1) { // February 28th
            return (
                <div className="bg-yellow-100 rounded-md p-1 text-center">
                    {value.date()}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-800 mb-2">Reminders</h1>
                <p className="text-gray-600">Manage your reminders and important dates</p>
            </div>

            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                    <Button
                        icon={<LeftOutlined />}
                        onClick={handlePrevMonth}
                        type="text"
                    />
                    <Button
                        onClick={handleToday}
                        type="text"
                    >
                        Today
                    </Button>
                    <Button
                        icon={<RightOutlined />}
                        onClick={handleNextMonth}
                        type="text"
                    />
                    <span className="ml-4 text-lg font-medium">
                        {currentDate.format('MMMM YYYY')}
                    </span>
                </div>

                <div className="flex items-center space-x-4">
                    <Select
                        value={viewMode}
                        onChange={setViewMode}
                        style={{ width: 100 }}
                    >
                        <Option value="month">Month</Option>
                        <Option value="week">Week</Option>
                        <Option value="day">Day</Option>
                    </Select>

                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleAddReminder}
                    >
                        Add reminder
                    </Button>
                </div>
            </div>

            <Calendar
                value={currentDate}
                onPanelChange={onPanelChange}
                mode={viewMode as any}
                monthCellRender={monthCellRender}
                headerRender={() => null} // Hide default header since we have custom controls
            />

            {/* Add Reminder Modal */}
            <Modal
                title="Add reminder"
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                okText="Submit"
                cancelText="Cancel"
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{
                        repeat: 'One time',
                        date: dayjs(),
                        startTime: dayjs(),
                        endTime: dayjs()
                    }}
                >
                    <Form.Item
                        name="eventName"
                        label="Event Name"
                        rules={[{ required: true, message: 'Please enter event name' }]}
                    >
                        <Input placeholder="Enter event name" />
                    </Form.Item>

                    <Form.Item
                        name="repeat"
                        label="Repeat"
                        rules={[{ required: true, message: 'Please select repeat option' }]}
                    >
                        <Select>
                            <Option value="One time">One time</Option>
                            <Option value="Daily">Daily</Option>
                            <Option value="Weekly">Weekly</Option>
                            <Option value="Monthly">Monthly</Option>
                            <Option value="Yearly">Yearly</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="date"
                        label="Date"
                        rules={[{ required: true, message: 'Please select date' }]}
                    >
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name="startTime"
                        label="Start time"
                        rules={[{ required: true, message: 'Please select start time' }]}
                    >
                        <TimePicker style={{ width: '100%' }} format="HH:mm" />
                    </Form.Item>

                    <Form.Item
                        name="endTime"
                        label="End time"
                        rules={[{ required: true, message: 'Please select end time' }]}
                    >
                        <TimePicker style={{ width: '100%' }} format="HH:mm" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Reminder;