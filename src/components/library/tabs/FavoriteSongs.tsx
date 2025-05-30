import { callGetFavoriteSongs } from "@/apis/song.api";
import { useAppSelector } from "@/redux/hook";
import { ISong } from "@/types/song.type";
import { useCallback, useEffect, useState } from "react";
import { useTheme } from "@/utils/ThemeProvider";
import { formatTime } from "@/utils/song.constant";
import { TbHeartFilled } from "react-icons/tb";

const FavoriteSongs = () => {
    const {darkMode} = useTheme();
    const [songs, setSongs] = useState<ISong[]>([]);
    const [selected, setSelected] = useState<string | null>(null);
    const auth = useAppSelector(state => state.auth);
    const {user} = auth;

    const getFavoriteSongs = useCallback(async () => {
        const res = await callGetFavoriteSongs(`skip=0&user_id=${user.user_id}`);
        if(res.data) {
            setSongs(res.data.result);
        }
    }, [user.user_id]);

    useEffect(() => {
        getFavoriteSongs(); 
    }, [getFavoriteSongs]);

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
                            className={`transition cursor-pointer ${selected === song.song_id ? (darkMode ? 'bg-[#323232]' : 'bg-gray-200') : (darkMode ? 'hover:bg-[#232323]' : 'hover:bg-gray-100')}`}
                            onClick={() => setSelected(song.song_id)}
                        >
                            <td className="py-2 px-4">
                                {index + 1}
                            </td>
                            <td className="py-2 px-4">
                                <div className="flex items-center gap-3">
                                    <img src={song.thumbnail_url} alt={song.title} className="w-10 h-10 rounded-md object-cover" />
                                    <div className="flex flex-col">
                                        <span className={`text-sm font-medium
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
                                    <TbHeartFilled className="text-[#FF0000]" size={18} />
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