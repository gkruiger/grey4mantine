  import { useState, useEffect } from 'react'
  import { Paper, Stack, Group, ActionIcon, Progress, ColorSwatch, Overlay } from '@mantine/core'

  interface Props {
    executeWhenSolved(): void
    isSolved: boolean
  }

  type ProgressBarState = {
    id: number
    speed: number
    direction: -1 | 0 | 1
    value: number
    success: boolean
  }

  function ThreeBars({ executeWhenSolved, isSolved }: Props) {

    const barSpeeds = [4, 2, 3]
    const delay = 50
    const width = '200px'

    const [bars, setBars] = useState<ProgressBarState[]>(
      barSpeeds.map((speed, i) => ({
        id: i,
        speed,
        direction: 0,
        value: 0,
        success: false
      }))
    )

    const [puzzleSolved, setPuzzleSolved] = useState(false)

    useEffect(() => {

      if(puzzleSolved) return

      const interval = setInterval(() => {

        setBars(prevBars =>
          prevBars.map(bar => {

            if (bar.direction === 0) return bar

            const delta = bar.direction === 1 ? bar.speed : -1
            let value = bar.value + delta

            value = Math.max(0, Math.min(100, value))

            let direction: -1 | 0 | 1 = bar.direction
            let success = bar.success

            if (value === 100) {
              success = true
              direction = 0
            }

            if (value === 0) {
              success = false
              direction = 0
            }

            return {
              ...bar,
              value,
              direction,
              success
            }

          })
        )

      }, delay)

      return () => clearInterval(interval)

    }, [])

    useEffect(() => {

      if (!puzzleSolved && bars.every(b => b.success)) {

        setPuzzleSolved(true)

        setBars(prev =>
          prev.map(bar => ({
            ...bar,
            direction: 0
          }))
        )

        executeWhenSolved()
      }

    }, [bars, puzzleSolved, executeWhenSolved])

    const setDirection = (id: number, dir: -1 | 1) => {

      if(puzzleSolved) return

      setBars(prev =>
        prev.map(bar => {

          if (bar.id !== id) return bar

          if (bar.direction === -1) return bar

          if (bar.value == 0 && dir == -1) return bar

          return {
            ...bar,
            direction: dir
          }

        })
      )

    }

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
          {bars.map(bar => (
            <Group key={bar.id}>

              <ActionIcon
                disabled={bar.direction === -1 || puzzleSolved}
                onMouseDown={() => setDirection(bar.id, 1)}
                onMouseUp={() => setDirection(bar.id, -1)}
                onMouseLeave={() => setDirection(bar.id, -1)}
              />

              <Progress
                style={{ width }}
                value={bar.value}
              />

              <ColorSwatch
                color={bar.success ? '#228be6' : 'white'}
              />
            </Group>
          ))}
        </Stack>
      </Paper>    
    )
  }

  export default ThreeBars