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

import { Article } from '../types'

interface Props {
  client: Article | undefined
  onClose: () => void
  onSave: (client: Article) => void
}

const _empty: Article = { id: '', name: '', content: '', autor: '' }

export const EditArticleForm = (props: Props) => {
  const { client, onClose, onSave } = props
  const [form, setForm] = useState<Article>(_empty)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setForm(props.client || _empty)
    setLoading(false)
  }, [props])

  return (
    <Modal isOpen={!!client} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New article</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Article name</FormLabel>
            <Input
              placeholder="Article name"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
            />
            <FormLabel>Text</FormLabel>
            <Input
              placeholder="Text"
              value={form.content}
              onChange={(event) => setForm({ ...form, content: event.target.value })}
            />
            <FormLabel>Author</FormLabel>
            <Input
              placeholder="Author"
              value={form.autor}
              onChange={(event) => setForm({ ...form, autor: event.target.value })}
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
