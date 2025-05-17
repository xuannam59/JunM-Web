import { IArtist, IArtistForm } from '@/types/artist.type';
import { useTheme } from '@/utils/ThemeProvider';
import { App, Form, Input, Modal, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { TbUpload } from 'react-icons/tb';
import { capitalizeVietnamese, handleChangeUpload, replaceSlug } from '@/utils/constant';
import { callCreateArtist, callUpdateArtist } from '@/apis/artist.api';
import { callUploadFile } from '@/apis/file.api';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    artist: IArtist | null;
    loadData: () => Promise<void>
}

const ArtistModal = ({ isOpen, onClose, artist, loadData }: IProps) => {
    const [form] = Form.useForm();
    const { darkMode } = useTheme();
    const { message, notification } = App.useApp();
    const [isLoading, setIsLoading] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState<any[]>([]);

    useEffect(() => {
        if (artist) {
            const data = {
                artist_id: artist.artist_id,
                artist_name: artist.artist_name,
            }
            setAvatarUrl([{
                uuid: "-1",
                url: artist.avatar || "/images/avatar-artist.webp",
                status: "done"
            }])
            form.setFieldsValue(data);
        }
    }, [artist]);

    const handleSubmit = async (values: IArtistForm) => {
        setIsLoading(true);
        const data: IArtistForm = {
            artist_id: values.artist_id,
            artist_name:capitalizeVietnamese(values.artist_name),
            avatar: ""
        }
        if (avatarUrl.length > 0) {
            for(let file of avatarUrl) {
                if(file.originFileObj) {
                    const url = await callUploadFile(file.originFileObj, "artists");
                    if(url.data?.fileUpload) {
                        data.avatar = url.data.fileUpload;
                    }else {
                        notification.error({
                            message: "Upload error",
                            description: url.message
                        });
                    }
                }else {
                    data.avatar = file.url;
                }
            }
        }

        const toggleApi = artist ? callUpdateArtist(data) : callCreateArtist(data);

        const res = await toggleApi;
        if (res.data) {
            message.success(`${artist ? "Update" :"Create new"} artist successfully`);
            onCancel();
            loadData();
        } else {
            notification.error({
                message: `${artist ?"Update" : "Create"} error`,
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
            title={`${artist ? "Update" : "Create"} Artist`}
            open={isOpen}
            onCancel={onCancel}
            onOk={() => form.submit()}
            okText={artist ? "Update":`Create`}
            cancelText="Close"
            maskClosable={false}
            okButtonProps={{
                loading: isLoading
            }}
            style={{ top: 50 }}
        >
            <Form
                disabled={isLoading}
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
                    className='!mb-2'
                    onChange={handleChangeUpload(setAvatarUrl)}
                >
                    {avatarUrl.length < 1 &&
                        <div className='flex flex-col items-center'>
                            <TbUpload size={20} />
                            <div className="font-bold bg-gradient-to-r from-[#EE10B0] to-[#0E9EEF] text-transparent bg-clip-text">
                                Upload
                            </div>
                        </div>
                    }
                </Upload>
                <Form.Item name="artist_id" hidden/>

                <Form.Item
                    label="Artist name"
                    name="artist_name"
                    rules={[{ required: true, message: 'Please input artist name!' }]}
                >
                    <Input className={darkMode ? 'dark-input' : ''} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ArtistModal;