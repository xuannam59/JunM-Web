import { Slider, Tooltip } from 'antd';
import { TbVolume, TbVolumeOff, TbPlaylist } from 'react-icons/tb';
import { useTheme } from '@/utils/ThemeProvider';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { doSetIsCollapsed } from '@/redux/reducers/song.reducer';
import type { SliderSingleProps } from 'antd';
import type { ReactNode } from 'react';

interface VolumeControlProps {
  audio: HTMLAudioElement | null;
}

const VolumeControl: React.FC<VolumeControlProps> = ({ audio }) => {
    const { darkMode } = useTheme();
    const [volumeValue, setVolumeValue] = useState(() => {
        const savedVolume = window.localStorage.getItem("volume");
        return savedVolume ? +savedVolume : 0.25;
    });

    const dispatch = useAppDispatch();
    const isCollapsed = useAppSelector(state => state.song.isCollapsed);

    useEffect(() => {
        if (audio) {
            audio.volume = volumeValue;
        }
    }, [volumeValue, audio]);

    const handleChangeVolume = useCallback((value: number) => {
        setVolumeValue(value);
    }, []);

    const handleChangeVolumeComplete = useCallback((value: number) => {
        window.localStorage.setItem("volume", value.toString());
    }, []);

    const handleToggleMute = useCallback(() => {
        if (volumeValue === 0) {
            const savedVolume = window.localStorage.getItem("volume");
            const newVolume = savedVolume ? +savedVolume : 0.25;
            setVolumeValue(newVolume);
            if (audio) {
                audio.volume = newVolume;
            }
        } else {
            setVolumeValue(0);
            if (audio) {
                audio.volume = 0;
            }
        }
    }, [volumeValue, audio]);

    const handleTogglePlaylist = useCallback(() => {
        dispatch(doSetIsCollapsed());
    }, [dispatch]);

    const sliderProps: SliderSingleProps = useMemo(() => ({
        className: 'custom-slider my-0 ml-2 w-[70px]',
        tooltip: { 
            formatter: (value?: number): ReactNode => 
                value ? `${(value * 200).toFixed(0)}` : ''
        },
        min: 0,
        max: 0.5,
        step: 0.005,
        value: volumeValue,
        onChange: handleChangeVolume,
        onChangeComplete: handleChangeVolumeComplete
    }), [volumeValue, handleChangeVolume, handleChangeVolumeComplete]);

    return (
        <div className="w-[30%] flex justify-end items-center cursor-pointer">
            <div className="flex items-center">
                {volumeValue === 0 ? 
                    <TbVolumeOff size={22} onClick={handleToggleMute}/>
                    :
                    <TbVolume size={22} onClick={handleToggleMute}/>
                }
                <Slider {...sliderProps} />
            </div>
            <div className={`mx-5 h-[33px] border-1 border-[#303030] opacity-10`} />
            <div 
                className={`p-1 ${isCollapsed && "!bg-[#EE10B0] text-[#ffff]"} 
                ${darkMode ? "bg-[#303030]" : "bg-[#F2F2F2]"} rounded-sm cursor-pointer`}
                onClick={handleTogglePlaylist}
            >
                <Tooltip title="Danh sách phát">
                    <TbPlaylist size={20} />
                </Tooltip>
            </div>
        </div>
    );
};

export default VolumeControl; 