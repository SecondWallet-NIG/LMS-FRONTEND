"use client"
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const metadata = {
  title: 'Second Wallet',
  description: 'Second Wallet',
};

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </Provider>
  );
}

