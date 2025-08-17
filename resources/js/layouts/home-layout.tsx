import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import React from 'react';
import { type ReactNode } from 'react';

interface HomeLayoutProps {
    children: ReactNode;
}

export default ({ children }: HomeLayoutProps) => (
    <React.Fragment>
        <Navbar />
        <div className="flex min-h-screen flex-col items-start bg-[#FDFDFC] text-[#1b1b18] lg:justify-center dark:bg-[#0a0a0a]">
            <div className="flex w-full items-start justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                <main className="flex w-full max-w-[600px] flex-col-reverse lg:max-w-4xl lg:flex-row">
                    {children}
                </main>
            </div>
        </div>
        <Footer />
    </React.Fragment>
);
