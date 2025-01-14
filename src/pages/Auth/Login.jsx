import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Zoom from '@mui/material/Zoom'
import FacebookIcon from '@mui/icons-material/Facebook'
import GoogleIcon from '@mui/icons-material/Google'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import { keyframes } from '@emotion/react'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { loginAPI, selectCurrentUser } from '~/redux/user/userSlice'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import {
  EMAIL_RULE,
  PASSWORD_RULE,
  FIELD_REQUIRED_MESSAGE,
  EMAIL_RULE_MESSAGE,
  PASSWORD_RULE_MESSAGE,
  USERNAME_RULE,
  USERNAME_RULE_MESSAGE
} from '~/utils/validators'
import { registerUserAPI } from '~/apis'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'

const move = keyframes`
    0%, 49.99%{
        opacity: 0;
        z-index: 1;
    }
    50%, 100%{
        opacity: 1;
        z-index: 5;
    }
  `

function Login() {
  const navigate = useNavigate()
  const currentUser = useSelector(selectCurrentUser)
  const dispatch = useDispatch()

  const [signUp, setSignUp] = useState(false)
  const [forgotPassword, setForgotPassword] = useState(false)
  const [username, setUsername] = useState('')
  const initialGeneralForm = {
    forgotPasswordUsername: username
  }
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    clearErrors
  } = useForm({
    defaultValues: initialGeneralForm
  })

  if (currentUser) {
    return navigate('/', { replace: true })
  }

  const submitRegister = ({
    registerUsername: username,
    registerEmail: email,
    registerPassword: password
  }) => {
    toast
      .promise(registerUserAPI({ username, email, password }), {
        pending: 'Registering...',
        success: 'Register successfully! Please verify your email to continue.'
      })
      .then(() => {
        navigate(`/account/verification?email=${email}`)
      })
  }

  const submitLogIn = ({
    loginUsername: username,
    loginPassword: password
  }) => {
    dispatch(loginAPI({ username, password }))
  }

  const submitForgotPassword = ({ username }) => {}

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#1e2125' : '#fff')
      }}
    >
      <Zoom in={true} style={{ transitionDelay: '200ms' }}>
        {forgotPassword ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              borderRadius: 3.75,
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.35)',
              position: 'relative',
              maxWidth: '100%',
              overflow: 'hidden',
              padding: 5
            }}
          >
            <Typography variant='h5' fontWeight={700}>
              Reset Password
            </Typography>
            <Typography
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(255,255,255,0.7)'
                    : 'rgba(0,0,0,0.7)',
                fontSize: '16px',
                textDecoration: 'none',
                textAlign: 'center'
              }}
              variant='body1'
            >
              Enter your username or email to reset your password
            </Typography>
            <Box>
              <TextField
                fullWidth
                label='Email or Username'
                type='text'
                variant='outlined'
                error={errors.forgotPasswordUsername}
                {...register('forgotPasswordUsername', {
                  required: FIELD_REQUIRED_MESSAGE,
                  onChange: (event) => {
                    clearErrors()
                    setUsername(event.target.value)
                  },
                  validate: {
                    username: (value) => {
                      if (value.match(EMAIL_RULE) || value.match(USERNAME_RULE))
                        return true
                      return 'Invalid username!'
                    }
                  }
                })}
              />
              <FieldErrorAlert
                errors={errors}
                fieldName='forgotPasswordUsername'
              />
            </Box>
            <Button
              className='interceptor-loading'
              onClick={handleSubmit}
              variant='contained'
              color='primary'
              size='large'
              sx={{
                backgroundColor: '#512da8',
                color: '#fff',
                fontSize: '12px',
                padding: '10px 45px',
                border: '1px solid transparent',
                borderRadius: 1,
                fontWeight: '600',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                mt: 1.25,
                cursor: 'pointer'
              }}
            >
              Send email
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              borderRadius: 3.75,
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.35)',
              position: 'relative',
              width: '1024px',
              maxWidth: '100%',
              minHeight: '720px',
              overflow: 'hidden'
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: '0',
                height: '100%',
                transition: ' all 0.4s ease-in-out',
                left: '0',
                width: '50%',
                opacity: !signUp && 0,
                zIndex: signUp && 5,
                transform: signUp && 'translateX(100%)',
                animation: signUp && `${move} 0.5s`
              }}
            >
              <form
                onSubmit={handleSubmit(submitRegister)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  padding: '0 40px',
                  height: '100%'
                }}
              >
                <Typography variant='h4' fontWeight={700}>
                  Create Account
                </Typography>
                <Box sx={{ my: 2 }}>
                  <Link>
                    <GoogleIcon
                      sx={{
                        color: (theme) =>
                          theme.palette.mode === 'dark' ? '#fff' : '#000',
                        mx: 1,
                        transition: 'all 0.2s',
                        '&:hover': {
                          color: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'rgba(255,255,255,0.7)'
                              : 'rgba(0,0,0,0.7)'
                        }
                      }}
                    />
                  </Link>
                  <Link>
                    <FacebookIcon
                      sx={{
                        color: (theme) =>
                          theme.palette.mode === 'dark' ? '#fff' : '#000',
                        mx: 1,
                        transition: 'all 0.2s',
                        '&:hover': {
                          color: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'rgba(255,255,255,0.7)'
                              : 'rgba(0,0,0,0.7)'
                        }
                      }}
                    />
                  </Link>
                  <Link>
                    <GitHubIcon
                      sx={{
                        color: (theme) =>
                          theme.palette.mode === 'dark' ? '#fff' : '#000',
                        mx: 1,
                        transition: 'all 0.2s',

                        '&:hover': {
                          color: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'rgba(255,255,255,0.7)'
                              : 'rgba(0,0,0,0.7)'
                        }
                      }}
                    />
                  </Link>
                  <Link>
                    <LinkedInIcon
                      sx={{
                        color: (theme) =>
                          theme.palette.mode === 'dark' ? '#fff' : '#000',
                        mx: 1,
                        transition: 'all 0.2s',
                        '&:hover': {
                          color: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'rgba(255,255,255,0.7)'
                              : 'rgba(0,0,0,0.7)'
                        }
                      }}
                    />
                  </Link>
                </Box>
                <Typography
                  sx={{
                    color: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(255,255,255,0.7)'
                        : 'rgba(0,0,0,0.7)',
                    fontSize: '12px',
                    textDecoration: 'none'
                  }}
                  variant='body2'
                >
                  or use your email for registeration
                </Typography>
                {signUp ? (
                  <Box sx={{ width: '100%' }}>
                    <Box sx={{ my: 1 }}>
                      <TextField
                        autoFocus
                        fullWidth
                        label='Username'
                        type='text'
                        variant='outlined'
                        error={errors.registerUsername}
                        {...register('registerUsername', {
                          required: FIELD_REQUIRED_MESSAGE,
                          pattern: {
                            value: USERNAME_RULE,
                            message: USERNAME_RULE_MESSAGE
                          }
                        })}
                      />
                      <FieldErrorAlert
                        errors={errors}
                        fieldName='registerUsername'
                      />
                    </Box>
                    <Box sx={{ my: 1 }}>
                      <TextField
                        autoFocus
                        fullWidth
                        label='Email'
                        type='text'
                        variant='outlined'
                        error={errors.registerEmail}
                        {...register('registerEmail', {
                          required: FIELD_REQUIRED_MESSAGE,
                          pattern: {
                            value: EMAIL_RULE,
                            message: EMAIL_RULE_MESSAGE
                          }
                        })}
                      />
                      <FieldErrorAlert
                        errors={errors}
                        fieldName='registerEmail'
                      />
                    </Box>
                    <Box sx={{ my: 1 }}>
                      <TextField
                        fullWidth
                        label='Password'
                        type='password'
                        variant='outlined'
                        error={errors.registerPassword}
                        {...register('registerPassword', {
                          required: FIELD_REQUIRED_MESSAGE,
                          pattern: {
                            value: PASSWORD_RULE,
                            message: PASSWORD_RULE_MESSAGE
                          }
                        })}
                      />
                      <FieldErrorAlert
                        errors={errors}
                        fieldName='registerPassword'
                      />
                    </Box>
                    <Box sx={{ my: 1 }}>
                      <TextField
                        fullWidth
                        label='Password confirmation'
                        type='password'
                        variant='outlined'
                        {...register('registerPasswordConfirmation', {
                          validate: (value) => {
                            if (value === watch('registerPassword')) return true
                            return 'Password confirmation does not match!'
                          }
                        })}
                      />
                      <FieldErrorAlert
                        errors={errors}
                        fieldName='registerPasswordConfirmation'
                      />
                    </Box>
                  </Box>
                ) : (
                  <Box sx={{ width: '100%' }}>
                    <Box sx={{ my: 1 }}>
                      <TextField
                        autoFocus
                        fullWidth
                        label='Username'
                        type='text'
                        variant='outlined'
                      />
                    </Box>
                    <Box sx={{ my: 1 }}>
                      <TextField
                        autoFocus
                        fullWidth
                        label='Email'
                        type='text'
                        variant='outlined'
                      />
                    </Box>
                    <Box sx={{ my: 1 }}>
                      <TextField
                        fullWidth
                        label='Password'
                        type='password'
                        variant='outlined'
                      />
                    </Box>
                    <Box sx={{ my: 1 }}>
                      <TextField
                        fullWidth
                        label='Password confirmation'
                        type='password'
                        variant='outlined'
                      />
                    </Box>
                  </Box>
                )}

                <Button
                  className='interceptor-loading'
                  type='submit'
                  variant='contained'
                  color='primary'
                  size='large'
                  sx={{
                    backgroundColor: '#512da8',
                    color: '#fff',
                    fontSize: '12px',
                    padding: '10px 45px',
                    border: '1px solid transparent',
                    borderRadius: 1,
                    fontWeight: '600',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    mt: 1.25,
                    cursor: 'pointer'
                  }}
                >
                  Register
                </Button>
              </form>
            </Box>
            <Box
              sx={{
                position: 'absolute',
                top: '0',
                height: '100%',
                transition: ' all 0.4s ease-in-out',
                left: '0',
                width: '50%',
                opacity: signUp && 0,
                zIndex: !signUp && 5,
                transform: signUp && 'translateX(100%)',
                animation: !signUp && `${move} 0.5s`
              }}
            >
              <form
                onSubmit={handleSubmit(submitLogIn)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  padding: '0 40px',
                  height: '100%'
                }}
              >
                <Typography variant='h4' fontWeight={700}>
                  Sign in
                </Typography>
                <Box sx={{ my: 2 }}>
                  <Link>
                    <GoogleIcon
                      sx={{
                        color: (theme) =>
                          theme.palette.mode === 'dark' ? '#fff' : '#000',
                        mx: 1,
                        transition: 'all 0.2s',
                        '&:hover': {
                          color: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'rgba(255,255,255,0.7)'
                              : 'rgba(0,0,0,0.7)'
                        }
                      }}
                    />
                  </Link>
                  <Link>
                    <FacebookIcon
                      sx={{
                        color: (theme) =>
                          theme.palette.mode === 'dark' ? '#fff' : '#000',
                        mx: 1,
                        transition: 'all 0.2s',
                        '&:hover': {
                          color: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'rgba(255,255,255,0.7)'
                              : 'rgba(0,0,0,0.7)'
                        }
                      }}
                    />
                  </Link>
                  <Link>
                    <GitHubIcon
                      sx={{
                        color: (theme) =>
                          theme.palette.mode === 'dark' ? '#fff' : '#000',
                        mx: 1,
                        transition: 'all 0.2s',

                        '&:hover': {
                          color: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'rgba(255,255,255,0.7)'
                              : 'rgba(0,0,0,0.7)'
                        }
                      }}
                    />
                  </Link>

                  <Link>
                    <LinkedInIcon
                      sx={{
                        color: (theme) =>
                          theme.palette.mode === 'dark' ? '#fff' : '#000',
                        mx: 1,
                        transition: 'all 0.2s',
                        '&:hover': {
                          color: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'rgba(255,255,255,0.7)'
                              : 'rgba(0,0,0,0.7)'
                        }
                      }}
                    />
                  </Link>
                </Box>
                <Typography
                  sx={{
                    color: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(255,255,255,0.7)'
                        : 'rgba(0,0,0,0.7)',
                    fontSize: '12px',
                    textDecoration: 'none'
                  }}
                  variant='body2'
                >
                  or use your email password
                </Typography>

                {signUp ? (
                  <Box sx={{ width: '100%' }}>
                    <Box sx={{ marginTop: '1em' }}>
                      <TextField
                        fullWidth
                        label='Email or Username'
                        type='text'
                        variant='outlined'
                      />
                    </Box>
                    <Box sx={{ marginTop: '1em' }}>
                      <TextField
                        fullWidth
                        label='Password'
                        type='password'
                        variant='outlined'
                      />
                    </Box>
                  </Box>
                ) : (
                  <Box sx={{ width: '100%' }}>
                    <Box sx={{ marginTop: '1em' }}>
                      <TextField
                        fullWidth
                        label='Email or Username'
                        type='text'
                        variant='outlined'
                        error={errors.loginUsername}
                        {...register('loginUsername', {
                          required: FIELD_REQUIRED_MESSAGE,
                          onChange: (event) => {
                            clearErrors('loginUsername')
                            setUsername(event.target.value)
                          },
                          validate: {
                            username: (value) => {
                              if (
                                value.match(EMAIL_RULE) ||
                                value.match(USERNAME_RULE)
                              )
                                return true
                              return 'Invalid username!'
                            }
                          }
                        })}
                      />
                      <FieldErrorAlert
                        errors={errors}
                        fieldName='loginUsername'
                      />
                    </Box>
                    <Box sx={{ marginTop: '1em' }}>
                      <TextField
                        fullWidth
                        label='Password'
                        type='password'
                        variant='outlined'
                        error={errors.loginPassword}
                        {...register('loginPassword', {
                          required: FIELD_REQUIRED_MESSAGE,
                          onChange: () => clearErrors('loginPassword')
                        })}
                      />
                      <FieldErrorAlert
                        errors={errors}
                        fieldName='loginPassword'
                      />
                    </Box>
                  </Box>
                )}

                <Typography
                  variant='body2'
                  sx={{
                    color: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(255,255,255,0.7)'
                        : 'rgba(0,0,0,0.7)',
                    fontSize: '12px',
                    margin: '15px 0 10px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': {
                      color: '#b99cff',
                      textDecoration: 'underline'
                    }
                  }}
                  onClick={() => {
                    setForgotPassword(!forgotPassword)
                    clearErrors()
                  }}
                >
                  Forget your password?
                </Typography>
                <Button
                  className='interceptor-loading'
                  type='submit'
                  variant='contained'
                  color='primary'
                  size='large'
                  sx={{
                    backgroundColor: '#512da8',
                    color: '#fff',
                    fontSize: '12px',
                    padding: '10px 45px',
                    border: '1px solid transparent',
                    borderRadius: 1,
                    fontWeight: '600',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    mt: 1.25,
                    cursor: 'pointer'
                  }}
                >
                  Sign in
                </Button>
              </form>
            </Box>
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: '50%',
                width: '50%',
                height: '100%',
                overflow: 'hidden',
                transition: 'all 0.6s ease-in-out',
                borderRadius: signUp ? ' 0 150px 100px 0' : '150px 0 0 100px',
                zIndex: 1000,
                transform: signUp && 'translateX(-100%)'
              }}
            >
              <Box
                sx={{
                  backgroundColor: ' #512da8',
                  height: '100%',
                  background: 'linear-gradient(to right, #5c6bc0, #512da8)',
                  color: '#fff',
                  position: 'relative',
                  left: '-100%',
                  width: '200%',
                  transform: signUp ? 'translateX(50%)' : 'translateX(0)',
                  transition: 'all 0.6s ease-in-out'
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    width: '50%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    px: 3.75,
                    textAlign: 'center',
                    top: 0,
                    transform: signUp ? 'translateX(0)' : 'translateX(-200%)',
                    transition: 'all 0.6s ease-in-out'
                  }}
                >
                  <Typography variant='h4' fontWeight={700}>
                    Welcome Back!
                  </Typography>
                  <Typography
                    variant='body1'
                    sx={{
                      fontSize: '14px',
                      lineHeight: '20px',
                      letterSpacing: '0.3px',
                      my: 2.5
                    }}
                  >
                    Enter your personal details to use all of site features
                  </Typography>
                  <Button
                    sx={{
                      backgroundColor: 'transparent',
                      color: '#fff',
                      fontSize: '12px',
                      padding: '10px 45px',
                      border: '1px solid #fff',
                      borderRadius: '8px',
                      fontWeight: '600',
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                      marginTop: '10px',
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      setSignUp(!signUp)
                      clearErrors()
                    }}
                  >
                    Sign in
                  </Button>
                </Box>
                <Box
                  sx={{
                    position: 'absolute',
                    width: '50%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    px: 3.75,
                    textAlign: 'center',
                    top: 0,
                    transform: signUp ? 'translateX(200%)' : 'translateX(0)',
                    transition: 'all 0.6s ease-in-out',
                    right: 0
                  }}
                >
                  <Typography variant='h4' fontWeight={700}>
                    Hello, Friend!
                  </Typography>
                  <Typography
                    variant='body1'
                    sx={{
                      fontSize: '14px',
                      lineHeight: '20px',
                      letterSpacing: '0.3px',
                      my: 2.5
                    }}
                  >
                    Register with your personal details to use all of site
                    features
                  </Typography>
                  <Button
                    sx={{
                      backgroundColor: 'transparent',
                      color: '#fff',
                      fontSize: '12px',
                      padding: '10px 45px',
                      border: '1px solid #fff',
                      borderRadius: '8px',
                      fontWeight: '600',
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                      marginTop: '10px',
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      setSignUp(!signUp)
                      clearErrors()
                    }}
                  >
                    Sign up
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Zoom>
    </Box>
  )
}

export default Login
