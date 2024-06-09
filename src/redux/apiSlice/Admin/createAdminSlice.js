import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "@/Config";


const initialState = {
    error: false,
    success: false,
    loading: false
};


export const createAdmin = createAsyncThunk(
    'createAdmin',
    async (value, thunkApi) => {
        try{
            const response = await baseURL.post(`/user/profile-update`, value, {
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



export const createAdminSlice = createSlice({
    name: 'createAdmin',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(createAdmin.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(createAdmin.fulfilled, (state)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
        }),
        builder.addCase(createAdmin.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
        })
    }
})

export default createAdminSlice.reducer