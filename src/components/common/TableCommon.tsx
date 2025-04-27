import { useTheme } from '@/utils/ThemeProvider';
import { Button, Dropdown, MenuProps, Table, TableProps, Modal, App } from 'antd'
import { ColumnsType } from 'antd/es/table';
import { SorterResult } from 'antd/es/table/interface';
import { TbDots, TbEdit, TbTrash } from 'react-icons/tb';
import { ExclamationCircleFilled } from '@ant-design/icons';

interface IProps {
  isLoading: boolean;
  columns: ColumnsType<any>;
  data: any[];
  currentState: {
    current: number;
    setCurrent: (value: number) => void
  };
  pageSizeState: {
    pageSize: number;
    setPageSize: (value: number) => void
  };
  totalItem: number;
  sortQueryState: {
    sortQuery: string;
    setSortQuery: (value: string) => void
  }
  setSelectedData: (value: any) => void;
  setIsModalOpen:  (value: boolean) => void;
  handleDelete: (value: any) => void;
  rowKey?: string;
}


const TableCommon = (props: IProps) => {
  const {darkMode} = useTheme();
  const {isLoading, columns,data,  currentState, pageSizeState, 
    totalItem, sortQueryState, rowKey,
    setSelectedData, setIsModalOpen, handleDelete} = props;
const {modal} = App.useApp();
  

  const showDeleteConfirm = (record: any) => {
    modal.confirm({
      title: 'Are you sure you want to delete this item?',
      icon: <ExclamationCircleFilled />,
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        handleDelete(record);
      },
    });
  };

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
            setSelectedData(record);
            setIsModalOpen(true);
        }
    },
    {
        key: "delete",
        label: "Delete",
        icon: <TbTrash size={20} />,
        danger: true,
        onClick: () => showDeleteConfirm(record)
    }
]

  const actionColumn: ColumnsType<any> = [{
    key: 'action',
    align: "center",
    fixed: "right",
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
  }]

  return (
    <>
    <div className='mx-2'>
      <Table
                loading={isLoading}
                columns={[...columns, ...actionColumn]}
                dataSource={data}
                pagination={{
                    current: currentState.current,
                    total: totalItem,
                    pageSize: pageSizeState.pageSize,
                    showSizeChanger: true,
                }}
                onChange={onChangePagination}
                rowClassName={darkMode ? 'bg-[#353535] text-white hover:bg-[#2A2A2A]' : 'hover:bg-gray-50'}
                scroll={{
                    x: "max-content",
                }}
                rowKey={rowKey}
            />
    </div>

    </>
  )
}

export default TableCommon