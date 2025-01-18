import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import Popover from '@mui/material/Popover'
import AddIcon from '@mui/icons-material/Add'
import Badge from '@mui/material/Badge'
import Typography from '@mui/material/Typography'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import { CARD_MEMBER_ACTION } from '~/utils/constants'

function CardUserGroup({
  currentUserId,
  cardMemberIds = [],
  handleUpdateCardMember
}) {
  const [anchorPopoverElement, setAnchorPopoverElement] = useState(null)
  const isOpenPopover = Boolean(anchorPopoverElement)
  const popoverId = isOpenPopover ? 'card-all-users-popover' : undefined
  const handleTogglePopover = (event) => {
    if (!anchorPopoverElement) setAnchorPopoverElement(event.currentTarget)
    else setAnchorPopoverElement(null)
  }

  const board = useSelector(selectCurrentActiveBoard)
  const members = [...board.members, ...board.owners].filter((member) =>
    cardMemberIds.includes(member._id)
  )
  return (
    <Box sx={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
      {members.map((member) => (
        <Tooltip title={member.displayName} key={member._id}>
          <Avatar
            sx={{ width: 34, height: 34, cursor: 'pointer' }}
            alt={member.username}
            src={member.avatar}
          />
        </Tooltip>
      ))}

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
          {[...board.members, ...board.owners].length === 1 ? (
            <Typography variant='body2' color='text.secondary'>
              No more members to add
            </Typography>
          ) : (
            [...board.members, ...board.owners].map((member) => {
              if (member._id !== currentUserId) {
                return (
                  <Tooltip title={member.displayName} key={member._id}>
                    <Badge
                      sx={{ cursor: 'pointer' }}
                      overlap='rectangular'
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      badgeContent={
                        cardMemberIds.includes(member._id) && (
                          <CheckCircleIcon
                            fontSize='small'
                            sx={{ color: '#27ae60' }}
                          />
                        )
                      }
                      onClick={() =>
                        handleUpdateCardMember({
                          memberId: member._id,
                          action: cardMemberIds.includes(member._id)
                            ? CARD_MEMBER_ACTION.REMOVE
                            : CARD_MEMBER_ACTION.ADD
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
    </Box>
  )
}

export default CardUserGroup
