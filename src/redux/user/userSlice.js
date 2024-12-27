import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

const initialState = {
  currentUser: null
}

export const loginAPI = createAsyncThunk('user/loginAPI', async (account) => {
  return (
    await authorizeAxiosInstance.post(`${API_ROOT}/v1/users/login`, account)
  ).data
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAPI.fulfilled, (state, action) => {
      state.currentUser = action.payload
    })
  }
})

// export const {} = userSlice.actions

export const selectCurrentUser = (state) => state.user.currentUser

export const userReducer = userSlice.reducer
