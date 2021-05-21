import { MinusIcon, AddIcon } from '@chakra-ui/icons'
import styled from '@emotion/styled'
import {
  Button,
  ButtonGroup,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from '@chakra-ui/react'

function FooterMenu() {
  return (
    <Flex
      borderRadius="6px"
      position="absolute"
      padding="0 1rem"
      alignItems="center"
      bottom={5}
      right={5}
      fontFamily="Mukta"
      height="50px"
    >
      <ButtonGroup>
        <Button fontSize="0.9rem" background="white" variant="outline" size="md">
          <MinusIcon />
        </Button>
        <Popover closeOnEsc closeOnBlur>
          <PopoverTrigger>
            <Button
              fontWeight={500}
              fontSize="1rem"
              background="white"
              variant="outline"
              size="md"
              width="60px"
            >
              100%
            </Button>
          </PopoverTrigger>
          <PopoverContent padding={0} width="70px">
            <PopoverBody padding={0}>
              <ZoomItem>300%</ZoomItem>
              <ZoomItem>250%</ZoomItem>
              <ZoomItem>200%</ZoomItem>
              <ZoomItem>175%</ZoomItem>
              <ZoomItem>150%</ZoomItem>
              <ZoomItem>100%</ZoomItem>
              <ZoomItem>50%</ZoomItem>
              <ZoomItem>25%</ZoomItem>
              <ZoomItem>10%</ZoomItem>
            </PopoverBody>
          </PopoverContent>
        </Popover>
        <Button fontSize="0.9rem" background="white" variant="outline" size="md">
          <AddIcon />
        </Button>
      </ButtonGroup>
    </Flex>
  )
}

const ZoomItem = styled.div({
  height: '2.2rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#333',
  cursor: 'pointer',
  ':hover': {
    background: 'rgba(0,0,0,0.061)',
  },
})

export default FooterMenu
