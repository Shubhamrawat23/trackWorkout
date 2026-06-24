import ExerciseCard from "@/components/exerciseCard";
import { useWktSplitConfigInfo } from "@/hooks/useWktSplitConfigInfo";
import { useWktStore } from "@/store";
import React, { useEffect, useState } from "react";

export default function WktTab() {
    const { wktData } = useWktSplitConfigInfo();

    const user_Data = useWktStore((state) => state.user_Data);
    const userWktInfo = useWktStore((state) => state.userWktInfo);

    const [userWktData, setUserWktData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                if (!user_Data?.id || !userWktInfo?.userActiveSplitConfig) {
                    return;
                }

                const response = await wktData(
                    user_Data.id,
                    userWktInfo.userActiveSplitConfig
                );

                if (!response.success) {
                    console.error(response.message);
                    return;
                }

                setUserWktData(response.data);
            } catch (err) {
                alert(err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [user_Data?.id, userWktInfo?.userActiveSplitConfig]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="text-2xl sm:text-4xl mt-2">
                {userWktData?.split?.name} Split (
                {userWktData?.split?.code})
            </div>

            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 w-full sm:p-5 gap-2 sm:gap-4">
                {userWktData?.split?.split_info?.map((subSplit) => (
                    <ExerciseCard
                        key={subSplit.id}
                        card_title={subSplit.name}
                        card_desc={`Day ${subSplit.day_order}`}
                        exe_focus_area={subSplit.target_areas}
                    />
                ))}
            </div>
        </>
    );
}