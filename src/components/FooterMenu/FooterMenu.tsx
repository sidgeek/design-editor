import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import {
  Button,
  ButtonGroup,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
  Divider,
  Center,
} from '@chakra-ui/react'
import { useCanvasContext } from '@/hooks'

interface Option {
  zoomValue: number
}

const zoomValues = [3, 2, 1.25, 1, 0.75, 0.5, 0.25, 0.1]

function FooterMenu() {
  const [option, setOption] = useState<Option>({ zoomValue: 40 })
  const { zoomRatio, setZoomRatio, setCanvasType, canvasType } = useCanvasContext()

  const updateOptions = (key: string, value: number) => {
    setOption({ ...option, [key]: value })
  }

  useEffect(() => {
    updateOptions('zoomValue', zoomRatio * 100)
  }, [zoomRatio])

  const onZoomChange = (value: number) => {
    setZoomRatio(value / 100)
  }

  const zoomString = parseFloat(option.zoomValue.toFixed(2))

  return (
    <Flex
      borderRadius="6px"
      padding="0 1rem"
      alignItems="center"
      background="#fff"
      justifyContent="space-between"
      fontFamily="Mukta"
      height="50px"
    >
      <ButtonGroup>
        <div
          onClick={() => setCanvasType(canvasType === 'previews' ? 'editor' : 'previews')}
          style={{ position: 'relative', overflow: 'hidden' }}
        >
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
      </ButtonGroup>
      <ButtonGroup>
        <Slider
          min={0}
          max={300}
          value={option.zoomValue}
          onChange={e => onZoomChange(e)}
          colorScheme="gray"
          defaultValue={option.zoomValue}
          width="180px"
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb
            boxSize={4}
            style={{
              background: '#333',
              border: '1.8px solid #fff',
            }}
          />
        </Slider>

        <Popover closeOnEsc closeOnBlur>
          <PopoverTrigger>
            <Box
              padding="0"
              fontFamily="Open Sans"
              fontSize="14px"
              background="#fff"
              fontWeight="600"
              as={Button}
            >
              {zoomString}%
            </Box>
          </PopoverTrigger>
          <PopoverContent width="96px">
            <PopoverBody
              boxShadow="0 0 0 1px rgb(64 87 109 / 7%), 0 2px 12px rgb(53 71 90 / 20%)"
              border="none"
              padding={'0.6rem 0'}
            >
              {zoomValues.map(zoomValue => {
                const isActive = Math.round(zoomValue * 100) === Math.round(option.zoomValue)
                return (
                  <ZoomItem onClick={() => onZoomChange(zoomValue * 100)} key={zoomValue}>
                    <div>{zoomValue * 100}%</div>
                    {isActive && (
                      <Box pl={3}>
                        <CheckIcon />
                      </Box>
                    )}
                  </ZoomItem>
                )
              })}

              <Center height="10px">
                <Divider orientation="horizontal" />
              </Center>
              <ZoomItem>Fit</ZoomItem>
              <ZoomItem>Fill</ZoomItem>
            </PopoverBody>
          </PopoverContent>
        </Popover>
        <Center height="30px">
          <Divider orientation="vertical" />
        </Center>
        <Box as={Button} p={0} background="#fff">
          <ExpandIcon />
        </Box>
      </ButtonGroup>
    </Flex>
  )
}

const ZoomItem = styled.div({
  height: '2.4rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: '#333',
  cursor: 'pointer',
  fontFamily: 'Open Sans',
  fontSize: '14px',
  fontWeight: 400,
  padding: '0 1rem',
  ':hover': {
    background: 'rgba(0,0,0,0.061)',
  },
})

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M4.53 11.9L9 16.38 19.44 5.97a.75.75 0 0 1 1.06 1.06L9.53 17.97c-.3.29-.77.29-1.06 0l-5-5c-.7-.71.35-1.77 1.06-1.07z"
      ></path>
    </svg>
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
        stroke-width="1.5"
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
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.636 10.43L18.5 6.565v2.687a.75.75 0 0 0 1.5 0V5.497c0-.966-.53-1.495-1.497-1.495h-3.749a.75.75 0 0 0 0 1.5h2.687l-3.867 3.867a.75.75 0 0 0 1.06 1.061zm-5.27 3.139l-3.867 3.867v-2.688a.75.75 0 0 0-1.5 0v3.75c0 .967.527 1.5 1.493 1.5h3.753a.75.75 0 0 0 0-1.5H6.558l3.869-3.869a.75.75 0 0 0-1.061-1.06z"
        fill="currentColor"
      ></path>
    </svg>
  )
}

function ShrinkIcon() {
  return (
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M18.72 4.22l-3.865 3.865V5.398a.75.75 0 1 0-1.5 0v3.754c0 .967.53 1.496 1.497 1.496H18.6a.75.75 0 1 0 0-1.5h-2.687l3.868-3.868a.75.75 0 1 0-1.06-1.06zM5.28 19.78l3.867-3.866v2.688a.75.75 0 0 0 1.5 0V14.85c0-.967-.527-1.5-1.494-1.5H5.401a.75.75 0 0 0 0 1.5h2.687l-3.869 3.87a.75.75 0 0 0 1.06 1.06z"
      fill="currentColor"
    ></path>
  )
}

export default FooterMenu
