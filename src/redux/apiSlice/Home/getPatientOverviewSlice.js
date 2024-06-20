import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../api/baseApi";


const initialState = {
    error: false,
    success: false,
    loading: false,
    overview: []
};


export const getPatientOverview = createAsyncThunk(
    'getPatientOverview',
    async (value, thunkApi) => {
        try{
            const response = await baseURL.get(`/user/analysis`, {
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



export const getPatientOverviewSlice = createSlice({
    name: 'getPatientOverview',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(getPatientOverview.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(getPatientOverview.fulfilled, (state, action)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
            state.overview= action.payload;
        }),
        builder.addCase(getPatientOverview.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
            state.overview= [];
        })
    }
})

export default getPatientOverviewSlice.reducer