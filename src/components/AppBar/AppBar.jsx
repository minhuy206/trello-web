import Box from '@mui/material/Box'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import LibraryAddRoundedIcon from '@mui/icons-material/LibraryAddRounded'
import AppsIcon from '@mui/icons-material/Apps'
import Workspaces from './Menu/workspaces'
import Recent from './Menu/Recent'
import Starred from './Menu/Starred'
import Templates from './Menu/Templates'
import Profile from './Menu/Profile'
import TrelloIcon from '~/assets/trello.svg?react'
import ModeSelect from '../ModeSelect/ModeSelect'
import { Link } from 'react-router-dom'
import Notifications from './Notifications/Notifications'
import AutoCompleteSearchBoard from './SearchBoards/AutoCompleteSearchBoard'

function AppBar() {
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => theme.trello.appBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        paddingX: 2,
        overflowX: 'auto',
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0',
        '&::-webkit-scrollbar-track': { m: 2 }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}
      >
        <Tooltip title='Boards'>
          <Link to={'/boards'} style={{ color: 'inherit' }}>
            <AppsIcon
              sx={{
                color: 'white',
                cursor: 'pointer',
                verticalAlign: 'middle'
              }}
            />
          </Link>
        </Tooltip>
        <Link to='/' style={{ color: 'inherit' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              cursor: 'pointer'
            }}
          >
            <SvgIcon
              component={TrelloIcon}
              inheritViewBox
              fontSize='small'
              sx={{ color: 'white' }}
            />
            <Typography
              variant='span'
              sx={{
                fontSize: '1.2rem',
                fontWeight: 'bold',
                color: 'white'
              }}
            >
              Trello
            </Typography>
          </Box>
        </Link>

        <Box
          sx={{
            display: {
              xs: 'none',
              md: 'flex'
            },
            gap: 1
          }}
        >
          <Workspaces />
          <Recent />
          <Starred />
          <Templates />
          <Button sx={{ color: 'white' }} startIcon={<LibraryAddRoundedIcon />}>
            Create
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}
      >
        <AutoCompleteSearchBoard />
        <ModeSelect />
        <Notifications />
        <Tooltip title='Help'>
          <HelpOutlineIcon sx={{ cursor: 'pointer', color: 'white' }} />
        </Tooltip>
        <Profile />
      </Box>
    </Box>
  )
}

export default AppBar
