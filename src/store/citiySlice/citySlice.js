import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

const initialState = {
    cities : [],
    loading: false,
    error : null
}

export const fetchCities = createAsyncThunk("fetchCities", async () => {
    const responce = await axiosInstance.get("/cities")
    return responce.data?.data
})

const citySlice = createSlice({
    name : "cities",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(fetchCities.pending, (state) => {
            state.loading = true
        }).addCase(fetchCities.fulfilled, (state, action) => {
            state.loading = false,
            state.cities = action.payload
        }).addCase(fetchCities.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})

export default citySlice


