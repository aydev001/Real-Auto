import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

const initialState = {
    cars : [],
    loading: false,
    error : null
}

export const fetchCars = createAsyncThunk("fetchCars", async () => {
    const responce = await axiosInstance.get("/cars")
    return responce.data?.data
})

const carSlice = createSlice({
    name : "cars",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(fetchCars.pending, (state) => {
            state.loading = true
        }).addCase(fetchCars.fulfilled, (state, action) => {
            state.loading = false,
            state.cars = action.payload
        }).addCase(fetchCars.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})

export default carSlice


