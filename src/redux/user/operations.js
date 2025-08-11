import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1';

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
  },
});

export const fetchToken = createAsyncThunk(
  'users/fetchToken',
  async (_, thunkAPI) => {
    try {
      const res = await axiosClient.post('/token');
      return res.data.token;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchPositions = createAsyncThunk(
  'users/fetchPositions',
  async (_, thunkAPI) => {
    try {
      const res = await axiosClient.get('/positions');
      return res.data.positions;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async ({ page = 1, count = 5 } = {}, thunkAPI) => {
    try {
      const res = await axiosClient.get('/users', { params: { page, count } });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (id, thunkAPI) => {
    try {
      const res = await axiosClient.get(`/users/${id}`);
      return res.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'users/registerUser',
  async (formFields, { getState, dispatch, thunkAPI }) => {
    try {
      const { token: tokenState } = getState().users;
      let token = tokenState.value;

      if (!token) {
        const tokenResult = await dispatch(fetchToken());
        if (fetchToken.rejected.match(tokenResult)) {
          return thunkAPI.rejectWithValue(
            tokenResult.payload || { message: 'Failed to get token' }
          );
        }
        token = tokenResult.payload;
      }

      const fd = new FormData();
      fd.append('name', formFields.name);
      fd.append('email', formFields.email);
      fd.append('phone', formFields.phone);
      fd.append('position_id', String(formFields.position_id));
      fd.append('photo', formFields.photoFile);

      const res = await axiosClient.post('/users', fd, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Token: token,
        },
      });

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
