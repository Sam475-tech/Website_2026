"use client";

import React, { useState } from 'react';

const SPEAKERS = [
    { name: 'Anuj Pachhel', role: 'YouTuber / Doctor', talk: 'Talk title to be announced', image: '/speakers/Anuj_Pachhel.svg' },
    { name: 'Apurva Nemlekar', role: 'Actress', talk: 'Talk title to be announced', image: '/speakers/Apurva_Nemlekar.svg' },
    { name: 'Dinakar Nagalla', role: 'Entrepreneur', talk: 'Talk title to be announced', image: '/speakers/Dinakar_Nagalla.svg' },
    { name: 'Dr. Ajit Kembhavi', role: 'Astrophysicist', talk: 'Talk title to be announced', image: '/speakers/Dr_Ajit_Kembhavi.svg' },
    { name: 'Speaker 5', role: 'Role / Field', talk: 'Talk title to be announced', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&h=800' },
    { name: 'Speaker 6', role: 'Role / Field', talk: 'Talk title to be announced', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&h=800' },
];

export default function SpeakersCarousel() {
    const [active, setActive] = useState(2);
    const last = SPEAKERS.length - 1;

    return (
        <section id="speakers" className="bg-cream text-black px-6 md:px-16 pt-16 pb-24 overflow-hidden">
            <div className="relative h-[420px] md:h-[460px] flex items-center justify-center" style={{ perspective: '1200px' }}>
                {SPEAKERS.map((speaker, i) => {
                    let offset = i - active;
                    if (offset < -2) offset += SPEAKERS.length;
                    if (offset > 3) offset -= SPEAKERS.length;
                    
                    const isCenter = offset === 0;
                    const abs = Math.abs(offset);
                    if (abs > 3) return null;

                    return (
                        <button
                            key={i}
                            type="button"
                            onClick={() => setActive(i)}
                            className="absolute top-1/2 left-1/2 w-[150px] md:w-[180px] text-left cursor-pointer"
                            style={{
                                transform: `translate(-50%, -50%) translateX(${offset * 155}px) rotateY(${offset * -18}deg) scale(${isCenter ? 1.18 : 0.92 - abs * 0.04})`,
                                zIndex: 20 - abs,
                                transformStyle: 'preserve-3d',
                                transition: 'all 1000ms cubic-bezier(0.22, 1, 0.36, 1)',
                            }}
                            aria-current={isCenter ? 'true' : undefined}
                            aria-label={`${speaker.name} ${i + 1}`}
                        >
                            <div className={`bg-white overflow-hidden ${isCenter ? 'border-[5px] border-brand shadow-[8px_12px_0_0_rgba(0,0,0,0.08)]' : 'border border-black/10'}`}>
                                <div className="relative h-[220px] md:h-[250px] bg-neutral-400 overflow-hidden">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={speaker.image}
                                        alt=""
                                        className="absolute inset-0 h-full w-full object-cover grayscale"
                                    />
                                </div>
                                <div className="px-3 py-3">
                                    <p className="font-bold text-sm leading-tight">{speaker.name}</p>
                                    <p className="text-[10px] tracking-widest uppercase text-neutral-500 mt-1">{speaker.role}</p>
                                    {isCenter && (
                                        <p className="text-[11px] text-brand mt-2 flex items-center gap-1">
                                            <span>↗</span> {speaker.talk}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>

            <div className="flex items-center justify-center gap-4 mt-6">
                <button
                    type="button"
                    onClick={() => setActive((i) => (i - 1 + SPEAKERS.length) % SPEAKERS.length)}
                    className="w-10 h-10 border-2 border-black bg-white hover:bg-black hover:text-white transition-colors"
                    aria-label="Previous speaker"
                >
                    ‹
                </button>
                <div className="flex items-center gap-1.5">
                    {SPEAKERS.map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => setActive(i)}
                            className={`h-1.5 transition-all ${i === active ? 'w-8 bg-brand' : 'w-1.5 bg-black/30'}`}
                            aria-label={`Go to speaker ${i + 1}`}
                        />
                    ))}
                </div>
                <button
                    type="button"
                    onClick={() => setActive((i) => (i + 1) % SPEAKERS.length)}
                    className="w-10 h-10 border-2 border-black bg-white hover:bg-black hover:text-white transition-colors"
                    aria-label="Next speaker"
                >
                    ›
                </button>
            </div>
        </section>
    );
}
