import { useEffect, useState } from "react";
import { DEFAULT_PLAYLIST, IPlayList } from "@/types/playlist.type";
import { callGetPlaylistById } from "@/apis/playlist.api";
import { useCallback } from "react";
import { useParams } from "react-router-dom"
import { TbPlayerPlayFilled } from "react-icons/tb";
import { doSetHistory } from "@/redux/reducers/song.reducer";
import { doSetPlaylist } from "@/redux/reducers/song.reducer";
import { ISong } from "@/types/song.type";
import { doPlaySong } from "@/redux/reducers/song.reducer";
import { useAppDispatch } from "@/redux/hook";

const PlaylistDetail = () => {
    const {id} = useParams();
    const [playlist, setPlaylist] = useState<IPlayList>(DEFAULT_PLAYLIST);  
    const dispatch = useAppDispatch();

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
            <div className="w-[20%] bg-red-500">
                <div className="w-full group/playlist overflow-hidden rounded-sm cursor-pointer">
                    <div className="relative bg-gray-800">
                        <img 
                            src={"/images/default-thumbnail.webp"} 
                            alt="playlist" 
                            className="w-full h-full object-cover group-hover/playlist:scale-105 transition-all duration-500" 
                        />
                        <div className="absolute inset-0 flex items-center justify-around
                            bg-black/30 opacity-0 group-hover/playlist:opacity-100 transition"
                        >
                            <div className='border-2 border-white rounded-full p-1.5'>
                                <TbPlayerPlayFilled
                                    size={20} 
                                    className='text-white'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        // handlePlayPlaylist(playlist.playlistSongs.map(vl => vl.song));
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[80%] bg-blue-500">
                asdasd
            </div>
       </div>
    </div>
   </>)
}

export default PlaylistDetail