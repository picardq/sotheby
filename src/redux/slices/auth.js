import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios.js';

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
    const { data } = await axios.post('/auth/login', params);
    return data;
});

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const { data } = await axios.get('/auth/me');
    return data;
});

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (userData) => {
    const { data } = await axios.post('/auth/register', userData);
    return data;
});

const initialState = {
    data: null,
    status: 'loaded',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
            
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuth.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchAuth.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchAuth.rejected, (state) => {
                state.status = 'failed';
                state.data = null;
            })
            .addCase(fetchAuthMe.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchAuthMe.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchAuthMe.rejected, (state) => {
                state.status = 'failed';
                state.data = null;
            }).addCase(fetchRegister.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchRegister.rejected, (state) => {
                state.status = 'failed';
                state.data = null;
            });
    },
});
export const selectIsAuth = state => Boolean(state.auth.data)

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
