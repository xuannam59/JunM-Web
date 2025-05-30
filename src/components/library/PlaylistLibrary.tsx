import { Button, Tooltip } from "antd"
import { TbPlus, TbX, TbPlayerPlayFilled, TbDots } from "react-icons/tb"

import { useTheme } from "@/utils/ThemeProvider";
import { IPlayList } from "@/types/playlist.type";
import { useCallback, useEffect, useState } from "react";
import { callGetPlaylists } from "@/apis/playlist.api";
import { useAppSelector } from "@/redux/hook";



const PlaylistLibrary: React.FC = () => {
    const {darkMode} = useTheme();

    const auth = useAppSelector(state => state.auth);
    const {user} = auth;

    const [playlists, setPlaylists] = useState<IPlayList[]>([]);

    const getPlaylist = useCallback(async () => {
        const res = await callGetPlaylists(`page=1&limit=10&user_id=${user.user_id}`);
        if(res.data) {
            setPlaylists(res.data.result);
        }
    }, [user.user_id]);

    useEffect(() => {
        getPlaylist()
    }, [getPlaylist]);

    console.log(playlists);
  return (
   <>
    <div className="flex items-center gap-1">
        <div className="flex items-center gap-2">
            <h1 className="text-xl">PLAYLIST</h1>
            <Tooltip title="Tạo playlist mới" placement="top">
                <Button
                    type="text"
                    size="small"
                    shape="circle"
                    className={`${darkMode ? "!bg-[hsla(0,0%,100%,0.1)]" : "!bg-[rgba(0,0,0,0.05)]"} hover:opacity-80`}
                >
                    <TbPlus size={20} className={darkMode ? "text-white" : "text-black"}/>
                </Button>
            </Tooltip>
        </div>
    </div>
    <div className="flex items-center flex-row gap-2 mt-4">
        <div className="flex flex-col gap-1 w-[20%]">
            <div className="w-full group/playlist overflow-hidden rounded-sm cursor-pointer">
                <div className="relative bg-gray-800">
                    <img 
                        src="/images/hear-a-lot.jpg" 
                        alt="playlist" 
                        className="w-full h-full object-cover group-hover/playlist:scale-105 transition-all duration-500" 
                    />
                    <div className="absolute inset-0 flex items-center justify-around
                        bg-black/30 opacity-0 group-hover/playlist:opacity-100 transition"
                    >
                        <div className='hover:bg-[rgba(255,255,255,0.3)] rounded-full p-1.5'>
                            <Tooltip title="Xóa">
                                <TbX size={20} className='text-white'/>
                            </Tooltip>
                        </div>
                        <div className='border-2 border-white rounded-full p-1.5'>
                            <TbPlayerPlayFilled size={20} className='text-white'/>
                        </div>
                        <div className='hover:bg-[rgba(255,255,255,0.3)] rounded-full p-1.5'>
                            <Tooltip title="Khác">
                                <TbDots size={20} className='text-white'/>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <h1 className="text-md hover:text-cyan-200 transition-all duration-500 cursor-pointer">4U - On Repeat</h1>
                <p className="text-sm text-gray-500">JunM Mp3</p>
            </div>
        </div>
    </div>
    
   </>
  )
}

export default PlaylistLibrary