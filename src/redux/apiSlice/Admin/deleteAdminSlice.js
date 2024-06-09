import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "@/Config";


const initialState = {
    error: false,
    success: false,
    loading: false
};


export const deleteAdmin = createAsyncThunk(
    'deleteAdmin',
    async (value, thunkApi) => {
        try{
            const response = await baseURL.delete(`/user/profile-update`, value, {
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



export const deleteAdminSlice = createSlice({
    name: 'deleteAdmin',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(deleteAdmin.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(deleteAdmin.fulfilled, (state)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
        }),
        builder.addCase(deleteAdmin.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
        })
    }
})

export default deleteAdminSlice.reducer