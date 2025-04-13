import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    email : null,
    pass : null
}

const loginReduce = createReducer(
    initialState,
    
    {
        storelogin_Credentials:(state,action)=>{
            state.email = action.payload;
        }
    }
);