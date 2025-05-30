import { callToggleLikeSong } from '@/apis/song.api';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { IListeningHistory } from '@/types/user.type';
import { useTheme } from '@/utils/ThemeProvider';
import { App, Button, Tooltip } from 'antd';
import React, { useCallback, useRef } from 'react';
import { TbChevronRight, TbChevronLeft, TbDots, TbHeart, TbHeartFilled, TbPlayerPlayFilled } from 'react-icons/tb';

interface IProps {  
    listeningHistories: IListeningHistory[]
}   

const CARD_WIDTH = 148; // width + gap

const ListeningHistories: React.FC<IProps> = ({listeningHistories}) => {
    const {darkMode} = useTheme();

    const {message, notification} = App.useApp();
    const auth = useAppSelector(state => state.auth);
    const {isAuthenticated, user} = auth;
    const scrollRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();

    const handleScroll = (dir: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = dir === 'left' ? -CARD_WIDTH * 2: CARD_WIDTH * 2;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const handleToggleLikeSong = useCallback(async(song_id: string, isLiked: boolean) => {
        if(!isAuthenticated) {
            message.error("Please login to like song");
            return;
        }
        const res = await callToggleLikeSong(song_id);
        if(res.data){
            message.success(res.data);
           
        }else{
            notification.error({
                message: "Like error",
                description: res.message
            });
        }
    }, [isAuthenticated, message, notification, dispatch, user.user_id]);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
                <div className='flex items-center gap-2'>
                    <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Nghe Gần Đây
                    </h2>
                    
                    <div className="">
                        <Button
                            onClick={() => handleScroll('left')}
                            type='text'
                            shape='circle'
                        >
                            <TbChevronLeft size={22} />
                        </Button>
                        <Button
                            onClick={() => handleScroll('right')}
                            type='text'
                            shape='circle'
                        >
                            <TbChevronRight size={22} />
                        </Button>
                    </div>
                </div>
                <div className='flex items-center gap-1 cursor-pointer group'>
                    <span className='text-md text-gray-400 group-hover:text-pink-500'>
                        Tất cả
                    </span> 
                    <TbChevronRight size={20}  className='text-gray-400 group-hover:text-pink-500'/>
                </div>
            </div>
            <div className="relative">
                <div
                    ref={scrollRef}
                    className="flex flex-row gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
                    style={{ scrollBehavior: 'smooth', overflow: 'hidden' }}
                >
                    {listeningHistories.map((history) => {
                        let isLiked = history.song?.likes?.some((like) => like.user_id === user?.user_id);
                        return (
                        <div
                            key={history.history_id}
                            className={`group/card flex-shrink-0 w-[140px] cursor-pointer`}
                        >
                            <div className="relative rounded-xl overflow-hidden aspect-square bg-gray-800">
                                <img
                                    src={history.song?.thumbnail_url}
                                    alt={history.song?.title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover/card:scale-105"
                                />
                                {/* Overlay play/like/dots */}
                                <div className="absolute inset-0 flex items-center gap-1 justify-center bg-black/30 opacity-0 group-hover/card:opacity-100 transition">
                                    <div className='hover:bg-[#f2f2f2f2]/50 rounded-full p-1.5'>
                                    <Tooltip title={isLiked ? "Bỏ yêu thích" : "Yêu thích"}>
                                        {isLiked? (
                                            <TbHeartFilled 
                                                size={20} 
                                                className='text-[#ff0000]'
                                                onClick={() => {
                                                    if(history.song?.song_id) {
                                                        handleToggleLikeSong(history.song?.song_id, false);
                                                    }
                                                }}
                                            />
                                        ) : (
                                            <TbHeart 
                                                size={20} 
                                                className='text-white'
                                                onClick={() => {
                                                    if(history.song?.song_id) {
                                                        handleToggleLikeSong(history.song?.song_id, true);
                                                    }
                                                }}
                                            />
                                        )}
                                    </Tooltip>
                                    </div>
                                    <div className='border-2 border-white rounded-full p-1.5'>
                                        <TbPlayerPlayFilled size={20} className='text-white'/>
                                    </div>
                                    <div className='hover:bg-[#f2f2f2f2]/50 rounded-full p-1.5'>
                                        <TbDots size={20} className='text-white'/>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2 text-sm font-semibold line-clamp-2">
                                {history.song?.title}
                            </div>
                        </div>
                    )}
                )}
                </div>
            </div>
        </div>
    )
}

export default ListeningHistories;