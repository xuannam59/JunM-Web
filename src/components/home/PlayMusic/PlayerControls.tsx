import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { doBackSong, doNextSong, doSetIsPlaying, doSetPlaylist } from '@/redux/reducers/song.reducer';
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
import { shuffleArray } from '@/utils/song.constant';

interface PlayerControlsProps {
    audio: HTMLAudioElement | null;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({audio}) => {
    const [isShuffle, setIsShuffle] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);
    const [originalPlaylist, setOriginalPlaylist] = useState<any[]>([]);

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

    const handleShuffle = () => {
        if (!isShuffle) {
            setOriginalPlaylist(playlist);
            const shuffled = shuffleArray(playlist);
            dispatch(doSetPlaylist(shuffled));
        } else {
            dispatch(doSetPlaylist(originalPlaylist));
        }
        setIsShuffle(!isShuffle);
    };

    return ( <>
        <div className="flex items-center gap-2">
            <Button 
                type='text' 
                className={`${isShuffle && "!text-[#0E9EEF]"}`} 
                onClick={handleShuffle}
            >
                <TbArrowsShuffle size={22} />
            </Button>
            <Button 
                type='text'
                onClick={() => dispatch(doBackSong())}
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
                onClick={() =>  dispatch(doSetIsPlaying())}
            >
                {isPlaying ? (
                <TbPlayerPauseFilled size={24}/>
                ) : (
                <TbPlayerPlayFilled size={24}/>
                )}
            </Button>
            <Button 
                type='text'                
                onClick={() => dispatch(doNextSong())}
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
            isRepeat={isRepeat}
        />
    </>
  );
};

export default PlayerControls; 