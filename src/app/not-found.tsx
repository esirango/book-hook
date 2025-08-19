"use client";

import Link from "next/link";
import {
    motion,
    useMotionValue,
    useSpring,
    useAnimationFrame,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

function Sticker({ label, top, left, depth }: any) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, { stiffness: 5, damping: 30 });
    const springY = useSpring(y, { stiffness: 5, damping: 30 });

    // زمان برای حرکت سینوسی
    const t = useRef(0);

    useAnimationFrame(() => {
        t.current += 0.005; // سرعت حرکت (کوچیک = آروم‌تر)
        const offsetX = Math.sin(t.current * depth * 0.05) * 15; // شدت حرکت X
        const offsetY = Math.cos(t.current * depth * 0.05) * 15; // شدت حرکت Y
        x.set(offsetX);
        y.set(offsetY);
    });

    return (
        <motion.div
            className="pointer-events-none absolute select-none text-3xl sm:text-4xl md:text-5xl opacity-40 blur-[1px]"
            style={{ top, left, x: springX, y: springY }}
        >
            {label}
        </motion.div>
    );
}

export default function NotFound() {
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const icons = [
        "🪶",
        "✒️",
        "💡",
        "📖",
        "📜",
        "🕯️",
        "👓",
        "📔",
        "📘",
        "📙",
        "📗",
        "📝",
        "🖋️",
        "📒",
        "📓",
        "📑",
        "📇",
        "📌",
        "📚",
        "📕",
    ];

    const [stickersData, setStickersData] = useState<any[]>([]);

    useEffect(() => {
        const data = Array.from({ length: 60 }, (_, i) => ({
            id: i + 1,
            label: icons[i % icons.length],
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            depth: Math.random() * 50 + 20,
        }));
        setStickersData(data);
    }, []);

    return (
        <div
            ref={wrapperRef}
            className="fixed inset-0 w-full h-full overflow-hidden"
            style={{
                color: "var(--text)",
                background: "var(--bg-gradient)",
            }}
        >
            {/* استیکرهای پس‌زمینه */}
            {stickersData.map((s) => (
                <Sticker key={s.id} {...s} />
            ))}

            {/* محتوای اصلی */}
            <div className="relative z-10 mx-auto flex h-full max-w-3xl flex-col items-center justify-center px-6 text-center">
                <motion.h1
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100, damping: 12 }}
                    className="font-extrabold bg-[var(--accent)] tracking-tight 
                        text-[90px] sm:text-[120px] md:text-[160px] bg-clip-text text-transparent 
                        drop-shadow-[2px_2px_0_var(--shadow)]"
                >
                    404
                </motion.h1>

                <motion.p
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="mt-4 max-w-lg lg:text-xl sm:text-lg drop-shadow-[2px_2px_0_var(--shadow)]"
                    style={{ color: "var(--text)" }}
                >
                    The page you were looking for was not found.
                </motion.p>

                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="mt-8"
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-base font-semibold shadow-md backdrop-blur transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring active:translate-y-0"
                        style={{
                            backgroundColor: "var(--menu-bg)",
                            color: "#fff",
                        }}
                    >
                        ← Back to Home
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
