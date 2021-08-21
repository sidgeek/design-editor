import { useEffect, useState } from 'react'
import { Flex, Slider, Box, Text } from 'theme-ui'
import { useEditorContext, useHandlers } from '@/uibox'

interface Option {
  zoomValue: number
}

function FooterMenu() {
  const [option, setOption] = useState<Option>({ zoomValue: 40 })
  const { zoomRatio } = useEditorContext()
  const handlers = useHandlers()
  const updateOptions = (key: string, value: number) => {
    setOption({ ...option, [key]: value })
  }

  useEffect(() => {
    updateOptions('zoomValue', zoomRatio * 100)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoomRatio])

  const onZoomChange = (event: any) => {
    handlers.zoomHandler.zoomToRatio(event.target.value / 100)
  }

  const zoomString = parseFloat(option.zoomValue.toFixed(2))

  return (
    <Flex
      sx={{
        borderRadius: '6px',
        padding: '0 1rem',
        alignItems: 'center',
        background: '#fff',
        justifyContent: 'space-between',
        fontFamily: 'Mukta',
        height: '50px',
      }}
    >
      <Flex>
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <div
            style={{
              fontSize: '14px',
              position: 'absolute',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingRight: '3px',
              paddingTop: '4px',
            }}
          >
            <div>1</div>
          </div>
          <PagesIcon />
        </div>
      </Flex>
      <Flex>
        <Slider value={option.zoomValue ? option.zoomValue : 1} onChange={e => onZoomChange(e)} max={300} />
        <Box
          sx={{
            padding: '0 1rem',
            fontFamily: 'Open Sans',
            fontSize: '14px',
            background: '#fff',
            fontWeight: '600',
          }}
        >
          {zoomString}
          <Text sx={{ paddingLeft: '0.2rem' }}>%</Text>
        </Box>
        <Box sx={{ margin: '0 1rem' }}>
          <ExpandIcon />
        </Box>
      </Flex>
    </Flex>
  )
}

function PagesIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="1.75"
        y="4.75"
        width="17.5"
        height="17.5"
        rx="1.25"
        stroke="currentColor"
        strokeWidth="1.5"
      ></rect>
      <path
        d="M4.75 1a.75.75 0 0 0 0 1.5H19.4c1.16 0 2.1.94 2.1 2.1v14.65a.75.75 0 0 0 1.5 0V4.2A3.2 3.2 0 0 0 19.8 1H4.75z"
        fill="currentColor"
      ></path>
    </svg>
  )
}

function ExpandIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.636 10.43L18.5 6.565v2.687a.75.75 0 0 0 1.5 0V5.497c0-.966-.53-1.495-1.497-1.495h-3.749a.75.75 0 0 0 0 1.5h2.687l-3.867 3.867a.75.75 0 0 0 1.06 1.061zm-5.27 3.139l-3.867 3.867v-2.688a.75.75 0 0 0-1.5 0v3.75c0 .967.527 1.5 1.493 1.5h3.753a.75.75 0 0 0 0-1.5H6.558l3.869-3.869a.75.75 0 0 0-1.061-1.06z"
        fill="currentColor"
      ></path>
    </svg>
  )
}
export default FooterMenu
