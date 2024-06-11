import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../api/baseApi";


const initialState = {
    error: false,
    success: false,
    loading: false
};


export const updateSmartChecker = createAsyncThunk(
    'updateSmartChecker',
    async (value, thunkApi) => {
        const { id, data } = value;
        try{
            const response = await baseURL.patch(`/smart-check/${id}`, data, {
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



export const updateSmartCheckerSlice = createSlice({
    name: 'updateSmartChecker',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(updateSmartChecker.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(updateSmartChecker.fulfilled, (state)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
        }),
        builder.addCase(updateSmartChecker.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
        })
    }
})

export default updateSmartCheckerSlice.reducer