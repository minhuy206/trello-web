import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Alert, keyframes } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import GoogleIcon from '@mui/icons-material/Google'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TextField from '@mui/material/TextField'
import Zoom from '@mui/material/Zoom'
import { useForm } from 'react-hook-form'
import {
  EMAIL_RULE,
  PASSWORD_RULE,
  FIELD_REQUIRED_MESSAGE,
  EMAIL_RULE_MESSAGE,
  PASSWORD_RULE_MESSAGE,
  USERNAME_RULE,
  USERNAME_RULE_MESSAGE
} from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import { toast } from 'react-toastify'
import { registerUserAPI } from '~/apis'
import { useState } from 'react'
import Tooltip from '@mui/material/Tooltip'

function LoginnRegister() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    clearErrors
  } = useForm()
  const [signUp, setSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [searchParams] = useSearchParams()
  const verifiedEmail = searchParams.get('verifiedEmail')
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

  const submitRegister = ({
    registerUsername: username,
    registerEmail: email,
    registerPassword: password
  }) => {
    toast
      .promise(registerUserAPI({ username, email, password }), {
        pending: 'Registering...'
      })
      .then(() => {
        setEmail(email)
        setSignUp(false)
      })
  }

  const submitLogIn = (data) => {}

  return (
    <Zoom in={true} style={{ transitionDelay: '200ms' }}>
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
            <Box sx={{ my: 2.5 }}>
              <Tooltip title='This action is on development. Please use your email for registeration'>
                <Link>
                  <GoogleIcon
                    sx={{
                      color: '#fff',
                      mx: 1,
                      '&:hover': {
                        color: '#ccc'
                      }
                    }}
                  />
                </Link>
              </Tooltip>
              <Tooltip title='This action is on development. Please use your email for registeration'>
                <Link>
                  <FacebookIcon
                    sx={{
                      color: '#fff',
                      mx: 1,
                      '&:hover': {
                        color: '#ccc'
                      }
                    }}
                  />
                </Link>
              </Tooltip>
              <Tooltip title='This action is on development. Please use your email for registeration'>
                <Link>
                  <GitHubIcon
                    sx={{
                      color: '#fff',
                      mx: 1,
                      '&:hover': {
                        color: '#ccc'
                      }
                    }}
                  />
                </Link>
              </Tooltip>
              <Tooltip title='This action is on development. Please use your email for registeration'>
                <Link>
                  <LinkedInIcon
                    sx={{
                      color: '#fff',
                      mx: 1,
                      '&:hover': {
                        color: '#ccc'
                      }
                    }}
                  />
                </Link>
              </Tooltip>
            </Box>
            <Typography
              sx={{
                color: '#ccc',
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
                  <FieldErrorAlert errors={errors} fieldName='registerEmail' />
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
            <Box sx={{ my: 2.5 }}>
              <Tooltip title='This action is on development. Please use your email for registeration'>
                <Link>
                  <GoogleIcon
                    sx={{
                      color: '#fff',
                      mx: 1,
                      '&:hover': {
                        color: '#ccc'
                      }
                    }}
                  />
                </Link>
              </Tooltip>
              <Tooltip title='This action is on development. Please use your email for registeration'>
                <Link>
                  <FacebookIcon
                    sx={{
                      color: '#fff',
                      mx: 1,
                      '&:hover': {
                        color: '#ccc'
                      }
                    }}
                  />
                </Link>
              </Tooltip>
              <Tooltip title='This action is on development. Please use your email for registeration'>
                <Link>
                  <GitHubIcon
                    sx={{
                      color: '#fff',
                      mx: 1,
                      '&:hover': {
                        color: '#ccc'
                      }
                    }}
                  />
                </Link>
              </Tooltip>
              <Tooltip title='This action is on development. Please use your email for registeration'>
                <Link>
                  <LinkedInIcon
                    sx={{
                      color: '#fff',
                      mx: 1,
                      '&:hover': {
                        color: '#ccc'
                      }
                    }}
                  />
                </Link>
              </Tooltip>
            </Box>
            <Typography
              sx={{
                color: '#ccc',
                fontSize: '12px',
                textDecoration: 'none'
              }}
              variant='body2'
            >
              or use your email password
            </Typography>
            {verifiedEmail && (
              <Alert
                severity='success'
                sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}
              >
                Your email address&nbsp;
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    '&:hover': { color: '#fdba26' },
                    display: 'inline'
                  }}
                >
                  {verifiedEmail}
                </Typography>
                &nbsp;has been verified.
                <br />
                Now you can login to enjoy our services! Have a good day!
              </Alert>
            )}
            {email && (
              <Alert
                severity='info'
                sx={{
                  width: '100%',
                  '.MuiAlert-message': { overflow: 'hidden' }
                }}
              >
                An email has been sent to&nbsp;
                <Typography
                  display='inline'
                  sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}
                >
                  {email}
                </Typography>
                <br />
                Please check and verify your account before logging in!
              </Alert>
            )}
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
                  <FieldErrorAlert errors={errors} fieldName='loginUsername' />
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
                      pattern: {
                        value: PASSWORD_RULE,
                        message: PASSWORD_RULE_MESSAGE
                      }
                    })}
                  />
                  <FieldErrorAlert errors={errors} fieldName='loginPassword' />
                </Box>
              </Box>
            )}

            <Typography
              variant='body2'
              sx={{
                color: '#ccc',
                fontSize: '12px',
                textDecoration: 'none',
                margin: '15px 0 10px',
                cursor: 'pointer',
                '&:hover': { color: '#512da8' }
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
                Register with your personal details to use all of site features
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
    </Zoom>
  )
}

export default LoginnRegister
