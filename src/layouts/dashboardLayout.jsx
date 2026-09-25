import React from "react";
import { Outlet } from "react-router";
import Pageheader from "@/components/header";

export default function DashboardLayout() {
  return (
    <div className="relative h-[100dvh] w-screen overflow-hidden bg-black">
      <picture className="absolute inset-0 w-full h-full">
        <source
          media="(max-width: 640px)"
          srcSet="src/assets/mobile_banner.png"
        />
        <img
          src="src/assets/dekstop_banner.png"
          alt="Arena"
          className="w-full h-full object-center"
        />
      </picture>

      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

      <div className="relative h-full flex flex-col p-3">
        <Pageheader />
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}