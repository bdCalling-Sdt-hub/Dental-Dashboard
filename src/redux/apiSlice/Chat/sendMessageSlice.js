import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../api/baseApi";


const initialState = {
    error: false,
    success: false,
    loading: false
};


export const sendMessage = createAsyncThunk(
    'sendMessage',
    async (value, thunkApi) => {
        try{
            const response = await baseURL.post(`/message/send-message`, value, {
                headers: {
                    "Content-Type": "multipart/form-data",
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



export const getContactSlice = createSlice({
    name: 'sendMessage',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(sendMessage.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(sendMessage.fulfilled, (state)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
        }),
        builder.addCase(sendMessage.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
        })
    }
})

export default getContactSlice.reducer