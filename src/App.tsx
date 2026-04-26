import { useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import Header from './Components/Header'
import HintsModal from "./Components/HintsModal"
import AboutModal from "./Components/AboutModal"
import RestartModal from "./Components/RestartModal"
import GameEngine from './Game/GameEngine'
import GameView from './Components/GameView'

export default function App() {

  const [isSoundOn, setIsSoundOn] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('state')
      if (!stored) return true

      const parsed = JSON.parse(stored)
      return parsed.isSoundOn ?? true
    } catch {
      return true
    }
  })

  const [openedAbout, aboutsHandlers] = useDisclosure(false)
  const [openedRestart, restartHandlers] = useDisclosure(false)
  const [openedHints, hintsHandlers] = useDisclosure(false)
  
  const [gameEngine, ] = useState(() => new GameEngine())
  const [, setTick] = useState<number>(0)

  const handleAction = (id: string) => {
    gameEngine.performAction(id)    
    setTick(prevTick => prevTick +1 )
  }

  const restart = () => {
    gameEngine.restart()
    setTick(0)
  }

  const undo = () => {
    gameEngine.undo()
    setTick(prevTick => prevTick + 1)
  }

  const DEBUG = true

  const [showPuzzles, setShowPuzzles] = useState(true)

  return (
    <>
      <HintsModal opened={openedHints} onClose={hintsHandlers.close}/>             
      <RestartModal opened={openedRestart} onClose={restartHandlers.close} restart={restart}/>
      <AboutModal opened={openedAbout} onClose={aboutsHandlers.close}/>

      <div className="container">
        <div className="header">
          <div className='center'>
            <Header
              chapterName={gameEngine.getCurrentChapterName()}
              isSoundOn={isSoundOn}
              setIsSoundOn={setIsSoundOn}
              openHints={hintsHandlers.open}
              openRestart={restartHandlers.open}
              openAbout={aboutsHandlers.open}
              debug={DEBUG}
              undo={undo}
              showPuzzles={showPuzzles}
              setShowPuzzles={setShowPuzzles}
            />
          </div>
        </div>
        <div className="content">
          <GameView
            visibleContent={showPuzzles ? gameEngine.getAllPuzzles() : gameEngine.getVisibleContent()}
            currentChapterPartId={gameEngine.getCurrentChapterPartId()}
            handleAction={handleAction}
          />
        </div>
        <div className="footer">
          <div className='center'>
            {/* 
              TO DO: Maybe place footer.
            */}
          </div>
        </div>
      </div>  
    </>
  )  
}