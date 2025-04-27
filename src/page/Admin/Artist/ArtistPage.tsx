import { callDeleteArtist, callGetArtists } from "@/apis/artist.api";
import TableCommon from "@/components/common/TableCommon";
import TitleCommon from "@/components/common/TitleCommon";
import ArtistModal from "@/components/modals/ArtistModal";
import { IArtist } from "@/types/artist.type";
import { numberWithCommas, replaceSlug } from "@/utils/constant";
import { App, Avatar, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const ArtistPage = () => {
  let timeoutId: ReturnType<typeof setTimeout>;

  const [isLoading, setIsLoading] = useState(false);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItem, setTotalItem] = useState(0);
  const [data, setData] = useState<IArtist[]>([]);
  const [selectedData, setSelectedData] = useState<IArtist | null>(null);
  const [sortQuery, setSortQuery] = useState("-created_at");
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { message, notification } = App.useApp();

  useEffect(() => {
    getArtist()
}, [current, pageSize, sortQuery, searchText]);

const getArtist = async () => {
    setIsLoading(true);
    let query = `current=${current}&pageSize=${pageSize}&sort=${sortQuery}`;
    if (searchText) {
        query += `&search=${replaceSlug(searchText)}`;
    }
    const res = await callGetArtists(query);
    if (res.data) {
        setData(res.data.result);
        setTotalItem(res.data.meta.totalItems);
    }
    setIsLoading(false);
}

  const columns: ColumnsType<IArtist> = [
    {
        align: "center",
        key: "index",
        render: (_, _1, index) => {
            return (current - 1)*pageSize + index + 1;
        }
    },
    {
        key: 'avatar',
        title: 'Avatar',
        dataIndex: 'avatar',
        align: "center",
        render: (avatar: string) => (
            <Avatar src={avatar ?? "/images/avatar-user.webp"} size={40} alt="avatar" />
        ),
    },
    {
        key: "artist_name",
        title: "Artist name",
        dataIndex: "artist_name",
        align: "center",
        render: (artist_name: string) => {
            return <>
            <span>{artist_name ?? "--"}</span>
            </>
        }
    },
    {
        key: "follows",
        title: "Follows",
        dataIndex: "follows",
        align: "center",
        render: (follows: IArtist["follows"]) => {
            return <>
            <Tag color={follows.length > 0 ? "green" : ""}>
                {numberWithCommas(follows.length)}
            </Tag>
            </>
        }
    },
    {
        key: "albums",
        title: "Albums",
        dataIndex: "albums",
        align: "center",
       render: (albums: IArtist["albums"]) => {
            return <>
            <Tag color={albums.length > 0 ? "green" : ""}>
                {numberWithCommas(albums.length)}
            </Tag>
            </>
        }
    },
    {
        key: "songs",
        title: "Songs",
        dataIndex: "songs",
        align: "center",
       render: (songs: IArtist["songs"]) => {
            return <>
             <Tag color={songs.length > 0 ? "green" : ""}>
                {numberWithCommas(songs.length)}
            </Tag>
            </>
        }
    },
    {
        key: "videos",
        title: "Videos",
        dataIndex: "videos",
        align: "center",
       render: (videos: IArtist["videos"]) => {
            return <>
             <Tag color={videos.length > 0 ? "green" : ""}>
                {numberWithCommas(videos.length)}
            </Tag>
            </>
        }
    },
    {
        key: 'created_at',
        title: 'Created At',
        dataIndex: 'created_at',
        align: "center",
        sorter: true,
        render: (created_at: Date) => dayjs(created_at).format("DD/MM/YYYY"),
    },
    ];

    const handleDelete = async (record: IArtist) => {
        setIsLoading(true);
        const res = await callDeleteArtist(record.artist_id);
        if (res.data) {
            message.success(res.data);
            getArtist();
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
        title="Artist Management"
        handleSearch={handleSearch}
        onRenew={() => {
            getArtist();
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
                rowKey='artist_id'
            />

        <ArtistModal
            isOpen={isModalOpen}
            onClose={() => {
                setIsModalOpen(false);
                setSelectedData(null);
            }}
            artist={selectedData}
            loadData={getArtist}
        />
    </>
  )
}

export default ArtistPage