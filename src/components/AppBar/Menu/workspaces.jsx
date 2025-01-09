import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

function Workspaces() {
  return (
    <Box>
      <Button
        sx={{
          color: (theme) =>
            theme.palette.mode === 'dark' ? '#9fadbc' : '#44556F'
        }}
        id='basic-button-workspaces'
        endIcon={<ExpandMoreIcon />}
      >
        Workspaces
      </Button>
    </Box>
  )
}

export default Workspaces
