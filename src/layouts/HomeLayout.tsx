import Header from '@/components/home/Header';
import SiderBar from '@/components/home/SiderBar';
import { useTheme } from '@/utils/ThemeProvider';
import { Outlet } from 'react-router-dom';
import PlayMusic from '@/components/home/PlayMusic';
import { useAppSelector } from '@/redux/hook'
import MusicPlaylist from '@/components/home/MusicPlaylist';

const HomeLayout = () => {
    const { darkMode } = useTheme();
    const isCollapsed = useAppSelector(state => state.song.isCollapsed);

    return (
        <>
            <div className={`min-h-screen max-w-[2560px] relative flex ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
                <aside className={`w-[240px] min-h-[100vh] shadow-sm fixed left-0 top-0 bottom-0
                    ${darkMode ? `bg-[#292929] text-gray-300` : 'bg-[#F9F9F9] text-black'}`}
                >
                    <SiderBar />
                </aside>
                
                <header 
                    className={`px-[60px] h-[70px] fixed top-0 right-0 left-[240px] z-999 flex items-center backdrop-blur-md shadow-md transition-all
                        ${isCollapsed ? "w-[calc(100vw-240px-330px)]" : "w-[calc(100vw-240px)]"} 
                        ${darkMode ? 'bg-[#1E1E1E]/80 ' : 'bg-white/80'}`}
                >
                    <Header />
                </header>

                {/* Flex container for main and MusicPlaylist */}
                <div
                    className={`flex transition-all duration-200 w-[calc(100vw-240px)] ml-[240px] h-[calc(100vh-90px)]`}
                >
                    {/* Main content */}
                    <main className={`flex-1 min-w-0 p-[60px] overflow-y-auto mt-[70px] ${darkMode ? 'bg-[#1E1E1E]' : 'bg-white'}`}>
                        <div className="h-full">
                            <Outlet />
                        </div>
                    </main>
                    {/* MusicPlaylist */}
                    <div
                        className={`transition-all duration-200 h-full border-l-1 overflow-hidden
                            ${darkMode ? 'bg-[#1E1E1E] border-[#353535]' : 'bg-white border-[#E5E5E5]'}
                            ${isCollapsed ? "w-[330px]" : "w-0"}`}
                        style={{ minWidth: isCollapsed ? 330 : 0, maxWidth: isCollapsed ? 330 : 0 }}
                    >
                        <MusicPlaylist />
                    </div>
                </div>

                <div 
                    className={`w-full h-[90px] px-[24px] flex justify-between items-center fixed bottom-0 left-0 right-0 z-50
                    ${darkMode ? 'bg-[#181818] border-t border-[#282828]' : 'bg-white border-t border-[#e0e0e0]'}`}
                >
                    <PlayMusic />
                </div>
            </div>
        </>
    )
}

export default HomeLayout