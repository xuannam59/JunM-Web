import SongCommon from "@/components/common/SongCommon"
import { useAppSelector } from "@/redux/hook";
import { useAppDispatch } from "@/redux/hook";
import { doSetHistory } from "@/redux/reducers/song.reducer";
import { doSetPlaylist } from "@/redux/reducers/song.reducer";
import { doPlaySong } from "@/redux/reducers/song.reducer";
import { ISong } from "@/types/song.type"
import { useTheme } from "@/utils/ThemeProvider";



const Playlist: React.FC = () => {
    const { darkMode } = useTheme();

    const dispatch = useAppDispatch();
    const { playlist, currentSong, history } = useAppSelector(state => state.song);

    const handleSongInHistory = (song: ISong) => {
		const newHistory = history.filter(vl => vl.song_id !== song.song_id);
		const newPlaylist = [currentSong, ...playlist]
		dispatch(doSetHistory(newHistory));
		dispatch(doSetPlaylist(newPlaylist));
		dispatch(doPlaySong(song));
	}

	const handleSongInPlaylist = (song: ISong) => {
		const newPlaylist = playlist.filter(vl => vl.song_id !== song.song_id);
		const newHistory = [...history, currentSong];
		dispatch(doSetHistory(newHistory));
		dispatch(doSetPlaylist(newPlaylist));
		dispatch(doPlaySong(song));
	}


  return (<>
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

    </>)
}

export default Playlist