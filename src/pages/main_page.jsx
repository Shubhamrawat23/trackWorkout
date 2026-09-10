import React, { useEffect } from "react";
import LogIn from "./login";
import { useWktStore } from "@/store/store";
import Signup from "./signup";
import supabase from "@/lib/supabaseClient";
import Dashboard from "./dashboard";


export default function MainPage(){
    const isloginBoxShow = useWktStore((state) => state.isloginBoxShow);
    // const isSignupBoxShow = useWktStore((state) => state.isSignupBoxShow);
    return (
        <>
            <LogIn isOpen={isloginBoxShow}></LogIn>
            <Signup></Signup>
            <Dashboard/>
        </>
    )
}