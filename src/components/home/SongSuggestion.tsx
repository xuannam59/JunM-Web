import { ISong } from '@/types/song.type';
import { useTheme } from '@/utils/ThemeProvider';
import { Button } from 'antd';
import React from 'react';
import { TbRefresh } from 'react-icons/tb';
import SongCommon from '../common/SongCommon';

interface IProp {
    songs: ISong[];
    getSongs: () => Promise<void>
}

const SongSuggestion: React.FC<IProp> = ({songs , getSongs}) => {
    const {darkMode} = useTheme();


  return (<>
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
            {songs.map((song) =>  <SongCommon song={song} />)}
        </div>
    </>
  )
}

export default SongSuggestion