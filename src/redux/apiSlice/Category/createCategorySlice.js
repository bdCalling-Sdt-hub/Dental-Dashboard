import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../api/baseApi";


const initialState = {
    error: false,
    success: false,
    loading: false
};


export const createCategory = createAsyncThunk(
    'createCategory',
    async (value, thunkApi) => {
        try{
            const response = await baseURL.post(`/category/create-category`, value, {
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



export const createCategorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(createCategory.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(createCategory.fulfilled, (state)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
        }),
        builder.addCase(createCategory.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
        })
    }
})

export default createCategorySlice.reducer