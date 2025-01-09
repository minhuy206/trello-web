import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
// import Menu from '@mui/material/Menu'
// import MenuItem from '@mui/material/MenuItem'
// import { useState } from 'react'
// import Divider from '@mui/material/Divider'
// import ListItemText from '@mui/material/ListItemText'
// import ListItemIcon from '@mui/material/ListItemIcon'
// import Check from '@mui/icons-material/Check'

function Recent() {
  // const [anchorEl, setAnchorEl] =useState(null)
  // const open = Boolean(anchorEl)
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget)
  // }
  // const handleClose = () => {
  //   setAnchorEl(null)
  // }
  return (
    <Box>
      <Button
        sx={{
          color: (theme) =>
            theme.palette.mode === 'dark' ? '#9fadbc' : '#44556F'
        }}
        id='basic-button-recent'
        // aria-controls={open ? 'basic-menu-recent' : undefined}
        // aria-haspopup='true'
        // aria-expanded={open ? 'true' : undefined}
        // onClick={handleClick}
        endIcon={<ExpandMoreIcon />}
      >
        Recent
      </Button>
      {/* <Menu
        id='basic-menu-recent'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button-recent"'
        }}
      >
        <MenuItem>
          <ListItemText inset>Single</ListItemText>
        </MenuItem>
      </Menu> */}
    </Box>
  )
}

export default Recent
