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
import ModeSelect from '../ModeSelect/ModeSelect'
import TrelloIcon from '~/assets/trello.svg?react'
import Notifications from './Notifications/Notifications'
import AutoCompleteSearchBoard from './SearchBoards/AutoCompleteSearchBoard'
import CreateBoardModal from '../Modal/CreateBoard/CreateBoardModal'
import { Link } from 'react-router-dom'
import { useState } from 'react'

function AppBar() {
  const [open, setOpen] = useState(false)

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
        borderBottom: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? '#ffffff29' : '#172b4d29',
        bgcolor: (theme) => theme.palette.background.default,
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
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#9fadbc' : '#44556F',
                cursor: 'pointer',
                verticalAlign: 'middle'
              }}
            />
          </Link>
        </Tooltip>
        <Link
          to='/'
          style={{
            color: (theme) =>
              theme.palette.mode === 'dark' ? '#9fadbc' : '#44556F'
          }}
        >
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
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#9fadbc' : '#415672'
              }}
            />
            <Typography
              variant='span'
              sx={{
                fontSize: '1.2rem',
                fontWeight: '700',
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#9fadbc' : '#415672'
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
          <Button
            sx={{
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#9fadbc' : '#44556F'
            }}
            onClick={() => setOpen(true)}
            startIcon={<LibraryAddRoundedIcon />}
          >
            Create
          </Button>
          <CreateBoardModal open={open} setOpen={() => setOpen()} />
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
          <HelpOutlineIcon
            sx={{
              cursor: 'pointer',
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#9fadbc' : '#44556F'
            }}
          />
        </Tooltip>
        <Profile />
      </Box>
    </Box>
  )
}

export default AppBar
