import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'
import { mapOrder } from '~/utils/sort'

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
    updateCard: (state, action) => {
      state.currentActiveCard = {
        ...state.currentActiveCard,
        ...action.payload
      }
    },
    clearAndHideCurrentActiveCard: (state) => {
      state.currentActiveCard = null
      state.isShowActiveCardModal = false
      state.isFetching = true
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCardAPI.fulfilled, (state, action) => {
      const card = action.payload
      card.comments = mapOrder(card.comments, card.commentOrderIds, '_id')
      state.currentActiveCard = card
      state.isFetching = false
    })
  }
})

export const {
  showActiveCardModal,
  clearAndHideCurrentActiveCard,
  updateCard
} = activeCardSlice.actions

export const selectCurrentActiveCard = (state) =>
  state.activeCard.currentActiveCard

export const selectIsShowActiveCardModal = (state) =>
  state.activeCard.isShowActiveCardModal

export const selectIsFetching = (state) => state.activeCard.isFetching

export const activeCardReducer = activeCardSlice.reducer
