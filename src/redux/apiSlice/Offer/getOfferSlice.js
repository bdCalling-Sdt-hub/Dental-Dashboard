import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../api/baseApi";


const initialState = {
    error: false,
    success: false,
    loading: false,
    offers: []
};


export const getOffers = createAsyncThunk(
    'getOffers',
    async (value, thunkApi) => {
        try{
            const response = await baseURL.get(`/offer`, {
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



export const getOffersSlice = createSlice({
    name: 'getOffers',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(getOffers.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(getOffers.fulfilled, (state,action)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
            state.offers= action.payload;
        }),
        builder.addCase(getOffers.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
            state.offers= [];
        })
    }
})

export default getOffersSlice.reducer