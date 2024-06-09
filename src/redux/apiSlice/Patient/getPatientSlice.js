import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "@/Config";


const initialState = {
    error: false,
    success: false,
    loading: false,
    patients: []
};


export const getPatient = createAsyncThunk(
    'getPatient',
    async (value, thunkApi) => {
        try{
            const response = await baseURL.get(`/rules/about`, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });
            return response?.data?.data;
        }catch(error){
            const message = error?.response?.data?.message;
            return thunkApi.rejectWithValue(message);
        }
        
    }
)



export const getPatientSlice = createSlice({
    name: 'getPatient',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(getPatient.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(getPatient.fulfilled, (state, action)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
            state.patients= action.payload
        }),
        builder.addCase(getPatient.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
            state.patients= []
        })
    }
})

export default getPatientSlice.reducer