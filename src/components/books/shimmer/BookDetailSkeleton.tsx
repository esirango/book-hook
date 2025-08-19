"use client";

import Shimmer from "@/components/Shimmer";

export default function BookDetailSkeleton() {
    return (
        <div className="max-w-3xl mx-auto p-6 bg-[var(--card-bg)] rounded-2xl shadow-lg">
            <div className="flex flex-col md:flex-row gap-6">
                <Shimmer className="w-full md:w-60 h-96" />
                <div className="flex-1 space-y-3">
                    <Shimmer className="h-8 w-2/3" />
                    <Shimmer className="h-4 w-1/2" />
                    <Shimmer className="h-4 w-1/3" />
                    <Shimmer className="h-4 w-2/5" />
                    <Shimmer className="h-4 w-1/4" />
                    <Shimmer className="h-20 w-full mt-4" />
                </div>
            </div>
        </div>
    );
}
