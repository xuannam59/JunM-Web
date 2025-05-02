import { callGetVideos, callDeleteVideo } from "@/apis/video.api";
import TableCommon from "@/components/common/TableCommon";
import TitleCommon from "@/components/common/TitleCommon";
import VideoModal from "@/components/modals/VideoModal";
import { IVideo } from "@/types/video.type";
import {replaceSlug } from "@/utils/constant";
import { App, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const VideoPage = () => {
  let timeoutId: ReturnType<typeof setTimeout>;

  const [isLoading, setIsLoading] = useState(false);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItem, setTotalItem] = useState(0);
  const [data, setData] = useState<IVideo[]>([]);
  const [selectedData, setSelectedData] = useState<IVideo | null>(null);
  const [sortQuery, setSortQuery] = useState("-release_date");
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { message, notification } = App.useApp();

  useEffect(() => {
    getVideos()
  }, [current, pageSize, sortQuery, searchText]);

  const getVideos = async () => {
    setIsLoading(true);
    let query = `current=${current}&pageSize=${pageSize}&sort=${sortQuery}`;
    if (searchText) {
      query += `&search=${replaceSlug(searchText)}`;
    }
    const res = await callGetVideos(query);
    if (res.data) {
      setData(res.data.result);
      setTotalItem(res.data.meta.totalItems);
    }
    setIsLoading(false);
  }

  const columns: ColumnsType<IVideo> = [
    {
      align: "center",
      key: "index",
      width: 60,
      render: (_, _1, index) => {
        return (current - 1)*pageSize + index + 1;
      }
    },
    {
      key: 'title',
      title: 'Title',
      dataIndex: 'title',
      align: "left",
      width: 200,
      render: (title: string) => (
        <span className="font-medium">{title}</span>
      ),
    },
    {
      key: 'song',
      title: 'Song',
      dataIndex: 'song',
      align: "center",
      width: 150,
      render: (song: IVideo['song']) => {
        return song.title;
      }
    },
    {
      key: 'artist',
      title: 'Artist',
      dataIndex: 'artist',
      align: "center",
      width: 150,
      render: (artist: IVideo['artist']) => {
        return artist.artist_name;
      }
    },
    {
      key: 'video_url',
      title: 'Video Url',
      dataIndex: 'video_url',
      align: "center",
      width: 100,
      render: (video_url: string) => (
        <Tooltip title={"Link youtube"}>
          <a target="_blank" href={video_url} className="!underline">Video</a>
        </Tooltip>
      )
    },
    {
      key: 'release_date',
      title: 'Release Date',
      dataIndex: 'release_date',
      align: "center",
      width: 120,
      sorter: true,
      render: (date: Date) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      key: 'created_at',
      title: 'Created At',
      dataIndex: 'created_at',
      align: "center",
      width: 120,
      sorter: true,
      render: (date: Date) => dayjs(date).format("DD/MM/YYYY"),
    },
  ];

  const handleDelete = async (record: IVideo) => {
    setIsLoading(true);
    const res = await callDeleteVideo(record.video_id);
    if (res.data) {
      message.success(res.data);
      getVideos();
    } else {
      notification.error({
        message: "Delete error",
        description: res.message
      })
    }
    setIsLoading(false);
  }

  const handleSearch = (value: string) => {
    if(value.length > 3) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setSearchText(value);
        setCurrent(1);
      }, 1000);
    }else {
      setSearchText("");
      clearTimeout(timeoutId);
    }
  }

  return (
    <>
      <TitleCommon
        title="Video Management"
        handleSearch={handleSearch}
        onRenew={() => {
          getVideos();
        }}
        onAdd={setIsModalOpen}
      />

      <TableCommon
        isLoading={isLoading}
        columns={columns}
        data={data}
        currentState={{ current, setCurrent }}  
        pageSizeState={{ pageSize, setPageSize }} 
        totalItem={totalItem}
        sortQueryState={{ sortQuery, setSortQuery }}
        handleDelete={handleDelete}
        setIsModalOpen={setIsModalOpen}
        setSelectedData={setSelectedData}
        rowKey='video_id'
      />

      <VideoModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedData(null);
        }}
        video={selectedData}
        loadData={getVideos}
      />
    </>
  )
}

export default VideoPage