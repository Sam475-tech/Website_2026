'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BookingDrawer from './BookingDrawer';
import { BookingProvider, useBooking } from '../context/BookingContext';

function LayoutContent({ children }: { children: React.ReactNode }) {
    const { openBooking } = useBooking();

    return (
        <div className="min-h-screen bg-black flex flex-col text-white font-sans overflow-x-hidden">

            {/* Cream Navbar */}
            <header className="bg-cream text-black py-2 px-3 md:py-4 md:px-12 flex justify-between items-center border-b-[4px] md:border-b-[8px] border-black sticky top-0 z-30">
                <Link href="/" className="flex items-center gap-2 md:gap-3">
                    <Image
                        src="/tedxlogo.svg"
                        alt="TEDx DYPAKURDI"
                        width={48}
                        height={39}
                        className="h-6 md:h-10 w-auto"
                        priority
                    />
                    <span className="font-bold text-sm md:text-2xl tracking-tighter flex flex-col md:block leading-none md:leading-normal">
                        <span className="text-brand">TEDx</span> <span>DYPAKURDI</span>
                    </span>
                </Link>

                <nav className="hidden md:flex gap-8 text-sm font-semibold tracking-widest uppercase">
                    <Link href="/#theme" className="hover:text-brand transition-colors">Theme</Link>
                    <Link href="/#speakers" className="hover:text-brand transition-colors">Speakers</Link>
                    <Link href="/#schedule" className="hover:text-brand transition-colors">Schedule</Link>
                    <Link href="/#tickets" className="hover:text-brand transition-colors">Tickets</Link>
                </nav>

                <button
                    type="button"
                    onClick={() => openBooking('Morning Session')}
                    className="bg-brand text-white font-bold uppercase tracking-wider text-[10px] md:text-sm px-3 py-2 md:px-6 md:py-3 border-2 border-black hover:bg-red-700 transition-all duration-300 ease-out shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] md:hover:translate-x-[4px] md:hover:translate-y-[4px] active:scale-95 cursor-pointer"
                >
                    Book Tickets
                </button>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col">
                {children}
            </main>

            {/* Slide-over Booking Checkout Drawer */}
            <BookingDrawer />
        </div>
    );
}

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <BookingProvider>
            <LayoutContent>{children}</LayoutContent>
        </BookingProvider>
    );
}
