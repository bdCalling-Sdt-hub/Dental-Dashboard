import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../api/baseApi";


const initialState = {
    error: false,
    success: false,
    loading: false,
    packages: []
};


export const getPackage = createAsyncThunk(
    'getPackage',
    async (_, thunkApi) => {
        try{
            const response = await baseURL.get(`/package`, {
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



export const getPackageSlice = createSlice({
    name: 'getPackage',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(getPackage.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(getPackage.fulfilled, (state, action)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
            state.packages= action.payload;
        }),
        builder.addCase(getPackage.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
            state.packages= [];
        })
    }
})

export default getPackageSlice.reducer