import { Button, Flex, Icon, Tooltip } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdLogout } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/Auth'

type UserProps = {
  name: string
}
export function Header() {
  const { signOut } = useAuth()
  const navigate = useNavigate()

  const [user, setUser] = useState({} as UserProps)

  useEffect(() => {
    const user = localStorage.getItem('@taskManager:user')
    if (user) {
      setUser(JSON.parse(user))
    }
  }, [])

  function handleLogout() {
    signOut()
    navigate('/')

  }
  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1280}
      h="20"
      mx="auto"
      mt="4"
      px={["4", "6"]}
      align="center"
      justifyContent="flex-end"
    >
      {user.name}
      <Tooltip label='logout' placement='auto-end'>
        <Button rightIcon={<Icon as={MdLogout} />} colorScheme="none" onClick={handleLogout}>

        </Button>
      </Tooltip>

    </Flex>
  )
}