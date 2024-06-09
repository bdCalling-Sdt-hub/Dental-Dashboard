import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "@/Config";


const initialState = {
    error: false,
    success: false,
    loading: false
};


export const createFaq = createAsyncThunk(
    'createFaq',
    async (value, thunkApi) => {
        try{
            const response = await baseURL.get(`/faq`, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });
            return response?.data?.data;
        }catch(error){
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