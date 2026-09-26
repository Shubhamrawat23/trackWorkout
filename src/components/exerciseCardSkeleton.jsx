import { Skeleton } from "@/components/ui/skeleton";

export default function ExerciseCardSkeleton() {
    return (
        <div
            className="relative my-3 flex h-fit w-full flex-col justify-between gap-y-6 rounded-md border-2 border-gray-700 bg-zinc-950 px-2 py-5 sm:px-4"
            style={{ minHeight: "450px" }}
        >
            <div>
                {/* icon */}
                <div className="inline-block rounded-md border-2 border-black/40 bg-[rgba(43,41,41,0.8)] p-2">
                    <Skeleton className="h-5 w-5 bg-white/15" />
                </div>
            </div>

            <div>
                {/* title + underline */}
                <Skeleton className="my-3 h-8 w-2/5 bg-white/10 sm:h-12" />
                <Skeleton className="mb-3 h-[3px] w-1/10 min-w-6 rounded-full bg-white/20" />

                {/* description */}
                <div className="my-4 space-y-2 py-2">
                    <Skeleton className="h-3.5 w-full bg-white/10" />
                    <Skeleton className="h-3.5 w-2/3 bg-white/10" />
                </div>

                <hr className="border-white/15" />

                {/* focus area */}
                <div className="my-3">
                    <Skeleton className="h-3.5 w-24 bg-white/10" />
                    <div className="my-2 flex flex-wrap gap-3">
                        <Skeleton className="h-6 w-16 bg-white/10" />
                        <Skeleton className="h-6 w-20 bg-white/10" />
                        <Skeleton className="h-6 w-14 bg-white/10" />
                    </div>
                </div>

                {/* view log button */}
                <Skeleton className="mt-4 h-10 w-full rounded border border-gray-700 bg-white/5" />
            </div>
        </div>
    );
}