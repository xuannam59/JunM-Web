import { callGetFavoriteSongs } from "@/apis/song.api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { DEFAULT_SONG, ISong } from "@/types/song.type";
import { useCallback, useEffect, useState } from "react";
import { useTheme } from "@/utils/ThemeProvider";
import { formatTime } from "@/utils/song.constant";
import { TbHeartFilled, TbPlayerPlay } from "react-icons/tb";
import { doPlaySong, doSetHistory, doSetIsPlaying, doSetPlaylist } from "@/redux/reducers/song.reducer";
import playingAnimation from "@/assets/animations/playing.json";
import Lottie from "lottie-react";
import ButtonHeart from "@/components/common/ButtonHeart";
    
const FavoriteSongs = () => {
    const {darkMode} = useTheme();
    const [songs, setSongs] = useState<ISong[]>([]);
    const [selectedSong, setSelectedSong] = useState<ISong>(DEFAULT_SONG);

    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state => state.auth);
    const {currentSong , isPlaying} = useAppSelector(state => state.song);

    const getFavoriteSongs = useCallback(async () => {
        const res = await callGetFavoriteSongs(`skip=0&user_id=${user.user_id}`);
        if(res.data) {
            setSongs(res.data.result);
        }
    }, [user.user_id]);

    useEffect(() => {
        getFavoriteSongs(); 
    }, [getFavoriteSongs]);

    const handleSelectSong = (song: ISong) => {
        setSelectedSong(song);
        if(currentSong.song_id === song.song_id) {
            dispatch(doSetIsPlaying());
        } else {
            const playlist = songs.filter(vl => vl.song_id !== song.song_id);

            dispatch(doPlaySong(song));
            dispatch(doSetPlaylist(playlist));
            dispatch(doSetHistory([]));

            window.localStorage.setItem("junm_playlist", JSON.stringify(playlist));
            window.localStorage.setItem("junm_history", JSON.stringify([]));
            window.localStorage.setItem("junm_song_id", song.song_id);
        }
    }

    return (
        <div className="w-full">
            <table className="w-full text-left">
                <thead>
                    <tr className="text-xs uppercase text-gray-400 border-none">
                        <th className="w-10"/>
                        <th className="font-medium py-2 px-4">BÀI HÁT</th>
                        <th className="font-medium py-2 px-4">ALBUM</th>
                        <th className="font-medium py-2 px-4 text-right">THỜI GIAN</th>
                    </tr>
                </thead>
                <tbody>
                    {songs.map((song, index) => (
                        <tr
                            key={song.song_id}
                            className={`transition cursor-pointer group
                                ${darkMode ? 'hover:bg-[#232323]' : 'hover:bg-gray-100'}`
                            }
                            onClick={() => handleSelectSong(song)}
                        >
                            <td className="py-2 px-4">
                                {index + 1}
                            </td>
                            <td className="py-2 px-4">
                                <div className="flex items-center gap-3">
                                    <div className="relative w-10 h-10">
                                        <img src={song.thumbnail_url} alt={song.title} className="w-10 h-10 rounded-md object-cover" />
                                       <div 
                                            className={`absolute inset-0 items-center justify-center bg-black/50 rounded-md cursor-pointer
                                                ${selectedSong.song_id === song.song_id ? 'flex' : 'hidden group-hover:flex'}
                                            `}
                                       >
                                        {isPlaying && selectedSong.song_id === song.song_id ?
                                            <Lottie animationData={playingAnimation} loop={true} style={{width: 32, height: 32}} />
                                        :
                                            <TbPlayerPlay size={22} className="text-white" />
                                        }
                                       </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className={`text-sm font-medium cursor-pointer
                                            ${darkMode ? 'text-white' : 'text-black'} line-clamp-1`}>{song.title}</span>
                                        <span className={`text-xs
                                            ${darkMode ? 'text-gray-400' : 'text-gray-600'} line-clamp-1`}>{song.artist.artist_name}</span>
                                    </div>
                                </div>
                            </td>
                            <td className="py-2 px-4">
                                <span className="text-sm text-gray-400 line-clamp-1">—</span>
                            </td>
                            <td className="py-2 px-4 text-right">
                                <div className="flex items-center gap-8 justify-end">
                                    <ButtonHeart song={song}/>
                                    <span className="text-sm text-gray-400">{formatTime(song.durations)}</span>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default FavoriteSongs;