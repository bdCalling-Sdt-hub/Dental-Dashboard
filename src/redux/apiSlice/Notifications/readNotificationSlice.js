import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "@/Config";


const initialState = {
    error: false,
    success: false,
    loading: false
};


export const readNotification = createAsyncThunk(
    'readNotification',
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



export const readNotificationSlice = createSlice({
    name: 'readNotification',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(readNotification.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(readNotification.fulfilled, (state)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
        }),
        builder.addCase(readNotification.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
        })
    }
})

export default readNotificationSlice.reducer