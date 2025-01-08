import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid2'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser, updateUserAPI } from '~/redux/user/userSlice'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import AppBar from '~/components/AppBar/AppBar'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import {
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE,
  singleFileValidator
} from '~/utils/validators'
import { useMediaQuery } from '@mui/material'

const VisuallyHiddenInput = styled('input')({
  display: 'none'
})

function AccountSetting() {
  const currentUser = useSelector(selectCurrentUser)
  const dispatch = useDispatch()
  const [avatar, setAvatar] = useState(null)
  const [displayAvatar, setDisplayAvatar] = useState(currentUser?.avatar)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'))
  const mdDown = useMediaQuery((theme) => theme.breakpoints.down('md'))

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const initialGeneralForm = {
    displayName: currentUser?.displayName
  }
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: initialGeneralForm
  })

  const submitChange = ({ displayName, currentPassword, newPassword }) => {
    if (
      displayName === currentUser?.displayName &&
      !avatar &&
      !currentPassword &&
      !newPassword
    )
      return

    const reqData = new FormData()
    reqData.append('displayName', displayName)
    reqData.append('currentPassword', currentPassword)
    reqData.append('newPassword', newPassword)
    reqData.append('avatar', avatar)

    toast.promise(dispatch(updateUserAPI(reqData)), {
      pending: 'Updating...',
      success: 'Updated successfully!'
    })
  }

  const uploadAvatar = (e) => {
    const error = singleFileValidator(e.target?.files[0])
    if (error) {
      toast.error(error)
      return
    }

    setAvatar(e.target?.files[0])
    setDisplayAvatar(URL.createObjectURL(e.target?.files[0]))
  }

  const handleDeleteAvatar = () => {
    setAvatar('')
    setDisplayAvatar(null)
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          px: lgDown ? 2 : 4,
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#1e2125' : '#fff',
          py: 4
        }}
      >
        <Grid
          container
          spacing={{ xs: 2, md: 4, lg: 6 }}
          sx={{
            height: 'fit-content',
            width: '100%',
            maxWidth: '1200px'
          }}
        >
          <Grid
            size={{ xs: 12, md: 3, lg: 2 }}
            offset={{ md: 1, lg: 2 }}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: mdDown ? 'flex-start' : 'flex-end'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: mdDown ? 'row' : 'column',
                alignItems: 'center',
                gap: 2
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  '&:hover .avatarOverplay': {
                    opacity: 1
                  }
                }}
              >
                <Box
                  className='avatarOverplay'
                  sx={{
                    position: 'absolute',
                    width: 'max-content',
                    height: 'max-content',
                    bottom: 0,
                    right: 0,
                    zIndex: 1,
                    opacity: 0,
                    transition: 'opacity 500ms',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Box>
                    <Button
                      sx={{
                        color: (theme) =>
                          theme.palette.mode === 'dark' ? '#9fadbc' : '#44556F',
                        backgroundColor: '#2f2f2f',
                        border: '1px solid #3d444d'
                      }}
                      id='basic-button-edit-avatar'
                      size='small'
                      aria-controls={
                        open ? 'basic-menu-edit-avatar' : undefined
                      }
                      aria-haspopup='true'
                      aria-expanded={open ? 'true' : undefined}
                      onClick={handleClick}
                      startIcon={<EditIcon />}
                    >
                      Edit
                    </Button>
                    <Menu
                      id='basic-menu-edit-avatar'
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button-edit-avatar"'
                      }}
                      sx={{
                        '& .MuiList-root': {
                          padding: '0 !important',
                          '& .MuiMenuItem-root': {
                            padding: 0
                          }
                        }
                      }}
                    >
                      <MenuItem aria-hidden={false} aria-modal={true}>
                        <Button
                          component='label'
                          size='small'
                          sx={{
                            color: (theme) =>
                              theme.palette.mode === 'dark'
                                ? '#9fadbc'
                                : '#44556F',
                            width: '100%',
                            padding: 1
                          }}
                          startIcon={<CloudUploadIcon />}
                        >
                          Upload a photo...
                          <VisuallyHiddenInput
                            type='file'
                            onChange={uploadAvatar}
                          />
                        </Button>
                      </MenuItem>
                      <MenuItem>
                        <Button
                          sx={{
                            color: (theme) =>
                              theme.palette.mode === 'dark'
                                ? '#9fadbc'
                                : '#44556F',
                            width: '100%',
                            padding: 1
                          }}
                          size='small'
                          startIcon={<DeleteIcon />}
                          onClick={handleDeleteAvatar}
                        >
                          Delete your avatar
                        </Button>
                      </MenuItem>
                    </Menu>
                  </Box>
                </Box>
                <Avatar
                  sx={{
                    width: 150,
                    height: 150,
                    '&:hover': {
                      cursor: 'pointer'
                    }
                  }}
                  src={displayAvatar}
                />
              </Box>
              <Box sx={{ textAlign: mdDown ? 'left' : 'center' }}>
                <Typography variant='h6'>{currentUser?.displayName}</Typography>
                <Typography sx={{ color: 'grey' }}>
                  @{currentUser?.username}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <Box sx={{ width: mdDown ? '100%' : '80%' }}>
              <form onSubmit={handleSubmit(submitChange)}>
                <Box sx={{ display: 'flex', gap: 4, flexDirection: 'column' }}>
                  <Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant='h6'>General Information</Typography>
                      <Divider component='form' />
                    </Box>
                    <Box
                      sx={{
                        width: '60%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                      }}
                    >
                      <Box>
                        <TextField
                          size='small'
                          disabled
                          defaultValue={currentUser?.username}
                          fullWidth
                          label='Your Username'
                          type='text'
                          variant='filled'
                        />
                      </Box>
                      <Box>
                        <TextField
                          size='small'
                          disabled
                          defaultValue={currentUser?.email}
                          fullWidth
                          label='Your Email'
                          type='text'
                          variant='filled'
                        />
                      </Box>
                      <Box>
                        <TextField
                          fullWidth
                          label='Your Display Name'
                          type='text'
                          variant='outlined'
                          {...register('displayName', {
                            required: FIELD_REQUIRED_MESSAGE
                          })}
                          error={!!errors['displayName']}
                        />
                        <FieldErrorAlert
                          errors={errors}
                          fieldName={'displayName'}
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant='h6'>Change Password</Typography>
                      <Divider component='form' />
                    </Box>
                    <Box
                      sx={{
                        width: '60%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                      }}
                    >
                      <Box>
                        <TextField
                          fullWidth
                          label='Current Password'
                          type='password'
                          variant='outlined'
                          {...register('currentPassword', {
                            required: !watch('newPassword')
                              ? ''
                              : 'Please enter your current password to change password.'
                          })}
                          error={!!errors['currentPassword']}
                        />
                        <FieldErrorAlert
                          errors={errors}
                          fieldName={'currentPassword'}
                        />
                      </Box>
                      <Box>
                        <TextField
                          fullWidth
                          label='New Password'
                          type='password'
                          variant='outlined'
                          {...register('newPassword', {
                            required: !watch('currentPassword')
                              ? ''
                              : 'Please enter your new password to change password.',
                            pattern: {
                              value: PASSWORD_RULE,
                              message: PASSWORD_RULE_MESSAGE
                            },
                            validate: (value) => {
                              if (
                                value !== watch('currentPassword') ||
                                (value === '' &&
                                  watch('currentPassword' === ''))
                              )
                                return true
                              return 'New password must be different from the current password.'
                            }
                          })}
                          error={!!errors['newPassword']}
                        />
                        <FieldErrorAlert
                          errors={errors}
                          fieldName={'newPassword'}
                        />
                      </Box>

                      <Box>
                        <TextField
                          fullWidth
                          label='New Password Confirmation'
                          type='password'
                          variant='outlined'
                          {...register('newPasswordConfirmation', {
                            validate: (value) => {
                              if (value === watch('newPassword')) return true
                              return 'Password confirmation does not match.'
                            }
                          })}
                          error={!!errors['newPasswordConfirmation']}
                        />
                        <FieldErrorAlert
                          errors={errors}
                          fieldName={'newPasswordConfirmation'}
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ width: '100%' }}>
                    <Box sx={{ mb: 2 }}>
                      <Divider component='form' />
                    </Box>
                    <Button
                      className='interceptor-loading'
                      type='submit'
                      variant='contained'
                      color='primary'
                    >
                      Update
                    </Button>
                  </Box>
                </Box>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default AccountSetting
