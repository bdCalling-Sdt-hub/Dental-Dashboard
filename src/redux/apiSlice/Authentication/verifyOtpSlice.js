import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../../Config";


const initialState = {
    error: false,
    success: false,
    loading: false,
};


export const verifyOtp = createAsyncThunk(
    'verifyOtp',
    async (value, thunkApi) => {
        console.log(value)
        try{
            const response = await baseURL.post(`/auth/otp-verify`, {email: value.email, code: value?.otp})
            localStorage.setItem("rToken", response?.data?.data)
            return response?.data?.data;
        }catch(error){
            console.log(error)
            const message = error?.response?.data?.message;
            return thunkApi.rejectWithValue(message);
        }
        
    }
)



export const verifyOtpSlice = createSlice({
    name: 'verifyOtp',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(verifyOtp.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(verifyOtp.fulfilled, (state, action)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
        }),
        builder.addCase(verifyOtp.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
        })
    }
})

export default verifyOtpSlice.reducer