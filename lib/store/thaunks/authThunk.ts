// src/store/thunks/authThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit"
import { loginUser, logoutUser, setLoadingUser } from "../slices/authSlice"
import { loginAction } from "@/lib/cookies"
import { axiosInstance } from "@/lib/axios/axios"
import { toast } from "sonner"

interface LoginPayload {
    email: string
    password: string
}

export const loginByUser = createAsyncThunk(
    "auth/loginByUser",
    async ({ email, password }: LoginPayload, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setLoadingUser(true))
            const response = await axiosInstance.post("/api/v1/login", {
                email,
                password,
            })
            const { user, token } = response.data.data;
            dispatch(loginUser({ user, token }));
            loginAction(
                user.id,
                user.name,
                token,
                user.role
            );
            return response.data
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {

            toast.error("Login failed", {
                description: error.response?.data?.message || "An error occurred during login",
                // action: {
                //     label: "Undo",
                //     onClick: () => console.log("Undo"),
                // },
            })
            return rejectWithValue(error.response?.data || "Login failed")
        } finally {
            dispatch(setLoadingUser(false))
        }
    }
)
export const logoutByUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, { dispatch }) => {
        // Here you can add any additional logic needed for logging out
        dispatch(logoutUser())
    }
)