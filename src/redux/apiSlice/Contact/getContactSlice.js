import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../api/baseApi";


const initialState = {
    error: false,
    success: false,
    loading: false,
    contact: {}
};


export const getContact = createAsyncThunk(
    'getContact',
    async (value, thunkApi) => {
        try{
            const response = await baseURL.get(`/contact`, {
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



export const getContactSlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(getContact.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(getContact.fulfilled, (state, action)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
            state.contact= action.payload
        }),
        builder.addCase(getContact.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
            state.contact= {}
        })
    }
})

export default getContactSlice.reducer