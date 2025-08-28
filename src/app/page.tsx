"use client";

import Link from "next/link";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

const icons = Array(40)
    .fill(null)
    .map(
        () =>
            ["📗", "📜", "🪶", "🕯️", "📖", "📕", "📘", "📒", "📓"][
                Math.floor(Math.random() * 9)
            ]
    );

export default function HomePage() {
    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);

    const mouseX = useSpring(rawX, { stiffness: 20, damping: 150 });
    const mouseY = useSpring(rawY, { stiffness: 20, damping: 150 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            rawX.set(e.clientX / window.innerWidth - 0.5);
            rawY.set(e.clientY / window.innerHeight - 0.5);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [rawX, rawY]);

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden text-center px-4">
            {/* floating icons background */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                {icons.map((icon, i) => {
                    const x = useTransform(
                        mouseX,
                        (val) => val * (30 + i * 5) * (i % 2 === 0 ? 1 : -1)
                    );
                    const y = useTransform(
                        mouseY,
                        (val) => val * (30 + i * 5) * (i % 2 === 0 ? -1 : 1)
                    );

                    return (
                        <motion.div
                            key={i}
                            className="absolute text-5xl opacity-60 blur-[2px] select-none"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                x,
                                y,
                            }}
                            animate={{
                                scale: [1, 1.05, 0.95, 1],
                            }}
                            transition={{
                                duration: 12 + i * 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            whileHover={{
                                scale: 1.2,
                                opacity: 0.6,
                            }}
                        >
                            {icon}
                        </motion.div>
                    );
                })}
            </div>

            {/* content */}
            <div className="relative flex justify-center items-center min-h-screen w-full bg-[var(--bg)]">
                {/* دایره با حلقه نورانی ملایم */}
                <div
                    className="relative flex flex-col justify-center items-center rounded-full p-8"
                    style={{
                        width: "min(80vw, 400px)",
                        height: "min(80vw, 400px)",
                    }}
                >
                    {/* متن‌ها */}
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--accent)] text-center">
                        Book Library
                    </h1>
                    <p className="text-lg sm:text-xl text-[var(--text)] max-w-xs text-center mt-4">
                        Discover and explore books from all around the world...
                    </p>

                    {/* دکمه */}
                    <Link
                        href="/books"
                        className="relative mt-6 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-200"
                    >
                        <span className="absolute inset-0 bg-black/25 rounded-xl"></span>
                        <span className="relative text-white">
                            Explore Books
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
