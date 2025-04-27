import { callDeleteUser, callGetUsers } from '@/apis/user.api';
import TableCommon from '@/components/common/TableCommon';
import TitleCommon from '@/components/common/TitleCommon';
import UserModal from '@/components/modals/UserModal';
import { IUser } from '@/types/user.type';
import { App, Avatar, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

const UserPage = () => {
    let timeoutId: ReturnType<typeof setTimeout>;
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

    useEffect(() => {
        getUsers()
    }, [current, pageSize, sortQuery, searchText]);

    const getUsers = async () => {
        setIsLoading(true);
        let query = `current=${current}&pageSize=${pageSize}&sort=${sortQuery}`;
        if (searchText) {
            query += `&search=${searchText}`;
        }
        const res = await callGetUsers(query);
        if (res.data) {
            setData(res.data.result);
            setTotalItem(res.data.meta.totalItems);
        }
        setIsLoading(false);
    }

    const columns: ColumnsType<IUser> = [
        {
            key: "index",
            render: (_,_1, index) => {
                return (current - 1)*pageSize + index + 1
            }
        },
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
            width: 100,
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
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at',
            align: "center",
            sorter: true,
            render: (created_at: Date) => dayjs(created_at).format("DD/MM/YYYY"),
        },
    ];

    const handleDelete = async (record: any) => {
        setIsLoading(true);
        const res = await callDeleteUser(record.user_id);
        if (res.data) {
            message.success(res.data);
            getUsers()
        } else {
            notification.error({
                message: "Delete error",
                description: res.message
            })
        }
        setIsLoading(false);
    }

    const handleSearch = (value: string) => {
        if(value.length > 3) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setSearchText(value);
                setCurrent(1);
            }, 1000);
        }else {
            setSearchText("");
            clearTimeout(timeoutId);
        }

    }

    return (
        <>
            <TitleCommon
            title='Users Management'
            handleSearch={handleSearch}
            onRenew={() => {
                getUsers();
            }}
            />

            <TableCommon
                isLoading={isLoading}
                columns={columns}
                data={data}
                currentState={{ current, setCurrent }}  
                pageSizeState={{ pageSize, setPageSize }} 
                totalItem={totalItem}
                sortQueryState={{  sortQuery, setSortQuery }}
                handleDelete={handleDelete}
                setIsModalOpen={setIsModalOpen}
                setSelectedData={setSelectedUser}
                rowKey='user_id'
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
        </>
    );
};

export default UserPage;