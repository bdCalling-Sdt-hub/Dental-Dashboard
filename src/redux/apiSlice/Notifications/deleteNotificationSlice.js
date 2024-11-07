import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../api/baseApi";


const initialState = {
    error: false,
    success: false,
    loading: false
};


export const deleteNotification = createAsyncThunk(
    'deleteNotification',
    async (id, thunkApi) => {
        try{
            const response = await baseURL.delete(`/notifications/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            return response?.data?.data;
        }catch(error){
            const message = error?.response?.data?.message;
            return thunkApi.rejectWithValue(message);
        }
        
    }
)



export const deleteNotificationSlice = createSlice({
    name: 'deleteNotification',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(deleteNotification.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(deleteNotification.fulfilled, (state)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
        }),
        builder.addCase(deleteNotification.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
        })
    }
})

export default deleteNotificationSlice.reducer