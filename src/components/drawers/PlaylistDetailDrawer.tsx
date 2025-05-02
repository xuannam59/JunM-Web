import { Drawer, Typography, List, Tag, Image } from 'antd';
import { IPlayList } from '@/types/playlist.type';
import dayjs from 'dayjs';
import { numberWithCommas } from '@/utils/constant';

interface PlaylistDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  playlist: IPlayList | null;
}

const PlaylistDetailDrawer = ({ isOpen, onClose, playlist }: PlaylistDetailDrawerProps) => {
  if (!playlist) return null;
const songs = playlist.playlistSongs.map(ps => ps.song);
  return (
    <Drawer
      title="Playlist Details"
      placement="right"
      onClose={onClose}
      open={isOpen}
      width={500}
    >
      <div className="flex flex-col gap-4">
        {/* Playlist Info */}
        <div className="flex items-center gap-3 mb-4">
            <Typography.Title level={4} className="m-0">{playlist.title}</Typography.Title>
        </div>

        {/* Playlist Stats */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-gray-50 p-3 rounded">
            <Typography.Text type="secondary">Total Songs</Typography.Text>
            <Typography.Title level={5} className="m-0">
              {numberWithCommas(playlist.playlistSongs.length)}
            </Typography.Title>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <Typography.Text type="secondary">Created At</Typography.Text>
            <Typography.Title level={5} className="m-0">
              {dayjs(playlist.created_at).format('DD/MM/YYYY')}
            </Typography.Title>
          </div>
        </div>

        {/* Songs List */}
        <div>
          <Typography.Title level={5}>Songs List</Typography.Title>
          <div className="h-[55vh] overflow-y-auto">
          <List
            dataSource={songs}
            renderItem={(song, index) => (
              <List.Item>
                <div className="flex items-center gap-3 w-full">
                  <Typography.Text type="secondary" className="w-8">
                    {index + 1}
                  </Typography.Text>
                  <div className="flex-1">
                    <div className="flex gap-2 items-center">
                    <Image src={song.thumbnail_url} width={50} preview={false}/>
                  <div className="flex flex-col">
                    <Typography.Text strong>{song.title}</Typography.Text>
                    <div className="flex items-center gap-2">
                      <Typography.Text type="secondary" className="text-sm">
                        {song.artist.artist_name}
                      </Typography.Text>
                      <Tag color="blue">{song.genre}</Tag>
                    </div>
                  </div>
                    </div>
                  </div>
                </div>
              </List.Item>
            )}
          />
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default PlaylistDetailDrawer; 