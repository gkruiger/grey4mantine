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
    pause: boolean
    success: boolean
  }

  function FourBars({ executeWhenSolved, isSolved }: Props) {

    const barSpeeds = [1, 2, 1, 4]
    const successValue = 50
    const successMargin = 5
    const delay = 50
    const width = '200px'

    const [bars, setBars] = useState<ProgressBarState[]>(
      barSpeeds.map((speed, i) => ({
        id: i,
        speed,
        direction: 1,
        value: 0,
        pause: false,
        success: false
      }))
    )

    const [puzzleSolved, setPuzzleSolved] = useState(false)

    useEffect(() => {

      if(puzzleSolved) return

      const interval = setInterval(() => {

        setBars(prevBars =>
          prevBars.map(bar => {

            if (bar.pause) return bar
            if (bar.direction == 0) return bar

            const delta = bar.direction === 1 ? bar.speed : -bar.speed
            let value = bar.value + delta

            value = Math.max(0, Math.min(100, value))

            let direction: -1 | 0 | 1 = bar.direction
            let success = bar.value >= successValue - successMargin && bar.value <= successValue + successMargin

            if (value === 100) direction = -1
            if (value === 0) direction = 1

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
            direction: 0,
            succes: true
          }))
        )

        executeWhenSolved()
      }
    }, [bars])

    const setPause = (id: number, pause: boolean) => {

      if(puzzleSolved) return

      setBars(prev =>
        prev.map(bar => {
          if (bar.id !== id) return bar

          return {
            ...bar,
            pause: pause
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
                onMouseDown={() => setPause(bar.id, true)}
                onMouseUp={() => setPause(bar.id, false)}
                onMouseLeave={() => setPause(bar.id, false)}
              />

              <Progress.Root
                style={{ width }}
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

  export default FourBars