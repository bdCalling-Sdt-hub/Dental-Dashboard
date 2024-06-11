import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../api/baseApi";


const initialState = {
    error: false,
    success: false,
    loading: false
};


export const updateContact = createAsyncThunk(
    'updateContact',
    async (value, thunkApi) => {
        const {id, data} = value;
        try{
            const response = await baseURL.patch(`/contact/${id}`, data, {
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



export const updateContactSlice = createSlice({
    name: 'updateContact',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(updateContact.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(updateContact.fulfilled, (state)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
        }),
        builder.addCase(updateContact.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
        })
    }
})

export default updateContactSlice.reducer