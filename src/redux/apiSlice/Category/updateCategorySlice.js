import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../api/baseApi";


const initialState = {
    error: false,
    success: false,
    loading: false
};


export const updateCategory = createAsyncThunk(
    'updateCategory',
    async (value, thunkApi) => {
        const {id, data} = value;
        try{
            const response = await baseURL.patch(`/category/${id}`, data, {
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



export const updateCategorySlice = createSlice({
    name: 'updateCategory',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(updateCategory.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(updateCategory.fulfilled, (state)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
        }),
        builder.addCase(updateCategory.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
        })
    }
})

export default updateCategorySlice.reducer