import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../api/baseApi";


const initialState = {
    error: false,
    success: false,
    loading: false
};


export const addContact = createAsyncThunk(
    'addContact',
    async (value, thunkApi) => {
        try{
            const response = await baseURL.post(`/contact`, {...value}, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                }
            });
            return response?.data?.message;
        }catch(error){
            const message = error?.response?.data?.message;
            return thunkApi.rejectWithValue(message);
        }
        
    }
)



export const addContactSlice = createSlice({
    name: 'addContact',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(addContact.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(addContact.fulfilled, (state)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
        }),
        builder.addCase(addContact.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
        })
    }
})

export default addContactSlice.reducer