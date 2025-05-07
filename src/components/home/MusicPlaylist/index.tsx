import { useTheme } from "@/utils/ThemeProvider";
import { useState } from "react";
import Playlist from "./Playlist";
import History from "./History";
const MusicPlaylist = () => {
    const { darkMode } = useTheme();
	const [tab, setTab] = useState<string>("playlist");

	
    const renderTab = () => {
        if (tab === "playlist") {
            return <Playlist/>
        }
        return <History/>
    }
    return (
        <div className="flex flex-col px-5 pb-0 pe-1 w-full h-full overflow-y-auto relative">
			{/* Tabs giả lập */}
            <div className={`flex gap-2 p-5 sticky top-0 z-10 ${darkMode ? 'bg-[#1E1E1E]' : 'bg-white'}`}>
                <button 
                	className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer border border-transparent focus:outline-none
						${tab === "playlist" ? 'bg-[#0E9EEF] text-white' : 'bg-transparent text-gray-400'}`}
					onClick={() => setTab("playlist")}
				>
                    Danh sách phát
                </button>
                <button 
                	className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer border border-transparent focus:outline-none
						${tab === "history" ? 'bg-[#EE10B0] text-white' : 'bg-transparent text-gray-400'}`}
					onClick={() => setTab("history")}
				>
                	Nghe gần đây
                </button>
            </div>

			{renderTab()}
		</div>
    );
};

export default MusicPlaylist;