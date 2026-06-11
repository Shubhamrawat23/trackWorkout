import { userWktInfo } from "@/hooks/useWktInfo";
import { useWktStore } from "@/store";
import React, { useEffect, useState } from "react";

export default function WktTab() {
    const { wktData } = userWktInfo();
    const user_Data = useWktStore((state) => state.user_Data);
    const [user_wkt_data, setUser_wkt_data] = useState(null)
    let isActive, isDark = true;
    useEffect(() => {
        async function fetch_data() {
            if (user_Data?.id) {
                const data = await wktData(user_Data.id ?? "");
                console.log(data);
    
    
                setUser_wkt_data(Array.isArray(data) ? data : [data]);
            }
        }
        fetch_data();
        console.log(user_wkt_data);

    }, [user_Data?.id])
    return (
        <div className="flex justify-around w-screen p-5">
            {
                user_wkt_data?.map((wkt_data) => (
                    <div
                        className={`relative rounded-2xl overflow-hidden flex flex-col cursor-pointer transition-all duration-300 ${isActive
                                ? "bg-white text-black scale-105 shadow-2xl shadow-black/60 z-10 ring-2 ring-white/30"
                                : "bg-zinc-900 text-white hover:bg-zinc-800"
                            }`}
                        style={{ minHeight: 520 }}
                    >
                        {/* Top Image Area */}
                        <div className="relative h-48 overflow-hidden flex-shrink-0">
                            <img
                                // src={style.imgOverlay}
                                src="#"
                                alt={wkt_data.day_label}
                                className={`w-full h-full object-cover ${isDark ? "brightness-40 grayscale" : "brightness-75 grayscale"}`}
                            />
                            <div className={`absolute inset-0 ${isActive ? "bg-gradient-to-b from-transparent to-white" : "bg-gradient-to-b from-transparent to-zinc-900"}`} />

                            {/* Icon */}
                            <div className="absolute top-4 left-4 w-11 h-11 rounded-xl flex items-center justify-center" 
                            // style={{ backgroundColor: style.iconBg }}
                            >
                                {/* {style.icon} */}
                                Icon
                            </div>

                            {/* TODAY Badge */}
                            {isActive && (
                                <div className="absolute top-4 right-4 bg-black text-white text-xs font-bold tracking-widest px-3 py-1 rounded">
                                    TODAY
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex flex-col flex-1 px-5 pb-5 pt-2">
                            {/* Title — uses day_label */}
                            <h2
                                className={`text-5xl font-black tracking-tight leading-none mb-2 uppercase ${isActive ? "text-black" : "text-white"}`}
                                style={{ fontFamily: "'Arial Black', sans-serif" }}
                            >
                                {wkt_data.day_label}
                            </h2>

                            {/* Accent line */}
                            <div className="h-0.5 w-8 mb-4 rounded-full" style={{ backgroundColor: isActive ? "#000" : //style.accent
                             ''}} />

                            {/* Description — uses day_description */}
                            <p className={`text-sm leading-relaxed mb-auto ${isActive ? "text-zinc-600" : "text-zinc-400"}`}>
                                {wkt_data.day_description}
                            </p>

                            {/* Focus Areas — uses target_areas */}
                            <div className="mt-5">
                                <p className={`text-[10px] font-semibold tracking-widest mb-2 ${isActive ? "text-zinc-400" : "text-zinc-500"}`}>
                                    FOCUS AREAS
                                </p>
                                <div className="flex flex-wrap gap-2 mb-5">
                                    {wkt_data.target_areas?.map((area) => (
                                        <span
                                            key={area}
                                            className={`text-[10px] font-semibold tracking-wider px-3 py-1.5 rounded-full border uppercase ${isActive ? "border-zinc-300 text-zinc-700" : "border-zinc-700 text-zinc-300"
                                                }`}
                                        >
                                            {area}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* CTA */}
                            <button className={`w-full py-3.5 rounded-xl text-sm font-bold tracking-widest flex items-center justify-center gap-3 transition-all ${isActive ? "bg-black text-white hover:bg-zinc-800" : "bg-zinc-800 border border-zinc-700 text-white hover:bg-zinc-700"
                                }`}>
                                VIEW LOG
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}