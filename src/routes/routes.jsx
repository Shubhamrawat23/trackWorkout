import DashboardLayout from "@/layouts/dashboardLayout";
import MainLayout from "@/layouts/mainLayout";
import Dashboard from "@/pages/dashboard";
import WorkoutLog from "@/pages/ex_log";
import LogIn from "@/pages/login";
import MultiStepSignup from "@/pages/signup";
import WktSplitForm from "@/pages/wkt_split_form";
import WktTab from "@/pages/wktTab";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";

export default function PageRoute(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout/>}>
                    <Route path="enter" element={<LogIn open={true}/>}/>
                    <Route path="signup" element={<MultiStepSignup dailogOpen={true}/>}/>
                </Route>

                <Route path="/dashboard" element={<DashboardLayout/>}>
                    <Route path="" element={<Dashboard/>}/>
                    <Route path="setup" element={<WktSplitForm/>}/>
                </Route>
                <Route path="/split" element={<DashboardLayout/>}>
                    <Route path=":code" element={<WktTab/>}/>
                    <Route path=":code/:tab" element={<WorkoutLog/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}