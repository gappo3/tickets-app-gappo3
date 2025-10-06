/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Layout, Typography, Menu, MenuProps, Dropdown, Avatar, Space } from "antd";
import { DownOutlined, HomeOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { colors } from "@/constants";

const { Header } = Layout;
const { Text } = Typography;

type MenuItem = Required<MenuProps>['items'][number];

interface AppHeaderProps {
    dark: boolean | null;
    setDark: (val: boolean) => void;
    user: any;
    setUser: (val: any) => void;
}

export default function AppHeader({ dark, user }: AppHeaderProps) {
    const pathname = usePathname();

    const getItem = (
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
        type?: 'group'
    ): MenuItem => {
        return {
            key,
            icon,
            children,
            label,
            type
        } as MenuItem;
    };

    const menuItems: MenuProps['items'] = [
        getItem(
            <Link href="/tickets">Tickets</Link>,
            '/tickets',
            <HomeOutlined />
        ),
    ];

    const getSelectedKey = () => {
        if (pathname.includes('/tickets')) return ['/tickets'];
        return ['/'];
    };

    const userMenuItems: MenuProps['items'] = [
        {
            key: 'login',
            icon: <LogoutOutlined />,
            label: 'เข้าสู่ระบบ',
            // onClick: () => router.push('/login'),
        },
    ];

    return (
        <Header style={{
            display: 'flex',
            padding: '0 24px',
            background: dark ? '#1f1f1f' : '#fff',
            borderBottom: `1px solid ${dark ? '#434343' : '#f0f0f0'}`,
            boxShadow: dark ?
                '0 2px 8px rgba(0, 0, 0, 0.3)' :
                '0 2px 8px rgba(0, 0, 0, 0.06)',
            transition: 'all 0.3s ease',
            alignItems: 'center',
            height: '64px'
        }}>
            {/* Logo */}
            <Link href="/">
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginRight: '12px',
                    minWidth: '90px'
                }}>
                    <Text style={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: dark ? '#fff' : '#000',
                        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        transition: 'color 0.3s ease'
                    }}>
                        {process.env.NEXT_PUBLIC_HEADER_TITLE}
                    </Text>
                </div>
            </Link>

            {/* Navigation Menu */}
            <Menu
                mode="horizontal"
                selectedKeys={getSelectedKey()}
                items={menuItems}
                style={{
                    flex: 1,
                    background: dark ? '#1f1f1f' : '#fff',
                    border: 'none',
                    transition: 'all 0.3s ease'
                }}
                theme={dark ? 'dark' : 'light'}
            />

            {/* Right Side Controls */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                minWidth: '300px',
                justifyContent: 'flex-end'
            }}>
                {/* User Profile Dropdown */}
                <Dropdown
                    menu={{ items: userMenuItems }}
                    trigger={['click']}
                    placement="bottomRight"
                >
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 12px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                    }}>
                        <Avatar
                            size="small"
                            icon={<UserOutlined />}
                            style={{
                                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                                border: 'none'
                            }}
                        />
                        <Space size={4}>
                            <Text style={{
                                color: dark ? '#fff' : '#000',
                                fontSize: '14px',
                                fontWeight: '500'
                            }}>
                                {user ? user.username : <span style={{ color: dark ? '#aaa' : '#666' }}>Guest</span>}
                            </Text>
                            <DownOutlined style={{
                                fontSize: '10px',
                                color: dark ? '#aaa' : '#666'
                            }} />
                        </Space>
                    </div>
                </Dropdown>
            </div>
        </Header>
    );
}