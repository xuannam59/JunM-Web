import { callGetSongDetail } from '@/apis/song.api';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { doGetSongByLocalStorage, doSetHistory, doSetPlaylist } from '@/redux/reducers/song.reducer';
import React, { useCallback, useEffect, useRef} from 'react';
import PlayerControls from './PlayerControls';
import SongInfo from './SongInfo';
import VolumeControl from './VolumeControl';
import { ISong } from '@/types/song.type';

const PlayMusic: React.FC = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const song = useAppSelector(state => state.song);
    const {currentSong} = song;
    const dispatch = useAppDispatch();

    const getSong = useCallback(async (song_id: string) => {
        if(song_id) {
            const songDetail = await callGetSongDetail(song_id);
            if(songDetail.data) {
                dispatch(doGetSongByLocalStorage({song: songDetail.data}))
            }
        }
    }, [dispatch]);

    useEffect(() => {
        const playlistLocal = window.localStorage.getItem("junm_playlist");
        const historyLocal = window.localStorage.getItem("junm_history");

        // Xử lý playlist
        if (playlistLocal && Array.isArray(JSON.parse(playlistLocal))) {
            const playlist: ISong[] = JSON.parse(playlistLocal);
            dispatch(doSetPlaylist(playlist));
        } else {
            window.localStorage.setItem("junm_playlist", JSON.stringify([]));
        }
    
        if (historyLocal && Array.isArray(JSON.parse(historyLocal)) && JSON.parse(historyLocal).length > 0) {
            dispatch(doSetHistory(JSON.parse(historyLocal)));
        } else {
            window.localStorage.setItem("junm_history", JSON.stringify([]));
        }
    }, [dispatch]);

    useEffect(() => {
        const song_id = window.localStorage.getItem("junm_song_id");
        if(song_id) {
            getSong(song_id);
        }
    }, [getSong]);
    
    
  return (
    <>
       <SongInfo/>
        <div className="flex-1 flex flex-col items-center justify-center max-w-[40vw]">
            {currentSong.file_url && 
                <audio
                    ref={audioRef}
                    src={currentSong.file_url}
                />
            }
            <PlayerControls 
                audio={audioRef.current}
            />
        </div>

        <VolumeControl
            audio={audioRef.current}
            
        />
    </>
  )
}

export default PlayMusic