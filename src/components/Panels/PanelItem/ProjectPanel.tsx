import { ReactNode, useEffect, useState } from 'react'
import { Input, Box, Flex } from 'theme-ui'
import Scrollbars from 'react-custom-scrollbars'
import { useCoreHandler } from '@/handlers'
interface Format {
  id: string
  height: number
  width: number
  label: string
  name: string
}

const FORMATS: Format[] = [
  { id: '1', label: '1200 x 1400', width: 1200, height: 630, name: 'Facebook Post' },
  { id: '2', label: '1200 x 900', width: 1280, height: 720, name: 'Youtube Post' },
  { id: '3', label: '1600 x 900', width: 1024, height: 512, name: 'Twitter Post' },
  { id: '4', label: '1200 x 1200', width: 1200, height: 1200, name: 'Pinterest Post' },
  { id: '5', label: '1080 x 1920', width: 1080, height: 1920, name: 'Snapchat Post' },
  { id: '6', label: '1200 x 628', width: 1200, height: 628, name: 'Linkedin Post' },
  { id: '7', label: '600 x 600', width: 600, height: 600, name: 'Spotify Post' },
]

const DEFAULT_FORMAT = FORMATS[0]

interface OptionProp {
  format: Format
  onClick: any
}

function Option({ format, onClick }: OptionProp) {
  return (
    <Flex
      onClick={onClick}
      sx={{
        background: 'rgba(255,255,255,0.06)',
        height: '54px',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: '1rem',
        cursor: 'pointer',
        ':hover': {
          background: 'rgba(255,255,255,0.1)',
        },
      }}
    >
      <Box sx={{ fontWeight: 400 }}>{format.name}</Box>
      <Box sx={{ color: 'rgba(255,255,255,0.6)' }}>{format.label}</Box>
    </Flex>
  )
}

interface Item {
  size: string
  label: string
  id: string
}
// options value  placeholder onchange
interface SelectProps {
  children: ReactNode
  value: Item
  placeholder: any
  onChange: () => void
}

function Select({ onChange, value }: any) {
  const [open, setOpen] = useState(false)
  return (
    <Box
      sx={{
        fontFamily: 'Lexend',
      }}
    >
      <Box
        onClick={() => setOpen(!open)}
        sx={{ height: 64, display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.06)' }}
      >
        <Flex
          sx={{
            background: 'rgba(255,255,255,0.06)',
            height: '64px',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingLeft: '1rem',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          <Box sx={{ fontWeight: 600 }}>{value.name}</Box>
          <Box>1220 x 400</Box>
        </Flex>
      </Box>
      <Box sx={{ position: 'relative', display: open ? 'block' : 'none' }}>
        <Box
          sx={{
            position: 'absolute',
            zIndex: 100,
            top: 10,
            right: 0,
            width: '100%',
            border: '1px solid rgba(64, 87, 109, 0.07)',
            boxShadow: '0 2px 8px rgba(53, 71, 90, 0.2)',
            borderRadius: '4px',
          }}
        >
          <Scrollbars style={{ height: '240px' }}>
            {FORMATS.map(format => (
              <Option key={format.id} format={format} onClick={() => onChange(format)} />
            ))}
          </Scrollbars>
        </Box>
      </Box>
    </Box>
  )
}

function ProjectPanel() {
  const { resizeWorkarea } = useCoreHandler()
  const [selectedFormat, setSelectedFormat] = useState<Format>(DEFAULT_FORMAT)
  const onChange = (value: Format) => {
    setSelectedFormat(value)
    resizeWorkarea(value.width, value.height)
  }
  return (
    <>
      <div style={{ padding: '2rem 2rem 1rem', color: '#fff', fontFamily: 'Lexend' }}>
        <Box>
          <Box sx={{ fontWeight: 700, fontSize: '1.2rem' }}>My first design</Box>
        </Box>
        <Box>
          <Box sx={{ padding: '1rem 0', fontWeight: 600 }}>Format</Box>
          <Select value={selectedFormat} onChange={onChange} />
        </Box>
      </div>
    </>
  )
}
export default ProjectPanel
