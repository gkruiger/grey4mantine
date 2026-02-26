import { Modal, Text, Flex, Button } from "@mantine/core"

interface props {
  opened: boolean,
  onClose: () => void,
  restart: () => void
}

export default function RestartModal({opened, onClose, restart}: props)  {
  return (
    <Modal centered withCloseButton={false} opened={opened} onClose={onClose}>
      <Text fw={700} pb="sm">
        Restart
      </Text>
      <Text >
        You will loose all your progress and start from the beginning.<br/>
        <br/>
        Are you sure?
      </Text>
      <Flex gap="md" justify="flex-end">
        <Button size="md" onClick={onClose}>
          Cancel
        </Button>
        <Button size="md" onClick={() => {onClose(); restart()}}>
          Ok
        </Button>
      </Flex>
    </Modal>
  )
}