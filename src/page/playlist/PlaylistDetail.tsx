import { callGetPlaylistById, callUpdatePlaylist } from "@/apis/playlist.api";
import { callGetSongs } from "@/apis/song.api";
import playingAnimation from "@/assets/animations/playing.json";
import ButtonHeart from "@/components/common/ButtonHeart";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { doPlaySong, doSetHistory, doSetIsPlaying, doSetPlaylist } from "@/redux/reducers/song.reducer";
import { DEFAULT_PLAYLIST, IPlayList, IPlayListForm } from "@/types/playlist.type";
import { ISong } from "@/types/song.type";
import { formatTime, shuffleArray } from "@/utils/song.constant";
import { App, Button, notification, Tooltip } from "antd";
import Lottie from "lottie-react";
import { useCallback, useEffect, useState } from "react";
import { TbDots, TbEdit, TbPlayerPlay, TbPlayerPlayFilled, TbPlus, TbRefresh } from "react-icons/tb";
import { useParams } from "react-router-dom";

const PlaylistDetail = () => {
    const {id} = useParams();
    const [playlist, setPlaylist] = useState<IPlayList>(DEFAULT_PLAYLIST);  
    const [playlistSongs, setPlaylistSongs] = useState<ISong[]>([]);
    const [songs, setSongs] = useState<ISong[]>([]);
    const [songIds, setSongIds] = useState<string[]>([]);
    const dispatch = useAppDispatch();

    const {message} = App.useApp();

    const {isPlaying, currentSong} = useAppSelector(state => state.song);

    const getSongsRandom = useCallback(async () => {
        const res = await callGetSongs(`random=true&pageSize=10&different=${songIds.join(",")}`);
        if(res.data) {
            setSongs(res.data.result);
        }
    }, [songIds]);

    const getPlaylist = useCallback(async () => {
        if(!id) return;
        const res = await callGetPlaylistById(id);
        if(res.data) {
            setPlaylist(res.data);
            setSongIds(res.data.playlistSongs.map(vl => vl.song.song_id));
            setPlaylistSongs(res.data.playlistSongs.map(vl => vl.song));
        }
    }, [id]);

    useEffect(() => {
        getPlaylist();
    }, [getPlaylist]);
    
    useEffect(() => {
        if(songIds.length > 0)
            getSongsRandom();
    }, [getSongsRandom]);

    const handlePlayPlaylist = (songs: ISong[]) => {
        const shuffled = shuffleArray(songs);
        const currentSong = shuffled[0];
        const playlist = shuffled.filter(vl => vl.song_id !== currentSong.song_id);
            
        dispatch(doPlaySong(currentSong));
        dispatch(doSetPlaylist(playlist));
        dispatch(doSetHistory([]));

        window.localStorage.setItem("junm_playlist", JSON.stringify(playlist));
        window.localStorage.setItem("junm_history", JSON.stringify([]));
    }
    
    const handleAddSongToPlaylist = async (song: ISong) => {
        const data: IPlayListForm = {
            playlist_id: playlist.playlist_id,
            title: playlist.title,
            is_public: playlist.is_public,
            songs: [...playlistSongs.map(vl => vl.song_id), song.song_id]
        }

        const res = await callUpdatePlaylist(data);
        if(res.data) {
            message.success(res.message);
            setPlaylistSongs(prev => [...prev, song]);
            setSongs(prev => prev.filter(vl => vl.song_id !== song.song_id));
        }else {
            notification.error({
                message: "Add song to playlist failed",
                description: res.message
            });
        }

        console.log(data);
    }

  return (<>
     <div className="w-full h-full mb-[80px]">
        <div className="flex gap-5 relative">
            <div className="w-[300px] flex flex-col gap-2 sticky top-[0] h-fit">
                <div className="w-full group/playlist overflow-hidden rounded-lg cursor-pointer">
                    <div className="relative bg-gray-800">
                        <img 
                            src={playlist.playlistSongs[0]?.song.thumbnail_url || "/images/default-thumbnail.webp"} 
                            alt="playlist" 
                            className="w-full h-full object-cover group-hover/playlist:scale-105 transition-all duration-500" 
                        />
                        <div 
                            className={`absolute inset-0 flex items-center justify-around bg-black/30 opacity-0 transition
                            group-hover/playlist:opacity-100`}
                        >
                            <div className='border-2 border-white rounded-full p-1.5'>
                                <TbPlayerPlayFilled
                                    size={20} 
                                    className='text-white'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                />                           
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex gap-2 justify-center items-center">
                        <div className="font-bold text-lg">
                            {playlist.title}
                        </div>
                        <TbEdit size={22} className="cursor-pointer hover:opacity-80"/>
                    </div>
               
                    <div className="flex gap-2 justify-center items-center">
                        <span className=" text-gray-500 text-xs">Tạo bởi</span>
                        <span className="text-xs">
                            {playlist.user.full_name}
                        </span>
                    </div>
                    <div className="flex gap-2 justify-center items-center">
                        <span className=" text-gray-500 text-xs">
                            {playlist.is_public ? "Công khai" : "Riêng tư"}
                        </span>
                    </div>
                </div>
                <div className="flex justify-center items-center mt-2">
                    <ButtonPrimary
                        title="PHÁT NGẪU NHIÊN"
                        className="!rounded-full w-[200px]"
                        icon={<TbPlayerPlayFilled size={20}/>}
                        onClick={() => handlePlayPlaylist(playlistSongs)}
                    />
                </div>
            </div>
            <div className="flex-1">
               <div className="w-full">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-gray-400 text-xs border-b border-white/10">
                                <th className="font-normal px-4 py-2 w-1/2">BÀI HÁT</th>
                                <th className="font-normal px-4 py-2 w-1/3">ALBUM</th>
                                <th className="font-normal px-4 py-2 text-right w-24">THỜI GIAN</th>
                            </tr>
                        </thead>
                        <tbody>
                            {playlistSongs.map((item) => (
                                <tr
                                    key={item.song_id}
                                    className={`group/song hover:bg-white/5 transition cursor-pointer border-b border-white/10`}
                                >
                                    <td className="px-4 py-2">
                                        <div className="flex items-center gap-3">
                                            <div className="relative w-10 h-10">
                                                <img 
                                                    src={item.thumbnail_url || "/images/default-thumbnail.webp"} 
                                                    alt={item.title} 
                                                    className="w-10 h-10 rounded-md object-cover" 
                                                />
                                                <div 
                                                    className={`absolute inset-0 items-center justify-center bg-black/50 rounded-md cursor-pointer ${currentSong.song_id === item.song_id ? 'flex' : 'hidden group-hover/song:flex'}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if(currentSong.song_id === item.song_id) {
                                                            dispatch(doSetIsPlaying());
                                                        }
                                                    }}
                                                >
                                                {isPlaying && currentSong.song_id === item.song_id ?
                                                    <Lottie animationData={playingAnimation} loop={true} style={{width: 32, height: 32}} />
                                                :
                                                    <TbPlayerPlay size={22} className="text-white" />
                                                }
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-medium truncate max-w-[200px]">{item.title}</div>
                                                <div className="text-xs text-gray-400 truncate max-w-[200px]">
                                                    {item.artist?.artist_name || ''}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    
                                    <td className="px-4 py-2 text-sm text-gray-300 truncate">
                                        -
                                    </td>
                                   
                                    <td className="px-4 py-2 text-right text-sm text-gray-300">
                                        <span className="text-gray-300 group-hover/song:hidden transition">
                                            {formatTime(item.durations)}
                                        </span>
                                        <div className="hidden group-hover/song:flex justify-end gap-2 items-center transition">
                                            <ButtonHeart song={item}/>
                                            <Button
                                                type="text"
                                                shape="circle"
                                            >
                                                <TbDots size={20} className="text-gray-300 cursor-pointer" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={3} className="px-4 py-2">
                                    <div className="flex items-center gap-1">
                                        <div className="text-sm text-gray-400">
                                            {songs.length} bài hát
                                        </div>
                                        <span>•</span>
                                        <div className="text-sm text-gray-400">
                                            {formatTime(playlist.playlistSongs.reduce(
                                                (acc, curr) => acc + curr.song.durations, 0))}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b border-white/10">
                                <td colSpan={3} className="px-4 py-2">
                                    <div className="flex justify-between w-full">
                                        <div className="flex flex-col">
                                            <div className="text-xl font-bold">
                                                    Bài hát gợi ý
                                            </div>
                                            <div className="text-sm text-gray-400">
                                                Dựa trên các bài hát trong playlist này
                                            </div>
                                        </div>
                                        <ButtonPrimary
                                            className="!rounded-full"
                                            onClick={getSongsRandom}
                                            title="LÀM MỚI"
                                            icon={<TbRefresh size={20}/>}   
                                        />
                                    </div>
                                </td>
                            </tr>
                            {songs.map((item) => (
                                <tr 
                                    key={item.song_id}
                                    className={`group/song hover:bg-white/5 transition cursor-pointer border-b border-white/10`}

                                >
                                    <td className="px-4 py-2">
                                        <div className="flex items-center gap-2">
                                            <div className="relative w-10 h-10">
                                                <img 
                                                    src={item.thumbnail_url || "/images/default-thumbnail.webp"} 
                                                    alt={item.title} 
                                                    className="w-10 h-10 rounded-md object-cover" 
                                                />
                                                <div 
                                                    className={`absolute inset-0 items-center justify-center bg-black/50 rounded-md cursor-pointer ${currentSong.song_id === item.song_id ? 'flex' : 'hidden group-hover/song:flex'}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if(currentSong.song_id === item.song_id) {
                                                            dispatch(doSetIsPlaying());
                                                        }
                                                    }}
                                                >
                                                {isPlaying && currentSong.song_id === item.song_id ?
                                                    <Lottie animationData={playingAnimation} loop={true} style={{width: 32, height: 32}} />
                                                :
                                                    <TbPlayerPlay size={22} className="text-white" />
                                                }
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-medium truncate max-w-[200px]">{item.title}</div>
                                                <div className="text-xs text-gray-400 truncate max-w-[200px]">
                                                    {item.artist?.artist_name || ''}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 text-sm text-gray-300 truncate">
                                        -
                                    </td>
                                    <td className="px-4 py-2 text-right text-sm text-gray-300">
                                        <span className="text-gray-300 group-hover/song:hidden transition">
                                            {formatTime(item.durations)}
                                        </span>
                                        <div className="hidden group-hover/song:flex justify-end gap-2 items-center transition">
                                            <ButtonHeart song={item}/>
                                            <Tooltip title="Thêm vào playlist">
                                                <Button
                                                    type="text"
                                                    shape="circle"
                                                    onClick={() => handleAddSongToPlaylist(item)}
                                                >
                                                    <TbPlus size={20} className="text-gray-300 cursor-pointer" />
                                                </Button>
                                            </Tooltip>
                                        </div>
                                    </td>
                                </tr>
                            ))} 
                        </tbody>
                    </table>
               </div>
            </div>
       </div>
    </div>
   </>)
}

export default PlaylistDetail