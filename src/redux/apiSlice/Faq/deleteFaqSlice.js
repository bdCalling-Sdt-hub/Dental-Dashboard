import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "@/Config";


const initialState = {
    error: false,
    success: false,
    loading: false
};


export const deleteFaq = createAsyncThunk(
    'deleteFaq',
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



export const deleteFaqSlice = createSlice({
    name: 'deleteFaq',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(deleteFaq.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(deleteFaq.fulfilled, (state)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
        }),
        builder.addCase(deleteFaq.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
        })
    }
})

export default deleteFaqSlice.reducer