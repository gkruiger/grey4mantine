import { Modal, Text, Flex, Button, Anchor } from "@mantine/core"

interface props {
  opened: boolean,
  onClose: () => void
}

export default function AboutModal({opened, onClose}: props)  {
  return (
    <Modal centered withCloseButton={false} opened={opened} onClose={onClose}>
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
        <Button size="md" onClick={onClose}>
          Ok
        </Button>
      </Flex>
    </Modal>
  )
}