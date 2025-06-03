import { Drawer, Typography, List, Tag, Image } from 'antd';
import { IPlayList } from '@/types/playlist.type';
import dayjs from 'dayjs';
import { numberWithCommas } from '@/utils/constant';
import { useTheme } from '@/utils/ThemeProvider';

interface PlaylistDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  playlist: IPlayList | null;
}

const PlaylistDetailDrawer = ({ isOpen, onClose, playlist }: PlaylistDetailDrawerProps) => {
  const {darkMode} = useTheme();
  
  if (!playlist) return null;
  const songs = playlist.playlistSongs.map(ps => ps.song);
  return (
    <Drawer
      title={
        <span className={darkMode ? 'text-white' : 'text-black'}>
          Playlist Details
        </span>
      }
      placement="right"
      onClose={onClose}
      open={isOpen}
      width={500}
      className={darkMode ? 'dark-drawer' : 'light-drawer'}
      styles={{
        body: {
          backgroundColor: darkMode ? '#1a1a1a' : '#ffffff',
          color: darkMode ? '#ffffff' : '#000000'
        },
        header: {
          backgroundColor: darkMode ? '#1a1a1a' : '#ffffff',
          borderBottom: `1px solid ${darkMode ? '#333333' : '#e5e7eb'}`
        }
      }}
    >
      <div className="flex flex-col gap-4">
        {/* Playlist Info */}
        <div className="flex items-center gap-3 mb-4">
            <Typography.Title 
              level={4} 
              className={`m-0 ${darkMode ? 'text-white' : 'text-black'}`}
            >
              {playlist.title}
            </Typography.Title>
        </div>

        {/* Playlist Stats */}
        <div className="grid grid-cols-2 gap-2">
          <div className={`p-3 rounded ${darkMode ? 'bg-[#2a2a2a]' : 'bg-gray-50'}`}>
            <Typography.Text 
              type="secondary" 
              className={darkMode ? 'text-gray-400' : 'text-gray-600'}
            >
              Tổng số bài hát
            </Typography.Text>
            <Typography.Title 
              level={5} 
              className={`m-0 ${darkMode ? 'text-white' : 'text-black'}`}
            >
              {numberWithCommas(playlist.playlistSongs.length)}
            </Typography.Title>
          </div>
          <div className={`p-3 rounded ${darkMode ? 'bg-[#2a2a2a]' : 'bg-gray-50'}`}>
            <Typography.Text 
              type="secondary"
              className={darkMode ? 'text-gray-400' : 'text-gray-600'}
            >
              Tạo lúc
            </Typography.Text>
            <Typography.Title 
              level={5} 
              className={`m-0 ${darkMode ? 'text-white' : 'text-black'}`}
            >
              {dayjs(playlist.created_at).format('DD/MM/YYYY')}
            </Typography.Title>
          </div>
        </div>

        {/* Songs List */}
        <div>
          <Typography.Title 
            level={5}
            className={darkMode ? 'text-white' : 'text-black'}
          >
            Danh sách bài hát
          </Typography.Title>
          <div className={`h-[55vh] overflow-y-auto rounded-md ${
            darkMode ? ' bg-[#1a1a1a]' : ' bg-white'
          }`}>
          <List
            dataSource={songs}
            renderItem={(song, index) => (
              <List.Item 
                className={`transition-colors cursor-pointer border-none ${
                  darkMode ? 'hover:bg-[#2a2a2a] border-[#333333]' : 'hover:bg-gray-50 border-gray-100'
                }`}
                style={{ 
                  borderBottom: `1px solid ${darkMode ? '#333333' : '#f0f0f0'}`,
                  backgroundColor: 'transparent'
                }}
              >
                <div className="flex items-center gap-3 w-full px-2">
                  <Typography.Text 
                    type="secondary" 
                    className={`w-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
                  >
                    {index + 1}
                  </Typography.Text>
                  <div className="flex-1">
                    <div className="flex gap-2 items-center">
                    <Image 
                      src={song.thumbnail_url} 
                      width={50} 
                      preview={false}
                      className="rounded-md"
                    />
                  <div className="flex flex-col">
                    <Typography.Text 
                      strong 
                      className={`${darkMode ? 'text-white' : 'text-black'} line-clamp-1`}
                    >
                      {song.title}
                    </Typography.Text>
                    <div className="flex items-center gap-2">
                      <Typography.Text 
                        type="secondary" 
                        className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} line-clamp-1`}
                      >
                        {song.artist.artist_name}
                      </Typography.Text>
                      <Tag 
                        color="blue"
                        className={darkMode ? 'bg-blue-900 text-blue-300 border-blue-700' : ''}
                      >
                        {song.genre}
                      </Tag>
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