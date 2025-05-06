import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { ISong } from '@/types/song.type'
import { useTheme } from '@/utils/ThemeProvider'
import playingAnimation from "@/assets/animations/playing.json";
import React from 'react'
import Lottie from 'lottie-react';
import { TbDots, TbPlayerPlay, TbThumbUp, TbThumbUpFilled } from 'react-icons/tb';
import { Button } from 'antd';
import { doPlaySong } from '@/redux/reducers/song.reducer';

interface IProp {
    song: ISong;
}

const SongCommon: React.FC<IProp> = ({song}) => {
    const {darkMode} = useTheme();

    const dispatch = useAppDispatch();
    const currentSong = useAppSelector(state => state.song.currentSong);
    const user = useAppSelector(state => state.auth.user);

  return (
    <div
    key={song.song_id}
    className={`flex items-center group p-2 rounded-lg transition relative  
        ${darkMode ? "hover:bg-[#23272f]" : "hover:bg-[#f1f1f1]"}`}
>
    <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0">
        <img
            src={song.thumbnail_url}
            alt={song.title}
            className="w-full h-full rounded-md object-cover shadow-md"
        />
        {song.song_id === currentSong.song_id ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-md">
                <Lottie animationData={playingAnimation} loop={true} style={{width: 32, height: 32}} />
            </div>
        ) : (
            <button
                className="absolute inset-0 flex items-center justify-center bg-black/50 \
                rounded-md opacity-0 group-hover:opacity-100 transition cursor-pointer"
                onClick={() => dispatch(doPlaySong(song))}
            >
                <TbPlayerPlay size={22} className="text-white" />
            </button>
        )}
    </div>
    {/* Thông tin bài hát */}
    <div className="flex flex-col min-w-0 ml-3 sm:ml-4 flex-1">
        <span 
            className={`text-base font-medium w-fit cursor-pointer truncate
                ${darkMode ? 'text-white' : 'text-gray-900'}`}
        >
            {song.title}
        </span>
        <span
            className={`text-sm truncate cursor-pointer 
                ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
        >
            {song.artist?.artist_name || ''}
        </span>
    </div>
    {/* Icon bên phải */}
    <div className="hidden group-hover:flex items-center ml-2">
        <Button type='text' className="hover:!text-[#8f5cff] transition">
            {song.likes.includes({
                user_id: user.user_id,
                song_id: song.song_id
            }) ? 
            <TbThumbUpFilled size={20}/>
            :
            <TbThumbUp size={20}/>
            }
        </Button>
        <Button type='text' className="hover:!text-[#8f5cff] transition"><TbDots size={20}/></Button>
    </div>
</div>
  )
}

export default SongCommon