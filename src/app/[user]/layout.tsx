import React from 'react';

import styles from './layout.module.css';

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={styles.container}>
            <div className={styles.content}>{children}</div>
        </div>
    );
}
