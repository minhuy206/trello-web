import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAPI, selectCurrentUser } from '~/redux/user/userSlice'
import { Link } from 'react-router-dom'

function Profile() {
  const [anchorEl, setAnchorEl] = useState(null)
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)

  const handleLogout = () => {
    dispatch(logoutAPI())
  }
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Box>
      <Tooltip title='Account settings'>
        <IconButton
          onClick={handleClick}
          size='small'
          sx={{ padding: 0 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar sx={{ width: 32, height: 32 }} src={currentUser?.avatar} />
        </IconButton>
      </Tooltip>
      <Menu
        id='basic-menu-profile'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button-profile"'
        }}
        sx={{
          '& .MuiList-root': {
            bgcolor: (theme) => theme.palette.background.default,
            color: (theme) =>
              theme.palette.mode === 'dark' ? '#9fadbc' : '#44556F'
          }
        }}
      >
        <Link to='/settings/account' style={{ color: 'inherit' }}>
          <MenuItem>
            <Avatar
              sx={{ width: 24, height: 24, mr: 1.5 }}
              src={currentUser?.avatar}
            />
            {currentUser?.displayName}
          </MenuItem>
        </Link>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#9fadbc' : '#44556F'
              }}
              fontSize='small'
            />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#9fadbc' : '#44556F'
              }}
              fontSize='small'
            />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#9fadbc' : '#44556F'
              }}
              className='logout-icon'
              fontSize='small'
            />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default Profile
