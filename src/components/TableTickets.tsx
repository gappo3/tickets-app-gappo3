/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import type { GetProp, TableProps } from 'antd';
import { App, Button, Card, Input, Table } from 'antd';
import type { SorterResult } from 'antd/es/table/interface';
import usePublicAxios from '@/hooks/usePublicAxiosInstance';
import { useRouter } from 'next/navigation';

type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

interface DataType {
    id: string;
    title: string;
    description: string;
    priority: string;
    status: string;
}

interface TableParams {
    pagination?: TablePaginationConfig;
    sortColumn?: SorterResult<any>['field'];
    sort?: SorterResult<any>['order'];
    filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}


const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        sorter: true,
        width: '10%',
    },
    {
        title: 'Priority',
        dataIndex: 'priority',
        sorter: true,
        filters: [
            { text: 'High', value: 'HIGH' },
            { text: 'Medium', value: 'MEDIUM' },
            { text: 'Low', value: 'LOW' },
        ],
        width: '10%',
    },
    {
        title: 'Title',
        dataIndex: 'title',
        width: '20%',
    },
    {
        title: 'Description',
        dataIndex: 'description',

        width: '40%',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        sorter: true,
        filters: [
            { text: 'OPEN', value: 'OPEN' },
            { text: 'IN PROGRESS', value: 'IN_PROGRESS' },
            { text: 'RESOLVED', value: 'RESOLVED' },
        ],
        width: '10%',
    },
];

const TableTickets: React.FC = () => {
    const api = usePublicAxios();
    const router = useRouter()

    const { message } = App.useApp();
    const { Search } = Input

    const [data, setData] = useState<DataType[]>();
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    const [searchText, setSearchText] = useState('')

    const handleCreate = () => {
        router.push('/tickets/create')
    }


    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTableParams({
            ...tableParams,
            pagination: { current: 1, pageSize: 10 },
        })
        setSearchText(e.target.value)
    }

    const handleTableChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter) => {
        const newTableParams = {
            pagination,
            filters,
            sort: Array.isArray(sorter) ? undefined : sorter.order,
            sortColumn: Array.isArray(sorter) ? undefined : sorter.field,
        };

        setTableParams(newTableParams);
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };

    const fetchTickets = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/tickets`, {
                params: {
                    search: searchText || '',
                    perPage: tableParams.pagination?.pageSize,
                    page: tableParams.pagination?.current ? tableParams.pagination.current - 1 : 0,
                    sortColumn: tableParams.sortColumn,
                    sort: tableParams.sort,
                    filters: tableParams.filters,
                },
            });

            const data = Array.isArray(res.data.rows) ? res.data.rows : [];
            setData(data);
            setTableParams(prev => ({
                ...prev,
                pagination: {
                    ...prev.pagination,
                    total: res.data.total,
                },
            }));
            message.success({
                content: 'successful!',
                duration: 2,
                style: {
                    marginTop: '90vh',
                },
            });
        } catch (error) {
            console.error('Error fetching data:', error);
            message.error({
                content: 'Failed to fetch tickets. Please try again later.',
                duration: 2,
                style: {
                    marginTop: '90vh',
                },
            });
        } finally {
            setLoading(false);
        }
    }

    // Initial fetch
    useEffect(() => {
        fetchTickets();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tableParams.pagination?.current, tableParams.pagination?.pageSize, tableParams.sort, tableParams.sortColumn, tableParams.filters, searchText]);

    return (
        <App>
            <Card title="Tickets List" variant="borderless">
                <Button
                    onClick={handleCreate}
                    type="primary"
                    style={{
                        marginBottom: 16,
                    }}
                >
                    Create Ticket
                </Button>

                <Search
                    placeholder="Search tickets"
                    onChange={handleSearchChange}
                    style={{ width: 200, marginBottom: 16, marginLeft: 16 }}
                />
                <Table
                    columns={columns}
                    rowKey={(record) => record.id}
                    dataSource={data}
                    pagination={tableParams.pagination}
                    loading={loading}
                    onChange={handleTableChange}
                    scroll={{ x: 'max-content' }}
                    onRow={(record) => ({
                        onClick: () => router.push(`/tickets/${record.id}`)
                    })}
                />
            </Card>
        </App >
    );
};

export default TableTickets;