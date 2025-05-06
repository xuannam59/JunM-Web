import { Button, Slider, Tooltip } from 'antd';
import { TbVolume, TbVolumeOff, TbPlaylist } from 'react-icons/tb';
import { useTheme } from '@/utils/ThemeProvider';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { doSetIsCollapsed } from '@/redux/reducers/song.reducer';

interface VolumeControlProps {
  audio: HTMLAudioElement | null;
}

const VolumeControl: React.FC<VolumeControlProps> = ({ audio}) => {
    const { darkMode } = useTheme();
    const [volume, setVolume] = useState(0.25);

    const dispatch = useAppDispatch();
    const isCollapsed = useAppSelector(state => state.song.isCollapsed);
    // Khi đổi volume
    useEffect(() => {
        if (audio) {
            audio.volume = volume;
        }
    }, [volume, audio]);

  return (
    <div className="w-[30%] flex justify-end items-center cursor-pointer">
        <div className="flex items-center">
            {volume === 0 ? 
            <TbVolumeOff size={22} onClick={() => setVolume(0.25)}/>
            :
            <TbVolume size={22} onClick={() => setVolume(0)}/>
            }
            <Slider
            className='custom-slider my-0 ml-2 w-[70px]'
            tooltip={{formatter: (value) => `${value  && (value * 200).toFixed(0)}`}}
            min={0}
            max={0.5}
            step={0.005}
            value={volume}
            onChange={(value) => setVolume(value)}
            />
        </div>
        <div className={`mx-5 h-[33px] border-1 border-[#303030] opacity-10`} />
        <div 
            className={`p-1 ${isCollapsed && "!bg-[#EE10B0] text-[#ffff]"} ${darkMode ? "bg-[#303030]" : "bg-[#F2F2F2]"} rounded-sm cursor-pointer`}
            onClick={() => dispatch(doSetIsCollapsed())}
        >
            <Tooltip title="Danh sách phát">
                <TbPlaylist size={20} />
            </Tooltip>
        </div>
    </div>
  );
};

export default VolumeControl; 