"use client"

import "./globals.css";
import 'antd/dist/reset.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import '@ant-design/v5-patch-for-react-19';
import { Geist, Geist_Mono } from "next/font/google";
import { useState, useEffect } from "react";
import { ConfigProvider, theme as antdTheme } from 'antd';
import { colors } from "@/constants";
import { App } from 'antd';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [dark, setDark] = useState<boolean | null>(null);
  // const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setDark(savedTheme === 'dark');
  }, []);

  const theme = {
    algorithm: dark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
    token: {
      colorPrimary: colors.primary,
      colorFillSecondary: colors.secondary,
      colorText: colors.black,
    },
    components: {
      Button: {
        colorBgContainer: '#fff',
        colorBorder: colors.secondary,
        colorPrimaryHover: colors.secondary,
        colorText: colors.secondary,
        colorPrimaryActive: colors.secondary
      },
    }
  };

  return (
    <html lang="th">
      <head>
        <title>${process.env.NEXT_PUBLIC_NAME}</title>
        <meta name="description" content={`${process.env.NEXT_PUBLIC_NAME} - ${process.env.NEXT_PUBLIC_VERSION}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="gappo3" />
        <meta name="keywords" content="tickets, app, management, system" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ConfigProvider theme={theme}>
          <App>
            <AntdRegistry>
              {children}
            </AntdRegistry>
          </App>
        </ConfigProvider>
      </body>
    </html>
  );
}