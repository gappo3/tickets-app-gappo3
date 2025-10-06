/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Button, Select, App, Card, Typography, Tag, Skeleton, Popconfirm } from 'antd';
import { useRouter } from 'next/navigation';
import usePublicAxios from '@/hooks/usePublicAxiosInstance';
import { DeleteOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

const priorityTag = (priority: string) => {
    const colorMap: Record<string, string> = {
        HIGH: 'red',
        MEDIUM: 'orange',
        LOW: 'green',
    };
    return <Tag color={colorMap[priority]}>{priority}</Tag>;
};

const CardTicket: React.FC<{ ticketId?: number }> = ({ ticketId = 0 }) => {
    const api = usePublicAxios();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [ticketData, setTicketData] = useState<any>(null);
    const [selectedStatus, setSelectedStatus] = useState<string>('');
    const { message } = App.useApp();

    useEffect(() => {
        console.log(`Fetching details for ticket ID: ${ticketId}`);
        const fetchTicketDetails = async () => {
            try {
                const res = await api.get(`/tickets/${ticketId}`);
                setTicketData(res.data);
                setSelectedStatus(res.data.status);
                setDataLoaded(true);
            } catch (error) {
                console.error('Error fetching ticket details:', error);
            }
        };

        if (ticketId) {
            fetchTicketDetails();
        }
    }, [ticketId, api]);

    const handleSelectChange = (value: string) => {
        setSelectedStatus(value);
    }

    const handleUpdate = async () => {
        setLoading(true);
        try {
            await api.put(`/tickets/${ticketId}`, selectedStatus ? { status: selectedStatus as 'OPEN' | 'IN_PROGRESS' | 'CLOSED' } : {});
            message.success('Ticket updated successfully!');

            setTimeout(() => {
                router.push('/tickets')
                setLoading(false);
            }, 1000);
        } catch (error) {
            console.error('Error creating ticket:', error);
            message.error('Failed to create ticket. Please try again.');
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        setLoading(true);
        try {
            await api.delete(`/tickets/${ticketId}`);
            message.success('Ticket deleted successfully!');
            router.push('/tickets');
        } catch (error) {
            console.error('Error deleting ticket:', error);
            message.error('Failed to delete ticket. Please try again.');
            setLoading(false);
        }
    }

    if (!dataLoaded) {
        return (
            <App>
                <Card>
                    <Skeleton active />
                </Card>
            </App>
        );
    }

    return (
        <App>
            <Card title={`Tickets ${ticketId ? `#${ticketId}` : 'Create'}`} variant="borderless"
                extra={
                    <Popconfirm
                        title="Delete"
                        description="Are you sure to delete this item?"
                        onConfirm={handleDelete}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger style={{ marginLeft: 8 }}>
                            <DeleteOutlined />
                        </Button>
                    </Popconfirm>
                }>
                <Title level={4} style={{ marginBottom: 8 }}>
                    {ticketData?.title}
                </Title>

                <Text style={{ display: 'block', marginBottom: 16 }}>
                    {ticketData?.description}
                </Text>

                <p>
                    <Text strong style={{ marginRight: 8 }}>Priority:</Text>
                    {priorityTag(ticketData?.priority || '')}
                </p>

                <div style={{ marginBottom: 16 }}>
                    <Text strong style={{ marginRight: 8 }}>Status:</Text>
                    <Select
                        defaultValue={ticketData?.status || ''}
                        style={{ width: 120 }}
                        onChange={handleSelectChange}
                        options={[
                            { value: 'OPEN', label: 'OPEN' },
                            { value: 'IN_PROGRESS', label: 'IN_PROGRESS' },
                            { value: 'RESOLVED', label: 'RESOLVED' }
                        ]}
                    />
                </div>


                <Button style={{ marginLeft: 8 }} type="primary" onClick={() => handleUpdate()} loading={loading}>
                    Update
                </Button>

                <Button style={{ marginLeft: 8 }} onClick={() => router.push('/tickets')}>
                    Cancel
                </Button>
            </Card>
        </App>
    );
};

export default CardTicket;