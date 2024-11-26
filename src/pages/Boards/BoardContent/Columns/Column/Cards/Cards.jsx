import Box from '@mui/material/Box'
import Card from './Card/Card'

function Cards({ cards }) {
  return (
    <Box
      sx={{
        px: 0.5,
        mx: 0.5,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        overflowX: 'hidden',
        overflowY: 'auto',
        maxHeight: (theme) =>
          `calc(${theme.trello.boardContentHeight} -
                ${theme.spacing(5)} -
                ${theme.trello.columnHeaderHeight} -
                ${theme.trello.columnFooterHeight}
              )`,
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#ced0da',
          borderRadius: '8px'
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#bfc2cf'
        }
      }}
    >
      {cards?.map((card) => (
        <Card key={card._id} card={card} />
      ))}
    </Box>
  )
}

export default Cards
