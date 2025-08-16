"use client";

import React from "react";
import clsx from "clsx";

export default function Shimmer({ className }: { className?: string }) {
    return (
        <div
            className={clsx(
                "animate-pulse rounded-md bg-[var(--placeholder-light)] dark:bg-[var(--placeholder-dark)]",
                className
            )}
        />
    );
}
