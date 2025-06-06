import { IPlayList } from "@/types/playlist.type";
import { TbEdit, TbPlayerPlayFilled } from "react-icons/tb";
import ButtonPrimary from "../common/ButtonPrimary";

interface PlaylistHeaderProps {
    playlist: IPlayList;
    onPlayRandom: () => void;
}

const PlaylistHeader = ({ playlist, onPlayRandom }: PlaylistHeaderProps) => {
    return (
        <div className="w-[300px] flex flex-col gap-2 sticky top-[0] h-fit">
            <div className="w-full group/playlist overflow-hidden rounded-lg cursor-pointer">
                <div className="relative bg-gray-800">
                    <img 
                        src={playlist.playlistSongs[0]?.song.thumbnail_url || "/images/default-thumbnail.webp"} 
                        alt="playlist" 
                        className="w-full h-full object-cover group-hover/playlist:scale-105 transition-all duration-500" 
                    />
                    <div 
                        className={`absolute inset-0 flex items-center justify-around bg-black/30 opacity-0 transition
                        group-hover/playlist:opacity-100`}
                    >
                        <div className='border-2 border-white rounded-full p-1.5'>
                            <TbPlayerPlayFilled
                                size={20} 
                                className='text-white'
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                            />                           
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="flex gap-2 justify-center items-center">
                    <div className="font-bold text-lg">
                        {playlist.title}
                    </div>
                    <TbEdit size={22} className="cursor-pointer hover:opacity-80"/>
                </div>
        
                <div className="flex gap-2 justify-center items-center">
                    <span className=" text-gray-500 text-xs">Tạo bởi</span>
                    <span className="text-xs">
                        {playlist.user.full_name}
                    </span>
                </div>
                <div className="flex gap-2 justify-center items-center">
                    <span className=" text-gray-500 text-xs">
                        {playlist.is_public ? "Công khai" : "Riêng tư"}
                    </span>
                </div>
            </div>
            <div className="flex justify-center items-center mt-2">
                <ButtonPrimary
                    title="PHÁT NGẪU NHIÊN"
                    className="!rounded-full w-[200px]"
                    icon={<TbPlayerPlayFilled size={20}/>}
                    onClick={onPlayRandom}
                />
            </div>
        </div>
    );
};

export default PlaylistHeader; 