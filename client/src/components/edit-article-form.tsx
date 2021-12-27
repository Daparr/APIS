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

const _empty: Article = { id: 0, article_name: '', text: '', author: '' }

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
              value={form.article_name}
              onChange={(event) => setForm({ ...form, article_name: event.target.value })}
            />
            <FormLabel>Text</FormLabel>
            <Input
              placeholder="Text"
              value={form.text}
              onChange={(event) => setForm({ ...form, text: event.target.value })}
            />
            <FormLabel>Author</FormLabel>
            <Input
              placeholder="Author"
              value={form.author}
              onChange={(event) => setForm({ ...form, author: event.target.value })}
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
