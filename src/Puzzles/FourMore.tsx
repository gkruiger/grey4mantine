import { useState, useEffect } from 'react'
import { Paper, Stack, Group, ActionIcon, Progress, ColorSwatch, Overlay } from '@mantine/core'

interface Props {
  executeWhenSolved(): void
  isSolved: boolean
}

type ProgressBarState = {
  id: number
  value: number
  effects: number[]
  success: boolean
}


function FourMore({ executeWhenSolved, isSolved }: Props) {

  const width = '200px'

  const barEffects = [
    [60, 0, 10, 0],
    [10, 0, 0, 20],
    [0, 20, 40, 10],
    [0, 20, 10, 10],
  ]

  const successValue = 80
  const successMargin = 5

  const [bars, setBars] = useState<ProgressBarState[]>(
    barEffects.map((effect, index) => ({
      id: index,
      effects: effect,
      value: 0,
      success: false
    }))
  )

  const handleClick = (barId: number): void => {
    setBars(prevBars => 
      prevBars.map(bar => {
        let newValue = bar.value + barEffects[barId][bar.id]
        newValue =  Math.max(0, Math.min(100, newValue))

        return {
          ...bar,
          value: newValue,
          success: newValue == successValue
        }
      })
    )
  }

  useEffect(() => {
    if(bars.some(bar => bar.value > successValue)) {
      setBars(prevBars => 
        prevBars.map(bar => ({
        ...bar,
        value: 0,
        success: false
      })))
    }    
  }, [bars])

  
  useEffect(() => {
    if (bars.every(b => b.success)) {
      executeWhenSolved()
    }
  }, [bars])

  return (
    <Paper
      withBorder
      p="md"
      radius="md"
      shadow="xl"
      style={{ position: 'relative' }}
    >
      {isSolved && <Overlay color="#000" radius={8} backgroundOpacity={0.15} />}

      <Stack>
        {bars.map((bar) => (
          <Group key={bar.id}>
            <ActionIcon
              onClick={() => handleClick(bar.id)}
            />

            <Progress.Root
              style={{ width }}
              transitionDuration={200}
            >
              <Progress.Section value={Math.min(bar.value, successValue - successMargin)} color="blue.3"/>
              <Progress.Section value={Math.min(bar.value - (successValue - successMargin), successMargin * 2)} color="blue.5"/>
              <Progress.Section value={Math.min(bar.value - (successValue + successMargin))} color='blue.3'/>
            </Progress.Root>

            <ColorSwatch
              color={bar.success ? '#228be6' : 'white'}
            />
          </Group>
        ))}
      </Stack>
    </Paper>    
  )
}

export default FourMore