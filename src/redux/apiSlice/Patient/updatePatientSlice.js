import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../api/baseApi";


const initialState = {
    error: false,
    success: false,
    loading: false
};


export const updatePatient = createAsyncThunk(
    'updatePatient',
    async (value, thunkApi) => {
        const {id, data} = value;
        try{
            const response = await baseURL.patch(`/user/create-patient/${id}`, data, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
                }
            });
            return response?.data;
        }catch(error){
            const message = error?.response?.data?.message;
            return thunkApi.rejectWithValue(message);
        }
        
    }
)



export const updatePatientSlice = createSlice({
    name: 'updatePatient',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(updatePatient.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(updatePatient.fulfilled, (state)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
        }),
        builder.addCase(updatePatient.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
        })
    }
})

export default updatePatientSlice.reducer