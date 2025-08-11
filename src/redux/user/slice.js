import { createSlice } from '@reduxjs/toolkit';
import {
  fetchPositions,
  fetchToken,
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
    builder
      .addCase(fetchPositions.pending, state => {
        state.positions.loading = true;
        state.positions.error = null;
      })
      .addCase(fetchPositions.fulfilled, (state, { payload }) => {
        state.positions.items = payload;
        state.positions.loading = false;
      })
      .addCase(fetchPositions.rejected, (state, { error }) => {
        state.positions.loading = false;
        state.positions.error = error;
      });

    // fetchUsers
    builder
      .addCase(fetchUsers.pending, state => {
        state.users.loading = true;
        state.users.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.users.loading = false;
        const { page, total_pages, users } = payload;
        if (page > 1) {
          state.users.items.push(...users);
        } else {
          state.users.items = users;
        }
        state.users.page = page;
        state.users.total_pages = total_pages;
      })
      .addCase(fetchUsers.rejected, (state, { error }) => {
        state.users.loading = false;
        state.users.error = error;
      });

    // fetchToken
    builder
      .addCase(fetchToken.pending, state => {
        state.token.loading = true;
        state.token.error = null;
      })
      .addCase(fetchToken.fulfilled, (state, { payload }) => {
        state.token.value = payload;
        state.token.fetchedAt = Date.now();
        state.token.loading = false;
      })
      .addCase(fetchToken.rejected, (state, { error }) => {
        state.token.loading = false;
        state.token.error = error;
      });

    // registerUser
    builder
      .addCase(registerUser.pending, state => {
        state.register.loading = true;
        state.register.success = false;
        state.register.error = null;
        state.register.validationFails = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.register.loading = false;
        state.register.success = !!payload.success;
        state.register.error = null;
        state.register.validationFails = null;
        state.register.lastUserId = payload.user_id;
      })
      .addCase(registerUser.rejected, (state, { payload, error }) => {
        state.register.loading = false;
        state.register.success = false;
        state.register.error = error;
        state.register.validationFails = payload.fails;
      });
  },
  selectors: {
    selectUsers: state => state.users,
  },
});

export const { selectUsers } = usersSlice.selectors;

export default usersSlice.reducer;
