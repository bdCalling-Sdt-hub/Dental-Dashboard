import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../api/baseApi";


const initialState = {
    error: false,
    success: false,
    loading: false,
    admins: [],
};


export const getAdmin = createAsyncThunk(
    'getAdmin',
    async (_, thunkApi) => {
        try{
            const response = await baseURL.get(`/user/admin`, {
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



export const getAdminSlice = createSlice({
    name: 'getAdmin',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(getAdmin.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(getAdmin.fulfilled, (state, action)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
            state.admins = action.payload
        }),
        builder.addCase(getAdmin.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
            state.admins = [];
        })
    }
})

export default getAdminSlice.reducer