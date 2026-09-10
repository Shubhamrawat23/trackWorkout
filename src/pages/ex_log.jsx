import React, { useEffect, useState } from "react";
// import { Plus } from "lucide-react";
import ExLogCard from "@/components/exerciseLogCard";
import DateRail from "@/components/leftDateRail";
import DateScroller from "@/components/topDateRail";
import useSplitsExLog from "@/hooks/useSplitsExLog";
// import BottomNav from "@/components/bottomNav";


// function EmptyExerciseCard() {
//   return (
//     <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 sm:p-5 flex flex-col">
//       <div className="grid grid-cols-4 text-zinc-500 text-[10px] sm:text-xs font-medium tracking-wide uppercase pb-2">
//         <div>Set #</div>
//         <div>Weight</div>
//         <div>Unit</div>
//         <div>Reps</div>
//       </div>
//       <div className="flex-1 min-h-[64px] border border-zinc-700 rounded-lg flex items-center justify-center text-zinc-600">
//         <span className="text-2xl">✦</span>
//       </div>
//       <button className="text-zinc-400 hover:text-white text-sm mt-3 flex items-center gap-1">
//         Add Exercise <Plus size={14} />
//       </button>
//     </div>
//   );
// }

const dates = [
  "July 6",
  "July 5",
  "July 4",
  "July 3",
  "July 10",
  "July 11",
  "July 12",
  "July 13",
  "July 14",
  "July 15",
  "July 16",
  "July 17",
  "July 18",
  "July 19",
  "July 20",
  "July 21",
  "July 22",
  "July 23",
  "July 24",
  "July 25",
  "July 26",
  "July 27",
  "July 28",
  "July 29",
  "July 30",
];

export default function WorkoutLog() {
  const [selectedDate, setSelectedDate] = useState("July 6");
  const {getSplitExerciseDates} = useSplitsExLog()

  useEffect(() => {
  (async () => {
    const result = await getSplitExerciseDates(12, 1);
    console.log("full result:", result);
    // const currentDate = (new Date()).toLocaleDateString('en-US',{
    //   month:'short',
    //   day:'numeric'
    // })

  })();
}, []);

  const [bench, setBench] = useState([
    { set: "Set 1", weight: 130, unit: "kg", reps: [5] },
    { set: "Set 2", weight: 150, unit: "kg", reps: [5] },
    { set: "Set 3", weight: 155, unit: "kg", reps: [5] },
    { set: "Set 4", weight: 185, unit: "kg", reps: [4] },
  ]);

  const [ohp, setOhp] = useState([
    { set: "Set 1", weight: 75, unit: "kg", reps: [8] },
    { set: "Set 2", weight: 100, unit: "kg", reps: [5] },
  ]);

  const [squat, setSquat] = useState([
    { set: "Set 1", weight: 100, unit: "kg", reps: [5, 5] },
    { set: "Set 2", weight: 75, unit: "kg", reps: [8, 5] },
  ]);

  return (
    <div className="bg-black min-h-screen p-4 sm:p-6 pb-24 md:pb-6">

      {/* Desktop breadcrumb */}
      <div className="md:flex items-center gap-2 mb-6">
        <span className="text-zinc-500 text-2xl font-semibold">Log</span>
        <span className="text-zinc-600 text-2xl">→</span>
        <span className="text-white text-2xl font-bold">Monday, July 6, 2026</span>
      </div>

      {/* Mobile date scroller */}
      <DateScroller selected={selectedDate} onSelect={setSelectedDate} dates={dates} />

      <div className="flex gap-6">
        <DateRail selected={selectedDate} onSelect={setSelectedDate} dates={dates} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 flex-1">
          <ExLogCard
            name="Barbell Bench Press"
            columns={["Set #", "Weight", "Unit", "Reps"]}
            rows={bench}
          />

          <ExLogCard
            name="Barbell Overhead Press"
            columns={["Set #", "Weight", "Unit", "Reps"]}
            rows={ohp}
          />

          <ExLogCard
            name="Barbell Squat"
            columns={["Set #", "Weight", "Unit", "Reps", "Reps"]}
            rows={squat}
          />

          {/* <EmptyExerciseCard /> */}
        </div>
      </div>

      {/* <BottomNav /> */}
    </div>
  );
}