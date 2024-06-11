import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../api/baseApi";


const initialState = {
    error: false,
    success: false,
    loading: false
};


export const deleteSmartChecker = createAsyncThunk(
    'deleteSmartChecker',
    async (id, thunkApi) => {
        try{
            const response = await baseURL.delete(`/smart-check/${id}`, {
                headers: {
                    "Content-Type": "application/json",
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



export const deleteSmartCheckerSlice = createSlice({
    name: 'deleteSmartChecker',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(deleteSmartChecker.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(deleteSmartChecker.fulfilled, (state)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
        }),
        builder.addCase(deleteSmartChecker.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
        })
    }
})

export default deleteSmartCheckerSlice.reducer