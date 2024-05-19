import type { Metadata } from 'next';
import React from 'react';

import { AlertProvider } from '../lib/providers/AlertProviderContext';
import { aileronFonts } from '../lib/theme/font';
import './globals.css';

export const metadata: Metadata = {
    title: 'Syonet',
    description: 'Syonet Desafio'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="pt-br"
            className={aileronFonts.className}
        >
            <body>
                <AlertProvider>{children}</AlertProvider>
            </body>
        </html>
    );
}
