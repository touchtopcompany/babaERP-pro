import { Layout, Menu, Button, Input, Badge, Avatar } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  GlobalOutlined,
  TeamOutlined,
  AreaChartOutlined,
  SettingOutlined,
  LogoutOutlined,
  SearchOutlined,
  BellOutlined
} from '@ant-design/icons';
import DashboardComponent from './components/Dashboard';

const { Sider, Content } = Layout;

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { key: '1', icon: <DashboardOutlined />, label: 'Dashboard', path: '/dashboard' },
    { key: '2', icon: <GlobalOutlined />, label: 'Subdomain Management', path: '/dashboard/subdomains' },
    { key: '3', icon: <TeamOutlined />, label: 'User Management', path: '/dashboard/users' },
    { key: '4', icon: <AreaChartOutlined />, label: 'Analytics', path: '/dashboard/analytics' },
    { key: '5', icon: <SettingOutlined />, label: 'Setting', path: '/dashboard/settings' },
  ];

  const selectedKey = menuItems.find(item => location.pathname === item.path)?.key || '1';
  return (
    <Layout style={{ minHeight: '100vh', background: '#0d9488' }}>
      {/* Sidebar */}
      <Sider
        width={260}
        style={{
          background: '#0d9488',
          padding: '40px 0',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
        }}
      >
        <div style={{ color: 'white', padding: '0 40px', fontSize: '22px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '50px' }}>
          <div style={{ width: '40px', height: '40px', background: 'white', borderRadius: '12px' }} />
          <span>BabaERP</span>
        </div>

        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          style={{ background: 'transparent', color: 'rgba(255,255,255,0.7)', border: 'none' }}
          className="classic-menu"
        >
          {menuItems.map(item => (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </Menu.Item>
          ))}
        </Menu>

        <div style={{ position: 'absolute', bottom: '50px', width: '100%', padding: '0 30px' }}>
          <Button icon={<LogoutOutlined />} size="large" style={{ width: '100%', height: '50px', borderRadius: '25px', border: 'none', fontWeight: '600' }}>
            Logout
          </Button>
        </div>
      </Sider>

      {/* Main Content */}
      <Layout style={{ marginLeft: 260, background: '#0d9488' }}>
        <Content style={{ minHeight: '100vh' }}>
          <div style={{
            background: '#F8FAFC',
            minHeight: '100vh',
            width: '100%',
            borderRadius: '50px 0 0 50px',
            padding: '40px 50px',
            boxShadow: '-15px 0 30px rgba(0,0,0,0.1)'
          }}>
            {/* Header Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
              <Input
                placeholder="Search.."
                prefix={<SearchOutlined style={{ color: 'rgba(9, 9, 9, 1)' }} />}
                style={{
                  width: '300px',
                  borderRadius: '15px',
                  background: '#f0f2f5',
                  border: '1px solid transparent',
                  height: '40px',
                  transition: 'border-color 0.3s',
                  color: 'black'
                }}
                className="[&::placeholder]:text-black/60 hover:border-black/60 focus:border-black/60 focus:shadow-sm"
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <Badge dot color="#0d9488">
                  <BellOutlined style={{ fontSize: '20px', color: '#666' }} />
                </Badge>
                <Avatar style={{ backgroundColor: '#0d9488', verticalAlign: 'middle' }} size="large">YN</Avatar>
              </div>
            </div>

            {/* Nested routes will be rendered here */}
            <Outlet />

            {/* Render the appropriate component based on the route */}
            {location.pathname === '/dashboard' && <DashboardComponent />}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;