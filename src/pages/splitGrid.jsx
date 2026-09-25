import SplitCard from "@/components/splitCard";
import React from "react";

export default function SplitGrid({ items = [], loading = false, onSelect }) {
    const sorted = [...items].sort((a, b) => Number(b.is_active) - Number(a.is_active));

    return (
        <ul className="grid w-full max-h-full auto-rows-min grid-cols-1 items-start gap-3 overflow-y-auto p-3 xs:p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {loading ? (
                <li className="animate-pulse rounded-xl border border-white/15 bg-black/50 p-3.5 backdrop-blur-md">
                    <div className="h-5 w-2/3 rounded bg-white/10" />
                    <div className="mt-1.5 h-3 w-10 rounded bg-white/10" />
                    <div className="mt-4 grid grid-cols-3 gap-1.5">
                        <div className="h-10 rounded-lg bg-white/10" />
                        <div className="h-10 rounded-lg bg-white/10" />
                        <div className="h-10 rounded-lg bg-white/10" />
                    </div>
                </li>
            ) : (
                sorted.map((item) => <SplitCard key={item.id} item={item} onSelect={onSelect} />)
            )}
        </ul>
    );
}