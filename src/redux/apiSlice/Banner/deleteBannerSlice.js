import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../api/baseApi";


const initialState = {
    error: false,
    success: false,
    loading: false
};


export const deleteBanner = createAsyncThunk(
    'deleteBanner',
    async (id, thunkApi) => {
        try{
            const response = await baseURL.delete(`/banner/${id}`, {
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



export const deleteBannerSlice = createSlice({
    name: 'deleteBanner',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(deleteBanner.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(deleteBanner.fulfilled, (state)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
        }),
        builder.addCase(deleteBanner.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
        })
    }
})

export default deleteBannerSlice.reducer