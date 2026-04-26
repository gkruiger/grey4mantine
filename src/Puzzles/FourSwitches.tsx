import { useEffect, useState } from 'react'
import { Paper, Stack, Group, ActionIcon, Progress, Overlay } from '@mantine/core'

interface Props {
  executeWhenSolved(): void
  isSolved: boolean
}

function FourSwitches({ executeWhenSolved, isSolved }: Props) {

  const solution = [0, 1, 2, 3]

  const [buttonsPressed, setButtonsPressed] = useState<number[]>([]) 

  const handleClick = (index: number) => {
    if(solution.at(buttonsPressed.length) == index) {
      setButtonsPressed(prevButtonsPressed => [...prevButtonsPressed, index])
    } else {
      setButtonsPressed([])
    }
  }

  useEffect(() => {
    if(solution.every((value, index) => value === buttonsPressed[index])) {
      executeWhenSolved()
    }
  }, [buttonsPressed])

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
        <Group justify='space-between'>
          {solution.map((button, index) => 
            <ActionIcon
              key={index}
              disabled={buttonsPressed.includes(index)}
              onClick={() => handleClick(index)}
            />
          )}
        </Group>
        <Progress
          transitionDuration={500}
          value={(100 / solution.length) * buttonsPressed.length}
        />
      </Stack>
    </Paper>    
  )
}

export default FourSwitches