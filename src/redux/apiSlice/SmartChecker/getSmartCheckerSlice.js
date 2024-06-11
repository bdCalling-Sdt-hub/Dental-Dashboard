import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../api/baseApi";


const initialState = {
    error: false,
    success: false,
    loading: false,
    smartCheckers: []
};


export const getSmartChecker = createAsyncThunk(
    'getSmartChecker',
    async (value, thunkApi) => {
        try{
            const response = await baseURL.get(`/smart-check`, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                }
            });
            return response?.data?.data;
        }catch(error){
            const message = error?.response?.data?.message;
            return thunkApi.rejectWithValue(message);
        }
        
    }
)



export const getSmartCheckerSlice = createSlice({
    name: 'getSmartChecker',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(getSmartChecker.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(getSmartChecker.fulfilled, (state, action)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
            state.smartCheckers= action.payload
        }),
        builder.addCase(getSmartChecker.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
            state.smartCheckers= []
        })
    }
})

export default getSmartCheckerSlice.reducer