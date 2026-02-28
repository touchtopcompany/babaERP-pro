import React, { useState } from 'react';
import { Card, Input, Select, Button, Space, List, Avatar, Typography, Tag } from 'antd';
import { PlusOutlined, UserOutlined, TeamOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;
const { Text, Title } = Typography;

interface Message {
    id: string;
    sender: string;
    content: string;
    timestamp: string;
    location: string;
    isOwn: boolean;
}

const Messages: React.FC = () => {
    const [messageInput, setMessageInput] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('main-office');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            sender: 'John Manager',
            content: 'Team meeting scheduled for 3 PM today',
            timestamp: '2024-02-28 09:30',
            location: 'main-office',
            isOwn: false
        },
        {
            id: '2',
            sender: 'Alice Developer',
            content: 'I have completed the quarterly report',
            timestamp: '2024-02-28 10:15',
            location: 'branch-office',
            isOwn: false
        },
        {
            id: '3',
            sender: 'You',
            content: 'Great work! Please send me the report',
            timestamp: '2024-02-28 10:20',
            location: 'main-office',
            isOwn: true
        }
    ]);

    const locations = [
        { value: 'main-office', label: 'Main Office' },
        { value: 'branch-office', label: 'Branch Office' },
        { value: 'warehouse', label: 'Warehouse' },
        { value: 'retail-store', label: 'Retail Store' },
        { value: 'remote', label: 'Remote' }
    ];

    const handleSendMessage = () => {
        if (messageInput.trim()) {
            const newMessage: Message = {
                id: Date.now().toString(),
                sender: 'You',
                content: messageInput,
                timestamp: dayjs().format('YYYY-MM-DD HH:mm'),
                location: selectedLocation,
                isOwn: true
            };
            setMessages([...messages, newMessage]);
            setMessageInput('');
        }
    };

    const filteredMessages = messages.filter(msg => msg.location === selectedLocation);

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <Card style={{ borderRadius: 0, borderLeft: 0, borderRight: 0, borderTop: 0 }}>
                <Title level={3} style={{ margin: 0 }}>Messages</Title>
                <Space>
                    <Tag color="blue">{selectedLocation}</Tag>
                    <Text type="secondary">{filteredMessages.length} messages</Text>
                </Space>
            </Card>

            {/* Messages List */}
            <Card
                style={{
                    flex: 1,
                    borderRadius: 0,
                    borderLeft: 0,
                    borderRight: 0,
                    borderTop: 0,
                    overflowY: 'auto',
                    maxHeight: 'calc(100vh - 200px)'
                }}
                bodyStyle={{ padding: '16px' }}
            >
                <List
                    itemLayout="horizontal"
                    dataSource={filteredMessages}
                    renderItem={(message) => (
                        <List.Item style={{ padding: '8px 0', borderBottom: 'none' }}>
                            <List.Item.Meta
                                avatar={
                                    <Avatar
                                        icon={message.isOwn ? <UserOutlined /> : <TeamOutlined />}
                                        style={{
                                            backgroundColor: message.isOwn ? '#1890ff' : '#52c41a'
                                        }}
                                    />
                                }
                                title={
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text strong>{message.sender}</Text>
                                        <Text type="secondary" style={{ fontSize: '12px' }}>
                                            {dayjs(message.timestamp).format('HH:mm')}
                                        </Text>
                                    </div>
                                }
                                description={
                                    <div>
                                        <Text>{message.content}</Text>
                                        <div style={{ marginTop: '4px' }}>
                                            <Text type="secondary" style={{ fontSize: '11px' }}>
                                                {dayjs(message.timestamp).format('MMM DD, YYYY')}
                                            </Text>
                                        </div>
                                    </div>
                                }
                            />
                        </List.Item>
                    )}
                />
            </Card>

            {/* Message Input */}
            <Card style={{ borderRadius: 0, borderLeft: 0, borderRight: 0, borderBottom: 0 }}>
                <Space.Compact style={{ width: '100%' }}>
                    <Select
                        value={selectedLocation}
                        onChange={setSelectedLocation}
                        style={{ width: 150 }}
                        placeholder="Select location"
                    >
                        {locations.map(location => (
                            <Option key={location.value} value={location.value}>
                                {location.label}
                            </Option>
                        ))}
                    </Select>
                    <TextArea
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        placeholder="Type message..."
                        autoSize={{ minRows: 1, maxRows: 3 }}
                        onPressEnter={(e) => {
                            if (!e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage();
                            }
                        }}
                    />
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleSendMessage}
                        style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
                    >
                        Send
                    </Button>
                </Space.Compact>
            </Card>
        </div>
    );
};

export default Messages;