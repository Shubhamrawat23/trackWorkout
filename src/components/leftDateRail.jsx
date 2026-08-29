import React from "react";
// Vertical rail --- desktop only
export default function DateRail({ selected, onSelect, dates=[] }) {
  return (
    <div className="hidden md:flex flex-col pt-1 pr-6 relative">
      <div className="absolute left-[5px] top-2 bottom-2 w-px bg-zinc-800" />
      {dates.map((d) => {
        const isActive = d === selected;
        return (
          <button
            key={d}
            onClick={() => onSelect(d)}
            className="flex items-center gap-3 py-2.5 relative z-10 text-left"
          >
            <span
              className={`w-[11px] h-[11px] rounded-full border-2 flex-shrink-0 ${
                isActive ? "border-white bg-zinc-900" : "border-zinc-600 bg-black"
              }`}
            />
            <span
              className={`text-sm ${
                isActive ? "text-white font-medium" : "text-zinc-500"
              }`}
            >
              {d}
            </span>
          </button>
        );
      })}
    </div>
  );
}