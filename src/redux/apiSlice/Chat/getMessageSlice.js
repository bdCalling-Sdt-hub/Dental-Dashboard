import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../api/baseApi";


const initialState = {
    error: false,
    success: false,
    loading: false,
    messages: []
};


export const getMessages = createAsyncThunk(
    'getMessages',
    async (id, thunkApi) => {
        try{
            const response = await baseURL.get(`/message/chatId/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                }
            });
            
            return response?.data?.data;
        }catch(error){
            console.log(error)
            const message = error?.response?.data?.message;
            return thunkApi.rejectWithValue(message);
        }
        
    }
)



export const getContactSlice = createSlice({
    name: 'getMessages',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(getMessages.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(getMessages.fulfilled, (state, action)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
            state.messages= action.payload
        }),
        builder.addCase(getMessages.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
            state.messages= []
        })
    }
})

export default getContactSlice.reducer