import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../api/baseApi";


const initialState = {
    error: false,
    success: false,
    loading: false
};


export const updateProfile = createAsyncThunk(
    'updateProfile',
    async (value, thunkApi) => {
        try{
            const response = await baseURL.patch(`/admin/profile-update`, value, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
                }
            });
            
            return response?.data?.message;
        }catch(error){
            console.log(error)
            const message = error?.response?.data?.message;
            return thunkApi.rejectWithValue(message);
        }
        
    }
)



export const updateProfileSlice = createSlice({
    name: 'updateProfile',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(updateProfile.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(updateProfile.fulfilled, (state)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
        }),
        builder.addCase(updateProfile.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
        })
    }
})

export default updateProfileSlice.reducer