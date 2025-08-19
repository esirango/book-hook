"use client";

import Link from "next/link";
import {
    motion,
    useMotionValue,
    useSpring,
    useAnimationFrame,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

function Sticker({ label, top, left, depth, target }: any) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, { stiffness: 5, damping: 30 });
    const springY = useSpring(y, { stiffness: 5, damping: 30 });

    useAnimationFrame(() => {
        x.set(x.get() + (target.x / depth - x.get()) * 0.015);
        y.set(y.get() + (target.y / depth - y.get()) * 0.015);
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
    const [size, setSize] = useState({ w: 1, h: 1 });
    const [mouse, setMouse] = useState({ x: 0, y: 0 });

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

    useEffect(() => {
        const onResize = () => {
            setSize({
                w: wrapperRef.current?.clientWidth || 1,
                h: wrapperRef.current?.clientHeight || 1,
            });
        };
        onResize();
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = wrapperRef.current?.getBoundingClientRect();
        if (!rect) return;
        const mx = e.clientX - rect.left - size.w / 2;
        const my = e.clientY - rect.top - size.h / 2;
        setMouse({ x: mx, y: my });
    };

    return (
        <div
            ref={wrapperRef}
            onMouseMove={handleMouseMove}
            className="fixed inset-0 w-full h-full overflow-hidden"
            style={{
                color: "var(--text)",
                background: "var(--bg-gradient)",
            }}
        >
            {/* استیکرهای پس‌زمینه */}
            {stickersData.map((s) => (
                <Sticker key={s.id} {...s} target={mouse} />
            ))}

            {/* محتوای اصلی */}
            <div className="relative z-10 mx-auto flex h-full max-w-3xl flex-col items-center justify-center px-6 text-center">
                <motion.h1
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100, damping: 12 }}
                    className="font-extrabold bg-[var(--accent)] tracking-tight 
text-[90px] sm:text-[120px] md:text-[160px] bg-clip-text text-transparent 
drop-shadow-[2px_2px_0_var(--shadow)] 
"
                >
                    404
                </motion.h1>

                <motion.p
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="mt-4 max-w-lg text-base sm:text-lg"
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
