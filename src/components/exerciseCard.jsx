import React from "react";

export default function ExerciseCard({ card_title, card_desc, exe_focus_area, isToday }) {
    return (
        <>
            <div
                className={`border-2 ${isToday?"border-white bg-white":"border-gray-500"} px-2  sm:px-4 py-5 rounded-md h-fit w-full outline-0 relative my-3 flex flex-col justify-between gap-y-6`}
                style={{
                    backgroundImage: isToday
                        ?`linear-gradient(to top,rgba(255, 255, 255, 0.98) 55%, rgba(255, 255, 255, 0.89) 60%, rgba(255, 255, 255, 0.18) 70%), url('public/andrew-valdivia-Ot1DWcm_DMg-unsplash.jpg')`
                        : `linear-gradient(to top, rgba(0, 0, 0, 0.85) 30%, rgb(0, 0, 0) 50%, rgba(0, 0, 0, 0.3) 100%), url('public/andrew-valdivia-Ot1DWcm_DMg-unsplash.jpg')`,
                    minHeight: "450px",
                    backgroundPosition: "top center",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    filter: "grayscale(50%)"
                }}>

                {/* image & icon Sec */}
                <div>
                    {/* icon */}
                    <div>
                        <span className={`${isToday?"bg-[rgba(255,255,255,0.7)] border-[rgb(255,255,255))]":"bg-[rgba(43,41,41,0.8)] border-[rgba(0,0,0,0.4)]"} p-2 rounded-md border-2 inline-block`}>
                            <i className={`fa-solid fa-dumbbell fa-xl ${isToday? "text-black":""}`} />
                        </span>
                    </div>

                    <div className={`${isToday ? "visible" : "hidden"} bg-white rounded-bl-md rounded-tr-sm text-black absolute top-0 right-0 px-2 py-1 text-lg font-semibold tracking-wider`}>TODAY</div>

                    {/* bg image */}
                    {/* <div>
                        <img src="public/andrew-valdivia-Ot1DWcm_DMg-unsplash.jpg" alt="card Exercise Image" />
                    </div> */}
                </div>


                <div>
                    {/* Title & desc Sec */}
                    <div className={`uppercase text-2xl sm:text-5xl font-semibold my-3 relative after:content-[''] after:absolute after:bottom-[-12px] after:left-[2px] sm:after:left-[5px] after:w-1/10 after:h-[2px] sm:after:h-[3px] after:bg-current ${isToday?"text-black":""}`}>
                        {card_title}
                    </div>

                    <div className={`my-4 py-2 text-sm sm:text-md ${isToday? "text-black":""}`}>
                        {card_desc}
                    </div>

                    <hr />

                    {/* focus & view log btn */}
                    <div className="my-3">
                        <label className={`${isToday? "text-black":""} font-semibold`}>FOCUS AREA</label>
                        <div className="flex gap-3 my-1 flex-wrap">
                            {
                                exe_focus_area.map((part, i)=>(
                                    <span className={`${isToday? "text-black bg-zinc-200":"bg-zinc-800"} px-3 rounded capitalize text-sm sm:text-md`} key={i}>{part}</span>
                                ))
                            }
                        </div>
                    </div>

                    <div className="mt-4">
                        <button className={`w-full rounded border-1 border-gray-500 py-2 cursor-pointer relative hover:scale-105 hover:rounded-4xl hover:duration-300 hover:ease-in ${isToday? "text-black":""}`}>VIEW LOG 
                            <i className="fa-solid fa-arrow-right fa-md absolute right-2 top-3"/>
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}