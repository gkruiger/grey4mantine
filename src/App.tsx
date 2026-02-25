import { useState, useEffect } from 'react'
import AppBar from './AppBar'

export default function App() {

  interface State {
    isSoundOn: boolean,
  }

  let state: State = localStorage.hasOwnProperty('state') 
    ? JSON.parse(localStorage.getItem('state') || '{}')
    : {
        isSoundOn: true
      }
 
  const [isSoundOn, setIsSoundOn] = useState<boolean>(state.isSoundOn)
 
  useEffect(function storeStateInLocalStorage(): void {
    // For testing purposes, never save.
    if(false) {  
      localStorage.setItem(
        'state', 
        JSON.stringify({
          isSoundOn: isSoundOn,
          // There is room for more items in the state
        })
      )
    }
  }, [isSoundOn])

  function restart() {
    localStorage.removeItem('state')
    window.location.reload()
  }

  return (
    <>
      <div className="container">
        <div className="header">
          <div className='center'>
            <AppBar
              isSoundOn={isSoundOn}
              setIsSoundOn={setIsSoundOn}
              restart={restart}
            />
          </div>
        </div>
        <div className="content">
          {/* 
            TO DO: Place content.
          */}
        </div>
        <div className="footer">
          <div className='center'>
            {/* 
              TO DO: Place footer.
            */}
          </div>
        </div>
      </div>  
    </>
  )  
}