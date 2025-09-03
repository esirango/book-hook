"use client";

import Link from "next/link";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

type IconData = { icon: string; top: string; left: string };

function FloatingIcon({
    item,
    index,
    mouseX,
    mouseY,
    isMobile,
}: {
    item: IconData;
    index: number;
    mouseX: any;
    mouseY: any;
    isMobile: boolean;
}) {
    const x = useTransform(
        mouseX,
        (val) => (val as number) * (20 + index * 5) * (index % 2 === 0 ? 1 : -1)
    );
    const y = useTransform(
        mouseY,
        (val) => (val as number) * (20 + index * 5) * (index % 2 === 0 ? -1 : 1)
    );

    return (
        <motion.div
            className="absolute text-4xl sm:text-5xl opacity-60 select-none blur-[1px]"
            style={{
                top: item.top,
                left: item.left,
                ...(isMobile ? {} : { x, y }),
            }}
            animate={{
                scale: [1, 1.05, 0.95, 1],
            }}
            transition={{
                duration: 10 + index * 2,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        >
            {item.icon}
        </motion.div>
    );
}

export default function HomePage() {
    const [icons, setIcons] = useState<IconData[]>([]);
    const [isMobile, setIsMobile] = useState(false);

    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);

    // جایگزین این بخش کن
    const mouseX = useSpring(rawX, { stiffness: 20, damping: 80, mass: 1 });
    const mouseY = useSpring(rawY, { stiffness: 20, damping: 80, mass: 1 });

    const iconList = ["📗", "📜", "🪶", "🕯️", "📖", "📕", "📘", "📒", "📓"];

    useEffect(() => {
        const mobile = window.innerWidth < 768;
        setIsMobile(mobile);

        const count = mobile ? 30 : 40;
        setIcons(
            Array(count)
                .fill(null)
                .map(() => ({
                    icon: iconList[Math.floor(Math.random() * iconList.length)],
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                }))
        );
    }, []);

    useEffect(() => {
        if (isMobile) return;
        let raf: number;
        const handleMouseMove = (e: MouseEvent) => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                rawX.set(e.clientX / window.innerWidth - 0.5);
                rawY.set(e.clientY / window.innerHeight - 0.5);
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [rawX, rawY, isMobile]);

    return (
        <div className="relative flex flex-col items-center justify-center h-[calc(100vh-148px)] overflow-hidden text-center px-4">
            {/* floating icons background */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                {icons.map((item, i) => (
                    <FloatingIcon
                        key={i}
                        item={item}
                        index={i}
                        mouseX={mouseX}
                        mouseY={mouseY}
                        isMobile={isMobile}
                    />
                ))}
            </div>

            {/* content */}
            <div className="relative flex justify-center items-center min-h-screen w-full bg-[var(--bg)]">
                <div
                    className="relative flex flex-col justify-center items-center rounded-full p-8"
                    style={{
                        width: "min(80vw, 400px)",
                        height: "min(80vw, 400px)",
                    }}
                >
                    <h1
                        className="text-4xl sm:text-5xl font-extrabold text-[var(--accent)] text-center"
                        style={{
                            textShadow: " -2px -2px 1px rgba(0,0,0,0.6)",
                        }}
                    >
                        Book Library
                    </h1>
                    <p
                        className="text-lg sm:text-xl text-[var(--text)] max-w-xs text-center mt-4"
                        style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.6)" }}
                    >
                        Discover and explore books from all around the world...
                    </p>

                    <Link
                        href="/books"
                        className="relative mt-6 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-200"
                    >
                        <span className="absolute inset-0 bg-[var(--secondary-button)] rounded-xl"></span>
                        <span className="relative text-white">
                            Explore Books
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
