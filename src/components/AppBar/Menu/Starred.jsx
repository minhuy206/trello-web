import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

function Starred() {
  return (
    <Box>
      <Button
        sx={{
          color: (theme) =>
            theme.palette.mode === 'dark' ? '#9fadbc' : '#44556F'
        }}
        id='basic-button-starred'
        endIcon={<ExpandMoreIcon />}
      >
        Starred
      </Button>
    </Box>
  )
}

export default Starred
