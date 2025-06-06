import { callGetPlaylistById, callUpdatePlaylist } from "@/apis/playlist.api";
import { callGetSongs } from "@/apis/song.api";
import ArtistSection from "@/components/playlist/ArtistSection";
import PlaylistHeader from "@/components/playlist/PlaylistHeader";
import PlaylistTable from "@/components/playlist/PlaylistTable";
import { useAppDispatch } from "@/redux/hook";
import { doPlaySong, doSetHistory, doSetPlaylist } from "@/redux/reducers/song.reducer";
import { DEFAULT_PLAYLIST, IPlayList, IPlayListForm } from "@/types/playlist.type";
import { ISong } from "@/types/song.type";
import { shuffleArray } from "@/utils/song.constant";
import { App, notification } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

const PlaylistDetail = () => {
    const {id} = useParams();
    const [playlist, setPlaylist] = useState<IPlayList>(DEFAULT_PLAYLIST);  
    const [playlistSongs, setPlaylistSongs] = useState<ISong[]>([]);
    const [songIds, setSongIds] = useState<string[]>([]);
    const dispatch = useAppDispatch();

    const {message} = App.useApp();

    const artists = useMemo(() => {
        const ids = new Set<string>();
        const artists = new Set<{artist_id: string, artist_name: string, avatar: string}>();
        playlistSongs.forEach(vl => {
            if(!ids.has(vl.artist_id)) {
                artists.add({
                    artist_id: vl.artist_id,
                    artist_name: vl.artist?.artist_name,
                    avatar: vl.artist?.avatar
                });
            }
            ids.add(vl.artist_id);
        });
        return Array.from(artists).slice(0, 5);
    }, [playlistSongs]);

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

    const handlePlayRandom = (songs: ISong[]) => {
        const shuffled = shuffleArray(songs);
        const currentSong = shuffled[0];
        const playlist = shuffled.filter(vl => vl.song_id !== currentSong.song_id);
            
        dispatch(doPlaySong(currentSong));
        dispatch(doSetPlaylist(playlist));
        dispatch(doSetHistory([]));

        window.localStorage.setItem("junm_playlist", JSON.stringify(playlist));
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
        }else {
            notification.error({
                message: "Add song to playlist failed",
                description: res.message
            });
        }
    };


    
    return (<>
        <div className="w-full h-full mb-[80px]">
            <div className="flex gap-5 relative mb-12">
                <PlaylistHeader
                    playlist={playlist}
                    onPlayRandom={() => handlePlayRandom(playlistSongs)}
                />
                <div className="flex-1">
                   <PlaylistTable
                    playlistSongs={playlistSongs}
                    songIds={songIds.join(",")}
                    onAddSongToPlaylist={handleAddSongToPlaylist}
                   />
                </div>
            </div>
            <ArtistSection
                artists={artists}
            />
        </div>
   </>)
}

export default PlaylistDetail