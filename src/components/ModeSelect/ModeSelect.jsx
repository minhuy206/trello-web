import { MenuItem, Select, useColorScheme } from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import Box from '@mui/material/Box'

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
      <MenuItem value='light'>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LightModeIcon fontSize='small' />
          Light
        </Box>
      </MenuItem>
      <MenuItem value='dark'>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <DarkModeOutlinedIcon fontSize='small' />
          Dark
        </Box>
      </MenuItem>
      <MenuItem value='system'>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SettingsBrightnessIcon fontSize='small' />
          System
        </Box>
      </MenuItem>
    </Select>
  )
}
export default ModeSelect
