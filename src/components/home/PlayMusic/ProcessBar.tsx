import { useAppSelector } from "@/redux/hook";
import { formatTime } from "@/utils/song.constant";
import { Slider } from "antd";
import React, { useEffect, useRef, useState } from "react";

interface IProp {
    audio:  HTMLAudioElement | null;
    handlePlayPause: () => void;
    isRepeat: boolean;
}
const ProcessBar: React.FC<IProp> = ({audio, handlePlayPause, isRepeat}) => {

    const [currentTime, setCurrentTime] = useState(0);
    const [seekingTime, setSeekingTime] = useState<number | null>(null);

    const currentSong = useAppSelector(state => state.song.currentSong);

    // Cập nhật currentTime khi audio phát
    useEffect(() => {
        if (!audio) return;
        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime)
            if(audio.currentTime === audio.duration){
                if(isRepeat) {
                    setCurrentTime(0);
                    setTimeout(()=> {
                        audio.play();
                    }, 1000)
                }else {
                    handlePlayPause();
                }
            }
        };
        audio.addEventListener('timeupdate', handleTimeUpdate);
        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [audio, isRepeat, handlePlayPause]);

    useEffect(() => {
        const song_time = window.localStorage.getItem("song_time");
        if (audio) {
            audio.currentTime = song_time ? +song_time : 0;
        }
    }, [currentSong, audio]);

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

    // Khi nhả chuột slider (chính thức tua nhạc)
    const handleSliderChangeComplete = (value: number) => {
        setCurrentTime(value);
        setSeekingTime(null);
        if (audio) {
        audio.currentTime = value;
        }
    };

    
  return (
    <div className="w-full mt-1 h-fit">
    <div className="flex justify-center items-center">
        <div className="w-fit text-sm">{formatTime(seekingTime !== null ? seekingTime : currentTime)}</div>
        <div className="w-full mx-3">
        <Slider
            className='custom-slider !m-0'
            tooltip={{ formatter: null }}
            min={0}
            max={currentSong.durations}
            value={seekingTime !== null ? seekingTime : currentTime}
            onChange={(value) => setSeekingTime(value)}
            onChangeComplete={handleSliderChangeComplete}
        />
        </div>
        <div className="w-fit text-sm">{formatTime(currentSong.durations)}</div>
    </div>
</div>
  )
}

export default ProcessBar