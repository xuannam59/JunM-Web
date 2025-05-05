import { callGetSongDetail } from '@/apis/song.api';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { doGetSongByLocalStorage } from '@/redux/reducers/song.reducer';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import PlayerControls from './PlayerControls';
import SongInfo from './SongInfo';
import VolumeControl from './VolumeControl';

const PlayMusic: React.FC = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [volume, setVolume] = useState(0.25);

    const song = useAppSelector(state => state.song);
    const {currentSong, isPlaying} = song;
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
        const song_id = window.localStorage.getItem("song_id");
        if(song_id) {
            getSong(song_id);
        }
    }, [getSong]);

    // Khi đổi trạng thái play/pause
    useEffect(() => {
        if (!audioRef.current) return;
        if (isPlaying) {
        audioRef.current.play();
        } else {
        audioRef.current.pause();
        }
    }, [isPlaying, currentSong]);

  return (
    <>
       <SongInfo/>
        <div className="flex-1 flex flex-col items-center justify-center max-w-[40vw]">
            <audio
                ref={audioRef}
                src={currentSong.file_url || ''}
            />
            <PlayerControls 
                audio={audioRef.current}
                isPlaying={isPlaying}
             />
        </div>

        <VolumeControl
            audio={audioRef.current}
            volume={volume}
            onVolumeChange={(value) => setVolume(value)} 
        />
    </>
  )
}

export default PlayMusic