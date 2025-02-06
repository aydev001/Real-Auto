import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

const initialState = {
    brands : [],
    loading: false,
    error : null
}

export const fetchBrands = createAsyncThunk("fetchBrands", async () => {
    const responce = await axiosInstance.get("/brands")
    return responce.data?.data
})

const brandSlice = createSlice({
    name : "brands",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(fetchBrands.pending, (state) => {
            state.loading = true
        }).addCase(fetchBrands.fulfilled, (state, action) => {
            state.loading = false,
            state.brands = action.payload
        }).addCase(fetchBrands.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})

export default brandSlice


