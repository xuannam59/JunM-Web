import { callGetArtists } from '@/apis/artist.api';
import { callUploadFile } from '@/apis/file.api';
import { callCreateSong, callUpdateSong } from '@/apis/song.api';
import { ISong, ISongForm } from '@/types/song.type';
import { capitalizeVietnamese, handleChangeUpload, replaceSlug } from '@/utils/constant';
import { musicGenres } from '@/utils/song.constant';
import { useTheme } from '@/utils/ThemeProvider';
import { App, Button, DatePicker, Form, Input, Modal, Select, Upload } from 'antd';
import { BaseOptionType } from 'antd/es/select';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { TbUpload } from 'react-icons/tb';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    song: ISong | null;
    loadData: () => Promise<void>
}

const SongModal = ({ isOpen, onClose, song, loadData }: IProps) => {
    const [form] = Form.useForm();
    const { darkMode } = useTheme();
    const { message, notification } = App.useApp();
    const [artistsData, setArtistsData] = useState<BaseOptionType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [thumbnailUrl, setThumbnailUrl] = useState<any[]>([]);
    const [audioUrl, setAudioUrl] = useState<any[]>([]);
    const [durations, setDurations] = useState<number>(0);

    useEffect(() => {
        if (song) {
            const data = {
                song_id: song.song_id,
                title: song.title,
                genre: song.genre,
                release_date: dayjs(song.release_date),
                artist_id: song.artist_id,
                album_id: song.album_id ? song.album_id : "",
                durations: song.durations,
                lyrics: song.lyrics,
            }
            setThumbnailUrl([{
                uuid: "-1",
                url: song.thumbnail_url,
                status: "done"
            }])
            setAudioUrl([{
                uuid: "-1",
                url: song.file_url,
                status: "done"
            }])
            form.setFieldsValue(data);
        }
    }, [song]);

    useEffect(() => {
        getArtists()
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

    const handleSubmit = async (values: ISongForm) => {
        setIsLoading(true);
        const data: ISongForm = {
            song_id: values.song_id,
            title: capitalizeVietnamese(values.title),
            genre: values.genre,
            release_date: dayjs(values.release_date).format('YYYY-MM-DD') as unknown as Date,
            artist_id: values.artist_id,
            album_id: values.album_id || null,
            lyrics: values.lyrics,
            durations: durations,
            thumbnail_url: "",
            file_url: "",
        }

        // Upload thumbnail
        if (thumbnailUrl.length > 0) {
            for(let file of thumbnailUrl) {
                if(file.originFileObj) {
                    const url = await callUploadFile(file.originFileObj, "songs/thumbnails");
                    if(url.data?.fileUpload) {
                        data.thumbnail_url = url.data.fileUpload;
                    }else {
                        notification.error({
                            message: "Upload thumbnail error",
                            description: url.message
                        });
                    }
                }else {
                    data.thumbnail_url = file.url;
                }
            }
        }

        // Upload audio file
        if (audioUrl.length > 0) {
            for(let file of audioUrl) {
                if(file.originFileObj) {
                    const url = await callUploadFile(file.originFileObj, "songs/audio");
                    if(url.data?.fileUpload) {
                        data.file_url = url.data.fileUpload;
                    }else {
                        notification.error({
                            message: "Upload audio error",
                            description: url.message
                        });
                    }
                }else {
                    data.file_url = file.url;
                }
            }
        }

        const toggleApi = song ? callUpdateSong(data) : callCreateSong(data);
        const res = await toggleApi;
        
        if (res.data) {
            message.success(`${song ? "Update" :"Create new"} song successfully`);
            onCancel();
            loadData();
        } else {
            notification.error({
                message: `${song ?"Update" : "Create"} error`,
                description: res.message && Array.isArray(res.message) ? res.message.toString() : res.message
            })
        }
        setIsLoading(false);
    };

    const onCancel = () => {
        onClose();
        form.resetFields();
        setThumbnailUrl([]);
        setAudioUrl([]);
    }

    return (
        <Modal
            title={`${song ? "Update" : "Create"} Song`}
            open={isOpen}
            onCancel={onCancel}
            onOk={() => form.submit()}
            okText={song ? "Update":`Create`}
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
                <Form.Item name="song_id" hidden/>
                <div className="grid grid-cols-2 gap-4">
                    <Form.Item label="Thumbnail">
                        <Upload
                            accept='image/*'
                            fileList={thumbnailUrl}
                            maxCount={1}
                            multiple={false}
                            listType='picture-card'
                            className='!mb-2'
                            onChange={handleChangeUpload(setThumbnailUrl)}
                        >
                            {thumbnailUrl.length < 1 &&
                                <div className='flex flex-col items-center'>
                                    <TbUpload size={20} />
                                    <div className="font-bold bg-gradient-to-r from-[#EE10B0] to-[#0E9EEF] text-transparent bg-clip-text">
                                        Upload
                                    </div>
                                </div>
                            }
                        </Upload>
                    </Form.Item>
                    <div className="">
                        <Form.Item label="Audio File" className='mb-0'>
                            <Upload
                                accept="audio/*"
                                fileList={audioUrl}
                                maxCount={1}
                                multiple={false}
                                className='!mb-2'
                                showUploadList={{
                                    extra: ({ size = 0 }) => (
                                        <span style={{ color: '#cccccc' }}>({(size / 1024 / 1024).toFixed(2)}MB)</span>
                                    ),
                                    showDownloadIcon: true,
                                }}
                                onChange={handleChangeUpload(setAudioUrl)}
                            >
                                {audioUrl.length < 1 && <Button icon={<TbUpload />}>Upload audio file</Button>}
                            </Upload>
                        </Form.Item>
                        {audioUrl.length > 0 && (
                            <audio 
                                controls 
                                src={audioUrl[0].url}
                                className="w-full"
                                onLoadedMetadata={(e) => {
                                    const audioElement = e.target as HTMLAudioElement;
                                    setDurations(Math.ceil(audioElement.duration));
                                    form.setFieldValue('durations', Math.ceil(audioElement.duration));
                                }}
                            />
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: 'Please input song title!' }]}
                    >
                        <Input className={darkMode ? 'dark-input' : ''} />
                    </Form.Item>

                    <Form.Item
                        label="Durations (seconds)"
                        name="durations"
                        rules={[{ required: true, message: 'Durations is required!' }]}
                    >
                        <Input 
                            className={darkMode ? 'dark-input' : ''} 
                            type="number"
                            readOnly
                        />
                    </Form.Item>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Form.Item
                        label="Genre"
                        name="genre"
                        rules={[{ required: true, message: 'Please select genre!' }]}
                    >
                        <Select 
                        className={darkMode ? 'dark-select' : ''}
                        options={musicGenres.map(genre => (
                            {
                                value: genre.title,
                                label: genre.title,
                            }
                        ))}
                       
                        showSearch
                        />
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
                        label="Album"
                        name="album_id"
                    >
                        <Select 
                        className={darkMode ? 'dark-select' : ''} 
                        showSearch
                        filterOption={(input, option) =>
                            (replaceSlug(option?.label as string) ?? '').includes(
                                replaceSlug(input)
                            )}
                        />
                    </Form.Item>
                </div>

                <Form.Item
                    label="Lyrics"
                    name={"lyrics"}
                    rules={[{required: true, message: "Please input lyrics"}]}
                >
                    <Input.TextArea rows={4}/>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default SongModal; 