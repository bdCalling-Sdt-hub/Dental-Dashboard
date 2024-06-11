import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../api/baseApi";


const initialState = {
    error: false,
    success: false,
    loading: false
};


export const updateTermsAndConditions = createAsyncThunk(
    'updateTermsAndConditions',
    async (value, thunkApi) => {
        try{
            const response = await baseURL.patch(`/rule/terms-and-conditions`, value, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                }
            });
            return response?.data?.message;
        }catch(error){
            const message = error?.response?.data?.message;
            return thunkApi.rejectWithValue(message);
        }
        
    }
)



export const updateTermsAndConditionsSlice = createSlice({
    name: 'updateTermsAndConditions',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(updateTermsAndConditions.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(updateTermsAndConditions.fulfilled, (state)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
        }),
        builder.addCase(updateTermsAndConditions.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
        })
    }
})

export default updateTermsAndConditionsSlice.reducer