import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../api/baseApi";


const initialState = {
    error: false,
    success: false,
    loading: false,
    patients: []
};


export const getPatientChat = createAsyncThunk(
    'getPatientChat',
    async (value, thunkApi) => {
        try{
            const response = await baseURL.get(`/chat/patient-chat-list`, {
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
        builder.addCase(getPatientChat.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(getPatientChat.fulfilled, (state, action)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
            state.patients= action.payload
        }),
        builder.addCase(getPatientChat.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
            state.patients= []
        })
    }
})

export default getContactSlice.reducer