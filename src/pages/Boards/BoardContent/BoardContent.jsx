import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'

function BoardContent() {
  return (
    <Box
      sx={{
        width: '100%',
        overflowX: 'auto',
        overflowY: 'hidden',
        py: 1.25,
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
        height: (theme) => theme.trello.boardContentHeight
      }}
    >
      <ListColumns />
    </Box>
  )
}

export default BoardContent
