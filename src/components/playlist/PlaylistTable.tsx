import { ISong } from "@/types/song.type";
import { formatTime } from "@/utils/song.constant";
import { Button, Tooltip } from "antd";
import { TbDots, TbPlayerPlay, TbPlus, TbRefresh } from "react-icons/tb";
import ButtonHeart from "../common/ButtonHeart";
import Lottie from "lottie-react";
import playingAnimation from "@/assets/animations/playing.json";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { doSetIsPlaying } from "@/redux/reducers/song.reducer";
import { useTheme } from "@/utils/ThemeProvider";
import ButtonPrimary from "../common/ButtonPrimary";
import { useCallback, useEffect, useState } from "react";
import { callGetSongs } from "@/apis/song.api";

interface PlaylistTableProps {
    playlistSongs: ISong[];
    songIds: string;
    onAddSongToPlaylist: (song: ISong) => void;
}

const PlaylistTable:React.FC<PlaylistTableProps> = ({playlistSongs, songIds, onAddSongToPlaylist}) => {
    const {darkMode} = useTheme();
    const [songs, setSongs] = useState<ISong[]>([]);

    const dispatch = useAppDispatch();
    const { isPlaying, currentSong } = useAppSelector(state => state.song);

    const getSongsRandom = useCallback(async () => {
        const res = await callGetSongs(`random=true&pageSize=10&different=${songIds}`);
        if(res.data) {
            setSongs(res.data.result);
        }
    }, [songIds]);

    useEffect(() => {
        getSongsRandom();
    }, [getSongsRandom]);

    return (
    <table className="w-full text-left">
        <thead>
            <tr className={`text-xs border-b ${darkMode ? 'border-white/10 text-gray-400 ' : 'border-black/10 text-gray-500 '}`}>
                <th className="font-normal px-4 py-2 w-1/2">BÀI HÁT</th>
                <th className="font-normal px-4 py-2 w-1/3">ALBUM</th>
                <th className="font-normal px-4 py-2 text-right w-24">THỜI GIAN</th>
            </tr>
        </thead>
        <tbody>
            {playlistSongs.map((item) => (
                <tr
                    key={item.song_id}
                    className={`group/song hover:bg-white/5 transition cursor-pointer border-b ${darkMode ? 'border-white/10' : 'border-black/10'}`}
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
                        <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} group-hover/song:hidden transition`}>
                            {formatTime(item.durations)}
                        </span>
                        <div className="hidden group-hover/song:flex justify-end gap-2 items-center transition">
                            <ButtonHeart song={item}/>
                            <Button
                                type="text"
                                shape="circle"
                            >
                                <TbDots size={20} className={`${darkMode ? 'text-gray-300' : 'text-gray-500'} cursor-pointer`} />
                            </Button>
                        </div>
                    </td>
                </tr>
            ))}
            <tr>
                <td colSpan={3} className="px-4 py-2">
                    <div className="flex items-center gap-1 text-gray-400 text-sm">
                        <div>
                            {playlistSongs.length} bài hát
                        </div>
                        <span>•</span>
                        <div>
                            {formatTime(playlistSongs.reduce(
                                (acc, curr) => acc + curr.durations, 0))}
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
                    className={`group/song hover:bg-white/5 transition cursor-pointer border-b ${darkMode ? 'border-white/10' : 'border-black/10'}`}

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
                        <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} group-hover/song:hidden transition`}>
                            {formatTime(item.durations)}
                        </span>
                        <div className="hidden group-hover/song:flex justify-end gap-2 items-center transition">
                            <ButtonHeart song={item}/>
                            <Tooltip title="Thêm vào playlist">
                                <Button
                                    type="text"
                                    shape="circle"
                                    onClick={() => {
                                        setSongs(prev => prev.filter(vl => vl.song_id !== item.song_id));
                                        onAddSongToPlaylist(item);
                                    }}
                                >
                                    <TbPlus size={20} className={`${darkMode ? 'text-gray-300' : 'text-gray-500'} cursor-pointer`} />
                                </Button>
                            </Tooltip>
                        </div>
                    </td>
            </tr>
            ))} 
        </tbody>
    </table>
    );
};

export default PlaylistTable; 