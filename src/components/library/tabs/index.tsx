import { Tabs } from "antd"
import FavoriteSongs from "./FavoriteSongs"


const TabLibrary: React.FC = () => {
    const items = [
        {
            key: '1',
            label: 'Bài hát',
            children: <FavoriteSongs />
        },
        {
            key: '2',
            label: 'Album',
            children: <div>Album</div>
        },
        {
            key: '3',
            label: 'MV',
            children: <div>MV</div>
        }
    ]
  return (
    <>
         <Tabs items={items} />
    </>
  )
}

export default TabLibrary