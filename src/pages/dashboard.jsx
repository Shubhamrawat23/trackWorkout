import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addTabs, deleteTabs } from "../workoutRedux/NewTabReducer/NewTabReducer";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import WktSplitForm from "./wkt_split_form";
  

export default function Dashboard() {

    const handleNewTab = () => {
    }

    const handleTabDelete = (value) => {

    }
    return (
        <div className="flex flex-1">
            {/* <Button className="m-auto cursor-pointer">Let's Begin</Button> */}
            <WktSplitForm/>
        </div>
    )
}