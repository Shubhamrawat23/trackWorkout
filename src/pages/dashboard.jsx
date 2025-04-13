import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTabs, deleteTabs } from "../workoutRedux/NewTabReducer/NewTabReducer";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  

export default function Dashboard() {
    const allTab = useSelector((state) => state.customNewTab)// here acces store's reducer key
    const dispatch = useDispatch();

    const handleNewTab = () => {
        dispatch(addTabs());
    }

    const handleTabDelete = (value) => {
        console.log(value);
        dispatch(deleteTabs(value));

    }
    return (
        <div>
            <h1 className="text-white text-[3rem]">Your Dashboard</h1>
            <hr className="w-[99%] mx-auto" />
            <div className="text-[1.5rem] px-1 text-black bg-white hover:bg-gray-300 w-[8rem] rounded-[20px] float-right my-[5px] cursor-pointer" onClick={handleNewTab}>+ New Tab</div>

            <section className="flex my-[4rem] p-[2rem] px-4 flex-wrap h-[34.5em] overflow-y-scroll gap-28 justify-center">
                {
                    allTab?.map((value) => {
                        return (
                            <div key={value.tab_id} className="bg-base-100 w-96 h-96 shadow-white shadow group p-2">
                                <div className="relative flex justify-between" onClick={() => console.log(value.tab_id)
                                }>
                                    <h2 className="text-2xl">{value.tab_id}</h2>

                                    {/* <div className="dropdown dropdown-bottom dropdown-end opacity-0 absolute top-0.5 right-0.5 group-hover:opacity-100" onClick={(e) => e.stopPropagation()}>
                                        <div tabIndex={0} role="button" className="btn m-1 bg-transparent border-0 shadow-none"><i className="fas fa-ellipsis-v"></i></div>
                                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                            <li><a><i className="fa-solid fa-pen"> </i> Edit</a></li>
                                            <li className="text-red-400" onClick={() => handleTabDelete(value.tab_id)}><a><i className="fa-solid fa-trash"></i> Delete</a></li>
                                        </ul>
                                    </div> */}
                                    <Popover onClick={(e) => e.stopPropagation()}>
                                        <PopoverTrigger className="px-1"><div tabIndex={0} role="button"><i className="fas fa-ellipsis-v"></i></div></PopoverTrigger>
                                        <PopoverContent className="w-25 translate-x-[-45px] bg-black">
                                        <ul tabIndex={0}>
                                            <li className="text-white cursor-pointer my-2 p-1 hover:bg-gray-800"><a><i className="fa-solid fa-pen"> </i> Edit</a></li>
                                            <li className="text-red-400 cursor-pointer my-2 p-1 hover:bg-gray-800" onClick={() => handleTabDelete(value.tab_id)}><a><i className="fa-solid fa-trash"></i> Delete</a></li>
                                        </ul>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                        )
                    })
                }
            </section>
        </div>
    )
}