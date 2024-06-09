import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../../Config";


const initialState = {
    error: false,
    success: false,
    loading: false,
};


export const login = createAsyncThunk(
    'login',
    async (value, thunkApi) => {
        try{
            const response = await baseURL.post(`/auth/login`, {...value}, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });
            return response?.data?.data;
        }catch(error){
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
        builder.addCase(login.fulfilled, (state, action)=> {
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