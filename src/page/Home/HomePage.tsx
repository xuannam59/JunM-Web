// src/pages/Home.tsx
import { callGetSongs } from '@/apis/song.api';
import { callGetListenHistory } from '@/apis/user.api';
import ListeningHistories from '@/components/home/ListeningHistories';
import SongSuggestion from '@/components/home/SongSuggestion';
import { ISong } from '@/types/song.type';
import { IListeningHistory } from '@/types/user.type';
import React, { useCallback, useEffect, useState } from 'react';

const Home: React.FC = () => {
    const [songsData, setSongsData] = useState<ISong[]>([]);
    const [listeningHistories, setListeningHistories] = useState<IListeningHistory[]>([]);

    const getSongs = useCallback(async () => {
        const res = await callGetSongs("random=true&pageSize=9");
        if(res.data) {
            setSongsData(res.data.result);
        }
    }, []);

    const getListeningHistories = useCallback(async () => {
        const res = await callGetListenHistory("pageSize=12");
        if(res.data) {
            setListeningHistories(res.data.result);
        }
    }, []);

    useEffect(() => {
        getSongs();
    }, [getSongs]);

    useEffect(() => {
        getListeningHistories();
    }, [getListeningHistories]);

    return (
        <div className="w-full min-h-[400px] h-full">
            {listeningHistories.length > 0 && 
                <div className="mb-8">
                   <ListeningHistories listeningHistories={listeningHistories}/>
                </div>
            }

            <div className="mb-8">
                <SongSuggestion
                    songs={songsData}
                    getSongs={getSongs}
                />
            </div>
        </div>
    );
};

export default Home;