import moment from 'moment'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Skeleton from '@mui/material/Skeleton'

import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import { toast } from 'react-toastify'

function CardActivitySection({ comments = [], isFetching, handleComment }) {
  const currentUser = useSelector(selectCurrentUser)

  return (
    <Box sx={{ mt: 2 }}>
      {isFetching ? (
        [...Array(3)].map((_, index) => (
          <Box
            sx={{ display: 'flex', gap: 1, width: '100%', mb: 1.5 }}
            key={index}
          >
            <Skeleton variant='circular' width={36} height={36} />
            <Box sx={{ width: 'inherit' }}>
              <Skeleton
                variant='text'
                width={100}
                height={20}
                sx={{ display: 'inline-block', mr: 1 }}
              />
              <Skeleton
                variant='text'
                width={200}
                height={15}
                sx={{ display: 'inline-block', verticalAlign: 'text-top' }}
              />
              <Skeleton
                sx={{
                  mt: '4px',
                  border: (theme) =>
                    theme.palette.mode === 'dark'
                      ? '0.5px solid rgba(255, 255, 255, 0.3) '
                      : '0.5px solid rgba(0, 0, 0, 0.3)',
                  borderRadius: '4px',
                  boxShadow: '0 0 1px rgba(0, 0, 0, 0.2)'
                }}
                variant='rectangular'
                width='100%'
                height={32}
              />
            </Box>
          </Box>
        ))
      ) : (
        <>
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
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault()
                  if (!event.target?.value) return
                  handleComment(event.target.value.trim())
                    .then(() => {
                      event.target.value = ''
                    })
                    .catch((error) => {
                      toast.error(error.message)
                    })
                }
              }}
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
                  alt={comment?.createdBy?.displayName}
                  src={comment?.createdBy?.avatar}
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
                  {comment?.createdBy?.displayName}
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
        </>
      )}
    </Box>
  )
}

export default CardActivitySection
