import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "@/Config";


const initialState = {
    error: false,
    success: false,
    loading: false
};


export const updateOffer = createAsyncThunk(
    'updateOffer',
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



export const updateOfferSlice = createSlice({
    name: 'updateOffer',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(updateOffer.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(updateOffer.fulfilled, (state)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
        }),
        builder.addCase(updateOffer.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
        })
    }
})

export default updateOfferSlice.reducer