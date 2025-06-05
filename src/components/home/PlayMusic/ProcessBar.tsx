import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { doNextSong } from "@/redux/reducers/song.reducer";
import { formatTime } from "@/utils/song.constant";
import { Slider } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { callCreateListenHistory } from "@/apis/user.api";
import type { SliderSingleProps } from 'antd';

interface IProp {
    audio: HTMLAudioElement | null;
    isRepeat: boolean;
}

const ProcessBar: React.FC<IProp> = ({ audio, isRepeat }) => {
    const [currentTime, setCurrentTime] = useState(() => {
        const savedTime = window.localStorage.getItem("junm_song_time");
        return savedTime ? +savedTime : 0;
    });
    const [seekingTime, setSeekingTime] = useState<number | null>(null);
    const [timeLeft, setTimeLeft] = useState(60);

    const dispatch = useAppDispatch();
    const song = useAppSelector(state => state.song);
    const { currentSong, isPlaying } = song;
    const auth = useAppSelector(state => state.auth);
    const { isAuthenticated } = auth;

    // Refs để tránh re-render không cần thiết
    const currentTimeRef = useRef(currentTime);
    const timeLeftRef = useRef(timeLeft);
    const isPlayingRef = useRef(isPlaying);

    // Cập nhật refs khi state thay đổi
    useEffect(() => {
        currentTimeRef.current = currentTime;
        timeLeftRef.current = timeLeft;
        isPlayingRef.current = isPlaying;
    }, [currentTime, timeLeft, isPlaying]);

    const handleCreateListenHistory = useCallback(async () => {
        if (!isAuthenticated) return;
        
        try {
            const data = {
                song_id: currentSong.song_id,
                video_id: ""
            };
            const res = await callCreateListenHistory(data);
            if (res.data) {
                console.log("create listen history success");
            } else {
                console.log("create listen history failed:", res.message);
            }
        } catch (error) {
            console.error("Error creating listen history:", error);
        }
    }, [currentSong.song_id, isAuthenticated]);

    // Xử lý timeLeft và tạo lịch sử nghe
    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setTimeout(() => {
            if (isPlayingRef.current) {
                setTimeLeft(prev => {
                    const newTime = prev - 1;
                    if (newTime === 0 && isAuthenticated) {
                        handleCreateListenHistory();
                    }
                    return newTime;
                });
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [handleCreateListenHistory, isAuthenticated, timeLeft, isPlaying]);

    // Reset timeLeft khi đổi bài hát
    useEffect(() => {
        setTimeLeft(60);
    }, [currentSong.song_id]);

    // Xử lý audio timeupdate
    const handleTimeUpdate = useCallback(() => {
        if (!audio) return;
        
        setCurrentTime(audio.currentTime);
        
        if (audio.currentTime === audio.duration) {
            if (isRepeat) {
                setTimeout(() => {
                    setCurrentTime(0);
                    setTimeLeft(60);
                    audio.play();
                }, 2000);
            } else {
                dispatch(doNextSong());
            }
        }
    }, [audio, isRepeat, dispatch]);

    // Thêm và xóa event listener cho audio
    useEffect(() => {
        if (!audio) return;
        
        audio.addEventListener('timeupdate', handleTimeUpdate);
        return () => audio.removeEventListener('timeupdate', handleTimeUpdate);
    }, [audio, handleTimeUpdate]);

    // Khôi phục thời gian phát từ localStorage
    useEffect(() => {
        if (!audio) return;
        
        const savedTime = window.localStorage.getItem("junm_song_time");
        const initialTime = savedTime ? +savedTime : 0;
        setCurrentTime(initialTime);
        audio.currentTime = initialTime;
    }, [audio]);

    // Lưu thời gian phát vào localStorage
    useEffect(() => {
        if (!currentSong) return;
        
        const interval = setInterval(() => {
            window.localStorage.setItem('junm_song_time', String(currentTimeRef.current));
        }, 3000);
        
        return () => clearInterval(interval);
    }, [currentSong]);

    // Xử lý khi tua nhạc
    const handleSliderChangeComplete = useCallback((value: number) => {
        setCurrentTime(value);
        setSeekingTime(null);
        if (audio) {
            audio.currentTime = value;
        }
    }, [audio]);

    return (
        <div className="w-full mt-1 h-fit">
            <div className="flex justify-center items-center">
                <div className="w-fit text-sm">
                    {formatTime(seekingTime !== null ? seekingTime : currentTime)}
                </div>
                <div className="w-full mx-3">
                    <Slider 
                        className="custom-slider !m-0"
                        tooltip={{ formatter: null }}
                        min={0}
                        max={currentSong.durations}
                        value={seekingTime !== null ? seekingTime : currentTime}
                        onChange={setSeekingTime}
                        onChangeComplete={handleSliderChangeComplete}
                    />
                </div>
                <div className="w-fit text-sm">
                    {formatTime(currentSong.durations)}
                </div>
            </div>
        </div>
    );
};

export default ProcessBar;