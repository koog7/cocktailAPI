import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosAPI from "../../axios/AxiosAPI.ts";

import { AxiosError } from 'axios';
import { RootState } from "../../app/store.ts";

export interface User{
    _id: string,
    displayName: string,
    role: string,
    token: string,
}
interface LoginData {
    email: string;
    displayName: string;
    avatar: File | null;
    password: string;
}

interface UserState {
    user: User | null;
    loader: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    loader: false,
    error: null,
};
export const loginUser = createAsyncThunk<User , LoginData , { rejectValue: string }>('users/singIn', async (loginData, { rejectWithValue }) => {
    try{
        const formData = new FormData();
        formData.append('email', loginData.email);
        formData.append('displayName', loginData.displayName);
        formData.append('password', loginData.password);

        if (loginData.avatar) {
            formData.append('avatar', loginData.avatar);
        }

        const response = await axiosAPI.post(`/users` , formData);
        return response.data;
    }catch (error) {
        if (error instanceof AxiosError) {
            return rejectWithValue(error.response?.data?.message || 'An error occurred');
        }
        return rejectWithValue('An unknown error occurred');
    }
});

export const authorizationUser = createAsyncThunk<User , { email: string; password: string } , { rejectValue: string }>('users/singUp', async (loginData: { email: string; password: string }, { rejectWithValue }) => {
    try{
        const response = await axiosAPI.post(`/users/sessions` , loginData);
        return response.data;
    }catch (error) {
        if (error instanceof AxiosError) {
            return rejectWithValue(error.response?.data?.message || 'Email or password are incorrect');
        }
        return rejectWithValue('An unknown error occurred');
    }
});

export const logout = createAsyncThunk<void, string, {state: RootState}>('users/logout',
    async (userToken: string) => {
        await axiosAPI.delete('/users/sessions', {headers: { 'Authorization': `Bearer ${userToken}` }});
    }
);

export const UserSlice = createSlice({
    name:'User',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state: UserState) => {
            state.loader = true;
            state.error = null;
        });
        builder.addCase(loginUser.fulfilled, (state: UserState, action) => {
            state.user = action.payload;
            state.loader = false;
            state.error = null;
        });
        builder.addCase(loginUser.rejected, (state: UserState , action) => {
            state.loader = false;
            state.error = action.payload as string;
        });
        builder.addCase(authorizationUser.pending, (state: UserState) => {
            state.loader = true;
            state.error = null;
        });
        builder.addCase(authorizationUser.fulfilled, (state: UserState, action) => {
            state.user = action.payload;
            state.loader = false;
            state.error = null;
        });
        builder.addCase(authorizationUser.rejected, (state: UserState , action) => {
            state.loader = false;
            state.error = action.payload as string;
        })
        builder.addCase(logout.pending, (state: UserState) => {
            state.loader = true;
            state.error = null;
        });
        builder.addCase(logout.fulfilled, (state: UserState) => {
            state.user = null;
            state.loader = false;
            state.error = null;
        });
        builder.addCase(logout.rejected, (state: UserState , action) => {
            state.loader = false;
            state.error = action.payload as string;
        });
    },
})


export const UserReducer = UserSlice.reducer;