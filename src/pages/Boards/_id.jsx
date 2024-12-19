// Board Details
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import Container from '@mui/material/Container'
import { useEffect, useState } from 'react'
import {
  createNewCardAPI,
  createNewColumnAPI,
  getBoardAPI,
  updateBoardAPI,
  updateColumnAPI,
  deleteColumnAPI
} from '~/apis'
import { generatePlaceholderCard } from '~/utils/formatter'
import { isEmpty } from 'lodash'
import { mapOrder } from '~/utils/sort'
import { Box, CircularProgress } from '@mui/material'
import { toast } from 'react-toastify'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '675ab2cfefdc5b3edb4a19a4'

    getBoardAPI(boardId).then((board) => {
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')

      board?.columns?.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        } else {
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
        }
      })
      setBoard(board)
    })
  }, [])

  const createNewColumn = async (column) => {
    const createdColumn = await createNewColumnAPI({
      ...column,
      boardId: board?._id
    })
    createdColumn.cards = [generatePlaceholderCard(column)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(column)._id]
    const newBoard = { ...board }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }

  const createNewCard = async (card) => {
    const createdCard = await createNewCardAPI({
      ...card,
      boardId: board._id
    })

    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(
      (column) => column._id === card.columnId
    )

    if (columnToUpdate) {
      if (columnToUpdate.cards.some((card) => card.FE_PlaceholderCard)) {
        columnToUpdate.cards = [createdCard]
        columnToUpdate.cardOrderIds = [createdCard._id]
      } else {
        columnToUpdate.cards.push(createdCard)
        columnToUpdate.cardOrderIds.push(createdCard._id)
      }
    }

    setBoard(newBoard)
  }

  const moveColumn = (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map((column) => column._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)

    updateBoardAPI(board._id, { columnOrderIds: dndOrderedColumnsIds })
  }

  const moveCard = (columnId, cardId, dndOrderedCards, dndOrderedCardIds) => {
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(
      (column) => column._id === columnId
    )
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    setBoard(newBoard)
    updateColumnAPI(columnId, {
      cardId,
      column: {
        cardOrderIds: dndOrderedCardIds.filter(
          (cardId) => cardId !== `${columnId}-placeholder-card`
        )
      }
    })
  }

  const deleteColumn = (columnId) => {
    const newBoard = { ...board }
    newBoard.columns = newBoard.columns.filter(
      (column) => column._id !== columnId
    )
    newBoard.columnOrderIds = newBoard.columnOrderIds.filter(
      (columnId) => columnId !== columnId
    )
    setBoard(newBoard)
    deleteColumnAPI(columnId).then((res) => {
      toast.success(res?.result, {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored'
      })
    })
  }

  if (!board)
    return (
      <Container
        disableGutters
        maxWidth={false}
        sx={{ height: '100vh', backgroundColor: 'primary.main', width: '100%' }}
      >
        <AppBar />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    )

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{ height: '100vh', backgroundColor: 'primary.main', width: '100%' }}
    >
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumn={moveColumn}
        moveCard={moveCard}
        deleteColumn={deleteColumn}
      />
    </Container>
  )
}

export default Board
