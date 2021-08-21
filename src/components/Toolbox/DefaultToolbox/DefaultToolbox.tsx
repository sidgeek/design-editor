import { CSSProperties, useState } from 'react'
import { TwitterPicker } from 'react-color'
import { Flex, Box } from 'theme-ui'
import emptyColorPlaceholder from '@/assets/images/base-color-picker.png'
import { useHandlers } from '@/uibox'

function Toolbox() {
  const [dropdown, setDropdown] = useState({
    displayColorPicker: false,
  })
  const handlers = useHandlers()

  const [options, setOptions] = useState({
    backgroundColor: '#ffffff',
  })

  const handleClick = () => {
    setDropdown({ ...dropdown, displayColorPicker: !dropdown.displayColorPicker })
  }
  const handleClose = () => {
    setDropdown({ ...dropdown, displayColorPicker: false })
  }

  const popover: CSSProperties = {
    position: 'absolute',
    zIndex: 2,
  }
  const cover: CSSProperties = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  }

  const onColorChange = color => {
    handlers.frameHandler.setBackgroundColor(color.hex)
    setOptions({ ...options, backgroundColor: color.hex })
  }
  return (
    <Flex
      sx={{
        height: 54,
        alignItems: 'center',
        padding: '0 1rem',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ position: 'relative' }}>
        <div style={{ cursor: 'pointer' }} onClick={handleClick}>
          {options.backgroundColor === '#ffffff' ? (
            <img style={{ height: '30px', display: 'flex' }} src={emptyColorPlaceholder} alt="color picker" />
          ) : (
            <Box
              sx={{
                background: options.backgroundColor,
                height: 30,
                width: 30,
              }}
            />
          )}
        </div>

        {dropdown.displayColorPicker ? (
          <div style={popover}>
            <div style={cover} onClick={handleClose} />
            <TwitterPicker color={options.backgroundColor} onChange={onColorChange} />
          </div>
        ) : null}
      </div>
    </Flex>
  )
}

export default Toolbox
