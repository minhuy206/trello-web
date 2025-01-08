import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import {
  fetchBoardAPI,
  selectCurrentActiveBoard,
  setCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'

import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import ActiveCard from '~/components/Modal/ActiveCard/ActiveCard'
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'

function Board() {
  const dispatch = useDispatch()
  const board = useSelector(selectCurrentActiveBoard)
  const { _id } = useParams()

  useEffect(() => {
    dispatch(fetchBoardAPI(_id))

    return () => {
      dispatch(setCurrentActiveBoard(null))
    }
  }, [dispatch, _id])

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        height: '100vh',
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? '#5C6366' : '#838C91'
      }}
    >
      <AppBar />
      <ActiveCard />
      <BoardBar board={board} />
      <BoardContent board={board} />
    </Container>
  )
}

export default Board
