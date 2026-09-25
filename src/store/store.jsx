import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware"

const initialUserData = {
    user_name: '',
    dob: '',
    email_id: '',
    // password:'',
    country_code: '',
    phone_number: '',
    created_date: '',
    state: '',
    country: '',
    token: '',
    id: null,
}

const initialUserWktInfo = {
    splitProgramId: null,
    sets: null,
    reps: null,
    age: null,
    weight: null,
    targetWt: null,
    height: null,
    userBMI: null,
    userActiveSplitConfig: null,
}

export const useWktStore = create(
    persist(
        (set) => ({
            user_Data: initialUserData,
            setUserDetails: function (value = {}) {
                set((state) => (
                    {
                        user_Data: { ...state.user_Data, ...value }
                    }
                ))
            },

            // sessionData: null,
            // set_session_data: function (value = {}) {
            //     set((state) => (
            //         {
            //             sessionData: { ...value }
            //         }
            //     ))
            // },

            userWktInfo: initialUserWktInfo,
            setUserWktInfo: function (value = {}) {
                set((state) => {
                    const updatedWktInfo = { ...state.userWktInfo, ...value };

                    const ht = parseFloat(updatedWktInfo.height);
                    const wt = parseFloat(updatedWktInfo.weight);

                    updatedWktInfo.userBMI = ht && wt ? (wt / ((ht / 100) ** 2)).toFixed(1) : null;

                    return { userWktInfo: updatedWktInfo };
                })
            },

            resetStore: ()=>{
                set({
                    user_Data: initialUserData,
                    userWktInfo: initialUserWktInfo
                })
            }
        }),
        {
            name: "user_wkt_auth",
            partialize: (state) => ({
                user_Data: state.user_Data
            }),
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)