import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import Popover from '@mui/material/Popover'
import AddIcon from '@mui/icons-material/Add'
import Badge from '@mui/material/Badge'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useState } from 'react'

function CardUserGroup({
  currentUserId,
  boardMembers = [],
  cardMemberIds = [],
  isFetching,
  handleUpdateCard
}) {
  const [anchorPopoverElement, setAnchorPopoverElement] = useState(null)
  const isOpenPopover = Boolean(anchorPopoverElement)
  const popoverId = isOpenPopover ? 'card-all-users-popover' : undefined
  const handleTogglePopover = (event) => {
    if (!anchorPopoverElement) setAnchorPopoverElement(event.currentTarget)
    else setAnchorPopoverElement(null)
  }

  const members = boardMembers.filter((member) =>
    cardMemberIds.includes(member._id)
  )

  return (
    <Box sx={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
      {isFetching
        ? [...Array(5)].map((_, index) => (
            <Skeleton variant='circular' width={34} height={34} key={index} />
          ))
        : members.map((member) => (
            <Tooltip title={member.displayName} key={member._id}>
              <Avatar
                sx={{ width: 34, height: 34, cursor: 'pointer' }}
                alt={member.username}
                src={member.avatar}
              />
            </Tooltip>
          ))}

      {!isFetching && (
        <>
          <Tooltip title='Add new member'>
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
                fontWeight: '600',
                borderRadius: '50%',
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#90caf9' : '#172b4d',
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? '#2f3542'
                    : theme.palette.grey[200],
                '&:hover': {
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? '#000000de' : '#0c66e4',
                  bgcolor: (theme) =>
                    theme.palette.mode === 'dark' ? '#90caf9' : '#e9f2ff'
                }
              }}
            >
              <AddIcon fontSize='small' />
            </Box>
          </Tooltip>
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
                maxWidth: '260px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1.5
              }}
            >
              {boardMembers.length === 1 &&
              boardMembers[boardMembers.length - 1]._id === currentUserId ? (
                <Typography variant='body2' color='text.secondary'>
                  No more members to add
                </Typography>
              ) : (
                boardMembers.map((member) => {
                  if (member._id !== currentUserId) {
                    return (
                      <Tooltip title={member.displayName} key={member._id}>
                        <Badge
                          sx={{ cursor: 'pointer' }}
                          overlap='rectangular'
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right'
                          }}
                          badgeContent={
                            cardMemberIds.includes(member._id) && (
                              <CheckCircleIcon
                                fontSize='small'
                                sx={{ color: '#27ae60' }}
                              />
                            )
                          }
                          onClick={() =>
                            handleUpdateCard({
                              memberIds: cardMemberIds.includes(member._id)
                                ? cardMemberIds.filter(
                                    (id) => id !== member._id
                                  )
                                : [...cardMemberIds, member._id]
                            })
                          }
                        >
                          <Avatar
                            sx={{ width: 34, height: 34 }}
                            alt={member.username}
                            src={member.avatar}
                          />
                        </Badge>
                      </Tooltip>
                    )
                  }
                })
              )}
            </Box>
          </Popover>
        </>
      )}
    </Box>
  )
}

export default CardUserGroup
