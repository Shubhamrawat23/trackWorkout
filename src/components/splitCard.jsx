import React from "react";

function StatBox({ label, value }) {
    return (
        <div className="rounded-lg border border-white/20 bg-white/10 px-2 py-1.5 text-center">
            <div className="text-[10px] leading-none text-white/60">{label}</div>
            <div className="mt-1 text-sm font-semibold leading-none">{value}</div>
        </div>
    );
}

function formatDateTime(iso) {
    if (!iso) return null;
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return null;

    return d.toLocaleString(undefined, {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export default function SplitCard({ item, onSelect }) {
    const split = item.split;
    const isActive = Boolean(item.is_active);

    const sets = item.wkt_info?.no_of_sets ?? null;
    const reps = item.wkt_info?.no_of_reps ?? null;
    const exercises = item.wkt_info?.no_of_exercises ?? null;
    const hasStats = sets != null || reps != null || exercises != null;

    const createdAt = formatDateTime(item.created_at);

    const handleKey = (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect?.(item);
        }
    };

    return (
        <li
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            onClick={() => onSelect?.(item)}
            onKeyDown={onSelect ? handleKey : undefined}
            className={
                "flex w-full flex-col rounded-xl border p-3 sm:max-w-xs sm:p-3.5 text-white backdrop-blur-md transition-colors cursor-pointer " +
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white " +
                (isActive
                    ? "border-white/70 bg-black/60 shadow-[0_0_0_1px_rgba(255,255,255,0.35)]"
                    : "border-white/15 bg-black/50 " + (onSelect ? "cursor-pointer hover:bg-black/40" : ""))
            }
        >
            <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                    <h3 className="truncate text-base font-semibold leading-tight">
                        {split?.name ?? "Untitled split"}
                    </h3>
                    {split?.code && (
                        <span className="mt-1 inline-block rounded border border-white/30 px-1 py-0.5 font-mono text-[10px] text-white/80">
                            {split.code}
                        </span>
                    )}
                </div>
                {isActive && (
                    <span className="shrink-0 rounded-full bg-white px-2 py-0.5 text-[10px] font-medium text-black">
                        Active
                    </span>
                )}
            </div>

            <div className="mt-3 border-t border-white/15 pt-3">
                {hasStats ? (
                    <div className="grid grid-cols-3 gap-1.5">
                        {sets != null && <StatBox label="Sets" value={sets} />}
                        {reps != null && <StatBox label="Reps" value={reps} />}
                        {exercises != null && <StatBox label="Exercise" value={exercises} />}
                    </div>
                ) : (
                    <p className="text-xs text-white/50">No sets or reps added yet.</p>
                )}
            </div>

            {createdAt && (
                <p className="mt-3 truncate text-[11px] text-white/40">{createdAt}</p>
            )}
        </li>
    );
}