import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Button, Table, Input, Space } from 'antd';
import {
  MailOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  DatabaseOutlined,
  SearchOutlined
} from '@ant-design/icons';
import '../index.less';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';



interface ProfPrice {
  ID: number;
  Name: string;
  Position: string;
  Expertise: string;
  // ...其他字段...
}

const Navigation = () => {
  const [current, setCurrent] = useState('mail');

  const menuItems = [
    {
      label: 'Professor',
      key: 'mail',
      icon: <MailOutlined />,
      onClick: () => setCurrent('mail'),
    },
    // {
    //   label: 'Data',
    //   key: 'app',
    //   icon: <AppstoreOutlined />,
    //   onClick: () => setCurrent('app'),
    // },
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <h1 style={{ marginRight: '20px' }}>Urban Futures</h1>
      <Menu items={menuItems} selectedKeys={[current]} mode="horizontal" />
    </div>
  );
};

const exportToExcel = (data, fileName = 'exported_data') => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Data');
  XLSX.writeFile(wb, `${fileName}.xlsx`);
};

const Home = () => {
  const [data, setData] = useState<ProfPrice[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const columns = [
    // {
    //   title: 'ID',
    //   dataIndex: 'ID',
    //   key: 'ID',
    // },
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
    },
    {
      title: 'Link',
      dataIndex: 'Link',
      key: 'Link',
      render: (text: string) => <a href={text} target="_blank" rel="noopener noreferrer">{text}</a>,
    },
    {
      title: 'Position',
      dataIndex: 'Position',
      key: 'Position',
    },
    {
      title: 'Expertise',
      dataIndex: 'Expertise',
      key: 'Expertise',
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      key: 'Email',
    },
    {
      title: 'Scholar_Link',
      dataIndex: 'Scholar_Link',
      key: 'Scholar_Link',
      render: (text: string) => <a href={text} target="_blank" rel="noopener noreferrer">{text}</a>,
    },
    {
      title: 'Degree',
      dataIndex: 'Degree',
      key: 'Degree',
    },
    {
      title: 'Degree Institution',
      dataIndex: 'Degree Institution',
      key: 'Degree Institution',
    },
    {
      title: 'Scholars',
      key: 'Scholars',
      render: (record: ProfPrice) => (
        <Button
          icon={<FileTextOutlined />}
          onClick={() => navigate(`/articles/${record.Name}`)}
        />
      ),
    },
  ];
  useEffect(() => {
    fetch('/faculty.csv') 
    .then(response => response.text())
    .then(data => {
        const results = Papa.parse(data, { header: true, skipEmptyLines: true });
        setData(results.data);
    });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter(
    item =>
      item.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.Email && item.Email.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  return (
    <div>
      <Navigation />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
      <Input
      prefix={<SearchOutlined />}
        placeholder="Search by Name or Email"
        value={searchTerm}
        onChange={handleSearch}
        style={{ width: 400, marginBottom: '20px' }}
      />
      <Button 
        type="primary" 
        onClick={() => exportToExcel(filteredData, 'professor_data')}
        style={{ marginBottom: '20px' }}
      >
        Export to Excel
      </Button>
      </div>
      <Table columns={columns} dataSource={filteredData} rowKey="Name" />
      <footer className="homepage-footer">
      <p>Developed by [Yi Zheng]</p>
        <p>Version: 1.0.0</p>
      </footer>
    </div>
  );
};
  

export default Home;