import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import useMediaQuery from '@mui/material/useMediaQuery'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
  useColorScheme
} from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
function ControlledDarkMode() {
  const { mode, setMode } = useColorScheme()
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (event) => {
    const selectedMode = event.target.value
    console.log(selectedMode)

    setMode(selectedMode)
    handleClose()
  }

  return (
    <div>
      <IconButton onClick={handleClickOpen} color="inherit" sx={{
        '& svg': {
          color: mode === 'dark' ? 'white' : 'white'
        }
      }}>
        {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Dark Mode</DialogTitle>
        <DialogContent>
          <FormControl>
            <RadioGroup
              aria-labelledby="radio-select-dark-light-mode"
              name="controlled-radio-buttons-group"
              value={mode}
              onChange={handleChange}
            >
              <FormControlLabel value="dark" control={<Radio />} label="On" />
              <FormControlLabel value="light" control={<Radio />} label="Off" />
              <FormControlLabel
                value="system"
                control={<Radio />}
                label="Use System Setting"
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ControlledDarkMode
