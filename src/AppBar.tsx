import { MdHelp as HelpIcon } from "react-icons/md"
import { MdInfo as InfoIcon } from "react-icons/md"
import { MdRefresh as RefreshIcon } from "react-icons/md"
import { MdMusicNote as MusicNoteIcon } from "react-icons/md"
import { MdMusicOff as MusicOffIcon } from "react-icons/md"
import { MdReorder as ReorderIcon } from "react-icons/md"
import { Text, ActionIcon, Modal, Anchor, Button, Flex, Group } from '@mantine/core'
import { IconContext } from "react-icons"
import { useDisclosure } from '@mantine/hooks'
import { Box } from '@mantine/core'

interface props {
  isSoundOn: boolean,
  setIsSoundOn: Function,
  restart: Function
}

function AppBar({isSoundOn, setIsSoundOn, restart} : props) {

  const [openedInfo, infoHandlers] = useDisclosure(false)
  const [openedRestart, restartHandlers] = useDisclosure(false)
  const [openedSound, soundHandlers] = useDisclosure(false)
  const [openedHints, hintsHandlers] = useDisclosure(false)
  
  const iconStyle: {} = {
    width: '60%', 
    height: '60%', 
    color: 'white'
  }

  return (
    <div className="header">
    <Group justify="space-between">
      <Group style={{color: 'white'}}>
        <IconContext.Provider value={{size: '2.2em'}}>
          <ReorderIcon style={{paddingRight: '10px'}}/>      
        </IconContext.Provider>
        <Text size="xl" fw={500}>
          GREY4
        </Text>
      </Group>
      <Group>
        <ActionIcon onClick={hintsHandlers.open} variant="subtle" size="xl" radius="xl">
          <HelpIcon style={iconStyle}/>
        </ActionIcon>
        <Modal lockScroll={false} centered withCloseButton={false} opened={openedHints} onClose={hintsHandlers.close}>
          <Text fw={700} pb="sm">
            Hints
          </Text>
          <Text >
            Riiiiiight. So you need some hints? Hm?!
          </Text>
          <Flex gap="md" justify="flex-end">
            <Button size="md" onClick={hintsHandlers.close}>
              Ok
            </Button>
          </Flex>
        </Modal>

        <ActionIcon onClick={() => {isSoundOn ? soundHandlers.open() : setIsSoundOn(true)}} variant="subtle" size="xl" radius="xl">
          {isSoundOn ? <MusicNoteIcon style={iconStyle}/> : <MusicOffIcon style={iconStyle}/>}
        </ActionIcon>
        <Modal centered withCloseButton={false} opened={openedSound} onClose={soundHandlers.close}>
          <Text fw={700} pb="sm">
            Restart
          </Text>
          <Text >
            Everytime someone turns the sound of, its creator sheds a tear.<br/>
            <br/>
            Are you sure?
          </Text>
          <Flex gap="md" justify="flex-end">
            <Button size="md"onClick={soundHandlers.close}>
              Cancel
            </Button>
            <Button size="md" onClick={() => {setIsSoundOn(false); soundHandlers.close();}}>
              Ok
            </Button>
          </Flex>
        </Modal>

        <ActionIcon onClick={restartHandlers.open} variant="subtle" size="xl" radius="xl">
          <RefreshIcon style={iconStyle}/>
        </ActionIcon>
        <Modal centered withCloseButton={false} opened={openedRestart} onClose={restartHandlers.close}>
          <Text fw={700} pb="sm">
            Restart
          </Text>
          <Text >
            You will loose all your progress and start from the beginning.<br/>
            <br/>
            Are you sure?
          </Text>
          <Flex gap="md" justify="flex-end">
            <Button size="md" onClick={restartHandlers.close}>
              Cancel
            </Button>
            <Button size="md" onClick={() => {restartHandlers.close(); restart()}}>
              Ok
            </Button>
          </Flex>
        </Modal>


        <ActionIcon onClick={infoHandlers.open} variant="subtle" size="xl" radius="xl">
          <InfoIcon style={iconStyle}/>
        </ActionIcon>
        <Modal centered withCloseButton={false} opened={openedInfo} onClose={infoHandlers.close}>
          <Text fw={700} pb="sm">
            About
          </Text>
          <Text >
            Idea & programming by Gertjan Kruiger.<br/>
            More about this game on my <Anchor href="https://www.letsputalinkhere.whatever" target="_blank" rel="noopener">personal website</Anchor>. <br/>
            Code available in <Anchor href="https://www.letsputalinkhere.whatever" target="_blank" rel="noopener">Github</Anchor>.<br/>
            Music by <Anchor href="https://www.letsputalinkhere.whatever" target="_blank" rel="noopener">Jesse Kruiger</Anchor>.
          </Text>
          <Flex gap="md" justify="flex-end">
            <Button size="md" onClick={infoHandlers.close}>
              Ok
            </Button>
          </Flex>
        </Modal>
      </Group>
    </Group>
    </div>
  )
}

export default AppBar