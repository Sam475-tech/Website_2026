import React from 'react';
import Image from 'next/image';
import Reveal from './Reveal';

const SPONSORS = [
    {
        name: 'Bella Waffles',
        image: '/sponsors/bella_waffles.png',
    },
    {
        name: '5 Racing',
        image: '/sponsors/five_racing.png',
    },
    {
        name: 'The Framed Wall',
        image: '/sponsors/the_framed_wall.png',
    },
    {
        name: 'Caprus IT',
        image: '/sponsors/caprus_it.png',
    },
    {
        name: 'BXI',
        image: '/sponsors/bxi.png',
    },
    {
        name: 'Dainik Prabhat',
        image: '/sponsors/dainik_prabhat.png',
    },
    {
        name: 'Punekar News',
        image: '/sponsors/punekar_news.png',
    },
    {
        name: 'Campus Times Pune',
        image: '/sponsors/campus_times_pune.png',
    },
];

// Duplicate items to ensure a seamless infinite scrolling loop
const MARQUEE_ITEMS = [...SPONSORS, ...SPONSORS, ...SPONSORS];


export default function PartnersSection() {
    return (
        <section id="partners" className="bg-black text-white py-20 md:py-24 overflow-hidden">
            <div className="px-6 md:px-24 mb-12">
                <Reveal>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <p className="font-pixel text-brand uppercase tracking-[0.3em] mb-3">Our Backers</p>
                            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
                                Partners & <span className="text-brand">Sponsors</span>
                            </h2>
                        </div>
                        <p className="font-pixel text-neutral-400 max-w-sm lowercase text-xs md:text-sm">
                            Powered by visionary partners who believe in the mosaic of ideas.
                        </p>
                    </div>
                </Reveal>
            </div>

            {/* Horizontal Moving Sponsors Marquee - Logos Only (No borders/boxes) */}
            <div className="relative w-full overflow-hidden py-8">
                {/* Gradient Fades on Edges for Smooth In/Out Effect */}
                <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 md:w-48 bg-gradient-to-r from-black to-transparent z-10" />
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 md:w-48 bg-gradient-to-l from-black to-transparent z-10" />

                {/* Animated Moving Track */}
                <div className="animate-marquee flex items-center gap-12 md:gap-20">
                    {MARQUEE_ITEMS.map((sponsor, idx) => (
                        <div
                            key={`${sponsor.name}-${idx}`}
                            className="relative shrink-0 w-36 md:w-48 h-14 md:h-20 flex items-center justify-center transition-transform duration-300 hover:scale-110 cursor-pointer"
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src={sponsor.image}
                                    alt={`${sponsor.name} Logo`}
                                    fill
                                    className="object-contain"
                                    sizes="200px"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer / Credits */}
            <div className="px-6 md:px-24">
                <Reveal delay={200}>
                    <div className="mt-20 pt-12 border-t border-neutral-800/60 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
                        <div>
                            <p className="text-2xl font-black tracking-tight">
                                <span className="text-brand">TED</span>x<span className="text-white"> DYPAKURDI</span>
                            </p>
                            <p className="text-sm text-neutral-400 mt-2 max-w-sm">
                                Meandering in the Mosaic · 6 Oct 2026<br />
                                Shantai Auditorium, DY Patil Education Complex, Akurdi.
                            </p>
                            <p className="text-xs text-neutral-500 mt-3 max-w-md">
                                This independent TEDx event is operated under license from TED.
                            </p>
                        </div>
                        <div className="flex gap-3 items-center">
                            {[
                                { label: 'Instagram', href: 'https://instagram.com', icon: 'M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4zm5 4.5A4.5 4.5 0 1016.5 12 4.5 4.5 0 0012 7.5zM17.5 7a1 1 0 11-1 1 1 1 0 011-1z' },
                                { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'M4 9h4v11H4zM6 3a2 2 0 11-2 2 2 2 0 012-2zM10 9h4v1.6a4.3 4.3 0 013.8-1.8c4 0 4.2 2.6 4.2 6V20h-4v-5.2c0-1.2 0-2.8-1.8-2.8s-2 1.3-2 2.7V20h-4z' },
                                { label: 'X', href: 'https://x.com', icon: 'M4 4l7.3 8.8L4.4 20h2.6l5.3-5.9L16.8 20H20l-7.6-9.2L19.4 4h-2.6l-4.9 5.4L7.2 4z' },
                                { label: 'Email', href: 'mailto:hello@tedxdypakurdi.com', icon: 'M3 6h18v12H3zm0 0l9 7 9-7' },
                            ].map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="w-10 h-10 border border-neutral-700 bg-neutral-900/50 rounded-lg flex items-center justify-center hover:border-brand hover:text-brand text-neutral-300 transition-all duration-200"
                                >
                                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                                        <path d={social.icon} />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

