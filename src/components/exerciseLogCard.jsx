import React from "react";
import { Plus, Calendar, BarChart2, User } from "lucide-react";

export default function ExLogCard({ name, columns, rows }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 sm:p-5">
      <h2 className="text-white text-lg sm:text-xl font-semibold mb-4">{name}</h2>

      <div
        className="grid"
        style={{ gridTemplateColumns: `1fr repeat(${columns.length - 1}, 1fr)` }}
      >
        {columns.map((col) => (
          <div
            key={col}
            className="text-zinc-500 text-[10px] sm:text-xs font-medium tracking-wide uppercase pb-2"
          >
            {col}
          </div>
        ))}
      </div>

      <div className="rounded-lg overflow-hidden">
        {rows.map((row, i) => (
          <div
            key={i}
            className={`grid items-center py-2 px-0 gap-1 ${
              i % 2 === 0 ? "bg-zinc-800/60" : "bg-zinc-800/30"
            }`}
            style={{ gridTemplateColumns: `1fr repeat(${columns.length - 1}, 1fr)` }}
          >
            <div className="text-zinc-200 text-xs sm:text-sm pl-2 sm:pl-3">{row.set}</div>

            <div className="px-1">
              <input
                defaultValue={row.weight}
                className="w-full bg-zinc-950/60 border border-zinc-700 rounded-full text-center text-white text-xs sm:text-sm py-1.5 outline-none focus:border-zinc-500"
              />
            </div>

            <div className="px-1">
              <select
                defaultValue={row.unit}
                className="w-full bg-zinc-950/60 border border-zinc-700 rounded-full text-center text-white text-xs sm:text-sm py-1.5 outline-none focus:border-zinc-500 appearance-none"
              >
                <option value="kg">kg</option>
                <option value="lb">lb</option>
              </select>
            </div>

            {row.reps.map((rep, idx) => (
              <div key={idx} className="px-1">
                <input
                  defaultValue={rep}
                  className="w-full bg-zinc-950/60 border border-zinc-700 rounded-full text-center text-white text-xs sm:text-sm py-1.5 outline-none focus:border-zinc-500"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}