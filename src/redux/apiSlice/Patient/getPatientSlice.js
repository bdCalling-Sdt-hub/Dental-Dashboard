import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../api/baseApi";


const initialState = {
    error: false,
    success: false,
    loading: false,
    patients: [],
    pagination: {}
};


export const getPatient = createAsyncThunk(
    'getPatient',
    async (value, thunkApi) => {
        const { search, category, page } = value;
        try{
            const params = new URLSearchParams();

            if (page) params.append('page', page);
            if (search) params.append('search', search);
            if (category) params.append('category', category);

            const response = await baseURL.get(`/user/patient?${params.toString()}`, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${JSON.parse(localStorage.getItem("token")) }`,
                }
            });
            return response?.data;
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
            state.patients= action.payload.data;
            state.pagination= action.payload.pagination;
        }),
        builder.addCase(getPatient.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
            state.patients= [];
            state.pagination= {};
        })
    }
})

export default getPatientSlice.reducer