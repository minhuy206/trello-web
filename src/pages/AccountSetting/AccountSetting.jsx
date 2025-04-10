import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid2'
import useMediaQuery from '@mui/material/useMediaQuery'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import RestoreIcon from '@mui/icons-material/Restore'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteUserAvatarAPI,
  selectCurrentUser,
  updateUserAPI
} from '~/redux/user/userSlice'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import {
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE,
  singleFileValidator
} from '~/utils/validators'

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
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      displayName: currentUser?.displayName
    }
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
    displayName && reqData.append('displayName', displayName)
    currentPassword && reqData.append('currentPassword', currentPassword)
    newPassword && reqData.append('newPassword', newPassword)
    avatar && reqData.append('avatar', avatar)

    toast
      .promise(dispatch(updateUserAPI(reqData)), {
        pending: 'Updating...'
      })
      .then((res) => {
        if (res.payload) {
          setDisplayAvatar(res.payload.avatar && res.payload.avatar)
          toast.success('Updated successfully!')
        }
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
    toast
      .promise(dispatch(deleteUserAvatarAPI()), {
        pending: 'Updating...',
        success: 'Updated successfully!'
      })
      .then(() => {
        setAvatar('')
        setDisplayAvatar(null)
      })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        px: lgDown ? 2 : 4,
        bgcolor: (theme) => theme.palette.background.default,
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
                        theme.palette.mode === 'dark' ? '#9fadbc' : '#182a4d',
                      boxShadow: (theme) =>
                        theme.palette.mode === 'dark'
                          ? '0 0 5px 0 rgba(0, 0, 0, 0.2)'
                          : '0 0 5px 0 rgba(255, 255, 255, 0.2)',
                      bgcolor: (theme) => theme.palette.background.default
                    }}
                    id='basic-button-edit-avatar'
                    size='small'
                    aria-controls={open ? 'basic-menu-edit-avatar' : undefined}
                    aria-haspopup='true'
                    aria-expanded={open ? 'true' : undefined}
                    onClick={(event) => {
                      setAnchorEl(event.currentTarget)
                    }}
                    startIcon={<EditIcon />}
                  >
                    Edit
                  </Button>
                  <Menu
                    id='basic-menu-edit-avatar'
                    anchorEl={anchorEl}
                    open={open}
                    onClose={() => {
                      setAnchorEl(null)
                    }}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button-edit-avatar"'
                    }}
                    sx={{
                      '& .MuiList-root': {
                        padding: '0 !important',
                        bgcolor: (theme) => theme.palette.background.default,
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
                              : '#182a4d',
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
                    {displayAvatar !== currentUser?.avatar && displayAvatar && (
                      <MenuItem>
                        <Button
                          sx={{
                            color: (theme) =>
                              theme.palette.mode === 'dark'
                                ? '#9fadbc'
                                : '#182a4d',
                            width: '100%',
                            padding: 1
                          }}
                          size='small'
                          startIcon={<RestoreIcon />}
                          onClick={() => setDisplayAvatar(currentUser?.avatar)}
                        >
                          Revert your avatar
                        </Button>
                      </MenuItem>
                    )}
                    {currentUser?.avatar && (
                      <MenuItem>
                        <Button
                          sx={{
                            color: (theme) =>
                              theme.palette.mode === 'dark'
                                ? '#9fadbc'
                                : '#182a4d',
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
                    )}
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
            <Box
              sx={{
                textAlign: mdDown ? 'left' : 'center',
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#9fadbc' : '#182a4d'
              }}
            >
              <Typography variant='h6'>{currentUser?.displayName}</Typography>
              <Typography
                sx={{
                  color: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.7)'
                      : 'rgba(0, 0, 0, 0.7)'
                }}
              >
                @{currentUser?.username}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ width: mdDown ? '100%' : '80%' }}>
            <form onSubmit={handleSubmit(submitChange)}>
              <Box
                sx={{
                  display: 'flex',
                  gap: 4,
                  flexDirection: 'column',
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? '#9fadbc' : '#182a4d'
                }}
              >
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
                        sx={{
                          '& label': {
                            color: (theme) =>
                              theme.palette.mode === 'dark'
                                ? '#9fadbc'
                                : '#182a4d'
                          },
                          '& input': {
                            color: (theme) =>
                              theme.palette.mode === 'dark'
                                ? '#9fadbc'
                                : '#182a4d'
                          },
                          '& label.Mui-focused': {
                            color: (theme) =>
                              theme.palette.mode === 'dark'
                                ? '#9fadbc'
                                : '#182a4d'
                          },
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: (theme) =>
                                theme.palette.mode === 'dark'
                                  ? '#9fadbc'
                                  : '#182a4d'
                            },
                            '&:hover fieldset': {
                              borderColor: (theme) =>
                                theme.palette.mode === 'dark'
                                  ? '#9fadbc'
                                  : '#182a4d'
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: (theme) =>
                                theme.palette.mode === 'dark'
                                  ? '#9fadbc'
                                  : '#182a4d'
                            }
                          }
                        }}
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
                        sx={{
                          '& label': {
                            color: (theme) =>
                              theme.palette.mode === 'dark'
                                ? '#9fadbc'
                                : '#182a4d'
                          },
                          '& input': {
                            color: (theme) =>
                              theme.palette.mode === 'dark'
                                ? '#9fadbc'
                                : '#182a4d'
                          },
                          '& label.Mui-focused': {
                            color: (theme) =>
                              theme.palette.mode === 'dark'
                                ? '#9fadbc'
                                : '#182a4d'
                          },
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: (theme) =>
                                theme.palette.mode === 'dark'
                                  ? '#9fadbc'
                                  : '#182a4d'
                            },
                            '&:hover fieldset': {
                              borderColor: (theme) =>
                                theme.palette.mode === 'dark'
                                  ? '#9fadbc'
                                  : '#182a4d'
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: (theme) =>
                                theme.palette.mode === 'dark'
                                  ? '#9fadbc'
                                  : '#182a4d'
                            }
                          }
                        }}
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
                        sx={{
                          '& label': {
                            color: (theme) =>
                              theme.palette.mode === 'dark'
                                ? '#9fadbc'
                                : '#182a4d'
                          },
                          '& input': {
                            color: (theme) =>
                              theme.palette.mode === 'dark'
                                ? '#9fadbc'
                                : '#182a4d'
                          },
                          '& label.Mui-focused': {
                            color: (theme) =>
                              theme.palette.mode === 'dark'
                                ? '#9fadbc'
                                : '#182a4d'
                          },
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: (theme) =>
                                theme.palette.mode === 'dark'
                                  ? '#9fadbc'
                                  : '#182a4d'
                            },
                            '&:hover fieldset': {
                              borderColor: (theme) =>
                                theme.palette.mode === 'dark'
                                  ? '#9fadbc'
                                  : '#182a4d'
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: (theme) =>
                                theme.palette.mode === 'dark'
                                  ? '#9fadbc'
                                  : '#182a4d'
                            }
                          }
                        }}
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
                              (value === '' && watch('currentPassword' === ''))
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
                        sx={{
                          '& label': {
                            color: (theme) =>
                              theme.palette.mode === 'dark'
                                ? '#9fadbc'
                                : '#182a4d'
                          },
                          '& input': {
                            color: (theme) =>
                              theme.palette.mode === 'dark'
                                ? '#9fadbc'
                                : '#182a4d'
                          },
                          '& label.Mui-focused': {
                            color: (theme) =>
                              theme.palette.mode === 'dark'
                                ? '#9fadbc'
                                : '#182a4d'
                          },
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: (theme) =>
                                theme.palette.mode === 'dark'
                                  ? '#9fadbc'
                                  : '#182a4d'
                            },
                            '&:hover fieldset': {
                              borderColor: (theme) =>
                                theme.palette.mode === 'dark'
                                  ? '#9fadbc'
                                  : '#182a4d'
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: (theme) =>
                                theme.palette.mode === 'dark'
                                  ? '#9fadbc'
                                  : '#182a4d'
                            }
                          }
                        }}
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
  )
}

export default AccountSetting
