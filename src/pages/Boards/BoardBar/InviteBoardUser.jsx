import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Popover from '@mui/material/Popover'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import {
  EMAIL_RULE,
  FIELD_REQUIRED_MESSAGE,
  EMAIL_RULE_MESSAGE
} from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import { inviteUserToBoardAPI } from '~/apis'
import { toast } from 'react-toastify'
import { socket } from '~/socket'

function InviteBoardUser({ boardId }) {
  const [anchorPopoverElement, setAnchorPopoverElement] = useState(null)
  const isOpenPopover = Boolean(anchorPopoverElement)
  const popoverId = isOpenPopover ? 'invite-board-user-popover' : undefined
  const handleTogglePopover = (event) => {
    if (!anchorPopoverElement) setAnchorPopoverElement(event.currentTarget)
    else setAnchorPopoverElement(null)
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm()

  const submitInviteUserToBoard = ({ inviteeEmail }) => {
    inviteUserToBoardAPI(boardId, inviteeEmail).then((invitation) => {
      setValue('inviteeEmail', null)
      setAnchorPopoverElement(null)
      toast.success('Invitation sent!')
      socket.emit('FE_INVITED_USER_TO_BOARD', invitation)
    })
  }

  return (
    <Box>
      <Button
        aria-describedby={popoverId}
        onClick={handleTogglePopover}
        variant='outlined'
        startIcon={<PersonAddIcon />}
        sx={{
          color: '#fff',
          borderColor: '#fff',
          '&:hover': {
            borderColor: '#fff'
          }
        }}
      >
        Invite
      </Button>

      <Popover
        id={popoverId}
        open={isOpenPopover}
        anchorEl={anchorPopoverElement}
        onClose={handleTogglePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              bgcolor: (theme) => theme.palette.background.secondary,
              backgroundImage: 'none'
            }
          }
        }}
      >
        <form
          onSubmit={handleSubmit(submitInviteUserToBoard)}
          style={{ width: '320px' }}
        >
          <Box
            sx={{
              p: '15px 20px 20px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}
          >
            <Typography
              variant='span'
              sx={{ fontWeight: 'bold', fontSize: '16px', color: '#fff' }}
            >
              Invite User To This Board!
            </Typography>
            <Box>
              <TextField
                autoComplete='off'
                autoFocus
                fullWidth
                label='Enter email to invite...'
                type='text'
                variant='outlined'
                sx={{
                  '& label': {
                    color: '#fff'
                  },
                  '& input': {
                    color: '#fff'
                  },
                  '& label.Mui-focused': {
                    color: '#fff'
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#fff'
                    },
                    '&:hover fieldset': {
                      borderColor: '#fff'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#fff'
                    }
                  }
                }}
                {...register('inviteeEmail', {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: { value: EMAIL_RULE, message: EMAIL_RULE_MESSAGE }
                })}
                error={!!errors['inviteeEmail']}
              />
              <FieldErrorAlert errors={errors} fieldName={'inviteeEmail'} />
            </Box>

            <Box sx={{ alignSelf: 'flex-end' }}>
              <Button
                className='interceptor-loading'
                type='submit'
                variant='contained'
                color='info'
              >
                Invite
              </Button>
            </Box>
          </Box>
        </form>
      </Popover>
    </Box>
  )
}

export default InviteBoardUser
