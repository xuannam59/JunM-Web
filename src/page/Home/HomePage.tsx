// src/pages/Home.tsx
import { useAppDispatch, useAppSelector } from '@/ redux/hook';
import { doPlaySong } from '@/ redux/reducers/song.reducer';
import { callGetSongs } from '@/apis/song.api';
import { ISong } from '@/types/song.type';
import { useTheme } from '@/utils/ThemeProvider';
import { Button } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { TbRefresh, TbPlayerPlay, TbDots, TbThumbUp, TbThumbUpFilled } from 'react-icons/tb';
import Lottie from 'lottie-react';
import playingAnimation from '@/assets/animations/playing.json';

const Home: React.FC = () => {
    const {darkMode} = useTheme();
    const [songsData, setSongsData] = useState<ISong[]>([]);

    const user = useAppSelector(state => state.auth.user);
    const dispatch = useAppDispatch();
    const currentSong = useAppSelector(state => state.song.currentSong);

    const getSongs = useCallback(async () => {
        const res = await callGetSongs("random=true&pageSize=9");
        if(res.data) {
            setSongsData(res.data.result);
        }
    }, []);

    useEffect(() => {
        getSongs();
    }, [getSongs]);

    const handleClickPlay = (song: ISong) => {
        dispatch(doPlaySong({song}));
    }

    return (
        <div className={`w-full min-h-[400px]`}>
            {user.listeningHistories.length > 0 && 
                <div className="mb-8">
                    <div className="flex">
                        <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Nghe Gần Đây</h2>
                    </div>
                </div>
            }

            <div className=" mt-4">
                <div className="flex items-center justify-between mb-6 px-2 sm:px-4 lg:px-0">
                    <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Gợi Ý Cho Bạn</h2>
                    <Button
                        type='primary'
                        onClick={getSongs}
                        className={`!rounded-full !bg-gradient-to-r from-purple-500 to-pink-500 !border-none opacity-80 hover:opacity-100`}
                    >
                        <TbRefresh size={20}/>
                        <span className='font-medium'>
                        LÀM MỚI
                        </span>
                    </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-4 lg:px-0">
                    {songsData.map((song) => 
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
                                {song.song_id === currentSong?.song_id ? (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-md">
                                        <Lottie animationData={playingAnimation} loop={true} style={{width: 32, height: 32}} color='#cccc'/>
                                    </div>
                                ) : (
                                    <button
                                        className="absolute inset-0 flex items-center justify-center bg-black/50 \
                                        rounded-md opacity-0 group-hover:opacity-100 transition cursor-pointer"
                                        onClick={() => handleClickPlay(song)}
                                    >
                                        <TbPlayerPlay size={22} className="text-white" />
                                    </button>
                                )}
                            </div>
                            {/* Thông tin bài hát */}
                            <div className="flex flex-col min-w-0 ml-3 sm:ml-4 flex-1">
                                <span 
                                    className={`text-base font-medium w-fit cursor-pointer truncate${darkMode ? 'text-white' : 'text-gray-900'}`}
                                >
                                    {song.title}
                                </span>
                                <span
                                    className={`text-sm truncate w-fit cursor-pointer ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
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
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;