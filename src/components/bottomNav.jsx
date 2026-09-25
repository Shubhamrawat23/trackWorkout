import React from "react";
import { Calendar, BarChart2, User } from 'lucide-react';

export default function BottomNav() {
  const items = [
    { icon: Calendar, label: "Calendar" },
    { icon: null, label: "JD", isAvatar: true },
    { icon: BarChart2, label: "Charts" },
    { icon: User, label: "Account" },
  ];
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-zinc-950 border-t border-zinc-800 flex items-center justify-around py-3 z-20">
      {items.map((item) =>
        item.isAvatar ? (
          <div
            key={item.label}
            className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center text-white text-xs font-semibold"
          >
            {item.label}
          </div>
        ) : (
          <button
            key={item.label}
            className="flex flex-col items-center gap-1 text-zinc-400"
          >
            <item.icon size={20} />
            <span className="text-[11px]">{item.label}</span>
          </button>
        )
      )}
    </div>
  );
}