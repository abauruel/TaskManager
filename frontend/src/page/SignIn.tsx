import { Button, Flex, FormErrorMessage, Stack, useToast, Text } from '@chakra-ui/react'
import { Input } from '../components/form/Input'
import { FieldValue, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { api } from '../services/api'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/Auth'

type SignInFormData = {
  email: string,
  password: string
}

export function SignIn() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState } = useForm()
  const toast = useToast()
  const { errors } = formState
  const { signIn } = useAuth()

  const handleSignIn: SubmitHandler<FieldValues> = async (values) => {
    const { email, password } = values
    try {
      await signIn({ email, password })
      // localStorage.setItem('@taskManager:token', response.data.token);
      // localStorage.setItem('@taskManager:user', JSON.stringify(response.data.user));

      navigate('/Main')

    } catch (err: any) {

      toast({
        status: "error",
        description: `${err.response.data.message}`,
        isClosable: true
      })
    }
  }

  return (
    <Flex
      w={"100vw"}
      h={"100vh"}
      alignItems="center"
      justifyContent="center"

    >

      <Flex
        as="form"
        w={"100%"}
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDirection='column'
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Flex mb={4} alignItems="center" justifyContent="right">
          <Link to="/SignUp">
            <Text> Signup </Text>
          </Link>

        </Flex>
        <Stack spacing='4'>
          <Input type='email' label='E-mail' id="email"
            error={errors.email}
            {...register("email")} />

          <Input type='password' label='Password' id="password"
            error={errors.password}
            {...register("password")}

          />
        </Stack>

        <Button
          type="submit"
          marginTop="6"
          colorScheme='teal'
          isLoading={formState.isSubmitting}
        >Enter</Button>

      </Flex>
    </Flex>

  )
}