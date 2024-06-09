import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "@/Config";


const initialState = {
    error: false,
    success: false,
    loading: false
};


export const updatePackage = createAsyncThunk(
    'updatePackage',
    async (value, thunkApi) => {
        try{
            const response = await baseURL.patch(`/user/profile-update`, value, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
                }
            });
            return response?.data;
        }catch(error){
            const message = error?.response?.data?.message;
            return thunkApi.rejectWithValue(message);
        }
        
    }
)



export const updatePackageSlice = createSlice({
    name: 'updatePackage',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(updatePackage.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(updatePackage.fulfilled, (state)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
        }),
        builder.addCase(updatePackage.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
        })
    }
})

export default updatePackageSlice.reducer