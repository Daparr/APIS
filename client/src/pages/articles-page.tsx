import { Box, Heading, HStack, Button } from '@chakra-ui/react'
import { useState } from 'react'
import { BiPlus } from 'react-icons/bi'

import { Container, ArticleList, EditArticleForm } from '../components'
import { createArticle } from '../services'
import { Article } from '../types'

const _empty: Article = { id: 0, name: '', content: '', autor: '' }

export const ArticlesPage = () => {
  const [create, setCreate] = useState<Article | undefined>()

  const onSave = async (article: Article) => {
    await createArticle(article)
    setCreate(undefined)
  }

  return (
    <Box my="12">
      <Container>
        <HStack>
          <Heading>Articles</Heading>
          <Button colorScheme="blue" size="sm" variant="ghost" leftIcon={<BiPlus />} onClick={() => setCreate(_empty)}>
            Add new
          </Button>
        </HStack>

        <Box mt="12">
          <ArticleList />
        </Box>
      </Container>
      <EditArticleForm client={create} onClose={() => setCreate(undefined)} onSave={onSave} />
    </Box>
  )
}
