import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "@/Config";


const initialState = {
    error: false,
    success: false,
    loading: false,
    banners: []
};


export const getBanner = createAsyncThunk(
    'getBanner',
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



export const getBannerSlice = createSlice({
    name: 'getBanner',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(getBanner.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(getBanner.fulfilled, (state,action)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
            state.banners= action.payload;
        }),
        builder.addCase(getBanner.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
            state.banners= [];
        })
    }
})

export default getBannerSlice.reducer