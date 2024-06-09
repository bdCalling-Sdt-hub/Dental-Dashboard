import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "@/Config";


const initialState = {
    error: false,
    success: false,
    loading: false
};


export const deleteBanner = createAsyncThunk(
    'deleteBanner',
    async (value, thunkApi) => {
        try{
            const response = await baseURL.delete(`/rules/terms-and-conditions`, {
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