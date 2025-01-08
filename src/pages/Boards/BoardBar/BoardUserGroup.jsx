import { useState } from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import Popover from '@mui/material/Popover'

function BoardUserGroup({ boardUsers = [], limit = 4 }) {
  const [anchorPopoverElement, setAnchorPopoverElement] = useState(null)
  const isOpenPopover = Boolean(anchorPopoverElement)
  const popoverId = isOpenPopover ? 'board-all-users-popover' : undefined
  const handleTogglePopover = (event) => {
    if (!anchorPopoverElement) setAnchorPopoverElement(event.currentTarget)
    else setAnchorPopoverElement(null)
  }

  return (
    <Box
      sx={{
        display: 'flex'
      }}
    >
      {boardUsers.map((user, index) => {
        if (index < limit) {
          return (
            <Tooltip title={user.displayName} key={user._id}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: 52,
                  ml: index && -3,
                  zIndex: 8 - index
                }}
              >
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    cursor: 'pointer'
                  }}
                  alt={user.username}
                  src={user.avatar}
                />
              </Box>
            </Tooltip>
          )
        }
      })}

      {boardUsers.length > limit && (
        <Tooltip title='Show more'>
          <Box
            aria-describedby={popoverId}
            onClick={handleTogglePopover}
            sx={{
              width: 36,
              height: 36,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: '500',
              borderRadius: '50%',
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#9fadbc' : '#44556F',
              backgroundColor: '#a4b0be',
              ml: -2
            }}
          >
            +{boardUsers.length - limit}
          </Box>
        </Tooltip>
      )}

      <Popover
        id={popoverId}
        open={isOpenPopover}
        anchorEl={anchorPopoverElement}
        onClose={handleTogglePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box
          sx={{
            p: 2,
            maxWidth: '235px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1
          }}
        >
          {boardUsers.map((user, index) => (
            <Tooltip title={user.displayName} key={index}>
              <Avatar
                sx={{ width: 34, height: 34, cursor: 'pointer' }}
                alt={user.username}
                src={user.avatar}
              />
            </Tooltip>
          ))}
        </Box>
      </Popover>
    </Box>
  )
}

export default BoardUserGroup
