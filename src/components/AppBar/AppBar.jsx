import { useState } from 'react'
import Box from '@mui/material/Box'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import Badge from '@mui/material/Badge'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import InputAdornment from '@mui/material/InputAdornment'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import LibraryAddRoundedIcon from '@mui/icons-material/LibraryAddRounded'
import AppsIcon from '@mui/icons-material/Apps'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import Workspaces from './Menu/workspaces'
import Recent from './Menu/Recent'
import Starred from './Menu/Starred'
import Templates from './Menu/Templates'
import Profile from './Menu/Profile'
import TrelloIcon from '~/assets/trello.svg?react'
import ModeSelect from '../ModeSelect/ModeSelect'

function AppBar() {
  const [search, setSearch] = useState('')

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
        bgcolor: (theme) => theme.palette['app-bar-color'],
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
        <AppsIcon
          sx={{
            color: (theme) => theme.palette['text-color'],
            cursor: 'pointer'
          }}
        />
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
            sx={{ color: (theme) => theme.palette['text-color'] }}
          />
          <Typography
            variant='span'
            sx={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
              color: (theme) => theme.palette['text-color']
            }}
          >
            Trello
          </Typography>
        </Box>

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
            sx={{ color: (theme) => theme.palette['text-color'] }}
            startIcon={<LibraryAddRoundedIcon />}
          >
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
        <TextField
          id='outlined-search'
          label='Search'
          type='text'
          size='small'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon
                    sx={{ color: (theme) => theme.palette['text-color'] }}
                  />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position='end'>
                  <CloseIcon
                    fontSize='small'
                    sx={{
                      color: search
                        ? (theme) => theme.palette['text-color']
                        : 'transparent',
                      cursor: 'pointer'
                    }}
                    onClick={() => setSearch('')}
                  />
                </InputAdornment>
              )
            }
          }}
          sx={{
            minWidth: '120px',
            maxWidth: '180px',
            '& label': { color: (theme) => theme.palette['text-color'] },
            '& input': { color: (theme) => theme.palette['text-color'] },
            '& label.Mui-focused': {
              color: (theme) => theme.palette['text-color']
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: (theme) => theme.palette['text-color']
              },
              '&:hover fieldset': {
                borderColor: (theme) => theme.palette['text-color']
              },
              '&.Mui-focused fieldset': {
                borderColor: (theme) => theme.palette['text-color']
              }
            }
          }}
        />
        <ModeSelect />
        <Tooltip title='Notification'>
          <Badge color='warning' variant='dot' sx={{ cursor: 'pointer' }}>
            <NotificationsNoneIcon
              sx={{
                color: (theme) => theme.palette['text-color'],
                cursor: 'pointer'
              }}
            />
          </Badge>
        </Tooltip>
        <Tooltip title='Help'>
          <HelpOutlineIcon
            sx={{
              cursor: 'pointer',
              color: (theme) => theme.palette['text-color']
            }}
          />
        </Tooltip>
        <Profile />
      </Box>
    </Box>
  )
}

export default AppBar
