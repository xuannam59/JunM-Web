import Header from '@/components/home/Header';
import PlayMusic from '@/components/home/PlayMusic';
import SiderBar from '@/components/home/SiderBar';
import { useTheme } from '@/utils/ThemeProvider';
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
    const { darkMode } = useTheme();


    return (
        <>
            <div className={`min-h-screen w-full max-w-[2560px] flex ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
                <aside className={`w-[240px] min-h-[100vh] shadow-sm fixed left-0 top-0 bottom-0
          ${darkMode ? `bg-[#292929] text-gray-300` : 'bg-[#F9F9F9] text-black'}`}
                >
                    <SiderBar />
                </aside>

                <header className={`px-[60px] h-[70px] fixed top-0 right-0 left-[240px] z-999 flex items-center backdrop-blur-md shadow-md
          ${darkMode ? 'bg-[#1E1E1E]/80 ' : 'bg-white/80'}`}>
                    <Header />
                </header>

                <main className={`w-full ml-[240px] mt-[70px] min-h-[calc(100vh-70px)] overflow-y-auto p-[60px]
          ${darkMode ? 'bg-[#1E1E1E]' : 'bg-white'}`}
                >
                    <Outlet />
                </main>

                <div className={`w-full h-[90px] px-[24px] flex justify-between items-center fixed bottom-0 left-0 right-0 z-50
          ${darkMode ? 'bg-[#181818] border-t border-[#282828]' : 'bg-white border-t border-[#e0e0e0]'}`}>
                    <PlayMusic />
                </div>
            </div>
        </>
    )
}

export default HomeLayout
