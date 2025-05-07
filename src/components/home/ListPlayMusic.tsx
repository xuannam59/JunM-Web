import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useTheme } from "@/utils/ThemeProvider";
import SongCommon from "../common/SongCommon";
import { ISong } from "@/types/song.type";
import { doPlaySong, doSetHistory, doSetPlaylist } from "@/redux/reducers/song.reducer";

const ListPlayMusic = () => {
    const { darkMode } = useTheme();

	const dispatch = useAppDispatch();
    const { playlist, currentSong, history } = useAppSelector(state => state.song);


	const handleSongInHistory = (song: ISong) => {
		const newHistory = history.filter(vl => vl.song_id !== song.song_id);
		const newPlaylist = [currentSong, ...playlist]
		dispatch(doSetHistory(newHistory));
		dispatch(doSetPlaylist(newPlaylist));
		dispatch(doPlaySong(song));
		window.localStorage.setItem("playlist", JSON.stringify(newPlaylist));
		window.localStorage.setItem("history", JSON.stringify(newHistory));
	}

	const handleSongInPlaylist = (song: ISong) => {
		const newPlaylist = playlist.filter(vl => vl.song_id !== song.song_id);
		const newHistory = [...history, currentSong];
		dispatch(doSetHistory(newHistory));
		dispatch(doSetPlaylist(newPlaylist));
		dispatch(doPlaySong(song));
		window.localStorage.setItem("history", JSON.stringify(newHistory));
		window.localStorage.setItem("playlist", JSON.stringify(newPlaylist));
	}
    return (
        <div className="flex flex-col px-5 pb-0 pe-1 w-full h-full overflow-y-auto relative">
			{/* Tabs giả lập */}
            <div className={`flex gap-2 p-5 sticky top-0 z-10 ${darkMode ? 'bg-[#1E1E1E]' : 'bg-white'}`}>
                <button 
                	className={`px-3 py-1 rounded-full text-sm font-medium 
                  		${darkMode ? 'bg-[#232323] text-white' : 'bg-[#ececec] text-black'} border border-transparent focus:outline-none`}
				>
                    Danh sách phát
                </button>
                <button 
                	className={`px-3 py-1 rounded-full text-sm font-medium 
                	${darkMode ? 'bg-transparent text-gray-400' : 'bg-transparent text-gray-500'} border border-transparent focus:outline-none`}
				>
                	Nghe gần đây
                </button>
            </div>

			{history.length > 0 &&
				<div className="flex flex-col gap-1 opacity-60">
				{history.map((song) => (
						<SongCommon 
							key={song.song_id} 
							songData={song} 
							handlePlaySong={(value) => handleSongInHistory(value)}
						/>
					))}
				</div>
			}

			<div className="sticky top-[70px] z-10">
				<SongCommon 
					songData={currentSong}
					handlePlaySong={(value: ISong) => console.log(value)}
				/>
				<div
					className={`text-xs py-2.5 px-2 ${darkMode ? 'bg-[#1E1E1E]' : 'bg-white'}`}
				>
					Tiếp theo
				</div>
			</div>
            <div className="flex flex-col gap-1">
                {playlist.length === 0 && (
                    <div className="text-sm opacity-60">Không có bài hát tiếp theo</div>
                )}
               {playlist.map((song) => (
					<SongCommon 
						key={song.song_id} 
						songData={song} 
						handlePlaySong={(value) => handleSongInPlaylist(value)}
					/>
				))}
            </div>
		</div>
    );
};

export default ListPlayMusic;