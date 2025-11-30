import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '@utils-types';

export interface UserState {
  isInit: boolean;
  isLoading: boolean;
  user: User | null;
  error?: string | null;
}

const initialState: UserState = {
  isInit: false,
  isLoading: false,
  user: null,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    init: (state) => {
      state.isInit = true;
    }
  },
  selectors: {
    userSelector: (state) => state.user,
    isAuthSelector: (state) => state.isInit
  }
  // extraReducers: (builder) => {
  //   builder.addCase(loginUserThunk.pending, (state) => {
  //     state.isLoading = true;
  //   });
  //   builder.addCase(loginUserThunk.rejected, (state) => {
  //     state.isLoading = false;
  //   });
  //   builder.addCase(loginUserThunk.fulfilled, (state) => {
  //     state.isLoading = false;
  //   });

  //   builder.addCase(getUserThunk.pending, (state) => {
  //     state.isLoading = true;
  //   });
  //   builder.addCase(getUserThunk.rejected, (state) => {
  //     state.isInit = true;
  //     state.isLoading = false;
  //   });
  //   builder.addCase(getUserThunk.fulfilled, (state, { payload }) => {
  //     state.isInit = true;
  //     state.isLoading = false;
  //     state.user = payload;
  //   });
  // }
});
export const userSelectors = userSlice.selectors;
export const { init } = userSlice.actions;

export default userSlice.reducer;
