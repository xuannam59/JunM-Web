import { useTheme } from "@/utils/ThemeProvider"

const ListPlayMusic = () => {
    const { darkMode } = useTheme()
    return (
        <>
            <div className={`min-h-[100vh] max-h-[100vh] w-[340px] flex flex-col p-5 pb-0 pe-1 rounded-l-xl shadow-sm overflow-y-auto
            ${darkMode ? 'bg-[#1F1F1F] text-gray-300' : 'bg-[#F9F9F9] text-black'} border-l-orange-50`}
    >

     </div>

    </>
  )
}

export default ListPlayMusic