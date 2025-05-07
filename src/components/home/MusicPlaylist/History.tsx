import { callGetListenHistory } from "@/apis/user.api";
import SongCommon from "@/components/common/SongCommon";
import { ISong } from "@/types/song.type";
import { IListeningHistory } from "@/types/user.type";
import { useCallback, useEffect, useState } from "react";
import { Empty } from "antd";
const History = () => {
    const [listenHistory, setListenHistory] = useState<IListeningHistory[]>([]);
    
    const getListenHistory = useCallback(async () => {
        const res = await callGetListenHistory("pageSize=10");
        if(res.data) {
           setListenHistory(res.data);
        }
    }, []);

    useEffect(() => {
        getListenHistory();
    }, [getListenHistory]);
    

    const handleSongInHistory = (song: ISong) => {
       console.log(song);
    }
  return (
    <div className="flex flex-col gap-1">
        {listenHistory.length > 0 ? 
        listenHistory.map((item) => ( item.song &&
        <SongCommon 
            key={item.song_id} 
            songData={item.song} 
            handlePlaySong={(value) => handleSongInHistory(value)}
        />
        ))
        : 
        <div className="flex justify-center items-center h-full">
            <Empty description="Không có lịch sử nghe nhạc" />
        </div>
    }
    </div>
  )
}

export default History