import React from "react";
import { Button } from "@/components/ui/button";
import { useWktStore } from "@/store/store";
import { useNavigate } from "react-router";

export default function Pageheader() {
  const toggleBox = useWktStore((state) => state.toggleLoginBox);
  const navigate = useNavigate();

  return (
    <section
      className="
        w-full h-auto p-4 rounded-lg
        bg-white/05
        backdrop-blur-xs
        border border-white/30
        shadow-[0_8px_32px_rgba(0,0,0,0.25)]
      "
    >
      <div className="flex justify-between items-center">
        <div className="text-white font-semibold tracking-wide">LOGO</div>

        <div>
          <Button
            onClick={()=>navigate("/enter")}
            className="cursor-pointer bg-white/80 hover:bg-white text-black backdrop-blur-sm"
            variant=""
          >
            Enter the Arena
          </Button>
        </div>
      </div>
    </section>
  );
}