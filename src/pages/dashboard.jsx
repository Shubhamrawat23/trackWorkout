import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useWktSplitConfigInfo } from "@/hooks/useWktSplitConfigInfo";
import { useNavigate } from "react-router";
import { useWktStore } from "@/store/store";
import SplitGrid from "./splitGrid";


export default function Dashboard() {
    const { wktData } = useWktSplitConfigInfo();
    const userId = useWktStore((state) => state.user_Data.id);
    const userWktInfo = useWktStore((state) => state.userWktInfo);
    const setUserWktInfo = useWktStore((state) => state.setUserWktInfo)
    const navigate = useNavigate()
    const [splitList, setSplitList] = useState([])
    const [loading, setLoading] = useState(true) 

    useEffect(() => {
        if (!userId) {
            setLoading(false)
            return;
        }

        const load = async () => {
            try {
                const res = await wktData(userId);
                console.log(userId);

                if (!res.success) {
                    console.error(res.message);
                    return;
                }

                const activeConfig = res.data.find((item) => item.is_active) || null;

                setSplitList(res.data)

                setUserWktInfo({
                    splitProgramId: activeConfig?.split?.id ?? null,
                    userActiveSplitConfig: activeConfig,
                });
            } finally {
                setLoading(false)
            }
        };

        load();
    }, [userId]);

    return (
        <div className="h-full flex justify-center align-center">
            {loading ? (
                <div className="m-auto flex flex-col items-center gap-3 text-white">
                    <div
                        role="status"
                        aria-label="Loading"
                        className="h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-t-white"
                    />
                    <p className="text-sm text-white/60">Loading your workouts...</p>
                </div>
            ) : userWktInfo.userActiveSplitConfig ? (
                <SplitGrid items={splitList} />
            ) : (
                <Button className="m-auto cursor-pointer" onClick={() => navigate("setup")}>
                    Let's Begin
                </Button>
            )}
        </div>
    )
}