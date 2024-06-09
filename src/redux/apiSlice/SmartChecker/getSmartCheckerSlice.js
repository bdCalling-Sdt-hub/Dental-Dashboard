import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "@/Config";


const initialState = {
    error: false,
    success: false,
    loading: false,
    smartCheckers: []
};


export const updateSmartChecker = createAsyncThunk(
    'updateSmartChecker',
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



export const updateSmartCheckerSlice = createSlice({
    name: 'updateSmartChecker',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(updateSmartChecker.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(updateSmartChecker.fulfilled, (state, action)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
            state.smartCheckers= action.payload
        }),
        builder.addCase(updateSmartChecker.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
            state.smartCheckers= []
        })
    }
})

export default updateSmartCheckerSlice.reducer