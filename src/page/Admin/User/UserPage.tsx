import { IUser } from '@/types/user.type';
import { useTheme } from '@/utils/ThemeProvider';
import { Button, Input, Space, Table, Tag, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { TbEdit, TbPlus, TbTrash } from 'react-icons/tb';

const UserPage = () => {
  const [searchText, setSearchText] = useState('');
  
  const { darkMode } = useTheme();

  const data: IUser[] = [
    {
      user_id: "1",
      username: 'John Brown',
      email: 'john@example.com',
      full_name: 'John Brown',
      avatar: 'https://i.pravatar.cc/150?img=1',
      number_phone: '0123456789',
      role: 'user',
      is_blocked: false,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      user_id: "2",
      username: 'Jim Green',
      email: 'jim@example.com',
      full_name: 'Jim Green',
      avatar: 'https://i.pravatar.cc/150?img=2',
      number_phone: '0987654321',
      role: 'admin',
      is_blocked: false,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      user_id: "3",
      username: 'Joe Black',
      email: 'joe@example.com',
      full_name: 'Joe Black',
      avatar: 'https://i.pravatar.cc/150?img=3',
      number_phone: '0123456789',
      role: 'user',
      is_blocked: true,
      blocked_at: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      user_id: "4",
      username: 'Joe Black',
      email: 'joe@example.com',
      full_name: 'Joe Black',
      avatar: 'https://i.pravatar.cc/150?img=3',
      number_phone: '0123456789',
      role: 'user',
      is_blocked: true,
      blocked_at: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      user_id: "5",
      username: 'Joe Black',
      email: 'joe@example.com',
      full_name: 'Joe Black',
      avatar: 'https://i.pravatar.cc/150?img=3',
      number_phone: '0123456789',
      role: 'user',
      is_blocked: true,
      blocked_at: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      user_id: "6",
      username: 'Joe Black',
      email: 'joe@example.com',
      full_name: 'Joe Black',
      avatar: 'https://i.pravatar.cc/150?img=3',
      number_phone: '0123456789',
      role: 'user',
      is_blocked: true,
      blocked_at: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      user_id: "7",
      username: 'Joe Black',
      email: 'joe@example.com',
      full_name: 'Joe Black',
      avatar: 'https://i.pravatar.cc/150?img=3',
      number_phone: '0123456789',
      role: 'user',
      is_blocked: true,
      blocked_at: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      user_id: "8",
      username: 'Joe Black',
      email: 'joe@example.com',
      full_name: 'Joe Black',
      avatar: 'https://i.pravatar.cc/150?img=3',
      number_phone: '0123456789',
      role: 'user',
      is_blocked: true,
      blocked_at: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      user_id: "9",
      username: 'Joe Black',
      email: 'joe@example.com',
      full_name: 'Joe Black',
      avatar: 'https://i.pravatar.cc/150?img=3',
      number_phone: '0123456789',
      role: 'user',
      is_blocked: true,
      blocked_at: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      user_id: "10",
      username: 'Joe Black',
      email: 'joe@example.com',
      full_name: 'Joe Black',
      avatar: 'https://i.pravatar.cc/150?img=3',
      number_phone: '0123456789',
      role: 'user',
      is_blocked: true,
      blocked_at: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      user_id: "11",
      username: 'Joe Black',
      email: 'joe@example.com',
      full_name: 'Joe Black',
      avatar: 'https://i.pravatar.cc/150?img=3',
      number_phone: '0123456789',
      role: 'user',
      is_blocked: true,
      blocked_at: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    },
  ];

  const columns: ColumnsType<IUser> = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar: string) => (
        <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
      ),
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          String(record.username).toLowerCase().includes(String(value).toLowerCase()) ||
          String(record.email).toLowerCase().includes(String(value).toLowerCase())
        );
      },
    },
    {
      title: 'Full Name',
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'number_phone',
      key: 'number_phone',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => (
        <Tag color={role === 'admin' ? 'purple' : 'blue'}>
          {role.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'is_blocked',
      key: 'is_blocked',
      render: (is_blocked: boolean, record) => (
        <Tag color={is_blocked ? 'error' : 'success'}>
          {is_blocked ? "Blocked" : "Active"}
        </Tag>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date: Date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <Button 
              color="primary" variant="text"
              icon={<TbEdit size={22}/>} 
              onClick={() => console.log('Edit:', record)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button 
              type="text" 
              danger 
              icon={<TbTrash size={22} />} 
              onClick={() => console.log('Delete:', record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className={`p-6 rounded-lg ${darkMode ? 'bg-[#353535]' : 'bg-white'}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-2xl font-semibold ${darkMode ? 'text-white' : ''}`}>Users Management</h1>
        <div className='flex gap-2'>
          <Input
            placeholder="Search users..."
            allowClear
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 300 }}
            className={darkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}
          />
          <Button 
            type="primary" 
            className='items-center'
            onClick={() => console.log('Create new user')}
          >
           <TbPlus size={20} />
            <span>
              Thêm người dùng
            </span>
          </Button>
        </div>
      </div>

      <Table 
        columns={columns} 
        dataSource={data}
        pagination={{
          total: data.length,
          pageSize: 10,
          showSizeChanger: true,
        }}
        rowClassName={() => darkMode ? 'bg-[#353535] text-white hover:bg-[#2A2A2A]' : 'hover:bg-gray-50'}
        scroll={{
          x: "max-content",
          y: 57*10
        }}
      />
    </div>
  );
};

export default UserPage;