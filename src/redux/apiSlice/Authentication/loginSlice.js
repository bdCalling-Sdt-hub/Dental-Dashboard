import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../api/baseApi";


const initialState = {
    error: false,
    success: false,
    loading: false,
};


export const login = createAsyncThunk(
    'login',
    async (value, thunkApi) => {
        try{
            const response = await baseURL.post(`/auth/login`, {...value});
            return response?.data?.data;
        }catch(error){
            console.log(error)
            const message = error?.response?.data?.message;
            return thunkApi.rejectWithValue(message);
        }
        
    }
)



export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(login.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(login.fulfilled, (state)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
        }),
        builder.addCase(login.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
        })
    }
})

export default loginSlice.reducer