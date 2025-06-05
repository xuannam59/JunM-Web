import { Button, Form, Input, message, Modal, Switch, Tooltip } from "antd"
import { TbPlus, TbX, TbPlayerPlayFilled, TbDots } from "react-icons/tb"
import { useTheme } from "@/utils/ThemeProvider";
import { useCallback, useEffect, useState } from "react";
import { callCreatePlaylist, callDeletePlaylist, callGetPlaylists } from "@/apis/playlist.api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { ISong } from "@/types/song.type";
import { doPlaySong, doSetHistory, doSetPlaylist } from "@/redux/reducers/song.reducer";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import { IPlayListForm } from "@/types/playlist.type";
import { useNavigate } from "react-router-dom";

const { confirm } = Modal;

const PlaylistLibrary: React.FC = () => {
    const {darkMode} = useTheme();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const auth = useAppSelector(state => state.auth);
    const {user} = auth;

    const [playlists, setPlaylists] = useState<{
        id: string,
        title: string,
        image: string,
        user_name: string | undefined,
        playlist_songs: ISong[]
    }[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const getPlaylist = useCallback(async () => {
        const res = await callGetPlaylists(`page=1&limit=10&user_id=${user.user_id}`);
        if(res.data) {
            const newPlaylists = res.data.result.map(vl => {
                return {
                    id: vl.playlist_id,
                    title: vl.title,
                    image: vl.playlistSongs ? vl.playlistSongs[0].song.thumbnail_url : "/images/default-thumbnail.webp",
                    user_name: vl.user.full_name,
                    playlist_songs: vl.playlistSongs.map(song => song.song)
                }
            });
            setPlaylists([...newPlaylists, {
                id: Math.random().toString(36).substring(2, 15),
                title: "4U - On Repeat",
                image: "/images/hear-a-lot.jpg",
                user_name: "JunM Mp3",
                playlist_songs: []
            }]);
        }
    }, [user.user_id]);

    useEffect(() => {
        getPlaylist()
    }, [getPlaylist]);
    
    console.log(playlists);
    
    const handlePlayPlaylist = (songs: ISong[]) => {
        const currentSong = songs[0];
        const playlist = songs.filter(vl => vl.song_id !== currentSong.song_id);
        dispatch(doPlaySong(currentSong));
        dispatch(doSetPlaylist(playlist));
        dispatch(doSetHistory([]));

        window.localStorage.setItem("junm_playlist", JSON.stringify(playlist));
        window.localStorage.setItem("junm_history", JSON.stringify([]));
        window.localStorage.setItem("junm_song_id", currentSong.song_id);
    }

    const deletePlaylist = (playlistId: string) => {
        confirm({
          title: 'Xóa playlist',
          content: 'Bạn có chắc chắn muốn xóa playlist này không?',
          onOk: async () => {
            const res = await callDeletePlaylist(playlistId);
            if(res.data) {
                setPlaylists(prev => prev.filter(vl => vl.id !== playlistId));
                message.success('Xóa playlist thành công');
            } else {
                message.error('Xóa playlist thất bại');
            }
          },
        });
    };
    
    const handleFinish = useCallback(async (values: IPlayListForm) => {
        const res = await callCreatePlaylist(values);
        if(res.data) {
            message.success('Tạo playlist thành công');
            setIsModalOpen(false);
            form.resetFields();
            getPlaylist();
        } else {
            message.error('Tạo playlist thất bại');
        }   
    }, [form, getPlaylist]);

  return (
   <>
    <div className="flex items-center gap-1">
        <div className="flex items-center gap-2">
            <h1 className="text-xl">PLAYLIST</h1>
            <Tooltip title="Tạo playlist mới" placement="top">
                <Button
                    type="text"
                    size="small"
                    shape="circle"
                    className={`${darkMode ? "!bg-[hsla(0,0%,100%,0.1)]" : "!bg-[rgba(0,0,0,0.05)]"} hover:opacity-80`}
                    onClick={() => setIsModalOpen(true)}
                >
                    <TbPlus size={20} className={darkMode ? "text-white" : "text-black"}/>
                </Button>
            </Tooltip>
        </div>
    </div>
    <div className="flex items-center flex-row gap-3 mt-4">
        {playlists.map((vl) => (
            <div 
                key={vl.id} 
                className="flex flex-col gap-1 w-[20%]" 
                onClick={() => {
                   navigate(`/playlist/${vl.id}`);
                }}
            >
                <div className="w-full group/playlist overflow-hidden rounded-sm cursor-pointer">
                    <div className="relative bg-gray-800">
                        <img 
                            src={vl.image} 
                            alt="playlist" 
                            className="w-full h-full object-cover group-hover/playlist:scale-105 transition-all duration-500" 
                        />
                        <div className="absolute inset-0 flex items-center justify-around
                            bg-black/30 opacity-0 group-hover/playlist:opacity-100 transition"
                        >
                            <div className='hover:bg-[rgba(255,255,255,0.3)] rounded-full p-1.5'>
                                <Tooltip title="Xóa">
                                    <TbX 
                                        size={20} 
                                        className='text-white'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deletePlaylist(vl.id);
                                        }}
                                    />
                                </Tooltip> 
                            </div>
                            <div className='border-2 border-white rounded-full p-1.5'>
                                <TbPlayerPlayFilled
                                    size={20} 
                                    className='text-white'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handlePlayPlaylist(vl.playlist_songs);
                                    }}
                                />
                            </div>
                            <div className='hover:bg-[rgba(255,255,255,0.3)] rounded-full p-1.5'>
                                <Tooltip title="Khác">
                                    <TbDots 
                                        size={20} 
                                        className='text-white'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                        }}
                                    />
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <h1 className="text-md hover:text-cyan-200 transition-all duration-500 cursor-pointer truncate">{vl.title}</h1>
                    <p className="text-sm text-gray-500">{vl.user_name}</p>
                </div>
            </div>
        ))}
    </div>
    <Modal
        open={isModalOpen}
        onCancel={() => {
            setIsModalOpen(false);
            form.resetFields();
        }}
        footer={null}
        centered
        width={400}
        title={
            <h2 className="text-lg font-medium mb-0 text-center">
                Tạo playlist mới
            </h2>
        }
    >
        <Form 
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            className="mt-6"
            initialValues={{ is_public: true }}
        >
            <Form.Item 
                name="title" 
                className="mb-6"
                rules={[{ required: true, message: 'Vui lòng nhập tên playlist!' }]}
            >
                <Input placeholder="Nhập tên playlist" />
            </Form.Item>
            
            <div className="space-y-4 mb-6">
                
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="font-medium">Công khai</div>
                            <div className="text-gray-400 text-sm">Mọi người có thể nhìn thấy playlist này</div>
                        </div>
                        <Form.Item name="is_public" className="mb-0" valuePropName="checked">
                            <Switch className="ml-4"/>
                        </Form.Item>
                    </div>
            </div>

            <Form.Item className="mb-0">
                <div className="flex justify-center">
                    <ButtonPrimary 
                        title="TẠO MỚI" 
                        className="w-full !rounded-full !h-10"
                        onClick={() => {
                            form.submit();
                        }}
                    />
                </div>
            </Form.Item>
        </Form>
    </Modal>
   </>
  )
}

export default PlaylistLibrary