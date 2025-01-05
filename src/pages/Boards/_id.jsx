import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import {
  fetchBoardAPI,
  selectCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'

import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'
import ActiveCard from '~/components/Modal/ActiveCard/ActiveCard'

function Board() {
  const dispatch = useDispatch()
  const board = useSelector(selectCurrentActiveBoard)
  const { _id } = useParams()

  useEffect(() => {
    dispatch(fetchBoardAPI(_id))
  }, [dispatch, _id])

  if (!board)
    return (
      <Container
        disableGutters
        maxWidth={false}
        sx={{ height: '100vh', backgroundColor: 'primary.main', width: '100%' }}
      >
        {/* <AppBar /> */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
          }}
        >
          <PageLoadingSpinner caption='Loading board...' />
        </Box>
      </Container>
    )

  return (
    <Container disableGutters maxWidth={false}>
      <AppBar />

      <ActiveCard />
      <BoardBar board={board} />
      <BoardContent board={board} />
    </Container>
  )
}

export default Board
