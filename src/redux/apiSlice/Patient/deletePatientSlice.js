import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../api/baseApi";


const initialState = {
    error: false,
    success: false,
    loading: false
};


export const deletePatient = createAsyncThunk(
    'deletePatient',
    async (id, thunkApi) => {
        try{
            const response = await baseURL.patch(`/user/delete/${id}`, {}, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
                }
            });
            return response?.data?.message;
        }catch(error){
            const message = error?.response?.data?.message;
            return thunkApi.rejectWithValue(message);
        }
        
    }
)



export const deletePatientSlice = createSlice({
    name: 'deletePatient',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(deletePatient.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(deletePatient.fulfilled, (state)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
        }),
        builder.addCase(deletePatient.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
        })
    }
})

export default deletePatientSlice.reducer