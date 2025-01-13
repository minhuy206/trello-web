/* eslint-disable indent */
import { useEffect, useState } from 'react'
import moment from 'moment'
import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import DoneIcon from '@mui/icons-material/Done'
import NotInterestedIcon from '@mui/icons-material/NotInterested'

import { useDispatch, useSelector } from 'react-redux'
import {
  addNotification,
  fetchInvitationAPI,
  selectCurrentNotifications,
  updateBoardInvitationAPI
} from '~/redux/notifications/notificationsSlice'
import { selectCurrentUser } from '~/redux/user/userSlice'

import { socket } from '~/socket'
import { useNavigate } from 'react-router-dom'

const INVITATION_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected'
}

function Notifications() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClickNotificationIcon = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const [newNotifications, setNewNotifications] = useState(null)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const notifications = useSelector(selectCurrentNotifications)
  const currentUser = useSelector(selectCurrentUser)

  const updateBoardInvitation = (invitationId, status) => {
    dispatch(updateBoardInvitationAPI({ invitationId, status })).then((res) => {
      if (res.payload.boardInvitation.status === INVITATION_STATUS.ACCEPTED) {
        navigate(`/boards/${res.payload.boardInvitation.boardId}`)
      }
    })
  }

  useEffect(() => {
    dispatch(fetchInvitationAPI())

    // Hàm này sẽ được gọi mỗi khi có một sự kiện realtime từ server gửi về
    const onReceiveInvitation = (invitation) => {
      if (invitation.inviteeId === currentUser?._id) {
        dispatch(addNotification(invitation))
        setNewNotifications(true)
      }
    }

    // Lắng nghe sự kiện realtime từ server gửi về có tên là BE_INVITED_USER_TO_BOARD
    socket.on('BE_INVITED_USER_TO_BOARD', onReceiveInvitation)

    // Hàm cleanup khi component bị unmount
    return () => {
      socket.off('BE_INVITED_USER_TO_BOARD', onReceiveInvitation)
    }
  }, [dispatch, currentUser])

  return (
    <Box>
      <Tooltip title='Notifications'>
        <Badge
          color='warning'
          variant={newNotifications ? 'dot' : 'none'}
          sx={{ cursor: 'pointer' }}
          id='basic-button-open-notification'
          aria-controls={open ? 'basic-notification-drop-down' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickNotificationIcon}
        >
          <NotificationsNoneIcon
            sx={{
              color: newNotifications
                ? 'yellow'
                : (theme) =>
                    theme.palette.mode === 'dark' ? '#9fadbc' : '#44556F'
            }}
          />
        </Badge>
      </Tooltip>

      <Menu
        sx={{
          mt: 2,
          '& .MuiList-root': {
            p: 0,
            bgcolor: (theme) =>
              theme.palette.mode === 'dark' ? '#1e2125' : '#fff',
            color: (theme) =>
              theme.palette.mode === 'dark' ? '#9fadbc' : '#44556F'
          },
          '& .MuiDivider-root': {
            m: '0 !important'
          },
          '& .MuiMenuItem-root': {
            padding: '12px 16px'
          }
        }}
        id='basic-notification-drop-down'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'basic-button-open-notification' }}
      >
        {(notifications ?? []).length === 0 && (
          <MenuItem sx={{ minWidth: 200 }}>
            You do not have any new notifications.
          </MenuItem>
        )}
        {notifications?.map((notification, index) => (
          <Box key={notification?._id}>
            <MenuItem
              sx={{
                minWidth: 200,
                maxWidth: 360,
                overflowY: 'auto'
              }}
            >
              <Box
                sx={{
                  maxWidth: '100%',
                  wordBreak: 'break-word',
                  whiteSpace: 'pre-wrap',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box>
                    <GroupAddIcon fontSize='small' />
                  </Box>
                  <Box>
                    <strong>{notification?.inviter?.displayName}</strong> had
                    invited you to join the board{' '}
                    <strong>{notification?.board?.title}</strong>
                  </Box>
                </Box>

                {notification?.boardInvitation.status ===
                INVITATION_STATUS.PENDING ? (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      justifyContent: 'flex-end'
                    }}
                  >
                    <Button
                      className='interceptor-loading'
                      type='submit'
                      variant='contained'
                      color='success'
                      size='small'
                      onClick={() =>
                        updateBoardInvitation(
                          notification?._id,
                          INVITATION_STATUS.ACCEPTED
                        )
                      }
                    >
                      Accept
                    </Button>
                    <Button
                      className='interceptor-loading'
                      type='submit'
                      variant='contained'
                      color='secondary'
                      size='small'
                      onClick={() =>
                        updateBoardInvitation(
                          notification?._id,
                          INVITATION_STATUS.REJECTED
                        )
                      }
                    >
                      Reject
                    </Button>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      justifyContent: 'flex-end'
                    }}
                  >
                    {notification?.boardInvitation.status ===
                    INVITATION_STATUS.ACCEPTED ? (
                      <Chip
                        icon={<DoneIcon />}
                        label='Accepted'
                        color='success'
                        size='small'
                      />
                    ) : (
                      <Chip
                        icon={<NotInterestedIcon />}
                        label='Rejected'
                        size='small'
                      />
                    )}
                  </Box>
                )}

                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant='span' sx={{ fontSize: '13px' }}>
                    {moment(notification?.createdAt).format('llll')}
                  </Typography>
                </Box>
              </Box>
            </MenuItem>
            {index !== notifications.length - 1 && <Divider />}
          </Box>
        ))}
      </Menu>
    </Box>
  )
}

export default Notifications
