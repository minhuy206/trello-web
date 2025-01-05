import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentActiveCard: null,
  isShowActiveCardModal: false
}

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
    },
    setCurrentActiveCard: (state, action) => {
      state.currentActiveCard = action.payload
    }
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

export const activeCardReducer = activeCardSlice.reducer
