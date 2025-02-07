import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

const initialState = {
    locations : [],
    loading: false,
    error : null
}

export const fetchLocations = createAsyncThunk("fetchLocations", async () => {
    const responce = await axiosInstance.get("/locations")
    return responce.data?.data
})

const locationSlice = createSlice({
    name : "locations",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(fetchLocations.pending, (state) => {
            state.loading = true
        }).addCase(fetchLocations.fulfilled, (state, action) => {
            state.loading = false,
            state.locations = action.payload
        }).addCase(fetchLocations.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})

export default locationSlice


