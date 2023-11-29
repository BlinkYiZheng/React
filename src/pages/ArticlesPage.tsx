import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Papa from 'papaparse';
import { Button, Table, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';

// 定义表格列的配置
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Google Scholar',
    dataIndex: 'google_scholar',
    key: 'google_scholar',
    render: text => <a href={text} target="_blank" rel="noopener noreferrer">Profile</a>,
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Link',
    dataIndex: 'link',
    key: 'link',
    render: text => <a href={text} target="_blank" rel="noopener noreferrer">Link</a>,
  },
  {
    title: 'Authors',
    dataIndex: 'authors',
    key: 'authors',
  },
  {
    title: 'Publication Info',
    dataIndex: 'publication_info',
    key: 'publication_info',
  },
  {
    title: 'Citation',
    dataIndex: 'citation',
    key: 'citation',
  },
  {
    title: 'Year',
    dataIndex: 'year',
    key: 'year',
  },
];

// 接口定义
interface Scholar {
  name: string;
  google_scholar: string;
  title: string;
  link: string;
  authors: string;
  publication_info: string;
  citation: number;
  year: number;
}

const ArticlesPage = () => {
  const [data, setData] = useState<Scholar[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { name } = useParams<{ name: string }>();

  useEffect(() => {
    // 从 CSV 文件中读取数据
    fetch('/scholars.csv')
      .then(response => response.text())
      .then(data => {
        const results = Papa.parse(data, { header: true, skipEmptyLines: true });
        const filteredData = results.data.filter((item: Scholar) => item.name === name);
        setData(filteredData as Scholar[]);
      });
  }, [name]);

  // 搜索处理函数
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // 根据搜索词过滤数据
  const filteredData = data.filter(
    item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.year.toString().includes(searchTerm)
  );

  // 导出为 Excel 文件的函数
  const exportToExcel = (data: Scholar[], fileName = 'exported_data') => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  return (
    <div>
      <h1>Articles of Professor: {name}</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
      <Input
        prefix={<SearchOutlined />}
        placeholder="Search by title or year"
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
      <Table columns={columns} dataSource={filteredData} rowKey="title" />
    </div>
  );
};

export default ArticlesPage;
