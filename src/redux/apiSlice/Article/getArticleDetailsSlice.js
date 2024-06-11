import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../api/baseApi";


const initialState = {
    error: false,
    success: false,
    loading: false,
    details: {}
};


export const getArticleDetails = createAsyncThunk(
    'getArticleDetails',
    async (id, thunkApi) => {
        try{
            const response = await baseURL.get(`/article/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                }
            });
            return response?.data.data;
        }catch(error){
            const message = error?.response?.data?.message;
            return thunkApi.rejectWithValue(message);
        }
        
    }
)



export const getArticleDetailsSlice = createSlice({
    name: 'getArticleDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(getArticleDetails.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(getArticleDetails.fulfilled, (state, action)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
            state.details= action.payload;
        }),
        builder.addCase(getArticleDetails.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
            state.details= {};
        })
    }
})

export default getArticleDetailsSlice.reducer