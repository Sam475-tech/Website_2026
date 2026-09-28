'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const MOSAIC_COLORS = [
    'bg-[#ff3300]', // Brand Red
    'bg-[#e62e00]', // Darker red
    'bg-[#ff5522]', // Orange red
    'bg-[#cc2900]', // Deep red
    'bg-[#990033]', // Crimson/Purple
    'bg-[#660066]', // Purple
    'bg-[#4d004d]', // Dark Purple
    'bg-[#ff8844]', // Orange
    'bg-[#330033]', // Very dark purple
];

export default function MosaicReveal() {
    const columns = 16;
    const rows = 10;
    const totalTiles = columns * rows;

    const [tiles, setTiles] = useState<Array<{ color: string, visible: boolean }>>([]);
    const [revealedCount, setRevealedCount] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initialTiles = Array.from({ length: totalTiles }).map(() => ({
            color: MOSAIC_COLORS[Math.floor(Math.random() * MOSAIC_COLORS.length)],
            visible: true
        }));
        setTiles(initialTiles);
        setRevealedCount(0);
    }, [totalTiles]);

    const scratchAtCoordinates = (clientX: number, clientY: number) => {
        if (!containerRef.current || tiles.length === 0) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        // Ensure pointer is inside the container bounds
        if (x < 0 || x > rect.width || y < 0 || y > rect.height) return;

        const col = Math.floor((x / rect.width) * columns);
        const row = Math.floor((y / rect.height) * rows);

        // Brush radius (clears a 3x3 block around finger for effortless mobile swiping)
        const brushRadius = 1; 
        const indicesToClear: number[] = [];

        for (let r = row - brushRadius; r <= row + brushRadius; r++) {
            for (let c = col - brushRadius; c <= col + brushRadius; c++) {
                if (r >= 0 && r < rows && c >= 0 && c < columns) {
                    indicesToClear.push(r * columns + c);
                }
            }
        }

        setTiles(prevTiles => {
            let newlyRevealed = 0;
            const newTiles = [...prevTiles];
            indicesToClear.forEach(idx => {
                if (newTiles[idx] && newTiles[idx].visible) {
                    newTiles[idx] = { ...newTiles[idx], visible: false };
                    newlyRevealed++;
                }
            });

            if (newlyRevealed > 0) {
                setRevealedCount(prev => Math.min(totalTiles, prev + newlyRevealed));
            }
            return newTiles;
        });
    };

    const handlePointerDown = (e: React.PointerEvent) => {
        setIsDragging(true);
        scratchAtCoordinates(e.clientX, e.clientY);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!isDragging) return;
        scratchAtCoordinates(e.clientX, e.clientY);
    };

    const handlePointerUp = () => {
        setIsDragging(false);
    };

    const handleReset = () => {
        const resetTiles = tiles.map(t => ({ ...t, visible: true }));
        setTiles(resetTiles);
        setRevealedCount(0);
    };

    const revealPercentage = totalTiles > 0 ? Math.round((revealedCount / totalTiles) * 100) : 0;

    return (
        <div className="w-full flex flex-col items-end">
            <div 
                ref={containerRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
                className="relative w-full aspect-[747/567] bg-black overflow-hidden border-2 border-neutral-800 touch-none select-none cursor-pointer"
            >
                {/* The Base Image */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <Image
                        src="/pathway_mosaic.svg"
                        alt="Pathway mosaic graphic"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* The Interactive Grid Overlay */}
                <div
                    className="absolute inset-0 z-10 grid pointer-events-none"
                    style={{
                        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`
                    }}
                >
                    {tiles.map((tile, i) => (
                        <div
                            key={i}
                            className={`w-full h-full transition-opacity duration-300 ${tile.color} ${tile.visible ? 'opacity-100' : 'opacity-0'} border border-black/20`}
                        />
                    ))}
                </div>
            </div>

            {/* Footer Info */}
            <div className="w-full flex justify-between items-center mt-2 font-pixel text-xs tracking-widest uppercase text-gray-500">
                <div className="flex gap-4">
                    <span>Keep Wandering →</span>
                    <button onClick={handleReset} className="hover:text-white border-b border-dashed border-gray-600 pb-0.5">
                        Reset Mosaic
                    </button>
                </div>
                <span className={revealPercentage === 100 ? 'text-brand font-bold' : ''}>
                    {revealPercentage}% Revealed
                </span>
            </div>
        </div>
    );
}
