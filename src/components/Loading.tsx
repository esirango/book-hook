"use client";
import React, { useEffect, useState } from "react";

export default function Loading() {
    const pages = Array.from({ length: 20 });
    const [pageFlips, setPageFlips] = useState<number[]>(
        Array(pages.length).fill(0)
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setPageFlips((prev) => prev.map((f) => f + 1));
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    const getPageAnimation = (index: number) => {
        const delay = index * 0.05;
        const duration = 1;
        return `pageFlipForward ${duration}s ease-in-out ${delay}s forwards infinite`;
    };

    const getPageZIndex = (index: number) => pages.length - index + 10;

    const [dust, setDust] = useState<
        { top: number; left: number; duration: number; delay: number }[]
    >([]);

    useEffect(() => {
        setDust(
            [...Array(25)].map(() => ({
                top: 10 + Math.random() * 80,
                left: 10 + Math.random() * 80,
                duration: 3 + Math.random() * 1,
                delay: Math.random() * 3,
            }))
        );
    }, []);

    return (
        <div className="flex flex-col items-center justify-center gap-6 min-h-screen">
            <div className="relative w-56 h-40 flex items-center justify-center overflow-hidden">
                <div className="w-44 h-32 perspective-[800px] flex items-center justify-center relative z-10">
                    <div className="relative flex justify-center items-center w-full rounded-lg shadow-xl h-32 bg-[var(--card-bg-light)] dark:bg-[var(--card-bg-dark)]">
                        <div className="relative w-52 h-32 perspective-300000 mx-auto">
                            {pages.map((_, i) => {
                                const totalFlips = pageFlips[i];
                                const baseRotate =
                                    totalFlips % 2 === 0 ? 0 : -180;

                                return (
                                    <div
                                        key={i}
                                        className="absolute w-20 h-28 top-2 right-2 bg-[#fff9f0] rounded-sm shadow-md"
                                        style={{
                                            transformOrigin: "left",
                                            animation: getPageAnimation(i),
                                            zIndex: getPageZIndex(i),
                                            transform: `rotateY(${baseRotate}deg) translateZ(${
                                                i * -0.3
                                            }px)`,
                                            perspective: 3000000,
                                        }}
                                    ></div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {dust.map((d, i) => (
                    <span
                        key={i}
                        className="absolute w-1 h-1 z-50 bg-yellow-200 rounded-full opacity-50"
                        style={{
                            top: `${d.top}%`,
                            left: `${d.left}%`,
                            animation: `dustFloat ${d.duration}s ease-in-out infinite`,
                            animationDelay: `${d.delay}s`,
                        }}
                    />
                ))}
            </div>

            {/* متن لودینگ */}
            <div className="text-[var(--accent-light)] dark:text-[var(--accent-dark)] font-medium text-center text-lg">
                Loading
                <span className="dots">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                </span>
            </div>

            <style jsx>{`
                @keyframes pageFlipForward {
                    0% {
                        transform: rotateY(0deg) translateZ(0px);
                    }
                    50% {
                        transform: rotateY(-90deg) translateZ(6px);
                    }
                    100% {
                        transform: rotateY(-180deg) translateZ(0px);
                    }
                }

                .dots {
                    display: inline-flex;
                    margin-left: 4px;
                }

                .dots span {
                    display: inline-block;
                    animation: bounce 1.4s infinite;
                    font-weight: bold;
                    font-size: 1.2em;
                    color: #4b5563;
                    opacity: 0.3;
                    margin: 0 2px;
                }

                .dots span:nth-child(1) {
                    animation-delay: 0s;
                }
                .dots span:nth-child(2) {
                    animation-delay: 0.2s;
                }
                .dots span:nth-child(3) {
                    animation-delay: 0.4s;
                }

                @keyframes bounce {
                    0%,
                    80%,
                    100% {
                        transform: translateY(0);
                        opacity: 0.3;
                    }
                    40% {
                        transform: translateY(-6px);
                        opacity: 1;
                    }
                }

                @keyframes dustFloat {
                    0% {
                        transform: translateY(0) scale(0.8);
                        opacity: 0.4;
                    }
                    50% {
                        transform: translateY(-12px) scale(1);
                        opacity: 0.8;
                    }
                    100% {
                        transform: translateY(0) scale(0.8);
                        opacity: 0.4;
                    }
                }
            `}</style>
        </div>
    );
}
