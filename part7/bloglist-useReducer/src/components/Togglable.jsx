import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button, Box } from '@mui/material'


const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '': 'none' }

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(refs, () => {
    return { toggleVisibility }
  })

  const buttonWidth = {
    width: '100px',
  }

  return (
    <Box sx={{mt : 2}}>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility} 
          variant='contained' 
          color='primary'
          sx={{m : 1}}
        >
          {props.buttonLabel}
        </Button>
      </div>

      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility} 
          variant='contained' 
          color='secondary'
          sx={{m : 1}}
          style={buttonWidth}
        >
          cancel
        </Button>
      </div>

    </Box>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable