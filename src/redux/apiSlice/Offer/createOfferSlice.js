import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../api/baseApi";


const initialState = {
    error: false,
    success: false,
    loading: false
};


export const createOffer = createAsyncThunk(
    'createOffer',
    async (value, thunkApi) => {
        try{
            const response = await baseURL.post(`/offer/create-offer`, value, {
                headers: {
                    "Content-Type": "multipart/form-data",
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



export const createOfferSlice = createSlice({
    name: 'createOffer',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(createOffer.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(createOffer.fulfilled, (state)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
        }),
        builder.addCase(createOffer.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
        })
    }
})

export default createOfferSlice.reducer