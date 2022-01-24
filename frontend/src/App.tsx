import {
  Box,
  Button,
  ChakraProvider,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './hooks/Auth'
import { Main } from './page/Main'
import { SignIn } from './page/SignIn'
import { SignUp } from './page/SignUp'

export const App = () => {

  return (
    <>
      <AuthProvider>
        < Routes >
          <Route path='/' element={<SignIn />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/Main' element={<Main />} />
        </Routes >
      </AuthProvider>
    </>

  )

}
