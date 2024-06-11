import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../api/baseApi";


const initialState = {
    error: false,
    success: false,
    loading: false
};


export const createSmartChecker = createAsyncThunk(
    'createSmartChecker',
    async (value, thunkApi) => {
        try{
            const response = await baseURL.post(`/smart-check/create-smart-check`, value, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                }
            });
            return response?.data?.message;
        }catch(error){
            const message = error?.response?.data?.message;
            return thunkApi.rejectWithValue(message);
        }
        
    }
)



export const createSmartCheckerSlice = createSlice({
    name: 'createSmartChecker',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(createSmartChecker.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(createSmartChecker.fulfilled, (state)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
        }),
        builder.addCase(createSmartChecker.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
        })
    }
})

export default createSmartCheckerSlice.reducer