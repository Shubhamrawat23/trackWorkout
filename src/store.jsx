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

    userSignUpData:{
        full_name:'',
        dob:'',
        email_id:'',
        password:'',
        country_code:'',
        phone_number:'',
        created_date:'',
        state:'',
        country:'',
    },
    setUserSignupDetails: function (key,value) {
        set((state)=>(
            {
                userSignUpData:{...state.userSignUpData, [key]:value}
            }
        ))
    },
}))