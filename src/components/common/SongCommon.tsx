import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { ISong } from '@/types/song.type'
import { useTheme } from '@/utils/ThemeProvider'
import playingAnimation from "@/assets/animations/playing.json";
import React, { useCallback, useEffect, useState } from 'react'
import Lottie from 'lottie-react';
import { TbDots, TbHeart, TbHeartFilled, TbPlayerPlay } from 'react-icons/tb';
import { Button, Tooltip } from 'antd';
import { doSetIsPlaying } from '@/redux/reducers/song.reducer';
import { callToggleLikeSong } from '@/apis/song.api';
import { App } from 'antd';
import RequestLoginModal from '@/components/modals/RequestLoginModal';

interface IProp {
    songData: ISong;
    handlePlaySong: (value: ISong) => void;
}

const SongCommon: React.FC<IProp> = ({songData, handlePlaySong}) => {
    const {darkMode} = useTheme();
    const {message, notification} = App.useApp();

    const [isLiked, setIsLiked] = useState(false);
    const [isOpenRequestLoginModal, setIsOpenRequestLoginModal] = useState(false);

    const dispatch = useAppDispatch();
    const song = useAppSelector(state => state.song);
    const {currentSong, isPlaying} = song;
    const auth = useAppSelector(state => state.auth);
    const {user, isAuthenticated} = auth;

    useEffect(() => {
        setIsLiked(songData.likes.some(like => like.user_id === user.user_id));
    }, [songData.likes, user.user_id]);

    const handleToggleLikeSong = useCallback(async() => {
        if(!isAuthenticated) {
            setIsOpenRequestLoginModal(true);
            return;
        }
        const res = await callToggleLikeSong(songData.song_id);
        if(res.data){
            message.success(res.data);
            setIsLiked(!isLiked);
        }else{
            notification.error({
                message: "Like error",
                description: res.message
            });
        }
    }, [songData.song_id, isAuthenticated, message, notification, isLiked, dispatch, user.user_id]);

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
            <Tooltip title={isLiked ? "Bỏ yêu thích" : "Yêu thích"}>
                <Button 
                    type='text' 
                    className="hover:!text-[#FF0000] transition" 
                    shape="circle"
                    onClick={handleToggleLikeSong}
                >
                    {isLiked ? 
                        <TbHeartFilled size={20} className='text-[#FF0000]'/>
                        :
                        <TbHeart size={20}/>
                    }
                </Button>
            </Tooltip>
            <Button type='text' className="hover:!text-[#8f5cff] transition" shape="circle"><TbDots size={20}/></Button>
        </div>
    </div>
    <RequestLoginModal
        open={isOpenRequestLoginModal}
        onClose={() => setIsOpenRequestLoginModal(false)}
    />
  </>
  )
}

export default SongCommon