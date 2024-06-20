import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../api/baseApi";


const initialState = {
    error: false,
    success: false,
    loading: false
};


export const sendMail = createAsyncThunk(
    'sendMail',
    async (value, thunkApi) => {
        try{
            const response = await baseURL.post(`/user/send-mail`, {...value}, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
                }
            });
            console.log(response)
            return response?.data.message;
        }catch(error){
            console.log(error)
            const message = error?.response?.data?.message;
            return thunkApi.rejectWithValue(message);
        }
        
    }
)



export const createPatientSlice = createSlice({
    name: 'sendMail',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(sendMail.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(sendMail.fulfilled, (state)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
        }),
        builder.addCase(sendMail.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
        })
    }
})

export default createPatientSlice.reducer