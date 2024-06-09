import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "@/Config";


const initialState = {
    error: false,
    success: false,
    loading: false,
};


export const updatePrivacyPolicy = createAsyncThunk(
    'updatePrivacyPolicy',
    async (value, thunkApi) => {
        try{
            const response = await baseURL.get(`/rules/privacy-policy`, {
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



export const updatePrivacyPolicySlice = createSlice({
    name: 'updatePrivacyPolicy',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(updatePrivacyPolicy.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(updatePrivacyPolicy.fulfilled, (state)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
        }),
        builder.addCase(updatePrivacyPolicy.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
        })
    }
})

export default updatePrivacyPolicySlice.reducer