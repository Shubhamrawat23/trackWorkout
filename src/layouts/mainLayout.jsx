import React from "react";
import Pageheader from "@/components/header";
import { Outlet } from "react-router";
import mobileBanner from "@/assets/mobile_banner.png";
import desktopBanner from "@/assets/dekstop_banner.png";

export default function MainLayout() {
  return (
    <div className="relative h-[100dvh] w-screen overflow-hidden bg-black">
      <picture className="absolute inset-0 w-full h-full">
        <source
          media="(max-width: 640px)"
          srcSet={mobileBanner}
        />
        <img
          src={desktopBanner}
          alt="Arena"
          className="w-full h-full object-center"
        />
      </picture>

      {/* <div className="absolute inset-0 bg-black/30" /> */}

      <div className="relative z-1 h-full flex flex-col p-3">
        <Pageheader />
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}