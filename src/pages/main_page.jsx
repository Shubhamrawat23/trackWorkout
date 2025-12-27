import React from "react";
import LogIn from "./login";
import { useWktStore } from "@/store";
import Signup from "./signup";


export default function Main_page(){
    const isloginBoxShow = useWktStore((state) => state.isloginBoxShow);
    // const isSignupBoxShow = useWktStore((state) => state.isSignupBoxShow);
    return (
        <>
            <LogIn isOpen={isloginBoxShow}></LogIn>
            <Signup></Signup>
        </>
    )
}