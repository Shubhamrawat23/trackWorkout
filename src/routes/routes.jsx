import MainLayout from "@/layouts/mainLayout";
import LogIn from "@/pages/login";
import MultiStepSignup from "@/pages/signup";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";

export default function PageRoute(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout/>}>
                    <Route path="/enter" element={<LogIn open={true}/>}/>
                    <Route path="/signup" element={<MultiStepSignup dailogOpen={true}/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}