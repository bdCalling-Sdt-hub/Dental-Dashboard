import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "@/Config";


const initialState = {
    error: false,
    success: false,
    loading: false
};


export const createSmartChecker = createAsyncThunk(
    'createSmartChecker',
    async (value, thunkApi) => {
        try{
            const response = await baseURL.get(`/rules/terms-and-conditions`, {
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



export const createSmartCheckerSlice = createSlice({
    name: 'createSmartChecker',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(createSmartChecker.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(createSmartChecker.fulfilled, (state)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
        }),
        builder.addCase(createSmartChecker.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
        })
    }
})

export default createSmartCheckerSlice.reducer