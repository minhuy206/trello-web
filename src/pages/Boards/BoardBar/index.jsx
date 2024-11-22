import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Button from '@mui/material/Button'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveRoundedIcon from '@mui/icons-material/AddToDriveRounded'
import BoltRoundedIcon from '@mui/icons-material/BoltRounded'
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded'
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded'

const MENU_STYLE = {
  color: 'primary.main',
  bgcolor: 'white',
  border: 'none',
  paddingX: 0.5,
  borderRadius: 0.5,
  '& .MuiSvgIcon-root': {
    color: 'primary.main'
  },
  '&:hover': {
    backgroundColor: 'primary.50'
  }
}

function BoardBar() {
  return (
    <Box
      sx={{
        backgroundColor: '#ffffff',
        width: '100%',
        height: (theme) => theme.trello.boardBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        paddingX: 2,
        overflowX: 'auto',
        borderTop: '1px solid #00bfa5'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          sx={MENU_STYLE}
          icon={<DashboardIcon />}
          label="minhuy206"
          clickable
        />
        <Chip
          sx={MENU_STYLE}
          icon={<VpnLockIcon />}
          label="Public/Private Workspace"
          clickable
        />
        <Chip
          sx={MENU_STYLE}
          icon={<AddToDriveRoundedIcon />}
          label="Add to Google Drive"
          clickable
        />
        <Chip
          sx={MENU_STYLE}
          icon={<BoltRoundedIcon />}
          label="Automation"
          clickable
        />
        <Chip
          sx={MENU_STYLE}
          icon={<FilterListRoundedIcon />}
          label="Filter"
          clickable
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button startIcon={<PersonAddAlt1RoundedIcon />} variant="outlined">
          Invite
        </Button>
        <AvatarGroup
          max={4}
          sx={{
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              fontSize: 16
            }
          }}
        >
          <Tooltip title="minhuy">
            <Avatar alt="minhuy" src="https://picsum.photos/200/300" />
          </Tooltip>
          <Tooltip title="minhuy">
            <Avatar alt="minhuy" src="https://picsum.photos/id/237/200/300" />
          </Tooltip>
          <Tooltip title="minhuy">
            <Avatar
              alt="minhuy"
              src="https://picsum.photos/seed/picsum/200/300"
            />
          </Tooltip>
          <Tooltip title="minhuy">
            <Avatar alt="minhuy" src="https://picsum.photos/200/300" />
          </Tooltip>
          <Tooltip title="minhuy">
            <Avatar alt="minhuy" src="https://picsum.photos/200/300" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
