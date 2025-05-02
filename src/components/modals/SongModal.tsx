import { callUploadFile } from '@/apis/file.api';
import { callCreateSong, callUpdateSong } from '@/apis/song.api';
import { ISong, ISongForm } from '@/types/song.type';
import { capitalizeVietnamese, handleChangeUpload, replaceSlug } from '@/utils/constant';
import { musicGenres } from '@/utils/song.constant';
import { useTheme } from '@/utils/ThemeProvider';
import { App, Button, DatePicker, Form, Input, Modal, Select, Upload } from 'antd';
import { BaseOptionType } from 'antd/es/select';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { TbUpload } from 'react-icons/tb';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    song: ISong | null;
    loadData: () => Promise<void>;
    artistsSelect: BaseOptionType[];
}

const SongModal = ({ isOpen, onClose, song, loadData, artistsSelect }: IProps) => {
    const [form] = Form.useForm();
    const { darkMode } = useTheme();
    const { message, notification } = App.useApp();
    const [isLoading, setIsLoading] = useState(false);
    const [thumbnailUrl, setThumbnailUrl] = useState<any[]>([]);
    const [audioUrl, setAudioUrl] = useState<any[]>([]);

    const resetForm = useCallback(() => {
        form.resetFields();
        setThumbnailUrl([]);
        setAudioUrl([]);
    }, [form]);

    useEffect(() => {
        if (song) {
            const data = {
                song_id: song.song_id,
                title: song.title,
                genre: song.genre,
                release_date: dayjs(song.release_date),
                artist_id: song.artist_id,
                durations: song.durations,
                lyrics: song.lyrics,
            };
            setThumbnailUrl([{
                uuid: "-1",
                url: song.thumbnail_url,
                status: "done"
            }]);
            setAudioUrl([{
                uuid: "-1",
                url: song.file_url,
                status: "done"
            }]);
            form.setFieldsValue(data);
        }
    }, [song, form]);

    const uploadFile = useCallback(async (file: File, path: string) => {
        const url = await callUploadFile(file, path);
        if (url.data?.fileUpload) {
            return url.data.fileUpload;
        }
        throw new Error(url.message);
    }, []);

    const handleSubmit = async (values: ISongForm) => {
        setIsLoading(true);
        try {
            const data: ISongForm = {
                song_id: values.song_id,
                title: capitalizeVietnamese(values.title),
                genre: values.genre,
                release_date: dayjs(values.release_date).format('YYYY-MM-DD') as unknown as Date,
                artist_id: values.artist_id,
                lyrics: values.lyrics,
                durations: values.durations,
                thumbnail_url: "",
                file_url: "",
            };

            // Upload thumbnail
            if (thumbnailUrl.length > 0) {
                const file = thumbnailUrl[0];
                if (file.originFileObj) {
                    data.thumbnail_url = await uploadFile(file.originFileObj, "songs/thumbnails");
                } else {
                    data.thumbnail_url = file.url;
                }
            }

            // Upload audio file
            if (audioUrl.length > 0) {
                const file = audioUrl[0];
                if (file.originFileObj) {
                    data.file_url = await uploadFile(file.originFileObj, "songs/audio");
                } else {
                    data.file_url = file.url;
                }
            }

            const res = await (song ? callUpdateSong(data) : callCreateSong(data));
            
            if (res.data) {
                message.success(`${song ? "Update" : "Create new"} song successfully`);
                onClose();
                resetForm();
                loadData();
            } else {
                throw new Error(res.message);
            }
        } catch (error) {
            notification.error({
                message: `${song ? "Update" : "Create"} error`,
                description: error instanceof Error ? error.message : "An error occurred"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        onClose();
        resetForm();
    };

    return (
        <Modal
            title={`${song ? "Update" : "Create"} Song`}
            open={isOpen}
            onCancel={handleCancel}
            onOk={() => form.submit()}
            okText={song ? "Update" : "Create"}
            cancelText="Close"
            maskClosable={false}
            okButtonProps={{ loading: isLoading }}
            style={{ top: 50 }}
            width={"50vw"}
        >
            <Form
                disabled={isLoading}
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Form.Item name="song_id" hidden />
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
                            {thumbnailUrl.length < 1 && (
                                <div className='flex flex-col items-center'>
                                    <TbUpload size={20} />
                                    <div className="font-bold bg-gradient-to-r from-[#EE10B0] to-[#0E9EEF] text-transparent bg-clip-text">
                                        Upload
                                    </div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>
                    <div>
                        <Form.Item label="Audio File" className='mb-0'>
                            <Upload
                                accept="audio/*"
                                fileList={audioUrl}
                                maxCount={1}
                                multiple={false}
                                className='!mb-2'
                                showUploadList={{
                                    extra: ({ size = 0 }) => (
                                        <span style={{ color: '#cccccc' }}>
                                            ({(size / 1024 / 1024).toFixed(2)}MB)
                                        </span>
                                    ),
                                    showDownloadIcon: true,
                                }}
                                onChange={handleChangeUpload(setAudioUrl)}
                            >
                                {audioUrl.length < 1 && (
                                    <Button icon={<TbUpload />}>Upload audio file</Button>
                                )}
                            </Upload>
                        </Form.Item>
                        {audioUrl.length > 0 && (
                            <audio
                                controls
                                src={audioUrl[0].url}
                                className="w-full"
                                onLoadedMetadata={(e) => {
                                    const audioElement = e.target as HTMLAudioElement;
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
                            options={musicGenres.map(genre => ({
                                value: genre.title,
                                label: genre.title,
                            }))}
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
                            options={artistsSelect}
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
                    name="lyrics"
                    rules={[{ required: true, message: "Please input lyrics" }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default SongModal; 