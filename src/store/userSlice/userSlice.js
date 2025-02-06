import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    users: [],
    userProfile: null,
    loading: false,
    error: null
}

export const fetchUsers = createAsyncThunk("fetchUsers", async () => {
    const token = localStorage.getItem("authToken")
    if (token) {
        const baseUrl = process.env.VITE_BASE_URL
        const responce = await axios.get(`${baseUrl}/users/get`, {
            headers:
            {
                Authorization: `Bearer ${token}`
            }
        })
        return responce.data
    } else {
        return null
    }
})

export const fetchUserProfile = createAsyncThunk("fetchUserProfile", async () => {
    const token = localStorage.getItem("authToken")
    if (token) {
        const baseUrl = process.env.VITE_BASE_URL
        const responce = await axios.get(`${baseUrl}/users/get-one`, {
            headers:
            {
                Authorization: `Bearer ${token}`
            }
        })
        return responce.data
    } else {
        return null
    }
})

export const fetchUserOrders = createAsyncThunk("fetchUserOrders", async () => {
    const token = localStorage.getItem("authToken")
    if (token) {
        const baseUrl = process.env.VITE_BASE_URL
        const responce = await axios.get(`${baseUrl}/users/get-orders`, {
            headers:
            {
                Authorization: `Bearer ${token}`
            }
        })
        return responce.data
    } else {
        return null
    }
})

export const fetchUserAllOrders = createAsyncThunk("fetchUserAllOrders", async () => {
    const token = localStorage.getItem("authToken")
    if (token) {
        const baseUrl = process.env.VITE_BASE_URL
        const responce = await axios.get(`${baseUrl}/users/get-orders-admin`, {
            headers:
            {
                Authorization: `Bearer ${token}`
            }
        })
        return responce.data
    } else {
        return null
    }
})

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true
        }).addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false
            state.users = action.payload
        }).addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
        builder.addCase(fetchUserProfile.pending, (state) => {
            state.loading = true
        }).addCase(fetchUserProfile.fulfilled, (state, action) => {
            state.loading = false,
                state.userProfile = action.payload
        }).addCase(fetchUserProfile.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
        builder.addCase(fetchUserOrders.pending, (state) => {
            state.loading = true
        }).addCase(fetchUserOrders.fulfilled, (state, action) => {
            state.loading = false
            state.orders = action.payload
        }).addCase(fetchUserOrders.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
        builder.addCase(fetchUserAllOrders.pending, (state) => {
            state.loading = true
        }).addCase(fetchUserAllOrders.fulfilled, (state, action) => {
            state.loading = false
            state.allOrders = action.payload
        }).addCase(fetchUserAllOrders.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})

export default userSlice