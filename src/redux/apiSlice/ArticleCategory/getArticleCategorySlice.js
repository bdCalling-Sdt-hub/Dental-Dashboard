import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../api/baseApi";


const initialState = {
    error: false,
    success: false,
    loading: false,
    articleCategory: []
};


export const getArticleCategory = createAsyncThunk(
    'getArticleCategory',
    async (value, thunkApi) => {
        try{
            const response = await baseURL.get(`/article-category`, {
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



export const getArticleCategorySlice = createSlice({
    name: 'getArticleCategory',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(getArticleCategory.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(getArticleCategory.fulfilled, (state, action)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
            state.articleCategory= action.payload;
        }),
        builder.addCase(getArticleCategory.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
            state.articleCategory= [];
        })
    }
})

export default getArticleCategorySlice.reducer