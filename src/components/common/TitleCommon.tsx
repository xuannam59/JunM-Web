import { useTheme } from '@/utils/ThemeProvider';
import { Button, Input, Tooltip } from 'antd';
import { TbFilter, TbPlus, TbReload, TbSearch } from 'react-icons/tb';

interface IProps {
    title: string;
    handleSearch: (value: string) => void;
    onRenew: () => void;
    onAdd?: (value: boolean) => void;
    onFilter?: (value: boolean) => void;
}

const TitleCommon = (props: IProps) => {
    const { title, handleSearch, onRenew, onAdd, onFilter } = props;
    const { darkMode } = useTheme();

    return (
        <div className="flex justify-between items-center mb-6">
            <h1 className={`text-2xl font-semibold ${darkMode ? 'text-white' : ''}`}>{title}</h1>
            <div className="flex gap-2">
                <Input
                    placeholder="Search..."
                    allowClear
                    suffix={<TbSearch size={20} className="text-gray-400" />}
                    onChange={(e) => handleSearch(e.target.value)}
                    className={`w-80 ${darkMode ? '!bg-[#353535] !border-gray-600 !text-white' : ''}`}
                />
                {onFilter && (
                    <Tooltip title="Filter">
                        <Button
                            className={`!p-2 ${darkMode ? '!bg-[#353535]' : ''}`}
                            onClick={() => onFilter(true)}
                        >
                            <TbFilter size={20} />
                        </Button>
                    </Tooltip>
                )}
                <Tooltip title="Renew">
                    <Button
                        className={`!p-2 ${darkMode ? '!bg-[#353535]' : ''}`}
                        onClick={onRenew}
                    >
                        <TbReload size={20} />
                    </Button>
                </Tooltip>
                {onAdd && (
                    <Tooltip title="Add">
                        <Button
                            type="primary"
                            className="!p-2 !bg-gradient-to-r from-purple-500 to-pink-500 !border-none opacity-80 hover:opacity-100"
                            onClick={() => onAdd(true)}
                        >
                            <TbPlus size={20} /> Add
                        </Button>
                    </Tooltip>
                )}
            </div>
        </div>
    );
};

export default TitleCommon;
