import { useState } from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import Popover from '@mui/material/Popover'

function BoardMembersGroup({ boardMembers = [], limit = 4 }) {
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
      {boardMembers.map((user, index) => {
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

      {boardMembers.length > limit && (
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
              backgroundColor: '#a4b0be',
              ml: -2,
              color: '#fff'
            }}
          >
            +{boardMembers.length - limit}
          </Box>
        </Tooltip>
      )}

      <Popover
        id={popoverId}
        open={isOpenPopover}
        anchorEl={anchorPopoverElement}
        onClose={handleTogglePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        slotProps={{
          paper: {
            sx: {
              bgcolor: (theme) => theme.palette.background.secondary,
              backgroundImage: 'none'
            }
          }
        }}
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
          {boardMembers.map((user, index) => (
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

export default BoardMembersGroup
