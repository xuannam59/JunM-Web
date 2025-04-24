import { callDeleteUser, callGetUsers } from '@/apis/user.api';
import { IUser } from '@/types/user.type';
import { useTheme } from '@/utils/ThemeProvider';
import { App, Avatar, Button, Dropdown, Input, MenuProps, Table, Tag, Tooltip } from 'antd';
import { ColumnsType, TableProps } from 'antd/es/table';
import { SorterResult } from 'antd/es/table/interface';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { TbDots, TbEdit, TbReload, TbSearch, TbTrash } from 'react-icons/tb';
import UserModal from '@/components/modals/UserModal';

const UserPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItem, setTotalItem] = useState(0);
    const [data, setData] = useState<IUser[]>([]);
    const [sortQuery, setSortQuery] = useState("-created_at");
    const [searchText, setSearchText] = useState('');
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { message, notification } = App.useApp();

    const { darkMode } = useTheme();

    useEffect(() => {
        getUsers()
    }, [current, pageSize, sortQuery, searchText]);

    const getUsers = async () => {
        setIsLoading(true);
        let query = `current=${current}&pageSize=${pageSize}&sort=${sortQuery}`;
        if (searchText) {
            query += ``;
        }
        const res = await callGetUsers(query);
        if (res.data) {
            setData(res.data.result);
            setTotalItem(res.data.meta.totalItems);
        }
        setIsLoading(false);
    }

    const getDropdownItems = (record: IUser): MenuProps['items'] => [
        {
            key: "edit",
            label: <div className='flex gap-2 text-amber-400'><TbEdit size={20} /> <span>Edit</span></div>,
            onClick: () => {
                setSelectedUser(record);
                setIsModalOpen(true);
            }
        },
        {
            key: "delete",
            label: "Delete",
            icon: <TbTrash size={20} />,
            danger: true,
            onClick: () => handleDelete(record.user_id)
        }
    ]

    const columns: ColumnsType<IUser> = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (avatar: string) => (
                <Avatar src={avatar ?? "/images/avatar-user.webp"} size={40} alt="avatar" />
            ),
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            minWidth: 100,
            render: (username: string) => {
                return <>
                    <span>{username ?? "--"}</span>
                </>
            }
        },
        {
            title: 'Full Name',
            dataIndex: 'full_name',
            key: 'full_name',
            align: "center",
            render: (full_name: string) => {
                return <>
                    <span>{full_name ?? "--"}</span>
                </>
            }
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            align: "center",
            render: (email: string) => {
                return <>
                    <span>{email ?? "--"}</span>
                </>
            }
        },
        {
            title: 'Google id',
            dataIndex: 'google_id',
            key: 'google_id',
            align: "center",
            render: (google_id: string) => {
                return <>
                    <span>{google_id ?? "--"}</span>
                </>
            }
        },
        {
            title: 'Number phone',
            dataIndex: 'number_phone',
            key: 'number_phone',
            align: "center",
            width: 150,
            render: (number_phone: string) => {
                return <>
                    <span>{number_phone ?? "--"}</span>
                </>
            }
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            align: "center",
            render: (role: string) => (
                <Tag color={role === 'ADMIN' ? 'purple' : 'blue'}>
                    {role.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'is_blocked',
            key: 'is_blocked',
            align: "center",
            render: (is_blocked: boolean) => (
                <Tag color={is_blocked ? 'error' : 'success'}>
                    {is_blocked ? "Blocked" : "Active"}
                </Tag>
            ),
        },
        {
            title: 'Deleted',
            dataIndex: 'is_deleted',
            key: 'is_deleted',
            align: "center",
            render: (is_deleted: boolean) => (
                <Tag color={is_deleted ? '#f50' : '#87d068'}>
                    {is_deleted ? "Deleted" : "Normal"}
                </Tag>
            ),
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at',
            align: "center",
            sorter: true,
            render: (created_at: Date) => dayjs(created_at).format("DD/MM/YYYY"),
        },
        {
            title: 'Deleted At',
            dataIndex: 'deleted_at',
            key: 'deleted_at',
            align: "center",
            sorter: true,
            render: (deleted_at: Date) => {
                return <>
                    {deleted_at ? dayjs(deleted_at).format("DD/MM/YYYY") : "--"}
                </>
            },
        },
        {
            key: 'action',
            render: (_, record) => (
                <Dropdown
                    menu={{
                        items: getDropdownItems(record),
                        style: { backgroundColor: darkMode ? "#333333" : "#ffffff" }
                    }}
                >
                    <Button type="text" icon={<TbDots size={20} />} />
                </Dropdown>
            ),
        },
    ];

    const onChangePagination: TableProps<IUser>['onChange'] = (pagination, filters, sorter) => {
        if (pagination.current && pagination.current !== current) {
            setCurrent(pagination.current);
        }
        if (pagination.pageSize && pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize);
            setCurrent(1);
        }

        const sorterResult = sorter as SorterResult<IUser> | SorterResult<IUser>[];
        let newSortQuery = '-created_at';

        if (!Array.isArray(sorterResult)) {
            const { field, order } = sorterResult;
            if (order && field) {
                newSortQuery = order === 'ascend' ? `${field}` : `-${field}`;
            }
        }

        if (newSortQuery !== sortQuery) {
            setSortQuery(newSortQuery);
            setCurrent(1);
        }
    }

    const handleDelete = async (user_id: string) => {
        setIsLoading(true);
        const res = await callDeleteUser(user_id);
        if (res.data) {
            message.success(res.data);
        } else {
            notification.error({
                message: "Delete error",
                description: res.message
            })
        }
        setIsLoading(false);
    }

    return (
        <div className={`p-6 rounded-lg ${darkMode ? 'bg-[#353535]' : 'bg-white'}`}>
            <div className="flex justify-between items-center mb-6">
                <h1 className={`text-2xl font-semibold ${darkMode ? 'text-white' : ''}`}>Users Management</h1>
                <div className='flex gap-2'>
                    <Input
                        placeholder="Search users..."
                        allowClear
                        suffix={<TbSearch size={20} className="text-gray-400" />}
                        onChange={(e) => setSearchText(e.target.value)}
                        className={` w-80 ${darkMode ? '!bg-[#353535] !border-gray-600 !text-white' : ''}`}
                    />
                    <Tooltip title={"Renew"}>
                        <Button
                            className={`!p-2 ${darkMode ? "!bg-[#353535]" : ""}`}
                            onClick={() => {
                                setSearchText("");
                                setCurrent(1);
                                setSortQuery("-created_at");
                            }}
                        ><TbReload size={20} /></Button>
                    </Tooltip>
                </div>
            </div>

            <Table
                loading={isLoading}
                columns={columns}
                dataSource={data}
                pagination={{
                    current: current,
                    total: totalItem,
                    pageSize: pageSize,
                    showSizeChanger: true,
                }}
                onChange={onChangePagination}
                rowClassName={() => darkMode ? 'bg-[#353535] text-white hover:bg-[#2A2A2A]' : 'hover:bg-gray-50'}
                scroll={{
                    x: "max-content",
                    y: 57 * 10
                }}
                rowKey={"user_id"}
            />

            <UserModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedUser(null);
                }}
                user={selectedUser}
                loadData={getUsers}
            />
        </div>
    );
};

export default UserPage;