import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { doBackSong, doNextSong, doSetIsPlaying } from '@/redux/reducers/song.reducer';
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
}

const PlayerControls: React.FC<PlayerControlsProps> = ({audio}) => {
    const [isShuffle, setIsShuffle] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);

    const dispatch = useAppDispatch();
    const song = useAppSelector(state => state.song);
    const {isPlaying, currentSong, playlist, history} = song;

    useEffect(() => {
        if (!audio) return;
        if (isPlaying) {
        audio.play();
        } else {
        audio.pause();
        }
    }, [isPlaying, currentSong, audio]);
    
    const handlePlayPause = () => {
        dispatch(doSetIsPlaying());
    };

    const handleSkipBack = () => {
        dispatch(doBackSong());
    }

    const handleSkipForward = () => {
        dispatch(doNextSong());
    }

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
                onClick={handleSkipBack}
                disabled={history.length === 0}
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
                onClick={handleSkipForward}
                disabled={playlist.length === 0}
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