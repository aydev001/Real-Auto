import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

const initialState = {
    models : [],
    loading: false,
    error : null
}

export const fetchModels = createAsyncThunk("fetchModels", async () => {
    const responce = await axiosInstance.get("/models")
    return responce.data?.data
})

const modelSlice = createSlice({
    name : "models",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(fetchModels.pending, (state) => {
            state.loading = true
        }).addCase(fetchModels.fulfilled, (state, action) => {
            state.loading = false,
            state.models = action.payload
        }).addCase(fetchModels.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})

export default modelSlice


