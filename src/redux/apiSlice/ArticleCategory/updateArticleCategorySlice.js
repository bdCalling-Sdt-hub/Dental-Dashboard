import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../api/baseApi";


const initialState = {
    error: false,
    success: false,
    loading: false
};


export const updateArticleCategory = createAsyncThunk(
    'updateArticleCategory',
    async (value, thunkApi) => {
        const {id, data} = value;
        try{
            const response = await baseURL.patch(`/article-category/${id}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
                }
            });
            return response?.data?.message;
        }catch(error){
            const message = error?.response?.data?.message;
            return thunkApi.rejectWithValue(message);
        }
        
    }
)



export const updateArticleCategorySlice = createSlice({
    name: 'updateArticleCategory',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(updateArticleCategory.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(updateArticleCategory.fulfilled, (state)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
        }),
        builder.addCase(updateArticleCategory.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
        })
    }
})

export default updateArticleCategorySlice.reducer