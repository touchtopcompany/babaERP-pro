import React, { useState } from 'react';
import { Typography, Input, Tag, Divider, Breadcrumb, Space } from 'antd';
import { Link } from 'react-router-dom';
import { 
  RocketOutlined,
  SettingOutlined,
  ApiOutlined,
  DatabaseOutlined,
  SearchOutlined,
  BookOutlined,
  SafetyOutlined,
  AppstoreOutlined,
  CustomerServiceOutlined,
  MenuOutlined,
  CloseOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import Layout from '../components/Layout';
import './Documentation.css';

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;

interface DocSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  articles: {
    id: string;
    title: string;
    description?: string;
    tag?: string;
    content?: string;
  }[];
}

const Documentation: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('getting-started');
  const [activeArticle, setActiveArticle] = useState<string>('quick-start');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const docSections: DocSection[] = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <RocketOutlined />,
      articles: [
        { 
          id: 'quick-start', 
          title: 'Quick Start Guide', 
          description: 'Get up and running in minutes',
          tag: 'Beginner',
        },
        { 
          id: 'installation', 
          title: 'Installation & Setup', 
          description: 'Install and configure BabaERP',
        },
        { 
          id: 'first-steps', 
          title: 'Your First Steps', 
          description: 'Essential tasks to get started',
        },
        { 
          id: 'account-setup', 
          title: 'Account Configuration', 
          description: 'Configure your account settings',
        },
      ],
    },
    {
      id: 'core-modules',
      title: 'Core Modules',
      icon: <AppstoreOutlined />,
      articles: [
        { 
          id: 'inventory', 
          title: 'Inventory Management', 
          description: 'Complete inventory control system' 
        },
        { 
          id: 'crm', 
          title: 'CRM & Sales', 
          description: 'Customer relationship management' 
        },
        { 
          id: 'finance', 
          title: 'Financial Management', 
          description: 'Accounting and finance features' 
        },
        { 
          id: 'projects', 
          title: 'Project Management', 
          description: 'Plan and manage projects' 
        },
        { 
          id: 'manufacturing', 
          title: 'Manufacturing', 
          description: 'Production and manufacturing workflows' 
        },
      ],
    },
    {
      id: 'configuration',
      title: 'Configuration',
      icon: <SettingOutlined />,
      articles: [
        { 
          id: 'users', 
          title: 'User Management', 
          description: 'Manage users, roles, and permissions' 
        },
        { 
          id: 'workflows', 
          title: 'Workflow Setup', 
          description: 'Configure automated workflows' 
        },
        { 
          id: 'integrations', 
          title: 'Third-Party Integrations', 
          description: 'Connect external services' 
        },
        { 
          id: 'customization', 
          title: 'Customization', 
          description: 'Customize your ERP system' 
        },
      ],
    },
    {
      id: 'api',
      title: 'API Reference',
      icon: <ApiOutlined />,
      articles: [
        { 
          id: 'api-overview', 
          title: 'API Overview', 
          description: 'Introduction to the API' 
        },
        { 
          id: 'authentication', 
          title: 'Authentication', 
          description: 'API authentication methods',
          content: `
# API Authentication

BabaERP uses API keys for authentication. Include your API key in the request header.

## Getting Your API Key

1. Navigate to Settings > API Keys
2. Click "Create New API Key"
3. Copy and securely store your key

## Usage

\`\`\`bash
curl https://api.babaerp.com/v1/products \\
  -H "Authorization: Bearer YOUR_API_KEY"
\`\`\`

## Rate Limits

- Free tier: 100 requests/hour
- Pro tier: 1000 requests/hour
- Enterprise: Custom limits
          `
        },
        { 
          id: 'endpoints', 
          title: 'API Endpoints', 
          description: 'Complete endpoint reference' 
        },
        { 
          id: 'webhooks', 
          title: 'Webhooks', 
          description: 'Real-time event notifications' 
        },
        { 
          id: 'sdks', 
          title: 'SDKs & Libraries', 
          description: 'Client libraries and tools' 
        },
      ],
    },
    {
      id: 'data',
      title: 'Data Management',
      icon: <DatabaseOutlined />,
      articles: [
        { 
          id: 'import', 
          title: 'Data Import', 
          description: 'Import data from various sources' 
        },
        { 
          id: 'export', 
          title: 'Data Export', 
          description: 'Export and backup your data' 
        },
        { 
          id: 'migration', 
          title: 'Data Migration', 
          description: 'Migrate from other systems' 
        },
        { 
          id: 'backup', 
          title: 'Backup & Restore', 
          description: 'Backup and recovery procedures' 
        },
      ],
    },
    {
      id: 'security',
      title: 'Security & Compliance',
      icon: <SafetyOutlined />,
      articles: [
        { 
          id: 'security-settings', 
          title: 'Security Settings', 
          description: 'Configure security options' 
        },
        { 
          id: 'access-control', 
          title: 'Access Control', 
          description: 'Role-based access control' 
        },
        { 
          id: 'compliance', 
          title: 'Compliance Guide', 
          description: 'Meet regulatory requirements' 
        },
        { 
          id: 'audit', 
          title: 'Audit Logs', 
          description: 'Monitor system activity' 
        },
      ],
    },
    {
      id: 'guides',
      title: 'Guides & Tutorials',
      icon: <BookOutlined />,
      articles: [
        { 
          id: 'inventory-guide', 
          title: 'Inventory Management Guide', 
          description: 'Complete inventory guide' 
        },
        { 
          id: 'sales-guide', 
          title: 'Sales & CRM Guide', 
          description: 'Master sales processes' 
        },
        { 
          id: 'reports-guide', 
          title: 'Financial Reports', 
          description: 'Generate and understand reports' 
        },
        { 
          id: 'workflows-guide', 
          title: 'Custom Workflows', 
          description: 'Build custom workflows' 
        },
      ],
    },
    {
      id: 'support',
      title: 'Support & Help',
      icon: <CustomerServiceOutlined />,
      articles: [
        { 
          id: 'faq', 
          title: 'Frequently Asked Questions', 
          description: 'Common questions and answers' 
        },
        { 
          id: 'troubleshooting', 
          title: 'Troubleshooting', 
          description: 'Solve common issues' 
        },
        { 
          id: 'contact', 
          title: 'Contact Support', 
          description: 'Get help from our team' 
        },
        { 
          id: 'community', 
          title: 'Community Forum', 
          description: 'Join the community' 
        },
      ],
    },
  ];

  const getActiveSection = () => {
    return docSections.find(section => section.id === activeSection) || docSections[0];
  };

  const getActiveArticle = () => {
    const section = getActiveSection();
    return section.articles.find(article => article.id === activeArticle) || section.articles[0];
  };

  const filteredSections = docSections.filter(section => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      section.title.toLowerCase().includes(query) ||
      section.articles.some(article => 
        article.title.toLowerCase().includes(query) ||
        article.description?.toLowerCase().includes(query)
      )
    );
  });

  const articleContent = getActiveArticle();

  return (
    <Layout>
      <div className="docs-page">
        <div className="docs-header">
          <div className="docs-header-content">
            <Breadcrumb
              items={[
                { href: '/', title: <HomeOutlined /> },
                { title: 'Documentation' },
                { title: getActiveSection().title },
                { title: getActiveArticle().title },
              ]}
              className="docs-breadcrumb"
            />
            <Title level={1} className="docs-title">
              {getActiveArticle().title}
            </Title>
            <Paragraph className="docs-subtitle">
              {getActiveArticle().description || 'Comprehensive documentation and guides'}
            </Paragraph>
            <div className="docs-search-wrapper">
              <Search
                placeholder="Search documentation..."
                allowClear
                enterButton={<SearchOutlined />}
                size="large"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="docs-search"
              />
            </div>
          </div>
        </div>

        <div className="docs-container">
          <div className={`docs-sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
            <div className="sidebar-header">
              <Title level={4} className="sidebar-title">Documentation</Title>
              <button 
                className="sidebar-close"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close sidebar"
              >
                <CloseOutlined />
              </button>
            </div>
            <nav className="docs-nav">
              {filteredSections.map((section) => (
                <div key={section.id} className="docs-nav-section">
                  <div 
                    className={`nav-section-header ${activeSection === section.id ? 'active' : ''}`}
                    onClick={() => {
                      setActiveSection(section.id);
                      setActiveArticle(section.articles[0].id);
                      setSidebarOpen(false);
                    }}
                  >
                    <span className="nav-section-icon">{section.icon}</span>
                    <span className="nav-section-title">{section.title}</span>
                  </div>
                  <div className={`nav-section-content ${activeSection === section.id ? 'expanded' : ''}`}>
                    {section.articles.map((article) => (
                      <button
                        key={article.id}
                        className={`nav-article-link ${activeArticle === article.id ? 'active' : ''}`}
                        onClick={() => {
                          setActiveArticle(article.id);
                          setSidebarOpen(false);
                        }}
                      >
                        <Text>{article.title}</Text>
                        {article.tag && <Tag color="blue">{article.tag}</Tag>}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </div>

          <div className="docs-main">
            <button 
              className="sidebar-toggle"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <MenuOutlined />
            </button>

            <div className="docs-content">
              <article className="docs-article">
                {articleContent.content ? (
                  <div className="article-content" dangerouslySetInnerHTML={{ 
                    __html: articleContent.content
                      .split('\n')
                      .map(line => {
                        if (line.startsWith('# ')) {
                          return `<h1>${line.substring(2)}</h1>`;
                        } else if (line.startsWith('## ')) {
                          return `<h2>${line.substring(3)}</h2>`;
                        } else if (line.startsWith('```')) {
                          return line === '```' ? '<pre><code>' : '</code></pre>';
                        } else if (line.trim().startsWith('- ')) {
                          return `<li>${line.substring(2)}</li>`;
                        } else if (line.trim()) {
                          return `<p>${line}</p>`;
                        }
                        return '';
                      })
                      .join('')
                  }} />
                ) : (
                  <>
                    <div className="article-header">
                      <Title level={1} className="article-main-title">
                        {articleContent.title}
                      </Title>
                      {articleContent.tag && (
                        <div style={{ marginTop: '8px' }}>
                          <Tag color="blue" className="article-tag">{articleContent.tag}</Tag>
                        </div>
                      )}
                    </div>
                    <Divider style={{ margin: '16px 0 24px 0' }} />
                    <div className="article-body">
                      <Paragraph className="article-intro" style={{ marginBottom: '32px' }}>
                        {articleContent.description || 'Documentation content coming soon.'}
                      </Paragraph>
                      <div className="article-placeholder">
                        <Text type="secondary">
                          This documentation section is being updated. Please check back soon for detailed information.
                        </Text>
                      </div>
                    </div>
                  </>
                )}
              </article>

              <Divider />

              <div className="docs-footer">
                <Space>
                  <Text type="secondary">Last updated: {new Date().toLocaleDateString()}</Text>
                  <Text type="secondary">•</Text>
                  <Link to="/contact">Report an issue</Link>
                </Space>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Documentation;
