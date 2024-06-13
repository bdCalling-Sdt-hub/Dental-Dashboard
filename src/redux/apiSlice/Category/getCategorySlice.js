import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../api/baseApi";


const initialState = {
    error: false,
    success: false,
    loading: false,
    categories: []
};


export const getCategory = createAsyncThunk(
    'getCategory',
    async (search, thunkApi) => {
        try{
            const params = new URLSearchParams();
            if (search) params.append('search', search);

            const response = await baseURL.get(`/category?${params.toString()}`, {
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



export const getCategorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(getCategory.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(getCategory.fulfilled, (state, action)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
            state.categories= action.payload
        }),
        builder.addCase(getCategory.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
            state.categories= []
        })
    }
})

export default getCategorySlice.reducer