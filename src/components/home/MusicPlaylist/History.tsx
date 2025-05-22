import { callGetListenHistory } from "@/apis/user.api";
import SongCommon from "@/components/common/SongCommon";
import { ISong } from "@/types/song.type";
import { IListeningHistory } from "@/types/user.type";
import { useCallback, useEffect, useState, useRef } from "react";
import { Empty, Spin } from "antd";

const History = () => {
    const [listenHistory, setListenHistory] = useState<IListeningHistory[]>([]);
    const [pageSize, setPageSize] = useState(11);
    const [isLoading, setIsLoading] = useState(false);
    const [totalItems, setTotalItems] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    
    const getListenHistory = useCallback(async () => {
        setIsLoading(true);
        const res = await callGetListenHistory(`pageSize=${pageSize}`);
        if(res.data) {
           setListenHistory(res.data.result);
           setTotalItems(res.data.meta.totalItems);
        }
        setIsLoading(false);
    }, [pageSize]);

    useEffect(() => {
        getListenHistory();
    }, [getListenHistory]);
    
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = container;
            if (scrollHeight - scrollTop - clientHeight < 100 && 
                !isLoading && 
                listenHistory.length < totalItems) {
                setPageSize(prev => {
                    if(prev + 5 >= totalItems) {
                        return totalItems;
                    }
                    return prev + 5;
                });
            }
        };

        container.addEventListener("scroll", handleScroll);
        return () => {
            container.removeEventListener("scroll", handleScroll);
        };
    }, [isLoading, listenHistory, totalItems]); 

    const handleSongInHistory = (song: ISong) => {
       console.log(song);
    }

    return (
        <div ref={containerRef} className="h-full overflow-y-auto scrollbar-hide">
            <div className="flex flex-col gap-1">
                {listenHistory.length > 0 ? (
                    <>
                        {listenHistory.map((item) => ( item.song &&
                            <SongCommon 
                                key={item.song_id} 
                                songData={item.song} 
                                handlePlaySong={(value) => handleSongInHistory(value)}
                            />
                        ))}
                        {isLoading && (
                            <div className="flex justify-center items-center py-4">
                                <Spin />
                            </div>
                        )}
                        {!isLoading && listenHistory.length >= totalItems && totalItems > 0 && (
                            <div className="text-center text-sm text-gray-500 py-4">
                                Đã hiển thị tất cả bài hát
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex justify-center items-center h-full">
                        <Empty description="Không có lịch sử nghe nhạc" />
                    </div>
                )}
            </div>
        </div>
    );
}

export default History;