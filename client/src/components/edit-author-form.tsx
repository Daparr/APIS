import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { Author } from '../types'

interface Props {
  item: Author | undefined
  onClose: () => void
  onSave: (item: Author) => void
}

const _empty: Author = { id: 0, name: '' }

export const EditAuthorForm = (props: Props) => {
  const { item, onClose, onSave } = props
  const [form, setForm] = useState<Author>(_empty)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setForm(props.item || _empty)
    setLoading(false)
  }, [props])

  return (
    <Modal isOpen={!!item} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Author</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Full name</FormLabel>
            <Input
              placeholder="Full name"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            isLoading={loading}
            colorScheme="blue"
            mr={3}
            onClick={() => {
              setLoading(true)
              onSave(form)
            }}
          >
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
