import { useAppSelector } from "@/redux/hook";
import { useTheme } from "@/utils/ThemeProvider";

const ListPlayMusic = () => {
    const { darkMode } = useTheme();
    const { playlist, currentSong } = useAppSelector(state => state.song);

    return (
        <div className="flex flex-col p-5 pb-0 pe-1 w-full h-full">
			{/* Tabs giả lập */}
            <div className="flex gap-2 mb-4">
                <button 
                className={`px-3 py-1 rounded-full text-sm font-medium 
                  ${darkMode ? 'bg-[#232323] text-white' : 'bg-[#ececec] text-black'} border border-transparent focus:outline-none`}>
                    Danh sách phát
                </button>
                <button 
                	className={`px-3 py-1 rounded-full text-sm font-medium 
                	${darkMode ? 'bg-transparent text-gray-400' : 'bg-transparent text-gray-500'} border border-transparent focus:outline-none`}
				>
                	Nghe gần đây
                </button>
            </div>

            {/* Bài hát đang phát */}
            <div 
			className={`flex items-center gap-3 p-3 rounded-lg mb-2 
			${darkMode ? 'bg-[#7c1fa0]' : 'bg-[#a020f0]'} ${darkMode ? 'text-white' : 'text-white'} font-semibold`}>
                <img
                    src={currentSong.thumbnail_url || '/default-song.png'}
                    alt={currentSong.title}
                    className="w-10 h-10 rounded object-cover"
                />
                <div className="flex flex-col">
                    <span className="text-base font-bold leading-5">{currentSong.title}</span>
                    <span className="text-xs opacity-80">{currentSong.artist?.artist_name || ''}</span>
                </div>
            </div>

            {/* Tiếp theo */}
            <div className="text-xs font-semibold mb-2 mt-3 opacity-70 ">Tiếp theo</div>
            <div className="flex flex-col gap-1 overflow-y-auto">
                {playlist.length === 0 && (
                    <div className="text-sm opacity-60">Không có bài hát tiếp theo</div>
                )}
                {playlist.map((song, idx) => (
                    <div
                        key={song.song_id}
                        className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all
                        ${darkMode ? 'hover:bg-[#232323]' : 'hover:bg-[#ececec]'}`}
                    >
                        <img
                            src={song.thumbnail_url || '/default-song.png'}
                            alt={song.title}
                            className="w-9 h-9 rounded object-cover"
                        />
                        <div className="flex flex-col flex-1">
                            <span className="text-sm font-medium truncate">{song.title}</span>
                            <span className="text-xs opacity-80 truncate">{song.artist?.artist_name || ''}</span>
                        </div>
                    </div>
                ))}
            </div>
		</div>
    );
};

export default ListPlayMusic;