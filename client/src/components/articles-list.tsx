import { useEffect, useState } from 'react'
// import { Box, Grid, HStack, IconButton, Skeleton, Text, Alert, AlertIcon } from '@chakra-ui/react'
// import Image from 'next/image';
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Grid,
  Alert,
  AlertIcon,
  Skeleton,
  HStack, 
  IconButton,
} from '@chakra-ui/react';

import { BiTrash, BiDotsVerticalRounded, BiInfoCircle } from 'react-icons/bi'

import { deleteArticle, getAllArticles, updateArticle } from '../services'
import { Article } from '../types'
import { EditArticleForm } from '.'

import { Schema, Types } from 'mongoose';


const Loading = () => {
  return (
    <>
      <Skeleton h="14" startColor="gray.100" endColor="gray.200" borderRadius="md" />
      <Skeleton h="14" startColor="gray.100" endColor="gray.200" borderRadius="md" />
      <Skeleton h="14" startColor="gray.100" endColor="gray.200" borderRadius="md" />
      <Skeleton h="14" startColor="gray.100" endColor="gray.200" borderRadius="md" />
    </>
  )
}

const Empty = () => {
  return (
    <Alert status="warning" borderRadius="md">
      <AlertIcon as={BiInfoCircle} />
      Blogs list is empty
    </Alert>
  )
}

interface ItemProps {
  client: Article
  onClickEdit: (client: Article) => void
  onClickDelete: (clientId: string) => void
}

const ClientItem = (props: ItemProps) => {
  const { onClickEdit, client, onClickDelete } = props
  return (
    <Center py={6}>
      <Box
        maxW={'445px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}>
        <Stack>
          <Text
            color={'green.500'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'sm'}
            letterSpacing={1.1}>
            Blog
          </Text>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}>
            {client.name}
          </Heading>
          <Text color={'gray.500'}>
          {client.content}
          </Text>
        </Stack>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontWeight={600}>{client.autor}</Text>
            <HStack spacing="0" justifyContent="flex-end">
        <IconButton variant="ghost" aria-label="" icon={<BiTrash />} onClick={() => onClickDelete(client._id)} />
        <IconButton onClick={() => onClickEdit(client)} variant="ghost" aria-label="" icon={<BiDotsVerticalRounded />} />
      </HStack>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}

export const ArticleList = () => {
  const [clients, setClients] = useState<Article[] | undefined>()
  const [edit, setEdit] = useState<Article | undefined>(undefined)

  useEffect(() => {
    updateList()
  }, [])

  const updateList = () => {
    setClients(undefined)
    getAllArticles().then((res) => setClients(res))
  }

  const onSave = async (client: Article) => {
    await updateArticle(client)
    setEdit(undefined)
    updateList()
  }

  const onDelete = async (clientId: string) => {
    await deleteArticle(clientId)
    updateList()
  }

  return (
    <>
      {clients && clients.length === 0 && <Empty />}
      <Grid templateColumns="repeat(4, 1fr)" gap="6">
        {!clients && <Loading />}
        {clients &&
          clients.length !== 0 &&
          clients.map((client) => (
            <ClientItem
              onClickEdit={(client) => setEdit(client)}
              key={client._id}
              client={client}
              onClickDelete={onDelete}
            />
          ))}
      </Grid>
      <EditArticleForm client={edit} onClose={() => setEdit(undefined)} onSave={onSave} />
    </>
  )
}
