import { IListeningHistory } from '@/types/user.type';
import { useTheme } from '@/utils/ThemeProvider';
import { Button } from 'antd';
import React, { useRef } from 'react';
import { TbChevronRight, TbChevronLeft, TbDots, TbPlayerPlayFilled } from 'react-icons/tb';
import ButtonHeart from '../common/ButtonHeart';
import { DEFAULT_SONG } from '@/types/song.type';

interface IProps {  
    listeningHistories: IListeningHistory[]
}   

const CARD_WIDTH = 148; // width + gap

const ListeningHistories: React.FC<IProps> = ({listeningHistories}) => {
    const {darkMode} = useTheme();

    const scrollRef = useRef<HTMLDivElement>(null);

    const handleScroll = (dir: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = dir === 'left' ? -CARD_WIDTH * 2: CARD_WIDTH * 2;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

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
                                        <ButtonHeart song={history.song || DEFAULT_SONG}/>
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