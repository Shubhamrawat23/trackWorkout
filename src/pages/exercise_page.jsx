import React from "react";

let object = {
    "data": [
        {
            "date": "2025-04-14",
            "exercises": [
                {
                    "name": "benchPress",
                    "sets": [
                        { "wt": 100, "reps": 10 },
                        { "wt": 105, "reps": 8 },
                        { "wt": 110, "reps": 6 }
                    ]
                },
                {
                    "name": "squat",
                    "sets": [
                        { "wt": 140, "reps": 10 },
                        { "wt": 150, "reps": 8 },
                        { "wt": 160, "reps": 6 }
                    ]
                },
                {
                    "name": "barbellRow",
                    "sets": [
                        { "wt": 90, "reps": 10 },
                        { "wt": 95, "reps": 8 },
                        { "wt": 100, "reps": 6 }
                    ]
                },
                {
                    "name": "tricepPushdown",
                    "sets": [
                        { "wt": 40, "reps": 12 },
                        { "wt": 45, "reps": 10 },
                        { "wt": 50, "reps": 8 }
                    ]
                }
            ]
        },
        {
            "date": "2025-04-15",
            "exercises": [
                {
                    "name": "deadlift",
                    "sets": [
                        { "wt": 180, "reps": 5 },
                        { "wt": 190, "reps": 3 },
                        { "wt": 200, "reps": 2 }
                    ]
                },
                {
                    "name": "overheadPress",
                    "sets": [
                        { "wt": 60, "reps": 10 },
                        { "wt": 65, "reps": 8 },
                        { "wt": 70, "reps": 6 }
                    ]
                },
                {
                    "name": "pullUps",
                    "sets": [
                        { "wt": "bodyweight", "reps": 10 },
                        { "wt": "bodyweight", "reps": 8 },
                        { "wt": "bodyweight", "reps": 6 }
                    ]
                },
                {
                    "name": "bicepCurls",
                    "sets": [
                        { "wt": 25, "reps": 12 },
                        { "wt": 30, "reps": 10 },
                        { "wt": 35, "reps": 8 }
                    ]
                }
            ]
        },
        {
            "date": "2025-04-16",
            "exercises": [
                {
                    "name": "legPress",
                    "sets": [
                        { "wt": 200, "reps": 12 },
                        { "wt": 210, "reps": 10 },
                        { "wt": 220, "reps": 8 }
                    ]
                },
                {
                    "name": "lunges",
                    "sets": [
                        { "wt": 50, "reps": 12 },
                        { "wt": 55, "reps": 10 },
                        { "wt": 60, "reps": 8 }
                    ]
                },
                {
                    "name": "benchPress",
                    "sets": [
                        { "wt": 100, "reps": 10 },
                        { "wt": 105, "reps": 8 },
                        { "wt": 110, "reps": 6 }
                    ]
                },
                {
                    "name": "seatedRow",
                    "sets": [
                        { "wt": 80, "reps": 12 },
                        { "wt": 85, "reps": 10 },
                        { "wt": 90, "reps": 8 }
                    ]
                },
                {
                    "name": "chestFly",
                    "sets": [
                        { "wt": 40, "reps": 12 },
                        { "wt": 45, "reps": 10 },
                        { "wt": 50, "reps": 8 }
                    ]
                }
            ]
        },
        {
            "date": "2025-04-17",
            "exercises": [
                {
                    "name": "inclineBench",
                    "sets": [
                        { "wt": 80, "reps": 10 },
                        { "wt": 85, "reps": 8 },
                        { "wt": 90, "reps": 6 }
                    ]
                },
                {
                    "name": "barbellRow",
                    "sets": [
                        { "wt": 95, "reps": 10 },
                        { "wt": 100, "reps": 8 },
                        { "wt": 105, "reps": 6 }
                    ]
                },
                {
                    "name": "shoulderPress",
                    "sets": [
                        { "wt": 60, "reps": 10 },
                        { "wt": 65, "reps": 8 },
                        { "wt": 70, "reps": 6 }
                    ]
                },
                {
                    "name": "hammerCurls",
                    "sets": [
                        { "wt": 30, "reps": 12 },
                        { "wt": 35, "reps": 10 },
                        { "wt": 40, "reps": 8 }
                    ]
                }
            ]
        },
        {
            "date": "2025-04-18",
            "exercises": [
                {
                    "name": "frontSquat",
                    "sets": [
                        { "wt": 120, "reps": 10 },
                        { "wt": 130, "reps": 8 },
                        { "wt": 140, "reps": 6 }
                    ]
                },
                {
                    "name": "dumbbellPress",
                    "sets": [
                        { "wt": 30, "reps": 12 },
                        { "wt": 35, "reps": 10 },
                        { "wt": 40, "reps": 8 }
                    ]
                },
                {
                    "name": "latPulldown",
                    "sets": [
                        { "wt": 70, "reps": 12 },
                        { "wt": 75, "reps": 10 },
                        { "wt": 80, "reps": 8 }
                    ]
                },
                {
                    "name": "calfRaises",
                    "sets": [
                        { "wt": 100, "reps": 15 },
                        { "wt": 110, "reps": 12 },
                        { "wt": 120, "reps": 10 }
                    ]
                }
            ]
        },
        {
            "date": "2025-04-19",
            "exercises": [
                {
                    "name": "romanianDeadlift",
                    "sets": [
                        { "wt": 100, "reps": 10 },
                        { "wt": 110, "reps": 8 },
                        { "wt": 120, "reps": 6 }
                    ]
                },
                {
                    "name": "latPulldown",
                    "sets": [
                        { "wt": 75, "reps": 12 },
                        { "wt": 80, "reps": 10 },
                        { "wt": 85, "reps": 8 }
                    ]
                },
                {
                    "name": "machineChestPress",
                    "sets": [
                        { "wt": 70, "reps": 12 },
                        { "wt": 75, "reps": 10 },
                        { "wt": 80, "reps": 8 }
                    ]
                },
                {
                    "name": "legExtension",
                    "sets": [
                        { "wt": 90, "reps": 15 },
                        { "wt": 95, "reps": 12 },
                        { "wt": 100, "reps": 10 }
                    ]
                }
            ]
        },
        {
            "date": "2025-04-20",
            "restDay": true
        }
    ]
};

export default function Exercise_page() {
    return (
        <>
            {
                object.data.map((value, key) => {
                    console.log(value);
                    return (
                        <div key={key} className="grid sm:grid-cols-3 grid-cols-2 border border-red-700 p-5 mb-5 gap-x-6 gap-y-2">
                            <div className="sm:col-span-3 col-span-2 border border-green-700 p-10">
                                {value.date}
                            </div>
                            {
                                value?.exercises?.map((exercise)=>{
                                    return(
                                        <div key={key} className="border border-yellow-700">
                                            <div>{exercise.name}</div>
                                            {
                                                exercise.sets.map((set,key)=>{
                                                    return(
                                                        <div key={key}>
                                                            {set.wt}Kg * {set.reps}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    );
                })
            }
        </>
    )
}