import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../api/baseApi";


const initialState = {
    error: false,
    success: false,
    loading: false
};


export const updateAbout = createAsyncThunk(
    'updateAbout',
    async ( value, thunkApi) => {
        try{
            const response = await baseURL.patch(`/rule/about`,  value , {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
                }
            });
            return response?.data?.message;
        }catch(error){
            const message = error?.response?.data?.message;
            return thunkApi.rejectWithValue(message);
        }
        
    }
)



export const updateAboutSlice = createSlice({
    name: 'updateAbout',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(updateAbout.pending, (state)=> {
            state.loading= true;
        }),
        builder.addCase(updateAbout.fulfilled, (state)=> {
            state.error= false;
            state.success= true;
            state.loading= false;
        }),
        builder.addCase(updateAbout.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
        })
    }
})

export default updateAboutSlice.reducer