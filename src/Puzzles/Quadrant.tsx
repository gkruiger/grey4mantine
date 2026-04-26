import { useEffect, useState } from 'react'
import { Paper, Stack, Group, ActionIcon, Overlay } from '@mantine/core'

interface Props {
  executeWhenSolved(): void
  isSolved: boolean
}

function Quadrant({ executeWhenSolved, isSolved }: Props) {

  const solution = [
    [true, false, false, false],
    [true, false, false, false],
    [true, false, false, false],
    [true, false, false, false],
  ]

  const initialButtonsPressed = Array.from({ length: solution.length }, () => new Array(solution[0].length).fill(false))

  const [buttonsPressed, setButtonsPressed] = useState<boolean[][]>(initialButtonsPressed) 

  const handleClick = (rowIndex: number, columnIndex: number) => {
    setButtonsPressed(prevButtonsPressed => {
      let newButtonsPressed = Array.from(prevButtonsPressed)
      newButtonsPressed[rowIndex][columnIndex] = true
      return newButtonsPressed
    })
  }

  useEffect(() => {
    const maxNumberOfButtons = solution.flatMap(row => row.filter(cel => cel)).length
    const currentNumberOfButtons = buttonsPressed.flatMap(row => row.filter(cel => cel)).length

    const solved = JSON.stringify(solution) === JSON.stringify(buttonsPressed)
    if(solved) {
      executeWhenSolved()
    } else if(currentNumberOfButtons >= maxNumberOfButtons) {
      setTimeout(() => setButtonsPressed(initialButtonsPressed), 200)
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
        {solution.map((row, rowIndex) => 
          <Group 
            key={rowIndex}
            justify='space-between'
          >
            {row.map((cel, columnIndex) =>
              <ActionIcon
                key={`${rowIndex}${columnIndex}`}
                disabled={buttonsPressed[rowIndex][columnIndex]}
                onClick={() => handleClick(rowIndex, columnIndex)}
              />
            )}    
          </Group>
        )}
      </Stack>
    </Paper>    
  )
}

export default Quadrant