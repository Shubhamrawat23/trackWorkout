import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

const initialState = [];

export const newTabSlice = createSlice({
    initialState,
    name:'newTab',
    reducers:{
        addTabs:(state)=>{
            state.unshift({
                tab_id:nanoid(),
                tab_name:'new_Tab',
            })
        },
        deleteTabs:(state,action)=>{
            return state.filter((tab)=>tab.tab_id !== action.payload);
        }
    }
})

export const {addTabs,deleteTabs} =  newTabSlice.actions;

export default newTabSlice.reducer;

