import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { useColorScheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'

function ModeSelect() {
  const { mode, setMode } = useColorScheme()

  if (!mode) return null

  return (
    <Select
      labelId='label-select-dark-light-mode'
      id='select-dark-light-mode'
      value={mode}
      size='small'
      defaultValue={mode}
      onChange={(event) => setMode(event.target.value)}
      MenuProps={{
        PaperProps: {
          sx: {
            bgcolor: (theme) => theme.palette.background.default,
            backgroundImage: 'none'
          }
        }
      }}
      sx={{
        color: (theme) =>
          theme.palette.mode === 'dark' ? '#9fadbc' : '#44556F',
        '.MuiOutlinedInput-notchedOutline': {
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? '#9fadbc' : '#44556F'
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? '#9fadbc' : '#44556F'
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? '#9fadbc' : '#44556F'
        },
        '.MuiSvgIcon-root': {
          color: (theme) =>
            theme.palette.mode === 'dark' ? '#9fadbc' : '#44556F'
        }
      }}
    >
      <MenuItem
        sx={{
          color: (theme) =>
            theme.palette.mode === 'dark' ? '#9fadbc' : '#44556F'
        }}
        value='light'
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LightModeIcon fontSize='small' />
          Light
        </Box>
      </MenuItem>
      <MenuItem
        value='dark'
        sx={{
          color: (theme) =>
            theme.palette.mode === 'dark' ? '#9fadbc' : '#44556F'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <DarkModeOutlinedIcon fontSize='small' />
          Dark
        </Box>
      </MenuItem>
      <MenuItem
        value='system'
        sx={{
          color: (theme) =>
            theme.palette.mode === 'dark' ? '#9fadbc' : '#44556F'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SettingsBrightnessIcon fontSize='small' />
          System
        </Box>
      </MenuItem>
    </Select>
  )
}
export default ModeSelect
