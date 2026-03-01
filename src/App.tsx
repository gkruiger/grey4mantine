import { useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import Header from './Components/Header'
import HintsModal from "./Components/HintsModal"
import AboutModal from "./Components/AboutModal"
import RestartModal from "./Components/RestartModal"
import GameEngine from './Game/GameEngine'
import Chapter from './Components/GameView'
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

  function restart() {
    localStorage.removeItem('state')
    window.location.reload()
  }

  const [openedAbout, aboutsHandlers] = useDisclosure(false)
  const [openedRestart, restartHandlers] = useDisclosure(false)
  const [openedHints, hintsHandlers] = useDisclosure(false)
  
  const [engine] = useState(() => new GameEngine())
  const [gameState, setGameState] = useState(engine.getState())

  const handleAction = (id: string) => {
    engine.performAction(id)
    setGameState(engine.getState())
  }

  const handlePuzzleSolved = (id: string) => {
    engine.solvePuzzle(id)
    setGameState(engine.getState())
  }

  return (
    <>
      <HintsModal opened={openedHints} onClose={hintsHandlers.close}/>             
      <RestartModal opened={openedRestart} onClose={restartHandlers.close} restart={restart}/>
      <AboutModal opened={openedAbout} onClose={aboutsHandlers.close}/>

      <div className="container">
        <div className="header">
          <div className='center'>
            <Header
              chapterName={engine.getCurrentChapterName()}
              isSoundOn={isSoundOn}
              setIsSoundOn={setIsSoundOn}
              openHints={hintsHandlers.open}
              openRestart={restartHandlers.open}
              openAbout={aboutsHandlers.open}
            />
          </div>
        </div>
        <div className="content">
          <GameView
            chapterParts={engine.getVisibleContent()}
            handleAction={handleAction}
            solvePuzzle={handleAction}
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