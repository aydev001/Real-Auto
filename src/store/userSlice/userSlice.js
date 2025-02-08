import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    userProfile: {},
    loading: false,
    error: null
}

export const fetchUserProfile = createAsyncThunk("fetchUserProfile", async () => {
    const token = localStorage.getItem("authToken")
    if (token) {
        const baseUrl = process.env.VITE_BASE_URL
        const responce = await axios.get(`${baseUrl}/auth/me`, {
            headers:
            {
                Authorization: `Bearer ${token}`
            }
        })
        return responce.data.data
    } else {
        return {}
    }
})


const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUserProfile.pending, (state) => {
            state.loading = true
        }).addCase(fetchUserProfile.fulfilled, (state, action) => {
            state.loading = false
            state.userProfile = action.payload
        }).addCase(fetchUserProfile.rejected, (state, action) => {
            localStorage.removeItem("authToken")
            state.loading = false
            state.error = action.error.message
        })
    }
})

export default userSlice