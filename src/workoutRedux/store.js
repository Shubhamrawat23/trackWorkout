import { configureStore } from "@reduxjs/toolkit";
import newTab from "./NewTabReducer/NewTabReducer";

const store = configureStore({
    reducer:{
        customNewTab:newTab,
    }
});

export default store;