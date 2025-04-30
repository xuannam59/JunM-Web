import { callGetArtists } from '@/apis/artist.api';
import { callGetSongs } from '@/apis/song.api';
import { callCreateVideo, callUpdateVideo } from '@/apis/video.api';
import { ISong } from '@/types/song.type';
import { IVideo, IVideoForm } from '@/types/video.type';
import { capitalizeVietnamese, replaceSlug } from '@/utils/constant';
import { useTheme } from '@/utils/ThemeProvider';
import { App, DatePicker, Form, Input, Modal, Select } from 'antd';
import { BaseOptionType } from 'antd/es/select';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { TbLink } from 'react-icons/tb';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    video: IVideo | null;
    loadData: () => Promise<void>
}

const VideoModal = ({ isOpen, onClose, video, loadData }: IProps) => {
    const [form] = Form.useForm();
    const { darkMode } = useTheme();
    const { message, notification } = App.useApp();
    const [artistsData, setArtistsData] = useState<BaseOptionType[]>([]);
    const [songsData, setSongsData] = useState<BaseOptionType[]>([]);
    const [songsDetail, setSongsDetail] = useState<ISong[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [videoUrl, setVideoUrl] = useState<any[]>([]);

    useEffect(() => {
        if (video) {
            const data = {
                video_id: video.video_id,
                title: video.title,
                song_id: video.song_id,
                artist_id: video.artist_id,
                release_date: dayjs(video.release_date),
                video_url: video.video_url
            }
            form.setFieldsValue(data);
        }
    }, [video]);

    useEffect(() => {
        getArtists();
        getSongs();
    }, []);

    const getArtists = async () => {
        const res = await callGetArtists("current=1&pageSize=1000");
        if(res.data) {
            const options = res.data.result.map(item => ({label: item.artist_name, value: item.artist_id}));
            setArtistsData(options);
        }else {
            notification.error({
                message: "Get the error artist data",
                description:res.message
            })
        }
    }

    const getSongs = async () => {
        const res = await callGetSongs("current=1&pageSize=1000");
        if(res.data) {
            const options = res.data.result.map(item => ({label: item.title, value: item.song_id}));
            setSongsData(options);
            setSongsDetail(res.data.result);
        }else {
            notification.error({
                message: "Get the error songs data",
                description:res.message
            })
        }
    }

    const handleSongChange = (songId: string) => {
        const selectedSong = songsDetail.find(song => song.song_id === songId);
        if (selectedSong) {
            form.setFieldValue('title', selectedSong.title);
            form.setFieldValue('artist_id', selectedSong.artist_id);
        }
    }

    const handleSubmit = async (values: IVideoForm) => {
        setIsLoading(true);
        const data: IVideoForm = {
            video_id: values.video_id,
            title: capitalizeVietnamese(values.title),
            song_id: values.song_id,
            artist_id: values.artist_id,
            release_date: dayjs(values.release_date).format('YYYY-MM-DD') as unknown as Date,
            video_url: values.video_url,
        }

        console.log(data);

        const toggleApi = video ? callUpdateVideo(data) : callCreateVideo(data);
        const res = await toggleApi;
        
        if (res.data) {
            message.success(`${video ? "Update" :"Create new"} video successfully`);
            onCancel();
            loadData();
        } else {
            notification.error({
                message: `${video ?"Update" : "Create"} error`,
                description: res.message && Array.isArray(res.message) ? res.message.toString() : res.message
            })
        }
        setIsLoading(false);
    };

    const onCancel = () => {
        onClose();
        form.resetFields();
        setVideoUrl([]);
    }

    return (
        <Modal
            title={`${video ? "Update" : "Create"} Video`}
            open={isOpen}
            onCancel={onCancel}
            onOk={() => form.submit()}
            okText={video ? "Update":`Create`}
            cancelText="Close"
            maskClosable={false}
            okButtonProps={{
                loading: isLoading
            }}
            style={{ top: 50 }}
            width={"50vw"}
        >
            <Form
                disabled={isLoading}
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Form.Item name="video_id" hidden/>
                
                <Form.Item label="Video File" name={"video_url"}>
                    <Input prefix={<TbLink/>}/>
                </Form.Item>

                {videoUrl.length > 0 && (
                    <video 
                        controls 
                        src={videoUrl[0].url}
                        className="w-full mb-4"
                    />
                )}

                    <div className="grid grid-cols-2 gap-4">
                    <Form.Item
                        label="Artist"
                        name="artist_id"
                        rules={[{ required: true, message: 'Please select artist!' }]}
                    >
                        <Select 
                            options={artistsData}
                            className={darkMode ? 'dark-select' : ''}
                            showSearch
                            filterOption={(input, option) =>
                                (replaceSlug(option?.label as string) ?? '').includes(
                                    replaceSlug(input)
                                )}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Song"
                        name="song_id"
                        rules={[{ required: true, message: 'Please select song!' }]}
                    >
                        <Select 
                            options={songsData}
                            className={darkMode ? 'dark-select' : ''}
                            showSearch
                            onChange={handleSongChange}
                            filterOption={(input, option) =>
                                (replaceSlug(option?.label as string) ?? '').includes(
                                    replaceSlug(input)
                                )}
                        />
                    </Form.Item>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: 'Please input video title!' }]}
                    >
                        <Input className={darkMode ? 'dark-input' : ''}  readOnly/>
                    </Form.Item>

                    <Form.Item
                        label="Release Date"
                        name="release_date"
                        rules={[{ required: true, message: 'Please select release date!' }]}
                    >
                        <DatePicker 
                            className={darkMode ? 'dark-input' : ''} 
                            style={{ width: '100%' }}
                            format="DD/MM/YYYY"
                        />
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    );
};

export default VideoModal; 