import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import HomeIcon from '@mui/icons-material/Home'
import { Link } from 'react-router-dom'

import amongus_blue from '~/assets/404/amongus_blue.png'
import amongus_cyan from '~/assets/404/amongus_cyan.png'
import amongus_green from '~/assets/404/amongus_green.png'
import amongus_lime from '~/assets/404/amongus_lime.png'
import amongus_white from '~/assets/404/amongus_white.png'
import amongus_pink from '~/assets/404/amongus_pink.png'
import amongus_orange from '~/assets/404/amongus_orange.png'
import amongus_red from '~/assets/404/amongus_red.png'
import ParticlesBackground from '~/components/Particles/Particles'
const options = {
  fullScreen: {
    enable: true
  },
  fpsLimit: 60,
  particles: {
    groups: {
      z5000: {
        number: {
          value: 70
        },
        zIndex: {
          value: 5000
        }
      },
      z7500: {
        number: {
          value: 30
        },
        zIndex: {
          value: 75
        }
      },
      z2500: {
        number: {
          value: 50
        },
        zIndex: {
          value: 25
        }
      },
      z1000: {
        number: {
          value: 40
        },
        zIndex: {
          value: 10
        }
      }
    },
    number: {
      value: 200,
      density: {
        enable: false,
        value_area: 800
      }
    },
    color: {
      value: '#fff',
      animation: {
        enable: false,
        speed: 20,
        sync: true
      }
    },
    shape: {
      type: 'circle'
    },
    opacity: {
      value: 1,
      random: false,
      animation: {
        enable: false,
        speed: 3,
        minimumValue: 0.1,
        sync: false
      }
    },
    size: {
      value: 3
    },
    links: {
      enable: false,
      distance: 100,
      color: '#ffffff',
      opacity: 0.4,
      width: 1
    },
    move: {
      angle: {
        value: 10,
        offset: 0
      },
      enable: true,
      speed: 5,
      direction: 'right',
      random: false,
      straight: true,
      outModes: {
        default: 'out'
      },
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    },
    zIndex: {
      value: 5,
      opacityRate: 0.5
    }
  },
  interactivity: {
    detectsOn: 'canvas',
    events: {
      onHover: {
        enable: false,
        mode: 'repulse'
      },
      onClick: {
        enable: true,
        mode: 'push'
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 400,
        links: {
          opacity: 1
        }
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 0.8
      },
      repulse: {
        distance: 200
      },
      push: {
        quantity: 4,
        groups: ['z5000', 'z7500', 'z2500', 'z1000']
      },
      remove: {
        quantity: 2
      }
    }
  },
  detectRetina: true,
  background: {
    color: '#000000',
    image: '',
    position: '50% 50%',
    repeat: 'no-repeat',
    size: 'cover'
  },
  emitters: {
    position: {
      y: 55,
      x: -30
    },
    rate: {
      delay: 7,
      quantity: 1
    },
    size: {
      width: 0,
      height: 0
    },
    particles: {
      shape: {
        type: 'images',
        options: {
          images: [
            {
              src: amongus_blue,
              width: 205,
              height: 267
            },
            {
              src: amongus_cyan,
              width: 207,
              height: 265
            },
            {
              src: amongus_green,
              width: 204,
              height: 266
            },
            {
              src: amongus_lime,
              width: 206,
              height: 267
            },
            {
              src: amongus_orange,
              width: 205,
              height: 265
            },
            {
              src: amongus_pink,
              width: 205,
              height: 265
            },
            {
              src: amongus_red,
              width: 204,
              height: 267
            },
            {
              src: amongus_white,
              width: 205,
              height: 267
            }
          ]
        }
      },
      size: {
        value: 40
      },
      move: {
        speed: 10,
        outModes: {
          default: 'destroy',
          left: 'none'
        },
        straight: true
      },
      zIndex: {
        value: 0
      },
      rotate: {
        value: {
          min: 0,
          max: 360
        },
        animation: {
          enable: true,
          speed: 10,
          sync: true
        }
      }
    }
  }
}

function NotFound() {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        bgcolor: '#25344C',
        color: 'white'
      }}
    >
      <ParticlesBackground id='particles-background-404' options={options} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative'
        }}
      >
        <Typography
          variant='h1'
          sx={{
            fontFamily: 'Audiowide, sans-serif',
            fontSize: '11rem',
            m: 0,
            mt: '4rem'
          }}
        >
          404
        </Typography>
        <Typography
          variant='h2'
          sx={{
            fontFamily: 'Roboto Mono, sans-serif',
            fontSize: '2rem',
            m: 0,
            fontWeight: 'bold'
          }}
        >
          Maybe you&apos;re lost or you are an imposter👻
        </Typography>

        <Link to='/' style={{ textDecoration: 'none' }}>
          <Button
            variant='outlined'
            size='large'
            startIcon={<HomeIcon />}
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'white',
              borderColor: 'white',
              mt: 4,
              fontFamily: 'Roboto Mono, sans-serif',
              fontWeight: 'bold',
              '&:hover': { color: '#fdba26', borderColor: '#fdba26' }
            }}
          >
            Go Home
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

export default NotFound
