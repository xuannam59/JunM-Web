import { IUser } from '@/types/user.type';
import { App, Button, Form, Input, Modal, Select, Switch, Upload } from 'antd';
import { useTheme } from '@/utils/ThemeProvider';
import React, { useEffect, useState } from 'react';
import { TbUpload } from 'react-icons/tb';
import { handleChangeUpload } from '@/utils/constant';
import { callEditUser } from '@/apis/user.api';

interface UserModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: IUser | null;
    loadData: () => Promise<void>
}



const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, user, loadData }) => {
    const [form] = Form.useForm();
    const { darkMode } = useTheme();
    const { message, notification } = App.useApp();
    const [isLoading, setIsLoading] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState<any[]>([]);

    useEffect(() => {
        if (user) {
            const data = {
                user_id: user.user_id,
                username: user.username,
                full_name: user.full_name,
                email: user.email,
                number_phone: user.number_phone,
                role: user.role,
                is_blocked: !user.is_blocked,
            }
            if (user.avatar) {
                setAvatarUrl([{
                    uuid: "-1",
                    url: user.avatar,
                    status: "done"
                }])
            }
            form.setFieldsValue(data);
        }
    }, [user]);

    const handleSubmit = async (values: IUser) => {
        setIsLoading(true);
        const data: IUser = {
            user_id: values.user_id,
            username: values.username,
            full_name: values.full_name,
            email: values.email,
            number_phone: values.number_phone,
            role: values.role,
            is_blocked: !values.is_blocked,
            avatar: ""
        }
        if (avatarUrl.length > 0) {
            if (avatarUrl[0].originFileObj) {
                console.log("có ảnh nè upload đi");
            } else {
                data.avatar = avatarUrl[0].url;
            }
        }

        const res = await callEditUser(data);
        if (res.data) {
            message.success(res.data);
            onCancel();
            loadData();
        } else {
            notification.error({
                message: "Edit error",
                description: res.message && Array.isArray(res.message) ? res.message.toString() : res.message
            })
        }
        setIsLoading(false);
    };


    const onCancel = () => {
        onClose();
        form.resetFields();
        setAvatarUrl([])
    }

    return (
        <Modal
            title="Edit User"
            open={isOpen}
            onCancel={onCancel}
            onOk={() => form.submit()}
            okText={"Edit"}
            cancelText="Close"
            maskClosable={false}
            okButtonProps={{
                loading: isLoading
            }}
            style={{ top: 50 }}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Upload
                    accept='image/*'
                    fileList={avatarUrl}
                    maxCount={1}
                    multiple={false}
                    listType='picture-card'
                    className='mb-2'
                    onChange={handleChangeUpload(setAvatarUrl)}
                >
                    {avatarUrl.length < 1 &&
                        <div className='flex flex-col items-center'>
                            <TbUpload size={20} />
                            <div className="font-bold bg-gradient-to-r
            from-[#EE10B0] to-[#0E9EEF] text-transparent bg-clip-text">
                                Upload
                            </div>
                        </div>
                    }
                </Upload>
                <Form.Item name="user_id" />

                <div className="grid grid-cols-2 gap-3">
                    <Form.Item
                        label="Username"
                        name="username"
                    >
                        <Input disabled />
                    </Form.Item>

                    <Form.Item
                        label="Full Name"
                        name="full_name"
                    >
                        <Input className={darkMode ? 'dark-input' : ''} disabled />
                    </Form.Item>
                </div>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Please input email!' },
                        { type: 'email', message: 'Please enter a valid email!' }
                    ]}
                >
                    <Input className={darkMode ? 'dark-input' : ''} disabled />
                </Form.Item>


                <Form.Item
                    label="Phone Number"
                    name="number_phone"
                >
                    <Input className={darkMode ? 'bg-[#353535]' : ''} disabled />
                </Form.Item>

                <Form.Item
                    label="Role"
                    name="role"
                    rules={[{ required: true, message: 'Please select role!' }]}
                >
                    <Select className={darkMode ? 'dark-select' : ''}>
                        <Select.Option value="USER">User</Select.Option>
                        <Select.Option value="ADMIN">Admin</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Status"
                    name="is_blocked"
                    valuePropName="checked"
                >
                    <Switch
                        checkedChildren="Active"
                        unCheckedChildren="Blocked"
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UserModal;