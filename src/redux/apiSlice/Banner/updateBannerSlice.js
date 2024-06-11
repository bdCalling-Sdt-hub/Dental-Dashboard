import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../api/baseApi";


const initialState = {
    error: false,
    success: false,
    loading: false
};


export const updateBanner = createAsyncThunk(
    'updateBanner',
    async (value, thunkApi) => {
        const {id, data} = value
        try{
            const response = await baseURL.patch(`/banner/${id}`, data, {
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



export const updateBannerSlice = createSlice({
    name: 'updateBanner',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(updateBanner.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(updateBanner.fulfilled, (state)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
        }),
        builder.addCase(updateBanner.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
        })
    }
})

export default updateBannerSlice.reducer