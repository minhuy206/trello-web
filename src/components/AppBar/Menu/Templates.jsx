import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

function Templates() {
  return (
    <Box>
      <Button
        sx={{
          color: (theme) =>
            theme.palette.mode === 'dark' ? '#9fadbc' : '#44556F'
        }}
        id='basic-button-templates'
        endIcon={<ExpandMoreIcon />}
      >
        Templates
      </Button>
    </Box>
  )
}

export default Templates
