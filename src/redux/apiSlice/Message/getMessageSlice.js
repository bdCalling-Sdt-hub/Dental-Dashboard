import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "@/Config";


const initialState = {
    error: false,
    success: false,
    loading: false,
    messages: []
};


export const getMessage = createAsyncThunk(
    'getMessage',
    async (value, thunkApi) => {
        try{
            const response = await baseURL.get(`/user/profile`, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
                }
            });
            return response?.data?.data;
        }catch(error){
            const message = error?.response?.data?.message;
            return thunkApi.rejectWithValue(message);
        }
        
    }
)



export const getMessageSlice = createSlice({
    name: 'getMessage',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(getMessage.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(getMessage.fulfilled, (state, action)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
            state.messages= action.payload
        }),
        builder.addCase(getMessage.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
            state.messages= []
        })
    }
})

export default getMessageSlice.reducer