import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import Container from '@mui/material/Container'
import { useEffect } from 'react'
import {
  fetchBoardAPI,
  selectCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'
import { useDispatch, useSelector } from 'react-redux'

import { Box, CircularProgress } from '@mui/material'

function Board() {
  const dispatch = useDispatch()
  const board = useSelector(selectCurrentActiveBoard)

  useEffect(() => {
    const boardId = '675ab2cfefdc5b3edb4a19a4'
    dispatch(fetchBoardAPI(boardId))
  }, [dispatch])

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
      <BoardContent board={board} />
    </Container>
  )
}

export default Board
