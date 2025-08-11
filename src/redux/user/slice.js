import { createSlice } from '@reduxjs/toolkit';
import {
  fetchPositions,
  fetchToken,
  fetchUserById,
  fetchUsers,
  registerUser,
} from './operations';

const initialState = {
  users: {
    items: [],
    page: 1,
    count: 5,
    total_pages: 0,
    total_users: 0,
    links: null,
    loading: false,
    error: null,
  },
  singleUser: { data: null, loading: false, error: null },
  positions: { items: [], loading: false, error: null },
  token: { value: null, fetchedAt: null, loading: false, error: null },
  register: {
    loading: false,
    success: false,
    error: null,
    validationFails: null,
  },
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // fetchPositions
    builder.addCase(fetchPositions.pending, state => {
      state.positions.loading = true;
      state.positions.error = null;
    });
    builder.addCase(fetchPositions.fulfilled, (state, action) => {
      state.positions.items = action.payload;
      state.positions.loading = false;
    });
    builder.addCase(fetchPositions.rejected, (state, action) => {
      state.positions.loading = false;
      state.positions.error = action.payload || action.error;
    });

    // fetchUsers
    builder.addCase(fetchUsers.pending, state => {
      state.users.loading = true;
      state.users.error = null;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users.loading = false;
      const { page, total_pages, users } = action.payload;
      if (page > 1) {
        state.users.items = [...state.users.items, ...users];
      } else {
        state.users.items = users;
      }
      state.users.page = page;
      state.users.total_pages = total_pages;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.users.loading = false;
      state.users.error = action.payload || action.error;
    });

    // fetchUserById
    builder.addCase(fetchUserById.pending, state => {
      state.singleUser.loading = true;
      state.singleUser.error = null;
    });
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.singleUser.data = action.payload;
      state.singleUser.loading = false;
    });
    builder.addCase(fetchUserById.rejected, (state, action) => {
      state.singleUser.loading = false;
      state.singleUser.error = action.payload || action.error;
    });

    // fetchToken
    builder.addCase(fetchToken.pending, state => {
      state.token.loading = true;
      state.token.error = null;
    });
    builder.addCase(fetchToken.fulfilled, (state, action) => {
      state.token.value = action.payload;
      state.token.fetchedAt = Date.now();
      state.token.loading = false;
    });
    builder.addCase(fetchToken.rejected, (state, action) => {
      state.token.loading = false;
      state.token.error = action.payload || action.error;
    });

    // registerUser
    builder.addCase(registerUser.pending, state => {
      state.register.loading = true;
      state.register.success = false;
      state.register.error = null;
      state.register.validationFails = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.register.loading = false;
      state.register.success = !!action.payload.success;
      state.register.error = null;
      state.register.validationFails = null;
      state.register.lastUserId = action.payload.user_id;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.register.loading = false;
      state.register.success = false;
      const payload = action.payload || {};
      state.register.error = payload.message || action.error?.message;
      state.register.validationFails = payload.fails || null;
    });
  },
  selectors: {
    selectUsers: state => state.users,
  },
});

export const { selectUsers } = usersSlice.selectors;

export default usersSlice.reducer;
