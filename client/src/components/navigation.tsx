import { Box, Text, Button, Stack } from '@chakra-ui/react'
import { BiUser, BiDirections, BiHomeAlt, BiMessageDetail } from 'react-icons/bi'
import { Link } from 'react-router-dom'

export const Navigation = () => {
  return (
    <Box
      w="72"
      h="100vh"
      bg="white"
      position="fixed"
      left="0"
      top="0"
      p="8"
      py="14"
      d="flex"
      flexDir="column"
      borderRight="1px"
      borderRightColor="gray.200"
    >
      <Box textAlign="center">
        <Text h="8" fontWeight="900" fontSize="20px" lineHeight="32px">
          MyBlog
        </Text>
      </Box>
      <Stack justify="center" flex="1">
        <Link to="/authors">
          <Button w="100%" leftIcon={<BiUser />} colorScheme="blue" variant="ghost">
            Authors
          </Button>
        </Link>
        <Link to="/articles">
          <Button w="100%" leftIcon={<BiMessageDetail />} colorScheme="blue" variant="ghost">
            Articles
          </Button>
        </Link>
      </Stack>
    </Box>
  )
}
