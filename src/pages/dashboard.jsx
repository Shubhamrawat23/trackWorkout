import React from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import WktSplitForm from "./wkt_split_form";
import WktTab from "./wktTab";
  

export default function Dashboard() {

    const handleNewTab = () => {
    }

    const handleTabDelete = (value) => {

    }
    return (
        <div className="">
            {/* <Button className="m-auto cursor-pointer">Let's Begin</Button> */}
            {/* <WktSplitForm/> */}

            <WktTab></WktTab>
            
        </div>
    )
}