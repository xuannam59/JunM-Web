import { TbArrowsShuffle, TbUserPlus } from "react-icons/tb";
import ButtonPrimary from "../common/ButtonPrimary";
import { IArtist } from "@/types/artist.type";
import { useCallback } from "react";
import { callGetSongs } from "@/apis/song.api";
import { doPlaySong, doSetHistory, doSetPlaylist } from "@/redux/reducers/song.reducer";
import { shuffleArray } from "@/utils/song.constant";
import { useAppDispatch } from "@/redux/hook";

interface ArtistSectionProps {
    artists: Pick<IArtist, "artist_id" | "artist_name" | "avatar">[];
}

const ArtistSection:React.FC<ArtistSectionProps> = ({artists}) => {
    const dispatch = useAppDispatch();

    const handlePlayArtist = useCallback(async (artistId: string) => {
        const res = await callGetSongs(`artist_id=${artistId}&pageSize=20`);
        if(res.data) {
            const shuffled = shuffleArray(res.data.result);
            const currentSong = shuffled[0];
            const playlist = shuffled.filter(vl => vl.song_id !== currentSong.song_id);
            
            dispatch(doPlaySong(currentSong));
            dispatch(doSetPlaylist(playlist));
            dispatch(doSetHistory([]));

            window.localStorage.setItem("junm_playlist", JSON.stringify(playlist));
        }
    }, [dispatch]);
    return (
    <div className="flex flex-col gap-6 mb-10">
        <div className="text-xl font-bold">
            Nghệ sĩ tham gia
        </div>
        <div className="flex flex-wrap gap-6">
            {artists.map(vl => (
                <div key={vl.artist_id} className="flex flex-col flex-1 items-center gap-4">
                    <div className="relative w-full group/artist cursor-pointer">
                        <div className="rounded-full overflow-hidden">
                            <img src={vl.avatar} alt={vl.artist_name} className="w-full object-cover group-hover/artist:scale-105 transition duration-500" />
                        </div>
                        <div className="absolute inset-0 rounded-full bg-black/20 flex items-center justify-center opacity-0 group-hover/artist:opacity-100 transition">
                            <div className="flex items-center justify-center border-2 border-white rounded-full p-1.5">
                                <TbArrowsShuffle 
                                    size={20} 
                                    className="text-white" 
                                    onClick={() => handlePlayArtist(vl.artist_id)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="text-md">
                        {vl.artist_name}
                    </div>
                    <ButtonPrimary
                        className="!rounded-full !w-fit"
                        title="Theo dõi"
                        icon={<TbUserPlus size={20}/>}
                        onClick={() => {
                           
                        }}
                    />
                </div>
            ))}
        </div>
    </div>
    );
};

export default ArtistSection; 