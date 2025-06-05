import { Button, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { TbDots } from 'react-icons/tb';
import ButtonHeart from '@/components/common/ButtonHeart';
import { useAppSelector } from '@/redux/hook';

const SongInfo: React.FC = () => {
    const [animation, setAnimation] = useState(false);

    const currentSong = useAppSelector(state => state.song.currentSong);

    useEffect(() => {
        if(currentSong && currentSong.title && currentSong.title.length > 27) {
          setAnimation(true);
        } else {
          setAnimation(false);
        }
    }, [currentSong]);

  return (
    <div className="w-[30%] flex items-center">
        <div className="flex items-center">
            <div className="w-[64px] h-[64px] rounded-sm overflow-hidden mr-4">
            <img
                src={currentSong.thumbnail_url || "/images/default-thumbnail.webp"}
                alt={currentSong.title || "song-thumb"}
                className="w-full h-full object-cover"
            />
            </div>
            <div className="flex flex-col max-w-[200px]">
            <div className="relative w-full overflow-hidden">
                <div className={`flex w-[200%] whitespace-nowrap ${animation && "marquee-animation"}`}>
                <div className="w-[100%] pr-2.5 text-sm">
                    {currentSong.title || "Song name"}
                </div>
                {animation &&
                    <div className="w-[100%] pr-2.5 text-sm" aria-hidden="true">
                    {currentSong.title || "Song name"}
                    </div>
                }
                </div>
            </div>
            <span className="text-sm text-gray-500 truncate">{currentSong.artist.artist_name || "Tên ca sĩ"}</span>
            </div>
            <div className="flex items-center ml-2.5">
                <ButtonHeart song={currentSong}/>
                <Tooltip title="Xem thêm" color=''>
                    <Button type='text' className='hover:!text-[#8f5cff] transition' shape='circle'>
                        <TbDots size={20} />
                    </Button>
                </Tooltip>
            </div>
        </div>
    </div>
  );
};

export default SongInfo; 