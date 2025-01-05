import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

const initialState = {
  currentNotifications: null
}

export const fetchInvitationAPI = createAsyncThunk(
  'notifications/fetchInvitationAPI',
  async () => {
    return (await authorizeAxiosInstance.get(`${API_ROOT}/v1/invitations`)).data
  }
)

export const updateBoardInvitationAPI = createAsyncThunk(
  'notifications/updateBoardInvitationAPI',
  async ({ invitationId, status }) => {
    return (
      await authorizeAxiosInstance.put(
        `${API_ROOT}/v1/invitations/${invitationId}`,
        { status }
      )
    ).data
  }
)

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    clearCurrentNotifications: (state) => {
      state.currentNotifications = null
    },
    updateCurrentNotifications: (state, action) => {
      state.currentNotifications = action.payload
    },
    addNotification: (state, action) => {
      state.currentNotifications.unshift(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvitationAPI.fulfilled, (state, action) => {
        state.currentNotifications = Array.isArray(action.payload)
          ? action.payload.reverse()
          : []
      })

      .addCase(updateBoardInvitationAPI.fulfilled, (state, action) => {
        const invitation = state.currentNotifications.find(
          (invitation) => invitation.id === action.payload.id
        )
        invitation.boardInvitation = action.payload.boardInvitation
      })
  }
})

export const {
  clearCurrentNotifications,
  updateCurrentNotifications,
  addNotification
} = notificationsSlice.actions

export const selectCurrentNotifications = (state) =>
  state.notifications.currentNotifications

export const notificationsReducer = notificationsSlice.reducer
