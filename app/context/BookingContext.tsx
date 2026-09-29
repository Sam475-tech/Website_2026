'use client';

import React, { createContext, useContext, useState } from 'react';

interface BookingContextType {
    isOpen: boolean;
    selectedTier: string;
    openBooking: (tierName?: string) => void;
    closeBooking: () => void;
    setSelectedTier: (tierName: string) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTier, setSelectedTier] = useState('Morning Session');

    const openBooking = (tierName?: string) => {
        if (tierName) {
            const lower = tierName.toLowerCase();
            if (lower.includes('morning')) {
                setSelectedTier('Morning Session');
            } else if (lower.includes('evening')) {
                setSelectedTier('Evening Session');
            } else if (lower.includes('full')) {
                setSelectedTier('Full Day');
            } else {
                setSelectedTier(tierName);
            }
        }
        setIsOpen(true);
    };

    const closeBooking = () => {
        setIsOpen(false);
    };

    return (
        <BookingContext.Provider
            value={{
                isOpen,
                selectedTier,
                openBooking,
                closeBooking,
                setSelectedTier,
            }}
        >
            {children}
        </BookingContext.Provider>
    );
}

export function useBooking() {
    const context = useContext(BookingContext);
    if (!context) {
        throw new Error('useBooking must be used within a BookingProvider');
    }
    return context;
}
