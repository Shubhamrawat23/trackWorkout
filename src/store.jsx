import { create } from "zustand";

export const useWktStore = create((set) =>({
    isloginBoxShow: false,
    toggleLoginBox: ()=>set((state)=> ({
        isloginBoxShow: !(state.isloginBoxShow)
    })),

    isSignupBoxShow: false,
    toggleSignupBox: function() {
        set((state)=>(
            {
                isSignupBoxShow: !(state.isSignupBoxShow)
            }
        ))
    },

    user_Data:{
        user_name:'',
        dob:'',
        email_id:'',
        // password:'',
        country_code:'',
        phone_number:'',
        created_date:'',
        state:'',
        country:'',
        token:'',
    },
    setUserDetails: function (value={}) {
        set((state)=>(
            {
                user_Data:{...state.user_Data, ...value}
            }
        ))
    },
}))