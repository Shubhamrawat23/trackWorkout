import ExerciseCard from "@/components/exerciseCard";
import ExerciseCardSkeleton from "@/components/exerciseCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { useWktSplitConfigInfo } from "@/hooks/useWktSplitConfigInfo";
import { useWktStore } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";

const SKELETON_COUNT = 4;

export default function WktTab() {
    const user_Data = useWktStore((state) => state.user_Data);
    const { wktData } = useWktSplitConfigInfo();
    const map_id = useLocation().state?.map_id;

    const [userWktData, setUserWktData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            if (!user_Data?.id || !map_id) {
                setLoading(false);
                return;
            }

            try {
                const response = await wktData(user_Data.id, map_id);

                if (!response.success) {
                    console.error(response.message);
                    return;
                }

                setUserWktData(response.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [user_Data?.id, map_id]);

    if (!loading && !userWktData) {
        return <div>Couldn't load this split.</div>;
    }

    return (
        <>
            {loading ? (
                <Skeleton className="mt-2 h-8 w-1/2 max-w-xs bg-white/10 sm:h-10" />
            ) : (
                <div className="text-2xl sm:text-4xl mt-2">
                    {userWktData?.split?.name} Split ({userWktData?.split?.code})
                </div>
            )}

            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 w-full sm:p-5 gap-2 sm:gap-4">
                {loading
                    ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                          <ExerciseCardSkeleton key={i} />
                      ))
                    : userWktData?.split?.split_info?.map((subSplit) => (
                          <ExerciseCard
                              key={subSplit.id}
                              card_title={subSplit.day_label}
                              card_desc={subSplit.day_description}
                              exe_focus_area={subSplit.target_areas}
                          />
                      ))}
            </div>
        </>
    );
}