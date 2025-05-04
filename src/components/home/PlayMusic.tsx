import { useAppSelector } from '@/ redux/hook';
import { formatTime } from '@/utils/song.constant';
import { useTheme } from '@/utils/ThemeProvider';
import { Button, Slider, Tooltip } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import {
  TbArrowsShuffle, TbDots, TbHeart,
  TbPlayerPauseFilled,
  TbPlayerPlayFilled, TbPlayerSkipBack, TbPlayerSkipForward,
  TbPlaylist, TbRepeat, TbVolume,
  TbVolumeOff
} from 'react-icons/tb';

const PlayMusic: React.FC = () => {
  const { darkMode } = useTheme();
  const [animation, setAnimation] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.125);
  const [seekingTime, setSeekingTime] = useState<number | null>(null);

  const currentSong = useAppSelector(state => state.song.currentSong);
  
  const track = {
    background: darkMode ? "#ffffff" : "#1890ff"
  }
  useEffect(() => {
    if(currentSong && currentSong.title && currentSong.title.length > 27) {
      setAnimation(true);
    } else {
      setAnimation(false);
    }
  }, [currentSong]);

  // Khi đổi bài hát, reset thời gian, play luôn
  useEffect(() => {
    setCurrentTime(0);
    setIsPlaying(true);
    window.localStorage.setItem('song_time', "0");
    if (currentSong?.durations) {
      setAudioDuration(currentSong.durations);
    } else {
      setAudioDuration(0);
    }
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.load();
      audioRef.current.volume = volume;
      audioRef.current.play();
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
  }, [isPlaying]);

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
        if(Math.ceil(audio.currentTime) === currentSong?.durations){
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
    setIsPlaying((prev) => !prev);
  };

  const handleVolumeChange = (value: number) => {
    setVolume(value);
  };

  const currentTimeRef = useRef(currentTime);
  useEffect(() => {
    currentTimeRef.current = currentTime;
  }, [currentTime]);

  // Lưu thời gian phát vào localStorage mỗi 3 giây khi đang phát
  useEffect(() => {
    if (!isPlaying || !currentSong) return;
    const interval = setInterval(() => {
      window.localStorage.setItem('song_time', String(currentTimeRef.current));
    }, 3000);
    return () => clearInterval(interval);
  }, [isPlaying, currentSong]);

  return (
    <>
      <div className="w-[30%] flex items-center">
        <div className="flex items-center">
          <div className="w-[64px] h-[64px] rounded-sm overflow-hidden mr-4">
            <img
              src={currentSong?.thumbnail_url || "https://placehold.co/64x64.png"}
              alt={currentSong?.title || "song-thumb"}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col max-w-[200px]">
            <div className="relative w-full overflow-hidden">
              <div className={`flex w-[200%] whitespace-nowrap ${animation && "marquee-animation"}`}>
                <div className="w-[100%] pr-2.5 text-sm">
                  {currentSong?.title || "Tên bài hát"}
                </div>
                {animation &&
                  <div className="w-[100%] pr-2.5 text-sm" aria-hidden="true">
                    {currentSong?.title || "Tên bài hát"}
                  </div>
                }
              </div>
            </div>
            <span className="text-sm text-gray-500 truncate">{currentSong?.artist?.artist_name || "Tên ca sĩ"}</span>
          </div>
          <div className="flex items-center ml-2.5">
            <Tooltip title="Thêm vào thư viện" color=''>
              <Button icon={<TbHeart size={20} />} type='text' />
            </Tooltip>
            <Tooltip title="Xem thêm" color=''>
              <Button icon={<TbDots size={20} />} type='text' />
            </Tooltip>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center max-w-[40vw]">
        <audio
          ref={audioRef}
          src={currentSong?.file_url || ''}
          autoPlay
        />
        <div className="flex items-center gap-4">
          <Button type='text'><TbArrowsShuffle size={22} /></Button>
          <Button type='text'><TbPlayerSkipBack size={22} /></Button>
          <Button
            size='large'
            color="default"
            variant="outlined"
            type='text'
            shape='circle'
            onClick={handlePlayPause}
          >
            {isPlaying ? (
              <TbPlayerPauseFilled size={24}/>
            ) : (
              <TbPlayerPlayFilled size={24}/>
            )}
          </Button>
          <Button type='text'><TbPlayerSkipForward size={22} /></Button>
          <Button type='text'><TbRepeat size={22} /></Button>
        </div>
        {/* Progress bar */}
        <div className="w-full mt-1 h-fit">
          <div className="flex justify-center items-center">
            <div className="w-fit text-sm">{formatTime(seekingTime !== null ? seekingTime : currentTime)}</div>
            <div className="w-full mx-3">
              <Slider
                className='custom-slider !m-0'
                tooltip={{ formatter: null }}
                styles={{
                  track: track,
                }}
                min={0}
                max={audioDuration}
                value={seekingTime !== null ? seekingTime : currentTime}
                onChange={handleSliderChange}
                onChangeComplete={handleSliderChangeComplete}
              />
            </div>
            <div className="w-fit text-sm">{formatTime(audioDuration)}</div>
          </div>
        </div>
      </div>

      <div className="w-[30%] flex justify-end items-center cursor-pointer">
        <div className="flex items-center">
          {volume === 0 ? 
            <TbVolumeOff size={22} onClick={() => handleVolumeChange(0.125)}/>
            :
            <TbVolume size={22} onClick={() => handleVolumeChange(0)}/>
          }
          <Slider
            className='custom-slider my-0 ml-2 w-[70px]'
            tooltip={{ formatter: null }}
            styles={{
              track: track
            }}
            min={0}
            max={0.25}
            step={0.005}
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
        <div className={`mx-5 h-[33px] border-1 border-[#303030] opacity-10`} />
        <div className={`p-1 ${darkMode ? "bg-[#303030]" : "bg-[#F2F2F2]"}  rounded-sm cursor-pointer`}>
          <Tooltip title="Danh sách phát">
            <TbPlaylist size={20} />
          </Tooltip>
        </div>
      </div>
    </>
  )
}

export default PlayMusic