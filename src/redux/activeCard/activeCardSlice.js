import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

const initialState = {
  currentActiveCard: null,
  isShowActiveCardModal: false,
  isFetching: true
}

export const fetchCardAPI = createAsyncThunk(
  'activeCard/fetchCardAPI',
  async (cardId) => {
    return (await authorizeAxiosInstance.get(`${API_ROOT}/v1/cards/${cardId}`))
      .data
  }
)

export const activeCardSlice = createSlice({
  name: 'activeCard',
  initialState,
  reducers: {
    showActiveCardModal: (state) => {
      state.isShowActiveCardModal = true
    },
    clearAndHideCurrentActiveCard: (state) => {
      state.currentActiveCard = null
      state.isShowActiveCardModal = false
      state.isFetching = true
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCardAPI.fulfilled, (state, action) => {
      state.currentActiveCard = action.payload
      state.isFetching = false
    })
  }
})

export const {
  showActiveCardModal,
  clearAndHideCurrentActiveCard,
  setCurrentActiveCard
} = activeCardSlice.actions

export const selectCurrentActiveCard = (state) =>
  state.activeCard.currentActiveCard

export const selectIsShowActiveCardModal = (state) =>
  state.activeCard.isShowActiveCardModal

export const selectIsFetching = (state) => state.activeCard.isFetching

export const activeCardReducer = activeCardSlice.reducer
