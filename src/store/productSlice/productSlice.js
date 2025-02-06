import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

const initialState = {
    products : [],
    loading: false,
    error : null
}

export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
    const responce = await axiosInstance.get("/products/get")
    return responce.data
})

const productSlice = createSlice({
    name : "products",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true
        }).addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false,
            state.products = action.payload
        }).addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})

export default productSlice