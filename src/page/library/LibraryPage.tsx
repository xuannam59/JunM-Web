import PlaylistLibrary from "@/components/library/PlaylistLibrary"
import TabLibrary from "@/components/library/tabs"
import { Button } from "antd"
import { TbPlayerPlayFilled } from "react-icons/tb"

const LibraryPage = () => {
  return (
    <>
    <div className="w-full h-full mb-[80px]">
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
                <h1 className="text-4xl font-bold">Thư viện</h1>
                <Button
                    type="text"
                    size="large"
                    shape="circle"
                    className={`!bg-white !shadow-lg hover:opacity-80`}
                >
                    <TbPlayerPlayFilled size={30} className={`text-black`}/>
                </Button>
            </div>

            <div className="mt-12 flex flex-col gap-4">
                <PlaylistLibrary />

                <TabLibrary />
            </div>
        </div>
    </div>
    </>
  )
}

export default LibraryPage