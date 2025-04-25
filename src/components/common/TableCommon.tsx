import { useTheme } from '@/utils/ThemeProvider';
import { Button, Dropdown, MenuProps, Table, TableProps } from 'antd'
import { ColumnsType } from 'antd/es/table';
import { SorterResult } from 'antd/es/table/interface';
import { TbDots, TbEdit, TbTrash } from 'react-icons/tb';

interface IProps {
  isLoading: boolean;
  columns: ColumnsType<any>;
  data: any[];
  currentState: {
    current: number;
    setCurrent: (value: any) => void
  };
  pageSizeState: {
    pageSize: number;
    setPageSize: (value: any) => void
  };
  totalItem: number;
  sortQueryState: {
    sortQuery: string;
    setSortQuery: (value: any) => void
  }
  setSelectedUser: (value: any) => void;
  setIsModalOpen:  (value: any) => void;
  handleDelete: (value: string) => void;
  rowKey?: string;
}

const TableCommon = (props: IProps) => {
  const {darkMode} = useTheme();
  const {isLoading, columns,data,  currentState, pageSizeState, 
    totalItem, sortQueryState, rowKey,
    setSelectedUser, setIsModalOpen, handleDelete} = props;

  const onChangePagination: TableProps<any>['onChange'] = (pagination, filters, sorter) => {
    if (pagination.current && pagination.current !== currentState.current) {
        currentState.setCurrent(pagination.current);
    }
    if (pagination.pageSize && pagination.pageSize !== pageSizeState.pageSize) {
        pageSizeState.setPageSize(pagination.pageSize);
        currentState.setCurrent(1);
    }

    const sorterResult = sorter as SorterResult<any> | SorterResult<any>[];
    let newSortQuery = '-created_at';

    if (!Array.isArray(sorterResult)) {
        const { field, order } = sorterResult;
        if (order && field) {
            newSortQuery = order === 'ascend' ? `${field}` : `-${field}`;
        }
    }

    if (newSortQuery !== sortQueryState.sortQuery) {
      sortQueryState.setSortQuery(newSortQuery);
        currentState.setCurrent(1);
    }
  }

  const getDropdownItems = (record: any): MenuProps['items'] => [
    {
        key: "edit",
        label: <div className='flex gap-2 text-amber-400'><TbEdit size={20} /> <span>Edit</span></div>,
        onClick: () => {
            setSelectedUser(record);
            setIsModalOpen(true);
        }
    },
    {
        key: "delete",
        label: "Delete",
        icon: <TbTrash size={20} />,
        danger: true,
        onClick: () => handleDelete(record.user_id)
    }
]

  const actionColumn = {
    key: 'action',
    render: (record: any) => (
        <Dropdown
            menu={{
                items: getDropdownItems(record),
                style: { backgroundColor: darkMode ? "#333333" : "#ffffff" }
            }}
        >
            <Button type="text" icon={<TbDots size={20} />} />
        </Dropdown>
    ),
  }

  return (
    <>
      <Table
                loading={isLoading}
                columns={[...columns, actionColumn]}
                dataSource={data}
                pagination={{
                    current: currentState.current,
                    total: totalItem,
                    pageSize: pageSizeState.pageSize,
                    showSizeChanger: true,
                }}
                onChange={onChangePagination}
                rowClassName={() => darkMode ? 'bg-[#353535] text-white hover:bg-[#2A2A2A]' : 'hover:bg-gray-50'}
                scroll={{
                    x: "max-content",
                    y: 57 * 10
                }}
                rowKey={rowKey}
            />
    </>
  )
}

export default TableCommon