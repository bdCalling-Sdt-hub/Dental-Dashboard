import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../api/baseApi";


const initialState = {
    error: false,
    success: false,
    loading: false
};


export const deleteOffer = createAsyncThunk(
    'deleteOffer',
    async (id, thunkApi) => {
        try{
            const response = await baseURL.delete(`/offer/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                }
            });
            return response?.data?.message;
        }catch(error){
            console.log(error)
            const message = error?.response?.data?.message;
            return thunkApi.rejectWithValue(message);
        }
        
    }
)



export const deleteOfferSlice = createSlice({
    name: 'deleteOffer',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(deleteOffer.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(deleteOffer.fulfilled, (state)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
        }),
        builder.addCase(deleteOffer.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
        })
    }
})

export default deleteOfferSlice.reducer