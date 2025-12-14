import React from "react";
import { Button } from "@/components/ui/button"
import { useWktStore } from "@/store";

export default function Pageheader() {
    const toggleBox = useWktStore((state) => state.toggleLoginBox)
    return(
        <>
            <section className="w-full border-white border-1 h-auto p-4">
                <div className="flex justify-between">
                    <div>LOGO</div>

                    <div>
                        <Button onClick={toggleBox} className="cursor-pointer" variant="">LogIn</Button>
                    </div>
                </div>
            </section>
        </>
    )
}