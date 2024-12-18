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
  updateBoardAPI
} from '~/apis'
import { generatePlaceholderCard } from '~/utils/formatter'
import { isEmpty } from 'lodash'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '675ab2cfefdc5b3edb4a19a4'

    getBoardAPI(boardId).then((board) => {
      board?.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
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

    const column = { ...board }.columns.find(
      (column) => column._id === card.columnId
    )
    column.cards.push(createdCard)
    column.cardOrderIds.push(createdCard._id)
  }

  const moveColumn = async (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map((column) => column._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)

    await updateBoardAPI(board._id, { columnOrderIds: dndOrderedColumnsIds })
  }

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
      />
    </Container>
  )
}

export default Board
