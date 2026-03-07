import { ReactNode, useRef, useEffect } from "react"
import { Text, Box, Button } from "@mantine/core"
import { ChapterPartView } from "../Types/types"
import PortalActivator from "../Puzzles/PortalActivator"

interface props {
  visibleContent: ChapterPartView[],
  currentChapterPartId: string,
  handleAction: (id: string) => void
}

function GameView({visibleContent, currentChapterPartId, handleAction}: props) {
 
  const refs = useRef(new Map())
  
  const puzzle = (id: string, isSolved: boolean): ReactNode => {
    switch(id) {
      case 'fill_the_three_bars': return <PortalActivator isSolved={isSolved} executeWhenSolved={() => handleAction('fill_the_three_bars')}/>
      default: throw Error(`Can't find puzzle based on id ${id}`)
    }
  }

  useEffect(() => {
    if(refs.current) {        
      const currentChapterPartRef = refs.current.get(currentChapterPartId)
      if(currentChapterPartRef !== undefined) {  
        currentChapterPartRef.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest'
        })
      }
    }
  })

  return (
    <>
      {visibleContent.map((chapterPart, index) => 
        <div ref={el => el ? refs.current.set(chapterPart.id, el) : refs.current.delete(chapterPart.id)} key={chapterPart.id} className='fadeIn' style={{backgroundColor: index % 2 == 1 ? '#eeeeee' : '#dddddd', paddingTop: 10, paddingBottom: 5}}>
          <div className='center'>
            <Text 
              size="xxl"
              className='fadeIn'
            >
              {chapterPart.title}
            </Text>

            {chapterPart.content
              .sort((a, b) => (a.revealedAt ?? 0) - (b.revealedAt ?? 0))
              .map(content => {
                if(content.type === 'text' && content.revealedAt !== undefined) {
                  return ( 
                    <Text 
                      key={content.text}
                      size="lg"
                      className='fadeIn'
                      pb={16}
                    >
                      {content.text}
                    </Text>
                  )
                }
              
              if(content.type === 'puzzle' && content.revealedAt !== undefined) {
                return ( 
                  <Box
                    key={index}
                    className='fadeIn'
                    style={{
                      paddingBottom: 16, 
                      display: 'flex', 
                      justifyContent: 'center'
                    }}
                  >
                    {puzzle(content.id, content.isSolved)}
                  </Box>
                )
              }
            })}

            {chapterPart.content.some(content => content.type === 'action' && !content.isExecuted) &&
              <Box style={{
                display: "flex",
                gap: '15px',
                flexWrap: 'wrap',
                paddingBottom: '16px'
              }}>
                {chapterPart.content
                  .map(content => {
                    if(content.type == 'action' && !content.isExecuted) {
                      return ( 
                        <Button 
                          key={content.id}
                          onClick={() => {handleAction(content.id)}}
                          variant="contained"
                          size="md"
                          className='fadeIn'
                        >
                          {content.label}
                        </Button>
                      )
                    }
                })}
              </Box>
            }


          </div>
        </div>
      )}
    </>
  )
}

export default GameView
