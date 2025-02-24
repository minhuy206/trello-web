import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { isEmpty } from 'lodash'

import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'
import { generatePlaceholderCard } from '~/utils/formatter'
import { mapOrder } from '~/utils/sort'

const initialState = {
  currentActiveBoard: null
}

export const fetchBoardAPI = createAsyncThunk(
  'activeBoard/fetchBoardAPI',
  async (boardId) => {
    return (
      await authorizeAxiosInstance.get(`${API_ROOT}/v1/boards/${boardId}`)
    ).data
  }
)

export const activeBoardSlice = createSlice({
  name: 'activeBoard',
  initialState,
  reducers: {
    setCurrentActiveBoard: (state, action) => {
      state.currentActiveBoard = action.payload
    },
    updateBoard: (state, action) => {
      const updatedCard = action.payload
      const column = state.currentActiveBoard.columns.find(
        (column) => column._id === updatedCard.columnId
      )

      if (column) {
        column.cards = column.cards.map((card) =>
          card._id === updatedCard._id ? updatedCard : card
        )
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoardAPI.fulfilled, (state, action) => {
      const board = action.payload
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')

      board?.columns?.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        } else {
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
        }
      })
      state.currentActiveBoard = board
    })
    builder.addCase(fetchBoardAPI.rejected, (state) => {
      state.currentActiveBoard = null
    })
  }
})

// Action creators are generated for each case reducer function
export const { setCurrentActiveBoard, updateBoard } = activeBoardSlice.actions

export const selectCurrentActiveBoard = (state) =>
  state.activeBoard.currentActiveBoard

export const activeBoardReducer = activeBoardSlice.reducer
