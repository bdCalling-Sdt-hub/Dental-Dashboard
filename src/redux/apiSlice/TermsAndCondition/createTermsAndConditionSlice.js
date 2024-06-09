import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "@/Config";


const initialState = {
    error: false,
    success: false,
    loading: false
};


export const createTermsAndConditions = createAsyncThunk(
    'createTermsAndConditions',
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



export const createTermsAndConditionsSlice = createSlice({
    name: 'createTermsAndConditions',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(createTermsAndConditions.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(createTermsAndConditions.fulfilled, (state)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
        }),
        builder.addCase(createTermsAndConditions.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
        })
    }
})

export default createTermsAndConditionsSlice.reducer