import React, { useState } from 'react';
import { Form, Input, Button, Select, App, Card } from 'antd';
import { useRouter } from 'next/navigation';
import usePublicAxios from '@/hooks/usePublicAxiosInstance';

const { Option } = Select;

interface TicketFormValues {
    title: string;
    description: string;
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
}

const FormTicket: React.FC = () => {
    const api = usePublicAxios();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { message } = App.useApp();
    const [form] = Form.useForm<TicketFormValues>();


    const onFinish = async (values: TicketFormValues) => {
        setLoading(true);
        try {
            await api.post('/tickets', values);
            message.success('Ticket created successfully!');

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

    return (
        <App>
            <Card title="Tickets Create" variant="borderless">
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    style={{ maxWidth: 600, margin: '0 auto' }}
                >
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[
                            { required: true, message: 'Please enter the ticket title!' },
                            { min: 5, message: 'Title must be at least 5 characters!' },
                        ]}
                    >
                        <Input placeholder="Enter ticket title" />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[
                            { required: true, message: 'Please enter the ticket description!' },
                            { max: 5000, message: 'Description must be 5000 characters or less!' },
                        ]}
                    >
                        <Input.TextArea rows={4} placeholder="Enter ticket description" />
                    </Form.Item>

                    <Form.Item
                        label="Priority"
                        name="priority"
                        rules={[{ required: true, message: 'Please select the ticket priority!' }]}
                    >
                        <Select placeholder="Select priority">
                            <Option value="HIGH">High</Option>
                            <Option value="MEDIUM">Medium</Option>
                            <Option value="LOW">Low</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Create Ticket
                        </Button>
                        <Button style={{ marginLeft: 8 }} onClick={() => router.push('/tickets')}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </App>
    );
};

export default FormTicket;