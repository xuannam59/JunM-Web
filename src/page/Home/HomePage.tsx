// src/pages/Home.tsx
import { callGetSongs } from '@/apis/song.api';
import SongSuggestion from '@/components/home/SongSuggestion';
import { useAppSelector } from '@/redux/hook';
import { ISong } from '@/types/song.type';
import { useTheme } from '@/utils/ThemeProvider';
import React, { useCallback, useEffect, useState } from 'react';

const Home: React.FC = () => {
    const {darkMode} = useTheme();
    const [songsData, setSongsData] = useState<ISong[]>([]);

    const user = useAppSelector(state => state.auth.user);

    const getSongs = useCallback(async () => {
        const res = await callGetSongs("random=true&pageSize=9");
        if(res.data) {
            setSongsData(res.data.result);
        }
    }, []);

    useEffect(() => {
        getSongs();
    }, [getSongs]);

    return (
        <div className={`w-full min-h-[400px]`}>
            {user.listeningHistories.length > 0 && 
                <div className="mb-8">
                    <div className="flex">
                        <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Nghe Gần Đây</h2>
                    </div>
                </div>
            }

            <div className=" mb-8">
                <SongSuggestion
                    songs={songsData}
                    getSongs={getSongs}
                />
            </div>
        </div>
    );
};

export default Home;