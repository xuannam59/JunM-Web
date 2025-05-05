import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { doSetIsPlaying } from '@/redux/reducers/song.reducer';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import {
    TbArrowsShuffle,
    TbPlayerPauseFilled,
    TbPlayerPlayFilled,
    TbPlayerSkipBack,
    TbPlayerSkipForward,
    TbRepeat,
    TbRepeatOnce
} from 'react-icons/tb';
import ProcessBar from './ProcessBar';

interface PlayerControlsProps {
    audio: HTMLAudioElement | null;
    isPlaying: boolean;
}

const PlayerControls: React.FC<PlayerControlsProps> = (props) => {
    const {
        isPlaying, audio
    } = props;
    const [isShuffle, setIsShuffle] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);

    const dispatch = useAppDispatch();
    const song = useAppSelector(state => state.song);

    const handlePlayPause = () => {
        dispatch(doSetIsPlaying());
    };
    
    return ( <>
        <div className="flex items-center gap-2">
            <Button type='text' 
                className={`${isShuffle && "!text-[#0E9EEF]"}`} 
                onClick={() => setIsShuffle(!isShuffle)}
            >
                <TbArrowsShuffle size={22} />
            </Button>
            <Button 
                type='text'
                onClick={() => 1}
                disabled={song.history.length === 0}
            >
                <TbPlayerSkipBack size={22} />
            </Button>
            <Button
                size='large'
                color="default"
                variant="outlined"
                type='text'
                shape='circle'
                onClick={handlePlayPause}
            >
                {isPlaying ? (
                <TbPlayerPauseFilled size={24}/>
                ) : (
                <TbPlayerPlayFilled size={24}/>
                )}
            </Button>
            <Button 
                type='text'                
                onClick={() => 1}
                disabled={song.playlist.length === 0}
            >
                <TbPlayerSkipForward size={22} />
            </Button>
            <Button 
                className={`${isRepeat && "!text-[#EE10B0]"}`}
                onClick={() => setIsRepeat(!isRepeat)}
                type='text'
            >   
            {isRepeat ? 
                <TbRepeatOnce size={22}/> 
                :
                <TbRepeat size={22} />
            }
            </Button>
        </div>
        <ProcessBar
            audio={audio}
            handlePlayPause={handlePlayPause}
            isRepeat={isRepeat}
        />
    </>
  );
};

export default PlayerControls; 