import { Modal, Text, Flex, Button } from "@mantine/core"

interface props {
  opened: boolean,
  onClose: () => void
}

export default function HintsModal({opened, onClose}: props)  {
  return (
    <Modal lockScroll={false} centered withCloseButton={false} opened={opened} onClose={onClose}>
      <Text fw={700} pb="sm">
      Hints
      </Text>
      <Text >
      Riiiiiight. So you need some hints? Hm?!
      </Text>
      <Flex gap="md" justify="flex-end">
      <Button size="md" onClick={onClose}>
          Ok
      </Button>
      </Flex>
    </Modal>
  )
}