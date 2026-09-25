import React from "react";
import { Button } from "@/components/ui/button";
import { useWktStore } from "@/store/store";
import { useNavigate } from "react-router";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { CircleUserRound } from "lucide-react";
import supabase from "@/lib/supabaseClient";


export default function Pageheader() {
  const userData = useWktStore((state) => state.user_Data);
  const resetStore = useWktStore((state)=> state.resetStore)
  const navigate = useNavigate();
  let isEnteredTheArena = false

  isEnteredTheArena = Object.values(userData).some((val) => val?.trim() !== "" && val !== null)

  const handleLogout = async () => {
    await supabase.auth.signOut();
    resetStore();
    navigate("/");
  };

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
          {
            isEnteredTheArena ?
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 text-white cursor-pointer">
                    <span className="hidden sm:inline text-sm">
                      {userData?.user_name || ""}
                    </span>
                    <CircleUserRound size={26} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/settings")}>
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-500 focus:text-red-500"
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              :
              <Button
                onClick={() => navigate("enter")}
                className="cursor-pointer bg-white/80 hover:bg-white text-black backdrop-blur-sm"
                variant=""
              >
                Enter the Arena
              </Button>

          }
        </div>
      </div>
    </section>
  );
}