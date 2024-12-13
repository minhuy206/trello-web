// Board Details
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import Container from '@mui/material/Container'
import { useEffect, useState } from 'react'
import { getBoardAPI } from '~/apis'
import { mockData } from '~/apis/mock-data'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '675ab2cfefdc5b3edb4a19a4'

    getBoardAPI(boardId).then((data) => {
      setBoard(data)
    })
  }, [])

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        height: '100vh',
        backgroundColor: (theme) => theme.palette['bg-color'],
        width: '100%'
      }}
    >
      <AppBar />
      <BoardBar board={mockData.board} />
      <BoardContent board={mockData.board} />
    </Container>
  )
}

export default Board
