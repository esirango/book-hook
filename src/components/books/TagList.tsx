"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import setQueryParam from "../../../utils/setQueryParam";

interface TagListProps {
    title: string;
    items: string[];
    paramKey: string;
    onChangeTag?: (value: string) => void;
}

function TagList({ title, items, paramKey, onChangeTag }: TagListProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [expanded, setExpanded] = useState(false);

    if (!items.length) return null;

    const limit = 4;
    const hidden = items.slice(limit);
    const hiddenCount = hidden.length;

    const handleClick = (item: string) => {
        setQueryParam(router, paramKey, searchParams, item);
        onChangeTag?.(item);
    };

    return (
        <div className="mb-3">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                {title}:
            </h3>

            <div className="flex flex-wrap gap-2">
                {items.slice(0, limit).map((item, i) => (
                    <button
                        key={i}
                        onClick={() => handleClick(item)}
                        className="px-3 py-1 rounded-xl text-sm shadow-sm cursor-pointer
                       bg-[var(--accent)] text-[var(--text)]
                       hover:brightness-110 transition-all"
                    >
                        {item}
                    </button>
                ))}

                <AnimatePresence>
                    {expanded && (
                        <motion.div
                            className="flex flex-wrap gap-2 w-full"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {hidden.map((item) => (
                                <button
                                    key={item}
                                    onClick={() => handleClick(item)}
                                    className="px-3 py-1 rounded-xl text-sm shadow-sm cursor-pointer
                             bg-[var(--accent)] text-[var(--text)]
                             hover:brightness-110 transition-all"
                                >
                                    {item}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {hiddenCount > 0 && (
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="flex items-center gap-1 px-3 py-1 rounded-xl text-sm shadow-sm cursor-pointer
                       bg-[var(--secondary-button)] text-[var(--input-text)]
                       hover:brightness-110 transition-all"
                    >
                        {expanded ? "Show less" : `+${hiddenCount} more`}
                        <motion.span
                            animate={{ rotate: expanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="inline-block"
                        >
                            ▼
                        </motion.span>
                    </button>
                )}
            </div>
        </div>
    );
}

export default TagList;
