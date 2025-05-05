import { formatTime } from '@/utils/song.constant';
import { useTheme } from '@/utils/ThemeProvider';
import { Button, Slider } from 'antd';
import {
  TbArrowsShuffle,
  TbPlayerPauseFilled,
  TbPlayerPlayFilled,
  TbPlayerSkipBack,
  TbPlayerSkipForward,
  TbRepeat
} from 'react-icons/tb';

interface PlayerControlsProps {
    isPlaying: boolean;
    audioDuration: number;
    seekingTime: number | null;
    currentTime: number;
    onPlayPause: () => void;
    onSliderChange: (value: number) => void;
    onSliderChangeComplete: (value: number) => void;
}

const PlayerControls: React.FC<PlayerControlsProps> = (props) => {
    const {
        isPlaying, audioDuration, seekingTime, currentTime, 
        onPlayPause, onSliderChange, onSliderChangeComplete
    } = props

    const { darkMode } = useTheme();
    const track = {
        background: darkMode ? "#ffffff" : "#1890ff"
    };
    
    return ( <>
        <div className="flex items-center gap-4">
            <Button type='text'><TbArrowsShuffle size={22} /></Button>
            <Button type='text'><TbPlayerSkipBack size={22} /></Button>
            <Button
                size='large'
                color="default"
                variant="outlined"
                type='text'
                shape='circle'
                onClick={onPlayPause}
            >
                {isPlaying ? (
                <TbPlayerPauseFilled size={24}/>
                ) : (
                <TbPlayerPlayFilled size={24}/>
                )}
            </Button>
            <Button type='text'><TbPlayerSkipForward size={22} /></Button>
            <Button type='text'><TbRepeat size={22} /></Button>
        </div>
        <div className="w-full mt-1 h-fit">
            <div className="flex justify-center items-center">
                <div className="w-fit text-sm">{formatTime(seekingTime !== null ? seekingTime : currentTime)}</div>
                <div className="w-full mx-3">
                <Slider
                    className='custom-slider !m-0'
                    tooltip={{ formatter: null }}
                    styles={{
                    track: track,
                    }}
                    min={0}
                    max={audioDuration}
                    value={seekingTime !== null ? seekingTime : currentTime}
                    onChange={onSliderChange}
                    onChangeComplete={onSliderChangeComplete}
                />
                </div>
                <div className="w-fit text-sm">{formatTime(audioDuration)}</div>
            </div>
        </div>
    </>
  );
};

export default PlayerControls; 