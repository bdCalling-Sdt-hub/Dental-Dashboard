import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../api/baseApi";


const initialState = {
    error: false,
    success: false,
    loading: false
};


export const createFaq = createAsyncThunk(
    'createFaq',
    async (value, thunkApi) => {
        try{
            const response = await baseURL.post(`/faq/create-faq`, {...value}, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                }
            });
            return response?.data?.message;
        }catch(error){
            console.log(error)
            const message = error?.response?.data?.message;
            return thunkApi.rejectWithValue(message);
        }
        
    }
)



export const createFaqSlice = createSlice({
    name: 'createFaq',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(createFaq.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(createFaq.fulfilled, (state)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
        }),
        builder.addCase(createFaq.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
        })
    }
})

export default createFaqSlice.reducer