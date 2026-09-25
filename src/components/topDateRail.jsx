import React from "react";
// Horizontal pill scroller ---- mobile only
export default function DateScroller({ selected, onSelect, dates=[] }) {
  return (
    <div className="flex md:hidden items-center gap-3 overflow-x-auto no-scrollbar px-4 py-3 -mx-4">
      {dates.map((d, i) => {
        const isActive = d === selected;
        return (
          <React.Fragment key={d}>
            <button
              onClick={() => onSelect(d)}
              className={`flex-shrink-0 text-sm px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                isActive
                  ? "bg-white text-black font-semibold"
                  : "text-zinc-400"
              }`}
            >
              {d}
            </button>
            {i < dates.length - 1 && (
              <span className="text-zinc-700 flex-shrink-0">—</span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}