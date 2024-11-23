import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useColorScheme
} from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import Box from '@mui/material/Box'

function ModeSelect() {
  const { mode, setMode } = useColorScheme()

  const handleChange = (event) => {
    const selectMode = event.target.value
    setMode(selectMode)
  }

  return (
    <>
      <FormControl size="small" sx={{ minWidth: '120px' }}>
        <InputLabel
          sx={{ color: 'white', '&.Mui-focused': { color: 'white' } }}
          id="label-select-dark-light-mode"
        >
          Mode
        </InputLabel>
        <Select
          labelId="label-select-dark-light-mode"
          id="select-dark-light-mode"
          value={mode}
          label="Mode"
          defaultValue={mode}
          onChange={handleChange}
          sx={{
            color: 'white',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: 'white'
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white'
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white'
            },
            '.MuiSvgIcon-root': {
              color: 'white'
            }
          }}
        >
          <MenuItem value="light">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LightModeIcon fontSize="small" />
              Light
            </Box>
          </MenuItem>
          <MenuItem value="dark">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <DarkModeOutlinedIcon fontSize="small" />
              Dark
            </Box>
          </MenuItem>
          <MenuItem value="system">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SettingsBrightnessIcon fontSize="small" />
              System
            </Box>
          </MenuItem>
        </Select>
      </FormControl>
    </>
  )
}
export default ModeSelect
