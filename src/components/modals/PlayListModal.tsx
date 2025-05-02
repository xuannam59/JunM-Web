import { callCreatePlaylist, callUpdatePlaylist } from '@/apis/playlist.api';
import { callGetSongs } from '@/apis/song.api';
import { IPlayList, IPlayListForm } from '@/types/playlist.type';
import { ISong } from '@/types/song.type';
import { capitalizeVietnamese, replaceSlug } from '@/utils/constant';
import { useTheme } from '@/utils/ThemeProvider';
import { App, Avatar, Button, Form, Input, List, Modal, Switch, Tag } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { TbPlaylistAdd, TbPlaylistX, TbSearch } from 'react-icons/tb';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    playlist: IPlayList | null;
    loadData: () => Promise<void>;
}

  let timeoutId: ReturnType<typeof setTimeout>;


const PlayListModal = ({ isOpen, onClose, playlist, loadData }: IProps) => {
    const [form] = Form.useForm();
    const { darkMode } = useTheme();
    const { message, notification } = App.useApp();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingSearch, setIsLoadingSearch] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [songs, setSongs] = useState<ISong[]>([]);
    const [selectedSongs, setSelectedSongs] = useState<ISong[]>([]);

    const resetForm = useCallback(() => {
        form.resetFields();
        setSelectedSongs([]);
    }, [form]);

    useEffect(() => {
        if (playlist) {
            const data = {
                playlist_id: playlist.playlist_id,
                title: playlist.title,
                is_public: playlist.is_public,
            };
            form.setFieldsValue(data);
            setSelectedSongs(playlist.playlistSongs.map(ps => ps.song));
        }
    }, [playlist, form]);

    const getSongs = useCallback(async () => {
        setIsLoadingSearch(true);
        let query = "current=1&pageSize=10";
        if(searchText) {
            query += `&search=${replaceSlug(searchText)}`
        }
        const res = await callGetSongs(query);
        if(res.data) {
            setSongs(res.data.result);
        }else {
            notification.error({
                message: "Error fetching songs",
                description: "Failed to load songs data"
            });
        }
        setIsLoadingSearch(false);
    }, [searchText, notification]);

    useEffect(() => {
        getSongs()
    }, [getSongs]);

    const handleSubmit = async (values: IPlayListForm) => {
        setIsLoading(true);
        try {
            const data:IPlayListForm = {
                playlist_id: values.playlist_id,
                title: capitalizeVietnamese(values.title),
                is_public: values.is_public,
                songs: selectedSongs.map(item => item.song_id)
            };

            const res = await (playlist ? callUpdatePlaylist(data) : callCreatePlaylist(data));
            
            if (res.data) {
                message.success(`${playlist ? "Update" : "Create new"} playlist successfully`);
                onClose();
                resetForm();
                loadData();
            } else {
                throw new Error(res.message);
            }
        } catch (error) {
            notification.error({
                message: `${playlist ? "Update" : "Create"} error`,
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

    const handleSearch = (value: string) => {
        if(value.length > 3) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setSearchText(value);
            }, 1000);
        }else {
            setSearchText("");
            clearTimeout(timeoutId);
        }
    };

    const handleAddSong = (song: ISong) => {
        if(!selectedSongs.find(s => s.song_id === song.song_id)) {
            setSelectedSongs([song, ...selectedSongs]);
        }
    }

    const handleRemoveSong = (songId: string) => {
        setSelectedSongs(selectedSongs.filter(s => s.song_id !== songId));
    }

    console.log(selectedSongs);

    return (
        <Modal
            title={`${playlist ? "Update" : "Create"} Playlist`}
            open={isOpen}
            onCancel={handleCancel}
            onOk={() => form.submit()}
            okText={playlist ? "Update" : "Create"}
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
                initialValues={{
                    is_public: true
                }}
            >
                <Form.Item name="playlist_id" hidden />
                
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please input playlist title!' }]}
                >
                    <Input className={darkMode ? 'dark-input' : ''} />
                </Form.Item>

                <div className="flex flex-col gap-4">
                    <div>
                        <label className="block mb-2">Search songs</label>
                        <Input
                            placeholder="Search songs..."
                            // value={searchText}
                            onChange={(e) => handleSearch(e.target.value)}
                            className={darkMode ? 'dark-input' : ''}
                            suffix={<TbSearch className="text-gray-400" />}
                        />
                    </div>

                     <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 mb-3">
                        <div className=" border border-[#F3F4F6] rounded-md p-4 h-[240px] overflow-y-auto">
                            <List
                                loading={isLoadingSearch}
                                dataSource={songs}
                                renderItem={(song) => (
                                    <List.Item
                                        actions={[
                                            <Button
                                                type='primary'
                                                onClick={() => handleAddSong(song)}
                                                disabled={selectedSongs.some(item => item.song_id === song.song_id)}
                                            >
                                                <TbPlaylistAdd size={20}/>
                                            </Button>
                                        ]}
                                    >
                                        <List.Item.Meta
                                            avatar={<Avatar src={song.thumbnail_url} shape='square'/>}
                                            title={song.title}
                                            description={
                                                <div className="flex items-center gap-2">
                                                    <span>{song.artist.artist_name}</span>
                                                    <Tag color="blue">{song.genre}</Tag>
                                                </div>
                                            }
                                        />
                                    </List.Item>
                                )}
                            />
                        </div>
                        <div className=" border border-[#F3F4F6] rounded-md p-4 h-[240px] overflow-y-auto">
                            <List
                                dataSource={selectedSongs}
                                renderItem={(song) => (
                                    <List.Item
                                        actions={[
                                            <Button
                                                danger
                                                onClick={() => handleRemoveSong(song.song_id)}
                                            >
                                                <TbPlaylistX size={20}/>
                                            </Button>
                                        ]}
                                    >
                                        <List.Item.Meta
                                            avatar={<Avatar src={song.thumbnail_url} />}
                                            title={song.title}
                                            description={
                                                <div className="flex items-center gap-2">
                                                    <span>{song.artist.artist_name}</span>
                                                    <Tag color="blue">{song.genre}</Tag>
                                                </div>
                                            }
                                        />
                                    </List.Item>
                                )}
                            />
                        </div>
                     </div>
                </div>

                <Form.Item
                    label="Public"
                    name="is_public"
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default PlayListModal; 