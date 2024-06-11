import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../api/baseApi";


const initialState = {
    error: false,
    success: false,
    loading: false,
    articles: [],
    pagination: {}
};


export const getArticle = createAsyncThunk(
    'getArticle',
    async (value, thunkApi) => {
        try{
            const response = await baseURL.get(`/article/category/${value}`, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                }
            });
            return response?.data;
        }catch(error){
            const message = error?.response?.data?.message;
            return thunkApi.rejectWithValue(message);
        }
        
    }
)



export const getArticleSlice = createSlice({
    name: 'getArticle',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(getArticle.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(getArticle.fulfilled, (state, action)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
            state.articles= action.payload.data;
            state.pagination= action.payload.paginaton;
        }),
        builder.addCase(getArticle.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
            state.articles= [];
            state.pagination= {};
        })
    }
})

export default getArticleSlice.reducer