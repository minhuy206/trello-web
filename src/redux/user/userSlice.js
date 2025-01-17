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

export const logoutAPI = createAsyncThunk('user/logoutAPI', async () => {
  return await authorizeAxiosInstance.delete(`${API_ROOT}/v1/users/logout`).data
})

export const updateUserAPI = createAsyncThunk(
  'user/updateUserAPI',
  async (account) => {
    return (
      await authorizeAxiosInstance.put(`${API_ROOT}/v1/users/update`, account)
    ).data
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAPI.fulfilled, (state, action) => {
      state.currentUser = action.payload
    })

    builder.addCase(logoutAPI.fulfilled, (state) => {
      state.currentUser = null
    })
    builder.addCase(updateUserAPI.fulfilled, (state, action) => {
      state.currentUser = action.payload
    })
  }
})

export const selectCurrentUser = (state) => state.user.currentUser

export const userReducer = userSlice.reducer
