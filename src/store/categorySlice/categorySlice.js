import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

const initialState = {
    categories : [],
    loading: false,
    error : null
}

export const fetchCategories = createAsyncThunk("fetchCategories", async () => {
    const responce = await axiosInstance.get("/categories")
    return responce.data?.data
})

const categorySlice = createSlice({
    name : "categories",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(fetchCategories.pending, (state) => {
            state.loading = true
        }).addCase(fetchCategories.fulfilled, (state, action) => {
            state.loading = false,
            state.categories = action.payload
        }).addCase(fetchCategories.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})

export default categorySlice


