import { Box, Heading, HStack, Button } from '@chakra-ui/react'
import { useState } from 'react'
import { BiPlus } from 'react-icons/bi'

import { Container, EditAuthorForm, ItemList } from '../components'
import { createAuthor } from '../services'
import { Author } from '../types'

const _empty: Author = { id: 0, name: '' }

export const AuthorsPage = () => {
  const [create, setCreate] = useState<Author | undefined>()

  const onSave = async (author: Author) => {
    await createAuthor(author)
    setCreate(undefined)
  }

  return (
    <Box my="12">
      <Container>
        <HStack>
          <Heading>Authors</Heading>
          <Button colorScheme="blue" size="sm" variant="ghost" leftIcon={<BiPlus />} onClick={() => setCreate(_empty)}>
            Add new
          </Button>
        </HStack>

        <Box mt="12">
          <ItemList />
        </Box>
      </Container>
      <EditAuthorForm item={create} onClose={() => setCreate(undefined)} onSave={onSave} />
    </Box>
  )
}
