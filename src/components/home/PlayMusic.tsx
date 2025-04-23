import { useTheme } from '@/utils/ThemeProvider';
import { Button, Slider, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  TbArrowsShuffle, TbDots, TbHeart,
  TbPlayerPlayFilled, TbPlayerSkipBack, TbPlayerSkipForward,
  TbPlaylist, TbRepeat, TbVolume
} from 'react-icons/tb';

interface IProp {

}

const PlayMusic: React.FC<IProp> = () => {
  const { darkMode } = useTheme();
  const [animation, setAnimation] = useState(false);
  const title = "Lorem ipsum dolor sit 12312323";
  const track = {
    background: darkMode ? "#ffffff" : "#1890ff"
  }
  useEffect(() => {
    if (title.length >= 30) {
      setAnimation(true);
    }
  }, [title]);

  return (
    <>
      <div className="w-[30%] flex items-center">
        <div className="flex items-center">
          <div className="w-[64px] h-[64px] rounded-sm overflow-hidden mr-4">
            <img
              src="https://placehold.co/64x64.png"
              alt="song-thumb"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col max-w-[200px]">
            <div className="relative w-full overflow-hidden">
              <div className={`flex w-[200%] whitespace-nowrap ${animation && "marquee-animation"}`}>
                <div className="w-[100%] pr-2.5 text-sm">
                  {title}
                </div>
                {animation &&
                  <div className="w-[100%] pr-2.5 text-sm" aria-hidden="true">
                    {title}
                  </div>
                }
              </div>
            </div>
            <span className="text-sm text-gray-500 truncate">Artist name</span>
          </div>
          <div className="flex items-center ml-2.5">
            <Tooltip title="Thêm vào thư viện" color=''>
              <Button icon={<TbHeart size={20} />} type='text' />
            </Tooltip>
            <Tooltip title="Xem thêm" color=''>
              <Button icon={<TbDots size={20} />} type='text' />
            </Tooltip>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center max-w-[40vw]">
        <div className="flex items-center gap-4">
          <Button type='text'><TbArrowsShuffle size={22} /></Button>
          <Button type='text'><TbPlayerSkipBack size={22} /></Button>
          <Button
            size='large'
            color="default"
            variant="outlined"
            type='text'
            shape='circle'
          >
            <TbPlayerPlayFilled size={24} />
            {/* <TbPlayerPauseFilled size={24}/> */}
          </Button>
          <Button type='text'><TbPlayerSkipForward size={22} /></Button>
          <Button type='text'><TbRepeat size={22} /></Button>
        </div>
        {/* Progress bar */}
        <div className="w-full mt-1 h-fit">
          <div className="flex justify-center items-center">
            <div className="w-fit text-sm">00.00</div>
            <div className="w-full mx-3">
              <Slider
                className='custom-slider !m-0'
                tooltip={{ formatter: null }}
                styles={{
                  track: track,
                }}
              />
            </div>
            <div className="w-fit text-sm">03.56</div>
          </div>
        </div>
      </div>

      <div className="w-[30%] flex justify-end items-center cursor-pointer">
        <div className="flex items-center">
          <TbVolume size={22} />
          <Slider
            className='custom-slider my-0 ml-2 w-[70px]'
            tooltip={{ formatter: null }}
            styles={{
              track: track
            }}
          />
        </div>
        <div className={`mx-5 h-[33px] border-1 border-[#303030] opacity-10`} />
        <div className={`p-1 ${darkMode ? "bg-[#303030]" : "bg-[#F2F2F2]"}  rounded-sm cursor-pointer`}>
          <Tooltip title="Danh sách phát">
            <TbPlaylist size={20} />
          </Tooltip>
        </div>
      </div>
    </>
  )
}

export default PlayMusic