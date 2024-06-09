import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "@/Config";


const initialState = {
    error: false,
    success: false,
    loading: false,
    notifications: []
};


export const getNotifications = createAsyncThunk(
    'getNotifications',
    async (value, thunkApi) => {
        try{
            const response = await baseURL.get(`/user/profile`, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
                }
            });
            return response?.data?.data;
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
            state.notifications= action.payload
        }),
        builder.addCase(getNotifications.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
            state.notifications= []
        })
    }
})

export default getNotificationsSlice.reducer