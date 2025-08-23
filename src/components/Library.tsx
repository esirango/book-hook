"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

export default function WoodenLibraryScene({
    onResetFilters,
}: {
    onResetFilters?: () => void;
}) {
    const fireflies = useMemo(
        () =>
            Array.from({ length: 22 }).map((_, i) => {
                const x = Math.random() * 100;
                const y = Math.random() * 100;
                const dx = 10 + Math.random() * 30;
                const dy = 10 + Math.random() * 40;
                const d = 8 + Math.random() * 10;
                const delay = Math.random() * 6;
                const size = 3 + Math.random() * 3;
                return { id: i, x, y, dx, dy, d, delay, size };
            }),
        []
    );

    return (
        <div className="relative bg-transparent flex items-center justify-center">
            <div className="flex justify-center items-center relative w-11/12">
                <svg
                    viewBox="0 0 512 512"
                    className="w-full max-w-md h-auto"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <image
                        href="/images/svg/Bookshelves-Empty.svg"
                        width="100%"
                        height="100%"
                        preserveAspectRatio="xMidYMid meet"
                    />
                    <text
                        x="50%"
                        y="160"
                        textAnchor="middle"
                        className="text-[28px] font-bold fill-yellow-800 drop-shadow-[3px_3px_1px_rgba(0,0,0,0.4)]"
                    >
                        No Books Found
                    </text>

                    <text
                        x="50%"
                        y="48%"
                        textAnchor="middle"
                        className="text-[15px] font-bold fill-yellow-800 drop-shadow-[3px_3px_1px_rgba(0,0,0,0.5)]"
                    >
                        The library is currently empty.
                    </text>

                    <text
                        x="50%"
                        y="65%"
                        textAnchor="middle"
                        className="text-[15px] font-bold fill-yellow-800 drop-shadow-[3px_3px_1px_rgba(0,0,0,0.5)]"
                    >
                        Adjusting your filters or come back later.
                    </text>
                </svg>

                {fireflies.map((f) => (
                    <motion.span
                        key={f.id}
                        className="absolute rounded-full"
                        style={{
                            left: `${f.x}%`,
                            top: `${f.y}%`,
                            width: f.size,
                            height: f.size,
                            filter: "blur(0.2px)",
                            boxShadow:
                                "0 0 6px 2px rgba(255,255,180,0.75), 0 0 18px 4px rgba(140,255,200,0.45)",
                            background:
                                "radial-gradient(circle at 50% 50%, rgba(255,255,200,1) 0%, rgba(255,255,120,0.9) 35%, rgba(255,255,120,0.0) 70%)",
                        }}
                        initial={{ opacity: 0.0, x: 0, y: 0, scale: 0.8 }}
                        animate={{
                            opacity: [0.3, 1, 0.4, 0.9, 0.5],
                            x: [0, f.dx * 0.5, -f.dx * 0.3, f.dx * 0.2, 0],
                            y: [0, -f.dy * 0.3, f.dy * 0.4, -f.dy * 0.1, 0],
                            scale: [0.9, 1.15, 0.95, 1.1, 0.9],
                        }}
                        transition={{
                            duration: f.d,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatType: "mirror",
                            delay: f.delay,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
