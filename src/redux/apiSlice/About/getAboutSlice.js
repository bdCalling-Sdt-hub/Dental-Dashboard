import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../api/baseApi";


const initialState = {
    error: false,
    success: false,
    loading: false,
    about: {}
};


export const getAbout = createAsyncThunk(
    'getAbout',
    async (_, thunkApi) => {
        try{
            const response = await baseURL.get(`/rule/about`, {
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



export const getAboutSlice = createSlice({
    name: 'getAbout',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(getAbout.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(getAbout.fulfilled, (state,action)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
            state.about=action.payload;
        }),
        builder.addCase(getAbout.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
            state.about= {};
        })
    }
})

export default getAboutSlice.reducer