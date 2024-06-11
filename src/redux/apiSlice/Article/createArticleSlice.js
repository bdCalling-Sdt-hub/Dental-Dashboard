import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../api/baseApi";


const initialState = {
    error: false,
    success: false,
    loading: false,
};


export const createArticle = createAsyncThunk(
    'createArticle',
    async (value, thunkApi) => {
        try{
            const response = await baseURL.get(`/article/create-article`, value, {
                headers: {
                    "Content-Type": "multipart/form-data",
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



export const createArticleSlice = createSlice({
    name: 'createArticle',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(createArticle.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(createArticle.fulfilled, (state)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
        }),
        builder.addCase(createArticle.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
        })
    }
})

export default createArticleSlice.reducer