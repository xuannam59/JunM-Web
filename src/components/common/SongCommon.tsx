import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { ISong } from '@/types/song.type'
import { useTheme } from '@/utils/ThemeProvider'
import playingAnimation from "@/assets/animations/playing.json";
import React from 'react'
import Lottie from 'lottie-react';
import { TbDots, TbPlayerPlay } from 'react-icons/tb';
import { Button } from 'antd';
import { doSetIsPlaying } from '@/redux/reducers/song.reducer';
import ButtonHeart from './ButtonHeart';

interface IProp {
    songData: ISong;
    handlePlaySong: (value: ISong) => void;
}

const SongCommon: React.FC<IProp> = ({songData, handlePlaySong}) => {
    const {darkMode} = useTheme();

    const dispatch = useAppDispatch();
    const song = useAppSelector(state => state.song);
    const {currentSong, isPlaying} = song;

  return ( <>
  
  
    <div
        key={songData.song_id}
        className={`flex items-center group p-2 rounded-lg transition relative
            ${darkMode ? "hover:bg-[#23272f]" : "hover:bg-[#f1f1f1]"}
            ${songData.song_id === currentSong.song_id ? (darkMode ? "bg-[#23272f]" : "bg-[#f1f1f1]") : ""}
        `}
    >
        <div className="relative w-9 h-9 sm:w-12 sm:h-12 flex-shrink-0">
            <img
                src={songData.thumbnail_url || "/images/default-thumbnail.webp"}
                alt={songData.title}
                className="w-full h-full rounded-md object-cover shadow-md"
            />
            {songData.song_id === currentSong.song_id ?
            ( isPlaying ?
                    <div 
                        className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-md cursor-pointer"
                        onClick={() => dispatch(doSetIsPlaying())}
                    >
                        <Lottie animationData={playingAnimation} loop={true} style={{width: 32, height: 32}} />
                    </div>
                    :
                    <button
                        className="absolute inset-0 flex items-center justify-center bg-black/50 \
                        rounded-md transition cursor-pointer"
                        onClick={() => dispatch(doSetIsPlaying())}
                    >
                        <TbPlayerPlay size={22} className="text-white" />
                    </button>
                )
                :
                (<button
                        className="absolute inset-0 flex items-center justify-center bg-black/50 \
                        rounded-md opacity-0 group-hover:opacity-100 transition cursor-pointer"
                        onClick={() => handlePlaySong(songData)}
                    >
                        <TbPlayerPlay size={22} className="text-white" />
                </button>)
            }
        </div>
        {/* Thông tin bài hát */}
        <div className="flex flex-col min-w-0 ml-3 sm:ml-4 flex-1">
            <span 
                className={`text-sm font-medium w-full cursor-pointer truncate
                    ${darkMode ? 'text-white' : 'text-gray-900'}`}
                title={songData.title}
            >
                {songData.title}
            </span>
            <span
                className={`text-sm truncate cursor-pointer 
                    ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
            >
                {songData.artist?.artist_name || ''}
            </span>
        </div>
        {/* Icon bên phải */}
        <div className="hidden group-hover:flex items-center ml-2">
            <ButtonHeart song={songData}/>
            <Button 
                type='text' 
                className="hover:!text-[#8f5cff] transition" 
                shape="circle"
            >
                <TbDots size={20}/>
            </Button>
        </div>
    </div>
  </>
  )
}

export default SongCommon