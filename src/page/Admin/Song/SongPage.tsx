import { callDeleteSong, callGetSongs } from "@/apis/song.api";
import TableCommon from "@/components/common/TableCommon";
import TitleCommon from "@/components/common/TitleCommon";
import SongModal from "@/components/modals/SongModal";
import { ISong } from "@/types/song.type";
import { numberWithCommas, replaceSlug } from "@/utils/constant";
import { App, Avatar, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useEffect, useState } from "react";


const SongPage = () => {
  let timeoutId: ReturnType<typeof setTimeout>;

  const [isLoading, setIsLoading] = useState(false);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItem, setTotalItem] = useState(0);
  const [data, setData] = useState<ISong[]>([]);
  const [selectedData, setSelectedData] = useState<ISong | null>(null);
  const [sortQuery, setSortQuery] = useState("-release_date");
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { message, notification } = App.useApp();

  useEffect(() => {
    getSongs()
  }, [current, pageSize, sortQuery, searchText]);

  const getSongs = async () => {
    setIsLoading(true);
    let query = `current=${current}&pageSize=${pageSize}&sort=${sortQuery}`;
    if (searchText) {
      query += `&search=${replaceSlug(searchText)}`;
    }
    const res = await callGetSongs(query);
    if (res.data) {
      setData(res.data.result);
      setTotalItem(res.data.meta.totalItems);
    }
    setIsLoading(false);
  }

  const columns: ColumnsType<ISong> = [
    {
      align: "center",
      key: "index",
      width: 60,
      render: (_, _1, index) => {
        return (current - 1)*pageSize + index + 1;
      }
    },
    {
      key: 'thumbnail_url',
      title: 'Thumbnail',
      dataIndex: 'thumbnail_url',
      align: "center",
      width: 100,
      render: (thumbnail_url: string) => (
        <Avatar src={thumbnail_url} size={40} alt="thumbnail" />
      ),
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
      key: 'artist',
      title: 'Artist',
      dataIndex: 'artist',
      align: "center",
      width: 150,
      render: (artist: ISong['artist']) => {
        if (typeof artist === 'string') return artist;
        return artist.artist_name;
      }
    },
    {
      key: 'album',
      title: 'Album',
      dataIndex: 'album',
      align: "center",
      width: 150,
      render: (album: ISong['album']) => {
        if (!album) return '--';
        if (typeof album === 'string') return album;
        return album.title;
      }
    },
    {
      key: 'genre',
      title: 'Genre',
      dataIndex: 'genre',
      align: "center",
      width: 120,
      render: (genre: string) => (
        <Tag color="blue">{genre}</Tag>
      )
    },
    {
      key: 'durations',
      title: 'Duration',
      dataIndex: 'durations',
      align: "center",
      width: 100,
      render: (durations: number) => {
        const minutes = Math.floor(durations / 60);
        const seconds = durations % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
      }
    },
    {
      key: 'views',
      title: 'Views',
      dataIndex: 'views',
      align: "center",
      width: 100,
      sorter: true,
      render: (views: number) => (
        <Tag color={views > 0 ? "green" : "default"}>
          {numberWithCommas(views)}
        </Tag>
      )
    },
    {
      key: 'likes',
      title: 'Likes',
      dataIndex: 'likes',
      align: "center",
      width: 100,
      render: (likes: ISong['likes']) => (
        <Tag color={likes.length > 0 ? "red" : "default"}>
          {numberWithCommas(likes.length)}
        </Tag>
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

  const handleDelete = async (record: ISong) => {
    setIsLoading(true);
    const res = await callDeleteSong(record.song_id);
    if (res.data) {
      message.success(res.data);
      getSongs();
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
        title="Song Management"
        handleSearch={handleSearch}
        onRenew={() => {
          getSongs();
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
        rowKey='song_id'
      />

      <SongModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedData(null);
        }}
        song={selectedData}
        loadData={getSongs}
      />
    </>
  )
}

export default SongPage