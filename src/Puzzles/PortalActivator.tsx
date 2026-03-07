import { useState, useEffect } from 'react'
import { Paper, Stack, Group, ActionIcon, Progress, ColorSwatch, Button, Overlay, AspectRatio} from '@mantine/core'

interface props {
  executeWhenSolved() : void
  isSolved: boolean
}

function PortalActivator({executeWhenSolved, isSolved} : props) {

  const [disabled1, setDisabled1] = useState(false)
  const [change1, setChange1] = useState(0)
  const [value1, setValue1] = useState(0)
  const [status1, setStatus1] = useState(false)

  const [disabled2, setDisabled2] = useState(false)
  const [change2, setChange2] = useState(0)
  const [value2, setValue2] = useState(0)
  const [status2, setStatus2] = useState(false)

  const [disabled3, setDisabled3] = useState(false)
  const [change3, setChange3] = useState(0)
  const [value3, setValue3] = useState(0)
  const [status3, setStatus3] = useState(false)

  let delay = 50

  let plusOne = 4
  let plusTwo = 2
  let plusThree = 3

  let width = '200px'

  useEffect(() => {
    const intervalId = setInterval(() => {
      setValue1(value => {
        let newValue = value + change1
        if(newValue < 0) {
          newValue = 0
          setStatus1(false)
        }
        if(newValue > 100) {
          newValue = 100
          setStatus1(true)
        }
        return newValue
      })
    }, delay)

    return () => clearInterval(intervalId);
  }, [change1])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setValue2(value => {
        let newValue = value + change2
        if(newValue < 0) {
          newValue = 0
          setStatus2(false)
        }
        if(newValue > 100) {
          newValue = 100
          setStatus2(true)
        }
        return newValue
      })
    }, delay)

    return () => clearInterval(intervalId);
  }, [change2])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setValue3(value => {
        let newValue = value + change3
        if(newValue < 0) {
          newValue = 0
          setStatus3(false)
        }
        if(newValue > 100) {
          newValue = 100
          setStatus3(true)
        }
        return newValue
      })
    }, delay);

    return () => clearInterval(intervalId)
  }, [change3])

  useEffect(() => {
    if(status1 && status2 && status3) {
      setDisabled1(true)
      setDisabled2(true)
      setDisabled3(true)
      setChange1(0)
      setChange2(0)
      setChange3(0)

      executeWhenSolved()
    }
  }, [status1, status2, status3])

  return (
    <AspectRatio ratio={16 / 9} maw={1400} mx="auto" pos="relative">
      <Paper
        withBorder
        p='md'
        radius='md'
        shadow='xl'
      >
          {isSolved && <Overlay color="#000" radius={8} backgroundOpacity={0.15} />}
        <Stack>
          <Button
            onClick={() => executeWhenSolved()}
          >
            Test
          </Button>
          <Group>
            <ActionIcon
              disabled={disabled1}
              onMouseDown={() => {if(value1 == 0) setChange1(plusOne)}}
              onMouseUp={() => {if(!disabled1) setChange1(-1)}}
              onMouseOut={() => {if(!disabled1) setChange1(-1)}}
            />
            <Progress
              style={{width: width}}
              value={value1}
            />
            <ColorSwatch
              color={status1 ? '#228be6' : 'white'}
            />
          </Group>
          <Group>
            <ActionIcon
              disabled={disabled2}
              onMouseDown={() => {if(value2 == 0) setChange2(plusTwo)}}
              onMouseUp={() => {if(!disabled2) setChange2(-1)}}
              onMouseOut={() => {if(!disabled2) setChange2(-1)}}
            />
            <Progress
              style={{width: width}}
              value={value2}
            />
            <ColorSwatch
              color={status2 ? '#228be6' : 'white'}
            />
          </Group>
          <Group>
            <ActionIcon
              disabled={disabled3}
              onMouseDown={() => {if(value3 == 0) setChange3(plusThree)}}
              onMouseUp={() => {if(!disabled3) setChange3(-1)}}
              onMouseOut={() => {if(!disabled3) setChange3(-1)}}
            />
            <Progress
              style={{width: width}}
              value={value3}
            />
            <ColorSwatch
              color={status3 ? '#228be6' : 'white'}
            />
          </Group>    
        </Stack>
      </Paper>
    </AspectRatio>
  )
}

export default PortalActivator