import { create } from "zustand";
import {persist} from "zustand/middleware"

export const useWktStore = create(
    persist(
        (set) => ({
            isloginBoxShow: false,
            toggleLoginBox: () => set((state) => ({
                isloginBoxShow: !(state.isloginBoxShow)
            })),
    
            isSignupBoxShow: false,
            toggleSignupBox: function () {
                set((state) => (
                    {
                        isSignupBoxShow: !(state.isSignupBoxShow)
                    }
                ))
            },
    
            user_Data: {
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
            },
            setUserDetails: function (value = {}) {
                set((state) => (
                    {
                        user_Data: { ...state.user_Data, ...value }
                    }
                ))
            },
    
            sessionData: null,
            set_session_data: function (value = {}) {
                set((state) => (
                    {
                        sessionData: { ...value }
                    }
                ))
            },

            userWktInfo:{
                splitProgramId:null,
                sets:null,
                reps:null,
                weight:null,
                targetWt:null,
                height:null,
                userBMI:null
            },
            setUserWktInfo: function(value={}){
                set((state)=>{
                    const updatedWktInfo = {...state.userWktInfo, ...value};

                    const ht = parseFloat(updatedWktInfo.height);
                    const wt = parseFloat(updatedWktInfo.weight);

                    updatedWktInfo.userBMI = ht && wt ?(wt / ((ht/100) ** 2)).toFixed(1) :null;

                    return{userWktInfo: updatedWktInfo};
                })
            },
        }),
        {
            name:"user_wkt_auth",
            partialize: (state)=>({
                user_Data: state.user_Data
            })
        }
    )
)