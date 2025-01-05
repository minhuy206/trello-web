import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveRoundedIcon from '@mui/icons-material/AddToDriveRounded'
import BoltRoundedIcon from '@mui/icons-material/BoltRounded'
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded'
import { capitalizeFirstLetter } from '~/utils/formatter'
import BoardUserGroup from './BoardUserGroup'
import InviteBoardUser from './InviteBoardUser'

const MENU_STYLE = {
  color: 'white',
  bgcolor: 'transparent',
  border: 'none',
  paddingX: 0.5,
  borderRadius: 0.5,
  '& .MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    backgroundColor: 'primary.50'
  }
}

function BoardBar({ board }) {
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => theme.trello.boardBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        paddingX: 2,
        overflowX: 'auto',
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
        '&::-webkit-scrollbar-track': { m: 2 }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Tooltip title={board?.description}>
          <Chip
            sx={MENU_STYLE}
            icon={<DashboardIcon />}
            label={board?.title}
            clickable
          />
        </Tooltip>
        <Chip
          sx={MENU_STYLE}
          icon={<VpnLockIcon />}
          label={capitalizeFirstLetter(board?.type)}
          clickable
        />
        <Chip
          sx={MENU_STYLE}
          icon={<AddToDriveRoundedIcon />}
          label='Add to Google Drive'
          clickable
        />
        <Chip
          sx={MENU_STYLE}
          icon={<BoltRoundedIcon />}
          label='Automation'
          clickable
        />
        <Chip
          sx={MENU_STYLE}
          icon={<FilterListRoundedIcon />}
          label='Filter'
          clickable
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <InviteBoardUser boardId={board?._id} />

        <BoardUserGroup boardUsers={board.owners.concat(board.members)} />
      </Box>
    </Box>
  )
}

export default BoardBar
