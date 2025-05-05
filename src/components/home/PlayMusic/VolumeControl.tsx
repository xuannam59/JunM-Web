import { Slider, Tooltip } from 'antd';
import { TbVolume, TbVolumeOff, TbPlaylist } from 'react-icons/tb';
import { useTheme } from '@/utils/ThemeProvider';
import { useEffect } from 'react';

interface VolumeControlProps {
  audio: HTMLAudioElement | null;
  volume: number;
  onVolumeChange: (value: number) => void;
}

const VolumeControl: React.FC<VolumeControlProps> = ({ audio, volume, onVolumeChange }) => {
    const { darkMode } = useTheme();
    const track = {
        background: darkMode ? "#ffffff" : "#1890ff"
    };

    // Khi đổi volume
    useEffect(() => {
        if (audio) {
            audio.volume = volume;
        }
    }, [volume]);

  return (
    <div className="w-[30%] flex justify-end items-center cursor-pointer">
        <div className="flex items-center">
            {volume === 0 ? 
            <TbVolumeOff size={22} onClick={() => onVolumeChange(0.25)}/>
            :
            <TbVolume size={22} onClick={() => onVolumeChange(0)}/>
            }
            <Slider
            className='custom-slider my-0 ml-2 w-[70px]'
            tooltip={{formatter: (value) => `${value  && (value * 200).toFixed(0)}`}}
            min={0}
            max={0.5}
            step={0.005}
            value={volume}
            onChange={onVolumeChange}
            />
        </div>
        <div className={`mx-5 h-[33px] border-1 border-[#303030] opacity-10`} />
        <div className={`p-1 ${darkMode ? "bg-[#303030]" : "bg-[#F2F2F2]"}  rounded-sm cursor-pointer`}>
            <Tooltip title="Danh sách phát">
            <TbPlaylist size={20} />
            </Tooltip>
        </div>
    </div>
  );
};

export default VolumeControl; 