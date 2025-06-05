import { Button } from "antd";
import { useEffect, useState } from "react";
import { DEFAULT_PLAYLIST, IPlayList } from "@/types/playlist.type";
import { callGetPlaylistById } from "@/apis/playlist.api";
import { useCallback } from "react";
import { useParams } from "react-router-dom"
import { TbDots, TbEdit, TbPlayerPlay, TbPlayerPlayFilled } from "react-icons/tb";
import { doSetHistory, doSetIsPlaying, doSetPlaylist } from "@/redux/reducers/song.reducer";
import { ISong } from "@/types/song.type";
import { doPlaySong } from "@/redux/reducers/song.reducer";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import { formatTime } from "@/utils/song.constant";
import Lottie from "lottie-react";
import playingAnimation from "@/assets/animations/playing.json";
import ButtonHeart from "@/components/common/ButtonHeart";

const PlaylistDetail = () => {
    const {id} = useParams();
    const [playlist, setPlaylist] = useState<IPlayList>(DEFAULT_PLAYLIST);  
    const dispatch = useAppDispatch();

    const {isPlaying, currentSong} = useAppSelector(state => state.song);

    const getPlaylist = useCallback(async () => {
        if(!id) return;
        const res = await callGetPlaylistById(id);
        if(res.data) {
            setPlaylist(res.data);
        }
    }, [id]);

    useEffect(() => {
        getPlaylist();
    }, [getPlaylist]);

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

    console.log(playlist);
  return (<>
     <div className="w-full h-full mb-[80px]">
        <div className="flex gap-4">
            <div className="w-[300px] flex flex-col gap-2">
                <div className="w-full group/playlist overflow-hidden rounded-lg cursor-pointer">
                    <div className="relative bg-gray-800">
                        <img 
                            src={playlist.playlistSongs[0]?.song.thumbnail_url || "/images/default-thumbnail.webp"} 
                            alt="playlist" 
                            className="w-full h-full object-cover group-hover/playlist:scale-105 transition-all duration-500" 
                        />
                        <div className={`absolute inset-0 flex items-center justify-around bg-black/30 opacity-0 transition
                        group-hover/playlist:opacity-100 ${isPlaying && 'opacity-100'}`}
                        >
                            <div className='border-2 border-white rounded-full p-1.5'>
                                {isPlaying ? 
                                    <Lottie animationData={playingAnimation} loop={true} style={{width: 32, height: 32}} />
                                :
                                    <TbPlayerPlayFilled
                                        size={20} 
                                        className='text-white'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // handlePlayPlaylist(playlist.playlistSongs.map(vl => vl.song));
                                        }}
                                    />
                                }
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
                        onClick={() => {}}
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
                            {playlist.playlistSongs.map((item) => (
                                <tr
                                    key={item.song.song_id}
                                    className={`group/song hover:bg-white/5 transition cursor-pointer border-b border-white/10`}
                                >
                                
                                    <td className="px-4 py-2">
                                        <div className="flex items-center gap-3">
                                            <div className="relative w-10 h-10">
                                                <img 
                                                    src={item.song.thumbnail_url || "/images/default-thumbnail.webp"} 
                                                    alt={item.song.title} 
                                                    className="w-10 h-10 rounded-md object-cover" 
                                                />
                                                <div 
                                                    className={`absolute inset-0 items-center justify-center bg-black/50 rounded-md cursor-pointer
                                                        ${currentSong.song_id === item.song.song_id ? 'flex' : 'hidden group-hover/song:flex'}
                                                    `}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if(currentSong.song_id === item.song.song_id) {
                                                            dispatch(doSetIsPlaying());
                                                        }
                                                    }}
                                                >
                                                {isPlaying && currentSong.song_id === item.song.song_id ?
                                                    <Lottie animationData={playingAnimation} loop={true} style={{width: 32, height: 32}} />
                                                :
                                                    <TbPlayerPlay size={22} className="text-white" />
                                                }
                                        </div>
                                    </div>     
                                            <div>
                                                <div className="font-medium truncate max-w-[200px]">{item.song.title}</div>
                                                <div className="text-xs text-gray-400 truncate max-w-[200px]">{item.song.artist?.artist_name || ''}</div>
                                            </div>
                                        </div>
                                    </td>
                                    
                                    <td className="px-4 py-2 text-sm text-gray-300 truncate">
                                        -
                                    </td>
                                   
                                    <td className="px-4 py-2 text-right text-sm text-gray-300">
                                        <span className="text-gray-300 group-hover/song:hidden transition">
                                            {formatTime(item.song.durations)}
                                        </span>
                                        <div className="hidden group-hover/song:flex justify-end gap-2 items-center transition">
                                            <ButtonHeart song={item.song}/>
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
                            
                        </tbody>
                    </table>
               </div>
            </div>
       </div>
    </div>
   </>)
}

export default PlaylistDetail