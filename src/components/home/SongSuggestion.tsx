import { ISong } from '@/types/song.type';
import { useTheme } from '@/utils/ThemeProvider';
import React, { useCallback } from 'react';
import SongCommon from '../common/SongCommon';
import { useAppDispatch } from '@/redux/hook';
import { doPlaySong, doSetHistory, doSetPlaylist } from '@/redux/reducers/song.reducer';
import { callGetSongs } from '@/apis/song.api';
import ButtonPrimary from '../common/ButtonPrimary';
import { TbRefresh } from 'react-icons/tb';

interface IProp {
    songs: ISong[];
    getSongs: () => Promise<void>
}

const SongSuggestion: React.FC<IProp> = ({songs , getSongs}) => {
    const {darkMode} = useTheme();

    const dispatch = useAppDispatch();

    const handlePlaySong = useCallback(async (song: ISong) => {
        dispatch(doPlaySong(song));
        const res = await callGetSongs("random=true&pageSize=15");
        if(res.data) {
            const playlist = res.data.result.filter(item => item.song_id != song.song_id);
            dispatch(doSetPlaylist(playlist));
            dispatch(doSetHistory([]));
            window.localStorage.setItem("junm_playlist", JSON.stringify(playlist));
            window.localStorage.setItem("junm_history", JSON.stringify([]));
        }
    }, [dispatch])

  return (<>
        <div className="flex items-center justify-between mb-6 px-2 sm:px-4 lg:px-0">
            <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Gợi Ý Cho Bạn</h2>
            <ButtonPrimary
                className="!rounded-full"
                onClick={getSongs}
                title="LÀM MỚI"
                icon={<TbRefresh size={20}/>}   
            />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-4 lg:px-0">
            {songs.map((song) =>  (
                <SongCommon 
                    key={song.song_id} 
                    songData={song} 
                    handlePlaySong={() => handlePlaySong(song)}
                />
            ))}
        </div>
    </>
  )
}

export default SongSuggestion