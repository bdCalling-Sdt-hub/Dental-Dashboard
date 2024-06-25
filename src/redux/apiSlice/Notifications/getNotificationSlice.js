import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../api/baseApi";


const initialState = {
    error: false,
    success: false,
    loading: false,
    pagination: {},
    unreadNotifications: 0,
    notifications: []
};


export const getNotifications = createAsyncThunk(
    'getNotifications',
    async (page, thunkApi) => {
        try{
            const response = await baseURL.get(`/notifications?page=${page}`, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                }
            });
            return response?.data;
        }catch(error){
            const message = error?.response?.data?.message;
            return thunkApi.rejectWithValue(message);
        }
        
    }
)



export const getNotificationsSlice = createSlice({
    name: 'getNotifications',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(getNotifications.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(getNotifications.fulfilled, (state, action)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
            state.pagination= action.payload.pagination;
            state.notifications= action.payload.data;
            state.unreadNotifications= action.payload.unreadNotifications;
        }),
        builder.addCase(getNotifications.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
            state.pagination= {};
            state.unreadNotifications= 0;
            state.notifications= []
        })
    }
})

export default getNotificationsSlice.reducer