import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../api/baseApi";


const initialState = {
    error: false,
    success: false,
    loading: false,
    faqs: []
};


export const getFaq = createAsyncThunk(
    'getFaq',
    async (_, thunkApi) => {
        try{
            const response = await baseURL.get(`/faq`, {
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



export const getFaqSlice = createSlice({
    name: 'getFaq',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(getFaq.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(getFaq.fulfilled, (state, action)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
            state.faqs= action.payload
        }),
        builder.addCase(getFaq.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
            state.faqs= []
        })
    }
})

export default getFaqSlice.reducer