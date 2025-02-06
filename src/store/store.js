import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./categorySlice/categorySlice";
import userSlice from "./userSlice/userSlice";
import actionSlice from "./actionSlice/actionSlice";
import brandSlice from "./brandSlice/brandSlice";
import modelSlice from "./modelSlice/modelSlice";

export const store = configureStore({
    reducer : {
        categories : categorySlice.reducer,
        brands : brandSlice.reducer,
        models : modelSlice.reducer,
        users : userSlice.reducer,
        actions : actionSlice.reducer
    }
})