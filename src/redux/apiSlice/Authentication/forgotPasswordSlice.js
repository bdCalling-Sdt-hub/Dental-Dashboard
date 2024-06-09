import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../../Config";


const initialState = {
    error: false,
    success: false,
    loading: false,
};


export const forgotPassword = createAsyncThunk(
    'forgotPassword',
    async (value, thunkApi) => {
        console.log(value)
        try{
            const response = await baseURL.post(`/auth/forget-password`, {...value});
            console.log(response)
            return response?.data?.message;
        }catch(error){
            console.log(error)
            const message = error?.response?.data?.message;
            return thunkApi.rejectWithValue(message);
        }
        
    }
)



export const forgotPasswordSlice = createSlice({
    name: 'forgotPassword',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(forgotPassword.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(forgotPassword.fulfilled, (state)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
        }),
        builder.addCase(forgotPassword.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
        })
    }
})

export default forgotPasswordSlice.reducer