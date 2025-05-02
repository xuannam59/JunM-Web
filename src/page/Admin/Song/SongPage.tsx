import { callDeleteSong, callGetSongs } from "@/apis/song.api";
import TableCommon from "@/components/common/TableCommon";
import TitleCommon from "@/components/common/TitleCommon";
import SongModal from "@/components/modals/SongModal";
import { ISong, ISongFilter } from "@/types/song.type";
import { numberWithCommas, replaceSlug } from "@/utils/constant";
import { App, Avatar, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import SongFilter from "@/components/filters/SongFilter";
import { callGetArtists } from "@/apis/artist.api";
import { BaseOptionType } from "antd/es/select";

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_SORT = "-created_at";
const DEFAULT_FILTER: ISongFilter = {
  artist_id: "",
  genre: ""
};
let timeoutId: ReturnType<typeof setTimeout>;


const SongPage = () => {
  const { message, notification } = App.useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [totalItem, setTotalItem] = useState(0);
  const [data, setData] = useState<ISong[]>([]);
  const [selectedData, setSelectedData] = useState<ISong | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortQuery, setSortQuery] = useState<string>(DEFAULT_SORT);
  const [searchText, setSearchText] = useState<string>();
  const [filters, setFilters] = useState<ISongFilter>(DEFAULT_FILTER);
  const [artistsSelect, setArtistsSelect] = useState<BaseOptionType[]>([]);

  const getSongs = useCallback(async () => {
    setIsLoading(true);
    try {
      const queryParams = new URLSearchParams({
        current: current.toString(),
        pageSize: pageSize.toString(),
        sort: sortQuery
      });

      if (searchText) {
        queryParams.append('search', replaceSlug(searchText));
      }

      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          queryParams.append(key, value);
        }
      });

      const res = await callGetSongs(queryParams.toString());
      if (res.data) {
        setData(res.data.result);
        setTotalItem(res.data.meta.totalItems);
      }
    } catch (error) {
      notification.error({
        message: "Error fetching songs",
        description: "Failed to load songs data"
      });
    } finally {
      setIsLoading(false);
    }
  }, [current, pageSize, sortQuery, searchText, filters, notification]);

  const getArtists = useCallback(async () => {
    try {
      const res = await callGetArtists("current=1&pageSize=1000");
      if (res.data) {
        const options = res.data.result.map(item => ({
          label: item.artist_name,
          value: item.artist_id
        }));
        setArtistsSelect(options);
      }
    } catch (error) {
      notification.error({
        message: "Error fetching artists",
        description: "Failed to load artists data"
      });
    }
  }, [notification]);

  useEffect(() => {
    getSongs();
  }, [getSongs]);

  useEffect(() => {
    getArtists();
  }, [getArtists]);

  const handleDelete = async (record: ISong) => {
    setIsLoading(true);
    try {
      const res = await callDeleteSong(record.song_id);
      if (res.data) {
        message.success(res.data);
        getSongs();
      }
    } catch (error) {
      notification.error({
        message: "Delete error",
        description: "Failed to delete song"
      });
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleReset = () => {
    setSortQuery(DEFAULT_SORT);
    setSearchText(undefined);
    setFilters(DEFAULT_FILTER);
    setCurrent(1);
  };

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
      title: `Artist (${data.length})`,
      dataIndex: 'artist',
      align: "center",
      width: 150,
      render: (artist: ISong['artist']) => {
        if (typeof artist === 'string') return artist;
        return artist.artist_name;
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
      key: 'listens',
      title: 'Listens',
      dataIndex: 'listens',
      align: "center",
      width: 100,
      sorter: true,
      render: (listens: number) => (
        <Tag color={listens > 0 ? "green" : "default"}>
          {numberWithCommas(listens)}
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

  return (
    <>
      <TitleCommon
        title="Song Management"
        handleSearch={handleSearch}
        onRenew={handleReset}
        onAdd={() => setIsModalOpen(true)}
        onFilter={() => setIsFilterOpen(true)}
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
        artistsSelect={artistsSelect}
      />

      <SongFilter
        isFilterOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={(values) => {
          setFilters(values);
          setIsFilterOpen(false);
        }}
        artistsSelect={artistsSelect}
      />
    </>
  );
};

export default SongPage;