import { useAppDispatch, useAppSelector } from '@/redux/hook';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { callGetSongDetail } from '@/apis/song.api';
import { doGetSongByLocalStorage, doSetIsPlaying } from '@/redux/reducers/song.reducer';
import SongInfo from './SongInfo';
import PlayerControls from './PlayerControls';
import VolumeControl from './VolumeControl';

const PlayMusic: React.FC = () => {
    const [currentTime, setCurrentTime] = useState(0);
    const [audioDuration, setAudioDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [volume, setVolume] = useState(0.25);
    const [seekingTime, setSeekingTime] = useState<number | null>(null);

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

    useEffect(() => {
        const song_time = window.localStorage.getItem("song_time");
        // setIsPlaying(true);
        setAudioDuration(currentSong?.durations || 0);
        if (audioRef.current) {
        audioRef.current.currentTime = song_time ? +song_time : 0;
        }
    }, [currentSong]);

    // Khi đổi trạng thái play/pause
    useEffect(() => {
        if (!audioRef.current) return;
        if (isPlaying) {
        audioRef.current.play();
        } else {
        audioRef.current.pause();
        }
    }, [isPlaying, currentSong]);

    // Khi đổi volume
    useEffect(() => {
        if (audioRef.current) {
        audioRef.current.volume = volume;
        }
    }, [volume]);

    // Cập nhật currentTime khi audio phát
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime)
            if(audio.currentTime === audio.duration){
                handlePlayPause();
            }
        };
        audio.addEventListener('timeupdate', handleTimeUpdate);
        return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [audioRef.current]);

    // Khi kéo slider (tạm thời)
    const handleSliderChange = (value: number) => {
        setSeekingTime(value);
    };

    // Khi nhả chuột slider (chính thức tua nhạc)
    const handleSliderChangeComplete = (value: number) => {
        setCurrentTime(value);
        setSeekingTime(null);
        if (audioRef.current) {
        audioRef.current.currentTime = value;
        }
    };

    const handlePlayPause = () => {
        dispatch(doSetIsPlaying());
    };

    const handleVolumeChange = (value: number) => {
        setVolume(value);
    };

    // Lưu thời gian phát vào localStorage mỗi 3 giây khi đang phát
    const currentTimeRef = useRef(currentTime);
    useEffect(() => {
        currentTimeRef.current = currentTime;
    }, [currentTime]);

    useEffect(() => {
        if (!currentSong) return;
        const interval = setInterval(() => {
        window.localStorage.setItem('song_time', String(currentTimeRef.current));
        }, 3000);
        return () => clearInterval(interval);
    }, [currentSong]);
    
  return (
    <>
       <SongInfo/>
        <div className="flex-1 flex flex-col items-center justify-center max-w-[40vw]">
            <audio
                ref={audioRef}
                src={currentSong?.file_url || ''}
            />
            <PlayerControls 
                isPlaying={isPlaying} 
                currentTime={currentTime}
                audioDuration={audioDuration}
                seekingTime={seekingTime}
                onSliderChange={handleSliderChange}
                onSliderChangeComplete={handleSliderChangeComplete}
                onPlayPause={handlePlayPause}
             />
        </div>

        <VolumeControl
            volume={volume}
            onVolumeChange={handleVolumeChange} 
        />
    </>
  )
}

export default PlayMusic