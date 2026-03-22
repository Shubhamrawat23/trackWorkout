import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import supabase from "@/lib/supabaseClient";
import { useWktStore } from "@/store";

const ReadOnlyBadge = () => (
  <span style={{
    background: "rgba(255,255,255,0.06)",
    color: "#52525b",
    fontSize: "9px",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    padding: "2px 6px",
    borderRadius: 4,
  }}>
    read-only
  </span>
);

export default function WktSplitForm() {
  const [activeTab, setActiveTab] = useState("split");
  const [splitData, setSplitData] = useState();
  const setUserWktInfo = useWktStore((state)=>state.setUserWktInfo);
  const userWktInfo = useWktStore((state)=>state.userWktInfo);
  const sessionData = useWktStore((state)=>state.sessionData);
  const [programErrors, setProgramErrors] = useState();
  
  

  useEffect(() => {
    async function getSplits() {
      const { data, error } = await supabase
        .from('wkt_splits')
        .select()
        .eq('creator_type', 'admin');

        if (error) console.error(error);
        else setSplitData(data)
      // console.log(splitData);
    };
    getSplits()
  }, [])

  // const handleChange = (data, )

  function validateProgramForm(data) {
    let errors = {};

    if (!data.splitProgramId) {
      errors.splitProgramId = "Please select a split program"
    }
    
    if (!data.sets) {
      errors.sets = "Sets is required"
    } else if (data.sets < 1) {
      errors.sets = "Minimum 1 set";
    } else if (data.sets > 20) {
      errors.sets = "Maximum 20 sets";
    }

    if (!data.reps) {
      errors.reps = "Reps is required"
    } else if (data.reps < 1) {
      errors.reps = "Minimum 6 reps";
    } else if (data.reps > 20) {
      errors.reps = "Maximum 12 reps ";
    }

    if (!data.weight) {
      errors.weight = "Weight is required";
    } else if (data.currentWt < 20 || data.currentWt > 300) {
      errors.currentWt = "Enter a valid weight (20-300 kg)";
    }

    if (!data.targetWt) {
      errors.targetWt = "Target weight is required";
    } else if (data.targetWt < 20 || data.targetWt > 300) {
      errors.targetWt = "Enter a valid target weight (20-300 kg)";
    }

    if (!data.height) {
      errors.height = "Height is required";
    } else if (data.height < 50 || data.height > 250) {
      errors.height = "Enter a valid height (50-250 cm)";
    }

    return errors;
  }

  const handleProgramSubmit = ()=>{
    // console.log(userWktInfo);

    const validationErrors = validateProgramForm(userWktInfo);

    // console.log(Object.keys(validationErrors).length);
    if (Object.keys(validationErrors).length > 0) {
      setProgramErrors(validationErrors);
    }else{
      //call api to save data
      saveData(userWktInfo)
    }
    return;
  }

  async function saveData(wktdata){
    let UTCdate = new Date().toISOString().replace('T', ' ').replace('Z', ' ')
    if (wktdata?.reps!='' && wktdata?.sets!='' && wktdata?.splitProgramId!='' && sessionData!='') {
      
      const {error} = await supabase.from('user_workout_info').insert({
         user_id: sessionData?.user_id||12,//12 id is dummy for test to the functionality
         wkt_split_id: wktdata.splitProgramId,
         creator_type:'user',
         no_of_sets:wktdata.sets,
         no_of_reps:wktdata.reps,
         created_on:UTCdate
      })
      // console.log(error);
      if (error?.code==23505) {
        alert('Already have the data of yours');
      }else{
        console.error(error?.message)
      }
    }

    if (wktdata?.weight!='' && wktdata?.targetWt!='' && wktdata?.height!='' && wktdata?.userBMI!='' && sessionData!='') {
      
      const {error} = await supabase.from('user_personal_info').insert({
        user_id:sessionData?.user_id||12,//12 id is dummy for test t o the functionality
        current_weight:wktdata.weight,
        target_wt:wktdata.targetWt,
        current_height:wktdata.height,
        BMI:wktdata.userBMI,
        created_on:UTCdate,
        age:null
      })

      // console.log(error);
      if (error?.code==23505) {
        alert("Hve it");
      }
      else{
        console.error(error?.message)
      }
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center p-6 m-auto" style={{ background: "#0a0a0a" }}>
      {/* Subtle glow */}
      <div style={{
        position: "fixed", top: "30%", left: "50%", transform: "translate(-50%,-50%)",
        width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255, 255, 255, 0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="w-full max-w-md rounded-2xl overflow-hidden" style={{
        background: "#111111",
        border: "1px solid rgb(39 39 42)",
        boxShadow: "0 25px 80px -10px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.03)",
      }}>
        {/* Header */}
        <div className="px-6 pt-6 pb-0">
          <div className="flex items-center gap-2 mb-1">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgb(255, 255, 255)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6.5 6.5h11M6.5 17.5h11M3 12h18M6 8.5V6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2.5M14 8.5V6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2.5M6 15.5V18a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2.5M14 15.5V18a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2.5" />
            </svg>
            <h2 className="text-lg font-bold text-white" style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.02em" }}>
              Workout Setup
            </h2>
          </div>
          <p className="text-xs text-zinc-600 mb-5">Configure your training split and preferences</p>

          {/* Tab switcher */}
          <div className="flex bg-zinc-950 rounded-lg p-1 gap-1" style={{ border: "1px solid rgb(39 39 42)" }}>
            {[
              { key: "split", label: "💪 Program" },
              // { key: "custom", label: "Custom", icon: "✦" },
            ].map((tab) => (
              <Button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="flex-1 py-2 text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-1.5"
                style={{
                  color: activeTab === tab.key ? "#000000" : "#52525b",
                  boxShadow: activeTab === tab.key ? "0 2px 12px rgba(255, 255, 255, 0.3)" : "none",
                }}
              >
                {/* <span style={{ fontSize: 11 }}>{tab.icon}</span> */}
                {tab.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="h-px mt-5" style={{ background: "rgb(39 39 42)" }} />

        {/* Content */}
        <div className="px-6 py-5">
          <div key={activeTab} style={{ animation: "fadeUp 0.2s cubic-bezier(.4,0,.2,1)" }}>
            {activeTab === "split" ?
              // ------------------ Split Programs Section ---------------------------------
              <div className="space-y-5">
                {/* Split Program */}
                <div>
                  <label>Split Program</label>
                  <Select onValueChange={(value)=>
                  {
                    setUserWktInfo({splitProgramId:value});
                    setProgramErrors((prev)=>({...prev, splitProgramId:null}))
                  }} required>
                    <SelectTrigger className="w-full text-sm mt-2">
                      <SelectValue placeholder="Select a split..." />
                    </SelectTrigger>
                    <SelectContent style={{ background: "#1a1a1a", border: "1px solid rgb(63 63 70)"}}>
                      {
                        splitData?.map((split)=>(
                          <SelectItem key={split.id} className="text-sm focus:bg-zinc-800" value={split.id}>{split.name}</SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                  {programErrors?.splitProgramId && (
                    <span className="text-xs text-red-500 mt-1">{programErrors.splitProgramId}</span>
                  )}
                </div>

                {/* Sets / Reps / Weight */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label>Sets</label>
                    <Input className="text-sm text-zinc-200 placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-zinc-500 mt-2" type="number" min="1" placeholder="No. of sets" onChange={(e)=>{
                    setUserWktInfo({sets:e.target.value})
                    setProgramErrors((prev)=>({...prev, sets:null}))
                  }} required/>
                    {programErrors?.sets && (
                      <span className="text-xs text-red-500 mt-1">{programErrors.sets}</span>
                    )}
                  </div>
                  <div>
                    <label>Reps</label>
                    <Input className="text-sm text-zinc-200 placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-zinc-500 mt-2" type="number" min="1" placeholder="No. of reps" onChange={(e)=>{
                    setUserWktInfo({reps:e.target.value});
                    setProgramErrors((prev)=>({...prev, reps:null}))
                  }}required/>
                    {programErrors?.reps && (
                      <span className="text-xs text-red-500 mt-1">{programErrors.reps}</span>
                    )}
                  </div>
                  <div>
                    <label>Weight (kg)</label>
                    <Input className="text-sm text-zinc-200 placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-zinc-500 mt-2" type="number" min="30" step=".5" placeholder="Your wt" onChange={(e)=>{
                    setUserWktInfo({weight:e.target.value})
                    setProgramErrors((prev)=>({...prev, weight:null}))
                  }} required/>
                    {programErrors?.weight && (
                      <span className="text-xs text-red-500 mt-1">{programErrors.weight}</span>
                    )}
                  </div>
                </div>
                {/* Target Weight + Height */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label>Target Weight (kg)</label>
                    <Input
                      type="number" min="0" step="0.5" placeholder="Your Target wt" onChange={(e)=>{
                    setUserWktInfo({targetWt:e.target.value})
                    setProgramErrors((prev)=>({...prev, targetWt:null}))
                  }} required
                      className="text-sm text-zinc-200 placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-zinc-500 mt-2"
                    />
                    {programErrors?.targetWt && (
                      <span className="text-xs text-red-500 mt-1">{programErrors.targetWt}</span>
                    )}
                  </div>
                  <div>
                    <label>Height (cm)</label>
                    <Input
                      type="number" min="0" placeholder="Your ht"
                      onChange={(e)=>{
                    setUserWktInfo({height:e.target.value})
                    setProgramErrors((prev)=>({...prev, height:null}))
                  }}
                      required
                      className="text-sm text-zinc-200 placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-zinc-500 mt-2"
                    />
                    {programErrors?.height && (
                      <span className="text-xs text-red-500 mt-1">{programErrors.height}</span>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <label style={{ marginBottom: 0 }}>BMI</label>
                    <ReadOnlyBadge />
                  </div>
                  <div className=" flex items-center justify-between text-sm w-full">
                    {userWktInfo?.userBMI ? (
                      <>
                        <span className="border p-3 rounded-md w-full text-sm">{userWktInfo.userBMI}</span>
                        {/* <span style={{ color: bmiColor, opacity: 0.75, fontSize: 12 }}>{bmiCategory}</span> */}
                      </>
                    ) : (
                      <span className="border p-3 rounded-md w-full" style={{ color: "#3f3f46", fontSize: 12 }}>
                        Enter weight &amp; height to calculate
                      </span>
                    )}
                  </div>
                </div>
              </div>
              :
              // ---------------------- Custom Program Section ---------------------
              <div className="space-y-5">
                {/* Split Name */}
                <div>
                  <label className={labelBase}>Split Name</label>
                  <input
                    className={inputBase}
                    type="text"
                    placeholder="e.g. My Hypertrophy Split"
                    value={splitName}
                    onChange={(e) => setSplitName(e.target.value)}
                  />
                </div>

                {/* Training Goal */}
                <div>
                  <label className={labelBase}>Training Goal</label>
                  <div className="relative">
                    <select className={selectBase} value={goal} onChange={(e) => setGoal(e.target.value)}>
                      <option value="" disabled>Select your goal...</option>
                      <option value="hypertrophy">Hypertrophy (Muscle Size)</option>
                      <option value="strength">Strength</option>
                      <option value="endurance">Endurance</option>
                      <option value="fat_loss">Fat Loss</option>
                      <option value="athletic">Athletic Performance</option>
                      <option value="maintenance">Maintenance</option>
                    </select>
                    <ChevronDown />
                  </div>
                </div>

                {/* Frequency + Difficulty */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelBase}>Days / Week</label>
                    <div className="relative">
                      <select className={selectBase} value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                        <option value="" disabled>Days...</option>
                        {[2, 3, 4, 5, 6].map((d) => (
                          <option key={d} value={d}>{d} days</option>
                        ))}
                      </select>
                      <ChevronDown />
                    </div>
                  </div>
                  <div>
                    <label className={labelBase}>Difficulty</label>
                    <div className="relative">
                      <select className={selectBase} value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                        <option value="" disabled>Level...</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                        <option value="elite">Elite</option>
                      </select>
                      <ChevronDown />
                    </div>
                  </div>
                </div>

                {/* Muscle Focus */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelBase}>Primary Focus</label>
                    <div className="relative">
                      <select className={selectBase} value={primaryMuscle} onChange={(e) => setPrimaryMuscle(e.target.value)}>
                        <option value="" disabled>Muscle group...</option>
                        {MUSCLE_GROUPS.map((m) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                      <ChevronDown />
                    </div>
                  </div>
                  <div>
                    <label className={labelBase}>Secondary Focus</label>
                    <div className="relative">
                      <select className={selectBase} value={secondaryMuscle} onChange={(e) => setSecondaryMuscle(e.target.value)}>
                        <option value="" disabled>Muscle group...</option>
                        {MUSCLE_GROUPS.map((m) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                      <ChevronDown />
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className={labelBase}>Notes <span className="normal-case font-normal text-zinc-600">(optional)</span></label>
                  <textarea
                    className={inputBase + " resize-none"}
                    rows={3}
                    placeholder="Any specific requirements or notes about your split..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>
            }
          </div>
        </div>

        <div className="h-px" style={{ background: "rgb(39 39 42)" }} />

        {/* Footer */}
        <div className="px-6 py-4 flex items-center gap-3">
          <button
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 hover:bg-zinc-800"
            style={{ border: "1px solid rgb(63 63 70)", color: "#71717a" }}
          >
            Cancel
          </button>
          <button
            className="flex-2 py-2.5 px-6 rounded-xl text-sm font-bold text-black transition-all duration-150 active:scale-95 cursor-pointer"
            style={{
              background: "rgb(255, 255, 255)",
              boxShadow: "0 4px 20px rgba(255, 255, 255, 0.25)",
              flex: 2,
            }}
            onClick={handleProgramSubmit}
          >
            Save Program
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}