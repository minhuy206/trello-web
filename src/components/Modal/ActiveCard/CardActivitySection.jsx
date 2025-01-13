import moment from 'moment'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'

import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'

function CardActivitySection({ comments = [], handleComment }) {
  const currentUser = useSelector(selectCurrentUser)

  const handleAddCardComment = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      if (!event.target?.value) return
      handleComment({
        user: {
          avatar: currentUser?.avatar,
          displayName: currentUser?.displayName,
          username: currentUser?.username
        },
        content: event.target.value.trim()
      }).then(() => {
        event.target.value = ''
      })
    }
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Avatar
          sx={{ width: 36, height: 36, cursor: 'pointer' }}
          alt=''
          src={currentUser?.avatar}
        />
        <TextField
          fullWidth
          placeholder='Write a comment...'
          type='text'
          variant='outlined'
          multiline
          onKeyDown={handleAddCardComment}
          sx={{
            '& input': {
              fontWeight: 'bold',
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#b6c3cf' : '#182a4d'
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: (theme) =>
                  theme.palette.mode === 'dark'
                    ? '0.5px solid rgba(255, 255, 255, 0.3)'
                    : '0.5px solid rgba(0, 0, 0, 0.3)'
              }
            },
            '& .MuiOutlinedInput-root:hover': {
              '& fieldset': {
                border: (theme) =>
                  theme.palette.mode === 'dark'
                    ? '0.5px solid #b6c3cf !important'
                    : '0.5px solid #182a4d !important'
              }
            },
            '& .MuiOutlinedInput-root.Mui-focused': {
              '& fieldset': {
                border: (theme) =>
                  theme.palette.mode === 'dark'
                    ? '0.5px solid #b6c3cf !important'
                    : '0.5px solid #182a4d !important'
              }
            },
            '& .MuiOutlinedInput-input': {
              px: 1,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#b6c3cf' : '#182a4d'
            }
          }}
        />
      </Box>

      {comments.length === 0 && (
        <Typography
          sx={{
            pl: '45px',
            fontSize: '14px',
            fontWeight: '500',
            color: (theme) =>
              theme.palette.mode === 'dark' ? '#b6c3cf' : '#182a4d'
          }}
        >
          No activity found!
        </Typography>
      )}
      {comments.map((comment, index) => (
        <Box
          sx={{ display: 'flex', gap: 1, width: '100%', mb: 1.5 }}
          key={index}
        >
          <Tooltip title=''>
            <Avatar
              sx={{ width: 36, height: 36, cursor: 'pointer' }}
              alt={comment?.user?.displayName}
              src={comment?.user?.avatar}
            />
          </Tooltip>
          <Box sx={{ width: 'inherit' }}>
            <Typography
              variant='span'
              sx={{
                fontWeight: 'bold',
                mr: 1,
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#b6c3cf' : '#182a4d'
              }}
            >
              {comment?.user?.displayName}
            </Typography>

            <Typography
              variant='span'
              sx={{
                fontSize: '12px',
                color: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.7) '
                    : 'rgba(0, 0, 0, 0.7)'
              }}
            >
              {moment(comment.commentedAt).format('llll')}
            </Typography>

            <Box
              sx={{
                display: 'block',
                color: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.7) '
                    : 'rgba(0, 0, 0, 0.7)',
                p: '8px 12px',
                mt: '4px',
                border: (theme) =>
                  theme.palette.mode === 'dark'
                    ? '0.5px solid rgba(255, 255, 255, 0.3) '
                    : '0.5px solid rgba(0, 0, 0, 0.3)',
                borderRadius: '4px',
                wordBreak: 'break-word',
                boxShadow: '0 0 1px rgba(0, 0, 0, 0.2)'
              }}
            >
              {comment?.content}
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default CardActivitySection
