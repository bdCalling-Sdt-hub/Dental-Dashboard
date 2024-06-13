import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../api/baseApi";


const initialState = {
    error: false,
    success: false,
    loading: false
};


export const createPatient = createAsyncThunk(
    'createPatient',
    async (value, thunkApi) => {
        try{
            const response = await baseURL.post(`/user/create-patient`, {...value}, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
                }
            });
            console.log(response)
            return response?.data.message;
        }catch(error){
            const message = error?.response?.data?.message;
            return thunkApi.rejectWithValue(message);
        }
        
    }
)



export const createPatientSlice = createSlice({
    name: 'createPatient',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(createPatient.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(createPatient.fulfilled, (state)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
        }),
        builder.addCase(createPatient.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
        })
    }
})

export default createPatientSlice.reducer