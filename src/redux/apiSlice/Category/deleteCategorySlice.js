import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../api/baseApi";


const initialState = {
    error: false,
    success: false,
    loading: false
};


export const deleteCategory = createAsyncThunk(
    'deleteCategory',
    async (id, thunkApi) => {
        try{
            const response = await baseURL.delete(`/category/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                }
            });
            console.log(response)
            return response?.data?.message;
        }catch(error){
            const message = error?.response?.data?.message;
            return thunkApi.rejectWithValue(message);
        }
        
    }
)



export const deleteCategorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(deleteCategory.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(deleteCategory.fulfilled, (state)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
        }),
        builder.addCase(deleteCategory.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
        })
    }
})

export default deleteCategorySlice.reducer