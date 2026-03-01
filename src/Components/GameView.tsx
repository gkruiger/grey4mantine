import { Text, Box, Button } from "@mantine/core"
import { ChapterPart } from "../Types/types"

interface props {
  chapterParts: ChapterPart[],
  handleAction: (id: string) => void
  solvePuzzle: (id: string) => void
}

function GameView({chapterParts, handleAction, solvePuzzle}: props) {
 
  return (
    <>
      {chapterParts.map((chapterPart, index) => 
        <div key={index} className='fadeIn' style={{backgroundColor: index % 2 == 1 ? '#eeeeee' : '#dddddd', paddingTop: 10, paddingBottom: 5}}>
          <div className='center'>
            <Text 
              size="xxl"
              className='fadeIn'
            >
              {chapterPart.title}
            </Text>

            {chapterPart.content.map(content => {
              if(content.type === 'text') {
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
            })}

            {chapterPart.content.some(content => content.type === 'action') &&
              <Box style={{
                display: "flex",
                gap: '15px',
                flexWrap: 'wrap',
                paddingBottom: '16px'
              }}>
                {chapterPart.content.map(content => {
                  if(content.type == 'action') {
                    return ( 
                      <Button 
                        key={content.action.id}
                        onClick={() => {handleAction(content.action.id)}}
                        variant="contained"
                        size="md"
                        className='fadeIn'
                      >
                        {content.action.label}
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
