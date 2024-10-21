import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../api/baseApi";


const initialState = {
    error: false,
    success: false,
    loading: false
};


export const readMessage = createAsyncThunk(
    'readMessage',
    async (id, thunkApi) => {
        try{
            // console.log(JSON.parse(localStorage.getItem('token')))
            if(JSON.parse(localStorage.getItem('token'))){
                const response = await baseURL.patch(`/chat/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                    }
                });
                
                return response?.data?.message;
            }
            
        }catch(error){
            const message = error?.response?.data?.message;
            return thunkApi.rejectWithValue(message);
        }
        
    }
)



export const readMessageSlice = createSlice({
    name: 'readMessage',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(readMessage.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(readMessage.fulfilled, (state)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
        }),
        builder.addCase(readMessage.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
        })
    }
})

export default readMessage.reducer