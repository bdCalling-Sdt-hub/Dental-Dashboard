import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "@/Config";


const initialState = {
    error: false,
    success: false,
    loading: false,
    about: {}
};


export const getAbout = createAsyncThunk(
    'getAbout',
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
            state.about= action.payload;
        }),
        builder.addCase(getAbout.rejected, (state)=> {
            state.error= true;
            state.success= false;
            state.loading= false;
        })
    }
})

export default getAboutSlice.reducer