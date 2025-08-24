"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

export default function WoodenLibraryScene() {
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

    const textShadowStyle = "1px 1px 1px var(--library-shadow)";

    return (
        <div className="w-full flex flex-col items-center justify-center min-h-[500px] p-6 relative overflow-x-hidden">
            <div
                className="w-full lg:w-1/3 max-w-5xl rounded-xl p-4 flex flex-col gap-6 border-4"
                style={{
                    background: "var(--library-shelf-bg)",
                    borderColor: "var(--library-shelf-border)",
                    boxShadow: `5px 5px 10px var(--library-shadow)`,
                }}
            >
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="w-full h-36 rounded-lg relative flex items-center justify-center border-4"
                        style={{
                            background: "var(--library-shelf-bg)",
                            borderColor: "var(--library-shelf-border)",
                            boxShadow: `inset 0 2px 6px var(--library-shadow), 0 3px 6px var(--library-shadow)`,
                        }}
                    >
                        <div className="text-center">
                            {i === 1 ? (
                                <h2
                                    className="text-2xl font-extrabold tracking-wide"
                                    style={{
                                        color: "var(--library-title)",
                                        textShadow: textShadowStyle,
                                    }}
                                >
                                    No Books Found
                                </h2>
                            ) : i === 2 ? (
                                <p
                                    className="text-base mt-1"
                                    style={{
                                        color: "var(--library-text)",
                                        textShadow: textShadowStyle,
                                    }}
                                >
                                    The library is currently empty.
                                </p>
                            ) : (
                                <p
                                    className="text-base"
                                    style={{
                                        color: "var(--library-text-alt)",
                                        textShadow: textShadowStyle,
                                    }}
                                >
                                    Adjust your filters or come back later.
                                </p>
                            )}
                        </div>
                    </div>
                ))}

                {fireflies.map((f) => (
                    <motion.span
                        key={f.id}
                        className="absolute rounded-full"
                        style={{
                            left: `${Math.min(f.x, 95)}%`,
                            top: `${Math.min(f.y, 95)}%`,
                            width: f.size,
                            height: f.size,
                            filter: "blur(0.2px)",
                            boxShadow: `0 0 4px 1px var(--library-firefly-glow1), 0 0 14px 3px var(--library-firefly-glow2)`,
                            background:
                                "radial-gradient(circle at 50% 50%, rgba(255,255,220,1) 0%, rgba(255,230,150,0.8) 40%, rgba(255,220,120,0) 70%)",
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
