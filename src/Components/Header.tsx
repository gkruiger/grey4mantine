import { MdHelp as HelpIcon } from "react-icons/md"
import { MdInfo as InfoIcon } from "react-icons/md"
import { MdRefresh as RefreshIcon } from "react-icons/md"
import { MdMusicNote as MusicNoteIcon } from "react-icons/md"
import { MdMusicOff as MusicOffIcon } from "react-icons/md"
import { PiDotsThreeOutlineLight, PiDotsThreeOutlineFill } from "react-icons/pi";
import { Text, ActionIcon, Group, Transition, Stack, Box, Tooltip } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

interface props {
  chapterName: string,
  isSoundOn: boolean,
  setIsSoundOn: (value: boolean) => void
  openHints: () => void,
  openRestart: () => void,
  openAbout: () => void
}

export default function Header({chapterName, isSoundOn, setIsSoundOn, openHints, openRestart, openAbout} : props) {

  const [openedMenu, { toggle: toggleMenu }] = useDisclosure();

  return (
    <>
      <Box className="header" c="white">
        <Stack
          h={44}
          align="stretch"
          justify="center"
          gap="md"
        >
          <Group justify="space-between" >
            <Group gap={8}>
              <Text size="xl" fw={400}>
                GREY4
              </Text>
              <Text size="xl" fw={300}>
                {chapterName}
              </Text>
            </Group>
            <Group justify="space-between" gap={0}>
              <Transition
                mounted={openedMenu}
                transition="fade"
                duration={400}
                timingFunction="ease"
              >
                {(styles) => 
                  <Group gap={0} style={styles}>
                    <Tooltip label="Hints" offset={0}>
                      <ActionIcon onClick={() => {toggleMenu(); openHints()}} variant="subtle" size="xl" radius="xl" style={{ color: 'inherit' }}>
                        <HelpIcon size={26}/>
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Sound" offset={0}>
                      <ActionIcon onClick={() => {toggleMenu(); setIsSoundOn(!isSoundOn)}} variant="subtle" size="xl" radius="xl" style={{ color: 'inherit' }}>
                        {isSoundOn ? <MusicNoteIcon size={26}/> : <MusicOffIcon size={26}/>}
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Restart" offset={0}>
                      <ActionIcon onClick={() => {toggleMenu(); openRestart()}} variant="subtle" size="xl" radius="xl" style={{ color: 'inherit' }}>
                        <RefreshIcon size={26}/>
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="About" offset={0}>
                      <ActionIcon onClick={() => {toggleMenu(); openAbout()}} variant="subtle" size="xl" radius="xl" style={{ color: 'inherit' }}>
                        <InfoIcon size={26}/>
                      </ActionIcon>
                    </Tooltip>
                  </Group>
                }
              </Transition>
              <Tooltip label="More" offset={0}>
                <ActionIcon onClick={toggleMenu} variant="subtle" size="xl" radius="xl">
                  {openedMenu
                    ? <PiDotsThreeOutlineLight style={{color: 'white', width: '40%', height: '40%'}}/>
                    : <PiDotsThreeOutlineFill style={{color: 'white', width: '40%', height: '40%'}}/>}
                </ActionIcon>
              </Tooltip>
            </Group>
          </Group>
        </Stack>
      </Box>
    </>
  )
}