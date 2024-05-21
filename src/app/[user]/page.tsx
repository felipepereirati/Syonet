'use client';

import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

export default function Painel() {
    const { push } = useRouter();
    const pathname = usePathname();

    return <div></div>;
}
