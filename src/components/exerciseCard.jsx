import React from "react";

export default function ExerciseCard({ card_title, card_desc, exe_focus_area, isToday }) {
    return (
        <>
            <div
                className="border-2 border-gray-500 px-4 py-5 rounded-md h-fit w-full outline-0 relative my-3 flex flex-col justify-between gap-y-5"
                style={{
                    minHeight: "400px",
                    maxWidth: "350px",
                    backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.85) 30%, rgba(0, 0, 0) 50%, rgba(0, 0, 0, 0.3) 100%), url('public/andrew-valdivia-Ot1DWcm_DMg-unsplash.jpg')`,
                    backgroundPosition: "top center",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                }}>

                {/* image & icon Sec */}
                <div>
                    {/* icon */}
                    <div>
                        <span className="bg-[rgba(43,41,41,0.8)] p-2 rounded-md border-2 border-[rgba(0,0,0,0.4)] inline-block">
                            <i className="fa-solid fa-dumbbell fa-xl" />
                        </span>
                    </div>

                    <div className={`${isToday ? "visible" : "hidden"} bg-white rounded-bl-md text-black absolute top-0 right-0 px-2 py-1 text-lg font-semibold tracking-wider`}>TODAY</div>

                    {/* bg image */}
                    {/* <div>
                        <img src="public/andrew-valdivia-Ot1DWcm_DMg-unsplash.jpg" alt="card Exercise Image" />
                    </div> */}
                </div>


                <div>
                    {/* Title & desc Sec */}
                    <div className="uppercase text-5xl font-semibold my-3 relative after:content-[''] after:absolute after:bottom-[-12px] after:left-[5px] 
                after:w-1/10 after:h-[3px] after:bg-current">
                        PUSH
                    </div>

                    <div className="my-4 py-2 text-md">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat autem perspiciatis explicabo illum ullam aliquid. Ipsum nobis repellendus amet nostrum velit, inventore blanditiis itaque ex quam enim accusantium? Suscipit, beatae!
                    </div>

                    <hr />

                    {/* focus & view log btn */}
                    <div className="my-3">
                        <label>FOCUS AREA</label>
                        <div className="flex gap-3 my-1">
                            <span className="bg-zinc-800 px-3 rounded">Chest</span>
                            <span className="bg-zinc-800 px-3 rounded">Chest</span>
                            <span className="bg-zinc-800 px-3 rounded">Chest</span>
                        </div>
                    </div>

                    <div className="mt-4">
                        <button className="w-full rounded border-1 border-gray-500 py-2 cursor-pointer relative hover:scale-105 hover:rounded-4xl hover:duration-300 hover:ease-in">VIEW LOG 
                            <i className="fa-solid fa-arrow-right fa-md absolute right-2 top-3"/>
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}