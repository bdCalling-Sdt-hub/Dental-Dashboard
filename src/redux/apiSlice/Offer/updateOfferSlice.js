import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../api/baseApi";


const initialState = {
    error: false,
    success: false,
    loading: false
};


export const updateOffer = createAsyncThunk(
    'updateOffer',
    async (value, thunkApi) => {
        const {id, data} = value;
        try{
            const response = await baseURL.patch(`/offer/${id}`, data, {
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