import TableCommon from "@/components/common/TableCommon";
import TitleCommon from "@/components/common/TitleCommon";
import { IPlayList } from "@/types/playlist.type";
import { numberWithCommas, replaceSlug } from "@/utils/constant";
import { App, Avatar, Switch, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import PlayListModal from "@/components/modals/PlayListModal";
import { callDeletePlaylist, callGetPlaylists } from "@/apis/playlist.api";
import PlaylistDetailDrawer from "@/components/drawers/PlaylistDetailDrawer";
import { DEFAULT_PAGE_SIZE, DEFAULT_SORT } from "@/utils/default";

let timeoutId: ReturnType<typeof setTimeout>;

const PlayListPage = () => {
  const { message, notification } = App.useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [totalItem, setTotalItem] = useState(0);
  const [data, setData] = useState<IPlayList[]>([]);
  const [selectedData, setSelectedData] = useState<IPlayList | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [sortQuery, setSortQuery] = useState<string>(DEFAULT_SORT);
  const [searchText, setSearchText] = useState<string>();


  const getPlaylists = useCallback(async () => {
    setIsLoading(true);
    try {
      const queryParams = new URLSearchParams({
        current: current.toString(),
        pageSize: pageSize.toString(),
        sort: sortQuery,
        is_public: "true"
      });

      if (searchText) {
        queryParams.append('search', replaceSlug(searchText));
      }

      const res = await callGetPlaylists(queryParams.toString());
      if (res.data) {
        setData(res.data.result);
        setTotalItem(res.data.meta.totalItems);
      }
    } catch (error) {
      notification.error({
        message: "Error fetching playlists",
        description: "Failed to load playlists data"
      });
    } finally {
      setIsLoading(false);
    }
  }, [current, pageSize, sortQuery, searchText, notification]);

  useEffect(() => {
    getPlaylists();
  }, [getPlaylists]);

  const handleDelete = async (record: IPlayList) => {
    setIsLoading(true);
    try {
      const res = await callDeletePlaylist(record.playlist_id);
      if (res.data) {
        message.success(res.data);
        getPlaylists();
      }
    } catch (error) {
      notification.error({
        message: "Delete error",
        description: "Failed to delete playlist"
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
    setCurrent(1);
  };

  const columns: ColumnsType<IPlayList> = [
    {
      align: "center",
      key: "index",
      width: 60,
      render: (_, _1, index) => {
        return (current - 1) * pageSize + index + 1;
      }
    },
    {
      key: 'title',
      title: 'Title',
      dataIndex: 'title',
      align: "left",
      width: 200,
      render: (title: string, record: IPlayList) => (
        <span 
          className="font-medium cursor-pointer hover:text-blue-500 truncate"
          onClick={() => {
            setSelectedData(record);
            setIsDrawerOpen(true);
          }}
        >
          {title}
        </span>
      ),
    },
    {
      key: 'user',
      title: 'Created By',
      dataIndex: 'user',
      align: "center",
      width: 150,
      render: (user: IPlayList['user']) => (
        <div className="flex items-center justify-center gap-2">
          <Avatar src={user.avatar} size={24} />
          <span>{user.username}</span>
        </div>
      )
    },
    {
      key: 'is_public',
      title: 'Public',
      dataIndex: 'is_public',
      align: "center",
      width: 100,
      render: (is_public: boolean) => (
        <Switch checked={is_public} disabled />
      )
    },
    {
      key: 'playlistSongs',
      title: 'Songs',
      dataIndex: 'playlistSongs',
      align: "center",
      width: 100,
      render: (playlistSongs: IPlayList['playlistSongs']) => (
        <Tag color="blue">
          {numberWithCommas(playlistSongs.length)}
        </Tag>
      )
    },
    {
      key: 'created_at',
      title: 'Created At',
      dataIndex: 'created_at',
      align: "center",
      width: 120,
      sorter: true,
      render: (date: Date) => dayjs(date).format("DD/MM/YYYY"),
    }
  ];

  return (
    <>
      <TitleCommon
        title="Playlist Management"
        handleSearch={handleSearch}
        onRenew={handleReset}
        onAdd={() => setIsModalOpen(true)}
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
        rowKey='playlist_id'
      />

      <PlayListModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedData(null);
        }}
        playlist={selectedData}
        loadData={getPlaylists}
      />

      <PlaylistDetailDrawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedData(null);
        }}
        playlist={selectedData}
      />
    </>
  );
};

export default PlayListPage;