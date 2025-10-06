"use client"

import '@ant-design/v5-patch-for-react-19';
import { useState, useEffect } from "react";
import { Layout, Typography, Space } from 'antd';
import AppHeader from "@/components/AppHeader";
import dayjs from "dayjs";

const { Content, Footer } = Layout;
const { Text } = Typography;

type User = {
    id: string;
    name: string;
    email: string;
} | null;

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [dark, setDark] = useState<boolean | null>(null);
    const [user, setUser] = useState<User>(null);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        setDark(savedTheme === 'dark');
    }, []);

    return (
        <Layout style={{
            minHeight: '100vh',
            background: dark ? '#0f1419' : '#f5f5f5',
            transition: 'background 0.3s ease'
        }}>
            <AppHeader dark={dark} setDark={setDark} user={user} setUser={setUser} />

            <Content >
                {children}
            </Content>
            <Footer style={{
                textAlign: 'center',
                color: dark ? '#aaa' : '#666',
                background: dark ? '#0f1419' : '#f5f5f5',
                borderTop: `1px solid ${dark ? '#434343' : '#f0f0f0'}`,
                transition: 'all 0.3s ease',
                padding: '16px 50px'
            }}>
                <Space split={<span style={{ color: dark ? '#434343' : '#d9d9d9' }}>|</span>}>
                    <Text style={{
                        color: dark ? '#aaa' : '#666',
                        fontSize: '12px',
                        transition: 'color 0.3s ease'
                    }}>
                        © {dayjs().year()} {process.env.NEXT_PUBLIC_NAME}
                    </Text>
                    <Text style={{
                        color: dark ? '#aaa' : '#666',
                        fontSize: '12px',
                        transition: 'color 0.3s ease'
                    }}>
                        All rights reserved
                    </Text>
                    <Text style={{
                        color: dark ? '#aaa' : '#666',
                        fontSize: '12px',
                        transition: 'color 0.3s ease'
                    }}>
                        v{process.env.NEXT_PUBLIC_VERSION || '1.0.0'}
                    </Text>
                </Space>
            </Footer>
        </Layout>
    );
}